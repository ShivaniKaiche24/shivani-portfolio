
"use client";

import Nav from "./Nav";
import MobileNav from "./MobileNav";
import { motion, useAnimation } from "framer-motion";
import { useEffect, useRef } from "react";

const ENTRANCE_DELAY = 0.8;

const Header = () => {
  const controls = useAnimation();
  const lastScrollY = useRef(0);
  const ticking = useRef(false);
  const ready = useRef(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      ready.current = true;

      controls.start({
        y: 0,
        opacity: 1,
        transition: { duration: 0.55, ease: "easeOut" },
      });
    }, ENTRANCE_DELAY * 1000);

    const update = () => {
      ticking.current = false;
      if (!ready.current) return;

      const current = window.scrollY;
      const hide = current > lastScrollY.current && current > 80;

      controls.start({
        y: hide ? "-100%" : 0,
        opacity: hide ? 0 : 1,
        transition: {
          duration: 0.35,
          ease: [0.22, 1, 0.36, 1],
        },
      });

      lastScrollY.current = current;
    };

    const handleScroll = () => {
      if (!ticking.current) {
        ticking.current = true;
        requestAnimationFrame(update);
      }
    };

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      clearTimeout(timer);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [controls]);

  return (
    <motion.header
      animate={controls}
      initial={{ opacity: 0, y: "-100%" }}
      className="fixed inset-x-0 top-0 z-50 w-full text-white"
    >
      <div className="relative w-full border-b border-white/[0.08] bg-[#090D12]/85 shadow-[0_8px_30px_rgba(0,0,0,0.2)] backdrop-blur-2xl">

        {/* Subtle blue top highlight */}
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#5B8DEF]/50 to-transparent" />

        {/* Same container as homepage */}
        <div className="mx-auto flex h-[72px] w-full max-w-7xl items-center px-6 lg:px-12">

          {/* Desktop navigation */}
          <div className="hidden w-full xl:block">
            <Nav />
          </div>

          {/* Mobile navigation */}
          <div className="flex w-full items-center justify-end xl:hidden">
            <MobileNav />
          </div>

        </div>
      </div>
    </motion.header>
  );
};

export default Header;
