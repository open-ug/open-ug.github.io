import { FiBox, FiTerminal, FiLayers } from "react-icons/fi";

export default function Mission() {
  const missionPillars = [
    {
      title: "Foundation Software",
      description:
        "Developing stable, scalable low-level systems that form the backbone of distributed networks.",
      icon: FiBox,
    },
    {
      title: "Optimized Libraries",
      description:
        "High-performance computation modules optimized for silicon-level throughput and efficiency.",
      icon: FiTerminal,
    },
    {
      title: "Core Engines",
      description:
        "Building the next generation of software execution environments and virtual machines.",
      icon: FiLayers,
    },
  ];

  return (
    <section className="py-32 border-b border-slate-200 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-12 gap-8 lg:gap-16">
          {/* Left Column: Mission Statement */}
          <div className="col-span-12 lg:col-span-4">
            <h2 className="text-4xl font-black uppercase tracking-tighter mb-6">
              Our Mission
            </h2>
            <p className="text-slate-500 font-medium dark:text-slate-400">
              Focused on the critical layers of modern software engineering.
            </p>
          </div>

          {/* Right Column: Mission Grid (Mapped) */}
          <div className="col-span-12 lg:col-span-8 grid md:grid-cols-3 gap-1 px-1 py-1 bg-slate-200 dark:bg-slate-800">
            {missionPillars.map((pillar, index) => (
              <div
                key={index}
                className="bg-background-light dark:bg-background-dark p-8 flex flex-col gap-12 transition-colors hover:bg-white dark:hover:bg-slate-900/80"
              >
                <pillar.icon className="text-4xl text-primary stroke-[1.5]" />
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-widest mb-4 text-slate-900 dark:text-slate-100">
                    {pillar.title}
                  </h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
