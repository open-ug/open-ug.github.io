import Link from "next/link";
import {
  FiArrowRight,
  FiCpu,
  FiTerminal,
  FiLock,
  FiGlobe,
} from "react-icons/fi";

export default function ResearchLabs() {
  const labs = [
    {
      id: "01",
      title: "AI LAB",
      icon: FiCpu,
      description:
        "Focus on next-gen algorithms and neural architectures designed for extreme efficiency and real-time inference at the edge.",
      bullets: ["Neural Nets", "Optimizer Design"],
      link: "#",
    },
    {
      id: "02",
      title: "SYSTEMS",
      icon: FiTerminal,
      description:
        "Deep-dive research into compilers, low-latency networking protocols, and high-performance kernel engineering.",
      bullets: ["Kernel Mods", "LLVM Tools"],
      link: "#",
    },
    {
      id: "03",
      title: "SECURITY",
      icon: FiLock,
      description:
        "Advancing formal verification techniques, memory-safe languages, and post-quantum cryptographic standards.",
      bullets: ["Rust Native", "ZK Proofs"],
      link: "#",
    },
    {
      id: "04",
      title: "WEB PLAT",
      icon: FiGlobe,
      description:
        "Architecting high-performance web engines, WASM runtimes, and decentralized data protocols for the open web.",
      bullets: ["WebGPU", "P2P Sync"],
      link: "#",
    },
  ];

  const metrics = [
    {
      label: "Compute Resources",
      value: "1.2 PETAFLOPS",
      description: "Dedicated cluster for model training",
      highlight: true,
    },
    {
      label: "Global Network",
      value: "14 NODES",
      description: "Low-latency testnet infrastructure",
      highlight: false,
    },
    {
      label: "Open Source",
      value: "242 REPOS",
      description: "Publicly available research code",
      highlight: false,
    },
  ];

  return (
    <main className="relative pt-32 pb-24 border-b border-slate-200 dark:border-slate-800 bg-background-light dark:bg-background-dark overflow-hidden">
      {/* Micro Grid Background */}
      <div className="absolute inset-0 micro-grid opacity-10 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header Section */}
        <section className="mb-24">
          <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-slate-200 dark:border-slate-800 pb-8 gap-8">
            <div>
              <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-primary mb-4 block">
                Research Directory 2024
              </span>
              <h1 className="text-6xl md:text-8xl lg:text-9xl font-black tracking-tight leading-[0.85] text-slate-900 dark:text-slate-100 uppercase">
                RESEARCH
                <br />
                <span className="italic font-serif lowercase text-slate-400 dark:text-slate-500">
                  labs.
                </span>
              </h1>
            </div>
            <div className="max-w-sm">
              <p className="text-sm uppercase tracking-widest text-slate-500 dark:text-slate-400 leading-relaxed text-justify-custom">
                Pioneering the next generation of computational infrastructure
                through rigorous engineering and architectural discipline.
              </p>
            </div>
          </div>
        </section>

        {/* Labs Grid - using gap-px to create perfect 1px borders */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-slate-200 dark:bg-slate-800 border border-slate-200 dark:border-slate-800">
          {labs.map((lab, index) => (
            <div
              key={index}
              className="group bg-background-light dark:bg-background-dark p-8 flex flex-col justify-between aspect-[4/5] hover:bg-white dark:hover:bg-slate-900/50 transition-colors cursor-pointer"
            >
              <div>
                <div className="flex justify-between items-start mb-12">
                  <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-slate-400 dark:text-slate-500">
                    {lab.id} / LAB
                  </span>
                  <lab.icon className="text-2xl text-primary" />
                </div>
                <h3 className="text-3xl font-black uppercase mb-4 tracking-tighter text-slate-900 dark:text-slate-100">
                  {lab.title}
                </h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed mb-6">
                  {lab.description}
                </p>
              </div>

              <div>
                <ul className="text-[10px] font-bold tracking-widest uppercase text-slate-500 dark:text-slate-400 mb-8 space-y-3">
                  {lab.bullets.map((bullet, i) => (
                    <li key={i} className="flex items-center gap-3">
                      <span className="w-1.5 h-1.5 bg-primary"></span>
                      {bullet}
                    </li>
                  ))}
                </ul>
                <Link
                  href={lab.link}
                  className="flex items-center justify-between text-[10px] font-black tracking-[0.2em] uppercase text-slate-900 dark:text-slate-100 group-hover:text-primary dark:group-hover:text-primary transition-colors"
                >
                  View Projects{" "}
                  <FiArrowRight className="text-lg group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          ))}
        </section>

        {/* Technical Accents / Data Block */}
        <section className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-12 items-start">
          {metrics.map((metric, index) => (
            <div
              key={index}
              className={`border-l pl-6 ${metric.highlight ? "border-primary" : "border-slate-300 dark:border-slate-700"}`}
            >
              <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-slate-500 dark:text-slate-400 mb-2 block">
                {metric.label}
              </span>
              <div
                className={`text-4xl font-black tracking-tight ${metric.highlight ? "text-slate-900 dark:text-slate-100" : "text-slate-700 dark:text-slate-300"}`}
              >
                {metric.value}
              </div>
              <p className="text-[10px] uppercase tracking-widest text-slate-500 dark:text-slate-400 mt-2">
                {metric.description}
              </p>
            </div>
          ))}
        </section>
      </div>
    </main>
  );
}
