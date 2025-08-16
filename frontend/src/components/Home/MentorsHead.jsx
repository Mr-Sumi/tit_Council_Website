import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import mentorsData from "../../data/Mentors-data.json";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react"; // optional icons

gsap.registerPlugin(ScrollTrigger);

export default function MentorsHead() {
  const cardsRef = useRef([]);
  const carouselRef = useRef(null);

  useEffect(() => {
    cardsRef.current.forEach((card, idx) => {
      gsap.fromTo(
        card,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: idx * 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );
    });
  }, []);

  const displayedMentors = mentorsData.mentorsHeads;

  const scrollCarousel = (direction) => {
    if (!carouselRef.current) return;
    const scrollAmount = carouselRef.current.offsetWidth / 2; // scroll half container width
    carouselRef.current.scrollBy({
      left: direction === "next" ? scrollAmount : -scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <section className="relative py-16 bg-gray-900 overflow-hidden">
      <div className="mx-auto px-6 text-center relative z-10">
        <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-12">
          Mentors
        </h2>

        {/* Carousel with buttons */}
        <div className="relative">
          {/* Buttons for mobile only */}
          <div className="absolute top-1/2 -translate-y-1/2 left-0 md:hidden z-20">
            <button
              onClick={() => scrollCarousel("prev")}
              className="p-2 bg-indigo-600 rounded-full text-white shadow-lg"
            >
              <ChevronLeft size={24} />
            </button>
          </div>
          <div className="absolute top-1/2 -translate-y-1/2 right-0 md:hidden z-20">
            <button
              onClick={() => scrollCarousel("next")}
              className="p-2 bg-indigo-600 rounded-full text-white shadow-lg"
            >
              <ChevronRight size={24} />
            </button>
          </div>

          {/* Horizontal Scrollable Carousel */}
          <div
            ref={carouselRef}
            className="flex gap-6 overflow-x-auto snap-x snap-mandatory py-4 px-2 scrollbar-hide"
          >
            {displayedMentors.map((mentor, idx) => (
              <div
                key={`${mentor.name}-${idx}`}
                ref={(el) => (cardsRef.current[idx] = el)}
                className="flex-shrink-0 w-72 md:w-80 bg-gray-800 rounded-2xl shadow-2xl overflow-hidden p-6 hover:scale-105 transition-transform duration-300 snap-center"
              >
                <img
                  src={mentor.img}
                  alt={mentor.name}
                  className="w-32 h-32 md:w-40 md:h-40 mx-auto rounded-2xl object-cover shadow-md"
                />
                <h3 className="text-lg mt-4 text-indigo-400 font-semibold uppercase">
                  {mentor.role}
                </h3>
                <h2 className="text-xl md:text-2xl font-bold mt-1 text-white">
                  {mentor.name}
                </h2>
              </div>
            ))}
          </div>
        </div>

        {/* Overlay Button */}
        <div className="mt-8 relative">
          <Link
            to="/mentors"
            className="inline-block px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-full transition-colors duration-200 shadow-lg"
          >
            View All Mentors
          </Link>
        </div>
      </div>
    </section>
  );
}
