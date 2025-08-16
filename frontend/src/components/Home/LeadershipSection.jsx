import { useEffect, useRef } from "react";
import { FaLinkedinIn, FaInstagram, FaTwitter, FaFacebookF, FaGithub, FaCrown } from "react-icons/fa";
import { RiMailLine } from "react-icons/ri";
import { gsap } from "gsap";
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
            start: "top 85%",
            toggleActions: "play none none none"
          }
        }
      );
    });
  }, []);

  const president = Leaders.LEADERS.find(m => m.role.toLowerCase() === "president");
  const otherMembers = Leaders.LEADERS.filter(m => m.role.toLowerCase() !== "president");

  const renderCard = (member, isPresident = false, ref = null) => {
    const { img, name, role, socials, msg } = member;
    return (
        <div
        key={name}
        ref={ref}
        className={`p-10 rounded-3xl border-white border-3 relative overflow-hidden scale-110`}
      >
        <img
          src={img}
          alt={name || "Council member"}
          className="w-40 h-40 md:w-52 md:h-52 mx-auto mt-3 object-cover rounded-2xl shadow-md"
        />
        <h3 className="text-lg mt-6 uppercase tracking-wider text-yellow-500">{role}</h3>
        <h2 className="text-2xl md:text-3xl font-bold mt-1 text-white">{name}</h2>
        <div className="flex gap-4 justify-center text-gray-300 mt-4 text-xl">
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
        <p className="mt-6 italic leading-relaxed text-sm md:text-base text-white">
          "{msg}"
        </p>
      </div>
      
    );
  };

  return (
    <section className="py-24 bg-gradient-to-b from-gray-900 to-gray-800 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-radial from-indigo-600/20 via-purple-500/10 to-transparent pointer-events-none"></div>

      <div className="max-w-6xl mx-auto px-6 text-center relative z-10">
        <h2 className="text-5xl md:text-6xl font-extrabold text-white">
          Deputies Of Council
        </h2>
        <div className="mx-auto mt-3 mb-20 w-40 h-1 rounded-full bg-gradient-to-r from-[#C8101A] via-[#FF4F01] to-[#FFF9D5] shadow-md" />


        {/* President Section */}
        {president && (
          <div className="mb-20 flex justify-center">
            {renderCard(president, true, presidentRef)}
          </div>
        )}

        {/* Divider */}
        <hr className="border-t border-white/20 mb-16" />

        {/* Other Members - horizontal scroll on small screens */}
        <div className="grid md:grid-cols-2 gap-8 overflow-x-auto md:overflow-visible py-4 px-2">
        {otherMembers.map((member, idx) =>
            renderCard(member, false, el => (membersRef.current[idx] = el))
        )}
        </div>


      </div>
    </section>
  );
}
