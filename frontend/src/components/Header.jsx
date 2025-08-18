import { useState, useEffect } from "react";
import { RiMenuLine, RiCloseLine, RiUser3Line } from "react-icons/ri";
import { NavLink, useNavigate } from "react-router-dom";
import useHideOnScroll from "../hooks/useHideOnScroll";
import assets from "../data/assets.json";
import { auth } from "../firebase";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 768);
  const [user, setUser] = useState(null);
  const showNav = useHideOnScroll(5);
  const navigate = useNavigate();

  const links = [
    { name: "Home", href: "/" },
    { name: "Clubs", href: "/clubs" },
    { name: "Mentors", href: "/mentors" },
    { name: "Team", href: "/team" },
    { name: "Gallery", href: "/gallery" },
  ];

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 768);
      if (window.innerWidth >= 768) setMenuOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "auto";
  }, [menuOpen]);

  return (
    <>
      <nav
        className={`relative fixed top-0 left-0 w-full flex justify-between items-center 
        h-[12vh] px-6 lg:px-12
        bg-gradient-to-r from-black/40 via-black/30 to-black/40 backdrop-blur-md text-white border-b border-white/10
        transition-all duration-500 z-50
        ${showNav ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"}`}
      >
        {/* Logo */}
        <div className="flex items-center gap-3 sm:gap-4">
          <img
            src={assets.logos.councilLogo}
            alt="Council Logo"
            className="h-12 sm:h-14 w-auto object-contain hover:scale-110 transition-transform duration-300"
          />
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-wide text-red-500 uppercase">
            Student Council
          </h1>
        </div>

        {/* Desktop Links */}
        {isDesktop && (
          <div className="flex items-center gap-8 lg:gap-12">
            <ul className="flex gap-8 lg:gap-12 font-medium text-gray-200 text-base lg:text-lg">
              {links.map((link) => (
                <li key={link.name} className="relative group">
                  <NavLink
                    to={link.href}
                    className={({ isActive }) =>
                      `transition-colors duration-300 text-xl relative px-1 ${
                        isActive ? "text-red-500 text-2xl font-bold" : "hover:text-red-400"
                      }`
                    }
                  >
                    {link.name}
                    <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-red-500 transition-all duration-300 group-hover:w-full"></span>
                  </NavLink>
                </li>
              ))}
            </ul>

            {/* Auth Section */}
            <div className="ml-6">
              {user ? (
                <button
                  onClick={() => navigate("/userProfile")}
                  className="flex items-center justify-center w-10 h-10 lg:w-12 lg:h-12 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                >
                  {user.photoURL ? (
                    <img
                      src={user.photoURL}
                      alt="User"
                      className="w-full h-full rounded-full object-cover"
                    />
                  ) : (
                    <RiUser3Line className="text-xl lg:text-2xl" />
                  )}
                </button>
              ) : (
                <button
                  onClick={() => navigate("/login")}
                  className="flex items-center gap-2 px-4 py-2 lg:px-5 lg:py-2.5 bg-white/10 hover:bg-white/20 rounded-lg font-medium transition-colors text-base lg:text-lg"
                >
                  <RiUser3Line className="text-xl lg:text-2xl" />
                  Login
                </button>
              )}
            </div>
          </div>
        )}

        {/* Mobile Menu Button */}
        {!isDesktop && (
          <button
            className="text-3xl sm:text-4xl focus:outline-none hover:text-red-500 transition-colors"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <RiCloseLine /> : <RiMenuLine />}
          </button>
        )}
        
      </nav>

      {/* Mobile Sidebar */}
      {!isDesktop && (
        <>
          <div
            className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity duration-300 ${
              menuOpen ? "opacity-100 visible" : "opacity-0 invisible"
            }`}
            onClick={() => setMenuOpen(false)}
          ></div>

          <div
            className={`fixed top-0 right-0 h-full w-4/5 sm:w-2/3 md:w-1/2 bg-[#111] shadow-2xl z-50 
            transform transition-transform duration-500 ${
              menuOpen ? "translate-x-0" : "translate-x-full"
            }`}
          >
            <div className="flex flex-col items-center mt-24 gap-6 text-base sm:text-lg font-medium text-gray-200">
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

              {user ? (
                <button
                  onClick={() => {
                    navigate("/userProfile");
                    setMenuOpen(false);
                  }}
                  className="flex items-center gap-2 px-5 py-2 bg-white/10 hover:bg-white/20 rounded-lg font-medium transition-colors"
                >
                  {user.photoURL ? (
                    <img
                      src={user.photoURL}
                      alt="User"
                      className="w-8 h-8 mr-4 rounded-full object-cover"
                    />
                  ) : (
                    <RiUser3Line className="text-xl" />
                  )}
                  Profile
                </button>
              ) : (
                <button
                  onClick={() => {
                    navigate("/login");
                    setMenuOpen(false);
                  }}
                  className="flex items-center gap-2 px-6 py-2 bg-yellow-400 hover:bg-yellow-500 text-black rounded-lg font-semibold transition-colors"
                >
                  <RiUser3Line className="text-xl" />
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
