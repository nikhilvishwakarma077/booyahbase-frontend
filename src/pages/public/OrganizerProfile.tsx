
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { FaEnvelope, FaInstagram, FaDiscord, FaYoutube } from "react-icons/fa";
import { getOrganizerById } from "../../services/organizer.service";
import { getScrims } from "../../services/scrim.service";

import type { IOrganizer } from "../../types/organizer";
import type { IScrim } from "../../types/scrim";
import orgDetailImg from "../../../src/assets/images/image2.png"

const OrganizerProfile = () => {
  const { id } = useParams<{ id: string }>();

  const [organizer, setOrganizer] = useState<IOrganizer | null>(null);
  const [organizerScrims, setOrganizerScrims] = useState<IScrim[]>([]);
  const [loading, setLoading] = useState(true);
  const [showDescription, setShowDescription] = useState(false);

  useEffect(() => {
    if (!id) return;

    const fetchOrganizer = async () => {
      try {
        const [organizerData, scrimsData] = await Promise.all([
          getOrganizerById(id),
          getScrims(),
        ]);

        setOrganizer(organizerData);

        const organizerScrims = scrimsData.filter(
          (scrim: IScrim) => scrim.organizerId._id === id
        );
        setOrganizerScrims(organizerScrims);
      } catch (error) {
        console.error("Failed to fetch organizer:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrganizer();
  }, [id]);

  /* Loading */
  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#090a0d] text-white">
        <div className="text-center">
          <div className="mx-auto mb-4 h-1 w-10 bg-white" />

          <p className="text-xs font-bold uppercase tracking-wider text-white/40">
            Loading Organizer...
          </p>
        </div>
      </main>
    );
  }

  /* Not Found */
  if (!organizer) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#090a0d] px-5 text-white">
        <div className="text-center">
          <div className="mx-auto mb-5 h-1 w-12 bg-white" />

          <h1 className="text-4xl font-black uppercase">
            Organizer Not Found
          </h1>

          <Link
            to="/scrims"
            className="
              mt-7
              inline-block
              bg-white
              px-6
              py-3
              text-sm
              font-black
              uppercase
              text-black
              transition
              hover:bg-white/85
            "
          >
            Back to Scrims
          </Link>
        </div>
      </main>
    );
  }

  /*
   * Organizer stats
   */
  // const openScrims = organizerScrims.filter((scrim) => {
  //   const hasAvailableSlots = scrim.variants.some(
  //     (variant) => variant.availableSlots > 0
  //   );

  //   return scrim.published && hasAvailableSlots;
  // }).length;

  const totalPrizePool = organizerScrims.reduce((sum, scrim) => {
    const highestPrize = Math.max(
      ...scrim.variants.map((variant) => variant.prizePool)
    );

    return sum + highestPrize;
  }, 0);

  return (
    <main className="min-h-screen relative bg-[#090a0d] px-5 py-28 text-white sm:px-8 lg:px-16">
      <div
        className="absolute inset-0  pointer-events-none bg-cover bg-center bg-no-repeat opacity-20"
        style={{
          backgroundImage: `url(${orgDetailImg})`,
        }}
      />

      {/* Top Fade */}
      <div className="absolute  pointer-events-none inset-x-0 top-0 h-32 bg-gradient-to-b from-[#090a0d] to-transparent" />
      {/* Bottom Fade */}
      <div className="absolute  pointer-events-none inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#090a0d] to-transparent" />
      <div className="mx-auto max-w-6xl">

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

        {/* Organizer Header */}
        <section
          className="
            relative
            mt-10
            overflow-hidden
            border
            border-white/10
            bg-[#101010]
            p-6
            sm:p-10
          "
        >
          <div className="absolute left-0 top-0 h-1 w-24 bg-white" />

          <div className="flex flex-col gap-7 sm:flex-row sm:items-center">

            {/* Initial */}
            {organizer.orgImg ? (
              <img
                src={`/scrimsImg/${organizer.orgImg}`}
                alt={organizer.name}
                className="
      h-20
      w-20
      shrink-0
      border
      border-white/20
      bg-white
      object-cover
    "
              />
            ) : (
              <div
                className="
      flex
      h-20
      w-20
      shrink-0
      items-center
      justify-center
      border
      border-white/20
      bg-white
      text-2xl
      font-black
      text-black
    "
              >
                {organizer.name.charAt(0).toUpperCase()}
              </div>
            )}

            {/* Details */}
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-3">
                <h1 className="break-words text-3xl font-black uppercase leading-tight sm:text-5xl">
                  {organizer.name}
                </h1>

                {organizer.isVerified && (
                  <span
                    className="
          shrink-0
          border
          border-white/20
          bg-white/[0.04]
          px-3
          py-1
          text-[10px]
          font-bold
          uppercase
          tracking-wider
          text-white/70
        "
                  >
                    ✓ Verified
                  </span>
                )}
              </div>

              {organizer.description && (
                <div className="mt-3 max-w-2xl">
                  <p
                    className={`
          break-words
          text-sm
          leading-6
          text-white/40
          ${!showDescription ? "line-clamp-3 sm:line-clamp-4" : ""}
        `}
                  >
                    {organizer.description}
                  </p>

                  <button
                    type="button"
                    onClick={() => setShowDescription((prev) => !prev)}
                    className="
          mt-2
          text-[10px]
          font-bold
          uppercase
          tracking-[0.15em]
          text-white/50
          transition-colors
          hover:text-white
        "
                  >
                    {showDescription ? "Show Less ↑" : "Read More →"}
                  </button>
                </div>
              )}
            </div>

          </div>
        </section>

        {/* Stats */}
        <section className="mt-4  grid grid-cols-2 gap-4 sm:grid-cols-3">
          <Stat
            label="Total Scrims"
            value={organizerScrims.length.toString()}
          />

          {/* <Stat
            label="Open Scrims"
            value={openScrims.toString()}
          /> */}

          <Stat
            label="Prize Pool"
            value={`₹${totalPrizePool.toLocaleString("en-IN")}`}
          />
        </section>

        {/* Contact Information */}
        {organizer.contactInformation &&
          (organizer.contactInformation.email ||
            organizer.contactInformation.instagram ||
            organizer.contactInformation.discord ||
            organizer.contactInformation.telegram) && (
            <section
              className="
        mt-4
        border
        border-white/10
        bg-[#101010]
        p-6
        sm:p-7
      "
            >
              <div className="flex items-center gap-3">
                <div className="h-1 w-8 bg-white" />

                <p className="text-xs font-bold uppercase tracking-[0.25em] text-white/40">
                  Contact
                </p>
              </div>

              <div className="mt-5 flex flex-wrap gap-3">
                {organizer.contactInformation.email && (
                  <a
                    href={`mailto:${organizer.contactInformation.email}`}
                    aria-label="Email"
                    className="
              flex h-11 w-11
              items-center justify-center
              border border-white/10
              bg-black/20
              text-lg text-white/50
              transition-colors
              hover:border-white/30
              hover:text-white
            "
                  >
                    <FaEnvelope />
                  </a>
                )}

                {organizer.contactInformation.instagram && (
                  <a
                    href={organizer.contactInformation.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Instagram"
                    className="
              flex h-11 w-11
              items-center justify-center
              border border-white/10
              bg-black/20
              text-lg text-white/50
              transition-colors
              hover:border-white/30
              hover:text-white
            "
                  >
                    <FaInstagram />
                  </a>
                )}

                {organizer.contactInformation.discord && (
                  <a
                    href={organizer.contactInformation.discord}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Discord"
                    className="
              flex h-11 w-11
              items-center justify-center
              border border-white/10
              bg-black/20
              text-lg text-white/50
              transition-colors
              hover:border-white/30
              hover:text-white
            "
                  >
                    <FaDiscord />
                  </a>
                )}

                {organizer.contactInformation.telegram && (
                  <a
                    href={organizer.contactInformation.telegram}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="YouTube"
                    className="
              flex h-11 w-11
              items-center justify-center
              border border-white/10
              bg-black/20
              text-lg text-white/50
              transition-colors
              hover:border-white/30
              hover:text-white
            "
                  >
                    <FaYoutube />
                  </a>
                )}
              </div>
            </section>
          )}

        {/* Scrims */}
        <section className="mt-14">
          <div className="mb-7">
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-white/50">
              Organizer Scrims
            </p>

            <h2 className="mt-2 text-3xl font-black uppercase sm:text-4xl">
              Upcoming Competitions
            </h2>

            <div className="mt-6 flex items-center gap-3">
              <div className="h-1 w-12 bg-white" />
              <div className="h-1 w-3 bg-white/40" />
              <div className="h-1 w-3 bg-white/20" />
            </div>
          </div>

          {organizerScrims.length === 0 ? (
            <div
              className="
                border
                border-white/10
                bg-[#101010]
                p-10
                text-center
              "
            >
              <p className="text-sm font-bold uppercase text-white/40">
                No scrims available
              </p>
            </div>
          ) : (
            <div >
              {/* Cards */}
              {!loading && organizerScrims.length > 0 && (
                <div className="grid  grid-cols-1 gap-4 sm:gap-5 md:grid-cols-2">
                  {organizerScrims.map((scrim) => {
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
          )}
        </section>

        {/* Empty */}
        {!loading && organizerScrims.length === 0 && (
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
    </main>
  );
};

const Stat = ({
  label,
  value,
}: {
  label: string;
  value: string;
}) => (
  <div
    className="
      border
      border-white/10
      bg-[#101010]
      p-6
      transition-colors
      duration-300
      hover:border-white/20
    "
  >
    <p className="text-xs uppercase tracking-wider text-white/30">
      {label}
    </p>

    <p className="mt-2 text-2xl font-black text-white">
      {value}
    </p>
  </div>
);

const Info = ({
  label,
  value,
}: {
  label: string;
  value: string;
}) => (
  <div className="border border-white/10 bg-black/20 p-4">
    <p className="text-[9px] uppercase tracking-wider text-white/25">
      {label}
    </p>

    <p className="mt-1 text-sm font-bold text-white">
      {value}
    </p>
  </div>
);

// const Feature = ({ label }: { label: string }) => (
//   <span
//     className="
//       border
//       border-white/10
//       bg-white/[0.03]
//       px-2.5
//       py-1
//       text-[9px]
//       font-bold
//       uppercase
//       tracking-wider
//       text-white/45
//     "
//   >
//     {label}
//   </span>
// );

//const ContactItem = ({
//  icon,
//  label,
//  value,
//}: {
//  icon: React.ReactNode;
//  label: string;
//  value: string;
//}) => {
//  return (
//    <div
//      className="
 //       flex
  //      min-w-0
   //     items-center
  //      gap-3
    //    border
   //     border-white/10
   //     bg-black/20
   //     px-4
   //     py-3
    //  "
  //  >
  //    <span className="shrink-0 text-lg text-white/70">
   //     {icon}
 //     </span>

    //  <div className="min-w-0">
     //   <p className="text-[9px] font-bold uppercase tracking-wider text-white/30">
        //  {label}
      //  </p>

       // <p className="mt-1 truncate text-xs font-medium text-white/70">
        //  {value}
     //   </p>
    //  </div>
  //  </div>
 // );
//};

export default OrganizerProfile;
