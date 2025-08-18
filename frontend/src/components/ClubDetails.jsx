import React from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import {
  Target,
  Eye,
  Users,
  Instagram,
  ArrowLeft,
} from "lucide-react";
import ErrorPage from "../components/Error";

export default function ClubDetails() {
  const { clubName } = useParams();
  const [clubsData, setClubsData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch JSON with caching
  useEffect(() => {
    const cachedData = localStorage.getItem("clubsData");

    if (cachedData) {
      setClubsData(JSON.parse(cachedData));
      setLoading(false);
    } else {
      import("../data/ClubBearerDetails.json")
        .then((data) => {
          localStorage.setItem("clubsData", JSON.stringify(data));
          setClubsData(data);
        })
        .catch((err) => console.error("Failed to load JSON:", err))
        .finally(() => setLoading(false));
    }
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

  // find by matching lowercase/slug
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
          className="inline-flex items-center gap-2 px-6 py-2 rounded-full font-semibold shadow-md bg-gradient-to-r from-indigo-500 to-pink-500 hover:from-pink-500 hover:to-indigo-500 transition-all duration-300"
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
          className="h-32 w-32 rounded-2xl shadow-xl ring-4 ring-indigo-500/30 hover:ring-pink-400 transition-all duration-300"
        />
        <div className="flex flex-col items-center md:items-start gap-2 text-center md:text-left">
          <h1 className="text-4xl md:text-6xl font-extrabold bg-gradient-to-r from-indigo-400 to-pink-400 bg-clip-text text-transparent drop-shadow-lg">
            {club.name}
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-indigo-400 to-pink-400 rounded-full"></div>
        </div>
      </motion.div>

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
        className="flex items-center justify-center gap-2 text-3xl font-bold text-center mb-10 bg-gradient-to-r from-indigo-400 to-pink-400 bg-clip-text text-transparent"
      >
        <Users size={28} /> Office Bearers
      </motion.h2>

      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-10 mb-14">
        {["coordinator", "secretary", "assistant_secretary"].map((role, i) => (
          <motion.div
            key={role}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: i * 0.2 }}
            className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl p-8 rounded-2xl text-center shadow-lg border border-white/20 hover:scale-105 hover:shadow-2xl transition-all"
          >
            <img
              src={club[role].photo_src}
              alt={club[role].name}
              className="h-28 w-28 rounded-full mx-auto shadow-md border-4 border-indigo-500/40 hover:border-pink-400 transition-all"
            />
            <h3 className="mt-4 font-bold text-lg text-white">
              {club[role].name}
            </h3>
            <p className="text-sm text-gray-400 capitalize tracking-wide">
              {role.replace("_", " ")}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Instagram Link */}
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
          <Instagram size={22} /> Follow on Instagram
        </a>
      </motion.div>
    </main>
  );
}
