import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Target, Eye, Instagram, ArrowLeft } from "lucide-react";
import ErrorPage from "../components/Error";

export default function ClubDetails() {
  const { clubName } = useParams();
  const [clubsData, setClubsData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch JSON with caching
  useEffect(() => {
    // Fetch JSON with caching
    const cachedData = localStorage.getItem("clubsData");
  
    if (cachedData) {
      setClubsData(JSON.parse(cachedData));
      setLoading(false);
    } else {
      import("../data/ClubBearerDetails.json")
        .then((data) => {
          const normalized = data.default || data;
          localStorage.setItem("clubsData", JSON.stringify(normalized));
          setClubsData(normalized);
        })
        .catch((err) => {
          console.error("Failed to load JSON:", err);
          setClubsData(null);
        })
        .finally(() => setLoading(false));
    }
  
    // ✅ Clear specific cache when exiting page
    const handleUnload = () => {
      localStorage.removeItem("clubsData"); // clears only clubsData
      localStorage.clear(); // (optional) clears everything
    };
  
    window.addEventListener("beforeunload", handleUnload);
  
    return () => {
      window.removeEventListener("beforeunload", handleUnload);
    };
  }, []);
  

  if (loading) {
    return (
      <main className="p-6 md:p-12 max-w-6xl mx-auto text-white mt-10">
        <div className="animate-pulse space-y-6">
          <div className="h-10 w-40 bg-white/20 rounded-lg"></div>
          <div className="h-24 w-24 bg-white/20 rounded-full"></div>
          <div className="h-6 w-3/4 bg-white/20 rounded-lg"></div>
          <div className="h-6 w-2/3 bg-white/20 rounded-lg"></div>
        </div>
      </main>
    );
  }

  if (!clubsData) return <ErrorPage />;

  // Find club by slug-like match
  const club = clubsData.clubs.find(
    (c) => c.name.toLowerCase().includes(clubName.toLowerCase())
  );

  if (!club) return <ErrorPage />;

  return (
    <main className="p-6 md:p-12 max-w-6xl mx-auto text-white mt-5">
      {/* Back Button */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-8"
      >
        <Link
          to="/clubs"
          className="inline-flex items-center gap-2 py-2 font-semibold"
        >
          <ArrowLeft size={18} />
          Back to Clubs
        </Link>
      </motion.div>

      {/* Logo & Name */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7 }}
        className="flex flex-col md:flex-row items-center gap-8 mb-12"
      >
        <img
          src={club.club_logo}
          alt={club.name}
          className="h-45 w-45 rounded-2xl shadow-xl ring-4 ring-indigo-500/30 hover:ring-white/30 transition-all duration-300"
        />
        <div className="flex flex-col items-center md:items-start gap-2 text-center md:text-left">
          <h1 className="text-3xl md:text-6xl font-extrabold mb-3 text-white uppercase italic">
            {club.name}
          </h1>
          <div className="w-[30vw] h-1 bg-gradient-to-r from-indigo-400 to-pink-400 rounded-full"></div>
        </div>
      </motion.div>

      {/* Club Discription */}

      <motion.section
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="grid gap-8 md:gap-10 mb-12 md:mb-16"
      >
        <motion.div
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 200 }}
          className="relative bg-gradient-to-br from-gray-900/60 to-gray-800/60 backdrop-blur-md 
                    p-5 sm:p-6 md:p-8 lg:p-10 
                    rounded-xl sm:rounded-2xl 
                    shadow-lg md:shadow-xl 
                    border border-gray-700/70 overflow-hidden"
        >
          {/* Decorative Glow */}
          <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/10 via-blue-500/5 to-transparent rounded-2xl pointer-events-none" />

          {/* Header with accent line */}
          <div className="flex items-center gap-3 mb-3 sm:mb-4">
            <span className="h-1 w-6 sm:w-8 rounded-full bg-purple-500" />
            <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-white tracking-tight">
              About the Club
            </h2>
          </div>

          {/* Content */}
          <p className="text-gray-300 leading-relaxed text-base sm:text-lg md:text-xl lg:text-[1.35rem] relative z-10">
            {club.description}
          </p>
        </motion.div>
      </motion.section>


      {/* Mission & Vision */}
      <section className="grid md:grid-cols-2 gap-10 mb-16">
        {[
          {
            title: "Mission",
            icon: <Target className="text-pink-400" size={24} />,
            text: club.mission,
          },
          {
            title: "Vision",
            icon: <Eye className="text-yellow-400" size={24} />,
            text: club.vision,
          },
        ].map((item, i) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: i * 0.2 }}
            className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-lg p-8 rounded-3xl shadow-xl border border-white/20 hover:shadow-2xl hover:scale-[1.02] transition-all"
          >
            <div className="flex items-center gap-3 mb-4">
              {item.icon}
              <h2 className="text-2xl font-semibold">{item.title}</h2>
            </div>
            <p className="text-gray-300 leading-relaxed">{item.text}</p>
          </motion.div>
        ))}
      </section>

      {/* Office Bearers */}
      <motion.h2
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="flex items-center justify-center gap-2 text-5xl font-bold text-center mb-8 bg-gradient-to-r from-indigo-400 to-pink-400 bg-clip-text text-transparent italic"
      >
        Club Bearers
      </motion.h2>

      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-10 mb-14">
        {["coordinator", "secretary", "assistant_secretary"].map((role, i) => {
          const person = club[role];
          if (!person?.name?.trim()) return null;
          return (
            <motion.div
              key={role}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.2 }}
              className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl p-8 rounded-2xl text-center shadow-lg border border-white/20 hover:scale-105 hover:shadow-2xl transition-all"
            >
              <img
                src={person.photo_src}
                alt={person.name}
                className="h-40 w-40 rounded-full mx-auto shadow-md border-4 border-indigo-500/40 hover:border-pink-400 transition-all"
              />
              <h3 className="mt-4 font-bold text-lg text-white">
                {person.name}
              </h3>
              <p className="text-sm text-gray-400 capitalize tracking-wide">
                {role.replace("_", " ")}
              </p>
            </motion.div>
          );
        })}
      </div>

      {/* Instagram Link */}
      {club.instagram_url && (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="mt-12 text-center"
        >
          <a
            href={club.instagram_url}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-3 px-10 py-4 rounded-full font-bold text-lg shadow-lg bg-gradient-to-r from-pink-400 to-indigo-500 text-white hover:scale-105 hover:shadow-2xl transition-all duration-300"
          >
            <Instagram size={25} /> Follow on Instagram
          </a>
        </motion.div>
      )}
    </main>
  );
}
