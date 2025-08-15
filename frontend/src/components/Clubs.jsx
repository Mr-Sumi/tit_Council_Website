import React from "react";
import styled from "styled-components";

const clubsData = [
  { name: "CODING CLUB", img: "https://res.cloudinary.com/dlk5kntmy/image/upload/v1747502249/Coding_club_ed2sbh.png", link: "/club/coding" },
  { name: "CYBER COP", img: "https://res.cloudinary.com/dlk5kntmy/image/upload/v1747502250/cyber_COP_npmtvn.png", link: "/club/cyberCop" },
  { name: "DRONE SOCIETY", img: "https://res.cloudinary.com/dlk5kntmy/image/upload/v1747502267/DRONE_SOCIETY_ugfbt4.png", link: "/club/drone" },
  { name: "MEDIA FUSION", img: "https://res.cloudinary.com/dlk5kntmy/image/upload/v1747502257/Media_Fusion_vhlhjp.png", link: "/club/media" },
  { name: "CULTURAL CLUB", img: "https://res.cloudinary.com/dlk5kntmy/image/upload/v1747502266/CULTURAL_EvENT_abnyuq.png", link: "/club/Cultural" },
  { name: "ROBOTICS CLUB", img: "https://res.cloudinary.com/dlk5kntmy/image/upload/v1747502262/RObOTICS_CLUB_zuu4q1.png", link: "/club/Robotics" },
  { name: "ENTREPREN EURSHIP CLUB", img: "https://res.cloudinary.com/dlk5kntmy/image/upload/v1747502252/ENTREpRENEURSHIp_weamnu.png", link: "/club/entrepreneurship" },
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
    <Wrapper>
      <header>
        <h1>Our Clubs &amp; Societies</h1>
        <div className="divider" />
      </header>

      <div className="grid">
        {clubsData.map((club) => (
          <a key={club.name} href={club.link} className="card">
            <img className="img" src={club.img} alt={club.name} loading="lazy" />
            <div className="overlay"></div>
            <div className="textBox">
              <p className="head">{club.name}</p>
              <span>Student Council</span>
            </div>
          </a>
        ))}
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  background: black;
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  header {
    text-align: center;
  }
  header h1 {
    font-size: clamp(1.8rem, 5vw, 3rem);
    font-weight: 700;
  }
  .divider {
    margin: 12px auto 1rem;
    width: min(80%, 320px);
    height: 6px;
    border-radius: 999px;
    background: linear-gradient(90deg, #c8101a, #ff4f01 60%, #fff9d5);
    box-shadow: 0 6px 18px rgba(200, 30, 30, 0.12);
  }

  .grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1.5rem;
    width: 100%;
    max-width: 90vw;
    padding: 1rem;
  }

  .card {
    position: relative;
    aspect-ratio: 1/1;
    overflow: hidden;
    border-radius: 20px;
    cursor: pointer;
    background: #111;
    transition: transform 0.2s ease, box-shadow 0.2s ease;
  }

  .card:hover {
    transform: translateY(-6px) scale(1.03);
    box-shadow: 0 10px 25px rgba(255, 255, 255, 0.1);
  }

  .img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    transition: all 0.2s ease;
    z-index: 1;
    position: relative;
  }

  .overlay {
    position: absolute;
    inset: 0;
    background: white;
    opacity: 0;
    z-index: 2;
    transition: opacity 0.2s ease;
  }

  .textBox {
    position: absolute;
    inset: 0;
    z-index: 3;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 8px;
    opacity: 0;
    transition: opacity 0.2s ease;
    text-align: center;
    padding: 0.5rem;
  }

  .head {
    font-size: clamp(1.5rem, 3vw, 2.5rem);
    font-weight: 700;
    color: black;
  }

  .textBox span {
    font-size: clamp(1.2rem, 2.2vw, 1.2rem);
    color: black;
  }

  /* Hover Effects */
  .card:hover .img {
    filter: blur(6px) brightness(1.1);
    transform: scale(1.05);
  }
  .card:hover .overlay {
    opacity: 0.7;
  }
  .card:hover .textBox {
    opacity: 1;
  }
`;
