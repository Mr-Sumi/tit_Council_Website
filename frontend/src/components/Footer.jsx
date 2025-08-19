import React from "react";
import { Link } from "react-router-dom";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
  FaWhatsapp,
  FaTwitter,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
  FaHome,
  FaUsers,
  FaUniversity,
  FaChalkboardTeacher,
  FaImages,
  FaInfo,
} from "react-icons/fa";
import { PiLinkSimpleBold } from "react-icons/pi";

export default function Footer() {
  return (
    <footer className="relative bg-[#0a0a0a] text-gray-300 pt-16 pb-10 overflow-hidden">
      {/* Main Content */}
      <div className="relative z-10 max-w-[95vw] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10">
        {/* About Us */}
        <div>
          <h3 className="flex items-center gap-2 text-white text-xl font-bold uppercase tracking-wide relative pb-3 after:absolute after:left-0 after:bottom-0 after:w-32 sm:after:w-40 after:h-[3px] after:bg-gradient-to-r after:from-[#C8101A] after:to-[#FF4F01]">
            <FaInfo className="text-[#FF4F01]" />
            About Us
          </h3>
          <p className="text-gray-400 text-base sm:text-lg leading-relaxed mt-4">
            The Student Council is dedicated to fostering leadership, organizing
            engaging events, and creating memorable experiences for all
            students. Join us in making a difference in our college community.
          </p>

          {/* Social Links */}
          <div className="flex flex-wrap gap-2 sm:gap-3 mt-6">
            <SocialIcon href="https://www.facebook.com/share/18qA1YcmoG/" icon={<FaFacebookF />} />
            <SocialIcon href="https://www.instagram.com/studentcounciltit?igsh=YXkxd3pjNzBiaTg0" icon={<FaInstagram />} />
            <SocialIcon href="https://www.linkedin.com/company/student-council-tit/" icon={<FaLinkedinIn />} />
            <SocialIcon href="https://www.youtube.com/@StudentCouncilTIT" icon={<FaYoutube />} />
            <SocialIcon href="https://whatsapp.com/channel/0029VbAZ9kHE50UqzJksX81Z" icon={<FaWhatsapp />} />
            <SocialIcon href="https://x.com/TITstucouncil" icon={<FaTwitter />} />
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="flex items-center gap-2 text-white text-xl font-bold uppercase tracking-wide relative pb-3 after:absolute after:left-0 after:bottom-0 after:w-32 sm:after:w-40 after:h-[3px] after:bg-gradient-to-r after:from-[#C8101A] after:to-[#FF4F01]">
            <PiLinkSimpleBold className="text-[#FF4F01]" />
            Quick Links
          </h3>

          <ul className="mt-5 space-y-3 sm:space-y-4">
            <FooterLink to="/" label="Home" icon={FaHome} />
            <FooterLink to="/team" label="Members" icon={FaUsers} />
            <FooterLink to="/clubs" label="Clubs" icon={FaUniversity} />
            <FooterLink to="/mentors" label="Mentors" icon={FaChalkboardTeacher} />
            <FooterLink to="/gallery" label="Event Gallery" icon={FaImages} />
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="flex items-center gap-2 text-white text-xl font-bold uppercase tracking-wide relative pb-3 after:absolute after:left-0 after:bottom-0 after:w-32 sm:after:w-40 after:h-[3px] after:bg-gradient-to-r after:from-[#C8101A] after:to-[#FF4F01]">
            <FaPhoneAlt className="text-[#FF4F01]" />
            Contact Info
          </h3>
          <ul className="mt-5 space-y-3 sm:space-y-4 text-base sm:text-lg">
            <li className="flex gap-3 items-start group">
              <FaMapMarkerAlt className="text-[#FF4F01] flex-shrink-0 mt-1 group-hover:scale-125 transition-transform duration-300" />
              <span>
                TIT Technocrats Group Campus, Anand Nagar, BHEL Bhopal - 462021,
                Madhya Pradesh, India
              </span>
            </li>
            <li className="flex gap-3 items-center group">
              <FaEnvelope className="text-[#FF4F01] group-hover:scale-125 transition-transform duration-300" />
              <span>studentcouncil@technocratsgroup.edu.in</span>
            </li>
          </ul>
        </div>

        {/* Developer Button */}
        <div className="flex items-center justify-center sm:justify-start">
          <Link
            to="/developers"
            className="relative inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-4 font-mono font-bold text-base sm:text-lg md:text-xl rounded-xl overflow-hidden group transition-all duration-500 text-white bg-[#111] border border-[#FF4F01] shadow-[0_0_15px_rgba(255,79,1,0.5)]"
          >
            <span className="relative z-10 flex items-center gap-2">
              <span className="group-hover:text-black transition-colors duration-300">
                Developer Team
              </span>
              <span className="w-[2px] h-5 sm:h-6 bg-[#FF4F01] animate-pulse shadow-[0_0_8px_#FF4F01]"></span>
            </span>
            <span className="absolute inset-0 bg-gradient-to-r from-[#C8101A] via-[#FF4F01] to-[#FFF9D5] transform scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-700 z-0"></span>
            <span className="absolute inset-0 rounded-xl border border-[#FF4F01] opacity-40 blur-md group-hover:opacity-100 group-hover:blur-xl transition-all duration-500"></span>
          </Link>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="relative z-10 mt-12 border-t border-gray-700 pt-6 text-center text-gray-400 text-sm sm:text-base">
        &copy; {new Date().getFullYear()} Student Council. All rights reserved.
      </div>
    </footer>
  );
}

/* Social Icon Component */
function SocialIcon({ href, icon }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-full border border-white/10 bg-white/15 text-gray-300 hover:text-black hover:bg-white/80 transition-all duration-300"
    >
      {icon}
    </a>
  );
}

/* Footer Link Component */
function FooterLink({ to, label, icon: Icon }) {
  return (
    <li>
      <Link
        to={to}
        className="flex items-center gap-2 sm:gap-3 text-gray-300 hover:text-[#FFF9D5] transition-all duration-300 group"
      >
        <Icon className="text-xl sm:text-2xl text-[#FF4F01] group-hover:scale-125 transition-transform duration-300" />
        <span className="relative font-bold text-sm sm:text-base">
          {label}
          <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-gradient-to-r from-[#C8101A] via-[#FF4F01] to-[#FFF9D5] transition-all duration-500 group-hover:w-full"></span>
        </span>
      </Link>
    </li>
  );
}
