import { useEffect, useRef } from "react";
import { FaLinkedinIn, FaInstagram, FaTwitter, FaFacebookF, FaGithub } from "react-icons/fa";
import { RiMailLine } from "react-icons/ri";
import { gsap } from "gsap";
import { motion } from "framer-motion";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Leaders from "../../data/Leaders.json";

gsap.registerPlugin(ScrollTrigger);

const iconsMap = {
  linkedin: <FaLinkedinIn />,
  instagram: <FaInstagram />,
  email: <RiMailLine />,
  twitter: <FaTwitter />,
  facebook: <FaFacebookF />,
  github: <FaGithub />
};

export default function LeadershipSection() {
  const presidentRef = useRef(null);
  const membersRef = useRef([]);

  useEffect(() => {
    if (presidentRef.current) {
      gsap.fromTo(
        presidentRef.current,
        { opacity: 0, y: 50, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: presidentRef.current,
            start: "top 85%",
            toggleActions: "play none none none"
          }
        }
      );
    }

    membersRef.current.forEach((card, idx) => {
      if (card) {
        gsap.fromTo(
          card,
          { opacity: 0, y: 50, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            delay: idx * 0.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 90%",
              toggleActions: "play none none none"
            }
          }
        );
      }
    });
  }, []);

  const president = Leaders.LEADERS.find(m => m.role.toLowerCase() === "president");
  const otherMembers = Leaders.LEADERS.filter(m => m.role.toLowerCase() !== "president");

  const renderPresident = (member) => {
    const { img, name, role, socials, msg } = member;
    return (
      <div
        ref={presidentRef}
        className="flex flex-col lg:flex-row items-center gap-8 p-6 md:p-12 bg-gray-800/40 border border-white/20 rounded-3xl shadow-lg"
      >
        {/* Left: Photo + Socials */}
        <div className="flex flex-col items-center gap-6 w-full sm:w-auto">
          <div className="w-32 h-32 sm:w-48 sm:h-48 md:w-56 md:h-56 lg:w-64 lg:h-64 rounded-2xl overflow-hidden shadow-lg">
            <img
              src={img}
              alt={name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex flex-row flex-wrap gap-4 text-lg sm:text-xl md:text-2xl text-gray-300 justify-center">
            {Object.entries(socials).map(([key, url]) =>
              url ? (
                <a
                  key={key}
                  href={key === "email" ? `mailto:${url}` : url}
                  target={key === "email" ? "_self" : "_blank"}
                  rel="noreferrer"
                  aria-label={`${key} profile of ${name}`}
                  className="hover:text-[#FF4F01] transition-colors duration-200"
                >
                  {iconsMap[key]}
                </a>
              ) : null
            )}
          </div>
        </div>

        {/* Right: Name, Role, Message */}
        <div className="flex-1 flex flex-col justify-center text-center lg:text-left gap-4">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight leading-snug bg-gradient-to-r from-zinc-900 via-white to-black/80 bg-clip-text text-transparent"
          >
            {name}
          </motion.h1>
          <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold uppercase text-[#FF4F01]">{role}</h3>
          <p className="text-white/90 text-sm sm:text-base md:text-lg leading-relaxed whitespace-pre-line max-h-72 overflow-y-auto mt-2">
            {msg}
          </p>
        </div>
      </div>
    );
  };

  const renderMemberCard = (member, idx) => {
    const { img, name, role, socials, msg } = member;
  
    return (
      <div
        key={name}
        ref={(el) => (membersRef.current[idx] = el)}
        className="relative w-full max-w-4xl mx-auto p-6 sm:p-8 
                   rounded-3xl bg-white/10 backdrop-blur-md 
                   border border-white/20 
                   flex flex-col md:flex-row items-center md:items-start gap-6 "
      >
        {/* Animated Gradient Border */}
        <div className="absolute inset-0 rounded-3xl border-2 border-transparent bg-gradient-to-r from-yellow-400 via-pink-500 to-indigo-500 opacity-0 hover:opacity-100 blur-md transition duration-500 pointer-events-none"></div>
  
        {/* Left: Image + Socials */}
        <div className="relative z-10 flex flex-col items-center md:items-start w-full md:w-auto flex-shrink-0">
          <div className="w-28 h-28 sm:w-36 sm:h-36 md:w-44 md:h-44 lg:w-56 lg:h-56 
                          rounded-2xl overflow-hidden shadow-lg ring-2 ring-white/10">
            <img
              src={img}
              alt={name}
              className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
            />
          </div>
  
          {/* Socials */}
          <div className="flex flex-wrap gap-3 sm:gap-4 mt-4 
                          text-lg sm:text-xl md:text-2xl text-gray-300 
                          justify-center md:justify-start">
            {Object.entries(socials).map(([key, url]) =>
              url ? (
                <a
                  key={key}
                  href={key === "email" ? `mailto:${url}` : url}
                  target={key === "email" ? "_self" : "_blank"}
                  rel="noreferrer"
                  aria-label={`${key} profile of ${name}`}
                  className="hover:text-yellow-400 transition-colors duration-200"
                >
                  {iconsMap[key]}
                </a>
              ) : null
            )}
          </div>
        </div>
  
        {/* Right: Text Info */}
        <div className="relative z-10 flex-1 flex flex-col text-center md:text-left">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white leading-snug">
            {name}
          </h2>
  
          {/* Role Badge */}
          <span className="inline-block mt-2 px-3 py-1 text-xs sm:text-sm font-bold uppercase tracking-wider 
                           bg-gradient-to-r from-yellow-400 to-pink-500 
                           text-black rounded-full shadow-md">
            {role}
          </span>
  
          {/* Message with fade clamp */}
          <div className="relative mt-4 max-h-32 sm:max-h-40 md:max-h-48 overflow-hidden group">
            <p className="text-sm sm:text-base md:text-lg text-gray-200 leading-relaxed">
              {msg}
            </p>

          </div>
        </div>
      </div>
    );
  };
  

  return (
    <section className="py-5  relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-radial from-indigo-600/20 via-purple-500/10 to-transparent pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mb-8">Council Deputies</h2>

        {/* President */}
        {president && <div className="mb-10">{renderPresident(president)}</div>}

        <div className="w-full h-[1px] bg-white/20 my-6"></div>

        {/* Deputies */}
        <div className="grid sm:grid-cols-2 gap-6 p-4 sm:p-6 md:p-8 lg:p-10">
          {otherMembers.map((member, idx) => renderMemberCard(member, idx))}
        </div>
      </div>
    </section>
  );
}
