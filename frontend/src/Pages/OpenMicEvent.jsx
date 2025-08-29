import React from "react";
import { motion } from "framer-motion";
import { Mic, Music, Laugh, Brain, User } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function OpenMicEvent() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-6">
      <motion.div
        className="max-w-3xl text-center space-y-6"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        {/* Title */}
        <motion.h1
          className="text-4xl font-bold mb-6 flex justify-center items-center gap-3"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          🎤 Open Mic Night –{" "}
          <span className="text-gray-400">Your Stage, Your Voice!</span>
        </motion.h1>

        {/* Description */}
        <p className="text-lg leading-relaxed text-gray-300">
          Got something to say, sing, or share? This is your moment! 🌟  
          Open Mic is a fun, free space where anyone can perform and express
          themselves.  
          No pressure, just pure vibes and creativity! 🎶✨
        </p>

        {/* Categories */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-8"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.2 },
            },
          }}
        >
          {[
            { icon: <User className="w-8 h-8" />, text: "Based on Talent" },
            { icon: <Music className="w-8 h-8" />, text: "Playing an Instrument" },
            { icon: <Laugh className="w-8 h-8" />, text: "Stand-up Comedy" },
            { icon: <Brain className="w-8 h-8" />, text: "Spoken Word or Thoughts" },
          ].map((item, idx) => (
            <motion.div
              key={idx}
              className="p-6 border border-gray-700 rounded-2xl hover:scale-105 transition-transform bg-black/50 shadow-lg"
              whileHover={{ scale: 1.05 }}
            >
              <div className="flex flex-col items-center gap-3">
                {item.icon}
                <p className="text-lg font-semibold">{item.text}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Note */}
        <p className="mt-6 text-gray-400 italic">
          ✢ NOTE: Time limit will be{" "}
          <span className="font-semibold text-white">3 to 7 minutes</span>.
        </p>

        {/* Buttons */}
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <motion.button
            onClick={() => navigate("/tarangForm")}
            className="px-8 py-3 bg-gradient-to-r from-gray-800 to-gray-600 text-white font-semibold rounded-2xl shadow-lg hover:scale-105 transition-transform"
            whileTap={{ scale: 0.9 }}
          >
            Register Now
          </motion.button>

          {/* <motion.button
            onClick={() => navigate("/events")}
            className="px-8 py-3 bg-gradient-to-r from-purple-700 to-indigo-600 text-white font-semibold rounded-2xl shadow-lg hover:scale-105 transition-transform"
            whileTap={{ scale: 0.9 }}
          >
            Back to Events
          </motion.button> */}
        </div>
      </motion.div>
    </div>
  );
}
