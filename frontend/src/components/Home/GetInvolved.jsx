import React from "react";
import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { FaUserPlus, FaLightbulb, FaHandsHelping } from "react-icons/fa";
import { AiOutlineSolution } from "react-icons/ai";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const items = [
  { icon: <FaUserPlus className="text-indigo-400" />, title: "Join the Council", desc: "Interested in leadership roles? Apply now!", link: "/join" },
  { icon: <AiOutlineSolution className="text-green-400" />, title: "Suggestion Box", desc: "Any Problem or Suggestion? Let us know!", link:"/suggestion" },
  { icon: <FaLightbulb className="text-yellow-400" />, title: "Ideas & Innovation", desc: "Have an idea for an event or initiative? Let us know!.", link:"/ideas"},
];

export default function GetInvolved() {
  const cardsRef = useRef([]);

  useEffect(() => {
    cardsRef.current.forEach((card, idx) => {
      gsap.fromTo(
        card,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: idx * 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );
    });
  }, []);

  return (
    <section className="py-20 text-white">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-4xl md:text-5xl font-extrabold text-center mb-12 tracking-wide">
          Get Involved
        </h2>
        <div className="grid md:grid-cols-3 gap-10 text-center">
          {items.map((item, idx) => (
            <motion.a
              key={idx}
              ref={(el) => (cardsRef.current[idx] = el)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href={item.link || "#"}
              className="p-10 border border-white/20 rounded-2xl bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-lg shadow-lg hover:shadow-2xl transition flex flex-col items-center"
            >
              <motion.div
                initial={{ rotate: 0 }}
                whileHover={{ rotate: 15 }}
                className="text-6xl mb-6"
              >
                {item.icon}
              </motion.div>
              <h3 className="font-bold text-xl mb-2">{item.title}</h3>
              <p className="text-gray-300 text-sm md:text-base">{item.desc}</p>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
