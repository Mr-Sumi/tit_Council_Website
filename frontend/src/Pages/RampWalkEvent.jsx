import React from "react";
import { motion } from "framer-motion";
import { Sparkles, Camera, Shirt, Footprints } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function RampWalkEvent() {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="bg-gradient-to-b from-black to-gray-900 text-white rounded-2xl shadow-xl p-8 max-w-3xl mx-auto my-10"
    >
      {/* Title */}
      <h2 className="text-4xl font-extrabold text-center mb-6">
        💃 Ramp Walk(Traditional only) – Walk with Confidence & Style! 🕺
      </h2>

      {/* Description */}
      <p className="text-gray-300 text-lg leading-relaxed text-center mb-6">
        Time to shine on the runway! 🌟 Join our Ramp Walk and show off your
        confidence, style, and personality.  
        <motion.span
          className="text-pink-400 font-semibold block mt-2 flex items-center justify-center gap-2"
          animate={{ scale: [1, 1.2, 1], opacity: [0.8, 1, 0.8] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          👑 Winners will be crowned as Mr. & Ms. Fresher! 👑
        </motion.span>
      </p>

      {/* Features */}
      <div className="grid md:grid-cols-2 gap-6 mt-6">
        <div className="flex items-start space-x-3">
          <Footprints className="w-6 h-6 text-pink-400 mt-1" />
          <p className="text-gray-200 text-lg">💫 Walk with attitude.</p>
        </div>
        <div className="flex items-start space-x-3">
          <Shirt className="w-6 h-6 text-blue-400 mt-1" />
          <p className="text-gray-200 text-lg">👗 Flaunt your fashion.</p>
        </div>
        <div className="flex items-start space-x-3">
          <Camera className="w-6 h-6 text-purple-400 mt-1" />
          <p className="text-gray-200 text-lg">📸 Pose like a pro.</p>
        </div>
        <div className="flex items-start space-x-3">
          <Sparkles className="w-6 h-6 text-yellow-400 mt-1" />
          <p className="text-gray-200 text-lg">
            💃 Express yourself with grace and style.
          </p>
        </div>
      </div>

      {/* Highlight */}
      <div className="mt-8 bg-gray-800/60 p-6 rounded-xl shadow-inner text-center">
        <p className="text-lg text-gray-100">
          Open to all – no age or size limits! 💥 It’s all about confidence,
          presence, and fun.
        </p>
        <h3 className="text-2xl font-bold text-pink-400 mt-4">
          Are you ready to slay the runway? 👠✨
        </h3>
      </div>

      {/* Registration Button */}
      <div className="mt-8 flex justify-center">
        <motion.button
          onClick={() => navigate("/tarangForm")}
          className="px-8 py-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white font-semibold rounded-2xl shadow-lg hover:scale-105 transition-transform"
          whileTap={{ scale: 0.9 }}
        >
          Register Now
        </motion.button>
      </div>
    </motion.div>
  );
}
