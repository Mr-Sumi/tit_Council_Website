import React from "react";
import HeroSection from "../components/Home/HeroSection";
import AboutSection from "../components/Home/AboutSection";
import LeadershipSection from "../components/Home/LeadershipSection";
import ClubsSection from "../components/Home/ClubsSection";
import UpcomingEvents from "../components/Home/UpcomingEvents";
import GetInvolved from "../components/Home/GetInvolved";
import MentorsHead from "./Home/MentorsHead";
import JoinCouncilSection from "./Home/JoinCouncilSection"

export default function Home() {
  return (
    <main className="font-sans min-h-screen overflow-y-hidden">
      <HeroSection />
      <AboutSection />
      <JoinCouncilSection />
      <LeadershipSection />
      <MentorsHead />
      <ClubsSection />
      <UpcomingEvents />
      <GetInvolved />
    </main>
  );
}
