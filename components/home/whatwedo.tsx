/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { motion } from "framer-motion";
import {
  FiTerminal,
  FiGitBranch,
  FiGlobe,
  FiCpu,
  FiShield,
  FiLayers,
} from "react-icons/fi";

export default function WhatWeDoSection() {
  return (
    <section
      id="what-we-do"
      className="relative py-28 bg-gray-950 text-gray-200 overflow-hidden"
    >
      {/* Glow background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 right-1/3 w-[500px] h-[500px] bg-blue-500/5 blur-[140px] rounded-full" />
        <div className="absolute top-10 left-1/4 w-[400px] h-[400px] bg-blue-800/10 blur-[200px] rounded-full" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-3xl mx-auto"
        >
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-blue-300">
            What We Do
          </h2>
          <p className="mt-6 text-lg md:text-xl text-gray-300 leading-relaxed">
            We advance the future of computing by building open technologies,
            empowering developer communities, and conducting research at the
            cutting edge of cloud, AI, and quantum-era security.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="mt-20 grid md:grid-cols-3 gap-10 max-w-6xl mx-auto">
          <WhatWeDoCard
            icon={<FiTerminal className="w-10 h-10 text-blue-300" />}
            title="Open Source Engineering"
            description="We build vendor-neutral, community-driven software — including CI/CD systems, PQC-ready protocols, and experimental runtime tooling."
          />

          <WhatWeDoCard
            icon={<FiGitBranch className="w-10 h-10 text-blue-300" />}
            title="Community Support"
            description="We provide technical leadership and engineering support to open source groups like Cloud Native Kampala and Quantum Uganda."
          />

          <WhatWeDoCard
            icon={<FiCpu className="w-10 h-10 text-blue-300" />}
            title="Next-Gen Research"
            description="We explore quantum-resistant cryptography, virtualization technologies, AI systems, and cloud infrastructure evolution."
          />

          <WhatWeDoCard
            icon={<FiGlobe className="w-10 h-10 text-blue-300" />}
            title="Open Knowledge"
            description="We publish findings, contribute to standards, teach workshops, and share research openly for the wider African tech ecosystem."
          />

          <WhatWeDoCard
            icon={<FiShield className="w-10 h-10 text-blue-300" />}
            title="Security & Protocols"
            description="We experiment with modern protocols such as Post-Quantum TLS, contributing to the future of safe distributed systems."
          />

          <WhatWeDoCard
            icon={<FiLayers className="w-10 h-10 text-blue-300" />}
            title="Cloud & Infra Innovation"
            description="We design modular, scalable, vendor-neutral infrastructure using open cloud-native principles."
          />
        </div>
      </div>
    </section>
  );
}

function WhatWeDoCard({
  icon,
  title,
  description,
}: {
  icon: any;
  title: string;
  description: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="p-8 bg-gray-900/40 backdrop-blur-lg border border-gray-800 rounded-2xl hover:bg-gray-900/60 transition-all"
    >
      <div className="flex justify-center mb-5">{icon}</div>
      <h3 className="text-2xl font-semibold mb-3 text-gray-100 text-center">
        {title}
      </h3>
      <p className="text-gray-400 text-base leading-relaxed text-center">
        {description}
      </p>
    </motion.div>
  );
}
