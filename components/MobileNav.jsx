
"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const links = [
  { name: "Home", path: "#home", type: "scroll" },
  { name: "Services", path: "#services", type: "scroll" },
  { name: "Projects", path: "#projects", type: "scroll" },
  { name: "Certificates", path: "#certificates", type: "scroll" },
  { name: "Resume", path: "/Resume.pdf", type: "file" },
  { name: "Contact", path: "#contact", type: "scroll" },
];

const MobileNav = () => {
  const [open, setOpen] = useState(false);

  const handleScroll = (id) => {
    const section = document.querySelector(id);

    if (section) {
      section.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }

    setOpen(false);
  };

  const handleResume = (path) => {
    window.open(path, "_blank", "noopener,noreferrer");
    setOpen(false);
  };

  return (
    <div className="relative z-50 xl:hidden">

      {/* Menu Toggle */}

      <motion.button
        type="button"
        whileTap={{ scale: 0.92 }}
        onClick={() => setOpen(!open)}
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        className="flex items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] p-2.5 text-white/80 transition-all duration-300 hover:border-[#5B8DEF]/50 hover:bg-[#5B8DEF]/10 hover:text-[#8BAEFF] focus:outline-none"
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={open ? "close" : "open"}
            initial={{ opacity: 0, rotate: -45, scale: 0.8 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            exit={{ opacity: 0, rotate: 45, scale: 0.8 }}
            transition={{ duration: 0.18 }}
          >
            {open ? <X size={23} /> : <Menu size={23} />}
          </motion.span>
        </AnimatePresence>
      </motion.button>

      {/* Mobile Menu */}

      <AnimatePresence>
        {open && (
          <motion.div
            key="mobile-menu"
            initial={{
              opacity: 0,
              y: -12,
              scale: 0.97,
            }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
            }}
            exit={{
              opacity: 0,
              y: -10,
              scale: 0.97,
            }}
            transition={{
              duration: 0.25,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="absolute right-0 top-full mt-4 flex w-60 flex-col gap-1 overflow-hidden rounded-2xl border border-white/10 bg-[#0D1218]/95 p-2 shadow-[0_15px_60px_rgba(0,0,0,0.5)] backdrop-blur-2xl"
          >
            {/* Menu top accent */}
            <div className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-[#5B8DEF]/60 to-transparent" />

            {links.map((link, index) => (
              <motion.button
                key={link.name}
                type="button"
                onClick={() =>
                  link.type === "scroll"
                    ? handleScroll(link.path)
                    : handleResume(link.path)
                }
                initial={{ opacity: 0, x: 12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  delay: 0.04 * index,
                  duration: 0.25,
                }}
                whileTap={{ scale: 0.98 }}
                className="group flex items-center justify-between rounded-xl px-4 py-3 text-left text-sm text-white/70 transition-all duration-300 hover:bg-[#5B8DEF]/10 hover:pl-5 hover:text-[#8BAEFF]"
              >
                {link.name}

                <span className="translate-x-1 text-[#5B8DEF] opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100">
                  ↗
                </span>
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MobileNav;
