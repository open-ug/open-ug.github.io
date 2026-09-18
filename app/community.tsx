export default function Community() {
  return (
    <section className="py-32 border-t border-slate-200 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-12 gap-16 items-center">
          {/* Image/Visual Column */}
          <div className="col-span-12 lg:col-span-6 relative">
            <div className="aspect-square bg-slate-100 dark:bg-slate-900 relative overflow-hidden swiss-border">
              {/* Note: Standard img used. Switch to next/image for production if self-hosting assets */}
              <img
                alt="Mentorship session"
                className="w-full h-full object-cover grayscale contrast-125 mix-blend-multiply dark:mix-blend-luminosity dark:opacity-80"
                src="/images/human.png"
              />
              <div className="absolute inset-0 bg-primary/10"></div>
            </div>

            {/* Stat Accent Box */}
            <div className="absolute -bottom-8 -right-8 w-64 h-64 bg-primary p-8 hidden md:flex flex-col justify-end shadow-2xl dark:shadow-none">
              <span className="text-3xl font-black text-slate-900 uppercase tracking-tighter">
                Makerere
              </span>
              <span className="text-[10px] font-bold text-slate-900 uppercase tracking-widest">
                Undergraduate Lab
              </span>
            </div>
          </div>

          {/* Content Column */}
          <div className="col-span-12 lg:col-span-6">
            <span className="text-xs font-bold uppercase tracking-[0.3em] text-primary mb-6 block">
              Community & Mentorship
            </span>
            <h2 className="text-5xl font-black uppercase tracking-tighter mb-8 leading-none text-slate-900 dark:text-slate-100">
              Investing in the <br /> Human Protocol.
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 mb-10 text-justify-custom">
              Open UG brings together undergraduate students at Makerere
              University&apos;s College of Computing and Information Sciences. The
              lab gives students space to learn from peers and mentors, build
              open-source software, and explore foundational computing through
              practical projects.
            </p>

            <button className="bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 px-10 py-4 text-xs font-bold uppercase tracking-widest hover:bg-primary dark:hover:bg-primary hover:text-slate-900 transition-all cursor-pointer">
              Join the Lab
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
