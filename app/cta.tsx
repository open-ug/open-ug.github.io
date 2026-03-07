import { motion } from "framer-motion";

export function CTASection() {
  return (
    <section className="py-24 border-b border-slate-200 dark:border-slate-800 bg-background-light dark:bg-background-dark">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-slate-900 dark:bg-white p-12 md:p-20 flex flex-col items-center text-center relative overflow-hidden border border-slate-800 dark:border-slate-200"
        >
          {/* Decorative Corner */}
          <div className="absolute top-0 right-0 w-16 h-16 bg-primary"></div>

          <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-primary mb-6 block relative z-10">
            Contribute to the Core
          </span>

          <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter text-white dark:text-slate-900 mb-6 relative z-10">
            Ready to build with us?
          </h2>

          <p className="text-slate-400 dark:text-slate-500 max-w-xl mx-auto mb-10 text-sm leading-relaxed relative z-10">
            Join the Open UG Labs community to collaborate on the Conveyor
            Stack, access research grants, and help shape the future of
            vendor-neutral infrastructure.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto relative z-10">
            <button className="bg-primary text-slate-900 px-8 py-4 text-xs font-bold uppercase tracking-widest hover:bg-white hover:text-slate-900 transition-colors cursor-pointer w-full sm:w-auto">
              Apply for Access
            </button>
            <button className="bg-transparent border border-slate-700 dark:border-slate-300 text-white dark:text-slate-900 px-8 py-4 text-xs font-bold uppercase tracking-widest hover:border-primary dark:hover:border-primary hover:text-primary dark:hover:text-primary transition-colors cursor-pointer w-full sm:w-auto">
              View GitHub
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
