import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function ErrorPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-black text-white px-4">
      <div className="text-center">
        {/* Animated 404 GIF */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative"
        >
          <img
            src="https://cdn.dribbble.com/users/285475/screenshots/2083086/dribbble_1.gif"
            alt="404 error"
            className="w-[35vw] max-w-md mx-auto rounded-xl shadow-lg"
          />
          <h1 className="flex items-center justify-center text-6xl md:text-8xl font-extrabold text-white drop-shadow-lg">
            404
          </h1>
          <p className="text-center">Not Found</p>
        </motion.div>

        {/* Text */}
        <motion.h2
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.7 }}
          className="mt-6 text-2xl md:text-3xl font-bold"
        >
          Oops! Looks like you're lost
        </motion.h2>

        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.7 }}
          className="mt-2 text-gray-400"
        >
          The page you are looking for is not available.
        </motion.p>

        {/* Button */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.7 }}
          className="mt-6"
        >
          <Link
            to="/"
            className="px-6 py-3 bg-white/70 hover:bg-white rounded-full font-semibold text-black shadow-lg hover:scale-105 transition-transform"
          >
            Go Back Home
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
