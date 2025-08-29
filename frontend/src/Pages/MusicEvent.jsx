import React from "react";
import { Music, Mic } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function MusicEvent() {
  const navigate = useNavigate();

  return (
    <div className="bg-gradient-to-br from-gray-900 to-black text-gray-200 p-6 rounded-2xl shadow-xl max-w-3xl mx-auto mt-10">
      {/* Header */}
      <div className="flex items-center space-x-3 mb-6">
        <Music className="text-yellow-400 w-8 h-8" />
        <h2 className="text-2xl font-bold">🎵 MUSIC 🎶</h2>
      </div>

      {/* Description */}
      <p className="text-lg mb-6">
        Are you ready to sing your heart out? 🎶 Whether you’re going solo or
        want to showcase your passion for music, this stage is yours!
      </p>

      {/* Solo Singing */}
      <div className="bg-gray-800 p-5 rounded-xl mb-6 hover:scale-[1.02] transition-transform">
        <h3 className="text-xl font-semibold flex items-center space-x-2 mb-2">
          <Mic className="text-pink-400 w-6 h-6" /> 
          <span>🎙️ Solo Singing</span>
        </h3>
        <p className="mb-3">
          One voice, one spotlight! ✨ Show your talent, emotions, and passion through your song.
        </p>
        <p className="font-semibold text-gray-300">Theme:</p>
        <ul className="list-disc list-inside text-gray-400">
          <li>🎶 Classical</li>
          <li>🎤 Rap</li>
          <li>🎬 Bollywood</li>
        </ul>
      </div>

      {/* Registration Button */}
      <div className="mt-6 flex justify-center">
        <button
          onClick={() => navigate("/tarangForm")}
          className="px-8 py-3 bg-gradient-to-r from-yellow-500 to-orange-500 text-black font-semibold rounded-2xl shadow-lg hover:scale-105 transition-transform"
        >
          Register Now
        </button>
      </div>
    </div>
  );
}
