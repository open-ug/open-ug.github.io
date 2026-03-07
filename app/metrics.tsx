export default function Metrics() {
  const metricsData = [
    { value: "24,000+", line1: "Software", line2: "Installs" },
    { value: "800+", line1: "Dependent", line2: "Projects" },
    { value: "20+", line1: "Human", line2: "Participants" },
    { value: "6", line1: "Core Software", line2: "Projects" },
    { value: "1", line1: "Research", line2: "Paper" },
  ];

  return (
    <section className="py-24 border-b border-slate-200 dark:border-slate-800 relative overflow-hidden">
      {/* Micro Grid Background */}
      <div className="absolute inset-0 micro-grid opacity-10 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="mb-16">
          <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-primary mb-2 block">
            Global Reach
          </span>
          <h2 className="text-4xl font-black uppercase tracking-tighter text-slate-900 dark:text-slate-100">
            Impact Metrics
          </h2>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-8">
          {metricsData.map((metric, index) => (
            <div key={index} className="flex flex-col gap-4 relative group">
              <span className="text-5xl font-black uppercase tracking-tighter leading-none text-slate-900 dark:text-slate-100 group-hover:text-primary transition-colors">
                {metric.value}
              </span>
              <div className="flex flex-col">
                <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">
                  {metric.line1}
                </span>
                <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">
                  {metric.line2}
                </span>
              </div>

              {/* Vertical Divider (Hidden on mobile & the last item) */}
              {index !== metricsData.length - 1 && (
                <div className="absolute top-0 right-0 h-full w-[1px] bg-slate-200 dark:bg-slate-800 hidden lg:block"></div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
