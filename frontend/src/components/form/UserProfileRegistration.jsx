import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
    college: "",
    branch: "",
    dob: "",
    gender: "",
  });

  const [idCardPhoto, setIdCardPhoto] = useState(null);
  const [errors, setErrors] = useState({});
  const [successModal, setSuccessModal] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "phone") {
      const digits = value.replace(/\D/g, "");
      const num = digits.startsWith("91") ? digits.slice(2, 12) : digits.slice(0, 10);
      setFormData((prev) => ({ ...prev, phone: "+91" + num }));
      setErrors((prev) => ({
        ...prev,
        phone: num.length !== 10 ? "Phone number must be 10 digits." : "",
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setIdCardPhoto(reader.result);
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.phone.replace(/\D/g, "").length !== 12) {
      setErrors((prev) => ({ ...prev, phone: "Phone number must be 10 digits." }));
      return;
    }
    try {
      console.log("Submitted Data:", formData, idCardPhoto);
      setSuccessModal(true);
      setTimeout(() => {
        setSuccessModal(false);
        navigate("/");
      }, 2500);
    } catch (err) {
      console.error(err);
      alert("Something went wrong!");
    }
  };

  return (
  <main className="flex justify-center items-start sm:items-center min-h-screen px-4 py-16 sm:py-12 bg-gray-900">
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
      className="bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl p-6 sm:p-10 w-full max-w-md sm:max-w-3xl border border-white/20"
    >
      <h1 className="text-2xl sm:text-3xl font-extrabold text-center text-white mb-4 sm:mb-6">
        👤 User Registration
      </h1>
      <p className="text-center text-white/70 mb-6 sm:mb-8 text-sm sm:text-base">
        Fill in your details to join the Student Council
      </p>
  
      {/* Form */}
      <form onSubmit={handleSubmit} className="flex flex-col items-center w-full gap-3 sm:gap-4">
        {/* Text Inputs */}
        {[
          { name: "username", placeholder: "Full Name", icon: <User className="text-indigo-400" /> },
          { name: "email", placeholder: "Email", icon: <Users className="text-green-400" />, type: "email" },
          { name: "enrollment", placeholder: "Enrollment Number", icon: <IdCard className="text-pink-400" /> },
          { name: "college", placeholder: "College Name", icon: <School className="text-green-400" /> },
          { name: "branch", placeholder: "Branch", icon: <Users className="text-blue-400" /> },
        ].map((field) => (
          <div key={field.name} className="flex items-center gap-3 bg-white/10 p-3 rounded-xl border border-white/20 w-full">
            {field.icon}
            <input
              type={field.type || "text"}
              name={field.name}
              placeholder={field.placeholder}
              value={formData[field.name]}
              onChange={handleChange}
              required
              className="bg-transparent w-full outline-none text-white placeholder-gray-400 text-sm sm:text-base"
            />
          </div>
        ))}
  
        {/* Phone */}
        <div className="w-full">
          <div className="flex items-center gap-3 bg-white/10 p-3 rounded-xl border border-white/20">
            <IdCard className="text-yellow-400" />
            <input
              type="tel"
              name="phone"
              placeholder="+91XXXXXXXXXX"
              value={formData.phone}
              onChange={handleChange}
              required
              className="bg-transparent w-full outline-none text-white placeholder-gray-400 text-sm sm:text-base"
            />
          </div>
          {errors.phone && <p className="text-red-400 text-sm mt-1">{errors.phone}</p>}
        </div>
  
        {/* DOB */}
        <div className="flex items-center gap-3 bg-white/10 p-3 rounded-xl border border-white/20 w-full">
          <Calendar className="text-purple-400" />
          <input
            type="date"
            name="dob"
            value={formData.dob}
            onChange={handleChange}
            required
            className="bg-transparent w-full outline-none text-white placeholder-gray-400 text-sm sm:text-base"
          />
        </div>
  
        {/* Gender */}
        <div className="flex items-center gap-3 bg-white/10 p-3 rounded-xl border border-white/20 w-full">
          <Users className="text-pink-400" />
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            required
            className="bg-transparent w-full outline-none text-white placeholder-gray-400 text-sm sm:text-base"
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>
  
        {/* ID Card Upload */}
        <div className="flex flex-col sm:flex-row items-center gap-4 mb-6 w-full">
          <label className="relative w-full max-w-xs sm:max-w-sm border-2 border-dashed border-gray-500 rounded-xl flex items-center justify-center overflow-hidden bg-gray-800 cursor-pointer hover:border-pink-400 transition-all duration-300 group p-2">
            {idCardPhoto ? (
              <img
                src={idCardPhoto}
                alt="ID Card"
                className="w-full max-h-[50vh] sm:max-h-[60vh] object-contain transition-transform duration-300"
              />
            ) : (
              <div className="flex flex-col items-center justify-center text-center gap-2 p-4">
                <IdCard className="text-pink-400 text-5xl sm:text-6xl group-hover:scale-110 transition-transform duration-300" />
                <span className="text-gray-300 text-sm sm:text-base md:text-lg lg:text-xl">
                  Click or drag your ID card here
                </span>
              </div>
            )}
            <input
              type="file"
              accept="image/*"
              onChange={handlePhotoChange}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
          </label>
        </div>
  
        {/* Submit */}
        <motion.button
          whileTap={{ scale: 0.95 }}
          type="submit"
          className="flex items-center justify-center gap-2 mt-4 bg-white/80 hover:bg-white text-black/90 py-3 rounded-xl font-semibold shadow-lg hover:opacity-90 transition w-full sm:w-auto px-[15vw]"
        >
          <RiCheckLine size={20} />
          Register
        </motion.button>
      </form>
  
      {/* Login */}
      <p className="text-center text-white mt-6 text-sm sm:text-base">
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
    <AnimatePresence>
      {successModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 px-4"
        >
          <motion.div
            initial={{ scale: 0.5, opacity: 0, rotate: -10 }}
            animate={{ scale: [0.5, 1.1, 1], opacity: 1, rotate: [-10, 5, 0] }}
            exit={{ scale: 0.5, opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="bg-gray-900 rounded-3xl p-6 sm:p-8 flex flex-col items-center gap-4 shadow-xl w-full max-w-sm sm:max-w-md"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1.2 }}
              transition={{ duration: 0.6, type: "spring", stiffness: 200, damping: 8 }}
              className="text-green-400 text-6xl"
            >
              <RiCheckLine />
            </motion.div>
            <h2 className="text-2xl font-bold text-white text-center">
              Registration Successful!
            </h2>
            <p className="text-gray-300 text-center">Welcome to Student Council 🎉</p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  </main>
  
  );
}