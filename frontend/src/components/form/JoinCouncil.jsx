import { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";

export default function JoinCouncil() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    department: "",
    year: "",
    motivation: "",
  });

  const formRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted:", formData);
    alert("Thank you for applying! We will reach out to you soon.");
    setFormData({
      name: "",
      email: "",
      department: "",
      year: "",
      motivation: "",
    });
  };

  // Optional: Fade-in animation for the form
  useEffect(() => {
    if (formRef.current) {
      gsap.fromTo(
        formRef.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
      );
    }
  }, []);

  return (
    <section className="py-20 bg-gray-900 min-h-screen flex items-center justify-center relative">
      {/* Form Container */}
      <div
        ref={formRef}
        className="relative max-w-xl w-full rounded-2xl shadow-lg backdrop-blur-md overflow-hidden"
        style={{
          backgroundImage:
            "url('https://res.cloudinary.com/dlk5kntmy/image/upload/v1747502420/Student_council_vjzt0j.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundColor: "rgba(0,0,0,0.4)", // 40% transparent overlay
        }}
      >
        <div className="bg-gray-800/70 p-10">
          <h2 className="text-3xl font-bold text-center text-white mb-8">
            Join the Student Council
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-gray-300 mb-1">Full Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Enter your full name"
                className="w-full px-4 py-2 rounded-lg bg-gray-700/70 text-white focus:ring-2 focus:ring-indigo-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-gray-300 mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="Enter your email"
                className="w-full px-4 py-2 rounded-lg bg-gray-700/70 text-white focus:ring-2 focus:ring-indigo-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-gray-300 mb-1">Department</label>
              <input
                type="text"
                name="department"
                value={formData.department}
                onChange={handleChange}
                required
                placeholder="Your department"
                className="w-full px-4 py-2 rounded-lg bg-gray-700/70 text-white focus:ring-2 focus:ring-indigo-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-gray-300 mb-1">Year</label>
              <input
                type="text"
                name="year"
                value={formData.year}
                onChange={handleChange}
                required
                placeholder="e.g. 1st, 2nd, 3rd"
                className="w-full px-4 py-2 rounded-lg bg-gray-700/70 text-white focus:ring-2 focus:ring-indigo-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-gray-300 mb-1">Why do you want to join?</label>
              <textarea
                name="motivation"
                value={formData.motivation}
                onChange={handleChange}
                required
                rows="4"
                placeholder="Write a short motivation"
                className="w-full px-4 py-2 rounded-lg bg-gray-700/70 text-white focus:ring-2 focus:ring-indigo-500 outline-none"
              />
            </div>
            <button
              type="submit"
              className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 rounded-lg text-white font-semibold transition-colors"
            >
              Submit Application
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
