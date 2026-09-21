import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaArrowUp, FaInstagram, FaYoutube } from "react-icons/fa";

const Footer = () => {
  const [showTopButton, setShowTopButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowTopButton(window.scrollY > 400);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="relative border-t border-white/10 bg-[#090a0d] text-white">
      {/* Back To Top */}
      {showTopButton && (
        <button
          type="button"
          onClick={scrollToTop}
          aria-label="Back to top"
          className="
            fixed
            bottom-5
            right-5
            z-50
            flex
            h-11
            w-11
            items-center
            justify-center
            border
            border-white/20
            bg-[#101010]
            text-white/60
            shadow-lg
            transition-all
            duration-200
            hover:border-white/40
            hover:text-white
            sm:bottom-7
            sm:right-7
          "
        >
          <FaArrowUp className="text-sm" />
        </button>
      )}

      <div className="mx-auto max-w-7xl px-5 py-12 sm:px-6 sm:py-14 lg:px-16">
        <div className="grid gap-10 md:grid-cols-[1.5fr_1fr_1fr]">
          {/* Brand */}
          <div>
            <Link
              to="/"
              className="text-xl font-black uppercase tracking-tight"
            >
              BooyahBase
            </Link>

            <p className="mt-4 max-w-sm text-sm leading-6 text-white/35">
              Discover Free Fire MAX scrims, find the right matches,
              and connect directly with verified organizers.
            </p>

            {/* Socials */}
            <div className="mt-6 flex items-center gap-2">
              <a
                href="#"
                aria-label="Instagram"
                className="
                  flex h-10 w-10
                  items-center justify-center
                  border border-white/10
                  bg-white/[0.02]
                  text-white/40
                  transition-colors
                  hover:border-white/25
                  hover:text-white
                "
              >
                <FaInstagram />
              </a>

              <a
                href="#"
                aria-label="YouTube"
                className="
                  flex h-10 w-10
                  items-center justify-center
                  border border-white/10
                  bg-white/[0.02]
                  text-white/40
                  transition-colors
                  hover:border-white/25
                  hover:text-white
                "
              >
                <FaYoutube />
              </a>
            </div>
          </div>

          {/* Explore */}
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-white/30">
              Explore
            </p>

            <div className="mt-5 flex flex-col gap-3">
              <Link
                to="/"
                className="text-sm text-white/50 transition-colors hover:text-white"
              >
                Home
              </Link>

              <Link
                to="/scrims"
                className="text-sm text-white/50 transition-colors hover:text-white"
              >
                Scrims
              </Link>

              <Link
                to="/organizers"
                className="text-sm text-white/50 transition-colors hover:text-white"
              >
                Organizers
              </Link>
            </div>
          </div>

          {/* Platform */}
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-white/30">
              Platform
            </p>

            <p className="mt-5 max-w-xs text-sm leading-6 text-white/35">
              BooyahBase helps players discover competitive scrims.
              Registration and payments are handled directly by organizers.
            </p>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 flex flex-col gap-4 border-t border-white/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[10px] uppercase tracking-wider text-white/25">
            © {new Date().getFullYear()} BooyahBase. All rights reserved.
          </p>

          <p className="text-[10px] uppercase tracking-wider text-white/20">
            Find. Join. Booyah.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
