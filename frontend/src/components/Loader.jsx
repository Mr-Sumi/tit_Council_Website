import React, { useEffect, useRef } from "react";

export default function Loader() {
  const preloaderRef = useRef(null);
  const loadingStatusRef = useRef(null);
  const progressBarRef = useRef(null);

  useEffect(() => {
    const preloader = preloaderRef.current;
    const loadingStatus = loadingStatusRef.current;
    const progressBar = progressBarRef.current;

    if (!preloader) {
      document.body.style.overflow = "";
      return;
    }

    const lockScroll = () => (document.body.style.overflow = "hidden");
    const unlockScroll = () => (document.body.style.overflow = "");
    lockScroll();

    const loadingMessages = [
      "Initializing...",
      "Loading content...",
      "Almost there...",
      "Preparing interface..."
    ];

    let messageIndex = 0;
    let messageTimerId = null;
    let progressAnimationId = null;
    let progressValue = 0;
    const maxPreloadMs = 10000;
    let preloaderFinished = false;

    // Letter animation delays
    const letterSpans = preloader.querySelectorAll(".loader-text span");
    letterSpans.forEach((span, index) => {
      span.style.animationDelay = `${0.08 * index}s`;
    });

    const startMessageCycle = () => {
      if (!loadingStatus) return;
      loadingStatus.textContent = loadingMessages[0];
      messageTimerId = setInterval(() => {
        messageIndex = (messageIndex + 1) % loadingMessages.length;
        loadingStatus.textContent = loadingMessages[messageIndex];
      }, 1500);
    };

    const setProgress = (target) => {
      if (!progressBar) return;
      const step = () => {
        if (preloaderFinished) return;
        const delta = (target - progressValue) * 0.08;
        progressValue += Math.max(delta, 0.4);
        if (progressValue > target) progressValue = target;
        progressBar.style.width = progressValue + "%";
        if (Math.abs(target - progressValue) > 0.5) {
          progressAnimationId = requestAnimationFrame(step);
        }
      };
      cancelAnimationFrame(progressAnimationId);
      progressAnimationId = requestAnimationFrame(step);
    };

    startMessageCycle();
    setProgress(90);

    const completeAndHide = () => {
      if (preloaderFinished) return;
      preloaderFinished = true;
      clearInterval(messageTimerId);
      cancelAnimationFrame(progressAnimationId);

      if (loadingStatus) loadingStatus.textContent = "Welcome!";
      if (progressBar) progressBar.style.width = "100%";

      setTimeout(() => {
        preloader.style.opacity = "0";
        preloader.style.transition = "opacity 0.5s ease";
        setTimeout(() => {
          preloader.style.display = "none";
          unlockScroll();
        }, 500);
      }, 300);
    };

    window.addEventListener("load", () => {
      setProgress(100);
      completeAndHide();
    }, { once: true });

    setTimeout(() => {
      setProgress(100);
      completeAndHide();
    }, maxPreloadMs);

    return () => {
      clearInterval(messageTimerId);
      cancelAnimationFrame(progressAnimationId);
    };
  }, []);

  return (
    <div
      ref={preloaderRef}
      className="fixed inset-0 flex items-center justify-center bg-black z-[9999] overflow-hidden"
    >
      <div className="relative flex flex-col items-center gap-10">
        
        {/* Loader ring */}
        <div className="relative w-40 h-40 flex items-center justify-center">
          <div className="absolute inset-0 border-4 border-transparent border-t-teal-300 border-r-teal-300 rounded-full animate-spin-slow"></div>
          <div className="absolute inset-0 border-4 border-transparent border-b-pink-500 border-l-pink-500 rounded-full animate-spin-slow-reverse"></div>

          {/* Logo */}
          <div className="absolute w-28 h-28 rounded-full bg-white/5 flex items-center justify-center overflow-hidden shadow-[0_0_30px_rgba(78,205,196,0.2)] animate-logoGlow">
            <img
              src="https://res.cloudinary.com/dlk5kntmy/image/upload/v1747502420/Student_council_vjzt0j.png"
              alt="Student Council Logo"
              className="w-[90px] h-[90px] object-contain drop-shadow-[0_0_8px_rgba(78,205,196,0.3)] opacity-0 animate-fadeInImage"
            />
          </div>
        </div>

        {/* Text + progress */}
        <div className="relative px-8 py-4 bg-white/5 rounded-xl border border-white/5 opacity-0 animate-appearScale">
          <div className="loader-text flex justify-center flex-wrap gap-1">
            {"STUDENT COUNCIL".split("").map((char, i) => (
              <span
                key={i}
                className="text-white text-lg font-medium uppercase opacity-0 translate-y-2 animate-revealText"
              >
                {char}
              </span>
            ))}
          </div>

          {/* Progress bar container */}
          <div className="absolute bottom-[-6px] left-0 w-full h-[6px] bg-white/10 overflow-hidden rounded-full">
            <div
              ref={progressBarRef}
              className="h-full w-0 rounded-full animate-progressShimmer"
              style={{
                backgroundImage: "linear-gradient(90deg, #14b8a6, #ec4899, #14b8a6)",
                backgroundSize: "200% 100%"
              }}
            ></div>
          </div>
        </div>

        {/* Loading status */}
        <div
          ref={loadingStatusRef}
          className="mt-2 text-white/60 text-[16px] tracking-[2px] uppercase"
        ></div>
      </div>

      {/* Animations */}
      <style>
        {`
        @keyframes spin-slow { to { transform: rotate(360deg); } }
        .animate-spin-slow { animation: spin-slow 2s linear infinite; }
        @keyframes spin-slow-reverse { to { transform: rotate(-360deg); } }
        .animate-spin-slow-reverse { animation: spin-slow-reverse 2s linear infinite; }

        @keyframes logoGlow {
          0%,100% { box-shadow: 0 0 20px rgba(78,205,196,0.2); }
          50% { box-shadow: 0 0 40px rgba(78,205,196,0.4); }
        }
        .animate-logoGlow { animation: logoGlow 2s ease-in-out infinite; }

        @keyframes fadeInImage {
          from { opacity: 0; transform: scale(0.92); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-fadeInImage { animation: fadeInImage 0.3s ease forwards; }

        @keyframes appearScale {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-appearScale { animation: appearScale 0.45s ease forwards 0.25s; }

        @keyframes revealText { to { opacity: 1; transform: translateY(0); } }
        .animate-revealText { animation: revealText 0.45s ease forwards; }

        /* New shimmer animation for progress bar */
        @keyframes progressShimmer {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
        .animate-progressShimmer {
          animation: progressShimmer 2s linear infinite;
        }
        `}
      </style>
    </div>
  );
}
