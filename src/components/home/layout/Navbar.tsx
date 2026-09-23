import { useState } from "react";
import { Menu, Search, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import Logo from "../../../assets/images/Logo.png"

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => {
    if (path === "/") return location.pathname === "/";
    return location.pathname.startsWith(path);
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4 sm:px-6 lg:px-9">
      <nav
        className="
          mx-auto
          flex
          h-[68px]
          max-w-[1530px]
          items-center
          justify-between
          border
          border-white/10
          bg-[#101010]/95
          px-4
          shadow-2xl
          backdrop-blur-xl

          sm:px-6

          lg:h-[72px]
          lg:px-7
        "
      >
        {/* Logo */}
        <Link to="/" className="-translate-x-5">
          <img
            src={Logo}
            className="w-15 md:w-20"
            alt="BooyahBase"
          />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-1 md:flex">
          <NavItem href="/" active={isActive("/")}>
            Home
          </NavItem>

          <NavItem href="/scrims" active={isActive("/scrims")}>
            Scrims
          </NavItem>

          <NavItem href="/organizers" active={isActive("/organizers")}>
            Organizers
          </NavItem>
          <NavItem href="/tournaments" active={isActive("/tournaments")}>
            Tournaments
          </NavItem>
        </div>

        {/* Desktop Search */}
        <div className="hidden md:flex">
          <button
            aria-label="Search"
            className="
              flex
              h-10
              w-10
              items-center
              justify-center
              text-white/55
              transition-all
              hover:bg-white/[0.04]
              hover:text-white

              lg:h-11
              lg:w-11
            "
          >
            <Search size={20} strokeWidth={1.8} />
          </button>
        </div>

        {/* Mobile Actions */}
        <div className="flex items-center gap-1 md:hidden">
          <button
            aria-label="Search"
            className="
              flex
              h-10
              w-10
              items-center
              justify-center
              text-white/60
              transition
              hover:bg-white/[0.04]
              hover:text-white
            "
          >
            <Search size={20} strokeWidth={1.8} />
          </button>

          <button
            aria-label="Open menu"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="
              flex
              h-10
              w-10
              items-center
              justify-center
              text-white/70
              transition
              hover:bg-white/[0.04]
              hover:text-white
            "
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div
          className="
            mx-auto
            mt-2
            max-w-[1530px]
            border
            border-white/10
            bg-[#101010]
            p-3
            shadow-2xl
            backdrop-blur-xl
            md:hidden
          "
        >
          <div className="flex flex-col gap-1">
            <MobileNavItem
              href="/"
              active={isActive("/")}
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </MobileNavItem>

            <MobileNavItem
              href="/scrims"
              active={isActive("/scrims")}
              onClick={() => setMobileMenuOpen(false)}
            >
              Scrims
            </MobileNavItem>

            <MobileNavItem
              href="/organizers"
              active={isActive("/organizers")}
              onClick={() => setMobileMenuOpen(false)}
            >
              Organizers
            </MobileNavItem>
          </div>
        </div>
      )}
    </header>
  );
};

/* =========================================
   DESKTOP NAV ITEM
========================================= */

const NavItem = ({
  href,
  children,
  active = false,
}: {
  href: string;
  children: React.ReactNode;
  active?: boolean;
}) => (
  <Link
    to={href}
    className={`
      relative
      px-4
      py-2.5
      text-sm
      font-medium
      transition-all
      lg:px-6

      ${active
        ? "text-white"
        : "text-white/50 hover:text-white"
      }

      after:absolute
      after:bottom-0
      after:left-1/2
      after:h-[2px]
      after:-translate-x-1/2
      after:bg-white
      after:transition-all
      after:duration-300

      ${active
        ? "after:w-5"
        : "after:w-0 hover:after:w-3"
      }
    `}
  >
    {children}
  </Link>
);

/* =========================================
   MOBILE NAV ITEM
========================================= */

const MobileNavItem = ({
  href,
  children,
  active = false,
  onClick,
}: {
  href: string;
  children: React.ReactNode;
  active?: boolean;
  onClick: () => void;
}) => (
  <Link
    to={href}
    onClick={onClick}
    className={`
      border-l-2
      px-4
      py-3
      text-sm
      font-medium
      transition-all

      ${active
        ? "border-white bg-white/[0.05] text-white"
        : "border-transparent text-white/60 hover:border-white/40 hover:bg-white/[0.03] hover:text-white"
      }
    `}
  >
    {children}
  </Link>
);

export default Navbar;
