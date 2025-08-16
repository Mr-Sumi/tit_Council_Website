import React from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaInstagram,
  FaGithub,
  FaUsers,
  FaLightbulb,
  FaHandsHelping,
  FaUserPlus,
  FaArrowRight
} from "react-icons/fa";
import { RiMailLine } from "react-icons/ri";
import { Users, Compass } from "lucide-react"; 
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

import councilData from "../data/Council-data.json";
import assets from "../data/assets.json";



export default function Home() {
  const features = [
    {
      icon: <FaUsers />,
      label: "Leadership",
      color: "from-indigo-400 to-indigo-600",
      delay: 0.2,
    },
    {
      icon: <FaLightbulb />,
      label: "Innovation",
      color: "from-yellow-400 to-yellow-600",
      delay: 0.4,
    },
    {
      icon: <FaHandsHelping />,
      label: "Community",
      color: "from-green-400 to-green-600",
      delay: 0.6,
    },
  ];

  return (
    <main className="font-sans text-white bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen w-full overflow-hidden font-sans">
      {/* Background Video */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover"
      >
        <source src={assets.videos.homeHero} type="video/mp4" />
      </video>

      {/* Dark Overlay + Gradient */}
      <div className="absolute inset-0 bg-black/70"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/30 to-black/90"></div>

      {/* Floating Glow Orbs */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(4)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-72 h-72 rounded-full bg-gradient-to-r from-indigo-500/20 to-purple-500/20 blur-3xl"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
            }}
            animate={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              repeatType: "mirror",
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Glass Card */}
      <div className="relative z-10 flex flex-col justify-center items-center h-full text-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="backdrop-blur-2xl bg-white/10 p-12 rounded-3xl shadow-[0_8px_40px_rgba(0,0,0,0.3)] border border-white/20 max-w-4xl"
        >
          {/* Smart Gradient Title */}
          <motion.h1
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 1 }}
            className="text-5xl md:text-7xl font-extrabold tracking-tight bg-gradient-to-r from-indigo-200 via-white to-indigo-400 bg-clip-text text-transparent flex items-center justify-center gap-3"
          >
            STUDENT COUNCIL
          </motion.h1>

          {/* Smart Subtitle */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 1 }}
            className="text-lg md:text-2xl mt-4 text-gray-200 font-medium tracking-wide"
          >
            Empowering <span className="text-indigo-400 font-semibold">Students</span> • Building{" "}
            <span className="text-indigo-400 font-semibold">Leaders</span>
          </motion.h2>

          {/* Animated Buttons */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
            className="mt-10 flex flex-wrap gap-6 justify-center"
          >
            <motion.a
              href="/clubs"
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 px-8 py-3 rounded-full bg-indigo-500 hover:bg-indigo-600 text-white font-medium shadow-lg transition-all duration-300 hover:shadow-indigo-500/40"
            >
              <Compass className="w-5 h-5" /> Explore Clubs
            </motion.a>

            <motion.a
              href="/team"
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 px-8 py-3 rounded-full bg-white/20 hover:bg-white/30 text-white font-medium shadow-lg transition-all duration-300 hover:shadow-white/40"
            >
              <Users className="w-5 h-5" /> Meet Our Team
            </motion.a>
          </motion.div>
        </motion.div>
      </div>
    </section>


      {/* About Section */}
      <section className="py-24 bg-transparent relative overflow-hidden">
  <div className="max-w-6xl mx-auto px-6 text-center relative z-10">
    {/* Heading */}
    <motion.h2
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="text-5xl font-extrabold bg-gradient-to-r from-indigo-200 to-white bg-clip-text text-transparent mb-6"
    >
      About Us
    </motion.h2>

    {/* Description */}
    <motion.p
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ delay: 0.3, duration: 0.8 }}
      viewport={{ once: true }}
      className="text-gray-300 max-w-3xl mx-auto leading-relaxed text-lg"
    >
      The Student Council fosters a dynamic, inclusive, and innovative campus environment. 
      Acting as the bridge between students and the administration, we empower leadership, 
      drive collaboration, and promote cultural diversity.
    </motion.p>

    {/* Features Grid */}
    <div className="grid sm:grid-cols-3 gap-10 mt-16">
      {features.map((item, idx) => (
        <motion.div
          key={idx}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          whileHover={{ scale: 1.08, rotate: 1 }}
          viewport={{ once: true }}
          transition={{ delay: item.delay, duration: 0.8 }}
          className="relative p-8 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-lg group overflow-hidden"
        >
          {/* Glow background */}
          <div
            className={`absolute inset-0 opacity-30 group-hover:opacity-60 transition duration-500 bg-gradient-to-br ${item.color} blur-2xl`}
          ></div>

          {/* Icon */}
          <motion.div
            whileHover={{ scale: 1.25, rotate: 10 }}
            className="relative z-10 text-6xl text-white mb-6 flex justify-center group-hover:bg-gradient-to-r group-hover:from-[#C8101A] group-hover:via-[#FF4F01] group-hover:to-[#FFF9D5] group-hover:bg-clip-text group-hover:text-transparent transition duration-500"
          >
            {item.icon}
          </motion.div>

          {/* Label */}
          <h3 className="relative z-10 font-bold text-xl text-white tracking-wide group-hover:bg-gradient-to-r group-hover:from-[#C8101A] group-hover:via-[#FF4F01] group-hover:to-[#FFF9D5] group-hover:bg-clip-text group-hover:text-transparent transition duration-500">
            {item.label}
          </h3>
        </motion.div>
      ))}
    </div>
  </div>

  {/* Decorative gradient orbs */}
  <div className="absolute -top-20 -left-20 w-72 h-72 bg-indigo-500/30 rounded-full blur-3xl animate-pulse"></div>
  <div className="absolute -bottom-32 -right-20 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl animate-pulse"></div>
  <div className="absolute top-1/2 left-1/2 w-[600px] h-[600px] -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-[#C8101A]/10 via-[#FF4F01]/10 to-[#FFF9D5]/10 rounded-full blur-[120px] opacity-30 animate-pulse"></div>
