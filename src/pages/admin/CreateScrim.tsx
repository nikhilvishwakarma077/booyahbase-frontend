import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import type {  FormEvent } from "react";

import api from "../../services/api";
import { getOrganizers } from "../../services/organizer.service";
import type { IOrganizer } from "../../types/organizer";

type PrizeDistribution = {
  position: string;
  amount: number;
};

type Variant = {
  entryFee: number;
  prizePool: number;
  matches: number;
  totalSlots: number;
  availableSlots: number;
  prizeDistribution: PrizeDistribution[];
  live: boolean;
  caster: string;
  championRush: boolean;
  championRushPoints: number;
  teamLogo: boolean;
};

const CreateScrim = () => {
  const navigate = useNavigate();

  const [organizers, setOrganizers] = useState<IOrganizer[]>([]);
  const [loadingOrganizers, setLoadingOrganizers] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const [name, setName] = useState("");
  const [organizerId, setOrganizerId] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [format, setFormat] = useState("Squad");
  const [tier, setTier] = useState("T2");
  const [whatsappNumber, setWhatsappNumber] = useState("");

  const [rules, setRules] = useState("No Hack");
  const [importantInformation, setImportantInformation] =
    useState("Join 10 mins before the match starts");

  const [published, setPublished] = useState(true);

  const [variants, setVariants] = useState<Variant[]>([
    {
      entryFee: 35,
      prizePool: 320,
      matches: 6,
      totalSlots: 12,
      availableSlots: 12,
      prizeDistribution: [
        {
          position: "1st",
          amount: 0,
        },
      ],
      live: false,
      caster: "",
      championRush: false,
      championRushPoints: 90,
      teamLogo: false,
    },
  ]);

  useEffect(() => {
    const fetchOrganizers = async () => {
      try {
        const data = await getOrganizers();
        setOrganizers(data);
      } catch (error) {
        console.error("Failed to fetch organizers:", error);
        setError("Failed to load organizers.");
      } finally {
        setLoadingOrganizers(false);
      }
    };

    fetchOrganizers();
  }, []);

  const updateVariant = (
    index: number,
    field: keyof Variant,
    value: string | number | boolean
  ) => {
    setVariants((current) =>
      current.map((variant, i) =>
        i === index
          ? {
            ...variant,
            [field]: value,
          }
          : variant
      )
    );
  };

  const addVariant = () => {
    setVariants((current) => [
      ...current,
      {
        entryFee: 0,
        prizePool: 0,
        matches: 6,
        totalSlots: 12,
        availableSlots: 12,
        prizeDistribution: [
          {
            position: "1st",
            amount: 0,
          },
        ],
        live: false,
        caster: "",
        championRush: false,
        championRushPoints: 90,
        teamLogo: false,
      },
    ]);
  };

  const removeVariant = (index: number) => {
    if (variants.length === 1) return;

    setVariants((current) =>
      current.filter((_, i) => i !== index)
    );
  };

  const addPrizePosition = (variantIndex: number) => {
    setVariants((prev) =>
      prev.map((variant, index) => {
        if (index !== variantIndex) return variant;

        return {
          ...variant,
          prizeDistribution: [
            ...variant.prizeDistribution,
            {
              position: "",
              amount: 0,
            },
          ],
        };
      })
    );
  };

  const removePrizePosition = (
    variantIndex: number,
    prizeIndex: number
  ) => {
    setVariants((prev) =>
      prev.map((variant, index) => {
        if (index !== variantIndex) return variant;

        return {
          ...variant,
          prizeDistribution: variant.prizeDistribution.filter(
            (_, index) => index !== prizeIndex
          ),
        };
      })
    );
  };

  const updatePrizePosition = (
    variantIndex: number,
    prizeIndex: number,
    field: "position" | "amount",
    value: string | number
  ) => {
    setVariants((prev) =>
      prev.map((variant, index) => {
        if (index !== variantIndex) return variant;

        return {
          ...variant,
          prizeDistribution: variant.prizeDistribution.map(
            (prize, index) =>
              index === prizeIndex
                ? {
                  ...prize,
                  [field]: value,
                }
                : prize
          ),
        };
      })
    );
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setError("");

    if (!organizerId) {
      setError("Please select an organizer.");
      return;
    }

    if (!whatsappNumber.trim()) {
      setError("WhatsApp number is required.");
      return;
    }

    for (const variant of variants) {
      if (variant.availableSlots > variant.totalSlots) {
        setError(
          "Available slots cannot be greater than total slots."
        );
        return;
      }

      if (variant.live && !variant.caster.trim()) {
        setError("Caster is required when Live Lobby is enabled.");
        return;
      }

      if (
        variant.championRush &&
        variant.championRushPoints <= 0
      ) {
        setError(
          "Champion Rush activation points must be greater than 0."
        );
        return;
      }
    }

    setSubmitting(true);

    try {
      await api.post("/scrims", {
        name,
        organizerId,
        date,
        time,
        format,
        tier,
        whatsappNumber,
        variants,
        rules,
        importantInformation,
        published,
      });

      navigate("/scrims");
    } catch (error: any) {
      console.error("Failed to create scrim:", error);
      console.error("Backend response:", error?.response?.data);

      const response = error?.response?.data;

      if (response?.errors?.length) {
        setError(response.errors.join(", "));
      } else {
        setError(
          response?.message ||
          response?.error ||
          "Failed to create scrim. Please check the form."
        );
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#080808] px-4 py-8 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">

        {/* Header */}
        <div className="mb-8">
          <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-white/35">
            Admin / Scrims
          </p>

          <div className="mt-2">
            <h1 className="text-3xl font-semibold tracking-tight">
              Create Scrim
            </h1>

            <p className="mt-2 text-sm text-white/40">
              Add the scrim details and its entry variants.
            </p>
          </div>
        </div>

        {/* Error */}
        {error && (
          <div className="mb-6 border border-red-400/20 bg-red-400/[0.04] px-5 py-4 text-sm text-red-300">
            {error}
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="space-y-6"
        >
          {/* 01 — Basic Information */}
          <section className="border border-white/10 bg-white/[0.025] p-6 sm:p-7">
            <SectionTitle
              number="01"
              title="Basic Information"
            />

            <div className="mt-7 grid gap-5 sm:grid-cols-2">

              <Input
                label="Scrim Name"
                placeholder="Mega Lobby"
                value={name}
                onChange={setName}
                required
              />

              <Select
                label="Organizer"
                value={organizerId}
                onChange={setOrganizerId}
                disabled={loadingOrganizers}
                required
              >
                <option value="">
                  {loadingOrganizers
                    ? "Loading organizers..."
                    : "Select organizer"}
                </option>

                {organizers.map((organizer) => (
                  <option
                    key={organizer._id}
                    value={organizer._id}
                  >
                    {organizer.name}
                  </option>
                ))}
              </Select>

              <Input
                label="Date"
                type="date"
                value={date}
                onChange={setDate}
                required
              />

              <Input
                label="Time"
                type="text"
                placeholder="6:00 PM"
                value={time}
                onChange={setTime}
                required
              />

              <Select
                label="Format"
                value={format}
                onChange={setFormat}
              >
                <option value="Squad">Squad</option>
                <option value="Duo">Duo</option>
                <option value="Solo">Solo</option>
              </Select>

              <Select
                label="Tier"
                value={tier}
                onChange={setTier}
              >
                <option value="T1">T1</option>
                <option value="T2">T2</option>
                <option value="T3">T3</option>
              </Select>

              <div className="sm:col-span-2">
                <Input
                  label="WhatsApp Number"
                  placeholder="8097381537"
                  value={whatsappNumber}
                  onChange={setWhatsappNumber}
                  required
                />

                <p className="mt-2 text-xs text-white/25">
                  Contact number specifically for this scrim.
                </p>
              </div>
            </div>
          </section>

          {/* 02 — Entry Variants */}
          <section className="border border-white/10 bg-white/[0.025] p-5 sm:p-7">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <SectionTitle
                number="02"
                title="Entry Variants"
              />

              <button
                type="button"
                onClick={addVariant}
                className="w-full border border-white/15 bg-white/[0.04] px-4 py-2.5 text-xs font-medium transition hover:bg-white/[0.08] sm:w-auto"
              >
                + Add Variant
              </button>
            </div>

            <div className="mt-7 space-y-4">
              {variants.map((variant, index) => (
                <div
                  key={index}
                  className="border border-white/10 bg-black/30 p-4 sm:p-5"
                >
                  {/* Variant Header */}
                  <div className="mb-6 flex items-start justify-between gap-4">
                    <div className="min-w-0">
                      <p className="text-xs font-medium text-white/70">
                        Variant {index + 1}
                      </p>

                      <p className="mt-1 text-[11px] leading-5 text-white/30">
                        Entry, prize pool, matches and special features
                      </p>
                    </div>

                    {variants.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeVariant(index)}
                        className="shrink-0 text-xs text-white/30 transition hover:text-red-300"
                      >
                        Remove
                      </button>
                    )}
                  </div>

                  {/* Money / Slots */}
                  <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                    <NumberInput
                      label="Entry Fee"
                      placeholder="35"
                      value={variant.entryFee}
                      onChange={(value) =>
                        updateVariant(index, "entryFee", value)
                      }
                    />

                    <NumberInput
                      label="Prize Pool"
                      placeholder="320"
                      value={variant.prizePool}
                      onChange={(value) =>
                        updateVariant(index, "prizePool", value)
                      }
                    />

                    <NumberInput
                      label="B2B Matches"
                      placeholder="6"
                      value={variant.matches}
                      onChange={(value) =>
                        updateVariant(index, "matches", value)
                      }
                    />

                    <NumberInput
                      label="Total Slots"
                      placeholder="12"
                      value={variant.totalSlots}
                      onChange={(value) =>
                        updateVariant(index, "totalSlots", value)
                      }
                    />

                    <NumberInput
                      label="Available Slots"
                      placeholder="12"
                      value={variant.availableSlots}
                      onChange={(value) =>
                        updateVariant(index, "availableSlots", value)
                      }
                    />
                  </div>

                  {/* Prize Distribution */}
                  <div className="mt-6 border-t border-white/10 pt-6">
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                      <div>
                        <p className="text-xs uppercase tracking-wider text-white/35">
                          Prize Distribution
                        </p>

                        <p className="mt-1 text-xs leading-5 text-white/25">
                          Define how the prize pool is distributed.
                        </p>
                      </div>

                      <button
                        type="button"
                        onClick={() => addPrizePosition(index)}
                        className="w-full border border-white/10 px-3 py-2 text-xs text-white/60 transition hover:border-white/20 hover:text-white sm:w-auto"
                      >
                        + Add Position
                      </button>
                    </div>

                    <div className="mt-4 space-y-3">
                      {variant.prizeDistribution.map(
                        (prize, prizeIndex) => (
                          <div
                            key={prizeIndex}
                            className="grid grid-cols-1 gap-3 sm:grid-cols-[1fr_140px_auto]"
                          >
                            {/* Position */}
                            <input
                              type="text"
                              value={prize.position}
                              onChange={(e) =>
                                updatePrizePosition(
                                  index,
                                  prizeIndex,
                                  "position",
                                  e.target.value
                                )
                              }
                              placeholder="e.g. 1st or 4th–5th"
                              className="w-full min-w-0 border border-white/10 bg-black/30 px-4 py-3 text-sm text-white outline-none placeholder:text-white/20 focus:border-white/25"
                            />

                            {/* Amount */}
                            <input
                              type="text"
                              inputMode="numeric"
                              value={prize.amount}
                              onChange={(e) => {
                                const value = e.target.value;

                                if (/^\d*$/.test(value)) {
                                  updatePrizePosition(
                                    index,
                                    prizeIndex,
                                    "amount",
                                    value === "" ? 0 : Number(value)
                                  );
                                }
                              }}
                              placeholder="Amount"
                              className="w-full border border-white/10 bg-black/30 px-4 py-3 text-sm text-white outline-none placeholder:text-white/20 focus:border-white/25"
                            />

                            {/* Remove */}
                            <button
                              type="button"
                              onClick={() =>
                                removePrizePosition(
                                  index,
                                  prizeIndex
                                )
                              }
                              disabled={
                                variant.prizeDistribution.length === 1
                              }
                              className="w-full border border-white/10 px-4 py-3 text-xs text-white/40 transition hover:border-red-500/20 hover:text-red-400 disabled:cursor-not-allowed disabled:opacity-20 sm:w-auto"
                            >
                              Remove
                            </button>
                          </div>
                        )
                      )}
                    </div>
                  </div>

                  {/* Features */}
                  <div className="mt-7 border-t border-white/10 pt-6">
                    <p className="text-[10px] font-medium uppercase tracking-widest text-white/30">
                      Variant Features
                    </p>

                    <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                      <Toggle
                        label="Live Lobby"
                        checked={variant.live}
                        onChange={(value) =>
                          updateVariant(index, "live", value)
                        }
                      />

                      <Toggle
                        label="Champion Rush"
                        checked={variant.championRush}
                        onChange={(value) =>
                          updateVariant(index, "championRush", value)
                        }
                      />

                      <Toggle
                        label="Team Logo"
                        checked={variant.teamLogo}
                        onChange={(value) =>
                          updateVariant(index, "teamLogo", value)
                        }
                      />
                    </div>
                  </div>

                  {/* Caster */}
                  {variant.live && (
                    <div className="mt-5">
                      <Input
                        label="Caster"
                        placeholder="Gaming"
                        value={variant.caster}
                        onChange={(value) =>
                          updateVariant(index, "caster", value)
                        }
                        required
                      />
                    </div>
                  )}

                  {/* Champion Rush */}
                  {variant.championRush && (
                    <div className="mt-5">
                      <NumberInput
                        label="Champion Rush Activation Points"
                        placeholder="90"
                        value={variant.championRushPoints}
                        onChange={(value) =>
                          updateVariant(
                            index,
                            "championRushPoints",
                            value
                          )
                        }
                      />

                      <p className="mt-2 text-xs leading-5 text-white/25">
                        Example: Champion Rush activates at 90 points.
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* 03 — Additional Information */}
          <section className="border border-white/10 bg-white/[0.025] p-6 sm:p-7">
            <SectionTitle
              number="03"
              title="Additional Information"
            />

            <div className="mt-7 space-y-5">

              <Textarea
                label="Rules"
                placeholder="Enter scrim rules..."
                value={rules}
                onChange={setRules}
                required
              />

              <Textarea
                label="Important Information"
                placeholder="Any important information for players..."
                value={importantInformation}
                onChange={setImportantInformation}
              />
            </div>
          </section>

          {/* 04 — Publish */}
          <section className="border border-white/10 bg-white/[0.025] p-6 sm:p-7">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

              <div>
                <p className="text-sm font-medium">
                  Publish Scrim
                </p>

                <p className="mt-1 text-xs text-white/35">
                  Published scrims will be visible on BooyahBase.
                </p>
              </div>

              <Toggle
                label={published ? "Published" : "Draft"}
                checked={published}
                onChange={setPublished}
              />
            </div>
          </section>

          {/* Actions */}
          <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">

            <button
              type="button"
              onClick={() => navigate("/scrims")}
              className="border border-white/10 px-6 py-3 text-sm font-medium text-white/60 transition hover:bg-white/[0.04]"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={submitting}
              className="bg-white px-7 py-3 text-sm font-semibold text-black transition hover:bg-white/90 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {submitting
                ? "Creating Scrim..."
                : "Create Scrim"}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
};

/* ---------------- Reusable UI ---------------- */

const SectionTitle = ({
  number,
  title,
}: {
  number: string;
  title: string;
}) => {
  return (
    <div className="flex items-center gap-3">
      <span className="text-[10px] font-medium text-white/25">
        {number}
      </span>

      <h2 className="text-lg font-semibold">
        {title}
      </h2>
    </div>
  );
};

const Input = ({
  label,
  placeholder,
  value,
  onChange,
  type = "text",
  required = false,
}: {
  label: string;
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  required?: boolean;
}) => {
  return (
    <label className="block">
      <span className="mb-2 block text-xs font-medium text-white/50">
        {label}
      </span>

      <input
        type={type}
        value={value}
        placeholder={placeholder}
        required={required}
        onChange={(e) => onChange(e.target.value)}
        className="w-full border border-white/10 bg-black/30 px-4 py-3 text-sm text-white outline-none placeholder:text-white/20 focus:border-white/30"
      />
    </label>
  );
};

const NumberInput = ({
  label,
  placeholder,
  value,
  onChange,
}: {
  label: string;
  placeholder?: string;
  value: number;
  onChange: (value: number) => void;
}) => {
  return (
    <label className="block">
      <span className="mb-2 block text-xs font-medium text-white/50">
        {label}
      </span>

      <input
        type="text"
        inputMode="numeric"
        value={value}
        placeholder={placeholder}
        onChange={(e) => {
          const input = e.target.value;

          if (/^\d*$/.test(input)) {
            onChange(input === "" ? 0 : Number(input));
          }
        }}
        className="w-full border border-white/10 bg-black/30 px-4 py-3 text-sm text-white outline-none placeholder:text-white/20 focus:border-white/30"
      />
    </label>
  );
};

const Select = ({
  label,
  value,
  onChange,
  children,
  disabled = false,
  required = false,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  children: React.ReactNode;
  disabled?: boolean;
  required?: boolean;
}) => {
  return (
    <label className="block">
      <span className="mb-2 block text-xs font-medium text-white/50">
        {label}
      </span>

      <select
        value={value}
        required={required}
        disabled={disabled}
        onChange={(e) => onChange(e.target.value)}
        className="w-full border border-white/10 bg-[#0d0d0d] px-4 py-3 text-sm text-white outline-none focus:border-white/30 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {children}
      </select>
    </label>
  );
};

const Textarea = ({
  label,
  placeholder,
  value,
  onChange,
  required = false,
}: {
  label: string;
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
}) => {
  return (
    <label className="block">
      <span className="mb-2 block text-xs font-medium text-white/50">
        {label}
      </span>

      <textarea
        rows={4}
        value={value}
        required={required}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="w-full resize-none border border-white/10 bg-black/30 px-4 py-3 text-sm text-white outline-none placeholder:text-white/20 focus:border-white/30"
      />
    </label>
  );
};

const Toggle = ({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (value: boolean) => void;
}) => {
  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      className={`flex items-center justify-between border px-4 py-3 text-left transition ${checked
        ? "border-white/25 bg-white/[0.07]"
        : "border-white/10 bg-black/20"
        }`}
    >
      <span className="text-xs font-medium text-white/70">
        {label}
      </span>

      <span
        className={`flex h-5 w-9 items-center rounded-full p-0.5 transition ${checked ? "bg-white" : "bg-white/10"
          }`}
      >
        <span
          className={`h-4 w-4 rounded-full transition ${checked
            ? "translate-x-4 bg-black"
            : "translate-x-0 bg-white/40"
            }`}
        />
      </span>
    </button>
  );
};

export default CreateScrim;