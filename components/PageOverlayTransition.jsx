
"use client";

import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const PageOverlayTransition = () => {
  const pathname = usePathname();
  const [isAnimating, setIsAnimating] = useState(true);

  useEffect(() => {
    setIsAnimating(true);

    const timer = setTimeout(() => {
      setIsAnimating(false);
    }, 550);

    return () => clearTimeout(timer);
  }, [pathname]);

  return (
    <AnimatePresence>
      {isAnimating && (
        <motion.div
          key={pathname}
          className="pointer-events-none fixed inset-0 z-[70] overflow-hidden"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{
            opacity: 0,
            transition: { duration: 0.25 },
          }}
          aria-hidden="true"
        >
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: "100%" }}
            transition={{
              duration: 0.65,
              ease: [0.76, 0, 0.24, 1],
            }}
            className="absolute inset-0 w-full bg-gradient-to-r from-[#090D12] via-[#17243B] to-[#5B8DEF]/20"
          />

          <motion.div
            initial={{ x: "-100%", opacity: 0 }}
            animate={{
              x: "100%",
              opacity: [0, 0.18, 0],
            }}
            transition={{
              duration: 0.65,
              ease: "easeInOut",
            }}
            className="absolute inset-0 bg-gradient-to-r from-transparent via-[#8BAEFF]/20 to-transparent blur-2xl"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PageOverlayTransition;
