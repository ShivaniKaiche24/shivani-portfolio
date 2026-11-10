"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import {
  FiArrowDownRight,
  FiArrowUpRight,
  FiDownload,
  FiCode,
  FiLayers,
  FiTerminal,
  FiDatabase,
  FiShield,
  FiGitBranch,
  FiMail,
} from "react-icons/fi";
import {
  FaGithub,
  FaLinkedin,
} from "react-icons/fa";
import { SiLeetcode } from "react-icons/si";

import ParticlesBackground from "../components/ParticlesBackground";
import PageTransition from "../components/PageTransition";
import ScrollToTop from "@/components/ScrollToTop";
import { form } from "framer-motion/m";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: "easeOut" },
  },
};

const capabilities = [
  {
    number: "01",
    icon: <FiTerminal />,
    title: "Backend Engineering",
    description:
      "Java, Spring Boot, REST API development, service-layer design, and maintainable backend logic.",
  },
  {
    number: "02",
    icon: <FiShield />,
    title: "Authentication & Security",
    description:
      "JWT-based authentication, Spring Security, password hashing, and role-based access control.",
  },
  {
    number: "03",
    icon: <FiDatabase />,
    title: "Database Integration",
    description:
      "MySQL, MongoDB, JPA, Hibernate, entity relationships, and reliable data persistence.",
  },
  {
    number: "04",
    icon: <FiLayers />,
    title: "Full-Stack Development",
    description:
      "React interfaces, API integration, application features, debugging, and functional improvements.",
  },
];

const projects = [
  {
    index: "01",
    name: "CareerCompass",
    category: "AI · BACKEND ENGINEERING",
    description:
      "A career roadmap platform that uses Google's Gemini API to generate personalized career guidance.",
    stack: ["Java 17", "Spring Boot", "Spring Security", "JWT", "MySQL"],
    highlights: [
      "Secure JWT-based authentication",
      "JPA entity relationships and DTOs",
      "REST API testing and documentation",
    ],
    github:
      "https://github.com/ShivaniKaiche24/CareerCompass-Project",
    symbol: "CC",
  },
  {
    index: "02",
    name: "Agri-ALLiance",
    category: "FULL-STACK · AGRICULTURE",
    description:
      "An agricultural management platform supporting crop records, equipment bookings, and role-based workflows.",
    stack: ["Java", "Spring Boot", "MySQL", "React.js"],
    highlights: [
      "REST API development",
      "Normalized relational database design",
      "Role-based access control",
    ],
    github: "https://github.com/ShivaniKaiche24/CDAC-Project",
    symbol: "AA",
  },
  {
    index: "03",
    name: "Connectify",
    category: "FULL-STACK · SOCIAL PLATFORM",
    description:
      "A social platform with authentication, posts, likes, comments, and data-driven application features.",
    stack: ["React", "Node.js", "Express", "MongoDB"],
    highlights: [
      "Full-stack application workflows",
      "REST endpoints for core features",
      "MongoDB data management",
    ],
    github:
      "https://github.com/ShivaniKaiche24/Connectify-Project",
    symbol: "CX",
  },
  {
    index: "04",
    name: "Tune In",
    category: "WEB DEVELOPMENT · MUSIC",
    description:
      "A music-sharing web application featuring playlist management and dynamic interface updates.",
    stack: ["HTML", "CSS", "JavaScript", "MongoDB"],
    highlights: [
      "Playlist CRUD operations",
      "Dynamic user interface updates",
      "Database-backed functionality",
    ],
    github: "https://github.com/ShivaniKaiche24",
    symbol: "TI",
  },
];

const skillGroups = [
  {
    title: "Backend",
    skills: ["Java", "Spring Boot", "Spring MVC", "Spring Security", "JWT", "Hibernate", "JPA"],
  },
  {
    title: "Frontend",
    skills: ["React.js", "JavaScript", "HTML5", "CSS3", "Next.js"],
  },
  {
    title: "Data",
    skills: ["MySQL", "MongoDB", "SQL", "PL/SQL"],
  },
  {
    title: "Engineering Tools",
    skills: ["Git", "GitHub", "Postman", "Swagger", "Maven", "VS Code"],
  },
];

