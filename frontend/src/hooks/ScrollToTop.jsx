import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Loader from "../components/Loader";

export default function ScrollToTop() {
  const { pathname } = useLocation();
  const [isScrolling, setIsScrolling] = useState(false);

  useEffect(() => {
    const scrollToTop = () => {
      setIsScrolling(true); // show loader

      const start = window.scrollY;
      const duration = 700; // ms
      const startTime = performance.now();

      const easeInOutCubic = (t) =>
        t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

      const animateScroll = (currentTime) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const eased = easeInOutCubic(progress);

        window.scrollTo(0, start * (1 - eased));

        if (elapsed < duration) {
          requestAnimationFrame(animateScroll);
        } else {
          setIsScrolling(false); // hide loader
        }
      };

      requestAnimationFrame(animateScroll);
    };

    scrollToTop();
  }, [pathname]);

  return (
    <>
      {isScrolling && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-[9999]">
          {/* Simple spinner */}
          <Loader />
        </div>
      )}
    </>
  );
}
