import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Compass, Users } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import assets from "../../data/assets.json";

gsap.registerPlugin(ScrollTrigger);

export default function HeroSection() {
  const videoRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    const content = contentRef.current;

    // Video scale & move animation
    gsap.to(video, {
      scale: 0.8,
      y: -100,
      ease: "power1.out",
      scrollTrigger: {
        trigger: video,
        start: "top top",
        end: "bottom top",
        scrub: true, // smooth scroll effect
      },
    });

    // Content fade out and move up
    gsap.to(content, {
      y: -80,
      opacity: 0.3,
      ease: "power1.out",
      scrollTrigger: {
        trigger: content,
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });
  }, []);

  return (
    <section className="relative h-screen w-full overflow-hidden font-sans">
      {/* Background Video */}
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover"
      >
        <source src={assets.videos.homeHero} type="video/mp4" />
      </video>

      {/* Dark Overlay + Gradient */}
      <div className="absolute inset-0 bg-black/70"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/30 to-black/90"></div>

      {/* Floating Glow Orbs */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(4)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-72 h-72 rounded-full bg-gradient-to-r from-indigo-500/20 to-purple-500/20 blur-3xl"
            initial={{ x: Math.random() * window.innerWidth, y: Math.random() * window.innerHeight }}
            animate={{ x: Math.random() * window.innerWidth, y: Math.random() * window.innerHeight }}
            transition={{ duration: 25, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }}
          />
        ))}
      </div>

      {/* Glass Card */}
      <div ref={contentRef} className="relative z-10 flex flex-col justify-center items-center h-full text-center px-6">
        <motion.div
          // initial={{ opacity: 0, y: 50 }}
          // animate={{ opacity: 1, y: 0 }}
          // transition={{ duration: 1, ease: "easeOut" }}
          // className="backdrop-blur-2xl bg-white/10 p-12 rounded-3xl shadow-[0_8px_40px_rgba(0,0,0,0.3)] border border-white/20 max-w-4xl"
        >
          <motion.h1
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 1 }}
            className="text-8xl font-extrabold tracking-tight bg-gradient-to-r from-indigo-200 via-white to-indigo-400 bg-clip-text text-transparent flex items-center justify-center gap-3"
          >
            STUDENT COUNCIL
          </motion.h1>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 1 }}
            className="text-lg md:text-2xl mt-4 text-gray-200 font-medium tracking-wide"
          >
            Empowering <span className="text-indigo-400 font-semibold">Students</span> • Building{" "}
            <span className="text-indigo-400 font-semibold">Leaders</span>
          </motion.h2>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
            className="mt-10 flex flex-wrap gap-6 justify-center"
          >
            <motion.a
              href="/clubs"
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 px-8 py-3 rounded-full bg-indigo-500 hover:bg-indigo-600 text-white font-medium shadow-lg transition-all duration-300 hover:shadow-indigo-500/40"
            >
              <Compass className="w-5 h-5" /> Explore Clubs
            </motion.a>

            <motion.a
              href="/team"
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 px-8 py-3 rounded-full bg-white/20 hover:bg-white/30 text-white font-medium shadow-lg transition-all duration-300 hover:shadow-white/40"
            >
              <Users className="w-5 h-5" /> Meet Our Team
            </motion.a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
