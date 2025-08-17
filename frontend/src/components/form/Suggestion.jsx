import { useState } from "react";
import { motion } from "framer-motion";
import { Send, User, IdCard, School, MessageSquare, Lightbulb } from "lucide-react";

export default function SuggestionForm() {
  const [formData, setFormData] = useState({
    name: "",
    enrollment: "",
    college: "",
    problem: "",
    solution: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted:", formData);
    alert("✅ Suggestion submitted successfully!");
    setFormData({ name: "", enrollment: "", college: "", problem: "", solution: "" });
  };

  return (
    <main className="flex justify-center items-center min-h-screen px-6 py-12">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl p-10 w-full max-w-2xl border border-white/20"
      >
        <h1 className="text-3xl font-extrabold text-center text-white mb-6">
          💡 Suggestion Box
        </h1>
        <p className="text-center text-white/70 mb-8">
          Share your problems and suggestions to help improve our council.
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          {/* Name */}
          <div className="flex items-center gap-3 bg-white/10 p-3 rounded-xl border border-white/20">
            <User className="text-indigo-400" />
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              required
              className="bg-transparent w-full outline-none text-white placeholder-gray-400"
            />
          </div>

          {/* Enrollment */}
          <div className="flex items-center gap-3 bg-white/10 p-3 rounded-xl border border-white/20">
            <IdCard className="text-pink-400" />
            <input
              type="text"
              name="enrollment"
              placeholder="Enrollment Number"
              value={formData.enrollment}
              onChange={handleChange}
              required
              className="bg-transparent w-full outline-none text-white placeholder-gray-400"
            />
          </div>

          {/* College */}
          <div className="flex items-center gap-3 bg-white/10 p-3 rounded-xl border border-white/20">
            <School className="text-green-400" />
            <input
              type="text"
              name="college"
              placeholder="College"
              value={formData.college}
              onChange={handleChange}
              required
              className="bg-transparent w-full outline-none text-white placeholder-gray-400"
            />
          </div>

          {/* Problem */}
          <div className="flex items-start gap-3 bg-white/10 p-3 rounded-xl border border-white/20">
            <MessageSquare className="text-red-400 mt-1" />
            <textarea
              name="problem"
              placeholder="Describe the problem you are facing..."
              value={formData.problem}
              onChange={handleChange}
              required
              rows={3}
              className="bg-transparent w-full outline-none text-white placeholder-gray-400 resize-none"
            />
          </div>

          {/* Solution */}
          <div className="flex items-start gap-3 bg-white/10 p-3 rounded-xl border border-white/20">
            <Lightbulb className="text-yellow-400 mt-1" />
            <textarea
              name="solution"
              placeholder="Your suggestion or solution..."
              value={formData.solution}
              onChange={handleChange}
              required
              rows={3}
              className="bg-transparent w-full outline-none text-white placeholder-gray-400 resize-none"
            />
          </div>

          {/* Submit */}
          <motion.button
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="flex items-center justify-center gap-2 mt-4 bg-white/80 text-black/90 py-3 rounded-xl font-semibold shadow-lg hover:bg-white transition"
          >
            <Send size={18} />
            Submit Suggestion
          </motion.button>
        </form>
      </motion.div>
    </main>
  );
}
