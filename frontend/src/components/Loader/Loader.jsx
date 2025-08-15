import React, { useEffect, useRef } from "react";
import './index.css'

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

    const lockScroll = () => {
      document.body.style.overflow = "hidden";
    };
    const unlockScroll = () => {
      document.body.style.overflow = "";
    };
    lockScroll();

    const loadingMessages = [
      "Initializing...",
      "Loading content...",
      "Almost there...",
      "Preparing interface...",
    ];

    let messageIndex = 0;
    let messageTimerId = null;
    let progressAnimationId = null;
    let progressValue = 0;
    const maxPreloadMs = 100000;
    let preloaderFinished = false;

    // Sequential letter animation
    try {
      const letterSpans = preloader.querySelectorAll(".loader-text span");
      if (letterSpans.length) {
        const baseDelaySeconds = 0.08;
        letterSpans.forEach((span, index) => {
          span.style.animationName = span.style.animationName || "revealText";
          span.style.animationDuration = "0.5s";
          span.style.animationTimingFunction = "ease";
          span.style.animationFillMode = "forwards";
          span.style.animationDelay = `${baseDelaySeconds * index}s`;
          span.style.willChange = "opacity, transform";
        });
      }
    } catch (e) {
       console.error("Error during letter animation:", e);
    }

    const startMessageCycle = () => {
      if (!loadingStatus) return;
      loadingStatus.textContent = loadingMessages[0];
      messageTimerId = setInterval(() => {
        messageIndex = (messageIndex + 1) % loadingMessages.length;
        loadingStatus.textContent = loadingMessages[messageIndex];
      }, 800);
    };

    const setProgress = (target) => {
      if (!progressBar) return;
      const step = () => {
        if (preloaderFinished) return;
        const delta = (target - progressValue) * 0.08;
        progressValue += Math.max(delta, 0.2);
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

    window.addEventListener(
      "load",
      () => {
        setProgress(100);
        completeAndHide();
      },
      { once: true }
    );

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
    <div ref={preloaderRef} className="preloader">
      <div className="loader-content">
        <div className="loader-ring">
          <div className="logo-container">
            <img
              src="https://res.cloudinary.com/dlk5kntmy/image/upload/v1747502420/Student_council_vjzt0j.png"
              alt="Student Council Logo"
            />
          </div>
        </div>

        <div className="loader-text-container">
          <div className="loader-text">
            {"STUDENT COUNCIL".split("").map((char, i) => (
              <span key={i}>{char}</span>
            ))}
          </div>

          <div className="loading-progress">
            <div ref={progressBarRef} className="progress-bar"></div>
          </div>
        </div>

        <div ref={loadingStatusRef} className="loading-status">
          Loading...
        </div>
      </div>
    </div>
  );
}
