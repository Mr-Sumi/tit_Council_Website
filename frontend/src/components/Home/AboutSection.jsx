import React, { useRef } from "react";
import { motion } from "framer-motion";
import { FaUsers, FaLightbulb, FaHandsHelping } from "react-icons/fa";

const features = [
  {
    icon: <FaUsers className="text-red-400" />,
    label: "Leadership",
    message:
      "We inspire students to lead initiatives, guide projects, and actively contribute to shaping a positive, dynamic, and engaging campus environment.",
  },
  {
    icon: <FaLightbulb className="text-yellow-500" />,
    label: "Innovation",
    message:
      "We nurture creativity, encourage fresh ideas, and promote innovative problem-solving to drive growth, learning, and development across the campus.",
  },
  {
    icon: <FaHandsHelping className="text-indigo-500" />,
    label: "Community",
    message:
      "We build collaboration, mutual support, and inclusivity, fostering a welcoming campus where every student feels connected, valued, and empowered.",
  },
];

export default function AboutSection() {
  const sectionRef = useRef(null);

  return (
    <section ref={sectionRef} className="relative py-10 px-4 sm:px-6 md:px-12">
      <div className="max-w-[90vw] mx-auto text-center">
        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mb-8"
          >
          About Us
        </motion.h2>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-6xl mx-auto text-white/90 leading-relaxed text-sm sm:text-base md:text-lg"
        >
          The Student Council plays a vital role in creating a vibrant, inclusive, and innovative campus environment. Serving as the essential bridge between students and the administration, we work tirelessly to ensure that every student’s voice is heard and valued. Our mission is to empower leadership, encourage active participation, and foster meaningful collaboration across all campus communities. We organize events, support cultural initiatives, and promote diversity, ensuring that every student feels represented and engaged. By nurturing creativity, teamwork, and responsibility, the Student Council helps shape a campus culture where innovation, inclusivity, and growth thrive.
        </motion.p>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-10 mt-12">
          {features.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.2 }}
              className="relative text-center p-6 sm:p-8 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 shadow-lg flex flex-col items-center transition-transform duration-300 hover:scale-105"
            >
              <div className="text-5xl sm:text-6xl mb-4">{item.icon}</div>
              <h3 className="font-bold text-xl sm:text-2xl text-white tracking-wide mb-2">{item.label}</h3>
              <p className="text-white/90 text-sm sm:text-base md:text-base leading-relaxed">
                {item.message}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
