import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { getOrganizers } from "../../services/organizer.service";
import type { IOrganizer } from "../../types/organizer";

const OrganizersMarquee = () => {
    const [organizers, setOrganizers] = useState<IOrganizer[]>([]);

    useEffect(() => {
        const fetchOrganizers = async () => {
            try {
                const data = await getOrganizers();
                setOrganizers(data);
            } catch (error) {
                console.error("Failed to fetch organizers:", error);
            }
        };

        fetchOrganizers();
    }, []);

    if (!organizers.length) return null;

    // Duplicate for seamless infinite animation
    const marqueeItems = [...organizers, ...organizers];

    return (
        <section className="overflow-hidden border-y border-white/10 bg-[#090a0d] py-14 sm:py-16">
            {/* Heading */}
            <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-16">
                <p className="text-center text-[10px] font-bold uppercase tracking-[0.3em] text-white/30"> Trusted Scrim Organizers </p>
                <h2 className="mt-2 text-center text-xl font-black uppercase tracking-tight text-white sm:text-2xl mb-5"> Built Around The Community
                </h2>
            </div>

            {/* Marquee */}
            <div className="relative">
                {/* Left Fade */}
                <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 bg-gradient-to-r from-[#090a0d] to-transparent sm:w-32" />

                {/* Right Fade */}
                <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 bg-gradient-to-l from-[#090a0d] to-transparent sm:w-32" />

                <div className="flex w-max animate-organizer-marquee">
                    {marqueeItems.map((organizer, index) => (
                        <Link
                            key={`${organizer._id}-${index}`}
                            to={`/organizers/${organizer._id}`}
                            className="
                group
                mx-2
                flex
                shrink-0
                items-center
                gap-4
                border
                border-white/10
                bg-white/[0.02]
                px-5
                py-4
                transition-colors
                hover:border-white/25
                hover:bg-white/[0.04]
                sm:mx-3
                sm:px-6
                sm:py-5
              "
                        >
                            {/* Image */}
                            <div
                                className="
                  h-12
                  w-12
                  shrink-0
                  overflow-hidden
                  border
                  border-white/10
                  bg-white
                  sm:h-14
                  sm:w-14
                "
                            >
                                {organizer.orgImg ? (
                                    <img
                                        src={`/scrimsImg/${organizer.orgImg}`}
                                        alt={organizer.name}
                                        className="h-full w-full object-cover"
                                    />
                                ) : (
                                    <div className="flex h-full w-full items-center justify-center text-lg font-black text-black">
                                        {organizer.name.charAt(0).toUpperCase()}
                                    </div>
                                )}
                            </div>

                            {/* Name */}
                            <div className="min-w-[120px]">
                                <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-white/30">
                                    Organizer
                                </p>

                                <p className="mt-1 max-w-[180px] truncate text-sm font-bold uppercase text-white transition-colors group-hover:text-white/70 sm:text-base">
                                    {organizer.name}
                                </p>

                                {organizer.isVerified && (
                                    <p className="mt-1 text-[9px] font-bold uppercase tracking-wider text-white/30">
                                        ✓ Verified
                                    </p>
                                )}
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default OrganizersMarquee;
