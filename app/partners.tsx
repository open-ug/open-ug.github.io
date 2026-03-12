"use client";

import { motion } from "framer-motion";

export default function PartnersSection() {
  const partners = [
    "Cloud Native Kampala",
    "InfraLane",
    "Cranom Technologies Ltd",
  ];

  return (
    <section className="py-24 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/20">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="mb-16">
          <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-primary mb-2 block">
            Ecosystem
          </span>
          <h2 className="text-4xl font-black uppercase tracking-tighter text-slate-900 dark:text-slate-100">
            Strategic Partners
          </h2>
        </div>

        {/* Partners Grid (Collapsed Borders) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-px bg-slate-200 dark:bg-slate-800 border border-slate-200 dark:border-slate-800"
        >
          {partners.map((partner, i) => (
            <div
              key={i}
              className="bg-background-light dark:bg-background-dark aspect-square flex flex-col items-center justify-center p-6 text-center group hover:bg-white dark:hover:bg-slate-900 transition-colors cursor-pointer"
            >
              <div className="h-12 w-12 mb-4 border border-slate-300 dark:border-slate-700 group-hover:border-primary transition-colors flex items-center justify-center bg-slate-100 dark:bg-slate-800 group-hover:bg-primary/10">
                <span className="text-xl font-black text-slate-400 dark:text-slate-500 group-hover:text-primary transition-colors">
                  {partner.charAt(0)}
                </span>
              </div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-slate-100 transition-colors">
                {partner}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
