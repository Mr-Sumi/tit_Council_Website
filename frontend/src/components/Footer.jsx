import { FaFacebookF, FaInstagram, FaLinkedinIn, FaYoutube, FaWhatsapp, FaTwitter, FaChevronRight, FaMapMarkerAlt, FaPhone, FaEnvelope } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-[#0a0a0a] text-gray-300 py-12 shadow-[0_-10px_30px_rgba(0,0,0,0.15)]">
      {/* Main Content */}
      <div className="max-w-[90vw] w-[95%] mx-auto grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
        
        {/* About Us */}
        <div>
          <h3 className="text-white text-lg font-semibold relative pb-3 after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-10 after:h-[2px] after:bg-gradient-to-r after:from-primary after:to-transparent">
            About Us
          </h3>
          <p className="text-gray-400 text-sm leading-relaxed mt-4">
            The Student Council is dedicated to fostering leadership, organizing engaging events, and creating memorable experiences for all students. Join us in making a difference in our college community.
          </p>

          <div className="flex flex-wrap gap-3 mt-5">
            <SocialIcon href="https://www.facebook.com/share/18qA1YcmoG/" icon={<FaFacebookF />} />
            <SocialIcon href="https://www.instagram.com/studentcounciltit?igsh=YXkxd3pjNzBiaTg0" icon={<FaInstagram />} />
            <SocialIcon href="https://www.linkedin.com/company/student-council-tit/" icon={<FaLinkedinIn />} />
            <SocialIcon href="https://www.youtube.com/@StudentCouncilTIT" icon={<FaYoutube />} />
            <SocialIcon href="https://whatsapp.com/channel/0029VbAZ9kHE50UqzJksX81Z" icon={<FaWhatsapp />} />
            <SocialIcon href="https://x.com/TITstucouncil?t=Q8pg5x2aPE5UllVKYUEgrw&s=08" icon={<FaTwitter />} />
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-white text-lg font-semibold relative pb-3 after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-10 after:h-[2px] after:bg-gradient-to-r after:from-primary after:to-transparent">
            Quick Links
          </h3>
          <ul className="mt-4 space-y-3">
            <FooterLink href="/" label="Home" />
            <FooterLink href="/members" label="Members" />
            <FooterLink href="/clubs" label="Clubs" />
            <FooterLink href="/faculty" label="Mentors" />
            <FooterLink href="/gallery" label="Event Gallery" />
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-white text-lg font-semibold relative pb-3 after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-10 after:h-[2px] after:bg-gradient-to-r after:from-primary after:to-transparent">
            Contact Info
          </h3>
          <ul className="mt-4 space-y-4 text-sm">
            <li className="flex gap-3 items-start">
              <FaMapMarkerAlt className="text-primary flex-shrink-0 mt-1" />
              <span>
                TIT Technocrats Group Campus, Anand Nagar, BHEL Bhopal - 462021, Madhya Pradesh, India
              </span>
            </li>
            <li className="flex gap-3 items-center">
              <FaPhone className="text-primary" />
              <span>+91 9113149346</span>
            </li>
            <li className="flex gap-3 items-center">
              <FaEnvelope className="text-primary" />
              <span>studentcouncil@technocratsgroup.edu.in</span>
            </li>
          </ul>
        </div>

        {/* Stay Updated */}
        <div>
          <h3 className="text-white text-lg font-semibold relative pb-3 after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-10 after:h-[2px] after:bg-gradient-to-r after:from-primary after:to-transparent">
            Stay Updated
          </h3>
          <p className="text-gray-400 text-sm mt-4">
            Subscribe to our newsletter for the latest events, activities, and announcements.
          </p>
          <a href="https://forms.visme.co/fv/ojkxvmn1-wp3yd6" target="_blank" rel="noopener noreferrer">
            <button className="mt-5 bg-primary text-white px-5 py-2 rounded-lg hover:bg-primary-dark transition-all duration-300">
              Subscribe Now
            </button>
          </a>
        </div>
      </div>

      {/* Developer Team Button */}
      {/* <div className="mt-10 text-center">
        <a
          href="/Dev"
          className="relative inline-block px-6 py-2 border border-primary text-primary font-medium rounded-lg overflow-hidden group"
        >
          <span className="relative z-10">Developer Team</span>
          <span className="absolute inset-0 bg-primary transform scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-300 z-0"></span>
        </a>
      </div> */}

      {/* Footer Bottom */}
      <div className="mt-8 border-t border-gray-700 pt-5 text-center text-gray-400 text-sm">
        &copy; <span id="current-year">{new Date().getFullYear()}</span> Student Council. All rights reserved.
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
      className="w-10 h-10 flex items-center justify-center rounded-full border border-white/10 bg-white/5 hover:bg-gradient-to-r hover:from-primary hover:to-accent transition-all duration-300 hover:-translate-y-1"
    >
      {icon}
    </a>
  );
}

/* Footer Link Component */
function FooterLink({ href, label }) {
  return (
    <li>
      <a
        href={href}
        className="flex items-center gap-2 text-gray-400 hover:text-primary transition-all duration-300"
      >
        <FaChevronRight className="text-primary text-xs" />
        {label}
      </a>
    </li>
  );
}
