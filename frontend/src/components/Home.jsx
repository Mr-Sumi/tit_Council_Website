import React from "react";
import {
  FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram, FaGithub,
  FaUsers, FaLightbulb, FaHandsHelping, FaArrowRight, FaUserPlus
} from "react-icons/fa";
import { RiMailLine } from "react-icons/ri";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <main className="font-sans text-white">
      {/* Hero Section */}
      <section className="relative h-screen w-full overflow-hidden">
        <video
          autoPlay muted loop playsInline
          className="absolute top-0 left-0 w-full h-full object-cover"
        >
          <source src="https://res.cloudinary.com/dlk5kntmy/video/upload/home_page_video_gfsiig.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/70"></div>

        {/* Glass Card */}
        <div className="relative z-10 flex flex-col justify-center items-center h-full text-center px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="backdrop-blur-md bg-white/10 p-8 rounded-3xl shadow-2xl border border-white/20"
          >
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-wide drop-shadow-lg">
              STUDENT COUNCIL
            </h1>
            <h2 className="text-2xl md:text-4xl mt-3 text-indigo-300">
              WELCOMES YOU
            </h2>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-transparent">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-4xl font-bold mb-6"
          >
            About Us
          </motion.h2>
          <p className="text-gray-300 max-w-3xl mx-auto leading-relaxed">
            The Student Council fosters a dynamic, inclusive, and innovative campus environment. Acting as the bridge between students and the administration, we empower leadership, drive collaboration, and promote cultural diversity.
          </p>
          <div className="grid sm:grid-cols-3 gap-10 mt-12">
            {[
              { icon: <FaUsers />, label: "Leadership", color: "text-indigo-400" },
              { icon: <FaLightbulb />, label: "Innovation", color: "text-yellow-400" },
              { icon: <FaHandsHelping />, label: "Community", color: "text-green-400" }
            ].map((item, idx) => (
              <motion.div
                key={idx}
                whileHover={{ scale: 1.05 }}
                className="p-6 rounded-xl bg-white/10 backdrop-blur-lg border border-white/20 shadow-lg"
              >
                <div className={`${item.color} text-5xl mb-4 mx-auto`}>{item.icon}</div>
                <h3 className="font-semibold text-lg">{item.label}</h3>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* President Section */}
      <section className="py-20 bg-transparent">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-12 items-center px-6">
          <motion.img
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            src="https://res.cloudinary.com/dlk5kntmy/image/upload/v1743659746/Prabhat_kumar_h7yvpf.jpg"
            alt="Prabhat Kumar - President"
            className="w-72 h-72 object-cover rounded-2xl shadow-lg border border-white/20"
          />
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-lg text-gray-300">Council President</h2>
            <h3 className="text-3xl font-bold mt-1">Prabhat Kumar</h3>
            <div className="flex gap-4 text-gray-300 mt-4 text-lg">
              <FaLinkedinIn /> <FaInstagram /> <RiMailLine /> <FaTwitter /> <FaFacebookF /> <FaGithub />
            </div>
            <p className="mt-6 text-gray-300 italic leading-relaxed">
              "I warmly welcome you as we begin another promising year of dedication and service..."
            </p>
          </motion.div>
        </div>
      </section>

      {/* Glass Cards for Events */}
      <section className="py-20 bg-transparent">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-4xl font-bold mb-12 text-center">Upcoming Events</h2>
          <div className="grid md:grid-cols-2 gap-10">
            {[
              { title: "Saffron Sundown", date: "April 15, 2025", desc: "Join us for an electrifying tech fest...", link: "/eventPage" },
              { title: "Hackathon 2025", date: "May 5, 2025", desc: "Showcase your coding skills...", link: "/eventPage" }
            ].map((event, idx) => (
              <motion.div
                key={idx}
                whileHover={{ scale: 1.03 }}
                className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl shadow p-6 hover:shadow-2xl transition"
              >
                <h3 className="text-xl font-semibold">{event.title}</h3>
                <p className="text-gray-300">{event.date}</p>
                <p className="mt-2 text-gray-200">{event.desc}</p>
                <a href={event.link} className="inline-block mt-4 text-indigo-300 hover:underline">Learn More</a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Get Involved */}
      <section className="py-20 bg-transparent">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-12">Get Involved</h2>
          <div className="grid md:grid-cols-3 gap-8 text-center">
            {[
              { icon: <FaUserPlus className="text-indigo-400" />, title: "Join the Council", desc: "Interested in leadership roles? Apply now!", link: "/join" },
              { icon: <FaLightbulb className="text-yellow-400" />, title: "Submit Your Ideas", desc: "Have an idea for an event or initiative? Let us know!" },
              { icon: <FaHandsHelping className="text-green-400" />, title: "Volunteer for Events", desc: "Support the council by helping organize activities." }
            ].map((item, idx) => (
              <motion.a
                key={idx}
                whileHover={{ scale: 1.05 }}
                href={item.link || "#"}
                className="p-8 border border-white/20 rounded-xl bg-white/10 backdrop-blur-lg shadow hover:shadow-xl transition flex flex-col items-center"
              >
                <div className="text-5xl mb-4">{item.icon}</div>
                <h3 className="font-semibold text-lg">{item.title}</h3>
                <p className="text-gray-200 mt-2">{item.desc}</p>
              </motion.a>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
