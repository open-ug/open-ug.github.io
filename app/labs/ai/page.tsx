import Link from "next/link";
import { FiArrowRight, FiCode, FiCpu, FiShield, FiPlus } from "react-icons/fi";

export default function AiLabDetail() {
  const projects = [
    {
      id: "PRJ_OPT-01",
      title: "Sparse Matrix Optimization for Edge TPU",
      description:
        "Optimization of convolutional kernels for low-precision tensor processing units.",
      icon: FiCode,
      link: "#",
      linkText: "View Technical Specs",
      theme: "light", // Hovers to dark
    },
    {
      id: "PRJ_NAS-04",
      title: "Neural Architecture Search via Evolutionary Gradients",
      description:
        "Automating the discovery of high-performance topologies using non-differentiable genetic search protocols.",
      icon: FiCpu,
      link: "#",
      linkText: "Review Methodology",
      theme: "dark", // Always dark
    },
    {
      id: "PRJ_PRV-09",
      title: "Privacy-Preserving Federated Learning Models",
      description:
        "Multi-party computation techniques for training large models on decentralized, sensitive datasets.",
      icon: FiShield,
      link: "#",
      linkText: "Security Audit",
      theme: "light", // Hovers to dark
    },
  ];

  const researchers = [
    {
      id: "01",
      name: "Dr. Sarah Chen",
      role: "Head of AI Research",
    },
    {
      id: "02",
      name: "Marcus Thorne",
      role: "Senior Research Engineer",
    },
    {
      id: "03",
      name: "Elena Rostova",
      role: "Machine Learning Specialist",
    },
  ];

  return (
    <main className="min-h-screen bg-background-light dark:bg-background-dark">
      {/* Hero Section */}
      <section className="relative h-[716px] flex flex-col justify-end px-6 md:px-8 pb-16 overflow-hidden border-b border-slate-200 dark:border-slate-800">
        {/* Micro Grid Background */}
        <div className="absolute inset-0 z-0 micro-grid opacity-20 dark:opacity-10 pointer-events-none"></div>

        {/* Background Image with Blend */}
        <div className="absolute inset-0 z-0 bg-slate-900 dark:bg-black">
          <img
            alt="Neural Architecture abstract visualization"
            className="w-full h-full object-cover opacity-50 mix-blend-luminosity"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuA7qYitqcyo-WJHi6WCZ9guPyoI5zYnMFhFeytJirS6OxBuWm2sQVSxA-ftQ6fJBbJPyNeiAc4tsm6uI1h_1OuW4IhfgUtkomqLcuuBh1szkAFgJFWhNSHC3V1MAdDawN6XsWUHim0mBPFdmuEz5oRV7eUFqibGC1pxoVMoL5N9eQTLR8a_f_kCI_YhGv3iB2pWYRscUeEOTRV9V3Az_THfteYEbY5GErmByu252DB2lZSESH9xQqur6qd9iFm_flVrYeIUex0FbwE"
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto w-full">
          <div className="mb-4">
            <span className="text-primary text-xs font-bold uppercase tracking-[0.3em] bg-slate-900/50 backdrop-blur-sm px-3 py-1">
              Institutional Node // 04
            </span>
          </div>
          <h1 className="font-black uppercase tracking-[-0.05em] text-7xl md:text-9xl text-white leading-[0.85]">
            AI LAB<span className="text-primary">.</span>
          </h1>
          <div className="mt-8 flex gap-4 items-center">
            <span className="w-12 h-[1px] bg-primary"></span>
            <span className="text-xs font-bold uppercase tracking-[0.3em] text-slate-300">
              Advanced Neural Computing Division
            </span>
          </div>
        </div>
      </section>

      {/* Lab Description & Context */}
      <section className="px-6 md:px-8 py-24 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-16 border-b border-slate-200 dark:border-slate-800">
        <div className="md:col-span-4">
          <h3 className="text-[10px] font-bold uppercase tracking-[0.3em] text-primary mb-8">
            Executive Summary
          </h3>
          <p className="text-3xl font-black leading-tight tracking-tight text-slate-900 dark:text-slate-100">
            PIONEERING THE NEXT GENERATION OF{" "}
            <span className="italic font-serif normal-case text-slate-500 dark:text-slate-400">
              algorithmic precision
            </span>{" "}
            AND COMPUTATIONAL EFFICIENCY.
          </p>
        </div>
        <div className="md:col-span-8 flex flex-col gap-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-slate-400 dark:text-slate-500 block mb-4">
                Focus 01 // Efficiency
              </span>
              <p className="text-base text-slate-600 dark:text-slate-400 leading-relaxed text-justify-custom">
                The AI Lab focuses on next-gen algorithms designed for extreme
                hardware constraints. Our research explores the boundaries of
                neural architectures where latency and power consumption are
                minimized without sacrificing inferential accuracy.
              </p>
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-slate-400 dark:text-slate-500 block mb-4">
                Focus 02 // Inference
              </span>
              <p className="text-base text-slate-600 dark:text-slate-400 leading-relaxed text-justify-custom">
                Specializing in real-time inference frameworks, we develop
                proprietary quantization techniques and sparse matrix engines
                that allow massive models to operate on edge devices at
                local-native speeds.
              </p>
            </div>
          </div>
          <div className="bg-slate-100 dark:bg-slate-900/50 p-8 border-l-4 border-primary">
            <p className="font-bold text-slate-900 dark:text-slate-100 uppercase tracking-tight italic text-lg">
              &quot;The goal is not just faster computation, but the structural
              reorganization of how intelligence is mapped to silicon.&quot;
            </p>
          </div>
        </div>
      </section>

      {/* Current Projects - Bento Grid Layout */}
      <section className="px-6 md:px-8 py-24 max-w-7xl mx-auto border-b border-slate-200 dark:border-slate-800">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-slate-400 dark:text-slate-500 block mb-2">
              Inventory
            </span>
            <h2 className="text-4xl font-black uppercase tracking-tighter text-slate-900 dark:text-slate-100">
              Active Research Initiatives
            </h2>
          </div>
          <div className="text-left md:text-right">
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-primary">
              Status: Operational
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-slate-200 dark:bg-slate-800 border border-slate-200 dark:border-slate-800">
          {projects.map((project, index) => (
            <div
              key={index}
              className={`p-10 flex flex-col justify-between aspect-square transition-colors duration-300 group
                ${
                  project.theme === "dark"
                    ? "bg-slate-900 dark:bg-black text-white"
                    : "bg-white dark:bg-slate-900/50 hover:bg-slate-900 dark:hover:bg-primary/5 hover:text-white dark:hover:text-white cursor-pointer"
                }
              `}
            >
              <div>
                <div className="flex justify-between items-start mb-12">
                  <span
                    className={`text-[10px] font-bold uppercase tracking-[0.3em] transition-colors
                    ${project.theme === "dark" ? "text-primary" : "text-slate-400 dark:text-slate-500 group-hover:text-primary"}
                  `}
                  >
                    {project.id}
                  </span>
                  <project.icon className="text-primary text-2xl" />
                </div>
                <h3
                  className={`text-2xl font-black uppercase tracking-tight leading-tight transition-colors
                  ${project.theme === "dark" ? "text-white" : "text-slate-900 dark:text-slate-100 group-hover:text-white dark:group-hover:text-primary"}
                `}
                >
                  {project.title}
                </h3>
              </div>
              <div className="flex flex-col gap-6">
                <div
                  className={`h-px w-full transition-colors
                  ${project.theme === "dark" ? "bg-slate-700" : "bg-slate-200 dark:bg-slate-800 group-hover:bg-slate-700 dark:group-hover:bg-primary/20"}
                `}
                ></div>
                <p
                  className={`text-sm leading-relaxed transition-colors
                  ${project.theme === "dark" ? "text-slate-400" : "text-slate-500 dark:text-slate-400 group-hover:text-slate-400 dark:group-hover:text-slate-300"}
                `}
                >
                  {project.description}
                </p>
                <Link
                  href={project.link}
                  className="text-[10px] font-bold uppercase tracking-[0.3em] text-primary flex items-center justify-between w-full mt-2"
                >
                  {project.linkText} <FiArrowRight className="text-lg" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Core Researchers */}
      <section className="bg-slate-50 dark:bg-slate-900/20 px-6 md:px-8 py-24">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-16 items-start">
            <div className="md:col-span-4">
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-slate-400 dark:text-slate-500 block mb-4">
                The Collective
              </span>
              <h2 className="text-4xl font-black uppercase tracking-tighter leading-none mb-6 text-slate-900 dark:text-slate-100">
                Core Researchers
              </h2>
              <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed max-w-sm">
                A multidisciplinary group of engineers and theorists pushing the
                boundaries of autonomous computation.
              </p>
            </div>

            <div className="md:col-span-8">
              <div className="flex flex-col gap-2">
                {researchers.map((researcher, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-8 bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 hover:border-primary dark:hover:border-primary transition-colors cursor-pointer group"
                  >
                    <div className="flex items-center gap-6 md:gap-12">
                      <span className="text-[10px] font-bold text-slate-400 dark:text-slate-600 tracking-[0.3em]">
                        {researcher.id}
                      </span>
                      <div>
                        <h4 className="text-xl font-bold uppercase tracking-tight text-slate-900 dark:text-slate-100 group-hover:text-primary dark:group-hover:text-primary transition-colors mb-1">
                          {researcher.name}
                        </h4>
                        <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-slate-500 dark:text-slate-400">
                          {researcher.role}
                        </span>
                      </div>
                    </div>
                    <FiPlus className="text-2xl text-slate-300 dark:text-slate-600 group-hover:text-primary dark:group-hover:text-primary transition-colors" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
