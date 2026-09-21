import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#090a0d] px-5 text-white">
      {/* Background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 border border-white/[0.03]" />
        <div className="absolute left-1/2 top-1/2 h-52 w-52 -translate-x-1/2 -translate-y-1/2 border border-white/[0.04]" />
        <div className="absolute left-1/2 top-1/2 h-32 w-32 -translate-x-1/2 -translate-y-1/2 border border-white/[0.05]" />
      </div>

      {/* Top / Bottom Fade */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-[#090a0d] to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#090a0d] to-transparent" />

      <div className="relative z-10 w-full max-w-xl text-center">
        {/* Brand */}
        <p className="text-xs font-bold uppercase tracking-[0.35em] text-white/40">
          BooyahBase
        </p>

        {/* 404 */}
        <h1 className="mt-6 text-[clamp(7rem,25vw,13rem)] font-black leading-[0.8] tracking-[-0.08em] text-white/[0.08]">
          404
        </h1>

        {/* Accent */}
        <div className="mx-auto mt-8 flex items-center justify-center gap-3">
          <div className="h-1 w-12 bg-white" />
          <div className="h-1 w-3 bg-white/40" />
          <div className="h-1 w-3 bg-white/20" />
        </div>

        <h2 className="mt-6 text-2xl font-black uppercase tracking-tight sm:text-3xl">
          Scrim Not Found
        </h2>

        <p className="mx-auto mt-4 max-w-md text-sm leading-6 text-white/40">
          The page you're looking for doesn't exist, was removed, or the
          link may be outdated.
        </p>

        {/* Actions */}
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link
            to="/"
            className="
              border
              border-white
              bg-white
              px-6
              py-3
              text-[10px]
              font-bold
              uppercase
              tracking-[0.18em]
              text-black
              transition-colors
              hover:bg-transparent
              hover:text-white
            "
          >
            Back Home
          </Link>

          <Link
            to="/scrims"
            className="
              border
              border-white/15
              bg-white/[0.03]
              px-6
              py-3
              text-[10px]
              font-bold
              uppercase
              tracking-[0.18em]
              text-white/60
              transition-colors
              hover:border-white/30
              hover:text-white
            "
          >
            Browse Scrims
          </Link>
        </div>

        {/* Bottom label */}
        <p className="mt-10 text-[9px] font-bold uppercase tracking-[0.25em] text-white/20">
          Find. Join. Booyah.
        </p>
      </div>
    </main>
  );
};

export default NotFound;
