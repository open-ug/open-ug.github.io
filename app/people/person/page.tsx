import Link from "next/link";
import { FiExternalLink, FiUserPlus, FiCode, FiFileText } from "react-icons/fi";

export default function PersonDetail() {
  // In a real Next.js app, this would be fetched dynamically based on the route slug
  const personData = {
    id: "088",
    firstName: "DR. ELIAS",
    lastName: "VANCE",
    designation: "Head of Neural Architecture",
    role: "Principal Investigator",
    location: "NODE 01",
    extension: "884-X9",
    status: "Active Duty",
    email: "vance.e@kineticlabs.internal",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuARavG7gHrqfoDasy3f6yuzk5jhzkiC13lVWY3Tc2gIU1_yBFtD7j4u7c8GBvREqI1dcXZW0zQ8y0RhKMyCkpjlvS5SUrfd3VkaoZ2XFYdO_u_Xcq6I-kisnW-5MqV7-p_Lvj3B2TncoFn0l86TNaJfAzzby-VWNEvmig_Xg_Rnyh2JLBqKkSMIBg4J4zsS-xF7ZrxUOkUQ8TEyJ1HxX3-BnvvBLwCuaHWy0hcZLvwADSWaI4P0xk0QD_QsYbTzYzvTmFtPwGHlMEc",
    bio: [
      {
        text: "holds a",
        highlight: "Ph.D. in Computational Neuroscience",
        suffix:
          "and has spent over 15 years at the intersection of biological neural mapping and high-performance computing.",
      },
      {
        text: "As the Head of Neural Architecture at Open UG Labs, Vance leads the Foundation Software initiative—a multi-disciplinary project aimed at building neural-inspired software architectures that mimic the plastic efficiency of the human cortex. His research focuses on non-linear data processing and decentralized intelligence protocols.",
      },
    ],
    specialization: "Syntactic Neural Mapping",
    yearsOfResearch: "15.4 Years Collective",
    links: [
      {
        label: "Google Scholar",
        icon: FiExternalLink,
        url: "#",
        highlight: false,
      },
      {
        label: "LinkedIn Profile",
        icon: FiUserPlus,
        url: "#",
        highlight: false,
      },
      { label: "GitHub Repository", icon: FiCode, url: "#", highlight: false },
      {
        label: "Latest Research Paper",
        icon: FiFileText,
        url: "#",
        highlight: true,
      },
    ],
    metrics: [
      { label: "Citations", value: "12.4k", highlight: false },
      { label: "Patents", value: "28", highlight: false },
      { label: "Clearance", value: "L5", highlight: true },
    ],
  };

  return (
    <main className="pt-24 pb-20 relative min-h-screen bg-background-light dark:bg-background-dark">
      {/* Technical Texture Overlay */}
      <div className="absolute inset-0 micro-grid opacity-10 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 md:px-8 relative z-10">
        {/* Header Section */}
        <div className="mb-16">
          <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-primary mb-4 block">
            Personnel Profile: {personData.firstName} {personData.lastName}
          </span>
          <h1 className="font-black uppercase tracking-tighter text-6xl md:text-8xl text-slate-900 dark:text-slate-100 leading-[0.9]">
            {personData.firstName} <br />
            <span className="text-transparent [-webkit-text-stroke:1px_#0f172a] dark:[-webkit-text-stroke:1px_#f8fafb]">
              {personData.lastName}
            </span>
          </h1>
        </div>

        {/* Main Grid Wrapper */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
          {/* Left Sidebar: Photo & Stats */}
          <div className="lg:col-span-4 border-r-0 lg:border-r border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 flex flex-col">
            {/* Image */}
            <div className="aspect-square w-full grayscale contrast-125 overflow-hidden border-b border-slate-200 dark:border-slate-800">
              <img
                alt={`Portrait of ${personData.firstName} ${personData.lastName}`}
                className="w-full h-full object-cover"
                src={personData.image}
              />
            </div>

            {/* Info Panel */}
            <div className="p-8 space-y-8 flex-grow">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-slate-500 dark:text-slate-400 mb-3 block">
                  Designation
                </span>
                <p className="font-black text-xl uppercase tracking-tighter text-slate-900 dark:text-slate-100">
                  {personData.designation}
                </p>
                <p className="font-bold text-primary text-sm uppercase tracking-widest mt-1">
                  {personData.role}
                </p>
              </div>

              <div className="space-y-4 pt-8 border-t border-slate-200 dark:border-slate-800">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-slate-500 dark:text-slate-400">
                    Location
                  </span>
                  <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-slate-900 dark:text-slate-100">
                    {personData.location}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-slate-500 dark:text-slate-400">
                    Ext.
                  </span>
                  <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-slate-900 dark:text-slate-100">
                    {personData.extension}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-slate-500 dark:text-slate-400">
                    Status
                  </span>
                  <span className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-primary"></span>
                    <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-slate-900 dark:text-slate-100">
                      {personData.status}
                    </span>
                  </span>
                </div>
              </div>

              <div className="pt-8 border-t border-slate-200 dark:border-slate-800">
                <a
                  className="block w-full bg-primary text-slate-900 py-4 text-center text-[10px] font-black uppercase tracking-[0.3em] hover:bg-slate-900 hover:text-white dark:hover:bg-white dark:hover:text-slate-900 transition-colors cursor-pointer"
                  href={`mailto:${personData.email}`}
                >
                  Send Transmission
                </a>
              </div>
            </div>
          </div>

          {/* Main Content: Bio & Details */}
          <div className="lg:col-span-8 bg-white dark:bg-slate-900 flex flex-col">
            {/* Bio Section */}
            <div className="p-8 md:p-12 border-t lg:border-t-0 border-b border-slate-200 dark:border-slate-800">
              <div className="flex items-baseline gap-4 mb-8">
                <span className="text-4xl font-black text-slate-200 dark:text-slate-800 select-none">
                  01
                </span>
                <h2 className="text-2xl font-black uppercase tracking-tight text-slate-900 dark:text-slate-100">
                  Technical Biography
                </h2>
              </div>
              <div className="max-w-none text-justify-custom">
                {personData.bio.map((paragraph, idx) => (
                  <p
                    key={idx}
                    className={`leading-relaxed mb-6 ${idx === 0 ? "text-xl font-medium text-slate-900 dark:text-slate-100" : "text-base text-slate-600 dark:text-slate-400"}`}
                  >
                    {idx === 0 &&
                      `${personData.firstName} ${personData.lastName} `}
                    {paragraph.text}
                    {paragraph.highlight && (
                      <span className="italic font-serif lowercase text-primary px-1">
                        {paragraph.highlight}
                      </span>
                    )}
                    {paragraph.suffix && paragraph.suffix}
                  </p>
                ))}

                {/* Micro Stats Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-12">
                  <div className="p-6 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800">
                    <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-slate-500 dark:text-slate-400 mb-2 block">
                      Specialization
                    </span>
                    <p className="text-sm font-bold uppercase text-slate-900 dark:text-slate-100">
                      {personData.specialization}
                    </p>
                  </div>
                  <div className="p-6 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800">
                    <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-slate-500 dark:text-slate-400 mb-2 block">
                      Years of Research
                    </span>
                    <p className="text-sm font-bold uppercase text-slate-900 dark:text-slate-100">
                      {personData.yearsOfResearch}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* External Connections */}
            <div className="p-8 md:p-12 flex-grow">
              <div className="flex items-baseline gap-4 mb-8">
                <span className="text-4xl font-black text-slate-200 dark:text-slate-800 select-none">
                  02
                </span>
                <h2 className="text-2xl font-black uppercase tracking-tight text-slate-900 dark:text-slate-100">
                  Index & Links
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-slate-200 dark:bg-slate-800 border border-slate-200 dark:border-slate-800">
                {personData.links.map((link, index) => (
                  <Link
                    key={index}
                    href={link.url}
                    className="bg-white dark:bg-slate-900 p-6 flex justify-between items-center group hover:bg-primary dark:hover:bg-primary transition-colors duration-200"
                  >
                    <span
                      className={`text-[10px] font-black uppercase tracking-[0.3em] group-hover:text-slate-900 transition-colors ${link.highlight ? "text-primary" : "text-slate-900 dark:text-slate-100"}`}
                    >
                      {link.label}
                    </span>
                    <link.icon
                      className={`text-lg group-hover:text-slate-900 transition-colors ${link.highlight ? "text-primary" : "text-slate-400 dark:text-slate-600"}`}
                    />
                  </Link>
                ))}
              </div>
            </div>

            {/* Metadata Grid */}
            <div className="grid grid-cols-3 border-t border-slate-200 dark:border-slate-800">
              {personData.metrics.map((metric, index) => (
                <div
                  key={index}
                  className={`p-6 flex flex-col items-center justify-center text-center ${index !== personData.metrics.length - 1 ? "border-r border-slate-200 dark:border-slate-800" : ""}`}
                >
                  <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-slate-500 dark:text-slate-400 mb-2">
                    {metric.label}
                  </span>
                  <span
                    className={`text-2xl font-black ${metric.highlight ? "text-primary" : "text-slate-900 dark:text-slate-100"}`}
                  >
                    {metric.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
