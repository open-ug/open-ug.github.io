import Link from "next/link";
import { FiArrowUpRight } from "react-icons/fi";

export default function RecentPapers() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const papers: any[] = [];

  return (
    <section className="py-32 bg-slate-50 dark:bg-slate-900/30 border-b border-slate-200 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 border-b border-slate-300 dark:border-slate-700 pb-8 gap-6">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-primary mb-2 block">
              Publications
            </span>
            <h2 className="text-5xl font-black uppercase tracking-tighter text-slate-900 dark:text-slate-100">
              Recent Papers
            </h2>
          </div>
          <div>
            <Link
              href="#archive"
              className="inline-flex text-xs font-bold uppercase tracking-widest items-center gap-2 border border-slate-300 dark:border-slate-700 px-6 py-3 hover:bg-slate-900 hover:text-white dark:hover:bg-slate-100 dark:hover:text-slate-900 transition-all text-slate-900 dark:text-slate-100"
            >
              View Archive
            </Link>
          </div>
        </div>

        {/* Papers List */}
        <div className="divide-y divide-slate-200 dark:divide-slate-800">
          {papers.map((paper, index) => (
            <Link
              href={paper.link}
              key={index}
              className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-0 py-8 group cursor-pointer hover:bg-white dark:hover:bg-slate-800/50 transition-colors px-4 -mx-4 rounded-sm"
            >
              {/* Date */}
              <div className="col-span-1 lg:col-span-2 text-xs font-mono text-slate-400 flex items-center">
                {paper.date}
              </div>

              {/* Content */}
              <div className="col-span-1 lg:col-span-7">
                <h4 className="text-xl font-bold uppercase tracking-tight mb-2 group-hover:text-primary transition-colors text-slate-900 dark:text-slate-100">
                  {paper.title}
                </h4>
                <p className="text-sm text-slate-500 dark:text-slate-400 max-w-xl">
                  {paper.description}
                </p>
              </div>

              {/* Category Tag */}
              <div className="col-span-1 lg:col-span-2 flex items-center">
                <span className="text-[10px] font-bold uppercase tracking-widest px-3 py-1 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-slate-100 group-hover:border-primary/50 transition-colors">
                  {paper.category}
                </span>
              </div>

              {/* Icon */}
              <div className="col-span-1 lg:col-span-1 flex justify-start lg:justify-end items-center mt-2 lg:mt-0">
                <FiArrowUpRight className="text-2xl text-slate-300 dark:text-slate-600 group-hover:text-primary transition-colors" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
