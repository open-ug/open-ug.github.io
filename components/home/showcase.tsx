/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { motion } from "framer-motion";
import { FiBox } from "react-icons/fi";

const projects = [
  {
    name: "Conveyor CI",
    description:
      "Conveyor CI is an open-source lightweight engine for building CI/CD systems with ease.",
    link: "https://conveyor.open.ug/",
    logo: "https://conveyor.open.ug/logos/icon.svg", // put your real logo path, or leave empty
  },
  {
    name: "Post Quantum TLS",
    description:
      "An experimental TLS protocol variant designed to support post-quantum cryptography.",
    link: "https://github.com/open-ug/pqtls",
    logo: null,
  },
  {
    name: "Orbiton JS",
    description:
      "A lightweight minimalist JavaScript library for building browser UIs.",
    link: "https://orbitonjs.com/", // if no site, keep placeholder link
    logo: "https://orbiton.js.org/b0fc9b8a348d80d150fe.svg",
  },
  {
    name: "Cloud Native Kampala",
    description:
      "A vibrant cloud native community in Kampala, Uganda. Meet, learn, share, and grow together.",
    link: "https://cloudnative.open.ug/",
    logo: "https://cloudnative.open.ug/_next/static/media/cncg-icon-color.e918a21e.svg",
  },
  {
    name: "Quantum Uganda",
    description:
      "Building quantum computing research, collaboration, and education in Uganda and beyond.",
    link: "https://quantumuganda.org/", // placeholder link
    logo: "https://media.licdn.com/dms/image/v2/D4D0BAQGjH19smNNYrw/company-logo_200_200/B4DZjbo4mEH4AM-/0/1756031586569/quantum_uganda_logo?e=1765411200&v=beta&t=dRf1EKs1gxBmXhocW4Oi3BpPFwOevhdNBT74DQCyyeE",
  },
];

export default function ProjectsSection() {
  return (
    <section id="projects" className="relative py-28 bg-gray-950 text-gray-200">
      {/* lighting background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute left-1/3 top-10 w-[450px] h-[450px] bg-blue-700/10 blur-[160px] rounded-full" />
        <div className="absolute right-1/4 bottom-20 w-[550px] h-[550px] bg-blue-400/5 blur-[200px] rounded-full" />
      </div>

      <div className="relative container mx-auto px-6 z-10">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-3xl mx-auto"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-blue-300">
            Projects & Communities
          </h2>
          <p className="mt-6 text-lg text-gray-300 leading-relaxed">
            We build open-source tools, support engineering communities, and
            accelerate frontier innovation across East Africa.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="mt-20 grid md:grid-cols-2 lg:grid-cols-3 gap-10 max-w-6xl mx-auto">
          {projects.map((item, index) => (
            <ProjectCard key={index} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ item }: { item: any }) {
  return (
    <motion.a
      href={item.link}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="group block p-8 bg-gray-900/40 backdrop-blur-lg border border-gray-800 rounded-2xl hover:bg-gray-900/60 transition-all cursor-pointer"
    >
      {/* Logo or placeholder */}
      <div className="flex justify-center mb-5">
        {item.logo ? (
          <img
            src={item.logo}
            alt={item.name}
            width={70}
            height={70}
            className="opacity-90 group-hover:opacity-100 transition"
          />
        ) : (
          <FiBox className="w-12 h-12 text-blue-300 opacity-80" />
        )}
      </div>

      <h3 className="text-xl font-semibold text-gray-100 text-center mb-3">
        {item.name}
      </h3>

      <p className="text-gray-400 text-center text-sm leading-relaxed">
        {item.description}
      </p>
    </motion.a>
  );
}
