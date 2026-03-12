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
    <>
      <section
        id="roadmap"
        className="relative py-32 border-t border-b border-slate-200 dark:border-slate-800 overflow-hidden bg-background-light dark:bg-background-dark"
      >
        {/* Micro Grid Background */}
        <div className="absolute inset-0 micro-grid opacity-10 pointer-events-none"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-6">
          {/* Header & Sponsor Badge */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-center text-center max-w-4xl mx-auto"
          >
            {/* InfraLane Sponsor Badge */}
            <div className="inline-flex items-center gap-4 border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-5 py-2 mb-10 shadow-sm">
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-slate-400">
                Sponsored By
              </span>
              <div className="h-3 w-px bg-slate-300 dark:bg-slate-700"></div>
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-primary">
                InfraLane
              </span>
            </div>

            <span className="text-[10px] font-bold uppercase tracking-widest text-primary mb-4 block">
              Flagship Project
            </span>
            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-slate-900 dark:text-slate-100">
              Conveyor Stack <br /> Roadmap
            </h2>
            <p className="mt-6 text-lg text-slate-600 dark:text-slate-400 leading-relaxed max-w-2xl">
              A long-term initiative to build a sovereign, vendor-neutral IaaS
              platform — evolving through open governance or independent system
              design.
            </p>
          </motion.div>

          {/* Roadmap Flow */}
          <div className="mt-24 flex flex-col items-center">
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

            {/* SPLIT PATHS */}
            <SplitPaths />
          </div>
        </div>
      </section>
    </>
  );
}

/* ================= Components ================= */

function Node({
  icon,
  title,
  description,
  highlight = false,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  highlight?: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className={`w-full max-w-xl text-center p-8 border ${
        highlight
          ? "bg-primary/5 border-primary"
          : "bg-white dark:bg-slate-900/50 border-slate-200 dark:border-slate-800"
      }`}
    >
      <div
        className={`flex justify-center mb-6 text-3xl ${
          highlight ? "text-primary" : "text-slate-900 dark:text-slate-100"
        }`}
      >
        {icon}
      </div>
      <h3 className="text-xl font-bold uppercase tracking-tight text-slate-900 dark:text-slate-100 mb-3">
        {title}
      </h3>
      <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
        {description}
      </p>
    </motion.div>
  );
}

function Line() {
  return <div className="h-16 w-px bg-slate-300 dark:bg-slate-700" />;
}

/* -------- Decision Gate -------- */

function DecisionGate() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="relative flex flex-col items-center w-full max-w-lg"
    >
      {/* Pulsing Square Border (Swiss geometric style instead of rounded ring) */}
      <motion.div
        animate={{ scale: [1, 1.05, 1], opacity: [0.3, 0.8, 0.3] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        className="absolute inset-[-15px] border border-primary pointer-events-none"
      />

      <div className="relative z-10 w-full p-8 bg-slate-900 dark:bg-white text-center border border-slate-800 dark:border-slate-200">
        <div className="flex justify-center items-center gap-3 text-white dark:text-slate-900 mb-4">
          <FiGitMerge className="text-2xl text-primary" />
          <span className="text-lg font-bold uppercase tracking-tight">
            CNCF Sandbox Gate
          </span>
          <Tooltip text="The acceptance of Conveyor CI into the CNCF Sandbox determines governance, development model, and long-term ecosystem alignment." />
        </div>

        <p className="text-slate-400 dark:text-slate-500 text-sm leading-relaxed text-justify-custom">
          Conveyor CI is evaluated for acceptance into the CNCF Sandbox. This
          outcome determines whether Conveyor Stack evolves through
          community-integrated development or through a fully sovereign stack.
        </p>

        <div className="mt-6 pt-4 border-t border-slate-800 dark:border-slate-200">
          <p className="text-[10px] font-bold uppercase tracking-widest text-primary">
            Critical Junction point
          </p>
        </div>
      </div>
    </motion.div>
  );
}

/* -------- Split Paths -------- */

function SplitPaths() {
  return (
    <div className="relative w-full max-w-6xl mt-16">
      {/* Vertical connector to split */}
      <div className="absolute left-1/2 -top-16 h-16 w-px bg-slate-300 dark:bg-slate-700 -translate-x-1/2" />
      {/* Horizontal connector line */}
      <div className="hidden md:block absolute left-1/4 right-1/4 top-0 h-px bg-slate-300 dark:bg-slate-700" />

      {/* Drop lines for columns */}
      <div className="hidden md:block absolute left-1/4 top-0 h-10 w-px bg-slate-300 dark:bg-slate-700 -translate-x-1/2" />
      <div className="hidden md:block absolute right-1/4 top-0 h-10 w-px bg-slate-300 dark:bg-slate-700 translate-x-1/2" />

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="grid md:grid-cols-2 gap-8 md:gap-16 pt-10"
      >
        <Path
          title="Community Path"
          icon={<FiCloud />}
          tooltip="Activated if Conveyor CI is accepted into the CNCF Sandbox."
          description="Leverage existing CNCF-aligned systems and communities to accelerate development."
          items={[
            "Reuse mature databases & brokers",
            "Community-driven governance",
            "Focus on orchestration & integration",
          ]}
        />

        <Path
          title="Sovereign Stack"
          icon={<FiCpu />}
          tooltip="Activated if CNCF Sandbox acceptance is not achieved."
          description="Design and build a fully sovereign infrastructure stack from first principles."
          items={[
            "Distributed embeddable document database",
            "Event-based message broker",
            "Custom storage & virtualization",
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
  icon: React.ReactNode;
  tooltip: string;
  description: string;
  items: string[];
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7 }}
      className="p-8 bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 hover:border-primary dark:hover:border-primary transition-colors group cursor-default"
    >
      <div className="flex items-center gap-4 mb-6 text-slate-900 dark:text-slate-100">
        <span className="text-3xl text-primary">{icon}</span>
        <h4 className="text-lg font-bold uppercase tracking-tight">{title}</h4>
        <Tooltip text={tooltip} />
      </div>

      <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed mb-6">
        {description}
      </p>

      <ul className="space-y-3">
        {items.map((item, i) => (
          <li key={i} className="flex items-start gap-3">
            <span className="h-1.5 w-1.5 bg-primary mt-1.5 shrink-0"></span>
            <span className="text-slate-600 dark:text-slate-300 text-sm font-medium">
              {item}
            </span>
          </li>
        ))}
      </ul>
    </motion.div>
  );
}

/* -------- Tooltip -------- */

function Tooltip({ text }: { text: string }) {
  return (
    <span className="relative group ml-auto">
      <FiInfo className="text-slate-300 dark:text-slate-600 hover:text-primary dark:hover:text-primary cursor-help transition-colors text-lg" />
      <span className="absolute bottom-full right-0 md:left-1/2 md:-translate-x-1/2 mb-4 w-64 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50">
        <span className="block p-4 text-[10px] uppercase tracking-widest leading-relaxed text-white dark:text-slate-900 bg-slate-900 dark:bg-white border-b-2 border-primary shadow-xl">
          {text}
        </span>
      </span>
    </span>
  );
}
