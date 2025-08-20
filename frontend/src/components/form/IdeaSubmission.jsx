import React,{ useState } from "react";
import { motion } from "framer-motion";
import { showSuccess, showError, showWarning, showInfo } from "../../../utils/toastService";
import {
  User,
  IdCard,
  School,
  Lightbulb,
  FileText,
  Rocket,
  Send,
} from "lucide-react";

export default function IdeaSubmissionForm() {
  const [formData, setFormData] = useState({
    name: "",
    enrollment: "",
    college: "",
    title: "",
    description: "",
    impact: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
   showSuccess("🚀 Idea submitted successfully!");
    setFormData({
      name: "",
      enrollment: "",
      college: "",
      title: "",
      description: "",
      impact: "",
    });
  };

  return (
    <main className="flex justify-center items-center min-h-screen px-6 py-12">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl p-10 w-full max-w-3xl border border-white/20"
      >
        {/* Heading */}
        <h1 className="text-3xl font-extrabold text-center text-white mb-6">
          💡 Ideas & Innovation Submission
        </h1>
        <p className="text-center text-white/70 mb-8">
          Share your innovative ideas and projects that can bring a change.
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
              placeholder="College Name"
              value={formData.college}
              onChange={handleChange}
              required
              className="bg-transparent w-full outline-none text-white placeholder-gray-400"
            />
          </div>

          {/* Idea Title */}
          <div className="flex items-center gap-3 bg-white/10 p-3 rounded-xl border border-white/20">
            <Lightbulb className="text-yellow-400" />
            <input
              type="text"
              name="title"
              placeholder="Title of Your Idea"
              value={formData.title}
              onChange={handleChange}
              required
              className="bg-transparent w-full outline-none text-white placeholder-gray-400"
            />
          </div>

          {/* Description */}
          <div className="flex items-start gap-3 bg-white/10 p-3 rounded-xl border border-white/20">
            <FileText className="text-blue-400 mt-1" />
            <textarea
              name="description"
              placeholder="Describe your idea in detail..."
              value={formData.description}
              onChange={handleChange}
              required
              rows={4}
              className="bg-transparent w-full outline-none text-white placeholder-gray-400 resize-none"
            />
          </div>

          {/* Potential Impact */}
          <div className="flex items-start gap-3 bg-white/10 p-3 rounded-xl border border-white/20">
            <Rocket className="text-purple-400 mt-1" />
            <textarea
              name="impact"
              placeholder="What impact or change will this idea bring?"
              value={formData.impact}
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
            className="flex items-center justify-center gap-2 mt-4 bg-white/80 hover:bg-white text-black/90 py-3 rounded-xl font-semibold shadow-lg hover:opacity-90 transition"
          >
            <Send size={18} />
            Submit Idea
          </motion.button>
        </form>
      </motion.div>
    </main>
  );
}
