import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom"; // ✅ for routing
import Header from "./components/Header";
import Footer from "./components/Footer";
import Loader from "./components/Loader";
import Clubs from "./components/Clubs";
import Home from "./components/Home";
import Mentors from "./components/Mentors";
import OfficeBearer from "./components/OfficeBearer";
import DevTeam from "./components/DevelopersTeam";
// import ClubDetail from "./components/ClubDetail";
// import EventPage from "./components/EventPage";
// import Login from "./components/Login";
// import UserPage from "./components/UserPage";
import Gallery from "./components/Gallery";
import ScrollToTop from "./hooks/ScrollToTop";


function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading (replace with actual data fetching if needed)
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="App min-h-screen bg-gradient-to-b from-[#000] to-[#0f1724] flex flex-col">
      <Header />

      {/* ✅ Routing Setup */}
      <main className="flex-grow bg-gradient-to-b from-[#000] to-[#0f1724] mt-16">
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/clubs" element={<Clubs />} />
          <Route path="/mentors" element={<Mentors />} />
          <Route path="/team" element={<OfficeBearer />} />
          <Route path="/developers" element={<DevTeam />} />
          {/* <Route path="/club/:clubName" element={<ClubDetail />} />
          <Route path="/club/:clubName/detail" element={<ClubDetail />} />
          <Route path="/eventPage" element={<EventPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/userPage" element={<UserPage />} /> */}
          <Route path="/gallery" element={<Gallery />} />
          {/* you can add Gallery here later */}
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;
