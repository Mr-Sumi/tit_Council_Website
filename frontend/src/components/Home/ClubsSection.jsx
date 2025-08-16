import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import { motion } from "framer-motion";

export default function ClubsSection() {
  return (
    <section id="clubs" className="featured-clubs py-16 bg-gradient-to-b from-gray-900 to-black text-white relative overflow-hidden">

      <div className="container mx-auto px-6 max-w-6xl text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="clubs-intro mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 relative inline-block 
              after:content-[''] after:absolute after:w-16 after:h-[3px] 
              after:bg-gradient-to-r after:from-orange-500 after:to-pink-500 
              after:bottom-[-8px] after:left-1/2 after:-translate-x-1/2">
            Explore Our Clubs
          </h2>
          <p className="mt-6 text-gray-300 max-w-3xl mx-auto text-lg leading-relaxed">
            Discover communities that share your passion and help you grow. Our clubs offer unique opportunities to develop skills, lead initiatives, and create lasting connections.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="clubs-cta bg-gray-800/50 p-8 md:p-12 rounded-2xl shadow-lg hover:shadow-orange-500/40 transition-shadow duration-300 transform hover:-translate-y-1"
        >
          <h3 className="text-2xl md:text-3xl font-semibold mb-4">
            Ready to Find Your Perfect Club?
          </h3>
          <p className="text-gray-300 mb-6">
            Explore all our clubs and find the perfect fit for your interests and aspirations.
          </p>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link
              to="/clubs"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-pink-500 text-white font-medium px-6 py-3 rounded-full shadow-md hover:shadow-lg transition-all duration-300"
            >
              <span>View All Clubs</span>
              <FaArrowRight />
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
