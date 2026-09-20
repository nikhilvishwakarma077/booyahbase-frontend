import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

import { getScrims } from "../../services/scrim.service";
import type { IScrim } from "../../types/scrim";
import scrimSectionImg from "../../../src/assets/images/image4.jpg"

const ScrimsSection = () => {
  const [featureScrims, setFeatureScrims] = useState<IScrim[]>([]);
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchFeaturedScrims = async () => {
      try {
        setLoading(true)
        const data = await getScrims();
        setFeatureScrims(data);
        setLoading(false)
      } catch (error) {
        console.error("Failed to fetch scrims:", error);
      }
    };

    fetchFeaturedScrims();
  }, []);

  return (
    <section className="bg-[#090a0d] relative px-4 py-16 text-white sm:px-6 sm:py-20 lg:px-16 lg:py-28">
      <div
        className="absolute pointer-events-none inset-0 bg-cover bg-center bg-no-repeat opacity-20"
        style={{
          backgroundImage: `url(${scrimSectionImg})`,
        }}
      />

      {/* Top Fade */}
      <div className="absolute pointer-events-none inset-x-0 top-0 h-32 bg-gradient-to-b from-[#090a0d] to-transparent" />
      {/* Bottom Fade */}
      <div className="absolute pointer-events-none inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#090a0d] to-transparent" />
      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <div className="mb-10 flex flex-col gap-6 sm:mb-14 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.3em] text-white/50 sm:text-xs">
              Upcoming Battles
            </p>

            <h2 className="max-w-3xl text-4xl font-black uppercase leading-[0.92] tracking-tight sm:text-5xl lg:text-6xl">
              Find your next scrim.
            </h2>

            <div className="mt-6 flex items-center gap-3">
              <div className="h-1 w-12 bg-white" />
              <div className="h-1 w-3 bg-white/40" />
              <div className="h-1 w-3 bg-white/20" />
            </div>
          </div>

          <Link
            to="/scrims"
            className="
              w-fit
              border-b
              border-white/20
              pb-1
              text-xs
              font-bold
              uppercase
              tracking-wider
              text-white/60
              transition-all
              duration-200
              hover:border-white
              hover:text-white
              sm:text-sm
            "
          >
            View All Scrims →
          </Link>
        </div>

        {/* Scrim Cards */}
        <div>
          {!loading && featureScrims.length > 0 && (
            <div className="grid grid-cols-1 gap-4 sm:gap-5 md:grid-cols-2">
              {featureScrims.map((scrim) => {
                const hasLiveVariant = scrim.variants.some(
                  (variant) => variant.live
                );

                const formattedDate = new Date(scrim.date).toLocaleDateString(
                  "en-IN",
                  {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  }
                );

                return (
                  <Link
                    key={scrim._id}
                    to={`/scrims/${scrim._id}`}
                    className="
                      group
                      border border-white/10
                      bg-white/[0.025]
                      p-4
                      transition-colors
                      duration-300
                      hover:border-white/20
                      sm:p-5
                      md:p-6
                    "
                  >
                    {/* Top */}
                    <div className="flex flex-wrap items-center justify-between gap-2 sm:gap-3">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="border border-white/10 px-2 py-1 text-[9px] font-bold uppercase tracking-wider text-white/55 sm:text-[10px]">
                          {scrim.tier}
                        </span>

                        <span className="border border-white/10 px-2 py-1 text-[9px] font-bold uppercase tracking-wider text-white/55 sm:text-[10px]">
                          {scrim.format}
                        </span>

                      </div>

                      {hasLiveVariant && (
                        <span className="flex items-center gap-1.5 border px-2 py-1 text-[9px] font-bold uppercase tracking-wider text-white sm:text-[10px]">
                          <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-white" />
                          Live
                        </span>
                      )}
                    </div>

                    {/* Scrim Name */}
                    <div className="mt-4 sm:mt-5">
                      <h3 className="break-words text-base font-bold tracking-tight text-white sm:text-lg md:text-xl">
                        {scrim.name}
                      </h3>

                      <p className="mt-1 break-words text-xs text-white/35">
                        {scrim.organizerId.name}
                        {scrim.organizerId.isVerified && (
                          <span className="ml-1.5 text-white/55">✓</span>
                        )}
                      </p>
                    </div>

                    {/* Date / Time / Matches */}
                    <div className="mt-5 grid grid-cols-2 gap-2 sm:mt-6 sm:gap-3">
                      <Info label="Date" value={formattedDate} />

                      <Info label="Time" value={scrim.time} />
                      {/* 
                              <Info
                                label="B2B"
                                value={`${scrim.variants[0]?.matches ?? 0} Matches`}
                              /> */}
                    </div>

                    {/* Variants */}
                    <div className="mt-4 sm:mt-5">
                      <p className="mb-2 text-[9px] uppercase tracking-wider text-white/25">
                        Variants
                      </p>

                      <div className="space-y-2">
                        {scrim.variants.map((variant, index) => (
                          <div
                            key={index}
                            className="
                              overflow-x-auto
                              border border-white/10
                              bg-black/20
                              px-3
                              py-3
                              sm:px-4
                              [&::-webkit-scrollbar]:h-1
                              [&::-webkit-scrollbar-thumb]:bg-white/10
                            "
                          >
                            <div
                              className="
                                grid
                                min-w-[420px]
                                grid-cols-[minmax(55px,0.8fr)_minmax(65px,0.9fr)_minmax(55px,0.8fr)_minmax(65px,1fr)_minmax(100px,1.4fr)]
                                items-center
                                gap-3
                                sm:min-w-0
                                sm:gap-4
                              "
                            >
                              {/* Entry */}
                              <div className="min-w-0">
                                <p className="text-[8px] uppercase tracking-wider text-white/25">
                                  Entry
                                </p>

                                <p className="mt-1 whitespace-nowrap text-[11px] font-bold text-white sm:text-xs">
                                  ₹{variant.entryFee.toLocaleString("en-IN")}
                                </p>
                              </div>

                              {/* Prize */}
                              <div className="min-w-0">
                                <p className="text-[8px] uppercase tracking-wider text-white/25">
                                  Prize
                                </p>

                                <p className="mt-1 whitespace-nowrap text-[11px] font-bold text-white sm:text-xs">
                                  ₹{variant.prizePool.toLocaleString("en-IN")}
                                </p>
                              </div>

                              {/* Slots */}
                              <div className="min-w-0">
                                <p className="text-[8px] uppercase tracking-wider text-white/25">
                                  Slots
                                </p>

                                <p className="mt-1 whitespace-nowrap text-[11px] font-bold text-white sm:text-xs">
                                  {variant.availableSlots}/{variant.totalSlots}
                                </p>
                              </div>

                              {/* B2B */}
                              <div className="min-w-0">
                                <p className="text-[8px] uppercase tracking-wider text-white/25">
                                  B2B
                                </p>

                                <p className="mt-1 whitespace-nowrap text-[11px] font-bold text-white sm:text-xs">
                                  {variant.matches}
                                </p>
                              </div>

                              {/* B2B */}
                              {/* <div className="min-w-0">
                                        <p className="text-[8px] uppercase tracking-wider text-white/25">
                                          B2B
                                        </p>
          
                                        <p className="mt-1 whitespace-nowrap text-[11px] font-bold text-white sm:text-xs">
                                          {variant.matches}
                                        </p>
                                      </div> */}

                              {/* Distribution */}
                              <div className="min-w-0">
                                <p className="text-[8px] uppercase tracking-wider text-white/25">
                                  Distribution
                                </p>

                                <div className="mt-1 flex items-center gap-2 overflow-hidden">
                                  {variant.prizeDistribution?.map(
                                    (prize, prizeIndex) => (
                                      <span
                                        key={`${prize.position}-${prizeIndex}`}
                                        className="flex shrink-0 items-center gap-2"
                                      >
                                        <span className="whitespace-nowrap text-[11px] font-semibold text-white sm:text-xs">
                                          ₹{prize.amount.toLocaleString("en-IN")}
                                        </span>

                                        {prizeIndex <
                                          variant.prizeDistribution.length -
                                          1 && (
                                            <span className="text-white/20">
                                              |
                                            </span>
                                          )}
                                      </span>
                                    )
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* View */}
                    <div className="mt-4 flex justify-end sm:mt-5">
                      <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-white/40 transition-colors group-hover:text-white">
                        View →
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>

        {/* Empty */}
        {!loading && featureScrims.length === 0 && (
          <div
            className="
              border
              border-white/10
              bg-[#101010]
              px-4
              py-16
              text-center
              sm:py-20
            "
          >
            <div className="mx-auto mb-4 h-1 w-10 bg-white" />

            <p className="font-bold uppercase">
              No scrims found
            </p>

            <p className="mt-2 text-sm text-white/40">
              Try changing your search or filters.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

const Info = ({
  label,
  value,
  highlight = false,
}: {
  label: string;
  value: string;
  highlight?: boolean;
}) => (
  <div
    className="
      border
      border-white/10
      bg-black/20
      p-2
      transition-colors
      duration-300
      group-hover:border-white/20
      sm:p-3
    "
  >
    <p className="text-[8px] uppercase tracking-wider text-white/25 sm:text-[9px]">
      {label}
    </p>

    <p
      className={`mt-1 truncate text-[11px] font-bold sm:text-xs ${highlight ? "text-white" : "text-white"
        }`}
    >
      {value}
    </p>
  </div>
);

export default ScrimsSection;

