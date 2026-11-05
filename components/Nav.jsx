
"use client";

import { useEffect, useState } from "react";

const links = [
  { name: "Home", path: "#home" },
  { name: "About", path: "#about" },
  { name: "Services", path: "#services" },
  { name: "Projects", path: "#projects" },
  { name: "Resume", path: "/Resume.pdf", external: true },
  { name: "Certificates", path: "#certificates" },
  { name: "Contact", path: "#contact" },
];

export default function Nav() {
  const [activeSection, setActiveSection] = useState("#home");

  useEffect(() => {
    const sections = links
      .filter((link) => !link.external)
      .map((link) => document.querySelector(link.path))
      .filter(Boolean);

    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort(
            (a, b) =>
              a.boundingClientRect.top -
              b.boundingClientRect.top
          );

        if (visible.length > 0) {
          setActiveSection(`#${visible[0].target.id}`);
        }
      },
      {
        rootMargin: "-20% 0px -65% 0px",
        threshold: 0,
      }
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  function renderLink(link) {
    const isActive =
      !link.external && activeSection === link.path;

    return (
      <a
        key={link.name}
        href={link.path}
        target={link.external ? "_blank" : undefined}
        rel={
          link.external
            ? "noopener noreferrer"
            : undefined
        }
        onClick={() => {
          if (!link.external) {
            setActiveSection(link.path);
          }
        }}
        aria-current={isActive ? "location" : undefined}
        className={[
          "group relative whitespace-nowrap rounded-lg px-2.5 py-2",
          "text-[13px] font-medium transition-all duration-300 ease-out",
          "hover:-translate-y-[1px] hover:bg-[#5B8DEF]/[0.07]",
          isActive
            ? "text-[#8BAEFF]"
            : "text-white/65 hover:text-white",
        ].join(" ")}
      >
        {link.name}

        {link.external && (
          <span
            className="ml-1 text-white/40 transition-colors group-hover:text-[#8BAEFF]"
            aria-hidden="true"
          >
            ↗
          </span>
        )}

        {!link.external && (
          <span
            className={[
              "absolute bottom-0 left-2.5 right-2.5 h-[2px] origin-left rounded-full bg-[#5B8DEF]",
              "transition-all duration-300 ease-out",
              isActive
                ? "scale-x-100 opacity-100"
                : "scale-x-0 opacity-0",
            ].join(" ")}
          />
        )}
      </a>
    );
  }

  return (
    <nav
      aria-label="Main navigation"
      className="flex w-full items-center justify-between gap-5"
    >
      {/* LEFT: BRAND */}

      <a
        href="#home"
        onClick={() => setActiveSection("#home")}
        className="group flex shrink-0 items-center gap-3"
      >
        <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#5B8DEF]/30 bg-[#5B8DEF]/10 font-mono text-sm font-bold text-[#8BAEFF] shadow-[0_0_20px_rgba(91,141,239,0.05)] transition-all duration-300 group-hover:-translate-y-0.5 group-hover:border-[#5B8DEF]/70 group-hover:bg-[#5B8DEF]/20 group-hover:shadow-[0_5px_20px_rgba(91,141,239,0.15)]">
          SK
        </span>

        <span className="leading-tight">
          <span className="block whitespace-nowrap text-sm font-semibold text-white transition-colors duration-300 group-hover:text-[#8BAEFF]">
            Shivani Kaiche
          </span>

          <span className="mt-1 block whitespace-nowrap font-mono text-[9px] uppercase tracking-widest text-white/40">
            Java Full-Stack Developer
          </span>
        </span>
      </a>

      {/* CENTER: NAVIGATION LINKS */}

      <div className="flex min-w-0 items-center justify-center gap-3 xl:gap-4">
        {links.map(renderLink)}
      </div>

      {/* RIGHT: CONTACT BUTTON */}

      <a
        href="#contact"
        onClick={() => setActiveSection("#contact")}
        className="group inline-flex shrink-0 items-center gap-2 whitespace-nowrap rounded-full border border-[#5B8DEF]/40 bg-[#5B8DEF]/[0.06] px-4 py-2.5 text-[13px] font-medium text-[#8BAEFF] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#5B8DEF] hover:bg-[#5B8DEF] hover:text-white hover:shadow-[0_5px_25px_rgba(91,141,239,0.22)]"
      >
        Get in Touch

        <span
          className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          aria-hidden="true"
        >
          ↗
        </span>
      </a>
    </nav>
  );
}
