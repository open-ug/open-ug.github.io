import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";

export default function Hero() {
  return (
    <section className="relative pt-24 pb-32 border-b border-slate-200 dark:border-slate-800 overflow-hidden">
      {/* Micro Grid Background from globals.css */}
      <div className="absolute inset-0 micro-grid opacity-20 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-12 gap-8 items-end relative z-10">
        {/* Left Column: Heading */}
        <div className="col-span-12 lg:col-span-8">
          <div className="inline-block px-3 py-1 bg-primary text-slate-900 text-[10px] font-black uppercase tracking-[0.3em] mb-8">
            Engineering Excellence
          </div>
          <h1 className="text-6xl md:text-8xl font-black leading-[0.95] tracking-tight uppercase mb-12">
            Building the <br /> Foundations <br /> of{" "}
            <span className="text-primary italic font-serif lowercase">
              Tomorrow&apos;s
            </span>{" "}
            Computing.
          </h1>
        </div>

        {/* Right Column: Description & Call to Action */}
        <div className="col-span-12 lg:col-span-4 lg:pb-4">
          <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed mb-8 border-l-2 border-primary pl-6">
            A premier software research laboratory dedicated to engineering
            excellence and the advancement of core computing infrastructure.
          </p>

          <Link
            href="#research"
            className="inline-flex items-center gap-4 group cursor-pointer"
          >
            <span className="text-xs font-bold uppercase tracking-widest border-b-2 border-primary pb-1 text-slate-900 dark:text-slate-100">
              Explore Our Research
            </span>
            <FiArrowRight className="text-primary text-xl group-hover:translate-x-2 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
}
