import CTAImg from "../../../src/assets/images/image6.jpg"
const CTASection = () => {
  return (
    <section className="bg-[#090a0d] relative px-6 py-24 text-white sm:px-10 lg:px-16">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
        style={{
          backgroundImage: `url(${CTAImg})`,
        }}
      />

      {/* Top Fade */}
      <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-[#090a0d] to-transparent" />
      {/* Bottom Fade */}
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#090a0d] to-transparent" />
      <div className="mx-auto max-w-7xl">
        <div
          className="
            relative
            overflow-hidden
            border
            border-white/10
            bg-[#101010]
            px-6
            py-16
            text-center
            sm:px-10
            sm:py-20
            lg:px-20
            lg:py-24
          "
        >
          {/* Background Text */}
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden">
            <span
              className="
                whitespace-nowrap
                text-[18vw]
                font-black
                uppercase
                leading-none
                text-white/[0.045]
              "
            >
              BOOYAH
            </span>
          </div>

          {/* White Accent */}
          <div className="absolute left-1/2 top-0 h-1 w-24 -translate-x-1/2 bg-white" />

          {/* Content */}
          <div className="relative z-10 mx-auto max-w-3xl">
            <p className="mb-5 text-xs font-bold uppercase tracking-[0.3em] text-white/50 sm:text-sm">
              Ready to Compete?
            </p>

            <h2 className="text-4xl font-black uppercase leading-[0.92] sm:text-5xl lg:text-7xl">
              Your next
              <br />
              <span className="text-white/40">booyah awaits.</span>
            </h2>

            <p className="mx-auto mt-6 max-w-xl text-sm leading-6 text-white/45 sm:text-base">
              Find your next scrim, build your team, and step into the
              battlefield with BooyahBase.
            </p>

            {/* Buttons */}
            <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
              <button
                className="
                  bg-white
                  px-7
                  py-4
                  text-sm
                  font-black
                  uppercase
                  tracking-wide
                  text-black
                  transition-all
                  duration-200
                  hover:bg-white/85
                "
              >
                Explore Scrims →
              </button>

              <button
                className="
                  border
                  border-white/15
                  bg-white/[0.03]
                  px-7
                  py-4
                  text-sm
                  font-bold
                  text-white
                  transition-all
                  duration-200
                  hover:border-white/40
                  hover:bg-white/[0.06]
                  hover:text-white
                "
              >
                Organizers
              </button>
            </div>
          </div>

          {/* Bottom Accent */}
          <div
            className="
              absolute
              bottom-0
              left-0
              h-px
              w-full
              bg-gradient-to-r
              from-transparent
              via-white/20
              to-transparent
            "
          />
        </div>
      </div>
    </section>
  );
};

export default CTASection;
