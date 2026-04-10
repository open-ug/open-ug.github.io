import Link from "next/link";
import { FiArrowRight, FiCode, FiGlobe, FiFileText } from "react-icons/fi";

export default function ProjectDetail() {
  // In a real Next.js app, this data would likely be fetched via props
  // based on the URL slug (e.g., /projects/k-spec-001)
  const projectData = {
    id: "K-SPEC-001 / EDGE-COMPUTE",
    title: "Sparse Matrix Optimization",
    titleHighlight: "for",
    subtitle: "Edge TPU",
    status: "Active",
    phase: "Alpha",
    bannerImage:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBgvbG3fnF5vcV4USpkY23-CTfwlQrVDiShRU3aiSqR8thF4kqE5HL0Qm0WbDBvJ_F1KgPT29K8vX1rNOF7ucHntJSduESXHkyodAxhGF3TtVJ_OLNBqT6sKKu6hqcnNtYtoM-M6EEpGaZqduP7UKmkEg3OEQxccBOjXTIj92xdLvHjRg-CKh44qBHqDCeqzqEkyXfOIKa2F1opAVy6Dgnico0fR7G4XljHrFfNit8nWejgwiYnzh_fl2dTJArpAOXpiNQz3wzgqW4",
    content: [
      "The deployment of deep neural networks on edge devices is fundamentally limited by the memory bandwidth and computational throughput of Tensor Processing Units (TPUs). Our research focuses on Sparse Matrix Optimization, specifically targeting the reduction of zero-valued weight overhead in convolutional kernels.",
      "Traditional dense matrix multiplication ignores the inherent sparsity in trained networks, leading to wasted cycles and thermal throttling. By implementing a custom Sparse Core Engine, we leverage structured pruning to skip redundant operations, achieving a theoretical 4.2x increase in inference speed while maintaining a precision loss of less than 0.1% on ImageNet-1K.",
      "The primary goal is the development of a compiler-level optimization layer that translates sparse-aware high-level code directly into TPU-optimized ISA, bypassing the standard bottlenecks of existing ML frameworks.",
    ],
    team: [
      {
        name: "Dr. Sarah Chen",
        role: "Lead Researcher",
        specialty:
          "Specializing in Hardware-Aware Neural Architecture Search (NAS) and Edge Computing.",
        image:
          "https://lh3.googleusercontent.com/aida-public/AB6AXuDbes2f0IaYyRB3m_Y1gRwsZX8qo6I98oAXEekVrkfsFjgviXaOoeBo3JhHlquH1u9rvqyI2cFUiW41KmCHGFZcbdzvksrrq0ughMuLcfubOPG_4qzERdha-oytnCugaX06n8k-UlXzaKnD9bfxCIyhNOiRiYkepWqodPdW0w0nzNc4HQMPAXwzEyOuNsokRIRsLJZZRrFw-lkfiIRrFBW6dryIuXSCFUulI0WeUCjMu_V_HPBtEv6tTmRxgbxgNJoIMLhPWDpnKCo",
      },
      {
        name: "Marcus Thorne",
        role: "Systems Architect",
        specialty:
          "Expert in low-level TPU instruction sets and high-performance compiler design.",
        image:
          "https://lh3.googleusercontent.com/aida-public/AB6AXuCOYytuQU7JBObN24hEYHeG2yxx9SY0CE2ipa3WW_DznZgM2uJqGhl6OoKdxfK32I-CvgpSzffnHuIiaG-izsuJUt02vtu_y_peIiCo2F3nIQQOxspK-_ntsOMRHitS_tg6mnmuBcE4Zf4mwuTdzzW0sy2IN3JLD-inOiDVMtyKnsu4zvF5rxoooS8TaUGOsMXWYeuQWFtcNIPBtujiCBHQE3BIVZs0SalU0mISYsMPcDN8whOURoNwvNTu-uiudmMR4_tDSuT4jfQ",
      },
    ],
    resources: [
      { label: "View on GitHub", icon: FiCode, url: "#" },
      { label: "Project Website", icon: FiGlobe, url: "#" },
      { label: "Documentation", icon: FiFileText, url: "#" },
    ],
    latestUpdate: {
      date: "OCT 24, 2024",
      version: "v0.4.1 Released",
      description:
        "Integrated support for INT8 quantization within the sparse kernel pipeline. Preliminary benchmarks show 12% power reduction.",
    },
  };

  return (
    <main className="flex-grow w-full max-w-[1920px] mx-auto relative bg-background-light dark:bg-background-dark min-h-screen">
      {/* Technical Banner & Title */}
      <section className="relative border-b border-slate-200 dark:border-slate-800">
        <div className="absolute inset-0 micro-grid opacity-10 pointer-events-none"></div>

        <div className="px-6 md:px-10 pt-32 pb-16 relative z-10 max-w-7xl mx-auto">
          <div className="text-[10px] font-bold tracking-[0.3em] text-primary uppercase mb-6">
            Project ID: {projectData.id}
          </div>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-[-0.03em] text-slate-900 dark:text-slate-100 leading-[0.95] max-w-5xl uppercase">
            {projectData.title} <br className="hidden md:block" />
            <span className="text-primary italic font-serif lowercase text-5xl md:text-7xl lg:text-8xl">
              {projectData.titleHighlight}
            </span>{" "}
            {projectData.subtitle}
          </h1>
        </div>

        {/* Banner Image */}
        <div className="w-full h-64 md:h-80 overflow-hidden border-t border-slate-200 dark:border-slate-800 relative">
          <img
            alt="Project Banner"
            className="w-full h-full object-cover grayscale brightness-75 contrast-125 dark:brightness-50 dark:contrast-150"
            src={projectData.bannerImage}
          />
          <div className="absolute inset-0 bg-primary/20 mix-blend-multiply dark:mix-blend-luminosity"></div>
        </div>
      </section>

      {/* Content Grid */}
      <section className="grid grid-cols-1 lg:grid-cols-12 w-full border-b border-slate-200 dark:border-slate-800 max-w-[1920px] mx-auto">
        {/* Left Column: Description & Team */}
        <div className="lg:col-span-8 border-r-0 lg:border-r border-slate-200 dark:border-slate-800 px-6 md:px-10 py-16 lg:py-24">
          <div className="max-w-3xl mx-auto lg:mx-0 lg:ml-auto pr-0 lg:pr-8">
            {/* Status Tags */}
            <div className="flex flex-wrap items-center gap-4 mb-12">
              <span className="text-[10px] font-bold tracking-[0.3em] uppercase bg-slate-100 dark:bg-slate-900 text-slate-900 dark:text-slate-100 px-4 py-2 border border-slate-200 dark:border-slate-800">
                Status: {projectData.status}
              </span>
              <span className="text-[10px] font-bold tracking-[0.3em] uppercase bg-slate-100 dark:bg-slate-900 text-slate-900 dark:text-slate-100 px-4 py-2 border border-slate-200 dark:border-slate-800">
                Phase: {projectData.phase}
              </span>
            </div>

            {/* Methodology Content */}
            <h2 className="text-3xl font-black tracking-tight mb-8 uppercase text-slate-900 dark:text-slate-100">
              Technical Challenges & Methodology
            </h2>
            <div className="space-y-6 text-base md:text-lg leading-relaxed text-slate-600 dark:text-slate-400 text-justify-custom">
              {projectData.content.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>

            <hr className="my-16 border-slate-200 dark:border-slate-800" />

            {/* Project Team */}
            <h2 className="text-3xl font-black tracking-tight mb-12 uppercase text-slate-900 dark:text-slate-100">
              Project Team
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              {projectData.team.map((member, index) => (
                <div key={index} className="flex gap-6 items-start group">
                  <div className="w-24 h-24 bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 overflow-hidden shrink-0">
                    <img
                      alt={member.name}
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                      src={member.image}
                    />
                  </div>
                  <div>
                    <div className="text-[10px] font-bold tracking-[0.3em] text-primary uppercase mb-1">
                      {member.role}
                    </div>
                    <h3 className="text-xl font-black uppercase text-slate-900 dark:text-slate-100 mb-2">
                      {member.name}
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                      {member.specialty}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Sidebar Resources */}
        <div className="lg:col-span-4 bg-slate-50 dark:bg-slate-900/30 px-6 md:px-10 py-16 lg:py-24">
          <div className="sticky top-32 max-w-md mx-auto lg:mx-0">
            <h2 className="text-[10px] font-bold tracking-[0.3em] text-slate-900 dark:text-slate-100 uppercase mb-8 border-b border-slate-900 dark:border-slate-100 pb-2 inline-block">
              Resources & Links
            </h2>

            <div className="space-y-4">
              {projectData.resources.map((resource, index) => (
                <Link
                  key={index}
                  href={resource.url}
                  className="group flex items-center justify-between border border-slate-200 dark:border-slate-800 p-5 bg-white dark:bg-slate-900/50 hover:bg-slate-900 hover:text-white dark:hover:bg-white dark:hover:text-slate-900 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <resource.icon className="text-xl text-slate-400 dark:text-slate-500 group-hover:text-white dark:group-hover:text-slate-900 transition-colors" />
                    <span className="font-bold text-xs uppercase tracking-widest text-slate-900 dark:text-slate-100 group-hover:text-white dark:group-hover:text-slate-900 transition-colors">
                      {resource.label}
                    </span>
                  </div>
                  <FiArrowRight className="text-lg text-slate-300 dark:text-slate-600 group-hover:text-primary transition-colors group-hover:translate-x-1" />
                </Link>
              ))}
            </div>

            {/* Latest Update Box - Inverted Theme Block */}
            <div className="mt-16 p-8 border border-slate-900 dark:border-white bg-slate-900 dark:bg-white text-white dark:text-slate-900">
              <div className="text-[10px] font-bold tracking-[0.3em] text-primary uppercase mb-4">
                Latest Update
              </div>
              <p className="text-sm font-medium leading-relaxed opacity-90">
                <strong className="block mb-1">
                  {projectData.latestUpdate.version}
                </strong>
                {projectData.latestUpdate.description}
              </p>
              <div className="mt-8 text-[10px] font-bold tracking-[0.3em] opacity-50 uppercase pt-4 border-t border-slate-800 dark:border-slate-200">
                {projectData.latestUpdate.date}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
