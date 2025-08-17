import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Loader from "./components/Loader";
import Clubs from "./components/Clubs";
import Home from "./components/Home";
import Mentors from "./components/Mentors";
import OfficeBearer from "./components/OfficeBearer";
import DevTeam from "./components/DevelopersTeam";
import JoinCouncil from "./components/form/JoinCouncil";
import Gallery from "./components/Gallery";
import ScrollToTop from "./hooks/ScrollToTop"; // make sure this exists

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handleLoad = () => setLoading(false);

    if (document.readyState === "complete") {
      setLoading(false);
    } else {
      window.addEventListener("load", handleLoad);
      return () => window.removeEventListener("load", handleLoad);
    }
  }, []);

  return (
    <div className="App min-h-screen bg-gradient-to-b from-[#000] to-[#0f1724] flex flex-col">
      <Header />
      <ScrollToTop />
      <main className="flex-grow bg-gradient-to-b from-[#000] to-[#0f1724] mt-16 relative">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/clubs" element={<Clubs />} />
          <Route path="/mentors" element={<Mentors />} />
          <Route path="/team" element={<OfficeBearer />} />
          <Route path="/developers" element={<DevTeam />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/join" element={<JoinCouncil />} />
        </Routes>

        {loading && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/70 z-50">
            <Loader />
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}

export default App; // ✅ This fixes the "does not provide an export named 'default'" error
