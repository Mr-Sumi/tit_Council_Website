import React from "react";
import { motion } from "framer-motion";
import { HelpCircle } from "lucide-react";

const MysteryGame = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-gradient-to-br from-black to-gray-900 text-white p-8 rounded-2xl shadow-2xl border border-gray-700 max-w-3xl mx-auto mt-10"
    >
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <HelpCircle className="w-8 h-8 text-purple-400" />
        <h2 className="text-3xl font-extrabold">🎉 Mystery Game 🕵️‍♀️🎲</h2>
      </div>

      {/* Content */}
      <p className="text-lg text-gray-300 leading-relaxed mb-4">
        A super fun game is waiting for you – but there’s a twist! 🤫  
        At the event, you’ll solve mysterious puzzles that lead to the reveal of the{" "}
        <span className="font-semibold text-white">real game</span>.
      </p>

      <ul className="list-disc pl-6 text-gray-300 space-y-2 mb-4">
        <li>🧩 Solve mysterious puzzles.</li>
        <li>👥 Teamwork is the key.</li>
        <li>🎭 The participant details will be a surprise!</li>
        <li>😂 Expect fun, laughter, and thrill.</li>
      </ul>

      <p className="text-lg text-gray-300 mb-6">
        Join us for a thrilling experience full of fun, mystery, and surprises.  
        <span className="font-bold text-white"> Are you ready to play?</span> 🎉
      </p>

      {/* Registration Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => (window.location.href = "/tarang")}
        className="w-full py-4 mt-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 
        text-white text-lg font-bold rounded-xl shadow-lg transition-all duration-300"
      >
        🚀 Back
      </motion.button>
    </motion.div>
  );
};

export default MysteryGame;