</section>


      {/* Leadership Section */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-12">Meet the Council</h2>
          <div className="grid md:grid-cols-3 gap-12">
            {councilData.LEADERS.map((member, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.2 }}
                className="p-6 rounded-2xl bg-white/10 backdrop-blur-lg border border-white/20 shadow-xl hover:shadow-2xl transition"
              >
                <img
                  src={member.img}
                  alt={member.name}
                  className={`w-48 h-48 mx-auto mt-3 object-cover rounded-2xl shadow-md border border-white/20 ${
                    member.role.includes("President") ? "scale-110" : ""
                  }`}
                />
                <h3 className="text-lg text-gray-300 mt-6">{member.role}</h3>
                <h2 className="text-2xl font-bold mt-1">{member.name}</h2>
                <div className="flex gap-4 justify-center text-gray-300 mt-4 text-lg">
                  {member.socials.linkedin && (
                    <a href={member.socials.linkedin} target="_blank" rel="noreferrer">
                      <FaLinkedinIn />
                    </a>
                  )}
                  {member.socials.instagram && (
                    <a href={member.socials.instagram} target="_blank" rel="noreferrer">
                      <FaInstagram />
                    </a>
                  )}
                  {member.socials.email && (
                    <a href={`mailto:${member.socials.email}`}>
                      <RiMailLine />
                    </a>
                  )}
                  {member.socials.twitter && (
                    <a href={member.socials.twitter} target="_blank" rel="noreferrer">
                      <FaTwitter />
                    </a>
                  )}
                  {member.socials.facebook && (
                    <a href={member.socials.facebook} target="_blank" rel="noreferrer">
                      <FaFacebookF />
                    </a>
                  )}
                  {member.socials.github && (
                    <a href={member.socials.github} target="_blank" rel="noreferrer">
                      <FaGithub />
                    </a>
                  )}
                </div>
                <p className="mt-6 text-gray-300 italic leading-relaxed text-sm">
                  "{member.msg}"
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Clubs Section */}

      <section
      id="clubs"
      className="featured-clubs py-16 bg-gradient-to-b from-gray-900 to-black text-white"
    >
      <div className="container mx-auto px-6 max-w-6xl text-center">
        {/* Intro Section */}
        <div className="clubs-intro mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 relative inline-block after:content-[''] after:absolute after:w-16 after:h-[3px] after:bg-gradient-to-r after:from-orange-500 after:to-pink-500 after:bottom-[-8px] after:left-1/2 after:-translate-x-1/2">
            Explore Our Clubs
          </h2>
          <p className="mt-6 text-gray-300 max-w-3xl mx-auto text-lg leading-relaxed">
            Discover communities that share your passion and help you grow. Our
            clubs offer unique opportunities to develop skills, lead initiatives,
            and create lasting connections.
          </p>
        </div>

        {/* Call To Action */}
        <div className="clubs-cta bg-gray-800/50 p-8 md:p-12 rounded-2xl shadow-lg hover:shadow-orange-500/20 transition-shadow duration-300">
          <h3 className="text-2xl md:text-3xl font-semibold mb-4">
            Ready to Find Your Perfect Club?
          </h3>
          <p className="text-gray-300 mb-6">
            Explore all our clubs and find the perfect fit for your interests
            and aspirations.
          </p>
          <Link
            to="/clubs"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-pink-500 text-white font-medium px-6 py-3 rounded-full shadow-md hover:scale-105 transition-transform duration-300"
          >
            <span>View All Clubs</span>
            <FaArrowRight />
          </Link>
        </div>
      </div>
    </section>

      {/* Upcoming Events */}
      <section className="py-20 bg-transparent">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-4xl font-bold mb-12 text-center">
            Upcoming Events
          </h2>
          <div className="grid md:grid-cols-2 gap-10">
            {[
              {
                title: "Saffron Sundown",
                date: "April 15, 2025",
                desc: "Join us for an electrifying tech fest...",
                link: "/eventPage",
              },
              {
                title: "Hackathon 2025",
                date: "May 5, 2025",
                desc: "Showcase your coding skills...",
                link: "/eventPage",
              },
            ].map((event, idx) => (
              <motion.div
                key={idx}
                whileHover={{ scale: 1.03 }}
                className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl shadow p-6 hover:shadow-2xl transition"
              >
                <h3 className="text-xl font-semibold">{event.title}</h3>
                <p className="text-gray-300">{event.date}</p>
                <p className="mt-2 text-gray-200">{event.desc}</p>
                <a
                  href={event.link}
                  className="inline-block mt-4 text-indigo-300 hover:underline"
                >
                  Learn More
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Get Involved */}
      <section className="py-20 bg-transparent">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-12">
            Get Involved
          </h2>
          <div className="grid md:grid-cols-3 gap-8 text-center">
            {[
              {
                icon: <FaUserPlus className="text-indigo-400" />,
                title: "Join the Council",
                desc: "Interested in leadership roles? Apply now!",
                link: "/join",
              },
              {
                icon: <FaLightbulb className="text-yellow-400" />,
                title: "Submit Your Ideas",
                desc: "Have an idea for an event or initiative? Let us know!",
              },
              {
                icon: <FaHandsHelping className="text-green-400" />,
                title: "Volunteer for Events",
                desc: "Support the council by helping organize activities.",
              },
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
