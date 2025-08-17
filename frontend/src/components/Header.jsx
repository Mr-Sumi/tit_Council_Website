import { useState, useEffect } from "react";
import { RiMenuLine, RiCloseLine, RiUser3Line } from "react-icons/ri";
import { NavLink } from "react-router-dom";
import useHideOnScroll from "../hooks/useHideOnScroll";
import assets from "../data/assets.json"; // ✅ import logo from json

export default function Header({ isAuthenticated, onLogin, onLogout }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 768);
  const showNav = useHideOnScroll(5);

  const links = [
    { name: "Home", href: "/" },
    { name: "Clubs", href: "/clubs" },
    { name: "Mentors", href: "/mentors" },
    { name: "Team", href: "/team" },
    { name: "Gallery", href: "/gallery" },
  ];

  // 🖥️ Track screen resize
  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 768);
      if (window.innerWidth >= 768) setMenuOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      {/* Navbar */}
      <nav
        className={`fixed top-0 left-0 w-full flex justify-between items-center h-[11vh] px-5 lg:px-12
        bg-black/30 backdrop-blur-md text-white border-b border-white/10
        transition-all duration-500 z-50 ${
          showNav ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
        }`}
      >
        {/* Logo */}
        <div className="flex items-center gap-3">
          <img
            src={assets.logos.councilLogo} // ✅ from assets.json
            alt="Council Logo"
            className="h-12 w-auto object-contain hover:scale-110 transition-transform duration-300"
          />
          <h1 className="text-3xl font-extrabold tracking-widest text-red-500 uppercase">
            Student Council
          </h1>
        </div>

        {/* Links (Desktop) */}
        {isDesktop && (
          <div className="flex items-center gap-10">
            <ul className="flex gap-10 font-medium text-gray-200 text-base lg:text-lg xl:text-xl">
              {links.map((link) => (
                <li key={link.name} className="relative group">
                  <NavLink
                    to={link.href}
                    className={({ isActive }) =>
                      `transition-colors duration-300 ${
                        isActive
                          ? "text-red-500 font-semibold"
                          : "hover:text-red-400"
                      }`
                    }
                  >
                    {link.name}
                  </NavLink>
                  {/* Animated underline */}
                  <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-red-500 transition-all duration-300 group-hover:w-full"></span>
                </li>
              ))}
            </ul>

            {/* ✅ Auth Section */}
            <div className="ml-6">
              {isAuthenticated ? (
                <button
                  onClick={onLogout}
                  className="flex items-center gap-2 px-4 py-2 bg-red-500 hover:bg-red-600 rounded-lg font-medium transition-colors"
                >
                  <RiUser3Line className="text-xl" />
                  Logout
                </button>
              ) : (
                <button
                  onClick={onLogin}
                  className="px-5 py-2 bg-transparent hover:bg-white/80 text-white hover:text-black border-1 rounded-3xl font-semibold transition-colors"
                >
                  Login
                </button>
              )}
            </div>
          </div>
        )}

        {/* Mobile Menu Button */}
        {!isDesktop && (
          <button
            className="text-3xl focus:outline-none hover:text-red-500 transition-colors"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <RiCloseLine /> : <RiMenuLine />}
          </button>
        )}
      </nav>

      {/* Mobile Sidebar */}
      {!isDesktop && (
        <>
          {/* Dark overlay */}
          <div
            className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity duration-300 ${
              menuOpen ? "opacity-100 visible" : "opacity-0 invisible"
            }`}
            onClick={() => setMenuOpen(false)}
          ></div>

          <div
            className={`fixed top-0 right-0 h-full w-2/3 sm:w-1/3 bg-[#111] shadow-2xl z-50 
            transform transition-transform duration-500 ${
              menuOpen ? "translate-x-0" : "translate-x-full"
            }`}
          >
            <div className="flex flex-col items-center mt-24 gap-8 text-lg font-medium text-gray-200">
              {links.map((link) => (
                <NavLink
                  key={link.name}
                  to={link.href}
                  className={({ isActive }) =>
                    `transition-colors duration-300 ${
                      isActive
                        ? "text-red-500 font-semibold"
                        : "hover:text-red-400"
                    }`
                  }
                  onClick={() => setMenuOpen(false)}
                >
                  {link.name}
                </NavLink>
              ))}

              {/* ✅ Auth in Sidebar */}
              {isAuthenticated ? (
                <button
                  onClick={() => {
                    onLogout();
                    setMenuOpen(false);
                  }}
                  className="flex items-center gap-2 px-5 py-2 bg-red-500 hover:bg-red-600 rounded-lg font-medium transition-colors"
                >
                  <RiUser3Line className="text-xl" />
                  Logout
                </button>
              ) : (
                <button
                  onClick={() => {
                    onLogin();
                    setMenuOpen(false);
                  }}
                  className="px-6 py-2 bg-yellow-400 hover:bg-yellow-500 text-black rounded-lg font-semibold transition-colors"
                >
                  Login
                </button>
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
}
