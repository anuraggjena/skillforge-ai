"use client";

import { useState, useEffect } from "react";
import { ChevronUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);
  const [bottomOffset, setBottomOffset] = useState(24);

  useEffect(() => {
    const handleScroll = () => {
      // Toggle visibility after 250px scroll
      if (window.scrollY > 250) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }

      // Check footer position so button floats cleanly above the footer
      const footer = document.querySelector("footer");
      if (footer) {
        const footerRect = footer.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        if (footerRect.top < windowHeight) {
          const overlap = windowHeight - footerRect.top;
          setBottomOffset(overlap + 20);
        } else {
          setBottomOffset(24);
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 10 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          onClick={scrollToTop}
          type="button"
          style={{ bottom: `${bottomOffset}px` }}
          aria-label="Scroll to top of page"
          className="fixed right-6 sm:right-8 z-50 p-3 sm:p-3.5 rounded-full border border-[#E8E5D5]/20 hover:border-[#E8E5D5]/60 bg-[#121212]/90 hover:bg-[#1C1C1C] text-[#E8E5D5] hover:text-white shadow-2xl backdrop-blur-md transition-colors cursor-pointer group flex items-center justify-center"
        >
          <ChevronUp className="w-5 h-5 text-[#E8E5D5]/80 group-hover:text-white group-hover:-translate-y-0.5 transition-all" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
