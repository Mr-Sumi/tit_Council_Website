import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaArrowRight } from "react-icons/fa";
import clubsJson from "../../data/Clubs.json";

export default function ClubsSection() {
  return (
    <section
      id="clubs"
      className="featured-clubs py-16 text-white relative overflow-hidden"
    >
      <div className="container mx-auto px-6 text-center relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="clubs-intro mb-12"
        >
          <h2
            className="text-5xl font-extrabold"
          >
            Explore Our Clubs
          </h2>
          <p className="mt-6 text-gray-300 mx-auto text-md md:text-xl leading-relaxed">
          Join vibrant communities that ignite your passions and fuel your growth. Our clubs give you the chance to master new skills, lead exciting projects, and connect with like-minded peers. Explore opportunities that inspire creativity, collaboration, and leadership, while building memories and friendships that last a lifetime.
          </p>
        </motion.div>

      {/* Clubs Row wrapped in Link */}
        <Link
          to="/clubs"
          className="relative block group"
        >
          {/* Scrollable Clubs */}
          <div className="overflow-hidden relative border-2 rounded-3xl">
            <div className="flex gap-6 py-6 animate-scroll whitespace-nowrap">
              {clubsJson.clubsData.concat(clubsJson.clubsData).map((club, index) => (
                <div
                  key={index}
                  className="club-card inline-block w-48 md:w-52 lg:w-56 rounded-xl overflow-hidden cursor-pointer flex-shrink-0"
                >
                  <img
                    src={club.img}
                    alt={club.name}
                    className="w-full h-48 md:h-52 lg:h-56 object-cover"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Overlay */}
          <div className="absolute inset-0 flex items-center justify-center bg-black/90 opacity-0 group-hover:opacity-100 transition-opacity duration-400 z-20 pointer-events-none rounded-3xl">
            <div className="text-center pointer-events-auto">
              <h3 className="text-2xl md:text-3xl font-semibold mb-4 text-white">
                Ready to Find Your Perfect Club?
              </h3>
              <p className="text-gray-300 mb-6">
                Explore all our clubs and find the perfect fit for your interests and aspirations.
              </p>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <span className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-pink-500 text-white font-medium px-6 py-3 rounded-full shadow-md hover:shadow-lg transition-all duration-300">
                  View All Clubs <FaArrowRight />
                </span>
              </motion.div>
            </div>
          </div>
        </Link>

      </div>
    </section>
  );
}
