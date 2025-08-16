import React from "react";
import { FaTwitter, FaLinkedin, FaInstagram, FaGithub } from "react-icons/fa";
import councilData from "../data/Council-data.json"; // ✅ import JSON

const SocialIcon = ({ href, children, label }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    aria-label={label}
    className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-zinc-700/60 hover:border-emerald-400 hover:bg-emerald-500/10 transition-colors duration-300"
  >
    {children}
  </a>
);

const OfficeBearer = () => {
  const members = councilData.teamMembers || []; // ✅ pull leaders (or TEAM if that’s what you want)

  return (
    <section className="w-full">
      <div className="min-h-screen text-white flex flex-col items-center px-4">
        
        {/* Section Header */}
        <header className="w-full max-w-6xl text-center mb-8">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-wide">
            OFFICE BEARER
          </h1>
          <div className="mx-auto mt-3 w-40 h-1 rounded-full bg-gradient-to-r from-[#C8101A] via-[#FF4F01] to-[#FFF9D5] shadow-md" />
        </header>

        {/* Responsive Grid */}
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 auto-rows-fr w-full">
          {members.map((m, i) => (
            <article
              key={i}
              className="group rounded-2xl border border-zinc-800 bg-zinc-900/50 p-5 shadow-md hover:scale-102 transition-transform"
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <div className="aspect-square w-full overflow-hidden rounded-3xl border border-zinc-800">
                <img
                  src={m.img}
                  alt={m.name}
                  className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
              </div>

              <h3 className="mt-4 text-2xl text-center font-semibold text-zinc-100">
                {m.name}
              </h3>
              <p className="text-lg text-center text-emerald-400 font-medium">
                {m.role}
              </p>

              {m.quote && (
                <p className="mt-3 text-center text-lg italic text-zinc-400 leading-relaxed">
                  “{m.quote}”
                </p>
              )}

              <div className="mt-5 flex items-center justify-center gap-3">
                {m.social?.twitter && (
                  <SocialIcon href={m.social.twitter} label="Twitter">
                    <FaTwitter className="text-zinc-200 group-hover:text-emerald-400 transition-colors" />
                  </SocialIcon>
                )}
                {m.social?.linkedin && (
                  <SocialIcon href={m.social.linkedin} label="LinkedIn">
                    <FaLinkedin className="text-zinc-200 group-hover:text-emerald-400 transition-colors" />
                  </SocialIcon>
                )}
                {m.social?.instagram && (
                  <SocialIcon href={m.social.instagram} label="Instagram">
                    <FaInstagram className="text-zinc-200 group-hover:text-emerald-400 transition-colors" />
                  </SocialIcon>
                )}
                {m.social?.github && (
                  <SocialIcon href={m.social.github} label="GitHub">
                    <FaGithub className="text-zinc-200 group-hover:text-emerald-400 transition-colors" />
                  </SocialIcon>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OfficeBearer;