const education = [
  {
    period: "MAR 2024 — OCT 2024",
    degree: "PG Diploma in Advanced Computing",
    institution: "Centre for Development of Advanced Computing (CDAC), Pune",
  },
  {
    period: "AUG 2019 — JUL 2023",
    degree: "B.Tech · Instrumentation & Control Engineering",
    institution: "Vishwakarma Institute of Technology, Pune",
  },
];

const Home = () => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

    const handleContactSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget; // must be here, before any await

    setLoading(true);
    setSuccess("");
    setError("");

    try {
      const formData = new FormData(form);

      const payload = {
        name: formData.get("name"),
        email: formData.get("email"),
        subject: formData.get("subject"),
        message: formData.get("message"),
      };

      if (typeof window.grecaptcha === "undefined") {
        throw new Error("The contact verification service is unavailable.");
      }

      const token = await window.grecaptcha.execute(
        process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY,
        { action: "submit" }
      );

      const response = await fetch("/api/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...payload, token }),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(
          result.error || "Unable to send your message. Please try again."
        );
      }

      setSuccess("Message sent successfully. Thank you for reaching out!");
      form.reset();
    } catch (err) {
      setError(
        err.message || "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#090D12] font-sans text-[#F2F5F7]">
      <ParticlesBackground />

      <PageTransition>
        {/* NAVIGATION */}

        <header className="relative z-20 border-b border-white/[0.07]">
          <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 lg:px-12">
            <a href="#home" className="group flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#5B8DEF]/30 bg-[#5B8DEF]/10 font-mono text-sm font-bold text-[#5B8DEF] transition-transform group-hover:rotate-6">
                SK
              </span>

              <span className="leading-tight">
                <span className="block text-sm font-semibold tracking-wide">
                  Shivani Kaiche
                </span>
                <span className="mt-1 block text-[10px] uppercase tracking-[0.2em] text-white/40">
                  Developer Portfolio
                </span>
              </span>
            </a>

            <div className="hidden items-center gap-8 text-sm text-white/55 md:flex">
              <a className="transition hover:text-[#5B8DEF]" href="#about">
                About
              </a>
              <a className="transition hover:text-[#5B8DEF]" href="#skills">
                Skills
              </a>
              <a className="transition hover:text-[#5B8DEF]" href="#projects">
                Projects
              </a>
              <a className="transition hover:text-[#5B8DEF]" href="#education">
                Education
              </a>
            </div>

            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-full border border-[#5B8DEF]/40 px-4 py-2.5 text-xs font-semibold text-[#5B8DEF] transition hover:bg-[#5B8DEF] hover:text-[#090D12]"
            >
              Let's Talk <FiArrowUpRight />
            </a>
          </nav>
        </header>

        {/* HERO */}

        <section
          id="home"
          className="relative mx-auto flex min-h-[calc(100svh-190px)] max-w-7xl items-start px-6 pt-10 pb-4 lg:px-12 lg:pt-12 lg:pb-4">
          <div className="grid w-full items-center gap-16 lg:grid-cols-[1.2fr_0.8fr]">
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="relative z-10"
            >
              <div className="mb-8 inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.035] px-4 py-2">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#5B8DEF] opacity-50" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-[#5B8DEF]" />
                </span>

                <span className="font-mono text-[10px] uppercase tracking-[0.19em] text-white/65 sm:text-xs">
                  Java Full-Stack Developer · Pune, India
                </span>
              </div>

              <p className="mb-4 font-mono text-sm text-[#5B8DEF]">
                Hello, world. I'm
              </p>

             <h1 className="max-w-3xl text-4xl font-semibold leading-[1.05] tracking-[-0.055em] sm:text-5xl lg:text-[3.25rem] xl:text-[3.75rem]"> 
              Shivani
                <br />
                <span className="text-white/35">Kaiche</span>
                <span className="text-[#5B8DEF]">.</span>
              </h1>

              <div className="mt-5 flex min-h-7 items-center font-mono text-sm text-[#5B8DEF] sm:text-base">
                <span className="mr-3 text-white/25">{"//"}</span>
                <TypeAnimation
                  sequence={[
                    "Java & Spring Boot Developer",
                    1800,
                    "REST API Developer",
                    1800,
                    "Full-Stack Web Developer",
                    1800,
                    "Problem Solver",
                    1800,
                  ]}
                  speed={45}
                  repeat={Infinity}
                />
              </div>

              <p className="mt-6 max-w-2xl text-sm leading-7 text-white/60 sm:text-base">
                I develop web applications using Java, Spring Boot, React, and MySQL,
                 with a focus on backend development, REST API design, and database integration. 
                 I prioritize writing clean, maintainable code and building reliable solutions 
                 that meet project requirements.</p>

              <div className="mt-9 flex flex-col gap-4 sm:flex-row">
                <a
                  href="#projects"
                  className="group inline-flex items-center justify-center gap-3 rounded-xl bg-[#5B8DEF] px-6 py-4 text-sm font-bold text-[#090D12] transition duration-300 hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(91,141,239,0.16)]"
                >
                  Explore my work
                  <FiArrowUpRight className="text-lg transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                </a>

                <a
                  href="/Resume.pdf"
                  download
                  className="inline-flex items-center justify-center gap-3 rounded-xl border border-white/15 px-6 py-4 text-sm font-medium text-white/80 transition hover:border-white/40 hover:bg-white/[0.04]"
                >
                  <FiDownload />
                  Download resume
                </a>
              </div>

              <div className="mt-9 flex items-center gap-5">
                <a
                  aria-label="GitHub profile"
                  href="https://github.com/ShivaniKaiche24"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xl text-white/45 transition hover:text-[#5B8DEF]"
                >
                  <FaGithub />
                </a>

                <a
                  aria-label="LinkedIn profile"
                  href="https://www.linkedin.com/in/shivani-kaiche"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xl text-white/45 transition hover:text-[#5B8DEF]"
                >
                  <FaLinkedin />
                </a>

                <a
                  aria-label="LeetCode profile"
                  href="https://leetcode.com/u/shivanisk442"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xl text-white/45 transition hover:text-[#5B8DEF]"
                >
                  <SiLeetcode />
                </a>

                <span className="h-px w-12 bg-white/15" />

                <span className="font-mono text-[10px] uppercase tracking-[0.17em] text-white/35">
                  Code · Learn · Improve
                </span>
              </div>
            </motion.div>

            {/* RIGHT: PROFESSIONAL PROFILE PORTRAIT */}

            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={0.15}
              className="relative mx-auto flex w-full max-w-[420px] items-center justify-center lg:ml-auto lg:mr-0"
            >
              <div className="relative flex flex-col items-center">
                {/* subtle decorative background */}
                <div className="absolute inset-8 rounded-full bg-[#5B8DEF]/10 blur-3xl" />

                {/* portrait frame */}
               <div className="relative h-[240px] w-[240px] rounded-full bg-gradient-to-br from-[#5B8DEF] via-[#8B9FEF] to-[#5B8DEF] p-[3px] shadow-[0_20px_70px_rgba(91,141,239,0.18)] sm:h-[280px] sm:w-[280px]">
                <div className="h-full w-full overflow-hidden rounded-full border-[5px] border-[#10151C] bg-[#171C22]">
                    <img
                      src="/Photo.png"
                      alt="Shivani Kaiche"
                      className="h-full w-full object-cover object-[center_40%]"
                    />
                  </div>
                </div>

              </div>
            </motion.div>
          </div>
        </section>


        {/* ABOUT */}

        <section
          id="about"
          className="mx-auto max-w-7xl px-6 py-16 lg:px-12 lg:py-20"
        >
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="grid gap-12 lg:grid-cols-[0.7fr_1.3fr]"
          >
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-[#5B8DEF]">
                01 / A little about me
              </p>

             <h2 className="mt-4 text-2xl font-semibold tracking-tight sm:text-3xl">
                I build with
                <br />
                <span className="text-white/35">purpose.</span>
              </h2>
            </div>

            <div>
              <p className="text-lg leading-8 text-white/85 sm:text-xl">
                I'm a Java Full-Stack Developer and CDAC PG-DAC graduate
                with a background in Instrumentation and Control Engineering.
                I enjoy working through the details that make an application
                secure, useful, and maintainable.
              </p>

              <p className="mt-6 text-sm leading-7 text-white/55">
                My project experience includes building Spring Boot REST
                APIs, implementing JWT authentication and role-based access,
                designing relational data models, and testing endpoints with
                Postman and Swagger/OpenAPI. I've also worked with React.js
                and integrated frontend features with backend services.
              </p>

              <p className="mt-5 text-sm leading-7 text-white/55">
                I don't like guessing when something breaks. I'd rather
                slow down and figure out why it's happening before I
                change anything. I enjoy that kind of digging, and I'd
                like to keep doing it on real projects with a team that
                can teach me along the way.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                {[
                  "Analytical problem-solving",
                  "API-first thinking",
                  "Readable code",
                  "Collaborative development",
                ].map((value) => (
                  <span
                    key={value}
                    className="rounded-lg border border-white/10 bg-white/[0.025] px-3 py-2 text-xs text-white/65"
                  >
                    {value}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </section>

        {/* CAPABILITIES */}

        <section
          id="services"
          className="border-y border-white/[0.07] bg-[#0D1218] px-6 py-16 lg:px-12 lg:py-20"
        >
          <div className="mx-auto max-w-7xl">
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="mb-12 flex flex-col justify-between gap-5 md:flex-row md:items-end"
            >
              <div>
                <p className="font-mono text-xs uppercase tracking-[0.2em] text-[#5B8DEF]">
                  02 / What I can help with
                </p>
                <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
                  Practical skills.
                  <br />
                  <span className="text-white/35">Real applications.</span>
                </h2>
              </div>

              <p className="max-w-md leading-7 text-white/50">
                Looking for help with a backend feature, API integration,
                database connection, or an existing application bug?
                Let's define the problem and work through it.
              </p>
            </motion.div>

            <div className="grid gap-4 sm:grid-cols-2">
              {capabilities.map((item, index) => (
                <motion.article
                  key={item.number}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.08 }}
                  className="group rounded-2xl border border-white/[0.09] bg-white/[0.02] p-7 transition duration-300 hover:-translate-y-1 hover:border-[#5B8DEF]/30 hover:bg-[#5B8DEF]/[0.025] sm:p-9"
                >
                  <div className="flex items-start justify-between">
                    <span className="text-2xl text-[#5B8DEF]">
                      {item.icon}
                    </span>

                    <span className="font-mono text-xs text-white/25">
                      {item.number}
                    </span>
                  </div>

                  <h3 className="mt-8 text-xl font-semibold">
                    {item.title}
                  </h3>

                  <p className="mt-3 max-w-md text-sm leading-7 text-white/50">
                    {item.description}
                  </p>

                  <div className="mt-6 h-px w-10 bg-[#5B8DEF]/50 transition-all duration-300 group-hover:w-20" />
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        {/* SKILLS */}

        <section
          id="skills"
          className="mx-auto max-w-7xl px-6 py-16 lg:px-12 lg:py-20"
        >
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-[#5B8DEF]">
              03 / Technical toolkit
            </p>

            <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
              Tools of the trade.
            </h2>

            <p className="mt-4 max-w-xl leading-7 text-white/50">
              The technologies I've used across my projects and technical
              practice.
            </p>
          </motion.div>

          <div className="mt-12 grid gap-4 sm:grid-cols-2">
            {skillGroups.map((group, index) => (
              <motion.div
                key={group.title}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ delay: index * 0.07 }}
                className="rounded-2xl border border-white/[0.09] bg-white/[0.02] p-6 sm:p-8"
              >
                <h3 className="font-mono text-xs uppercase tracking-[0.15em] text-[#5B8DEF]">
                  {group.title}
                </h3>

                <div className="mt-6 flex flex-wrap gap-2">
                  {group.skills.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-lg border border-white/10 bg-[#0D1218] px-3 py-2 text-sm text-white/70 transition hover:border-[#5B8DEF]/30 hover:text-white"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* PROJECTS */}

        <section
          id="projects"
          className="border-y border-white/[0.07] bg-[#0D1218] px-6 py-16 lg:px-12 lg:py-20"
        >
          <div className="mx-auto max-w-7xl">
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="flex flex-col justify-between gap-6 md:flex-row md:items-end"
            >
              <div>
                <p className="font-mono text-xs uppercase tracking-[0.2em] text-[#5B8DEF]">
                  04 / Selected work
                </p>

                <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
                  Built, tested,
                  <br />
                  <span className="text-white/35">and learned from.</span>
                </h2>
              </div>

              <a
                href="https://github.com/ShivaniKaiche24"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-white/60 transition hover:text-[#5B8DEF]"
              >
                More on GitHub <FiArrowUpRight />
              </a>
            </motion.div>

            <div className="mt-12 grid gap-5 lg:grid-cols-2">
              {projects.map((project, index) => (
                <motion.article
                  key={project.name}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{ delay: index * 0.07 }}
                  className="group overflow-hidden rounded-2xl border border-white/[0.09] bg-[#090D12] transition duration-300 hover:border-[#5B8DEF]/30"
                >
                  <div className="relative overflow-hidden border-b border-white/[0.08] bg-[#101820] p-6 sm:p-8">
                    <div className="absolute right-5 top-4 font-mono text-xs text-white/25">
                      PROJECT / {project.index}
                    </div>

                    <div className="flex min-h-32 items-center justify-between gap-4">
                      <div>
                        <p className="font-mono text-[10px] tracking-[0.17em] text-[#5B8DEF]">
                          {project.category}
                        </p>

                        <h3 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
                          {project.name}
                          <span className="text-[#5B8DEF]">.</span>
                        </h3>
                      </div>

                      <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl border border-[#5B8DEF]/20 bg-[#5B8DEF]/[0.06] font-mono text-xl font-bold text-[#5B8DEF] transition duration-300 group-hover:rotate-3 group-hover:scale-105">
                        {project.symbol}
                      </div>
                    </div>
                  </div>

                  <div className="p-6 sm:p-8">
                    <p className="leading-7 text-white/60">
                      {project.description}
                    </p>

                    <div className="mt-5 flex flex-wrap gap-2">
                      {project.stack.map((tech) => (
                        <span
                          key={tech}
                          className="rounded-md bg-white/[0.055] px-2.5 py-1.5 font-mono text-[10px] text-white/55"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    <ul className="mt-6 space-y-3">
                      {project.highlights.map((highlight) => (
                        <li
                          key={highlight}
                          className="flex items-start gap-3 text-sm text-white/55"
                        >
                          <span className="mt-1 text-[#5B8DEF]">↗</span>
                          {highlight}
                        </li>
                      ))}
                    </ul>

                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-8 inline-flex items-center gap-2 border-b border-white/15 pb-2 text-sm font-medium text-white/80 transition hover:border-[#5B8DEF] hover:text-[#5B8DEF]"
                    >
                      Explore repository <FiArrowUpRight />
                    </a>
                  </div>
                </motion.article>
              ))}
            </div>

            <p className="mt-6 text-xs leading-6 text-white/35">
              Project descriptions summarize development work. Open each
              repository to review the available source code and documentation.
            </p>
          </div>
        </section>

        {/* EDUCATION */}

        <section
          id="education"
          className="mx-auto max-w-7xl px-6 py-16 lg:px-12 lg:py-20"
        >
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-[#5B8DEF]">
            05 / Education
          </p>

          <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
            The foundation.
          </h2>

          <div className="mt-10 space-y-4">
            {education.map((item, index) => (
              <motion.article
                key={item.degree}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="grid gap-4 rounded-2xl border border-white/[0.09] bg-white/[0.02] p-6 sm:grid-cols-[0.55fr_1.45fr] sm:p-8"
              >
                <p className="font-mono text-xs tracking-wide text-[#5B8DEF]">
                  {item.period}
                </p>

                <div>
                  <h3 className="text-lg font-semibold sm:text-xl">
                    {item.degree}
                  </h3>
                  <p className="mt-3 leading-7 text-white/50">
                    {item.institution}
                  </p>
                </div>
              </motion.article>
            ))}
          </div>
        </section>

        {/* CONTACT */}

        <section
          id="contact"
          className="border-t border-white/[0.08] bg-[#0D1218] px-6 py-16 lg:px-12 lg:py-20"
        >
          <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-[#5B8DEF]">
                06 / Start a conversation
              </p>

              <h2 className="mt-5 text-3xl font-semibold leading-tight tracking-tight sm:text-5xl">
                Have a project
                <br />
                in mind<span className="text-[#5B8DEF]">?</span>
              </h2>

              <p className="mt-6 max-w-lg leading-8 text-white/55">
                Need a REST API, help connecting a database, a backend
                feature, or a fix for an existing web application? Tell me
                what you're working on, and we can discuss the requirements.
              </p>

              <a
                href="mailto:shivanisk442@gmail.com"
                className="mt-8 inline-flex items-center gap-3 text-sm text-white/70 transition hover:text-[#5B8DEF]"
              >
                <FiMail className="text-[#5B8DEF]" />
                Contact me about your project
                <FiArrowUpRight />
              </a>

              <div className="mt-8 flex gap-5">
                <a
                  href="https://github.com/ShivaniKaiche24"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xl text-white/45 transition hover:text-[#5B8DEF]"
                  aria-label="GitHub"
                >
                  <FaGithub />
                </a>

                <a
                  href="https://www.linkedin.com/in/shivani-kaiche"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xl text-white/45 transition hover:text-[#5B8DEF]"
                  aria-label="LinkedIn"
                >
                  <FaLinkedin />
                </a>
              </div>
            </div>

            <form
              onSubmit={handleContactSubmit}
              className="rounded-2xl border border-white/[0.09] bg-[#090D12] p-6 sm:p-9"
            >
              <p className="font-mono text-xs uppercase tracking-[0.15em] text-white/40">
                Project enquiry
              </p>

              <h3 className="mt-3 text-2xl font-semibold">
                Let's talk details.
              </h3>

              <label
                htmlFor="contact-name"
                className="mb-2 mt-7 block text-sm text-white/65"
              >
                Your name
              </label>

              <input
                id="contact-name"
                type="text"
                name="name"
                required
                maxLength={100}
                placeholder="Your name"
                className="w-full rounded-xl border border-white/10 bg-white/[0.025] px-4 py-3 text-sm outline-none transition placeholder:text-white/25 focus:border-[#5B8DEF]/50"
              />

              <label
                htmlFor="contact-email"
                className="mb-2 mt-5 block text-sm text-white/65"
              >
                Email address
              </label>

              <input
                id="contact-email"
                type="email"
                name="email"
                required
                maxLength={254}
                placeholder="you@example.com"
                className="w-full rounded-xl border border-white/10 bg-white/[0.025] px-4 py-3 text-sm outline-none transition placeholder:text-white/25 focus:border-[#5B8DEF]/50"
              />

              <label
                htmlFor="contact-subject"
                className="mb-2 mt-5 block text-sm text-white/65"
              >
                What do you need help with?
              </label>

              <input
                id="contact-subject"
                type="text"
                name="subject"
                required
                maxLength={150}
                placeholder="API development, bug fixing, full-stack feature..."
                className="w-full rounded-xl border border-white/10 bg-white/[0.025] px-4 py-3 text-sm outline-none transition placeholder:text-white/25 focus:border-[#5B8DEF]/50"
              />

              <label
                htmlFor="contact-message"
                className="mb-2 mt-5 block text-sm text-white/65"
              >
                Project details
              </label>

              <textarea
                id="contact-message"
                name="message"
                required
                maxLength={1500}
                rows={4}
                placeholder="Tell me a little about the project, requirements, and timeline..."
                className="w-full resize-y rounded-xl border border-white/10 bg-white/[0.025] px-4 py-3 text-sm leading-6 outline-none transition placeholder:text-white/25 focus:border-[#5B8DEF]/50"
              />

              {success && (
                <p role="status" className="mt-4 text-sm text-[#5B8DEF]">
                  {success}
                </p>
              )}

              {error && (
                <p role="alert" className="mt-4 text-sm text-red-400">
                  {error}
                </p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="mt-6 flex w-full items-center justify-center gap-3 rounded-xl bg-[#5B8DEF] px-5 py-4 text-sm font-bold text-[#090D12] transition hover:bg-[#8BAEFF] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? "Sending message..." : "Send project enquiry"}
                {!loading && <FiArrowUpRight />}
              </button>

              <p className="mt-4 text-xs leading-5 text-white/35">
                Your message will be processed by the existing contact API.
              </p>
            </form>
          </div>
        </section>

        {/* FOOTER */}

        <footer className="border-t border-white/[0.07] px-6 py-7 lg:px-12">
          <div className="mx-auto flex max-w-7xl flex-col justify-between gap-4 text-xs text-white/35 sm:flex-row sm:items-center">
            <p>
              © {new Date().getFullYear()} Shivani Kaiche. Built with purpose.
            </p>

            <a
              href="#home"
              className="inline-flex items-center gap-2 transition hover:text-[#5B8DEF]"
            >
              Back to top <FiArrowDownRight className="rotate-180" />
            </a>
          </div>
        </footer>
      </PageTransition>

      <ScrollToTop />
    </main>
  );
};

export default Home;