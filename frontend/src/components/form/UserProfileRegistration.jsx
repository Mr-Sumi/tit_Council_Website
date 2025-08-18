import { useState } from "react";
import { motion } from "framer-motion";
import { User, IdCard, School, Calendar, Users } from "lucide-react";
import { RiCheckLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";

export default function UserProfileRegistration() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phone: "",
    enrollment: "",
    dob: "",
  });

  const [errors, setErrors] = useState({});
  const [successModal, setSuccessModal] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "phone") {
      const digits = value.replace(/\D/g, "");
      setFormData((prev) => ({ ...prev, phone: "+91" + digits.slice(0, 10) }));

      if (digits.length !== 10) {
        setErrors((prev) => ({ ...prev, phone: "Phone number must be 10 digits." }));
      } else {
        setErrors((prev) => ({ ...prev, phone: "" }));
      }
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate before submit
    if (formData.phone.replace(/\D/g, "").length !== 12) {
      setErrors((prev) => ({ ...prev, phone: "Phone number must be 10 digits." }));
      return;
    }

    try {
      const res = await fetch("http://localhost:3000/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setSuccessModal(true);
        setTimeout(() => {
          setSuccessModal(false);
          navigate("/");
        }, 2000);
      } else {
        alert("Registration failed. Try again.");
      }
    } catch (err) {
      console.error("Error:", err);
      alert("Something went wrong!");
    }
  };

  return (
    <main className="flex justify-center items-center min-h-screen px-6 py-12">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl p-10 w-full max-w-3xl border border-white/20"
      >
        <h1 className="text-3xl font-extrabold text-center text-white mb-6">
          👤 User Registration
        </h1>
        <p className="text-center text-white/70 mb-8">
          Fill in your details to join the Student Council
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Username */}
          <div className="flex items-center gap-3 bg-white/10 p-3 rounded-xl border border-white/20">
            <User className="text-indigo-400" />
            <input
              type="text"
              name="username"
              placeholder="Full Name"
              value={formData.username}
              onChange={handleChange}
              required
              className="bg-transparent w-full outline-none text-white placeholder-gray-400"
            />
          </div>

          {/* Email */}
          <div className="flex items-center gap-3 bg-white/10 p-3 rounded-xl border border-white/20">
            <Users className="text-green-400" />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
              className="bg-transparent w-full outline-none text-white placeholder-gray-400"
            />
          </div>

          {/* Phone */}
          <div>
            <div className="flex items-center gap-3 bg-white/10 p-3 rounded-xl border border-white/20">
              <IdCard className="text-yellow-400" />
              <input
                type="tel"
                name="phone"
                placeholder="+91XXXXXXXXXX"
                value={formData.phone}
                onChange={handleChange}
                required
                className="bg-transparent w-full outline-none text-white placeholder-gray-400"
              />
            </div>
            {errors.phone && (
              <p className="text-red-400 text-sm mt-1">{errors.phone}</p>
            )}
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

          {/* Date of Birth */}
          <div className="flex items-center gap-3 bg-white/10 p-3 rounded-xl border border-white/20">
            <Calendar className="text-purple-400" />
            <input
              type="date"
              name="dob"
              value={formData.dob}
              onChange={handleChange}
              required
              className="bg-transparent w-full outline-none text-white placeholder-gray-400"
            />
          </div>

          {/* Submit */}
          <motion.button
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="flex items-center justify-center gap-2 mt-4 bg-white/80 hover:bg-white text-black/90 py-3 rounded-xl font-semibold shadow-lg hover:opacity-90 transition"
          >
            <RiCheckLine size={20} />
            Register
          </motion.button>
        </form>

        {/* Login Button */}
        <p className="text-center text-white mt-6">
          Already have an account?{" "}
          <button
            onClick={() => navigate("/login")}
            className="text-indigo-400 hover:underline font-semibold"
          >
            Login
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
              Registration Successful!
            </h2>
            <p className="text-gray-300 text-center">
              Welcome to Student Council 🎉
            </p>
          </div>
        </div>
      )}
    </main>
  );
}
