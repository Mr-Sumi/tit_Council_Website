import React from "react";
import councilData from "../data/Mentors-Data.json"
import { motion } from "framer-motion";

export default function Mentors() {
  return (
    <div className="min-h-screen text-white flex flex-col items-center py-20 px-4">
      {/* Main Mentors */}
      <header className="w-full max-w-6xl text-center mb-8 px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-6xl uppercase font-extrabold tracking-tight bg-gradient-to-r from-zinc-800 via-white to-indigo-800 bg-clip-text text-transparent mb-6"
          >
          Our Mentors Heads
        </motion.h2>
        <div className="mx-auto mt-3 w-40 h-1 rounded-full bg-gradient-to-r from-[#C8101A] via-[#FF4F01] to-[#FFF9D5] shadow-md" />
      </header>

      <div className="mx-auto">
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 auto-rows-fr">
          {councilData.mentorsHeads.map((mentor, idx) => (
            <div
              key={idx}
              className="bg-white/5 border border-white/10 p-6 rounded-lg text-center shadow-lg hover:scale-102 transition-transform"
            >
              <img
                src={mentor.img}
                alt={mentor.name}
                className="h-25 rounded-full object-cover border-4 border-teal-400 mx-auto mb-4"
              />
              <h3 className="text-2xl font-semibold text-white mb-1">
                {mentor.name}
              </h3>
              <p className="text-lg text-teal-300 font-medium mb-3">
                {mentor.role}
              </p>
              {mentor.quote && (
                <p className="text-lg text-gray-400 italic bg-white/5 p-2 rounded">
                  "{mentor.quote}"
                </p>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Sub Mentors */}
      <div className="mx-auto mt-10 flex flex-col items-center">
        <header className="w-full max-w-6xl text-center mb-8 px-4">
          <motion.h3
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-6xl uppercase font-extrabold tracking-tight bg-gradient-to-r from-zinc-800 via-white to-indigo-800 bg-clip-text text-transparent mb-6"
          >
          Our Mentors
        </motion.h3>
          <div className="mx-auto mt-3 w-40 h-1 rounded-full bg-gradient-to-r from-[#C8101A] via-[#FF4F01] to-[#FFF9D5] shadow-md" />
        </header>

        <div className="grid gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 auto-rows-fr">
          {councilData.subMentors.map((mentor, idx) => (
            <div
              key={idx}
              className="bg-white/5 border border-white/10 p-6 rounded-lg text-center hover:scale-102 transition-transform"
            >
              <img
                src={mentor.img}
                alt={mentor.name}
                className="h-26 rounded-full object-contain border-4 border-teal-400 mx-auto mb-4"
              />
              <h3 className="text-2xl font-semibold text-white">
                {mentor.name}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
