import { useState } from "react";
import {
  RiMenuLine,
  RiCloseLine,
  RiUser3Line,
} from "react-icons/ri";
import useHideOnScroll from "../hooks/useHideOnScroll"; // ✅ import custom hook

export default function Header({ isLoggedIn }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const showNav = useHideOnScroll(5); // ✅ threshold in px

  return (
    <>
      {/* Navbar */}
      <nav
        className={`fixed top-0 left-0 w-full flex justify-between items-center h-[11vh] px-5 lg:px-10 bg-gradient-to-r from-[#121212] via-[#232323] to-[#121212] text-white shadow-lg transition-all duration-300 z-50 ${
          showNav ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        {/* Logo */}
        <div className="flex items-center gap-3">
          <img
            src="https://res.cloudinary.com/dlk5kntmy/image/upload/v1747502420/Student_council_vjzt0j.png"
            alt="Council Logo"
            className="h-12 w-auto object-contain hover:scale-105 transition-transform duration-300"
          />
          <h1 className="text-lg md:text-xl lg:text-2xl font-bold tracking-widest text-red-500 uppercase">
            Student Council
          </h1>
        </div>

        {/* Desktop Links */}
        <ul className="hidden md:flex items-center gap-8 font-medium">
          <NavLink href="/" label="Home" />
          <NavLink href="/members" label="Members" />
          <NavLink href="/clubs" label="Clubs" />
          <NavLink href="/faculty" label="Mentors" />
          <NavLink href="/gallery" label="Event Gallery" />

          {isLoggedIn ? (
            <a
              href="/userPage"
              className="w-10 h-10 flex items-center justify-center rounded-md bg-white/10 border border-white/20 hover:bg-red-500 transition-all duration-300"
            >
              <RiUser3Line size={20} />
            </a>
          ) : (
            <a
              href="/login"
              className="px-4 py-2 rounded-md bg-white/10 border border-white/20 hover:bg-white/20 transition-all duration-300"
            >
              Login
            </a>
          )}
        </ul>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-2xl"
          onClick={() => setMenuOpen(true)}
        >
          <RiMenuLine />
        </button>
      </nav>

      {/* Mobile Slide Menu */}
      <div
        className={`fixed top-0 right-0 h-screen w-full sm:w-2/3 bg-gradient-to-br from-[#23233e] to-[#1a1a2e] z-50 transform transition-transform duration-500 ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Close Button */}
        <div className="flex justify-end p-4">
          <button
            className="text-3xl hover:rotate-90 transition-transform"
            onClick={() => setMenuOpen(false)}
          >
            <RiCloseLine />
          </button>
        </div>

        {/* Mobile Links */}
        <ul className="flex flex-col gap-6 mt-10 px-8 text-lg font-medium">
          <MobileNavLink href="/" label="Home" setMenuOpen={setMenuOpen} />
          <MobileNavLink href="/members" label="Members" setMenuOpen={setMenuOpen} />
          <MobileNavLink href="/clubs" label="Clubs" setMenuOpen={setMenuOpen} />
          <MobileNavLink href="/faculty" label="Mentors" setMenuOpen={setMenuOpen} />
          <MobileNavLink href="/gallery" label="Event Gallery" setMenuOpen={setMenuOpen} />

          {isLoggedIn ? (
            <a
              href="/userPage"
              className="flex items-center gap-2 bg-white/10 border border-white/20 rounded-md px-4 py-2 hover:bg-red-500 transition-all"
              onClick={() => setMenuOpen(false)}
            >
              <RiUser3Line size={20} /> User Profile
            </a>
          ) : (
            <a
              href="/login"
              className="bg-white/10 border border-white/20 rounded-md px-4 py-2 hover:bg-white/20 transition-all"
              onClick={() => setMenuOpen(false)}
            >
              Login
            </a>
          )}
        </ul>
      </div>
    </>
  );
}

// Desktop Nav Link
function NavLink({ href, label }) {
  return (
    <li>
      <a
        href={href}
        className="relative px-3 py-2 rounded-lg transition-all duration-300 hover:text-red-500 after:absolute after:inset-0 after:bg-red-500/10 after:rounded-lg after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300"
      >
        {label}
      </a>
    </li>
  );
}

// Mobile Nav Link
function MobileNavLink({ href, label, setMenuOpen }) {
  return (
    <li>
      <a
        href={href}
        onClick={() => setMenuOpen(false)}
        className="block text-white hover:text-red-400 transition-colors duration-300"
      >
        {label}
      </a>
    </li>
  );
}
