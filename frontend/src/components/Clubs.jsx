import React from "react";

const clubsData = [
  { name: "CODING CLUB", img: "https://res.cloudinary.com/dlk5kntmy/image/upload/v1747502249/Coding_club_ed2sbh.png", link: "/club/coding" },
  { name: "CYBER COP", img: "https://res.cloudinary.com/dlk5kntmy/image/upload/v1747502250/cyber_COP_npmtvn.png", link: "/club/cyberCop" },
  { name: "DRONE SOCIETY", img: "https://res.cloudinary.com/dlk5kntmy/image/upload/v1747502267/DRONE_SOCIETY_ugfbt4.png", link: "/club/drone" },
  { name: "MEDIA FUSION", img: "https://res.cloudinary.com/dlk5kntmy/image/upload/v1747502257/Media_Fusion_vhlhjp.png", link: "/club/media" },
  { name: "CULTURAL CLUB", img: "https://res.cloudinary.com/dlk5kntmy/image/upload/v1747502266/CULTURAL_EvENT_abnyuq.png", link: "/club/Cultural" },
  { name: "ROBOTICS CLUB", img: "https://res.cloudinary.com/dlk5kntmy/image/upload/v1747502262/RObOTICS_CLUB_zuu4q1.png", link: "/club/Robotics" },
  { name: "ENTREPRENEURSHIP CLUB", img: "https://res.cloudinary.com/dlk5kntmy/image/upload/v1747502252/ENTREpRENEURSHIp_weamnu.png", link: "/club/entrepreneurship" },
  { name: "LITERARY CLUB", img: "https://res.cloudinary.com/dlk5kntmy/image/upload/v1747502256/LITERARY_Club_ooakhl.png", link: "/club/Literary" },
  { name: "RENEWABLE ENERGY CLUB", img: "https://res.cloudinary.com/dlk5kntmy/image/upload/v1747502261/RENEwAbLE_ENERGY_x7mjft.png", link: "/club/Renewable" },
  { name: "DISCIPLINE CLUB", img: "https://res.cloudinary.com/dlk5kntmy/image/upload/v1747502251/DISCIpLINE_jt8ej5.png", link: "/club/Disipline" },
  { name: "ALUMNI RELATION COMMITTEE", img: "https://res.cloudinary.com/dlk5kntmy/image/upload/v1747502264/Alumni_Relation_mp5xrs.png", link: "/club/Alumni" },
  { name: "TECH WIZARDS", img: "https://res.cloudinary.com/dlk5kntmy/image/upload/v1747502263/Tech_WIZARDs_obkby8.png", link: "/club/Tech" },
  { name: "EV CLUB", img: "https://res.cloudinary.com/dlk5kntmy/image/upload/v1747502268/EV_g2djgp.png", link: "/club/EV" },
  { name: "MUSIC SOCIETY", img: "https://res.cloudinary.com/dlk5kntmy/image/upload/v1747502258/mUSIC_SOCIETY_m2wmom.png", link: "/club/music" },
  { name: "DANCE CLUB", img: "https://res.cloudinary.com/dlk5kntmy/image/upload/v1747502250/DAnce_Club_s5g6df.png", link: "/club/Dance" },
  { name: "IEEE STUDENT CHAPTER", img: "https://res.cloudinary.com/dlk5kntmy/image/upload/v1747502254/IEEE_Student_Chapter_tzqiza.png", link: "/club/IEEE" }
];

export default function Clubs() {
  return (
    <main className="min-h-screen text-white flex flex-col items-center py-12 px-4">
      <header className="w-full max-w-6xl text-center mb-8 px-4">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-wide">
          Our Clubs &amp; Societies
        </h1>
        <div className="mx-auto mt-3 w-40 h-1 rounded-full bg-gradient-to-r from-[#C8101A] via-[#FF4F01] to-[#FFF9D5] shadow-md" />
      </header>

      <section className="w-full px-4">
        <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 auto-rows-fr">
          {clubsData.map((club) => (
            <a
              key={club.name}
              href={club.link}
              aria-label={club.name}
              className="group relative bg-[#111] rounded-3xl overflow-hidden transition-transform duration-200 ease-out hover:-translate-y-2 hover:scale-[1.02] shadow-sm focus:outline-none focus:ring-4 focus:ring-[#C8101A]/25"
            >
              {/* make card square */}
              <div className="aspect-square flex flex-col items-center justify-center p-4">
                {/* centered small image */}
                <img
                  src={club.img}
                  alt={club.name}
                  loading="lazy"
                  className="h-60 object-contain transition-all duration-300 z-10 group-hover:scale-110 group-hover:blur-sm"
                />

                {/* white overlay that fades in */}
                <div className="absolute inset-0 bg-black group-hover:bg-zinc-900 transition-colors duration-250 pointer-events-none" />

                {/* centered text shown on hover */}
                <div className="absolute inset-0 flex items-center bg-black/40 justify-center px-3 opacity-0 group-hover:opacity-100 transition-opacity duration-25 z-20">
                  <div className="text-center">
                    <p className="text-3xl font-bold text-white leading-tight">
                      {club.name}
                    </p>
                    <span className="block text-xl text-white mt-4">Student Council</span>
                  </div>
                </div>
              </div>
            </a>
          ))}
        </div>
      </section>
    </main>
  );
}
