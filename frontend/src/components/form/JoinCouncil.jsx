import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";
import clubsJson from '../../data/Clubs.json';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { 
  FaUser, FaEnvelope, FaPhoneAlt, FaIdCard, FaBirthdayCake, 
  FaVenusMars, FaBuilding, FaLayerGroup, FaCalendarAlt, FaUniversity
} from 'react-icons/fa';

const JoinCouncilForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    enrollment: "",
    dob: "",
    gender: "",
    college: "",
    department: "",
    year: "",
    club: "",
    motivation: "",
    terms: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name === "phone") {
      const numeric = value.replace(/\D/g, "").slice(0, 10);
      setFormData(prev => ({ ...prev, phone: numeric }));
    } else {
      setFormData(prev => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.terms) return toast.warning("Please accept the terms & conditions.");
    if (!/^[6-9][0-9]{9}$/.test(formData.phone)) return toast.error("Invalid phone number.");
    if (!emailRegex.test(formData.email)) return toast.error("Invalid email address.");

    try {
      await axios.post(
        "https://api.studentcouncil.info/council/apply",
        formData,
        { headers: { "Content-Type": "application/json" } }
      );

      toast.success("Form submitted successfully!");

      // Reset form
      setFormData({
        name: "",
        email: "",
        phone: "",
        enrollment: "",
        dob: "",
        gender: "",
        college: "",
        department: "",
        year: "",
        club: "",
        motivation: "",
        terms: false,
      });

      setTimeout(() => {
        navigate("/"); 
      }, 1500);

    } catch (err) {
      console.error(err);
      toast.error("Failed to submit. Try again.");
    }
  };

  const departments = ["CSE","CSE AIML","CSE AI","CSE DS","CSE AIDS","CSE Cyber","CSE IoT","IT","EX","EC","ME","CE","B.Pharm","MBA","Law"];
  const years = ["1st Year", "2nd Year", "3rd Year", "4th Year"];

  return (
    <div className="min-h-screen flex justify-center items-center py-20 px-5">
      <section className="w-full max-w-xl bg-transparent p-7 rounded-lg shadow-lg text-white">
        <header className="text-xl font-bold text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-4xl font-bold tracking-tight bg-gradient-to-r from-zinc-800 via-white to-indigo-800 bg-clip-text text-transparent mb-6"
          >
            Join the Student Council
          </motion.h2>
        </header>

        <form className="mt-5 space-y-4" onSubmit={handleSubmit}>
          {/* Full Name */}
          <div>
            <label className="block mb-1">Full Name</label>
            <div className="flex items-center bg-gray-900 rounded-md border border-gray-600 px-3">
              <FaUser className="text-gray-400 mr-2"/>
              <input name="name" type="text" placeholder="Enter full name" value={formData.name} onChange={handleChange} required className="bg-transparent w-full py-2 focus:outline-none"/>
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="block mb-1">Email</label>
            <div className="flex items-center bg-gray-900 rounded-md border border-gray-600 px-3">
              <FaEnvelope className="text-gray-400 mr-2"/>
              <input name="email" type="email" placeholder="Enter email" value={formData.email} onChange={handleChange} required className="bg-transparent w-full py-2 focus:outline-none"/>
            </div>
          </div>

          {/* Phone */}
          <div>
            <label className="block mb-1">Phone Number</label>
            <div className="flex items-center bg-gray-900 rounded-md border border-gray-600 px-3">
              <FaPhoneAlt className="text-gray-400 mr-2" />
              <span className="text-gray-400 mr-1">+91</span>
              <input
                name="phone"
                type="tel"
                placeholder="XXXXXXXXXX"
                value={formData.phone}
                onChange={handleChange}
                required
                maxLength={10}
                className="bg-transparent w-full py-2 focus:outline-none"
              />
            </div>
          </div>

          {/* Enrollment Number */}
          <div>
            <label className="block mb-1">Enrollment Number</label>
            <div className="flex items-center bg-gray-900 rounded-md border border-gray-600 px-3">
              <FaIdCard className="text-gray-400 mr-2"/>
              <input name="enrollment" type="text" placeholder="Enter enrollment number" value={formData.enrollment} onChange={handleChange} required className="bg-transparent w-full py-2 focus:outline-none"/>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            {/* DOB */}
            <div>
              <label className="block mb-1">Date of Birth</label>
              <div className="flex items-center bg-gray-900 rounded-md border border-gray-600 px-3">
                <FaBirthdayCake className="text-gray-400 mr-2"/>
                <input 
                  name="dob" 
                  type="date" 
                  value={formData.dob} 
                  onChange={handleChange} 
                  required 
                  className="bg-gray-900 w-full py-2 focus:outline-none"
                />
              </div>
            </div>

            {/* Gender */}
            <div>
              <label className="block mb-1">Gender</label>
              <div className="flex items-center bg-gray-900 rounded-md border border-gray-600 px-3">
                <FaVenusMars className="text-gray-400 mr-2"/>
                <select 
                  name="gender" 
                  value={formData.gender} 
                  onChange={handleChange} 
                  required 
                  className="w-full bg-gray-900 py-2 focus:outline-none"
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Prefer not to say</option>
                </select>
              </div>
            </div>
          </div>

          {/* College */}
          <div>
            <label className="block mb-1">College</label>
            <div className="flex items-center bg-gray-900 rounded-md border border-gray-600 px-3">
              <FaBuilding className="text-gray-400 mr-2"/>
              <select name="college" value={formData.college || ""} onChange={handleChange} required className="w-full bg-gray-900 py-2">
                <option value="">Select College</option>
                <option value="TIT">TIT</option>
                <option value="TITE">TITE</option>
                <option value="TITS">TITS</option>
                <option value="TIT-CSE">TIT-CSE</option>
              </select>
            </div>
          </div>

          {/* Department */}
          <div>
            <label className="block mb-1">Department</label>
            <div className="flex items-center bg-gray-900 rounded-md border border-gray-600 px-3">
              <FaLayerGroup className="text-gray-400 mr-2"/>
              <select name="department" value={formData.department} onChange={handleChange} required className="w-full bg-gray-900 py-2">
                <option value="">Select Department</option>
                {departments.map(dep => <option key={dep} value={dep}>{dep}</option>)}
              </select>
            </div>
          </div>

          {/* Year */}
          <div>
            <label className="block mb-1">Year of Study</label>
            <div className="flex items-center bg-gray-900 rounded-md border border-gray-600 px-3">
              <FaCalendarAlt className="text-gray-400 mr-2"/>
              <select name="year" value={formData.year} onChange={handleChange} required className="w-full bg-gray-900 py-2">
                <option value="">Select Year</option>
                {years.map(y => <option key={y} value={y}>{y}</option>)}
              </select>
            </div>
          </div>

          {/* Club */}
          <div>
            <label className="block mb-1">Club</label>
            <div className="flex items-center bg-gray-900 rounded-md border border-gray-600 px-3">
              <FaUniversity className="text-gray-400 mr-2"/>
              <select name="club" value={formData.club} onChange={handleChange} required className="w-full bg-gray-900 py-2">
                <option value="">Select Club</option>
                {clubsJson.clubsData.map(club => <option key={club.name} value={club.name}>{club.name}</option>)}
              </select>
            </div>
          </div>

          {/* Motivation */}
          <div>
            <label className="block mb-1">Why do you want to join?</label>
            <textarea name="motivation" rows={4} value={formData.motivation} onChange={handleChange} required placeholder="Your motivation here..." className="w-full bg-gray-900 border border-gray-600 rounded-md p-2 focus:outline-none"></textarea>
          </div>

          {/* Terms */}
          <div className="flex items-center gap-3">
            <input 
              type="checkbox" 
              name="terms" 
              checked={formData.terms} 
              onChange={handleChange} 
              className="w-6 h-6 accent-[#FF4F01]" 
            />
            <label className="text-lg font-medium text-gray-200">
              I accept all terms and conditions
            </label>
          </div>

          {/* Submit */}
          <button type="submit" className="w-full font-bold py-2 rounded-md text-gray-900 bg-white/90 hover:bg-white">
            Submit Application
          </button>
        </form>

        {/* Toast Container */}
        <ToastContainer 
          position="top-right"
          autoClose={4000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
      </section>
    </div>
  );
};

export default JoinCouncilForm;
