import React, { useState, useEffect } from "react";

const SIHregistration = () => {
  const [members, setMembers] = useState([]);
  const [teamName, setTeamName] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [registeredTeams, setRegisteredTeams] = useState([]);

  // Add member function
  const addMember = (isLeader = false) => {
    if (members.length >= 6) {
      alert("Maximum 6 members allowed per team!");
      return;
    }

    if (isLeader && members.some((m) => m.role === "leader")) {
      alert("Only one leader allowed per team!");
      return;
    }

    const newMember = {
      name: "",
      email: "",
      phone: "",
      gender: "",
      institution: "",
      skills: "",
      role: isLeader ? "leader" : "member",
    };

    setMembers([...members, newMember]);
  };

  // Remove member
  const removeMember = (index) => {
    const updated = [...members];
    updated.splice(index, 1);
    setMembers(updated);
  };

  // Check female requirement
  const hasFemale = members.some((m) => m.gender === "female");

  // Handle input changes
  const handleMemberChange = (index, field, value) => {
    const updated = [...members];
    updated[index][field] = value;
    setMembers(updated);
  };

  // Submit form (POST)
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (members.length < 6) {
      alert("Team must have exactly 6 members!");
      return;
    }

    if (!hasFemale) {
      alert("At least one female member is required!");
      return;
    }

    const data = { teamName, category, description, members };

    try {
      const res = await fetch("http://localhost:5000/api/registration", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await res.json();

      if (result.success) {
        alert("Registration submitted successfully!");
        setTeamName("");
        setCategory("");
        setDescription("");
        setMembers([
          { role: "leader", name: "", email: "", phone: "", gender: "", institution: "", skills: "" },
        ]);
        fetchTeams(); // refresh after submit
      } else {
        alert("Error: " + result.message);
      }
    } catch (err) {
      console.error(err);
      alert("An error occurred. Please try again.");
    }
  };

  // Fetch teams (GET)
  const fetchTeams = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/registration");
      const result = await res.json();
      if (result.success) {
        setRegisteredTeams(result.data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Load leader on mount + fetch teams
  useEffect(() => {
    addMember(true);
    fetchTeams();
    // eslint-disable-next-line
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-100 via-dark-200 to-dark-300 text-white font-sans">
      <div className="max-w-4xl mx-auto p-6">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold text-primary mb-4">Team Registration</h2>
          <p className="text-gray-300 text-lg">Form your team and join the competition!</p>
        </div>

        {/* Guidelines */}
        <div className="bg-primary/10 border border-primary/30 rounded-lg p-6 mb-8">
          <h3 className="text-primary text-lg font-semibold mb-4">📋 Team Formation Guidelines</h3>
          <ul className="space-y-2 text-gray-300">
            <li className="flex items-center space-x-2">
              <span className="text-primary">•</span>
              <span>
                Team size: <strong className="text-white">6 members</strong> (including 1 leader)
              </span>
            </li>
            <li className="flex items-center space-x-2">
              <span className="text-primary">•</span>
              <span>
                Only <strong className="text-white">1 leader</strong> allowed per team
              </span>
            </li>
            <li className="flex items-center space-x-2">
              <span className="text-primary">•</span>
              <span>
                <strong className="text-white">1 girl member</strong> is compulsory
              </span>
            </li>
            <li className="flex items-center space-x-2">
              <span className="text-primary">•</span>
              <span>
                All members must <strong className="text-white">actively contribute</strong>
              </span>
            </li>
          </ul>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-white/10 backdrop-blur-md rounded-xl p-8 border border-white/20"
        >
          {/* Team Information */}
          <div className="mb-8">
            <div className="flex items-center space-x-2 text-primary text-xl font-semibold mb-6 pb-2 border-b border-primary/30">
              <span>🏆</span>
              <h3>Team Information</h3>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-gray-200 font-medium mb-2">
                  Team Name <span className="text-primary">*</span>
                </label>
                <input
                  type="text"
                  value={teamName}
                  onChange={(e) => setTeamName(e.target.value)}
                  required
                  placeholder="Enter your team name"
                  className="w-full px-4 py-3 bg-white/10 border-2 border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-primary transition-colors"
                />
              </div>
              <div>
                <label className="block text-gray-200 font-medium mb-2">
                  Competition Category <span className="text-primary">*</span>
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  required
                  className="w-full px-4 py-3 bg-white/10 border-2 border-white/20 rounded-lg text-white focus:outline-none focus:border-primary transition-colors"
                >
                  <option value="">Select Category</option>
                  <option value="coding">Coding Challenge</option>
                  <option value="design">Design Competition</option>
                  <option value="innovation">Innovation Hub</option>
                  <option value="business">Business Plan</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-gray-200 font-medium mb-2">Team Description</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows="3"
                placeholder="Tell us about your team..."
                className="w-full px-4 py-3 bg-white/10 border-2 border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-primary transition-colors"
              ></textarea>
            </div>
          </div>

          {/* Team Members */}
          <div className="mb-8">
            <div className="flex items-center space-x-2 text-primary text-xl font-semibold mb-6 pb-2 border-b border-primary/30">
              <span>👥</span>
              <h3>Team Members</h3>
            </div>

            <div className="space-y-4 mb-6">
              {members.map((member, index) => (
                <div
                  key={index}
                  className="bg-black/30 rounded-lg p-6 border border-white/10"
                >
                  <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center space-x-2">
                      <h4 className="text-secondary font-semibold">
                        {member.role === "leader"
                          ? "Team Leader"
                          : `Team Member ${index}`}
                      </h4>
                      {member.role === "leader" && (
                        <span className="bg-gradient-to-r from-yellow-400 to-orange-400 text-black px-3 py-1 rounded-full text-xs font-bold">
                          LEADER
                        </span>
                      )}
                    </div>
                    {index > 0 && (
                      <button
                        type="button"
                        onClick={() => removeMember(index)}
                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm transition-colors"
                      >
                        Remove
                      </button>
                    )}
                  </div>

                  {/* Member Fields */}
                  <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <input
                      type="text"
                      value={member.name}
                      onChange={(e) => handleMemberChange(index, "name", e.target.value)}
                      placeholder="Enter full name"
                      required
                      className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-primary transition-colors"
                    />
                    <input
                      type="email"
                      value={member.email}
                      onChange={(e) => handleMemberChange(index, "email", e.target.value)}
                      placeholder="Enter email"
                      required
                      className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-primary transition-colors"
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <input
                      type="tel"
                      value={member.phone}
                      onChange={(e) => handleMemberChange(index, "phone", e.target.value)}
                      placeholder="Enter phone number"
                      required
                      className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-primary transition-colors"
                    />
                    <select
                      value={member.gender}
                      onChange={(e) => handleMemberChange(index, "gender", e.target.value)}
                      required
                      className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-primary transition-colors"
                    >
                      <option value="">Select Gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <input
                      type="text"
                      value={member.institution}
                      onChange={(e) =>
                        handleMemberChange(index, "institution", e.target.value)
                      }
                      placeholder="Enter institution name"
                      required
                      className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-primary transition-colors"
                    />
                    <input
                      type="text"
                      value={member.skills}
                      onChange={(e) => handleMemberChange(index, "skills", e.target.value)}
                      placeholder="e.g., Programming, Design, Marketing"
                      className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-primary transition-colors"
                    />
                  </div>
                </div>
              ))}
            </div>

            <button
              type="button"
              onClick={() => addMember(false)}
              className="w-full bg-gradient-to-r from-secondary to-blue-400 text-white py-3 px-6 rounded-lg font-medium hover:shadow-lg hover:scale-[1.02] transition-all duration-200"
            >
              + Add Team Member
            </button>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-primary to-orange-400 text-white py-4 px-6 rounded-lg font-semibold text-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-200"
          >
            Register Team
          </button>
        </form>

        {/* Registered Teams (Fetched from backend) */}
        {registeredTeams.length > 0 && (
          <div className="mt-10 bg-white/10 p-6 rounded-lg border border-white/20">
            <h3 className="text-xl font-semibold text-primary mb-4">Registered Teams</h3>
            <ul className="space-y-3">
              {registeredTeams.map((team) => (
                <li key={team._id} className="border-b border-white/10 pb-2">
                  <span className="font-bold text-white">{team.teamName}</span> –{" "}
                  <span className="text-gray-300">{team.category}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default SIHregistration;
