import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Target,  // 🎯 Mission
  Eye,     // 👁️ Vision
  Users,   // 👥 Office Bearers
  Instagram,
  ArrowLeft,
} from "lucide-react";
import detailsJson from "../data/ClubBearerDetails.json";
import ErrorPage from "../components/Error";

export default function ClubDetails() {
  const { clubName } = useParams();

  // find by matching lowercase/slug
  const club = detailsJson.clubs.find(
    (c) => c.name.toLowerCase().includes(clubName.toLowerCase())
  );

  if (!club) return <ErrorPage />;

  return (
    <main className="p-6 md:p-12 max-w-6xl mx-auto text-white mt-20">
      {/* Back Button */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-6"
      >
        <Link
          to="/clubs"
          className="inline-flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-indigo-600 to-purple-500 rounded-full font-semibold shadow-lg hover:scale-105 transition-transform"
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
        className="flex flex-col md:flex-row items-center gap-6 mb-12 text-center md:text-left"
      >
        <img
          src={club.club_logo}
          alt={club.name}
          className="h-28 w-28 rounded-2xl shadow-xl ring-4 ring-white/20"
        />
        <h1 className="text-7xl font-extrabold text-white/90">
          {club.name}
        </h1>
        <div className="bg-white/80 w-full h-1 rounded-3xl"></div>
      </motion.div>

      {/* Mission & Vision */}
      <section className="grid md:grid-cols-2 gap-8 mb-14">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="bg-white/10 backdrop-blur-md p-8 rounded-3xl shadow-xl hover:shadow-2xl hover:scale-[1.02] transition-transform border border-white/20"
        >
          <div className="flex items-center gap-2 mb-3">
            <Target className="text-pink-400" size={24} />
            <h2 className="text-2xl font-semibold">Mission</h2>
          </div>
          <p className="text-gray-300 leading-relaxed">{club.mission}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="bg-white/10 backdrop-blur-md p-8 rounded-3xl shadow-xl hover:shadow-2xl hover:scale-[1.02] transition-transform border border-white/20"
        >
          <div className="flex items-center gap-2 mb-3">
            <Eye className="text-yellow-400" size={24} />
            <h2 className="text-2xl font-semibold">Vision</h2>
          </div>
          <p className="text-gray-300 leading-relaxed">{club.vision}</p>
        </motion.div>
      </section>

      {/* Office Bearers */}
      <motion.h2
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="flex items-center justify-center gap-2 text-3xl font-bold text-center mb-10 text-indigo-400"
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
            className="bg-white/10 backdrop-blur-lg p-8 rounded-2xl text-center shadow-lg border border-white/20 hover:scale-105 hover:shadow-2xl transition-transform"
          >
            <img
              src={club[role].photo_src}
              alt={club[role].name}
              className="h-28 w-28 rounded-full mx-auto shadow-md border-4 border-indigo-500/40 hover:border-pink-400 transition-colors"
            />
            <h3 className="mt-4 font-bold text-lg">{club[role].name}</h3>
            <p className="text-sm text-gray-400 capitalize">
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
        className="mt-10 text-center"
      >
        <a
          href={club.instagram_url}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 bg-white/90 text-black px-10 py-4 rounded-full font-bold text-lg hover:scale-103 hover:shadow-xl transition-transform"
        >
          <Instagram size={22} /> Follow on Instagram
        </a>
      </motion.div>
    </main>
  );
}
