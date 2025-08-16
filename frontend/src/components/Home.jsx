import HeroSection from "../components/Home/HeroSection";
import AboutSection from "../components/Home/AboutSection";
import LeadershipSection from "../components/Home/LeadershipSection";
import ClubsSection from "../components/Home/ClubsSection";
import UpcomingEvents from "../components/Home/UpcomingEvents";
import GetInvolved from "../components/Home/GetInvolved";
import MentorsHead from "./Home/MentorsHead";

export default function Home() {
  return (
    <main className="font-sans text-white bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 min-h-screen">
      <HeroSection />
      <AboutSection />
      <LeadershipSection />
      <MentorsHead />
      <ClubsSection />
      <UpcomingEvents />
      <GetInvolved />
    </main>
  );
}
