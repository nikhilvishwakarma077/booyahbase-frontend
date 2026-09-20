import { useState } from "react";

type Variant = {
  entryFee: number;
  prizePool: number;
  matches: number | null;
  totalSlots: number;
  availableSlots: number;

  championRush: boolean;
  championRushPoints: number | null;

  live: boolean;
  caster: string | null;

  teamLogo: boolean;
};

const scrim = {
  name: "Mega Lobby",
  organizerId: "org_001",

  date: "2026-09-13",
  time: "12:00 PM",

  format: "Squad",
  tier: "T2",

  organizer: {
    name: "BR LORD ESPORTS",
    whatsappNumber: "8888888888",
    verified: true,
  },

  variants: [
    {
      entryFee: 35,
      prizePool: 320,
      matches: 6,
      totalSlots: 12,
      availableSlots: 5,

      championRush: false,
      championRushPoints: null,

      live: false,
      caster: null,

      teamLogo: false,
    },

    {
      entryFee: 45,
      prizePool: 420,
      matches: 6,
      totalSlots: 12,
      availableSlots: 4,

      championRush: false,
      championRushPoints: null,

      live: true,
      caster: "Gaming",

      teamLogo: true,
    },

    {
      entryFee: 50,
      prizePool: 480,
      matches: 6,
      totalSlots: 12,
      availableSlots: 5,

      championRush: false,
      championRushPoints: null,

      live: false,
      caster: null,

      teamLogo: true,
    },
  ] as Variant[],

  rules: "",
  importantInformation: "",

  published: true,
};

