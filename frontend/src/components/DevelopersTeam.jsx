import React from "react";
import { Github, Linkedin, Instagram, Twitter, Globe } from "lucide-react";
import TEAM from "../data/DevelopersTeam.json"; // import your JSON file
import { motion } from "framer-motion";


const SocialIcon = ({ href, label, children }) => {
  if (!href || href === "#") return null;
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      title={label}
      className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 backdrop-blur-sm transition hover:-translate-y-0.5 hover:border-teal-400/50 hover:bg-teal-400/10"
    >
      {children}
    </a>
  );
};

const Card = ({ member }) => {
  return (
    <div className="group rounded-2xl border border-white/10 bg-neutral-900 p-5 shadow-sm transition hover:shadow-[0_12px_30px_-12px_rgba(45,212,191,0.35)]">
      <div className="relative overflow-hidden rounded-2xl aspect-square bg-neutral-800">
        <img
          src={member.img}
          alt={member.name}
          className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.03]"
          loading="lazy"
        />
        <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/10" />
      </div>

      <div className="mt-4">
        <h3 className="text-lg font-semibold tracking-wide text-teal-300">{member.name}</h3>
        <p className="mt-1 text-sm text-neutral-300">{member.role}</p>
        <p className="mt-2 text-sm italic text-neutral-400">“{member.quote}”</p>
      </div>

      <div className="mt-4 flex flex-wrap gap-3">
        <SocialIcon href={member.social.twitter} label={`${member.name} on Twitter`}>
          <Twitter size={18} />
        </SocialIcon>
        <SocialIcon href={member.social.instagram} label={`${member.name} on Instagram`}>
          <Instagram size={18} />
        </SocialIcon>
        <SocialIcon href={member.social.github} label={`${member.name} on GitHub`}>
          <Github size={18} />
        </SocialIcon>
        <SocialIcon href={member.social.linkedin} label={`${member.name} on LinkedIn`}>
          <Linkedin size={18} />
        </SocialIcon>
        <SocialIcon href={member.social.portfolio} label={`${member.name} Portfolio`}>
          <Globe size={18} />
        </SocialIcon>
      </div>
    </div>
  );
};

export default function DevTeam() {
  return (
    <main className="min-h-screen text-white mt-20 mb-6">
      <section className="mx-auto px-4">
        <header className="mb-8 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-6xl font-extrabold tracking-tight bg-gradient-to-r from-zinc-800 via-white to-indigo-800 bg-clip-text text-transparent mb-6"
        >
          Devlopers Team
        </motion.h1>
          <div className="mx-auto mt-3 w-80 h-1 rounded-full bg-gradient-to-r from-[#C8101A] via-[#FF4F01] to-[#FFF9D5] shadow-md" />
        </header>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-8">
          {TEAM.developers.map((m) => (
            <Card key={m.name} member={m} />
          ))}
        </div>
      </section>
    </main>
  );
}
