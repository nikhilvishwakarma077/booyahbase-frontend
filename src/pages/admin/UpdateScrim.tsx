import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import type { FormEvent } from "react"

import api from "../../services/api";
import { getOrganizers } from "../../services/organizer.service";
import { getScrimById } from "../../services/scrim.service";

import type { IOrganizer } from "../../types/organizer";
import type { IScrim, IScrimVariant } from "../../types/scrim";

type PrizeDistribution = {
  position: string;
  amount: number;
};

type Variant = Omit<
  IScrimVariant,
  "caster" | "championRushPoints" | "prizeDistribution"
> & {
  caster: string;
  championRushPoints: number;
  prizeDistribution: PrizeDistribution[];
};

const emptyVariant: Variant = {
  entryFee: 0,
  prizePool: 0,
  matches: 1,
  totalSlots: 1,
  availableSlots: 1,

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
};

const UpdateScrim = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const [organizers, setOrganizers] = useState<IOrganizer[]>([]);

  const [name, setName] = useState("");
  const [organizerId, setOrganizerId] = useState("");

  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const [format, setFormat] = useState<"Solo" | "Duo" | "Squad">(
    "Squad"
  );

  const [tier, setTier] = useState<"T1" | "T2" | "T3">("T2");

  const [whatsappNumber, setWhatsappNumber] = useState("");

  const [variants, setVariants] = useState<Variant[]>([
    { ...emptyVariant },
  ]);

  const [rules, setRules] = useState("");
  const [importantInformation, setImportantInformation] =
    useState("");

  const [published, setPublished] = useState(false);

  // Fetch scrim + organizers
  useEffect(() => {
    const fetchData = async () => {
      if (!id) return;

      try {
        setLoading(true);
        setError("");

        const [scrim, organizerList] = await Promise.all([
          getScrimById(id),
          getOrganizers(),
        ]);

        setOrganizers(organizerList);

        setName(scrim.name);
        setOrganizerId(
          typeof scrim.organizerId === "string"
            ? scrim.organizerId
            : scrim.organizerId._id
        );

        setDate(scrim.date.slice(0, 10));
        setTime(scrim.time);

        setFormat(scrim.format);
        setTier(scrim.tier);
        setWhatsappNumber(scrim.whatsappNumber);

        setVariants(
          scrim.variants.map((variant) => ({
            ...variant,

            caster: variant.caster ?? "",

            championRushPoints:
              variant.championRushPoints ?? 90,

            prizeDistribution:
              variant.prizeDistribution ?? [
                {
                  position: "1st",
                  amount: 0,
                },
              ],
          }))
        );

        setRules(scrim.rules || "");
        setImportantInformation(
          scrim.importantInformation || ""
        );

        setPublished(scrim.published);
      } catch (err: any) {
        setError(
          err?.response?.data?.message ||
          "Failed to load scrim"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  // Update variant
  const updateVariant = <K extends keyof Variant>(
    index: number,
    field: K,
    value: Variant[K]
  ) => {
    setVariants((prev) =>
      prev.map((variant, variantIndex) =>
        variantIndex === index
          ? {
            ...variant,
            [field]: value,
          }
          : variant
      )
    );
  };

  // Add variant
  const addVariant = () => {
    setVariants((prev) => [
      ...prev,
      {
        ...emptyVariant,
        prizeDistribution: [
          {
            position: "1st",
            amount: 0,
          },
        ],
      },
    ]);
  };

  // Remove variant
  const removeVariant = (index: number) => {
    setVariants((prev) =>
      prev.filter((_, variantIndex) => variantIndex !== index)
    );
  };

  // Add prize position
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

  // Remove prize position
  const removePrizePosition = (
    variantIndex: number,
    prizeIndex: number
  ) => {
    setVariants((prev) =>
      prev.map((variant, index) => {
        if (index !== variantIndex) return variant;

        return {
          ...variant,
          prizeDistribution:
            variant.prizeDistribution.filter(
              (_, index) => index !== prizeIndex
            ),
        };
      })
    );
  };

  // Update prize position
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
          prizeDistribution:
            variant.prizeDistribution.map(
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

  // Submit
  const handleSubmit = async (
    e: FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    if (!id) return;

    setError("");

    if (!name.trim()) {
      setError("Scrim name is required");
      return;
    }

    if (!organizerId) {
      setError("Please select an organizer");
      return;
    }

    if (!date) {
      setError("Date is required");
      return;
    }

    if (!time) {
      setError("Time is required");
      return;
    }

    const timeRegex = /^(0?[1-9]|1[0-2]):[0-5]\d\s?(AM|PM)$/i;
    if (!timeRegex.test(time.trim())) {
      setError("Time must be  in hh:mm AM/PM format");
      return;
    }

    if (!whatsappNumber.trim()) {
      setError("WhatsApp number is required");
      return;
    }

    if (variants.length === 0) {
      setError("At least one variant is required");
      return;
    }

    for (let i = 0; i < variants.length; i++) {
      const variant = variants[i];

      if (variant.availableSlots > variant.totalSlots) {
        setError(
          `Variant ${i + 1}: Available slots cannot exceed total slots`
        );
        return;
      }

      if (variant.live && !variant.caster.trim()) {
        setError(
          `Variant ${i + 1}: Caster is required for live lobby`
        );
        return;
      }

      if (
        variant.championRush &&
        variant.championRushPoints <= 0
      ) {
        setError(
          `Variant ${i + 1}: Champion Rush points must be greater than 0`
        );
        return;
      }

      for (
        let j = 0;
        j < variant.prizeDistribution.length;
        j++
      ) {
        const prize = variant.prizeDistribution[j];

        if (!prize.position.trim()) {
          setError(
            `Variant ${i + 1}: Prize position is required`
          );
          return;
        }

        if (prize.amount < 0) {
          setError(
            `Variant ${i + 1}: Prize amount cannot be negative`
          );
          return;
        }
      }
    }

    try {
      setSubmitting(true);

      await api.put(`/scrims/${id}`, {
        name: name.trim(),
        organizerId,
        date,
        time: time.trim(),
        format,
        tier,
        whatsappNumber: whatsappNumber.trim(),

        variants: variants.map((variant) => ({
          ...variant,

          caster: variant.live
            ? variant.caster.trim()
            : null,

          championRushPoints: variant.championRush
            ? variant.championRushPoints
            : null,

          prizeDistribution: variant.prizeDistribution.map(
            (prize) => ({
              position: prize.position.trim(),
              amount: prize.amount,
            })
          ),
        })),

        rules: rules.trim(),
        importantInformation:
          importantInformation.trim(),

        published,
      });

      navigate(`/admin/scrims`);
    } catch (err: any) {
      setError(
        err?.response?.data?.message ||
        "Failed to update scrim"
      );
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#080808] px-5 py-12 text-white sm:px-10 lg:px-16">
        <div className="mx-auto max-w-5xl">
          <p className="text-sm text-white/40">
            Loading scrim...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#080808] px-5 py-10 text-white sm:px-10 sm:py-12 lg:px-16">
      <div className="mx-auto max-w-5xl">

        {/* Header */}
        <div className="mb-10">
          <p className="mb-2 text-xs uppercase tracking-[0.25em] text-white/30">
            Admin
          </p>

          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            Update Scrim
          </h1>

          <p className="mt-2 text-sm leading-6 text-white/40">
            Update scrim information, variants and
            availability.
          </p>
        </div>

        {/* Error */}
        {error && (
          <div className="mb-6 border border-red-500/20 bg-red-500/5 px-4 py-3 text-sm leading-6 text-red-400">
            {error}
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="space-y-6"
        >
          {/* 01 — Basic Information */}
          <section className="border border-white/10 bg-white/[0.025] p-5 sm:p-7">
            <SectionTitle
              number="01"
              title="Basic Information"
            />

            <div className="grid gap-5 sm:grid-cols-2">
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
              >
                <option value="">Select Organizer</option>

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
                placeholder="09:30 PM"
                value={time}
                onChange={setTime}
                required
              />

              <Select
                label="Format"
                value={format}
                onChange={(value) =>
                  setFormat(
                    value as "Solo" | "Duo" | "Squad"
                  )
                }
              >
                <option value="Solo">Solo</option>
                <option value="Duo">Duo</option>
                <option value="Squad">Squad</option>
              </Select>

              <Select
                label="Tier"
                value={tier}
                onChange={(value) =>
                  setTier(
                    value as "T1" | "T2" | "T3"
                  )
                }
              >
                <option value="T1">T1</option>
                <option value="T2">T2</option>
                <option value="T3">T3</option>
              </Select>

              <Input
                label="WhatsApp Number"
                placeholder="8097381537"
                value={whatsappNumber}
                onChange={setWhatsappNumber}
                required
              />
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
                        Entry, prize pool, matches and
                        special features
                      </p>
                    </div>

                    {variants.length > 1 && (
                      <button
                        type="button"
                        onClick={() =>
                          removeVariant(index)
                        }
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
                        updateVariant(
                          index,
                          "entryFee",
                          value
                        )
                      }
                    />

                    <NumberInput
                      label="Prize Pool"
                      placeholder="320"
                      value={variant.prizePool}
                      onChange={(value) =>
                        updateVariant(
                          index,
                          "prizePool",
                          value
                        )
                      }
                    />

                    <NumberInput
                      label="B2B Matches"
                      placeholder="6"
                      value={variant.matches}
                      onChange={(value) =>
                        updateVariant(
                          index,
                          "matches",
                          value
                        )
                      }
                    />

                    <NumberInput
                      label="Total Slots"
                      placeholder="12"
                      value={variant.totalSlots}
                      onChange={(value) =>
                        updateVariant(
                          index,
                          "totalSlots",
                          value
                        )
                      }
                    />

                    <NumberInput
                      label="Available Slots"
                      placeholder="12"
                      value={variant.availableSlots}
                      onChange={(value) =>
                        updateVariant(
                          index,
                          "availableSlots",
                          value
                        )
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
                          Define how the prize pool is
                          distributed.
                        </p>
                      </div>

                      <button
                        type="button"
                        onClick={() =>
                          addPrizePosition(index)
                        }
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

                            <button
                              type="button"
                              onClick={() =>
                                removePrizePosition(
                                  index,
                                  prizeIndex
                                )
                              }
                              disabled={
                                variant.prizeDistribution
                                  .length === 1
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
                          updateVariant(
                            index,
                            "live",
                            value
                          )
                        }
                      />

                      <Toggle
                        label="Champion Rush"
                        checked={
                          variant.championRush
                        }
                        onChange={(value) =>
                          updateVariant(
                            index,
                            "championRush",
                            value
                          )
                        }
                      />

                      <Toggle
                        label="Team Logo"
                        checked={variant.teamLogo}
                        onChange={(value) =>
                          updateVariant(
                            index,
                            "teamLogo",
                            value
                          )
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
                          updateVariant(
                            index,
                            "caster",
                            value
                          )
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
                        value={
                          variant.championRushPoints
                        }
                        onChange={(value) =>
                          updateVariant(
                            index,
                            "championRushPoints",
                            value
                          )
                        }
                      />

                      <p className="mt-2 text-xs leading-5 text-white/25">
                        Example: Champion Rush activates
                        at 90 points.
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* 03 — Rules & Information */}
          <section className="border border-white/10 bg-white/[0.025] p-5 sm:p-7">
            <SectionTitle
              number="03"
              title="Rules & Information"
            />

            <div className="space-y-5">
              <Textarea
                label="Rules"
                placeholder="No hacks or unfair gameplay..."
                value={rules}
                onChange={setRules}
                rows={6}
              />

              <Textarea
                label="Important Information"
                placeholder="Players must join the lobby 10 minutes before..."
                value={importantInformation}
                onChange={setImportantInformation}
                rows={4}
              />
            </div>
          </section>

          {/* 04 — Publish */}
          <section className="border border-white/10 bg-white/[0.025] p-5 sm:p-7">
            <SectionTitle
              number="04"
              title="Publishing"
            />

            <div className="flex flex-col gap-4 border border-white/10 bg-black/30 p-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm font-medium text-white">
                  Publish Scrim
                </p>

                <p className="mt-1 text-xs leading-5 text-white/40">
                  Published scrims are visible to public
                  users.
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
          <div className="flex flex-col-reverse gap-3 pt-2 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={() =>
                navigate(`/scrims/${id}`)
              }
              className="w-full border border-white/10 px-6 py-3 text-sm font-medium text-white/60 transition hover:border-white/20 hover:text-white sm:w-auto"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={submitting}
              className="w-full bg-white px-6 py-3 text-sm font-medium text-black transition hover:bg-white/90 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
            >
              {submitting
                ? "Updating..."
                : "Update Scrim"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateScrim;

/* ---------------- Components ---------------- */

const SectionTitle = ({
  number,
  title,
}: {
  number: string;
  title: string;
}) => {
  return (
    <div>
      <div className="flex items-center gap-3">
        <span className="text-xs tracking-widest text-white/25">
          {number}
        </span>

        <h2 className="text-sm font-medium uppercase tracking-[0.18em] text-white/70">
          {title}
        </h2>
      </div>
    </div>
  );
};

const Input = ({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  required = false,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: string;
  required?: boolean;
}) => {
  return (
    <div>
      <label className="mb-2 block text-xs uppercase tracking-wider text-white/35">
        {label}
      </label>

      <input
        type={type}
        value={value}
        onChange={(e) =>
          onChange(e.target.value)
        }
        placeholder={placeholder}
        required={required}
        className="w-full border border-white/10 bg-black/30 px-4 py-3 text-sm text-white outline-none placeholder:text-white/20 focus:border-white/25"
      />
    </div>
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
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  children: React.ReactNode;
}) => {
  return (
    <div>
      <label className="mb-2 block text-xs uppercase tracking-wider text-white/35">
        {label}
      </label>

      <select
        value={value}
        onChange={(e) =>
          onChange(e.target.value)
        }
        className="w-full border border-white/10 bg-[#0d0d0d] px-4 py-3 text-sm text-white outline-none focus:border-white/25"
      >
        {children}
      </select>
    </div>
  );
};

const Textarea = ({
  label,
  value,
  onChange,
  placeholder,
  rows,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  rows?: number;
}) => {
  return (
    <div>
      <label className="mb-2 block text-xs uppercase tracking-wider text-white/35">
        {label}
      </label>

      <textarea
        value={value}
        onChange={(e) =>
          onChange(e.target.value)
        }
        placeholder={placeholder}
        rows={rows}
        className="w-full resize-none border border-white/10 bg-black/30 px-4 py-3 text-sm leading-6 text-white outline-none placeholder:text-white/20 focus:border-white/25"
      />
    </div>
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
      className="flex w-full items-center justify-between border border-white/10 bg-black/30 px-4 py-3 text-left"
    >
      <span className="text-xs text-white/60">
        {label}
      </span>

      <span
        className={`relative h-5 w-9 shrink-0 transition ${checked ? "bg-white" : "bg-white/10"
          }`}
      >
        <span
          className={`absolute top-1 h-3 w-3 transition ${checked
            ? "left-5 bg-black"
            : "left-1 bg-white/40"
            }`}
        />
      </span>
    </button>
  );
};