import { motion } from "framer-motion";

const events = [
  { title: "Saffron Sundown", date: "April 15, 2025", desc: "Join us for an electrifying tech fest...", link: "/eventPage" },
  { title: "Hackathon 2025", date: "May 5, 2025", desc: "Showcase your coding skills...", link: "/eventPage" },
];

export default function UpcomingEvents() {
  return (
    <section className="py-20 bg-transparent">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-4xl font-bold mb-12 text-center">Upcoming Events</h2>
        <div className="grid md:grid-cols-2 gap-10">
          {events.map((event, idx) => (
            <motion.div
              key={idx}
              whileHover={{ scale: 1.03 }}
              className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl shadow p-6 hover:shadow-2xl transition"
            >
              <h3 className="text-xl font-semibold">{event.title}</h3>
              <p className="text-gray-300">{event.date}</p>
              <p className="mt-2 text-gray-200">{event.desc}</p>
              <a href={event.link} className="inline-block mt-4 text-indigo-300 hover:underline">
                Learn More
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
