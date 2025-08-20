import React from "react";
import { Link } from "react-router-dom";
import councilData from "../data/Clubs.json"
import { motion } from "framer-motion";

export default function Clubs() {
  return (
    <main className="min-h-screen text-white flex flex-col items-center py-12 px-4  mb-6">
      <header className="w-full max-w-6xl text-center mb-8 px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-6xl uppercase font-extrabold tracking-tight bg-gradient-to-r from-zinc-800 via-white to-indigo-800 bg-clip-text text-transparent mb-6"
          >
          Our Clubs &amp; Societies
        </motion.h2>
        <div className="mx-auto mt-3 w-40 h-1 rounded-full bg-gradient-to-r from-[#C8101A] via-[#FF4F01] to-[#FFF9D5] shadow-md" />
      </header>

      <section className="w-full px-4">
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-8">           
         {councilData.clubsData.map((club) => (
            <Link
              key={club.name}
              to={club.link}
              aria-label={club.name}
              className="group relative bg-[#111] rounded-3xl overflow-hidden transition-transform duration-300 ease-out hover:-translate-y-2 hover:scale-[1.02] shadow-md"
            >
              <div className="relative w-full aspect-square flex items-center justify-center p-4">
                <img
                  src={club.img}
                  alt={club.name}
                  loading="lazy"
                  className="max-h-45 max-w-full object-contain transition-transform duration-300 z-10 group-hover:scale-110 group-hover:blur-sm"
                />
      
                <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-50 transition-opacity duration-300 z-10" />
      
                <div className="absolute inset-0 flex items-center justify-center px-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-white leading-tight">
                      {club.name}
                    </p>
                    <span className="block text-lg text-white mt-2">
                      Student Council
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

    </main>
  );
}
