
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { getOrganizers } from "../../services/organizer.service";
import type { IOrganizer } from "../../types/organizer";
import orgBackgroundImg from "../../../src/assets/images/image2.png"

const Organizers = () => {
  const [organizers, setOrganizers] = useState<IOrganizer[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrganizers = async () => {
      try {
        const data = await getOrganizers();
        setOrganizers(data);
      } catch (error) {
        console.error("Failed to fetch organizers:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrganizers();
  }, []);

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#090a0d] text-white">
        <div className="text-center">
          <div className="mx-auto mb-4 h-1 w-10 bg-white" />

          <p className="text-xs font-bold uppercase tracking-wider text-white/40">
            Loading Organizers...
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#090a0d] relative px-5 py-28 text-white sm:px-8 sm:py-24 lg:px-16">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
        style={{
          backgroundImage: `url(${orgBackgroundImg})`,
        }}
      />

      {/* Top Fade */}
      <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-[#090a0d] to-transparent" />
      {/* Bottom Fade */}
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#090a0d] to-transparent" />
      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <section>
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-white/50">
            BooyahBase
          </p>

          <h1 className="mt-3 text-4xl font-black uppercase leading-none sm:text-6xl">
            Organizers
          </h1>

          <div className="mt-6 flex items-center gap-3">
            <div className="h-1 w-12 bg-white" />
            <div className="h-1 w-3 bg-white/40" />
            <div className="h-1 w-3 bg-white/20" />
          </div>

          <p className="mt-5 max-w-2xl text-sm leading-6 text-white/40">
            Discover verified and active Free Fire MAX scrim organizers
            and explore the competitions they run.
          </p>
        </section>

        {/* Empty */}
        {organizers.length === 0 ? (
          <div className="mt-12 border border-white/10 bg-[#101010] p-12 text-center">
            <div className="mx-auto mb-5 h-1 w-10 bg-white" />

            <p className="text-sm font-bold uppercase tracking-wider text-white/40">
              No organizers available
            </p>
          </div>
        ) : (
          <section className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {organizers.map((organizer: IOrganizer) => (
              <Link
                key={organizer._id}
                to={`/organizers/${organizer._id}`}
                className="
                  group
                  relative
                  overflow-hidden
                  border
                  border-white/10
                  bg-[#101010]
                  p-6
                  transition-all
                  duration-300
                  hover:-translate-y-1
                  hover:border-white/25
                  hover:bg-[#121212]
                "
              >
                {/* Top White Accent */}
                <div
                  className="
                    absolute
                    left-0
                    top-0
                    h-1
                    w-0
                    bg-white
                    transition-all
                    duration-300
                    group-hover:w-full
                  "
                />

                {/* Avatar + Name */}
                <div className="flex items-center gap-4">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden border border-white/15 bg-white/[0.04]">
                    <img
                      src={`/scrimsImg/${organizer.orgImg}`}
                      alt={organizer.name}
                      className="h-full w-full object-cover"
                    />
                  </div>


                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <h2 className="truncate text-lg font-black uppercase">
                        {organizer.name}
                      </h2>

                      {organizer.isVerified && (
                        <span
                          className="
                            flex
                            items-center
                            gap-1
                            text-[9px]
                            font-bold
                            uppercase
                            tracking-wider
                            text-white/70
                          "
                        >
                          <span>✓</span>
                          Verified
                        </span>
                      )}
                    </div>

                    <p className="mt-1 text-xs text-white/30">
                      Free Fire MAX Organizer
                    </p>
                  </div>
                </div>

                {/* Description */}
                {organizer.description ? (
                  <p className="mt-6 line-clamp-2 text-sm leading-6 text-white/40">
                    {organizer.description}
                  </p>
                ) : (
                  <p className="mt-6 text-sm text-white/20">
                    No description available.
                  </p>
                )}

                {/* Contact / Action */}
                <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-5">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-white/25">
                    Organizer
                  </span>

                  <span
                    className="
                      text-xs
                      font-bold
                      uppercase
                      tracking-wider
                      text-white/40
                      transition-all
                      duration-300
                      group-hover:translate-x-1
                      group-hover:text-white
                    "
                  >
                    View Organizer →
                  </span>
                </div>
              </Link>
            ))}
          </section>
        )}
      </div>
    </main>
  );
};

export default Organizers;

