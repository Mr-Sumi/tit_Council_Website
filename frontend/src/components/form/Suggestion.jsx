import React, { useState } from "react";
import { motion } from "framer-motion";
import { Send, User, IdCard, School, MessageSquare, Lightbulb } from "lucide-react";
import axios from "axios";

export default function SuggestionForm() {
  const [formData, setFormData] = useState({
    name: "",
    enrollment: "",
    college: "",
    problem: "",
    solution: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await axios.post("http://localhost:3000/suggestion", formData);

      if (res.data?.success) {
        alert("✅ Suggestion submitted successfully!");
        setFormData({ name: "", enrollment: "", college: "", problem: "", solution: "" });
      } else {
        alert("❌ Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting suggestion:", error);
      alert("⚠️ Server error. Please check your connection.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex justify-center items-center min-h-screen px-4 py-10 sm:px-6 sm:py-12 bg-gradient-to-br from-gray-900 via-black to-gray-800">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl p-6 sm:p-10 w-full max-w-2xl border border-white/20"
      >
        {/* Heading */}
        <h1 className="text-2xl sm:text-3xl font-extrabold text-center text-white mb-4">
          💡 Suggestion Box
        </h1>
        <p className="text-center text-white/70 text-sm sm:text-base mb-8">
          Share your problems and suggestions to help improve our council.
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 sm:gap-5">
          {/* Name */}
          <div className="flex items-center gap-3 bg-white/10 p-3 rounded-xl border border-white/20 focus-within:border-indigo-400 transition">
            <User className="text-indigo-400" />
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              required
              className="bg-transparent w-full outline-none text-white placeholder-gray-400 text-sm sm:text-base"
            />
          </div>

          {/* Enrollment */}
          <div className="flex items-center gap-3 bg-white/10 p-3 rounded-xl border border-white/20 focus-within:border-pink-400 transition">
            <IdCard className="text-pink-400" />
            <input
              type="text"
              name="enrollment"
              placeholder="Enrollment Number"
              value={formData.enrollment}
              onChange={handleChange}
              required
              className="bg-transparent w-full outline-none text-white placeholder-gray-400 text-sm sm:text-base"
            />
          </div>

          {/* College */}
          <div className="flex items-center gap-3 bg-white/10 p-3 rounded-xl border border-white/20 focus-within:border-green-400 transition">
            <School className="text-green-400" />
            <input
              type="text"
              name="college"
              placeholder="College"
              value={formData.college}
              onChange={handleChange}
              required
              className="bg-transparent w-full outline-none text-white placeholder-gray-400 text-sm sm:text-base"
            />
          </div>

          {/* Problem */}
          <div className="flex items-start gap-3 bg-white/10 p-3 rounded-xl border border-white/20 focus-within:border-red-400 transition">
            <MessageSquare className="text-red-400 mt-1" />
            <textarea
              name="problem"
              placeholder="Describe the problem you are facing..."
              value={formData.problem}
              onChange={handleChange}
              required
              rows={4}
              className="bg-transparent w-full outline-none text-white placeholder-gray-400 resize-none text-sm sm:text-base"
            />
          </div>

          {/* Solution */}
          <div className="flex items-start gap-3 bg-white/10 p-3 rounded-xl border border-white/20 focus-within:border-yellow-400 transition">
            <Lightbulb className="text-yellow-400 mt-1" />
            <textarea
              name="solution"
              placeholder="Your suggestion or solution..."
              value={formData.solution}
              onChange={handleChange}
              required
              rows={4}
              className="bg-transparent w-full outline-none text-white placeholder-gray-400 resize-none text-sm sm:text-base"
            />
          </div>

          {/* Submit */}
          <motion.button
            whileTap={{ scale: 0.95 }}
            type="submit"
            disabled={loading}
            className="flex items-center justify-center gap-2 mt-4 bg-yellow-400 text-black py-3 rounded-xl font-semibold shadow-lg hover:bg-yellow-300 transition disabled:opacity-50"
          >
            {loading ? "Submitting..." : <>
              <Send size={18} />
              Submit Suggestion
            </>}
          </motion.button>
        </form>
      </motion.div>
    </main>
  );
}
