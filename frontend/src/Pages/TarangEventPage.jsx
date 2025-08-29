import React, { useState, useEffect } from "react";
import { Calendar, Users, Music, Mic, Star, Clock, Phone } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function TarangEventPage() {
  const [hoveredCategory, setHoveredCategory] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const categories = [
    { name: "Ramp Walk", icon: Star, delay: "0ms", path: "/rampWalk" },
    { name: "Dance", icon: Users, delay: "100ms", path: "/danceDetails" },
    { name: "Open Mic", icon: Mic, delay: "200ms", path: "/openMic" },
    { name: "Music", icon: Music, delay: "300ms", path: "/musicEvent" },
    { name: "Fun Games", icon: Clock, delay: "400ms", path: "/mysteryGame" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-zinc-900 text-white relative overflow-hidden">
      {/* Animated Wave Background Pattern */}
      <div className="absolute inset-0 opacity-20">
        <svg
          className="w-full h-full animate-pulse"
          viewBox="0 0 1200 800"
          preserveAspectRatio="xMidYMid slice"
        >
          <defs>
            <linearGradient id="waveGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#64748b" stopOpacity="0.1" />
              <stop offset="50%" stopColor="#475569" stopOpacity="0.15" />
              <stop offset="100%" stopColor="#334155" stopOpacity="0.1" />
            </linearGradient>
            <linearGradient id="waveGradient2" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#6b7280" stopOpacity="0.08" />
              <stop offset="100%" stopColor="#4b5563" stopOpacity="0.12" />
            </linearGradient>
          </defs>
          <path
            d="M0,200 Q300,100 600,200 T1200,200 L1200,800 L0,800 Z"
            fill="url(#waveGradient1)"
            className="animate-pulse"
          />
          <path
            d="M0,400 Q300,300 600,400 T1200,400 L1200,800 L0,800 Z"
            fill="url(#waveGradient2)"
            className="animate-pulse"
            style={{ animationDelay: "1s" }}
          />
          <path
            d="M0,600 Q300,500 600,600 T1200,600 L1200,800 L0,800 Z"
            fill="url(#waveGradient1)"
            className="animate-pulse"
            style={{ animationDelay: "2s" }}
          />
        </svg>
      </div>

      {/* Floating particles animation */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-slate-400 rounded-full animate-ping"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 3}s`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 container mx-auto px-6 py-12">
        {/* Header */}
        <div
          className={`text-center mb-16 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="mb-8">
            <h1 className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-slate-200 via-gray-100 to-slate-300 bg-clip-text text-transparent mb-4 animate-pulse">
              TARANG
            </h1>
            <div className="w-32 h-1 bg-gradient-to-r from-slate-400 via-gray-300 to-slate-500 mx-auto mb-6 animate-pulse"></div>
            <p className="text-2xl md:text-3xl font-light text-slate-300 mb-2 animate-fade-in">
              The Waves of Talent
            </p>
            <p
              className="text-lg text-slate-400 max-w-2xl mx-auto animate-fade-in"
              style={{ animationDelay: "0.3s" }}
            >
              A Cultural Celebration of Performance & Passion
            </p>
          </div>

          {/* Event Details */}
          <div
            className={`flex flex-col md:flex-row justify-center items-center gap-8 mb-12 transition-all duration-1000 delay-300 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
            }`}
          >
            <div className="flex items-center gap-3 group">
              <Calendar className="w-6 h-6 text-slate-300 group-hover:text-white transition-colors duration-300" />
              <span className="text-xl font-medium">Coming Soon</span>
            </div>
            <div className="hidden md:block w-px h-8 bg-slate-600"></div>
            <div className="flex items-center gap-3 group">
              <Clock className="w-6 h-6 text-slate-300 group-hover:text-white transition-colors duration-300" />
              <span className="text-xl">Entries Close: Saturday, 30-08-2025</span>
            </div>
          </div>
        </div>

        {/* Registration Button */}
        <div
          className={`text-center mb-16 transition-all duration-1000 delay-500 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
          }`}
        >
          <button
            onClick={() => navigate("/tarangForm")}
            className="group relative px-12 py-6 text-2xl font-bold bg-gradient-to-r from-slate-100 via-white to-slate-200 text-slate-900 rounded-full hover:from-slate-200 hover:via-gray-100 hover:to-slate-300 transition-all duration-500 transform hover:scale-110 shadow-2xl hover:shadow-slate-500/25 animate-bounce"
          >
            <span className="relative z-10">REGISTER NOW</span>
            <div className="absolute inset-0 bg-gradient-to-r from-slate-300 via-gray-200 to-slate-400 rounded-full opacity-0 group-hover:opacity-30 transition-opacity duration-500"></div>
            <div className="absolute -inset-1 bg-gradient-to-r from-slate-400 via-gray-300 to-slate-500 rounded-full opacity-0 group-hover:opacity-20 blur-lg transition-opacity duration-500"></div>
          </button>
          <p className="mt-4 text-slate-400 text-lg animate-pulse">
            Limited slots available – Apply ASAP!
          </p>
        </div>

        {/* Performance Categories */}
        <div className="mb-16">
          <h2
            className={`text-4xl font-bold text-center mb-12 transition-all duration-1000 delay-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
            }`}
          >
            Performance Categories
            <span className="block text-lg text-red-400 mt-2 animate-pulse">
              (Limited Entries!)
            </span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {categories.map((category, index) => {
              const Icon = category.icon;
              return (
                <div
                  key={category.name}
                  className={`group relative bg-gradient-to-br from-slate-800 via-gray-800 to-zinc-800 border border-slate-600 rounded-2xl p-8 hover:border-slate-400 hover:shadow-2xl hover:shadow-slate-500/20 transition-all duration-500 cursor-pointer transform hover:scale-105 hover:-translate-y-2 ${
                    isVisible
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-8"
                  }`}
                  style={{
                    transitionDelay: `${800 + index * 100}ms`,
                    animationDelay: category.delay,
                  }}
                  onMouseEnter={() => setHoveredCategory(index)}
                  onMouseLeave={() => setHoveredCategory(null)}
                  onClick={() => navigate(category.path)} // ✅ Navigate on click
                >
                  <div className="text-center relative">
                    <div className="mb-6 relative">
                      <div className="w-16 h-16 bg-gradient-to-r from-slate-200 to-white rounded-full flex items-center justify-center mx-auto group-hover:from-white group-hover:to-slate-100 transition-all duration-500 transform group-hover:rotate-12 group-hover:scale-110">
                        <Icon className="w-8 h-8 text-slate-900" />
                      </div>
                      {hoveredCategory === index && (
                        <div className="absolute -inset-2 bg-slate-400/20 rounded-full blur-md animate-ping"></div>
                      )}
                    </div>
                    <h3 className="text-2xl font-bold mb-4 group-hover:text-slate-100 transition-colors duration-300">
                      {category.name}
                    </h3>
                    {hoveredCategory === index && (
                      <div className="absolute inset-0 bg-gradient-to-br from-slate-500/10 via-transparent to-slate-400/10 rounded-2xl animate-pulse"></div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-700/5 to-transparent rounded-2xl group-hover:from-slate-600/10 transition-all duration-500"></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Important Notes */}
        <div
          className={`bg-gradient-to-r from-slate-800 via-gray-800 to-zinc-800 border border-slate-600 rounded-3xl p-10 max-w-4xl mx-auto mb-16 hover:border-slate-500 transition-all duration-500 hover:shadow-2xl hover:shadow-slate-500/10 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
          style={{ transitionDelay: "1.3s" }}
        >
          <h3 className="text-3xl font-bold mb-8 text-center bg-gradient-to-r from-slate-200 to-white bg-clip-text text-transparent">
            Important Notes
          </h3>
          <div className="space-y-6 text-lg">
            <div className="flex items-start gap-4 group">
              <div className="w-3 h-3 bg-gradient-to-r from-slate-300 to-white rounded-full mt-2 flex-shrink-0 group-hover:scale-125 transition-transform duration-300"></div>
              <p className="group-hover:text-slate-200 transition-colors duration-300">
                First-come, first-served basis – get your entries in before the
                slots fill up!
              </p>
            </div>
            <div className="flex items-start gap-4 group">
              <div className="w-3 h-3 bg-gradient-to-r from-slate-300 to-white rounded-full mt-2 flex-shrink-0 group-hover:scale-125 transition-transform duration-300"></div>
              <p className="group-hover:text-slate-200 transition-colors duration-300">
                Only unique and original entries will be accepted. No duplicates
                per category.
              </p>
            </div>
            <div className="flex items-start gap-4 group">
              <div className="w-3 h-3 bg-gradient-to-r from-slate-300 to-white rounded-full mt-2 flex-shrink-0 group-hover:scale-125 transition-transform duration-300"></div>
              <p className="group-hover:text-slate-200 transition-colors duration-300">
                Once entries are full, no exceptions will be made.
              </p>
            </div>
          </div>
        </div>

        {/* About Tarang */}
        <div
          className={`text-center max-w-4xl mx-auto transition-all duration-1000 delay-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <h3 className="text-3xl font-bold mb-8 bg-gradient-to-r from-slate-200 to-white bg-clip-text text-transparent">
            About Tarang
          </h3>
          <p className="text-xl text-slate-300 leading-relaxed hover:text-slate-200 transition-colors duration-500">
            "Tarang – The Waves of Talent" is your stage to shine — a cultural
            splash of rhythm, expression, and excitement. Whether you walk,
            sing, dance, or speak — your talent makes the wave.
          </p>
        </div>

        {/* Contact Section */}
        <section id="contact" className="py-20 px-4 bg-gray-800/50">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">
                Contact Us
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-orange-500 to-red-500 mx-auto mb-8"></div>
            </div>

            <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-12 rounded-2xl border border-gray-700">
              <div className="text-center mb-8">
                <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Phone className="w-10 h-10" />
                </div>
                <h3 className="text-3xl font-bold mb-4 text-orange-400">
                  Student Coordinators
                </h3>
                <p className="text-gray-300 text-lg mb-8">
                  For any queries or updates regarding Tarang 
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-4">update 
                {[
                  { name: "Madhur Verma", phone: "74708 11264" },
                  { name: "Yash Gupta", phone: "91426 50931" },
                ].map((contact, index) => (
                  <div
                    key={index}
                    className="bg-gray-700/50 p-4 rounded-lg border border-gray-600 hover:border-gray-500 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-semibold text-white text-lg">
                          {contact.name}
                        </p>
                        <p className="text-gray-300 text-sm">
                          Student Coordinator
                        </p>
                      </div>
                      <div className="flex items-center space-x-2 text-gray-200">
                        <Phone className="w-4 h-4" />
                        <span className="font-mono">{contact.phone}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Footer Wave */}
        <div
          className={`mt-20 text-center transition-all duration-1000 delay-1200 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="text-8xl text-slate-600 font-light animate-pulse hover:text-slate-500 transition-colors duration-500">
            〜
          </div>
          <p
            className="text-slate-500 mt-4 animate-fade-in"
            style={{ animationDelay: "1.5s" }}
          >
            Let your talent create waves
          </p>
        </div>
      </div>
    </div>
  );
}
