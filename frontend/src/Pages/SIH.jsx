import React, { useState, useEffect } from 'react';
import { Calendar, Users, Trophy, Mail, Phone, FileText, Code, Heart, Wifi, Globe, Zap, Clock, ChevronDown, Download, ExternalLink } from 'lucide-react';
import Navbar from "../components/Header"
const HackathonWebsite = () => {
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('section[id]');
      const scrollPos = window.scrollY + 100;

      sections.forEach(section => {
        if (scrollPos >= section.offsetTop && scrollPos < section.offsetTop + section.offsetHeight) {
          setActiveSection(section.id);
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Navigation */}
      {/* <nav className="fixed top-0 w-full bg-gray-900/95 backdrop-blur-sm z-50 border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg flex items-center justify-center">
                <Trophy className="w-5 h-5" />
              </div>
              <span className="font-bold text-xl">SIH 2025</span>
            </div>
            <div className="hidden md:flex space-x-6">
              {['about', 'registration', 'resources', 'contact'].map((section) => (
                <button
                  key={section}
                  onClick={() => scrollToSection(section)}
                  className={`capitalize hover:text-orange-400 transition-colors ${
                    activeSection === section ? 'text-orange-400' : ''
                  }`}
                >
                  {section}
                </button>
              ))}
            </div>
          </div>
        </div>
      </nav> */}
      <Navbar />

      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-500/20 via-red-500/10 to-purple-500/20"></div>
        <div className="absolute inset-0">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-white/5 animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                width: `${Math.random() * 4 + 1}px`,
                height: `${Math.random() * 4 + 1}px`,
                animationDelay: `${Math.random() * 2}s`
              }}
            />
          ))}
        </div>
        
        <div className="text-center z-10 max-w-4xl mx-auto px-4">
          <div className="mb-8">
            <div className="w-20 h-20 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl flex items-center justify-center mx-auto mb-6 animate-bounce">
              <Trophy className="w-12 h-12" />
            </div>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">
            SIH 2025
          </h1>
          <h2 className="text-2xl md:text-4xl font-semibold mb-4">
            Internal Hackathon
          </h2>
          <p className="text-xl md:text-2xl text-gray-300 mb-8">
            Organized by <span className="text-orange-400 font-semibold">TIT technocrats (Student council)</span>
          </p>
          
          <div className="bg-gradient-to-r from-orange-500/20 to-red-500/20 border border-orange-500/30 rounded-2xl p-8 mb-8 backdrop-blur-sm">
            <div className="text-4xl mb-4">🚀</div>
            <h3 className="text-2xl font-bold mb-4 text-orange-400">Registration Starting Soon!</h3>
            <p className="text-lg text-gray-300">Get ready to showcase your innovation skills. Team registration will begin shortly.</p>
          </div>
          
          <div className="animate-bounce">
            <ChevronDown className="w-8 h-8 mx-auto text-gray-400" />
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">
              About SIH 2025
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-orange-500 to-red-500 mx-auto mb-8"></div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <p className="text-lg text-gray-300 leading-relaxed">
                Smart India Hackathon (SIH) is India's biggest innovation competition that brings together the brightest minds to solve real-world problems using technology.
              </p>
              <p className="text-lg text-gray-300 leading-relaxed">
                This internal hackathon is your gateway to SIH 2025. We're selecting the best teams from Technocrats Institute of Technology to represent us at the national level.
              </p>
            </div>
            
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-8 rounded-2xl border border-gray-700">
              <div className="text-center">
                <div className="text-6xl mb-4">⏳</div>
                <h3 className="text-3xl font-bold mb-4 text-orange-400">Coming Soon</h3>
                <p className="text-gray-300 text-lg">All details will be announced shortly. Stay tuned for updates!</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Registration Section */}
      <section id="registration" className="py-20 px-4 bg-gray-800/50">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-16">
            <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">
              Registration
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-orange-500 to-red-500 mx-auto mb-8"></div>
          </div>
          
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-12 rounded-2xl border border-gray-700">
            <div className="mb-8">
              <div className="w-20 h-20 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Clock className="w-10 h-10" />
              </div>
              <h3 className="text-3xl font-bold mb-4 text-orange-400">Registration Starting Soon!</h3>
              <p className="text-gray-300 mb-8 text-lg">
                Team registration will begin shortly. Keep checking this space for updates!
              </p>
            </div>
            
            <div className="space-y-4">
              <div className="bg-orange-500/10 border border-orange-500/20 rounded-lg p-6">
                <div className="text-4xl mb-4">👥</div>
                <h4 className="text-xl font-semibold text-orange-400 mb-2">Team Formation</h4>
                <p className="text-gray-300 mb-3">Form your team with these guidelines:</p>
                <div className="text-left text-gray-300 space-y-2">
                  <div className="flex items-center space-x-2">
                    <span className="w-2 h-2 bg-orange-400 rounded-full"></span>
                    <span>Team size: <strong className="text-white">6 members</strong> (including 1 leader)</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="w-2 h-2 bg-orange-400 rounded-full"></span>
                    <span>Only <strong className="text-white">1 leader</strong> allowed per team</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="w-2 h-2 bg-orange-400 rounded-full"></span>
                    <span><strong className="text-white">1 girl member</strong> is compulsory</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="w-2 h-2 bg-orange-400 rounded-full"></span>
                    <span>All members must <strong className="text-white">actively contribute</strong></span>
                  </div>
                </div>
              </div>
              
              <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-6">
                <div className="text-4xl mb-4">📅</div>
                <h4 className="text-xl font-semibold text-blue-400 mb-2">Important Dates</h4>
                <p className="text-gray-300">Complete schedule will be announced shortly!</p>
              </div>
              
              <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-6">
                <div className="text-4xl mb-4">🏆</div>
                <h4 className="text-xl font-semibold text-green-400 mb-2">Problem Statements</h4>
                <p className="text-gray-300 mb-4">Challenge domains and problem statements are now available!</p>
                <button 
                onClick={() => (window.location.href = "https://www.sih.gov.in/sih2025PS")}
                className="px-6 py-2 bg-green-500 text-white rounded-lg font-semibold hover:bg-green-600 transition-colors flex items-center justify-center mx-auto"
                 >
                 View Problem Statements <ExternalLink className="w-4 h-4 ml-2" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Resources Section */}
      <section id="resources" className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">
              Resources
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-orange-500 to-red-500 mx-auto mb-8"></div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-8 rounded-2xl border border-gray-700 hover:scale-105 transition-transform">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Download className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold mb-4">SIH PPT Format</h3>
                <p className="text-gray-300 mb-6">Download the official presentation format for your project submissions</p>
                <a 
                href="https://drive.google.com/uc?export=download&id=1JXsGzFpdoJviU9OzNa1lkvRA3DW_QyPq"
                download
                className="px-8 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg font-semibold hover:scale-105 transition-transform inline-block"
                 >
                 Download PPT Format
                </a>



              </div>
            </div>
            
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-8 rounded-2xl border border-gray-700 hover:scale-105 transition-transform">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <ExternalLink className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Official SIH Website</h3>
                <p className="text-gray-300 mb-6">Visit the official Smart India Hackathon website for complete information</p>
                <button 
                onClick={() => (window.location.href = "https://www.sih.gov.in")}
                className="px-8 py-3 bg-gradient-to-r from-green-500 to-teal-500 rounded-lg font-semibold hover:scale-105 transition-transform"
                >
                   Visit SIH Website
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact */}
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
              <h3 className="text-3xl font-bold mb-4 text-orange-400">Student Coordinators</h3>
              <p className="text-gray-300 text-lg mb-8">
                For any queries or updates regarding SIH 2025 Internal Hackathon
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-4">
              {[
                { name: "Adarsh Raj", phone: "62058 40092" },
                { name: "Pratul Pandey", phone: "95341 77010" },
                { name: "Harsh raj Singh", phone: "94714 73020" },
                { name: "Divyanshu Shinde", phone: "88895 21415" }
              ].map((contact, index) => (
                <div key={index} className="bg-gray-700/50 p-4 rounded-lg border border-gray-600 hover:border-gray-500 transition-colors">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-white text-lg">{contact.name}</p>
                      <p className="text-gray-300 text-sm">Student Coordinator</p>
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

      {/* Footer */}
      {/* <footer className="py-12 px-4 border-t border-gray-800">
        <div className="max-w-6xl mx-auto text-center">
          <div className="mb-8">
            <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Trophy className="w-10 h-10" />
            </div>
            <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">
              🔥 Let's innovate, collaborate, and shine in SIH 2025! 🔥
            </h3>
          </div>
          
          <div className="border-t border-gray-800 pt-8">
            <p className="text-gray-400">
              © 2025 Technocrats Institute of Technology Coding Club. All rights reserved.
            </p>
            <p className="text-gray-500 mt-2">
              Made with ❤️ for SIH 2025
            </p>
          </div>
        </div>
      </footer> */}
    </div>
  );
};

export default HackathonWebsite;