import { useState } from "react";
import { motion } from "framer-motion";
import { User, IdCard, School, Calendar, Users, Camera } from "lucide-react";
import { RiCheckLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";

export default function UserProfileRegistration() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "+91",
    enrollment: "",
    college: "",
    branch: "",
    dob: "",
    gender: "",
  });

  const [profilePhoto, setProfilePhoto] = useState(null);
  const [idCardPhoto, setIdCardPhoto] = useState(null);
  const [successModal, setSuccessModal] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "phone") {
      const digits = value.replace(/\D/g, "");
      setFormData((prev) => ({ ...prev, phone: "+91" + digits.slice(0, 10) }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handlePhotoChange = (e, type) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      if (type === "profile") setProfilePhoto(reader.result);
      else setIdCardPhoto(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !formData.name ||
      !formData.email ||
      !formData.phone ||
      !formData.enrollment ||
      !formData.college ||
      !formData.branch ||
      !formData.dob ||
      !formData.gender
    ) {
      alert("Please fill all fields!");
      return;
    }
    console.log("Submitted Data:", formData, profilePhoto, idCardPhoto);
    setSuccessModal(true);
    setTimeout(() => {
      setSuccessModal(false);
      navigate("/");
    }, 2000);
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

        {/* ID Card Upload */}
        <div className="flex flex-col sm:flex-row items-center gap-4 mb-6">
            <label className="relative w-[20vw] h-[20vh] border-2 border-dashed border-gray-500 rounded-xl flex items-center justify-center overflow-hidden bg-gray-800 cursor-pointer hover:border-pink-400 transition-all duration-300 group">
                {idCardPhoto ? (
                <>
                  <img
                    src={idCardPhoto}
                    alt="ID Card"
                    className="w-full h-full object-cover rounded-xl transition-transform duration-300 group-hover:scale-105"
                  />
                </>
                ) : (
                <IdCard className="text-pink-400 text-4xl group-hover:scale-110 transition-transform duration-300" />
                )}
                <input
                type="file"
                accept="image/*"
                onChange={(e) => handlePhotoChange(e, "id")}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
            </label>
            <span className="text-gray-300 text-lg sm:text-base">
                Click or drag your ID card here
            </span>
        </div>


        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Name */}
          <div className="flex items-center gap-3 bg-white/10 p-3 rounded-xl border border-white/20">
            <User className="text-indigo-400" />
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
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

          {/* Branch */}
          <div className="flex items-center gap-3 bg-white/10 p-3 rounded-xl border border-white/20">
            <Users className="text-blue-400" />
            <input
              type="text"
              name="branch"
              placeholder="Branch"
              value={formData.branch}
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

          {/* Gender */}
          <div className="flex items-center gap-3 bg-white/10 p-3 rounded-xl border border-white/20">
            <Users className="text-pink-400" />
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              required
              className="bg-transparent w-full outline-none"
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
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
