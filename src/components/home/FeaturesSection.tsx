import featureImg from "../../../src/assets/images/image4.jpg"

const FeaturesSection = () => {
  const features = [
    {
      number: "01",
      title: "Discover Scrims",
      description:
        "Find active Free Fire MAX scrims with clear details on entry fees, prize pools, formats, tiers, and available slots.",
    },
    {
      number: "02",
      title: "Verified Organizers",
      description:
        "Discover scrims from organizers whose details are collected and verified before being listed on BooyahBase.",
    },
    {
      number: "03",
      title: "Join The Action",
      description:
        "Choose a scrim that fits your team and contact the organizer directly on WhatsApp to secure your spot.",
    },
  ];

  return (
    <section className="bg-[#090a0d] relative px-6 py-24 text-white sm:px-10 lg:px-16">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
        style={{
          backgroundImage: `url(${featureImg})`,
        }}
      />

      {/* Top Fade */}
      <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-[#090a0d] to-transparent" />
      {/* Bottom Fade */}
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#090a0d] to-transparent" />
      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <div className="mb-14 max-w-2xl">
          <p className="mb-4 text-sm font-bold uppercase tracking-[0.3em] text-white/50">
            Why BooyahBase
          </p>

          <h2 className="text-4xl font-black uppercase leading-[0.92] sm:text-5xl lg:text-6xl">
            Everything you need to find your next scrim.
          </h2>

          {/* Section Marker */}
          <div className="mt-6 flex items-center gap-3">
            <div className="h-1 w-12 bg-white" />
            <div className="h-1 w-3 bg-white/40" />
            <div className="h-1 w-3 bg-white/15" />
          </div>
        </div>

        {/* Features */}
        <div className="grid gap-5 md:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.number}
              className="
                group
                relative
                overflow-hidden
                border
                border-white/10
                bg-[#101010]
                p-7
                transition-all
                duration-300
                hover:-translate-y-1
                hover:border-white/30
                hover:bg-[#121212]
                sm:p-8
              "
            >
              {/* Top Accent */}
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

              {/* Number */}
              <span
                className="
                  text-sm
                  font-black
                  tracking-[0.2em]
                  text-white/35
                  transition-colors
                  duration-300
                  group-hover:text-white/70
                "
              >
                {feature.number}
              </span>

              {/* Content */}
              <div className="mt-16">
                <h3 className="text-2xl font-black uppercase tracking-tight sm:text-3xl">
                  {feature.title}
                </h3>

                <p className="mt-4 text-sm leading-6 text-white/45 sm:text-base">
                  {feature.description}
                </p>
              </div>

              {/* Bottom Accent */}
              <div
                className="
                  mt-8
                  h-px
                  w-10
                  bg-white/10
                  transition-all
                  duration-300
                  group-hover:w-full
                  group-hover:bg-white/30
                "
              />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default FeaturesSection;
