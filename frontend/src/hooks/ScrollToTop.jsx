import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop({ duration = 700 }) {
  const { pathname } = useLocation();
  const [isScrolling, setIsScrolling] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Start scroll
    setIsScrolling(true);

    const start = window.scrollY;
    const startTime = performance.now();

    const easeInOutCubic = (t) =>
      t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

    const animateScroll = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = easeInOutCubic(progress);

      window.scrollTo(0, start * (1 - eased));

      if (progress < 1) {
        requestAnimationFrame(animateScroll);
      } else {
        // Scroll done, hide overlay after a short delay (like loader)
        setTimeout(() => setIsScrolling(false), 100);
      }
    };

    requestAnimationFrame(animateScroll);
  }, [pathname, duration]);

  return isScrolling ? (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-black/50 z-[9999]">
      {/* Spinner overlay */}
      <div className="w-16 h-16 border-4 border-t-[#FF4F01] border-gray-200 rounded-full animate-spin"></div>
    </div>
  ) : null;
}
