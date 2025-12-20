"use client";

import { motion } from "framer-motion";

export default function Hero() {
  // Floating snowflake particles
  const particles = Array.from({ length: 12 });

  return (
    <section
      id="hero"
      className="relative min-h-screen w-full overflow-hidden flex items-center justify-center bg-gradient-to-b from-black via-[#0b0f19] to-black text-white"
    >
      {/* Large central snowflake */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.2, scale: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
      >
        <img
          src="/logo.png" // your core brand icon
          alt="Snowflake"
          width={600}
          height={600}
          className="opacity-20"
        />
      </motion.div>

      {/* Floating particles */}
      {particles.map((_, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: [0, 1, 0],
            scale: [0.6, 1, 0.6],
            x: [Math.sin(i) * 40, Math.sin(i * 2) * 120, Math.sin(i * 3) * 80],
            y: [Math.cos(i) * 40, Math.cos(i * 2) * 120, Math.cos(i * 3) * 80],
          }}
          transition={{
            duration: 8 + i * 0.4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute w-2 h-2 rounded-full bg-blue-300/60 shadow-[0_0_14px_3px_rgba(147,197,253,0.5)]"
          style={{
            top: `${30 + i * 5}%`,
            left: `${40 + i * 3}%`,
          }}
        />
      ))}

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto text-center px-6">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
          className="text-5xl sm:text-6xl lg:text-7xl font-semibold tracking-tight bg-gradient-to-r from-blue-200 to-white bg-clip-text text-transparent"
        >
          We are a Software Research Lab building Open Technologies for East
          Africa
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 0.2 }}
          className="mt-6 text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
        >
          Open Labs is pioneering next-generation technologies in Cloud,
          Quantum, AI, Cryptography, Virtualization, and Open Infrastructure.
          all through open research and community empowerment.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 0.4 }}
          className="mt-10 flex flex-col sm:flex-row gap-4 justify-center"
        >
          <a
            href="#about"
            className="px-8 py-4 bg-white/20 backdrop-blur-xl border border-white/20 rounded-full text-white hover:bg-white/30 transition-all"
          >
            Learn More
          </a>

          <a
            href="#research"
            className="px-8 py-4 rounded-full bg-blue-500/20 hover:bg-blue-500/30 transition-all border border-blue-400/30 backdrop-blur-xl"
          >
            Explore Research
          </a>
        </motion.div>
      </div>
    </section>
  );
}
