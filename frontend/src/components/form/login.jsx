import { useState } from "react";
import { motion } from "framer-motion";
import { Users, Lock } from "lucide-react";
import { RiCheckLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";

export default function UserLogin() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    collegeId: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [successModal, setSuccessModal] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch("http://localhost:3000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include", // important if backend sets cookies
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setSuccessModal(true);
        setTimeout(() => {
          setSuccessModal(false);
          navigate("/"); // after login
        }, 1500);
      } else {
        const data = await res.json().catch(() => ({}));
        setError(data.message || "Invalid College ID or password.");
      }
    } catch (err) {
      console.error("Error:", err);
      setError("Something went wrong!");
    }
  };

  return (
    <main className="flex justify-center items-center min-h-screen px-6 py-12">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl p-10 w-full max-w-lg border border-white/20"
      >
        <h1 className="text-3xl font-extrabold text-center text-white mb-6">
          🔑 Login
        </h1>
        <p className="text-center text-white/70 mb-8">
          Enter your College ID & DOB (as password) to login
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* College ID */}
          <div className="flex items-center gap-3 bg-white/10 p-3 rounded-xl border border-white/20">
            <Users className="text-green-400" />
            <input
              type="text"
              name="collegeId"
              placeholder="College ID"
              value={formData.collegeId}
              onChange={handleChange}
              required
              className="bg-transparent w-full outline-none text-white placeholder-gray-400"
            />
          </div>

          {/* Password (DOB) */}
          <div className="flex items-center gap-3 bg-white/10 p-3 rounded-xl border border-white/20">
            <Lock className="text-indigo-400" />
            <input
              type="password"
              name="password"
              placeholder="DOB (YYYY-MM-DD)"
              value={formData.password}
              onChange={handleChange}
              required
              className="bg-transparent w-full outline-none text-white placeholder-gray-400"
            />
          </div>

          {/* Error */}
          {error && <p className="text-red-400 text-sm">{error}</p>}

          {/* Submit */}
          <motion.button
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="flex items-center justify-center gap-2 mt-4 bg-white/80 hover:bg-white text-black/90 py-3 rounded-xl font-semibold shadow-lg hover:opacity-90 transition"
          >
            <RiCheckLine size={20} />
            Login
          </motion.button>
        </form>

        {/* Note */}
        <p className="text-center text-gray-300 mt-4 text-sm">
          👉 Use your Date of Birth as password (YYYY-MM-DD)
        </p>

        {/* Register Redirect */}
        <p className="text-center text-white mt-6">
          Don’t have an account?{" "}
          <button
            onClick={() => navigate("/userProfileRegistration")}
            className="text-indigo-400 hover:underline font-semibold"
          >
            Register
          </button>
        </p>
      </motion.div>

      {/* Success Modal */}
      {successModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 animate-fadeIn">
          <div className="bg-gray-900 rounded-3xl p-8 flex flex-col items-center gap-4 shadow-xl animate-scaleUp">
            <div className="text-green-400 text-6xl">
              <RiCheckLine />
            </div>
            <h2 className="text-2xl font-bold text-white text-center">
              Login Successful!
            </h2>
            <p className="text-gray-300 text-center">Welcome back 🎉</p>
          </div>
        </div>
      )}
    </main>
  );
}
