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
      <div className="relative z-10 max-w-[90vw] w-[95%] mx-auto grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* About Us */}
        <div>
          <h3 className="flex items-center gap-2 text-white text-xl font-bold uppercase tracking-wide relative pb-3 after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-14 after:h-[3px] after:bg-gradient-to-r after:from-[#C8101A] after:to-[#FF4F01]">
            <FaInfo className="text-[#FF4F01]" />
            About Us
          </h3>
          <p className="text-gray-400 text-sm leading-relaxed mt-4">
            The Student Council is dedicated to fostering leadership, organizing
            engaging events, and creating memorable experiences for all
            students. Join us in making a difference in our college community.
          </p>

          {/* Social Links */}
          <div className="flex flex-wrap gap-3 mt-6">
            <SocialIcon
              href="https://www.facebook.com/share/18qA1YcmoG/"
              icon={<FaFacebookF />}
            />
            <SocialIcon
              href="https://www.instagram.com/studentcounciltit?igsh=YXkxd3pjNzBiaTg0"
              icon={<FaInstagram />}
            />
            <SocialIcon
              href="https://www.linkedin.com/company/student-council-tit/"
              icon={<FaLinkedinIn />}
            />
            <SocialIcon
              href="https://www.youtube.com/@StudentCouncilTIT"
              icon={<FaYoutube />}
            />
            <SocialIcon
              href="https://whatsapp.com/channel/0029VbAZ9kHE50UqzJksX81Z"
              icon={<FaWhatsapp />}
            />
            <SocialIcon
              href="https://x.com/TITstucouncil"
              icon={<FaTwitter />}
            />
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="flex items-center gap-2 text-white text-xl font-bold uppercase tracking-wide relative pb-3 after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-14 after:h-[3px] after:bg-gradient-to-r after:from-[#FF4F01] after:to-[#FFF9D5]">
            <PiLinkSimpleBold className="text-[#FF4F01]" />
            Quick Links
          </h3>

          <ul className="mt-5 space-y-4">
            <FooterLink to="/" label="Home" icon={FaHome} />
            <FooterLink to="/team" label="Members" icon={FaUsers} />
            <FooterLink to="/clubs" label="Clubs" icon={FaUniversity} />
            <FooterLink to="/mentors" label="Mentors" icon={FaChalkboardTeacher} />
            <FooterLink to="/gallery" label="Event Gallery" icon={FaImages} />
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="flex items-center gap-2 text-white text-xl font-bold uppercase tracking-wide relative pb-3 after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-14 after:h-[3px] after:bg-gradient-to-r after:from-[#C8101A] after:to-[#FF4F01]">
            <FaPhoneAlt className="text-[#FF4F01]" />
            Contact Info
          </h3>
          <ul className="mt-5 space-y-4 text-sm">
            <li className="flex gap-3 items-start group">
              <FaMapMarkerAlt className="text-[#FF4F01] flex-shrink-0 mt-1 group-hover:scale-125 transition-transform duration-300" />
              <span>
                TIT Technocrats Group Campus, Anand Nagar, BHEL Bhopal - 462021,
                Madhya Pradesh, India
              </span>
            </li>
            {/* <li className="flex gap-3 items-center group">
              <FaPhoneAlt className="text-[#FF4F01] group-hover:scale-125 transition-transform duration-300" />
              <span>+91 9113149346</span>
            </li> */}
            <li className="flex gap-3 items-center group">
              <FaEnvelope className="text-[#FF4F01] group-hover:scale-125 transition-transform duration-300" />
              <span>studentcouncil@technocratsgroup.edu.in</span>
            </li>
          </ul>
        </div>

        {/* Developer Button */}
        <div className="flex items-center justify-center lg:justify-start">
          <Link
            to="/developers"
            className="relative inline-flex items-center gap-3 px-8 py-4 font-mono font-bold 
                      text-lg md:text-xl lg:text-2xl rounded-xl overflow-hidden group transition-all duration-500
                      text-white bg-[#111] border border-[#FF4F01] shadow-[0_0_15px_rgba(255,79,1,0.5)]"
          >
            <span className="relative z-10 flex items-center gap-2">
              <span className="group-hover:text-black transition-colors duration-300">
                Developer Team
              </span>
              <span className="w-[3px] h-6 md:h-7 lg:h-8 bg-[#FF4F01] animate-pulse shadow-[0_0_10px_#FF4F01]"></span>
            </span>
            <span className="absolute inset-0 bg-gradient-to-r from-[#C8101A] via-[#FF4F01] to-[#FFF9D5] 
                            transform scale-x-0 origin-left group-hover:scale-x-100 
                            transition-transform duration-700 z-0"></span>
            <span className="absolute inset-0 rounded-xl border border-[#FF4F01] opacity-40 blur-md 
                            group-hover:opacity-100 group-hover:blur-xl transition-all duration-500"></span>
          </Link>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="relative z-10 mt-12 border-t border-gray-700 pt-6 text-center text-gray-400 text-sm">
        &copy; <span id="current-year">{new Date().getFullYear()}</span> Student
        Council. All rights reserved.
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
      className="w-11 h-11 flex items-center justify-center rounded-full border border-white/10 
                 bg-white/5 text-gray-300 hover:text-white hover:bg-gradient-to-r 
                 hover:from-[#C8101A] hover:via-[#FF4F01] hover:to-[#FFF9D5] 
                 transition-all duration-500 hover:scale-110 shadow-md"
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
        className="flex items-center gap-3 text-gray-300 hover:text-[#FFF9D5] 
                   transition-all duration-300 group"
      >
        <Icon className="text-2xl text-[#FF4F01] group-hover:scale-125 transition-transform duration-300" />
        <span className="relative font-bold">
          {label}
          <span className="absolute left-0 -bottom-1 w-0 h-[3px] bg-gradient-to-r from-[#C8101A] via-[#FF4F01] to-[#FFF9D5] transition-all duration-500 group-hover:w-full"></span>
        </span>
      </Link>
    </li>
  );
}
