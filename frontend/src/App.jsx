import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Loader from "./components/Loader";
import Clubs from "./components/Clubs";
import ClubDetails from "./components/ClubDetails";
import Home from "./components/Home";
import Mentors from "./components/Mentors";
import OfficeBearer from "./components/OfficeBearer";
import DevTeam from "./components/DevelopersTeam";
import IdeaSubmissionForm from "./components/form/IdeaSubmission"
import Gallery from "./components/Gallery";
import UserProfile from "./components/UserProfile"
import JoinCouncil from "./components/form/JoinCouncil";
import SuggestionForm from "./components/form/Suggestion"
import AuthForm from "./components/form/AuthForm";
import UserProfileRegistration from "./components/form/UserProfileRegistration"
import ScrollToTop from "./hooks/ScrollToTop"; 
import Login from "./components/form/login"
import { AuthProvider } from "./context/AuthContext";


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
      <AuthProvider>
        <Header />
        <ScrollToTop />
        <main className="flex-grow bg-gradient-to-b from-[#000] to-[#0f1724] relative">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/clubs" element={<Clubs />} />
            <Route path="/club/:clubName" element={<ClubDetails />} />
            <Route path="/mentors" element={<Mentors />} />
            <Route path="/team" element={<OfficeBearer />} />
            <Route path="/developers" element={<DevTeam />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/join" element={<JoinCouncil />} />
            <Route path="/suggestion" element={<SuggestionForm />} />
            <Route path="/ideas" element={<IdeaSubmissionForm />} />
            <Route path="/login" element={<Login />} />
            <Route path="/userProfile" element={<UserProfile />} />
            <Route path="/userProfileRegistration" element={<UserProfileRegistration />} />
          </Routes>

          {loading && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/70 z-50">
              <Loader />
            </div>
          )}
        </main>
        <Footer />
      </AuthProvider>
    </div>
  );
}

export default App;