const ScrimPreview = () => {
  const [selectedVariant, setSelectedVariant] = useState(0);

  const selected = scrim.variants[selectedVariant];

  const whatsappMessage = encodeURIComponent(
    `Hi ${scrim.organizer.name}, I want to join ${scrim.name}. Entry ₹${selected.entryFee}.`
  );

  return (
    <main className="min-h-screen bg-[#080808] px-4 py-8 text-white sm:px-6 lg:px-10">
      <div className="mx-auto max-w-6xl">

        {/* Breadcrumb */}
        <div className="mb-8 text-sm text-white/40">
          Scrims / {scrim.organizer.name} / {scrim.name}
        </div>

        {/* Header */}
        <section className="border-b border-white/10 pb-8">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">

            <div>
              <div className="mb-4 flex flex-wrap items-center gap-2">
                <Badge>{scrim.tier}</Badge>
                <Badge>{scrim.format}</Badge>
              </div>

              <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
                {scrim.name}
              </h1>

              <div className="mt-4 flex items-center gap-2 text-sm text-white/50">
                <span>{scrim.organizer.name}</span>

                {scrim.organizer.verified && (
                  <span className="text-white/80">✓</span>
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:flex">
              <InfoBox label="DATE" value={scrim.date} />
              <InfoBox label="TIME" value={scrim.time} />
            </div>
          </div>
        </section>

        {/* Main */}
        <section className="grid gap-6 py-8 lg:grid-cols-[1fr_340px]">

          {/* LEFT */}
          <div className="space-y-6">

            {/* Variants */}
            <div>
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium uppercase tracking-wider text-white/40">
                    Available Options
                  </p>

                  <h2 className="mt-1 text-xl font-semibold">
                    Choose your entry
                  </h2>
                </div>

                <span className="text-sm text-white/40">
                  {scrim.variants.length} options
                </span>
              </div>

              <div className="grid gap-3 sm:grid-cols-3">
                {scrim.variants.map((variant, index) => {
                  const active = selectedVariant === index;

                  return (
                    <button
                      key={variant.entryFee}
                      onClick={() => setSelectedVariant(index)}
                      className={`border p-5 text-left transition ${
                        active
                          ? "border-white/40 bg-white/[0.09]"
                          : "border-white/10 bg-white/[0.025] hover:border-white/20 hover:bg-white/[0.05]"
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <span className="text-xs text-white/40">
                          ENTRY FEE
                        </span>

                        {active && (
                          <span className="text-xs text-white">
                            Selected
                          </span>
                        )}
                      </div>

                      <p className="mt-2 text-2xl font-semibold">
                        ₹{variant.entryFee}
                      </p>

                      <div className="mt-5 space-y-2 text-sm">
                        <Row
                          label="Prize Pool"
                          value={`₹${variant.prizePool}`}
                        />

                        <Row
                          label="Matches"
                          value={
                            variant.matches
                              ? `B2B ${variant.matches}`
                              : "Unlimited"
                          }
                        />

                        <Row
                          label="Slots Left"
                          value={String(variant.availableSlots)}
                        />
                      </div>

                      {/* Variant Features */}
                      {(variant.live ||
                        variant.championRush ||
                        variant.teamLogo) && (
                        <div className="mt-5 flex flex-wrap gap-2 border-t border-white/10 pt-4">

                          {variant.live && (
                            <Feature label="LIVE" />
                          )}

                          {variant.championRush && (
                            <Feature
                              label={`CR ${variant.championRushPoints} PTS`}
                            />
                          )}

                          {variant.teamLogo && (
                            <Feature label="TEAM LOGO" />
                          )}
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Selected Variant Details */}
            <div className="border border-white/10 bg-white/[0.025] p-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs uppercase tracking-wider text-white/40">
                    Selected Option
                  </p>

                  <h2 className="mt-1 text-xl font-semibold">
                    ₹{selected.entryFee} Entry
                  </h2>
                </div>

                {selected.live && (
                  <span className="flex items-center gap-2 border border-red-400/20 bg-red-400/10 px-3 py-1.5 text-xs text-red-300">
                    <span className="h-1.5 w-1.5 rounded-full bg-red-400" />
                    LIVE
                  </span>
                )}
              </div>

              <div className="mt-6 grid grid-cols-2 gap-x-6 gap-y-6 sm:grid-cols-4">
                <Info
                  label="Prize Pool"
                  value={`₹${selected.prizePool}`}
                />

                <Info
                  label="Matches"
                  value={
                    selected.matches
                      ? `B2B ${selected.matches}`
                      : "Unlimited"
                  }
                />

                <Info
                  label="Slots"
                  value={`${selected.availableSlots}/${selected.totalSlots}`}
                />

                <Info
                  label="Format"
                  value={scrim.format}
                />
              </div>
            </div>

            {/* Features */}
            <div className="border border-white/10 bg-white/[0.025] p-6">
              <h2 className="text-lg font-semibold">
                Lobby Features
              </h2>

              <div className="mt-5 grid gap-3 sm:grid-cols-2">

                <FeatureRow
                  label="Live Lobby"
                  value={selected.live ? "Yes" : "No"}
                />

                <FeatureRow
                  label="Caster"
                  value={selected.caster || "—"}
                />

                <FeatureRow
                  label="Champion Rush"
                  value={
                    selected.championRush
                      ? `Active at ${selected.championRushPoints} points`
                      : "No"
                  }
                />

                <FeatureRow
                  label="Team Logo"
                  value={selected.teamLogo ? "Included" : "Not included"}
                />
              </div>
            </div>

            {/* Information */}
            <div className="border border-white/10 bg-white/[0.025] p-6">
              <h2 className="text-lg font-semibold">
                Important Information
              </h2>

              <ul className="mt-5 space-y-3 text-sm text-white/55">
                <li>
                  • Registration and payment are handled directly
                  by the organizer.
                </li>

                <li>
                  • {selected.availableSlots} slots are currently
                  available.
                </li>

                {selected.teamLogo && (
                  <li>
                    • Team logo is included in this lobby.
                  </li>
                )}

                {selected.live && selected.caster && (
                  <li>
                    • Live coverage by{" "}
                    <span className="text-white">
                      {selected.caster}
                    </span>
                    .
                  </li>
                )}

                {selected.championRush && (
                  <li>
                    • Champion Rush activates at{" "}
                    <span className="text-white">
                      {selected.championRushPoints} points
                    </span>
                    .
                  </li>
                )}
              </ul>
            </div>
          </div>

          {/* RIGHT SIDEBAR */}
          <aside className="lg:sticky lg:top-6 lg:h-fit">

            <div className="border border-white/10 bg-white/[0.035] p-6">

              <p className="text-xs uppercase tracking-wider text-white/40">
                Selected Entry
              </p>

              <div className="mt-4 flex items-end justify-between">
                <div>
                  <p className="text-4xl font-semibold">
                    ₹{selected.entryFee}
                  </p>

                  <p className="mt-1 text-sm text-white/40">
                    Entry Fee
                  </p>
                </div>

                <div className="text-right">
                  <p className="text-lg font-medium">
                    ₹{selected.prizePool}
                  </p>

                  <p className="text-xs text-white/40">
                    Prize Pool
                  </p>
                </div>
              </div>

              <div className="my-6 border-t border-white/10" />

              <div className="space-y-4 text-sm">
                <Row label="Date" value={scrim.date} />
                <Row label="Time" value={scrim.time} />
                <Row label="Format" value={scrim.format} />
                <Row
                  label="Matches"
                  value={
                    selected.matches
                      ? `B2B ${selected.matches}`
                      : "Unlimited"
                  }
                />
                <Row
                  label="Slots Left"
                  value={String(selected.availableSlots)}
                />
              </div>

              <a
                href={`https://wa.me/91${scrim.organizer.whatsappNumber}?text=${whatsappMessage}`}
                target="_blank"
                rel="noreferrer"
                className="mt-7 block w-full bg-white px-5 py-3.5 text-center text-sm font-semibold text-black transition hover:bg-white/90"
              >
                Contact on WhatsApp
              </a>

              <p className="mt-4 text-center text-xs leading-5 text-white/30">
                Registration and payment are completed directly
                with the organizer.
              </p>
            </div>

            {/* Organizer */}
            <div className="mt-4 border border-white/10 bg-white/[0.025] p-6">
              <p className="text-xs uppercase tracking-wider text-white/40">
                Organizer
              </p>

              <div className="mt-3 flex items-center justify-between">
                <span className="font-medium">
                  {scrim.organizer.name}
                </span>

                {scrim.organizer.verified && (
                  <span className="text-xs text-white/60">
                    ✓ Verified
                  </span>
                )}
              </div>

              <p className="mt-3 text-sm text-white/40">
                WhatsApp: +91 {scrim.organizer.whatsappNumber}
              </p>
            </div>
          </aside>
        </section>
      </div>
    </main>
  );
};

/* ---------- Small Components ---------- */

const Badge = ({ children }: { children: React.ReactNode }) => {
  return (
    <span className="rounded-full border border-white/15 bg-white/[0.05] px-3 py-1 text-xs font-medium text-white/70">
      {children}
    </span>
  );
};

const Feature = ({ label }: { label: string }) => {
  return (
    <span className="border border-white/10 bg-white/[0.05] px-2.5 py-1 text-[10px] font-medium tracking-wide text-white/60">
      {label}
    </span>
  );
};

const Row = ({
  label,
  value,
}: {
  label: string;
  value: string;
}) => {
  return (
    <div className="flex justify-between gap-4">
      <span className="text-white/40">{label}</span>
      <span>{value}</span>
    </div>
  );
};

const Info = ({
  label,
  value,
}: {
  label: string;
  value: string;
}) => {
  return (
    <div>
      <p className="text-xs uppercase tracking-wider text-white/35">
        {label}
      </p>

      <p className="mt-1.5 text-sm font-medium">
        {value}
      </p>
    </div>
  );
};

const InfoBox = ({
  label,
  value,
}: {
  label: string;
  value: string;
}) => {
  return (
    <div className="border border-white/10 bg-white/[0.03] px-5 py-4">
      <p className="text-xs text-white/40">{label}</p>

      <p className="mt-1 font-medium">
        {value}
      </p>
    </div>
  );
};

const FeatureRow = ({
  label,
  value,
}: {
  label: string;
  value: string;
}) => {
  return (
    <div className="flex items-center justify-between border border-white/10 bg-white/[0.02] px-4 py-3">
      <span className="text-sm text-white/40">
        {label}
      </span>

      <span className="text-sm">
        {value}
      </span>
    </div>
  );
};

export default ScrimPreview;