import { useNavigate } from "react-router-dom";
import backgroundImg from "../../../src/assets/images/image2.png"
import characterImg from "../../../src/assets/images/charr.png"

const Hero = () => {

  const navigate = useNavigate()
  return (
    <>
      <main className="relative min-h-[100svh] overflow-hidden bg-[#090a0d] text-white">

        {/* =========================================
            BACKGROUND
        ========================================= */}

        <div
          className="
            absolute
            inset-0
            z-0
            bg-cover
            bg-center
            bg-no-repeat
          "
          style={{
            backgroundImage: `url(${backgroundImg})`,
          }}
        />

        {/* Dark Overlay */}
        <div className="absolute inset-0 z-10 bg-black/20" />

        {/* White Atmospheric Lighting */}
        <div
          className="
            absolute
            inset-0
            z-20
            bg-[radial-gradient(circle_at_50%_42%,rgba(255,255,255,0.07),transparent_50%)]
          "
        />

        {/* =========================================
            HERO
        ========================================= */}

        <section
          className="
            relative
            z-30
            mx-auto
            flex
            min-h-[100svh]
            w-full
            max-w-[1530px]
            items-center
            px-4
            sm:px-6
            md:px-8
            lg:px-10
          "
        >

          {/* =====================================
              GIANT BACKGROUND TEXT
          ===================================== */}

          <div
            className="
              pointer-events-none
              absolute
              left-1/2
              top-[15%]
              z-0
              w-full
              -translate-x-1/2
              overflow-hidden

              sm:top-[15%]
              md:top-[16%]
              lg:top-[14%]
            "
          >
            <h1
              className="
                w-full
                whitespace-nowrap
                text-center
                font-black
                leading-none
                tracking-[-0.08em]
                text-white/[0.88]

                text-[14vw]

                sm:text-[14vw]
                md:text-[15vw]
                lg:text-[15vw]
              "
            >
              BOOYAHBASE
            </h1>
          </div>

          {/* =====================================
              CHARACTER
          ===================================== */}

          <div
            className="
              pointer-events-none
              absolute
              inset-x-0
              top-[15%]
              z-10
              flex
              justify-center
              overflow-visible

              sm:top-[29%]
              md:top-[25%]
              lg:top-[24%]
            "
          >
            <img
              src={characterImg}
              alt=""
              className="
                h-[70svh]
                w-auto
                max-w-[90vw]
                object-contain
                object-top
                drop-shadow-[0_25px_60px_rgba(0,0,0,0.8)]

                sm:h-[70svh]
                sm:max-w-[80vw]

                md:h-[70svh]
                md:max-w-[70vw]

                lg:h-[75svh]
                lg:max-w-none

                xl:h-[78svh]
              "
            />
          </div>

          {/* =====================================
              LEFT CONTENT
          ===================================== */}

          <div
            className="
              absolute
              bottom-[100px]
              left-4
              right-4
              z-20

              sm:bottom-[100px]
              sm:left-6
              sm:right-auto
              sm:max-w-[480px]

              md:bottom-[90px]
              md:left-8
              md:max-w-[520px]

              lg:bottom-[70px]
              lg:left-10
              lg:max-w-[540px]

              xl:left-12
            "
          >

            {/* Small Label */}

            <div
              className="
                mb-3
                flex
                items-center
                gap-2
                text-[8px]
                font-bold
                tracking-[0.25em]
                text-white/70

                sm:mb-4
                sm:text-[9px]

                md:text-xs
              "
            >
              <span>FIND</span>

              <span className="h-1 w-1 rounded-full bg-white/40" />

              <span>JOIN</span>

              <span className="h-1 w-1 rounded-full bg-white/40" />

              <span>COMPETE</span>
            </div>

            {/* Heading */}

            <h2
              className="
                max-w-[520px]
                text-[28px]
                font-black
                uppercase
                leading-[0.95]
                tracking-[-0.03em]

                min-[380px]:text-[32px]

                sm:text-[38px]

                md:text-[46px]

                lg:text-[52px]

                xl:text-[56px]
              "
            >
              Discover Scrims.
              <br />
              <span className="text-white/60">
                Compete Hard.
              </span>
            </h2>

            {/* Description */}

            <p
              className="
                mt-3
                max-w-[420px]
                text-[11px]
                leading-5
                text-white/55

                min-[380px]:text-xs

                sm:mt-4
                sm:text-sm
                sm:leading-6

                md:text-base
                md:leading-7
              "
            >
              Find active Free Fire MAX scrims, discover verified organizers,
              and get into the competition without the hassle.
            </p>

            {/* Buttons */}

            <div
              className="
                mt-4
                flex
                flex-wrap
                gap-2.5

                sm:mt-5
                sm:gap-3

                md:mt-6
                md:gap-4
              "
            >
              <button
              onClick={()=>{navigate("/scrims")}}
                className="
                  h-10
                  cursor-pointer
                  bg-white
                  px-4
                  text-[11px]
                  font-black
                  text-black
                  transition
                  hover:bg-white/85

                  min-[380px]:px-5

                  sm:h-11
                  sm:px-6
                  sm:text-xs

                  md:h-12
                  md:text-sm
                "
              >
                Explore Scrims →
              </button>

              {/* <button
                className="
                  h-10
                  cursor-pointer
                  border
                  border-white/15
                  bg-black/30
                  px-4
                  text-[11px]
                  font-bold
                  text-white/75
                  transition-all
                  hover:border-white/40
                  hover:bg-white/[0.05]
                  hover:text-white

                  min-[380px]:px-5

                  sm:h-11
                  sm:px-6
                  sm:text-xs

                  md:h-12
                  md:text-sm
                "
              >
                How It Works
              </button> */}
            </div>
          </div>

          {/* =====================================
              DESKTOP STATS
          ===================================== */}

          <div
            className="
              absolute
              bottom-[60px]
              right-6
              z-20
              hidden
              w-[230px]
              border
              border-white/10
              bg-[#101010]/90
              p-4
              shadow-2xl
              backdrop-blur-xl

              lg:block
              lg:right-8

              xl:right-10
              xl:w-[250px]
            "
          >
            <Stat
              number="5+"
              label="Active Scrims"
            />

            <div className="my-3 h-px bg-white/[0.07]" />

            <Stat
              number="T1–T3"
              label="Scrim Tiers"
            />

            <div className="my-3 h-px bg-white/[0.07]" />

            <Stat
              number="24/7"
              label="Scrim Discovery"
            />
          </div>

          {/* =====================================
              MOBILE / TABLET STATS
          ===================================== */}

          <div
            className="
              absolute
              bottom-4
              left-4
              right-4
              z-30
              grid
              grid-cols-3
              gap-2

              sm:bottom-5
              sm:left-6
              sm:right-6
              sm:gap-3

              md:left-8
              md:right-8

              lg:hidden
            "
          >
            <MobileStat
              number="5+"
              label="Scrims"
            />

            <MobileStat
              number="T1–T3"
              label="Tiers"
            />

            <MobileStat
              number="24/7"
              label="Discovery"
            />
          </div>

          {/* =====================================
              BOTTOM FADE
          ===================================== */}

          <div
            className="
              pointer-events-none
              absolute
              bottom-0
              left-0
              right-0
              z-15
              h-28
              bg-gradient-to-t
              from-[#090a0d]
              to-transparent

              sm:h-36
              md:h-40
            "
          />

        </section>
      </main>
    </>
  );
};


/* =========================================
   DESKTOP STAT
========================================= */

const Stat = ({
  number,
  label,
}: {
  number: string;
  label: string;
}) => {
  return (
    <div className="flex items-center gap-4">
      <div
        className="
          flex
          h-11
          w-11
          shrink-0
          items-center
          justify-center
          border
          border-white/15
          bg-white/[0.04]
          text-lg
          text-white/80
        "
      >
        ◈
      </div>

      <div className="min-w-0">
        <p className="text-lg font-black text-white">
          {number}
        </p>

        <p className="truncate text-xs text-white/45">
          {label}
        </p>
      </div>
    </div>
  );
};


/* =========================================
   MOBILE STAT
========================================= */

const MobileStat = ({
  number,
  label,
}: {
  number: string;
  label: string;
}) => {
  return (
    <div
      className="
        flex
        min-w-0
        flex-col
        items-center
        justify-center
        border
        border-white/10
        bg-[#101010]/90
        px-1
        py-2
        backdrop-blur-xl

        min-[380px]:py-2.5

        sm:py-3
      "
    >
      <p
        className="
          text-[11px]
          font-black
          text-white

          min-[380px]:text-xs

          sm:text-sm
        "
      >
        {number}
      </p>

      <p
        className="
          mt-0.5
          max-w-full
          truncate
          text-[7px]
          text-white/40

          min-[380px]:text-[8px]

          sm:text-[10px]
        "
      >
        {label}
      </p>
    </div>
  );
};

export default Hero;
