import React, { useEffect, useRef } from "react";
import {
  FaLinkedinIn,
  FaInstagram,
  FaTwitter,
  FaFacebookF,
  FaGithub,
} from "react-icons/fa";
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
  github: <FaGithub />,
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
            toggleActions: "play none none none",
          },
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
              toggleActions: "play none none none",
            },
          }
        );
      }
    });
  }, []);

  const president = Leaders.LEADERS.find(
    (m) => m.role.toLowerCase() === "president"
  );
  const otherMembers = Leaders.LEADERS.filter(
    (m) => m.role.toLowerCase() !== "president"
  );

  const renderSocialLinks = (socials, name, colorClass) => (
    <div
      className={`flex flex-wrap gap-3 sm:gap-4 mt-4 text-lg sm:text-xl md:text-2xl text-gray-300 justify-center`}
    >
      {Object.entries(socials).map(([key, url]) =>
        url ? (
          <a
            key={key}
            href={key === "email" ? `mailto:${url}` : url}
            target={key === "email" ? "_self" : "_blank"}
            rel="noreferrer"
            aria-label={`${key} profile of ${name}`}
            className={`hover:${colorClass} transition-colors duration-200`}
          >
            {iconsMap[key]}
          </a>
        ) : null
      )}
    </div>
  );

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
            <img src={img} alt={name} className="w-full h-full object-cover" />
          </div>
          {renderSocialLinks(socials, name, "text-[#FF4F01]")}
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
          <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold uppercase text-[#FF4F01]">
            {role}
          </h3>
          <p className="text-white/90 text-sm sm:text-base md:text-lg leading-relaxed whitespace-pre-line max-h-72 overflow-y-auto scrollbar-hide mt-2">
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
        ref={el => (membersRef.current[idx] = el)}
        className="p-4 sm:p-6 md:p-8 lg:p-10 rounded-3xl border border-white/20 shadow-lg flex flex-col sm:flex-row items-center sm:items-start gap-6"
      >
        {/* Left: Image + Socials */}
        <div className="flex flex-col items-center sm:items-start w-full sm:w-auto">
          <div className="w-36 h-36 sm:w-40 sm:h-40 md:w-48 md:h-48 lg:w-56 lg:h-56 rounded-2xl overflow-hidden shadow-lg">
            <img
              src={img}
              alt={name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Socials */}
          <div className="flex flex-wrap gap-3 sm:gap-4 mt-3 text-lg sm:text-xl md:text-2xl text-gray-300 justify-center sm:justify-start">
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
        <div className="flex-1 flex flex-col p-4 sm:p-6 md:p-8 lg:p-10">
          <h2 className="text-2xl sm:text-xl md:text-2xl lg:text-3xl font-extrabold text-white leading-tight">
            {name}
          </h2>
  
          {/* Role Badge */}
          <span className="inline-block mt-2 px-3 py-1 text-xs sm:text-sm font-bold uppercase tracking-wider 
                           bg-gradient-to-r from-yellow-400 to-pink-500 
                           text-black rounded-full shadow-md">
            {role}
          </h3>

          <p className="mt-4 italic text-sm sm:text-sm md:text-md lg:text-lg text-white max-h-40 sm:max-h-48 md:max-h-56 lg:max-h-64 overflow-y-auto scrollbar-thin scrollbar-thumb-yellow-400 scrollbar-track-gray-700">
            {msg}
          </p>
        </div>
      </div>
    );
  };
  

  return (
    <section className="py-5  relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-radial from-indigo-600/20 via-purple-500/10 to-transparent pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mb-8">
          Council Deputies
        </h2>

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
