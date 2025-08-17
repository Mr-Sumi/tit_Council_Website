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
        className="flex flex-row flex-wrap items-center gap-8 p-6 md:p-12 bg-gray-800/40 border border-white/20 rounded-3xl shadow-lg"
      >
        {/* Left: Photo + Socials */}
        <div className="flex justify-center">
          <div className="flex flex-col items-center gap-6">
            <div className="w-48 sm:w-56 md:w-64 h-48 sm:h-56 md:h-64 rounded-2xl overflow-hidden shadow-lg">
              <img
                src={img}
                alt={name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex flex-row gap-4 text-xl md:text-2xl text-gray-300 justify-center">
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
        </div>


        {/* Right: Name, Role, Message */}
        <div className="flex-1 flex flex-col justify-center gap-4 md:text-left">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-extrabold tracking-tight sm:tracking-normal md:tracking-tight leading-snug sm:leading-snug md:leading-tight bg-gradient-to-r from-zinc-900 via-white to-black/80 bg-clip-text text-transparent mb-1"
        >
          {name}
        </motion.h1>
          <h3 className="text-xl md:text-3xl font-bold uppercase text-[#FF4F01]">{role}</h3>
          <p className="text-white/90 text-md md:text-lg leading-relaxed whitespace-pre-line max-h-72 overflow-y-auto mt-2">
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
        className="p-6 md:p-8 rounded-3xl border border-white/20 bg-gray-800/40 shadow-lg flex items-center"
      >
        <div>
          <div className="w-48 sm:w-56 md:w-64 h-48 sm:h-56 md:h-64 rounded-2xl overflow-hidden shadow-lg">
            <img
              src={img}
              alt={name}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="flex flex-row gap-4 mt-3 text-xl md:text-2xl text-gray-300 justify-center">
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
        
        <div className="flex-1 flex flex-col justify-center gap-4 md:text-left ml-5">
          <h3 className="text-lg md:text-xl font-semibold mt-4 uppercase tracking-wider text-yellow-400">{role}</h3>
          <h2 className="text-2xl md:text-3xl font-bold mt-1 text-white">{name}</h2>
          <p className="mt-3 italic text-sm md:text-base text-white max-h-48 overflow-y-auto">{msg}</p>
        </div>

      </div>
    );
  };

  return (
    <section className="py-24 bg-gradient-to-b from-gray-900 to-gray-800 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-radial from-indigo-600/20 via-purple-500/10 to-transparent pointer-events-none"></div>

      <div className="max-w-[70vw] mx-auto px-6 text-center relative z-10">
        <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-3">Student Council</h2>
        <div className="mx-auto mb-16 w-40 h-1 rounded-full bg-gradient-to-r from-[#C8101A] via-[#FF4F01] to-[#FFF9D5] shadow-md" />

        {/* President */}
        {president && <div className="mb-5">{renderPresident(president)}</div>}

        <div className="w-full h-[1px] bg-white/50"></div>

        {/* Deputies */}
        {/* <h3 className="text-3xl md:text-4xl font-bold text-white mb-6">Deputies of Council</h3> */}
        <div className="flex flex-col gap-6 overflow-x-auto md:overflow-visible py-4 px-2">
          {otherMembers.map((member, idx) => renderMemberCard(member, idx))}
        </div>
      </div>
    </section>
  );
}
