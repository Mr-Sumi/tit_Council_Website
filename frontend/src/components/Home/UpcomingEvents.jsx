import React from "react";
import { motion } from "framer-motion";

const events = [
  {
    title: "Code Clash 💻",
    date: "To be Announced",
    desc: "Join our ultimate coding competition and showcase your skills.",
    link: "#",
  },
  {
    title: "Cultural Fest 🎉",
    date: "To be Announced",
    desc: "Celebrate art, music, and culture with the entire campus community.",
    link: "#",
  },
];

export default function UpcomingEvents() {
  return (
    <section className="py-5 relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 text-center">
        {/* Header */}
        <motion.h2
          className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mb-8"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          Upcoming Events
        </motion.h2>

        {/* Events Grid */}
        <div className="grid md:grid-cols-2 gap-12">
          {events.map((event, idx) => (
            <motion.div
              key={idx}
             
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.2 }}
              className="relative p-8 rounded-3xl shadow-2xl cursor-pointer overflow-hidden group"
            >
              {/* Animated Gradient Background */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-lg shadow-lg hover:shadow-2xl transition"></div>

              {/* Card Content */}
              <div className="relative z-10 text-left">
                <span className="text-sm text-white/70 uppercase tracking-wider">{event.date}</span>
                <h3 className="text-2xl md:text-3xl font-bold text-white mt-2 mb-4">
                  {event.title}
                </h3>
                <p className="text-gray-300 mb-6">{event.desc}</p>
                <a
                  href={event.link}
                  className="inline-block px-6 py-3 rounded-full bg-gradient-to-r from-indigo-400 via-pink-500 to-yellow-400 text-white font-semibold shadow-lg "
                >
                  Learn More
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
