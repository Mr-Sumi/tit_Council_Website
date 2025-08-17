import { useState, useEffect, useRef } from "react";

export default function useHideOnScroll(threshold = 5) {
  const [showNav, setShowNav] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (Math.abs(currentScrollY - lastScrollY.current) < threshold) {
        return; // ignore small scrolls
      }

      if (currentScrollY === 0) {
        setShowNav(true);
      } else if (currentScrollY > lastScrollY.current) {
        setShowNav(false); // scrolling down
      } else {
        setShowNav(true); // scrolling up
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [threshold]);

  return showNav;
}
