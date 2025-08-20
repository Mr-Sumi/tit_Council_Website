import { useState, useEffect, useRef } from "react";

export default function useHideOnScroll(threshold = 5) {
  const [showNav, setShowNav] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Always show nav near top
      if (currentScrollY <= 50) {
        setShowNav(true);
        lastScrollY.current = currentScrollY;
        return;
      }

      // Ignore small scrolls
      if (Math.abs(currentScrollY - lastScrollY.current) < threshold) return;

      // NORMAL LOGIC: scroll down → hide, scroll up → show
      if (currentScrollY > lastScrollY.current) {
        setShowNav(false); // scrolling down
      } else {
        setShowNav(true); // scrolling up
      }

      lastScrollY.current = currentScrollY;
    };

    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);

  return showNav;
}
