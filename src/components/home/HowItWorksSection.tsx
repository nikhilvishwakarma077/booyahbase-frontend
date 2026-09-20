import workSectionImg from "../../../src/assets/images/image4.jpg"
const HowItWorksSection = () => {
  const steps = [
    {
      number: "01",
      title: "DISCOVER",
      description:
        "Explore upcoming Free Fire MAX scrims and find the right competition for you.",
    },
    {
      number: "02",
      title: "JOIN",
      description:
        "Register your team, secure your spot, and get ready for the battlefield.",
    },
    {
      number: "03",
      title: "COMPETE",
      description:
        "Play against competitive teams and prove what you're capable of.",
    },
  ];

  return (
    <section className="bg-[#090a0d] relative px-6 py-24 text-white sm:px-10 lg:px-16">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
        style={{
          backgroundImage: `url(${workSectionImg})`,
        }}
      />

      {/* Top Fade */}
      <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-[#090a0d] to-transparent" />
      {/* Bottom Fade */}
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#090a0d] to-transparent" />
      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <div className="max-w-2xl">
          <p className="mb-4 text-sm font-bold uppercase tracking-[0.3em] text-white/50">
            How It Works
          </p>

          <h2 className="text-4xl font-black uppercase leading-[0.92] sm:text-5xl lg:text-6xl">
            From lobby to legacy.
          </h2>

          <div className="mt-6 flex items-center gap-3">
            <div className="h-1 w-12 bg-white" />
            <div className="h-1 w-3 bg-white/40" />
            <div className="h-1 w-3 bg-white/20" />
          </div>
        </div>

        {/* Steps */}
        <div className="mt-16 grid gap-5 md:grid-cols-3">
          {steps.map((step) => (
            <div
              key={step.number}
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
                hover:border-white/25
                hover:bg-[#121212]
                sm:p-8
              "
            >
              {/* White hover line */}
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

              {/* Top */}
              <div className="flex items-start justify-between">
                <span className="text-sm font-black tracking-[0.2em] text-white/40">
                  {step.number}
                </span>

                <span
                  className="
                    text-2xl
                    text-white/30
                    transition-all
                    duration-300
                    group-hover:translate-x-1
                    group-hover:text-white
                  "
                >
                  →
                </span>
              </div>

              {/* Content */}
              <div className="mt-20">
                <h3 className="text-3xl font-black uppercase tracking-tight">
                  {step.title}
                </h3>

                <p className="mt-4 max-w-sm text-sm leading-6 text-white/45">
                  {step.description}
                </p>
              </div>

              {/* Bottom accent */}
              <div
                className="
                  mt-8
                  h-px
                  w-10
                  bg-white/10
                  transition-all
                  duration-300
                  group-hover:w-20
                  group-hover:bg-white
                "
              />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default HowItWorksSection;

