import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import { getScrimById } from "../../services/scrim.service";
import type { IScrim } from "../../types/scrim";
import scrimDetailImg from "../../../src/assets/images/image2.png"

const ScrimDetails = () => {
  const { id } = useParams<{ id: string }>();

  const [scrim, setScrim] = useState<IScrim | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedVariant, setSelectedVariant] = useState(0);

  useEffect(() => {
    if (!id) return;

    const fetchScrim = async () => {
      try {
        const data = await getScrimById(id);
        setScrim(data);
      } catch (error) {
        console.error("Failed to fetch scrim:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchScrim();
  }, [id]);

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#080808] py-10 px-5 text-white">
        <div className="text-center">
          <div className="mx-auto mb-4 h-1 w-10 bg-white" />

          <p className="text-xs font-medium uppercase tracking-[0.2em] text-white/40">
            Loading Scrim...
          </p>
        </div>
      </main>
    );
  }

  if (!scrim) {
    return (
      <main className="flex min-h-screen items-center justify-center  bg-[#080808] px-5 text-white">
        <div className="text-center">
          <h1 className="text-4xl font-semibold tracking-tight">
            Scrim Not Found
          </h1>

          <Link
            to="/scrims"
            className="mt-6 inline-block bg-white px-6 py-3 text-sm font-semibold text-black transition hover:bg-white/90"
          >
            Back to Scrims
          </Link>
        </div>
      </main>
    );
  }

  const variant = scrim.variants[selectedVariant];

  if (!variant) {
    return null;
  }

  const isFull = variant.availableSlots === 0;
  const isOpen = scrim.published && !isFull;

  const formattedDate = new Date(scrim.date).toLocaleDateString(
    "en-IN",
    {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }
  );

  const whatsappMessage = encodeURIComponent(
    `Hi ${scrim.organizerId.name}, I want to join ${scrim.name}. Entry ₹${variant.entryFee}.`
  );

  const whatsappUrl = `https://wa.me/${scrim.whatsappNumber.replace(
    /\D/g,
    ""
  )}?text=${whatsappMessage}`;

  return (
    <main className="min-h-screen bg-[#080808] relative px-4 py-28 text-white sm:px-6 lg:px-10">
      <div
        className="absolute pointer-events-none inset-0 bg-cover bg-center bg-no-repeat opacity-20"
        style={{
          backgroundImage: `url(${scrimDetailImg})`,
        }}
      />

      {/* Top Fade */}
      <div className="absolute pointer-events-none inset-x-0 top-0 h-32 bg-gradient-to-b from-[#090a0d] to-transparent" />
      {/* Bottom Fade */}
      <div className="absolute pointer-events-none inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#090a0d] to-transparent" />
      <div className="mx-auto max-w-6xl">

        {/* Breadcrumb */}
        <div className="mb-8 text-sm text-white/40">
          {/* Back */}
          <Link
            to="/scrims"
            className="
            text-xs
            font-bold
            uppercase
            tracking-wider
            text-white/40
            transition
            hover:text-white
          "
          >
            ← Back to Scrims
          </Link>
        </div>

        {/* Header */}
        <section className="border-b border-white/10 pb-8">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">

            <div>
              <div className="mb-4 flex flex-wrap items-center gap-2">
                <Badge>{scrim.tier}</Badge>
                <Badge>{scrim.format}</Badge>

                <span
                  className={`ml-1 text-xs ${isOpen
                    ? "text-white/70"
                    : "text-white/30"
                    }`}
                >
                  {isFull
                    ? "Full"
                    : isOpen
                      ? "Open"
                      : "Closed"}
                </span>
              </div>

              <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
                {scrim.name}
              </h1>

              <div className="mt-4 flex items-center gap-2 text-sm text-white/50">
                <span>{scrim.organizerId.name}</span>

                {scrim.organizerId.isVerified && (
                  <span className="text-white/80">
                    ✓
                  </span>
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:flex">
              <InfoBox
                label="DATE"
                value={formattedDate}
              />

              <InfoBox
                label="TIME"
                value={scrim.time}
              />
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
                  {scrim.variants.length}{" "}
                  {scrim.variants.length === 1
                    ? "option"
                    : "options"}
                </span>
              </div>

              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {scrim.variants.map((item, index) => {
                  const active = selectedVariant === index;

                  return (
                    <button
                      key={index}
                      type="button"
                      onClick={() => setSelectedVariant(index)}
                      className={`border p-5 text-left transition ${active
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
                        {item.entryFee === 0
                          ? "FREE"
                          : `₹${item.entryFee.toLocaleString("en-IN")}`}
                      </p>

                      <div className="mt-5 space-y-2 text-sm">
                        <Row
                          label="Prize Pool"
                          value={`₹${item.prizePool.toLocaleString(
                            "en-IN"
                          )}`}
                        />

                        <Row
                          label="Matches"
                          value={
                            item.matches
                              ? `B2B ${item.matches}`
                              : "Unlimited"
                          }
                        />

                        <Row
                          label="Slots Left"
                          value={String(item.availableSlots)}
                        />
                      </div>

                      {(item.live ||
                        item.championRush ||
                        item.teamLogo) && (
                          <div className="mt-5 flex flex-wrap gap-2 border-t border-white/10 pt-4">
                            {item.live && (
                              <Feature label="LIVE" />
                            )}

                            {item.championRush && (
                              <Feature
                                label={`CR ${item.championRushPoints ?? ""} PTS`}
                              />
                            )}

                            {item.teamLogo && (
                              <Feature label="TEAM LOGO" />
                            )}
                          </div>
                        )}
                    </button>
                  );
                })}
              </div>
            </div>


            {/* Selected Variant */}
            <div className="border border-white/10 bg-white/[0.025] p-5 sm:p-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs uppercase tracking-wider text-white/40">
                    Selected Option
                  </p>

                  <h2 className="mt-1 text-xl font-semibold">
                    {variant.entryFee === 0
                      ? "Free Entry"
                      : `₹${variant.entryFee} Entry`}
                  </h2>
                </div>

                {variant.live && (
                  <span className="flex shrink-0 items-center gap-2 border border-red-400/20 bg-red-400/10 px-3 py-1.5 text-xs text-red-300">
                    <span className="h-1.5 w-1.5 rounded-full bg-red-400" />
                    LIVE
                  </span>
                )}
              </div>

              {/* Main Stats */}
              <div className="mt-6 grid grid-cols-2 gap-x-6 gap-y-6 sm:grid-cols-4">
                <Info
                  label="Prize Pool"
                  value={`₹${variant.prizePool.toLocaleString("en-IN")}`}
                />

                <Info
                  label="Matches"
                  value={
                    variant.matches
                      ? `B2B ${variant.matches}`
                      : "Unlimited"
                  }
                />

                <Info
                  label="Slots"
                  value={`${variant.availableSlots}/${variant.totalSlots}`}
                />

                <Info
                  label="Format"
                  value={scrim.format}
                />
              </div>

              {/* Prize Distribution */}
              {variant.prizeDistribution?.length > 0 && (
                <div className="mt-7 border-t border-white/10 pt-6">
                  <div className="mb-4">
                    <p className="text-xs uppercase tracking-wider text-white/40">
                      Prize Distribution
                    </p>

                    <p className="mt-1 text-xs text-white/25">
                      Prize breakdown for this entry option.
                    </p>
                  </div>

                  <div className="divide-y divide-white/10 border border-white/10">
                    {variant.prizeDistribution.map(
                      (prize, index) => (
                        <div
                          key={`${prize.position}-${index}`}
                          className="flex items-center justify-between gap-4 px-4 py-3.5"
                        >
                          <span className="text-sm text-white/55">
                            {prize.position}
                          </span>

                          <span className="text-sm font-medium text-white">
                            ₹{prize.amount.toLocaleString("en-IN")}
                          </span>
                        </div>
                      )
                    )}
                  </div>
                </div>
              )}
            </div>



            {/* Lobby Features */}
            <div className="border border-white/10 bg-white/[0.025] p-6">
              <h2 className="text-lg font-semibold">
                Lobby Features
              </h2>

              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                <FeatureRow
                  label="Live Lobby"
                  value={variant.live ? "Yes" : "No"}
                />

                <FeatureRow
                  label="Caster"
                  value={variant.caster || "—"}
                />

                <FeatureRow
                  label="Champion Rush"
                  value={
                    variant.championRush
                      ? `Active at ${variant.championRushPoints ?? "—"} points`
                      : "No"
                  }
                />

                <FeatureRow
                  label="Team Logo"
                  value={
                    variant.teamLogo
                      ? "Included"
                      : "Not included"
                  }
                />
              </div>
            </div>

            {/* Rules */}
            {scrim.rules && (
              <div className="border border-white/10 bg-white/[0.025] p-6">
                <h2 className="text-lg font-semibold">
                  Rules
                </h2>

                <p className="mt-5 whitespace-pre-line text-sm leading-6 text-white/55">
                  {scrim.rules}
                </p>
              </div>
            )}

            {/* Important Information */}
            {scrim.importantInformation && (
              <div className="border border-white/10 bg-white/[0.025] p-6">
                <h2 className="text-lg font-semibold">
                  Important Information
                </h2>

                <ul className="mt-5 space-y-3 text-sm text-white/55">
                  <li>
                    • {scrim.importantInformation}
                  </li>

                  <li>
                    • {variant.availableSlots} slots are
                    currently available.
                  </li>

                  {variant.teamLogo && (
                    <li>
                      • Team logo is included in this
                      lobby.
                    </li>
                  )}

                  {variant.live && variant.caster && (
                    <li>
                      • Live coverage by{" "}
                      <span className="text-white">
                        {variant.caster}
                      </span>
                      .
                    </li>
                  )}

                  {variant.championRush && (
                    <li>
                      • Champion Rush activates at{" "}
                      <span className="text-white">
                        {variant.championRushPoints} points
                      </span>
                      .
                    </li>
                  )}
                </ul>
              </div>
            )}

            {/* Fallback Information */}
            {!scrim.importantInformation && (
              <div className="border border-white/10 bg-white/[0.025] p-6">
                <h2 className="text-lg font-semibold">
                  Important Information
                </h2>

                <ul className="mt-5 space-y-3 text-sm text-white/55">
                  <li>
                    • Registration and payment are handled
                    directly by the organizer.
                  </li>

                  <li>
                    • {variant.availableSlots} slots are
                    currently available.
                  </li>

                  {variant.teamLogo && (
                    <li>
                      • Team logo is included in this
                      lobby.
                    </li>
                  )}

                  {variant.live && variant.caster && (
                    <li>
                      • Live coverage by{" "}
                      <span className="text-white">
                        {variant.caster}
                      </span>
                      .
                    </li>
                  )}

                  {variant.championRush && (
                    <li>
                      • Champion Rush activates at{" "}
                      <span className="text-white">
                        {variant.championRushPoints} points
                      </span>
                      .
                    </li>
                  )}
                </ul>
              </div>
            )}
          </div>

          {/* RIGHT SIDEBAR */}
          <aside className="lg:sticky lg:top-6 lg:h-fit">

            {/* Registration Card */}
            <div className="border border-white/10 bg-white/[0.035] p-6">
              <p className="text-xs uppercase tracking-wider text-white/40">
                Selected Entry
              </p>

              <div className="mt-4 flex items-end justify-between">
                <div>
                  <p className="text-4xl font-semibold">
                    {variant.entryFee === 0
                      ? "FREE"
                      : `₹${variant.entryFee}`}
                  </p>

                  <p className="mt-1 text-sm text-white/40">
                    Entry Fee
                  </p>
                </div>

                <div className="text-right">
                  <p className="text-lg font-medium">
                    ₹{variant.prizePool.toLocaleString(
                      "en-IN"
                    )}
                  </p>

                  <p className="text-xs text-white/40">
                    Prize Pool
                  </p>
                </div>
              </div>

              <div className="my-6 border-t border-white/10" />

              <div className="space-y-4 text-sm">
                <Row
                  label="Date"
                  value={formattedDate}
                />

                <Row
                  label="Time"
                  value={scrim.time}
                />

                <Row
                  label="Format"
                  value={`${scrim.format} ${variant.championRush == true ? "| Champion Rush" : ""} `}
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
                  value={String(
                    variant.availableSlots
                  )}
                />
              </div>

              {isOpen ? (
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-7 block w-full bg-white px-5 py-3.5 text-center text-sm font-semibold text-black transition hover:bg-white/90"
                >
                  DM for Slots
                </a>
              ) : (
                <button
                  disabled
                  className="mt-7 block w-full border border-white/10 px-5 py-3.5 text-center text-sm font-semibold text-white/25"
                >
                  {isFull
                    ? "Scrim Full"
                    : "Registration Closed"}
                </button>
              )}

              <p className="mt-4 text-center text-xs leading-5 text-white/30">
                Registration and payment are completed
                directly with the organizer.
              </p>
            </div>

            {/* Organizer */}
            <div className="mt-4 border border-white/10 bg-white/[0.025] p-6">
              <p className="text-xs uppercase tracking-wider text-white/40">
                Organizer
              </p>

              <div className="mt-3 flex items-center justify-between gap-3">
                <span className="font-medium">
                  {scrim.organizerId.name}
                </span>

                {scrim.organizerId.isVerified && (
                  <span className="text-xs text-white/60">
                    ✓ Verified
                  </span>
                )}
              </div>
            </div>
          </aside>
        </section>
      </div>
    </main>
  );
};

/* ---------- Small Components ---------- */

const Badge = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <span className="rounded-full border border-white/15 bg-white/[0.05] px-3 py-1 text-xs font-medium text-white/70">
      {children}
    </span>
  );
};

const Feature = ({
  label,
}: {
  label: string;
}) => {
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
      <span className="text-white/40">
        {label}
      </span>

      <span className="text-right">
        {value}
      </span>
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
      <p className="text-xs text-white/40">
        {label}
      </p>

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

      <span className="text-right text-sm">
        {value}
      </span>
    </div>
  );
};

export default ScrimDetails;

