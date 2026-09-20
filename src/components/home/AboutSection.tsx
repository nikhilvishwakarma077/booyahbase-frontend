import aboutImg from "../../../src/assets/images/image4.jpg"

const AboutSection = () => {
  return (
    <section className="bg-[#090a0d] relative px-6 py-24 text-white sm:px-10 lg:px-16">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
        style={{
          backgroundImage: `url(${aboutImg})`,
        }}
      />

      {/* Top Fade */}
      <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-[#090a0d] to-transparent" />
      {/* Bottom Fade */}
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#090a0d] to-transparent" />


      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-2 lg:items-center">

        {/* Heading */}
        <div>
          <p className="mb-4 text-sm font-bold uppercase tracking-[0.3em] text-white/50">
            About BooyahBase
          </p>

          <h2 className="max-w-xl text-4xl font-black uppercase leading-[0.92] sm:text-5xl lg:text-6xl">
            Built for players who want to compete.
          </h2>

          {/* Accent */}
          <div className="mt-6 flex items-center gap-3">
            <div className="h-1 w-12 bg-white" />
            <div className="h-1 w-3 bg-white/40" />
            <div className="h-1 w-3 bg-white/15" />
          </div>
        </div>

        {/* Content Card */}
        <div className="border border-white/10 bg-[#101010] p-7 sm:p-10">
          <p className="text-base leading-7 text-white/65 sm:text-lg">
            BooyahBase is a competitive gaming platform built for Free Fire
            MAX players. Discover scrims, join competitive matches, find teams,
            and connect with organizers — all in one place.
          </p>

          <div className="mt-10 grid grid-cols-2 gap-6">

            <div className="border-l-2 border-white pl-4">
              <h3 className="text-3xl font-black">
                500+
              </h3>

              <p className="mt-1 text-xs font-bold uppercase tracking-widest text-white/40">
                Scrims
              </p>
            </div>

            <div className="border-l-2 border-white/30 pl-4">
              <h3 className="text-3xl font-black">
                10K+
              </h3>

              <p className="mt-1 text-xs font-bold uppercase tracking-widest text-white/40">
                Players
              </p>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};

export default AboutSection;

