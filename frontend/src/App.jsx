import React from "react";
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
import Login from "./components/form/login";
import SIH from "./Pages/SIH"
import Tarang from "./Pages/TarangEventPage"
import { AuthProvider } from "./context/AuthContext";
import { useLoadingState } from "./hooks/useLoadingState";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Taragform from "./components/form/EventRegistrationForm.jsx"
import DanceDetails from "./Pages/DanceEvent.jsx"
import OpenMicEvent from "./Pages/OpenMicEvent.jsx"
import MysteryGame from "./Pages/MysteryGame.jsx"
import MusicEvent from "./Pages/MusicEvent.jsx"
import RampWalkEvent from "./Pages/RampWalkEvent.jsx"

function App() {
  const { loading, stopLoading } = useLoadingState(true, 3000);

  React.useEffect(() => {
    // Simplified loading logic with timeout fallback
    const timer = setTimeout(() => {
      stopLoading();
    }, 3000); // Maximum 3 seconds loading time

    const handleLoad = () => {
      clearTimeout(timer);
      stopLoading();
    };

    if (document.readyState === "complete") {
      clearTimeout(timer);
      stopLoading();
    } else {
      window.addEventListener("load", handleLoad);
      return () => {
        clearTimeout(timer);
        window.removeEventListener("load", handleLoad);
      };
    }
  }, [stopLoading]);

  return (
    <div className="App min-h-screen bg-gradient-to-b from-[#000] to-[#0f1724] flex flex-col">
      <AuthProvider>
        <Header />
        <ScrollToTop />
        <main className="flex-grow bg-gradient-to-b from-[#000] to-[#0f1724] relative pt-25">
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
            <Route path="/sih" element={<SIH />} />
            <Route path="/tarang" element={<Tarang />} />
            <Route path="/tarangForm" element={<Taragform />} />
            <Route path="/danceDetails" element={<DanceDetails />} />
            <Route path="/openMic" element={<OpenMicEvent />} />
            <Route path="/mysteryGame" element={<MysteryGame />} />
            <Route path="/musicEvent" element={<MusicEvent />} />
            <Route path="/rampWalk" element={<RampWalkEvent />} />
          </Routes>

          {loading && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/70 z-50">
              <Loader />
            </div>
          )}
        </main>
        <Footer />
      </AuthProvider>

         <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />

    </div>
  );
}

export default App;
