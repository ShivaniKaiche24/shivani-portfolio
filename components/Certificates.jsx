
"use client";

import { motion } from "framer-motion";
import { FiAward, FiArrowUpRight } from "react-icons/fi";

const certificates = [
  {
    title: "Python for Data Science",
    issuer: "NPTEL",
    date: "July – August 2025",
    file: "/certificates/Python for Data Science.pdf",
  },
  {
    title: "Data Analytics",
    issuer: "LinkedIn",
    date: "December 6, 2022",
    file: "/certificates/Data Analytics Linkedin.pdf",
  },
  {
    title: "Problem Solving Techniques",
    issuer: "LinkedIn",
    date: "December 6, 2022",
    file: "/certificates/Problem Solving Techniques Linkedin..pdf",
  },
  {
    title: "Critical Thinking",
    issuer: "Certificate of Completion",
    date: "June 15, 2022",
    file: "/certificates/CertificateOfCompletion_Critical Thinking.pdf",
  },
  {
    title: "Writing a Proposal",
    issuer: "Certificate of Completion",
    date: "June 21, 2022",
    file: "/certificates/CertificateOfCompletion_Writing a Proposal.pdf",
  },
];

const fadeUp = {
  hidden: {
    opacity: 0,
    y: 22,
  },
  visible: (index = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.65,
      delay: index * 0.08,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

const Certificates = () => {
  return (
    <section
      id="certificates"
      className="relative mx-auto w-full max-w-7xl scroll-mt-24 overflow-hidden px-6 py-20 lg:px-12 lg:py-28"
    >
      {/* Background decoration */}

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 top-10 h-80 w-80 rounded-full bg-[#5B8DEF]/[0.045] blur-[100px]"
      />

      {/* Section Heading */}

      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="relative mb-12"
      >
        <p className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-[#8BAEFF]">
          05 / CERTIFICATIONS
        </p>

        <h2 className="text-3xl font-semibold tracking-tight text-white md:text-4xl">
          Courses & Certifications
        </h2>

        <p className="mt-4 max-w-2xl text-sm leading-7 text-gray-400">
          A collection of courses and certifications that reflect my
          continuous learning and interest in developing new skills.
        </p>

        <div className="mt-6 h-px w-16 bg-gradient-to-r from-[#5B8DEF] to-transparent" />
      </motion.div>

      {/* Certificates Grid */}

      <div className="relative grid gap-5 md:grid-cols-2">
        {certificates.map((certificate, index) => (
          <motion.article
            key={certificate.title}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            whileHover={{
              y: -5,
              transition: { duration: 0.25 },
            }}
            viewport={{ once: true, amount: 0.2 }}
            custom={index}
            className="group relative overflow-hidden rounded-2xl border border-white/[0.09] bg-gradient-to-br from-[#111923] to-[#0B1017] p-6 shadow-[0_8px_30px_rgba(0,0,0,0.12)] transition-all duration-300 hover:border-[#5B8DEF]/45 hover:shadow-[0_15px_45px_rgba(0,0,0,0.3)]"
          >
            {/* Hover glow */}

            <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-[#5B8DEF]/[0.08] blur-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

            <div className="relative">
              {/* Card top */}

              <div className="mb-7 flex items-center justify-between gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-[#5B8DEF]/20 bg-[#5B8DEF]/[0.08] text-xl text-[#8BAEFF] transition-all duration-300 group-hover:scale-110 group-hover:border-[#5B8DEF]/50 group-hover:bg-[#5B8DEF]/15">
                  <FiAward />
                </div>

                <span className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-[11px] text-white/50">
                  {certificate.date}
                </span>
              </div>

              {/* Certificate details */}

              <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-[#8BAEFF]/70">
                {certificate.issuer}
              </p>

              <h3 className="mt-3 text-xl font-semibold text-white transition-colors duration-300 group-hover:text-[#8BAEFF]">
                {certificate.title}
              </h3>

              {/* Card footer */}

              <div className="mt-7 flex items-center justify-between gap-3 border-t border-white/[0.08] pt-5">
                <span className="font-mono text-[10px] tracking-wider text-white/35">
                  CERTIFICATE {String(index + 1).padStart(2, "0")}
                </span>

                <a
                  href={certificate.file}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group/link inline-flex items-center gap-2 text-sm font-medium text-white/65 transition-all duration-300 hover:gap-3 hover:text-[#8BAEFF]"
                >
                  View Certificate

                  <FiArrowUpRight className="transition-transform duration-300 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
                </a>
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
};

export default Certificates;
