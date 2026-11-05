"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiArrowUp } from "react-icons/fi";

const ScrollToTop = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) setVisible(true);
      else setVisible(false);
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          key="scroll-top"
          onClick={scrollToTop}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          className="fixed bottom-8 right-8 z-50 w-12 h-12 flex items-center justify-center 
                     rounded-full bg-[#0A0A0A]/60 border border-blue-400/60 
                     text-blue-400 shadow-[0_0_20px_rgba(59,130,246,0.3)] 
                     backdrop-blur-md hover:bg-blue-500 hover:text-white 
                     hover:shadow-[0_0_30px_rgba(59,130,246,0.5)] 
                     transition-all duration-500"
          aria-label="Scroll to top"
        >
          <FiArrowUp className="text-2xl" />
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default ScrollToTop;
