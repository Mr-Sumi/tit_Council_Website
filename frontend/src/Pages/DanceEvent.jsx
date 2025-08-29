import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function DanceEvent() {
  const navigate = useNavigate();

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 flex flex-col items-center justify-center px-6 py-12">
      {/* Heading */}
      <motion.h1
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7 }}
        className="text-5xl font-extrabold mb-6 text-center tracking-wider text-gray-50"
      >
        🕺 DANCE 💃
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.8 }}
        className="text-lg mb-10 text-center max-w-2xl text-gray-300"
      >
        Get ready to show your moves! <br />
        Our dance competition has something for everyone.
      </motion.p>

      {/* Dance Categories */}
      <div className="grid md:grid-cols-3 gap-8 max-w-6xl w-full">
        {/* Solo Dance */}
        <motion.div
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          className="bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-700 hover:scale-105 transition-transform"
        >
          <h2 className="text-2xl font-bold mb-3 text-gray-50">✢ Solo Dance</h2>
          <p className="mb-4 text-gray-300">
            One dancer, all the spotlight! Show your talent, style, and energy on
            your own.
          </p>
          <h3 className="font-semibold text-gray-200">Themes:</h3>
          <ul className="list-disc ml-5 mt-2 space-y-1 text-gray-300">
            <li>Classical</li>
            <li>Hip Hop</li>
            <li>Storytelling</li>
          </ul>
        </motion.div>

        {/* Duo Dance */}
        <motion.div
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.2 }}
          className="bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-700 hover:scale-105 transition-transform"
        >
          <h2 className="text-2xl font-bold mb-3 text-gray-50">
            ✢ Duo Dance (👯)
          </h2>
          <p className="mb-4 text-gray-300">
            Two dancers, one perfect team. Bring your best coordination and
            chemistry to the stage.
          </p>
          <h3 className="font-semibold text-gray-200">Themes:</h3>
          <ul className="list-disc ml-5 mt-2 space-y-1 text-gray-300">
            <li>Classical</li>
            <li>Hip Hop</li>
          </ul>
        </motion.div>

        {/* Group Dance */}
        <motion.div
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.4 }}
          className="bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-700 hover:scale-105 transition-transform"
        >
          <h2 className="text-2xl font-bold mb-3 text-gray-50">
            ✢ Group Dance (👯👯)
          </h2>
          <p className="mb-4 text-gray-300">
            Dance together, shine together! Teams of 3 or more can light up the
            stage with creative moves and powerful performances.
          </p>
          <h3 className="font-semibold text-gray-200">Themes:</h3>
          <ul className="list-disc ml-5 mt-2 space-y-1 text-gray-300">
            <li>Classical</li>
            <li>Hip Hop</li>
          </ul>
        </motion.div>
      </div>

      {/* Register Button */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="mt-12"
      >
        <button
          onClick={() => navigate("/tarangForm")}
          className="px-8 py-3 bg-gray-100 text-gray-900 font-bold rounded-full shadow-lg hover:bg-gray-300 transition"
        >
          Register Now
        </button>
      </motion.div>
    </div>
  );
}
