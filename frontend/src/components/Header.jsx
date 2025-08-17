import { useState } from "react";
import { RiMenuLine, RiCloseLine } from "react-icons/ri";
import { NavLink } from "react-router-dom"; // ✅ use NavLink for active styling
import useHideOnScroll from "../hooks/useHideOnScroll";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const showNav = useHideOnScroll(5);

  const links = [
    { name: "Home", href: "/" },
    { name: "Clubs", href: "/clubs" },
    { name: "Mentors", href: "/mentors" },
    { name: "Team", href: "/team" },
    { name: "Gallery", href: "/gallery" },
  ];

  return (
    <>
      {/* Navbar */}
      <nav
        className={`fixed top-0 left-0 w-full flex justify-between items-center h-[11vh] px-5 lg:px-10 
        bg-gradient-to-r from-[#121212] via-[#232323] to-[#121212] text-white shadow-lg 
        transition-all duration-300 z-50 ${
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

        {/* Desktop Nav Links */}
        <ul className="hidden md:flex gap-8 font-medium text-gray-200">
          {links.map((link) => (
            <li key={link.name}>
              <NavLink
                to={link.href}
                className={({ isActive }) =>
                  `transition-colors duration-300 ${
                    isActive ? "text-red-500 font-semibold" : "hover:text-red-400"
                  }`
                }
              >
                {link.name}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-2xl"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <RiCloseLine /> : <RiMenuLine />}
        </button>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`fixed top-0 right-0 h-full w-2/3 sm:w-1/3 bg-[#1a1a1a] shadow-lg z-40 transform transition-transform duration-300 
        ${menuOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="flex flex-col items-center mt-20 gap-6 text-lg font-medium text-gray-200">
          {links.map((link) => (
            <NavLink
              key={link.name}
              to={link.href}
              className={({ isActive }) =>
                `transition-colors duration-300 ${
                  isActive ? "text-red-500 font-semibold" : "hover:text-red-400"
                }`
              }
              onClick={() => setMenuOpen(false)}
            >
              {link.name}
            </NavLink>
          ))}
        </div>
      </div>
    </>
  );
}
