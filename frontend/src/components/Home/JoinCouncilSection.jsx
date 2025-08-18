import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useRef, useEffect } from "react";
import { FaUsers, FaLightbulb, FaStar } from "react-icons/fa";

export default function JoinCouncilSection() {
  const videoRef = useRef(null);

  const handleMouseEnter = () => {
    if (videoRef.current) {
      videoRef.current.play();
      videoRef.current.style.filter = "brightness(1.15) contrast(1.1)";
      videoRef.current.style.transform = "scale(1.05)";
      videoRef.current.style.transition =
        "filter 0.6s ease, transform 0.6s ease";
    }
  };

  const handleMouseLeave = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.style.filter = "brightness(1) contrast(1)";
      videoRef.current.style.transform = "scale(1)";
    }
  };

  // Auto-play when in viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (videoRef.current) {
          if (entry.isIntersecting) videoRef.current.play();
          else videoRef.current.pause();
        }
      },
      { threshold: 0.5 }
    );

    if (videoRef.current) observer.observe(videoRef.current);
    return () => {
      if (videoRef.current) observer.unobserve(videoRef.current);
    };
  }, []);

  return (
    <section className="relative py-20 px-6 text-white overflow-hidden">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Video Side */}
        <motion.div
          className="relative w-full group"
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <video
            ref={videoRef}
            src="https://res.cloudinary.com/dlk5kntmy/video/upload/v1755428052/STU_FINAL_eululp.mp4"
            className="w-full h-[60vh] object-cover rounded-3xl shadow-2xl cursor-pointer"
            loop
            muted
            playsInline
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          />

          {/* Dark overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent rounded-3xl pointer-events-none"></div>

          {/* Overlay Text */}
          <div className="absolute bottom-8 left-6 sm:left-10 text-white space-y-3">
            <h3 className="text-2xl sm:text-3xl font-extrabold">
              🚀 Your Leadership Journey Starts Here
            </h3>
            <p className="max-w-md text-gray-200 text-sm sm:text-base">
              Join the Council today and shape the future of our campus culture!
            </p>
            <Link
              to="/join"
              className="inline-block bg-gradient-to-r from-pink-500 to-indigo-500 px-6 py-2 sm:px-8 sm:py-3 font-semibold rounded-full shadow-lg hover:scale-110 hover:shadow-pink-500/40 transition-transform duration-300"
            >
              Join Now
            </Link>
          </div>
        </motion.div>

        {/* Info and CTA Side */}
        <motion.div
          className="flex flex-col justify-center"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl font-extrabold mb-6 bg-gradient-to-r from-indigo-400 via-purple-300 to-pink-500 bg-clip-text text-transparent leading-tight">
            Why Join the Council?
          </h2>
          <ul className="space-y-5 text-gray-200 mb-8">
            <li className="flex items-start gap-3">
              <FaUsers className="text-pink-400 mt-1" />
              <span>
                <span className="font-semibold">Council Overview:</span> We
                connect, empower, and lead student initiatives across
                technology, culture, and community.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <FaStar className="text-indigo-400 mt-1" />
              <span>
                <span className="font-semibold">Clubs Featured:</span> 10+
                vibrant student-led clubs covering coding, creative arts, social
                outreach, and more.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <FaLightbulb className="text-yellow-400 mt-1" />
              <span>
                <span className="font-semibold">Get Involved:</span> Bring your
                ideas to life, collaborate across domains, and make an impact.
              </span>
            </li>
          </ul>
          <Link
            to="/join"
            className="inline-block bg-gradient-to-r from-pink-500 to-indigo-500 px-8 py-3 font-semibold rounded-full shadow-lg hover:scale-105 hover:shadow-indigo-500/40 transition-transform duration-300"
          >
            🌟 Unlock Your Potential — Join the Council Today
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
