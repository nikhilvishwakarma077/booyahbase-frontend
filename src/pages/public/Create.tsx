import { useState } from "react";

type Variant = {
  entryFee: number;
  prizePool: number;
  matches: number;
  totalSlots: number;
  availableSlots: number;
  live: boolean;
  caster: string;
  championRush: boolean;
  championRushPoints: number;
  teamLogo: boolean;
};

const organizers = [
  {
    id: "org_001",
    name: "BR LORD ESPORTS",
  },
  {
    id: "org_002",
    name: "INVINCIBLE ESPORTS",
  },
  {
    id: "org_003",
    name: "NISHU PAID SCRIMS",
  },
];

const Create = () => {
  const [name, setName] = useState("");
  const [organizerId, setOrganizerId] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [format, setFormat] = useState("Squad");
  const [tier, setTier] = useState("T2");
  const [whatsappNumber, setWhatsappNumber] = useState("");

  const [rules, setRules] = useState("");
  const [importantInformation, setImportantInformation] =
    useState("");

  const [published, setPublished] = useState(true);

  const [variants, setVariants] = useState<Variant[]>([
    {
      entryFee: 35,
      prizePool: 320,
      matches: 6,
      totalSlots: 12,
      availableSlots: 5,
      live: false,
      caster: "",
      championRush: false,
      championRushPoints: 90,
      teamLogo: false,
    },
  ]);

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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data = {
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
    };

    console.log(data);
  };

  return (
    <main className="min-h-screen bg-[#080808] px-4 py-8 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        {/* Header */}
        <div className="mb-8">
          <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-white/35">
            Admin / Scrims
          </p>

          <div className="mt-2 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h1 className="text-3xl font-semibold tracking-tight">
                Create Scrim
              </h1>

              <p className="mt-2 text-sm text-white/40">
                Add the scrim details and its entry variants.
              </p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
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
              />

              <Select
                label="Organizer"
                value={organizerId}
                onChange={setOrganizerId}
              >
                <option value="">Select organizer</option>

                {organizers.map((organizer) => (
                  <option
                    key={organizer.id}
                    value={organizer.id}
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
              />

              <Input
                label="Time"
                type="time"
                value={time}
                onChange={setTime}
              />

              <Select
                label="Format"
                value={format}
                onChange={setFormat}
              >
                <option>Squad</option>
                <option>Duo</option>
                <option>Solo</option>
              </Select>

              <Select
                label="Tier"
                value={tier}
                onChange={setTier}
              >
                <option>T1</option>
                <option>T2</option>
                <option>T3</option>
              </Select>

              <div className="sm:col-span-2">
                <Input
                  label="WhatsApp Number"
                  placeholder="8097381537"
                  value={whatsappNumber}
                  onChange={setWhatsappNumber}
                />

                <p className="mt-2 text-xs text-white/25">
                  Contact number specifically for this scrim.
                </p>
              </div>
            </div>
          </section>

          {/* Variants */}
          <section className="border border-white/10 bg-white/[0.025] p-6 sm:p-7">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <SectionTitle
                number="02"
                title="Entry Variants"
              />

              <button
                type="button"
                onClick={addVariant}
                className="border border-white/15 bg-white/[0.04] px-4 py-2.5 text-xs font-medium transition hover:bg-white/[0.08]"
              >
                + Add Variant
              </button>
            </div>

            <div className="mt-7 space-y-4">
              {variants.map((variant, index) => (
                <div
                  key={index}
                  className="border border-white/10 bg-black/30 p-5"
                >
                  {/* Variant Header */}
                  <div className="mb-6 flex items-center justify-between">
                    <div>
                      <p className="text-xs font-medium text-white/70">
                        Variant {index + 1}
                      </p>

                      <p className="mt-1 text-[11px] text-white/30">
                        Entry, prize pool, matches and special features
                      </p>
                    </div>

                    {variants.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeVariant(index)}
                        className="text-xs text-white/30 transition hover:text-red-300"
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

                  {/* Features */}
                  <div className="mt-7 border-t border-white/10 pt-6">
                    <p className="text-[10px] font-medium uppercase tracking-widest text-white/30">
                      Variant Features
                    </p>

                    <div className="mt-4 grid gap-3 sm:grid-cols-3">
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
                        checked={variant.championRush}
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

                      <p className="mt-2 text-xs text-white/25">
                        Example: Champion Rush activates at 90
                        points.
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* Additional Information */}
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
              />

              <Textarea
                label="Important Information"
                placeholder="Any important information for players..."
                value={importantInformation}
                onChange={setImportantInformation}
              />
            </div>
          </section>

          {/* Publish */}
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

          {/* Submit */}
          <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
            <button
              type="button"
              className="border border-white/10 px-6 py-3 text-sm font-medium text-white/60 transition hover:bg-white/[0.04]"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="bg-white px-7 py-3 text-sm font-semibold text-black transition hover:bg-white/90"
            >
              Create Scrim
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
    <div>
      <div className="flex items-center gap-3">
        <span className="text-[10px] font-medium text-white/25">
          {number}
        </span>

        <h2 className="text-lg font-semibold">{title}</h2>
      </div>
    </div>
  );
};

const Input = ({
  label,
  placeholder,
  value,
  onChange,
  type = "text",
}: {
  label: string;
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
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
        type="number"
        min="0"
        value={value}
        placeholder={placeholder}
        onChange={(e) =>
          onChange(Number(e.target.value))
        }
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
    <label className="block">
      <span className="mb-2 block text-xs font-medium text-white/50">
        {label}
      </span>

      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full border border-white/10 bg-[#0d0d0d] px-4 py-3 text-sm text-white outline-none focus:border-white/30"
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
}: {
  label: string;
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
}) => {
  return (
    <label className="block">
      <span className="mb-2 block text-xs font-medium text-white/50">
        {label}
      </span>

      <textarea
        rows={4}
        value={value}
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
      className={`flex items-center justify-between border px-4 py-3 text-left transition ${
        checked
          ? "border-white/25 bg-white/[0.07]"
          : "border-white/10 bg-black/20"
      }`}
    >
      <span className="text-xs font-medium text-white/70">
        {label}
      </span>

      <span
        className={`flex h-5 w-9 items-center rounded-full p-0.5 transition ${
          checked ? "bg-white" : "bg-white/10"
        }`}
      >
        <span
          className={`h-4 w-4 rounded-full transition ${
            checked
              ? "translate-x-4 bg-black"
              : "translate-x-0 bg-white/40"
          }`}
        />
      </span>
    </button>
  );
};

export default Create;