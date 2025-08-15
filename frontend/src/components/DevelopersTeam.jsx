import React from "react";
import { Github, Linkedin, Instagram, Twitter, Globe } from "lucide-react";

const TEAM = [
  {
    name: "Rishabh Tomar",
    role: "Frontend Developer & Team Lead",
    quote: "Guiding UI with clean code.",
    img: "/image folder/club members/Rishabh Tomar.jpg",
    social: {
      twitter: "https://x.com/Rishabh03tomar",
      instagram: "https://www.instagram.com/_._.rishabh_._/",
      github: "https://github.com/RishabhTomar9",
      linkedin: "https://www.linkedin.com/in/rishabhtomar99/",
      portfolio: "https://portfolio-nxt8349.web.app/",
    },
  },
  {
    name: "Adarsh Raj",
    role: "Backend Developer & Database Expert",
    quote: "APIs that just won't quit.",
    img: "/image folder/club members/IMG_20241031_014414 - Adarsh Raj.jpg",
    social: {
      twitter: "https://x.com/Adarshsrivastw?t=FzrgtJ2fH4Gz9tE60ZXKNg&s=08",
      instagram: "https://www.instagram.com/adarsh95765/",
      github: "https://github.com/Adarshrajsrivastwa",
      linkedin: "https://www.linkedin.com/in/adarsh-raj-srivastwa/",
      portfolio: "https://portfolio-nxt8349.web.app/",
    },
  },
  {
    name: "Krishna Jadhav",
    role: "Full Stack Developer & Database Expert",
    quote: "Ship fast, learn faster.",
    img: "/image folder/club members/Krishna Jadhav.jpg",
    social: {
      twitter: "https://x.com/KrishnaJad73973?t=evDT17yonQONRIn6mVYU7w&s=09",
      instagram: "https://www.instagram.com/asynchronous_krishna/",
      github: "https://github.com/Jadhav-Krishna",
      linkedin: "https://www.linkedin.com/in/krishna-jadhav-23866b287/",
      portfolio: "https://portfolio-nxt8349.web.app/",
    },
  },
  {
    name: "Samiksha Suryawanshi",
    role: "Full Stack Developer & Design Lead",
    quote: "Elegant UX, robust builds.",
    img: "/image folder/club members/Samiksha.jpg",
    social: {
      twitter: "#",
      instagram: "https://www.instagram.com/__rishikkaaa.__/",
      github: "https://github.com/samikshasuryawanshi",
      linkedin: "https://www.linkedin.com/in/samiksha-suryawanshi-b05b4b278/",
      portfolio: "https://my-portfolio-xi-seven-68.vercel.app/",
    },
  },
  {
    name: "Pratul Kumar",
    role: "Designer & Data Manager",
    quote: "Consistency beats complexity.",
    img: "https://res.cloudinary.com/dlk5kntmy/image/upload/v1743659738/Harsh_Raj_Singh_f5uhvp.jpg",
    social: {
      twitter: "#",
      instagram: "https://www.instagram.com/pratul._.pandey/",
      github: "https://github.com/Pratul-Kumar",
      linkedin: "https://www.linkedin.com/in/pratul-k-21nov05/",
      portfolio: "https://portfolio-nxt8349.web.app/",
    },
  },
  {
    name: "Palak Bhargav",
    role: "Frontend Developer & UX Designer",
    quote: "Pixel-perfect and accessible.",
    img: "/image folder/club members/palak.jpg",
    social: {
      twitter: "https://x.com/PalakBhargav220",
      instagram: "https://www.instagram.com/___palak__1025/",
      github: "#",
      linkedin: "#",
      portfolio: "#",
    },
  },
];

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
    <main className="min-h-screen text-white">
      <section className="mx-auto px-4">
        <header className="mb-8 text-center">
          <h1 className="inline-block pb-2 font-black tracking-[0.15em] text-3xl md:text-4xl">
            Developers Team
          </h1>
          <div className="mx-auto mt-3 w-80 h-1 rounded-full bg-gradient-to-r from-[#C8101A] via-[#FF4F01] to-[#FFF9D5] shadow-md" />
        </header>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 xl:gap-8">
          {TEAM.map((m) => (
            <Card key={m.name} member={m} />
          ))}
        </div>
      </section>
    </main>
  );
}
