import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { FaUsers, FaLightbulb, FaHandsHelping } from "react-icons/fa";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const features = [
  {
    icon: <FaUsers className="text-red-400"/>,
    label: "Leadership",
    message:
      "We inspire students to lead initiatives, guide projects, and actively contribute to shaping a positive, dynamic, and engaging campus environment.",
  },
  {
    icon: <FaLightbulb className="text-yellow-500"/>,
    label: "Innovation",
    message:
      "We nurture creativity, encourage fresh ideas, and promote innovative problem-solving to drive growth, learning, and development across the campus.",
  },
  {
    icon: <FaHandsHelping className="text-indigo-500"/>,
    label: "Community",
    message:
      "We build collaboration, mutual support, and inclusivity, fostering a welcoming campus where every student feels connected, valued, and empowered.",
  },
];

export default function AboutSection() {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);

  //   const cards = cardsRef.current;
  //   cards.forEach((card, idx) => {
  //     gsap.fromTo(
  //       card,
  //       { y: 50, opacity: 0 },
  //       {
  //         y: 0,
  //         opacity: 1,
  //         duration: 1,
  //         delay: idx * 0.2,
  //         ease: "power2.out",
  //         scrollTrigger: {
  //           trigger: card,
  //           start: "top 80%",
  //           end: "bottom 60%",
  //           toggleActions: "play none none reverse",
  //         },
  //       }
  //     );
  //   });

  //   gsap.to(sectionRef.current, {
  //     y: -50,
  //     ease: "none",
  //     scrollTrigger: {
  //       trigger: sectionRef.current,
  //       start: "top bottom",
  //       end: "bottom top",
  //       scrub: true,
  //     },
  //   });
  // }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden"
    >
      <div className="max-w-[85vw] mx-auto px-6 text-center relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-6xl font-extrabold tracking-tight mb-6 text-white"
        >
          About Us
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-[80vw] mx-auto leading-relaxed text-white sm:scrollbar-x-auto"
          style={{ fontSize: "clamp(0.875rem, 2vw, 1.125rem)" }}
        >
          The Student Council plays a vital role in creating a vibrant, inclusive, and innovative campus environment. Serving as the essential bridge between students and the administration, we work tirelessly to ensure that every student’s voice is heard and valued. Our mission is to empower leadership, encourage active participation, and foster meaningful collaboration across all campus communities. We organize events, support cultural initiatives, and promote diversity, ensuring that every student feels represented and engaged. By nurturing creativity, teamwork, and responsibility, the Student Council helps shape a campus culture where innovation, inclusivity, and growth thrive.
        </motion.p>

        <div className="grid sm:grid-cols-1 md:grid-cols-3 gap-10 mt-16">
          {features.map((item, idx) => (
            <motion.div
              key={idx}
              ref={(el) => (cardsRef.current[idx] = el)}
              className="relative text-center p-8 rounded-3xl bg-white/10 backdrop-blur-2xl border border-white/20 shadow-xl overflow-hidden transition-transform duration-300"
            >
              <div className="text-6xl mb-4 flex justify-center">
                {item.icon}
              </div>
              <h3 className="font-bold text-2xl text-white tracking-wide mb-2">{item.label}</h3>
              <p className="text-white/90 text-md md:text-lg leading-relaxed">{item.message}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
