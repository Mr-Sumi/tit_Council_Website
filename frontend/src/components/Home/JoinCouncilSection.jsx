import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useRef } from "react";

export default function JoinCouncilSection() {
  const videoRef = useRef(null);

  const handleMouseEnter = () => {
    if (videoRef.current) {
      videoRef.current.play();
      videoRef.current.style.filter = "brightness(1.1) contrast(1.05)";
      videoRef.current.style.transition = "filter 0.5s ease, transform 0.5s ease";
    }
  };

  const handleMouseLeave = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.style.filter = "brightness(1) contrast(1)";
      videoRef.current.style.transform = "scale(1)";
    }
  };

  return (
    <section className="flex flex-wrap items-center justify-center text-white py-16 px-6">
      {/* Video Side */}
      <motion.div
        className="w-1/8 mb-8"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
      >
        <video
          ref={videoRef}
          src="https://res.cloudinary.com/dlk5kntmy/video/upload/v1755428052/STU_FINAL_eululp.mp4"
          className="w-full h-auto rounded-2xl shadow-2xl cursor-pointer"
          loop
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        />
      </motion.div>

      {/* Info and CTA Side */}
      <motion.div
        className="w-full lg:w-1/2 flex flex-col justify-center"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-4xl md:text-5xl font-extrabold mb-4 bg-gradient-to-r from-indigo-400 via-purple-300 to-pink-500 bg-clip-text text-transparent">
          Join Council Now
        </h2>
        <p className="text-lg text-gray-300 mb-6">
          Become a part of the driving force behind our campus culture and leadership!
        </p>
        <ul className="space-y-3 text-gray-200 mb-6">
          <li>
            <span className="font-semibold">Council Overview:</span> We connect, empower, and lead student initiatives across technology, culture, and community.
          </li>
          <li>
            <span className="font-semibold">Clubs Featured:</span> 10+ vibrant student-led clubs covering coding, creative arts, social outreach, and more.
          </li>
          <li>
            <span className="font-semibold">Get Involved:</span> Bring your ideas to life, collaborate across domains, and make an impact.
          </li>
        </ul>
        <Link
          to="/joincouncil"
          className="inline-block bg-gradient-to-r from-pink-500 to-indigo-500 px-8 py-3 font-semibold rounded-full shadow-lg hover:scale-105 transition-transform"
        >
          Join the Council
        </Link>
      </motion.div>
    </section>
  );
}
