/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { motion } from "framer-motion";
import { FiCpu, FiAperture, FiTrendingUp } from "react-icons/fi";

export default function AboutSection() {
  return (
    <section
      id="about"
      className="relative py-24 bg-gray-950 text-gray-200 overflow-hidden"
    >
      {/* Decorative glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-blue-500/10 blur-[160px] rounded-full" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto text-center"
        >
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-blue-300 mb-6">
            About Open UG Labs
          </h2>

          <p className="text-lg md:text-xl text-gray-300 leading-relaxed">
            Open UG Labs is a frontier research collective exploring the edges
            of modern computing — from quantum-resistant cryptography and
            virtualization technologies to intelligent systems and cloud-native
            infrastructure.
            <br />
            <br />
            We push technology forward through open research, engineering
            excellence, community collaboration, and long-term scientific
            vision.
          </p>
        </motion.div>

        {/* Three Pillars */}
        <div className="mt-20 grid md:grid-cols-3 gap-10 max-w-5xl mx-auto">
          <FeatureCard
            icon={<FiAperture className="w-10 h-10 text-blue-300" />}
            title="Deep Research"
            description="We investigate advanced technologies including PQC, virtualization, distributed systems, and AI autonomy."
          />

          <FeatureCard
            icon={<FiCpu className="w-10 h-10 text-blue-300" />}
            title="Engineering Impact"
            description="Our teams build real technologies like Conveyor CI and experimental TLS protocols for next-gen security."
          />

          <FeatureCard
            icon={<FiTrendingUp className="w-10 h-10 text-blue-300" />}
            title="Future-Focused"
            description="We operate with long-term vision — preparing Africa for quantum computing, AI infrastructure, and emerging tech fields."
          />
        </div>
      </div>
    </section>
  );
}

function FeatureCard({
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
      className="p-8 bg-gray-900/40 backdrop-blur-md border border-gray-800 rounded-2xl hover:bg-gray-900/60 transition-all"
    >
      <div className="flex justify-center mb-5">{icon}</div>
      <h3 className="text-2xl font-semibold mb-3 text-gray-100">{title}</h3>
      <p className="text-gray-400 text-base leading-relaxed">{description}</p>
    </motion.div>
  );
}
