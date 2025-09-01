import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const EventRegistration = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    utrNumber: "", // ✅ matches backend
    event: "",
    category: "", // only for Dance
    members: [{ name: "", email: "", phone: "", enrollmentNo: "" }], // ✅ matches backend
  });

  const eventFees = {
    "Ramp Walk": 50,
    Dance: { Solo: 50, Duo: 70, Group: 100 },
    "Open Mic": 50,
    Music: 40,
  };

  // Determine required members
  const getRequiredMembers = () => {
    if (formData.event === "Dance") {
      if (formData.category === "Solo") return 1;
      if (formData.category === "Duo") return 2;
      if (formData.category === "Group") return 4;
    }
    return 1;
  };

  // Adjust members dynamically
  const updateMembersArray = () => {
    const required = getRequiredMembers();
    let updated = [...formData.members];

    if (updated.length < required) {
      while (updated.length < required) {
        updated.push({ name: "", email: "", phone: "", enrollmentNo: "" });
      }
    } else if (updated.length > required) {
      updated = updated.slice(0, required);
    }

    setFormData({ ...formData, members: updated });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleMemberChange = (index, e) => {
    const updatedMembers = [...formData.members];
    updatedMembers[index][e.target.name] = e.target.value;
    setFormData({ ...formData, members: updatedMembers });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting form data:", formData);

    try {
      const response = await fetch("https://api.studentcouncil.info/registration/event", { // ✅ backend port
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
        credentials: "include",
      });

      const data = await response.json();
      console.log("Response:", data);

      if (response.ok) {
        alert(data.message || "Registration successful!");
        navigate("/"); // redirect after success (optional)
      } else {
        alert(data.error || "Something went wrong!");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Network error, please try again.");
    }
  };

  useEffect(() => {
    updateMembersArray();
  }, [formData.event, formData.category]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="bg-gray-900 p-8 rounded-2xl shadow-lg max-w-2xl w-full"
      >
        <h2 className="text-2xl font-bold text-center mb-6">Tarang Registration form</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Event Selection */}
          <select
            name="event"
            value={formData.event}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white"
            required
          >
            <option value="">Select Event</option>
            <option value="Ramp Walk">Ramp Walk(Traditional only)</option>
            <option value="Dance">Dance</option>
            <option value="Open Mic">Open Mic</option>
            <option value="Music">Music</option>
          </select>

          {/* Dance Category */}
          {formData.event === "Dance" && (
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white"
              required
            >
              <option value="">Select Dance Category</option>
              <option value="Solo">Solo</option>
              <option value="Duo">Duo</option>
              <option value="Group">Group</option>
            </select>
          )}

          {/* Members Input */}
          <div className="space-y-4">
            {formData.members.map((member, index) => (
              <div
                key={index}
                className="p-4 rounded-lg bg-gray-800 shadow-md space-y-2"
              >
                <h3 className="font-semibold">Member {index + 1}</h3>
                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  value={member.name}
                  onChange={(e) => handleMemberChange(index, e)}
                  className="w-full px-3 py-2 rounded bg-gray-700 text-white"
                  required
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={member.email}
                  onChange={(e) => handleMemberChange(index, e)}
                  className="w-full px-3 py-2 rounded bg-gray-700 text-white"
                  required
                />
                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone"
                  value={member.phone}
                  onChange={(e) => handleMemberChange(index, e)}
                  className="w-full px-3 py-2 rounded bg-gray-700 text-white"
                  required
                />
                <input
                  type="text"
                  name="enrollmentNo"
                  placeholder="Enrollment No."
                  value={member.enrollmentNo}
                  onChange={(e) => handleMemberChange(index, e)}
                  className="w-full px-3 py-2 rounded bg-gray-700 text-white"
                  required
                />
              </div>
            ))}
          </div>

          {/* Fee Display */}
          <p className="text-lg font-semibold text-center">
            Fee: ₹
            {formData.event === "Dance"
              ? eventFees.Dance[formData.category] || 0
              : eventFees[formData.event] || 0}
          </p>

          {/* QR Code */}
          <div className="flex justify-center mt-4">
            <img
              src="../../eventqr.jpg"
              alt="Payment QR"
              className="w-40 h-40 object-contain"
            />
          </div>

          {/* UTR No */}
          <input
            type="text"
            name="utrNumber" // ✅ matches backend
            placeholder="Enter UTR No."
            value={formData.utrNumber}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white"
            required
          />

          <button
            type="submit"
            className="w-full py-3 mt-6 bg-white text-black font-bold rounded-xl hover:bg-gray-300 transition"
          >
            Register
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default EventRegistration;
