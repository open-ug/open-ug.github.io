/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { motion } from "framer-motion";
import {
  FiGitMerge,
  FiLayers,
  FiActivity,
  FiCloud,
  FiCpu,
  FiInfo,
} from "react-icons/fi";

export default function RoadmapSection() {
  return (
    <section
      id="roadmap"
      className="relative py-32 bg-gray-950 text-gray-200 overflow-hidden"
    >
      {/* Ambient glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-blue-600/10 blur-[220px] rounded-full" />
      </div>

      <div className="relative z-10 container mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-4xl mx-auto"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-blue-300">
            Conveyor Stack Roadmap
          </h2>
          <p className="mt-6 text-lg text-gray-300 leading-relaxed">
            A long-term initiative to build a sovereign, vendor-neutral IaaS
            platform — evolving through open governance or independent system
            design.
          </p>
        </motion.div>

        {/* Roadmap */}
        <div className="mt-24 flex flex-col items-center gap-14">
          <Node
            icon={<FiLayers />}
            title="Conveyor Stack"
            description="A multi-year program to design an open infrastructure platform comparable to OpenStack or Apache CloudStack."
            highlight
          />

          <Line />

          <Node
            icon={<FiActivity />}
            title="Phase 1: Conveyor CI"
            description="A headless, cloud-native CI/CD orchestration engine designed as the foundation of the stack."
          />

          <Line />

          {/* DECISION GATE */}
          <DecisionGate />

          {/* SPLIT */}
          <SplitPaths />
        </div>
      </div>
    </section>
  );
}

/* ================= Components ================= */

function Node({
  icon,
  title,
  description,
  highlight = false,
}: {
  icon: any;
  title: string;
  description: string;
  highlight?: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className={`max-w-xl text-center p-8 rounded-2xl border backdrop-blur-lg ${
        highlight
          ? "bg-blue-500/10 border-blue-400/40"
          : "bg-gray-900/40 border-gray-800"
      }`}
    >
      <div className="flex justify-center mb-4 text-blue-300 text-3xl">
        {icon}
      </div>
      <h3 className="text-2xl font-semibold text-gray-100">{title}</h3>
      <p className="mt-3 text-gray-400 text-sm leading-relaxed">
        {description}
      </p>
    </motion.div>
  );
}

function Line() {
  return <div className="h-12 w-px bg-gray-700" />;
}

/* -------- Decision Gate -------- */

function DecisionGate() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="relative flex flex-col items-center"
    >
      {/* Pulsing ring */}
      <motion.div
        animate={{ scale: [1, 1.15, 1], opacity: [0.6, 0.9, 0.6] }}
        transition={{ duration: 2.5, repeat: Infinity }}
        className="absolute w-40 h-40 rounded-full border border-blue-400/40"
      />

      <div className="relative z-10 p-8 bg-gray-900/60 border border-blue-400/40 rounded-2xl backdrop-blur-lg text-center max-w-lg">
        <div className="flex justify-center items-center gap-3 text-blue-300 mb-3">
          <FiGitMerge className="text-3xl" />
          <span className="text-xl font-semibold">
            CNCF Sandbox Decision Gate
          </span>
          <Tooltip text="The acceptance of Conveyor CI into the CNCF Sandbox determines governance, development model, and long-term ecosystem alignment." />
        </div>

        <p className="text-gray-400 text-sm leading-relaxed">
          Conveyor CI is evaluated for acceptance into the CNCF Sandbox. This
          outcome determines whether Conveyor Stack evolves through
          community-integrated development or through a fully sovereign stack.
        </p>

        <p className="mt-3 text-xs text-blue-300/80">
          Both future pathways depend on this decision.
        </p>
      </div>
    </motion.div>
  );
}

/* -------- Split Paths -------- */

function SplitPaths() {
  return (
    <div className="relative w-full max-w-6xl mt-20">
      {/* Vertical connector */}
      <div className="absolute left-1/2 -top-10 h-10 w-px bg-gray-700 -translate-x-1/2" />

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="grid md:grid-cols-2 gap-16"
      >
        <Path
          title="Community-Integrated Path"
          icon={<FiCloud />}
          tooltip="Activated if Conveyor CI is accepted into the CNCF Sandbox."
          description="Leverage existing CNCF-aligned systems and communities to accelerate development."
          items={[
            "Reuse mature databases, brokers, schedulers",
            "Community-driven governance",
            "Focus on orchestration and integration",
          ]}
        />

        <Path
          title="Sovereign Stack Path"
          icon={<FiCpu />}
          tooltip="Activated if CNCF Sandbox acceptance is not achieved."
          description="Design and build a fully sovereign infrastructure stack from first principles."
          items={[
            "Distributed embeddable document database",
            "Event-based message broker",
            "Custom storage, networking & compute virtualization",
          ]}
        />
      </motion.div>
    </div>
  );
}

function Path({
  title,
  icon,
  tooltip,
  description,
  items,
}: {
  title: string;
  icon: any;
  tooltip: string;
  description: string;
  items: string[];
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7 }}
      className="p-8 bg-gray-900/40 border border-gray-800 rounded-2xl backdrop-blur-lg"
    >
      <div className="flex items-center gap-3 mb-4 text-blue-300">
        <span className="text-2xl">{icon}</span>
        <h4 className="text-xl font-semibold text-gray-100">{title}</h4>
        <Tooltip text={tooltip} />
      </div>

      <p className="text-gray-400 text-sm leading-relaxed mb-4">
        {description}
      </p>

      <ul className="space-y-2 text-gray-400 text-sm list-disc list-inside">
        {items.map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>
    </motion.div>
  );
}

/* -------- Tooltip -------- */

function Tooltip({ text }: { text: string }) {
  return (
    <span className="relative group">
      <FiInfo className="text-blue-300/70 hover:text-blue-300 cursor-pointer" />
      <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 w-72 opacity-0 group-hover:opacity-100 transition pointer-events-none">
        <span className="block p-3 text-xs text-gray-200 bg-gray-900 border border-gray-700 rounded-lg shadow-xl">
          {text}
        </span>
      </span>
    </span>
  );
}
