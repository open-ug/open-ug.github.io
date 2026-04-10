import Link from "next/link";
import { FiArrowRight, FiPlus } from "react-icons/fi";

export default function PeopleRegistry() {
  const principalInvestigators = [
    {
      id: "ID_088 / RESEARCH_LEAD",
      name: "DR. ELIAS VANCE",
      role: "Head of Neural Architecture",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuCNGpEx9ssAQ4v4yleYHRXlQIhNMpPL7g6xz_A3JyR23RM_TTKTzjuQe0cM1u4H4-YNaVb96dqrMZ1p712tBljaoAB0cpYUbOYytShYRL1OZkYjN4VhFYumM0x1H1yi65bGy7g2oXXL3uFdh8Clv9r9A6bBKG2-JcvEVLbhGSxTO7037zLff3KvkIOAHnn6Ph9RO3oRUKeb-5i1kWAwO27SLTb1pcizPdhnAf2vHZ7_1zKgqepVwq4lA9mJr-l2mTG8Xem3bdqN5q4",
      link: "#",
    },
    {
      id: "ID_042 / CHIEF_OFFICER",
      name: "SARAH CHEN",
      role: "Director of Applied Synthesis",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuD7fyHOX0x81da5rB7LFCwyAK3Igfi8-WVbsiI-qMzYEUGugsBY5e-0CMxvc5ppkfc2jQMqwZDncECCpHBeh5n0CB_DUxmBtjjvkPtsF7zi9gLUOQI8k0K-9yQ1hW3H-htavBVpNhzVGBDDzkLC9mBQO1y-_YCdlRm4Se0cwt1i2xPj7-wDXyeS0xPUGydbM3bmNl_QoBUEunL7FPgPbvN0kp8T2rky6IL-ARj3ewJrx8XDc3XBqIo2DrYUu20JgqVLkDUvY_l6KBA",
      link: "#",
    },
    {
      id: "ID_101 / ENG_LEAD",
      name: "MARCUS THORNE",
      role: "Principal Systems Architect",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuAq1sgexM1-stF60l9G_GY7EDLB_t_QbGa1-mEjCLnP07_1kJeRVoMK0muHxs5wEfacpobjHYZhT_xPY9HWB1z6buHwae_8S-8H4Uk5O7LtkXexVJoUoJPm6R2W5PM9r3l0GbLFeRN7EwEeM3pl8XYlu1enHQ4htTRMZgiKpNxTmoUpZXvMsOA2mZEjZG3J4QTsENXYPvO25fbvx6l0kCmn8tH0u3WgQHA-HQPe7xomp6oq_Evcw4ltRt6mClHhjZdyFXAbjwerXgk",
      link: "#",
    },
    {
      id: "ID_059 / THEORY_LEAD",
      name: "DR. LENA OCKER",
      role: "Lead Researcher, Logic Systems",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuAuGKsDi1_W7znodpTreEKsxdJAlKWop1RPpxZVyLiS2nzcE0bT0uF1n5iZ0RD2gt-PMhGN7B3ly5FWldyjq56o9C8r8c62qxQDch2oiIpnOTCMjnCj2MSTYYYQ-Oc62rEJdVsqS1swqzG80lvdOoWLF6IctsE1oPms7TtyAltSWQsMs3hwB4QwnPfxtgRP7YOMqR7ZCwMTsuj4Fc_6IjjRPiijVPCubobPjEmoICuFGXpxAKhWfGRZvltJOcH7rtfdGwoKrsivWJw",
      link: "#",
    },
  ];

  const affiliates = [
    {
      id: "01",
      name: "Arthur Penhaligon",
      specialty: "Quantum Field Topology",
      clearance: "L4_CLEARANCE",
    },
    {
      id: "02",
      name: "Elena Rodriguez",
      specialty: "Kinetic Computation",
      clearance: "L3_CLEARANCE",
    },
    {
      id: "03",
      name: "Joon-Ho Kim",
      specialty: "Sub-atomic Interfacing",
      clearance: "L5_CLEARANCE",
    },
    {
      id: "04",
      name: "Beatrix Ost",
      specialty: "Formal Verification",
      clearance: "L4_CLEARANCE",
    },
    {
      id: "05",
      name: "Silas Marner",
      specialty: "Distributed Consensus",
      clearance: "L2_CLEARANCE",
    },
  ];

  return (
    <main className="min-h-screen bg-background-light dark:bg-background-dark pt-16">
      {/* Hero Section / Title */}
      <header className="relative px-6 md:px-8 pt-24 pb-12 overflow-hidden border-b border-slate-200 dark:border-slate-800">
        <div className="absolute inset-0 micro-grid opacity-10 pointer-events-none"></div>
        <div className="max-w-7xl mx-auto relative z-10">
          <p className="text-[10px] font-bold tracking-[0.3em] text-primary uppercase mb-4">
            PERSONNEL_REGISTRY / 2024
          </p>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-[-0.05em] uppercase leading-none text-slate-900 dark:text-slate-100">
            Intellectual <br />
            <span className="italic font-serif lowercase text-slate-500 dark:text-slate-400">
              infrastructure
            </span>
          </h1>
        </div>
      </header>

      {/* Core Members Section */}
      <section className="px-6 md:px-8 py-24 bg-slate-50 dark:bg-slate-900/20">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-end mb-16 gap-4">
            <div>
              <h2 className="text-[10px] font-bold tracking-[0.3em] text-slate-900 dark:text-slate-100 uppercase border-l-2 border-primary pl-4">
                SECTION_01: CORE_RESOURCES
              </h2>
              <h3 className="text-4xl font-black uppercase mt-4 tracking-tighter text-slate-900 dark:text-slate-100">
                Principal Investigators
              </h3>
            </div>
            <div className="hidden lg:block text-right">
              <span className="text-[10px] font-bold tracking-[0.3em] text-slate-500 uppercase block mb-1">
                TOTAL_RECORDS
              </span>
              <span className="text-2xl font-black text-slate-900 dark:text-slate-100">
                04_FOUND
              </span>
            </div>
          </div>

          {/* Featured Members Grid (Using gap-px for perfect borders) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-slate-200 dark:bg-slate-800 border border-slate-200 dark:border-slate-800">
            {principalInvestigators.map((investigator, index) => (
              <Link
                href={investigator.link}
                key={index}
                className="group bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors duration-300 flex flex-col"
              >
                <div className="aspect-[3/4] overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-500">
                  <img
                    className="w-full h-full object-cover"
                    alt={investigator.name}
                    src={investigator.image}
                  />
                </div>
                <div className="p-8 flex-grow flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] font-bold tracking-[0.3em] text-primary uppercase block mb-2">
                      {investigator.id}
                    </span>
                    <h4 className="text-2xl font-black uppercase tracking-tighter leading-none mb-2 text-slate-900 dark:text-slate-100">
                      {investigator.name}
                    </h4>
                    <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
                      {investigator.role}
                    </p>
                  </div>
                  <div className="mt-8 pt-4 border-t border-slate-200 dark:border-slate-800 flex justify-between items-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-slate-900 dark:text-slate-100">
                      VIEW_DOSSIER
                    </span>
                    <FiArrowRight className="text-primary text-xl" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Affiliated Members Section */}
      <section className="px-6 md:px-8 pb-32 pt-24 bg-background-light dark:bg-background-dark">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-4 mb-12">
            <h2 className="text-[10px] font-bold tracking-[0.3em] text-slate-900 dark:text-slate-100 uppercase border-l-2 border-primary pl-4 whitespace-nowrap">
              SECTION_02: AFFILIATES_NODES
            </h2>
            <div className="h-px bg-slate-200 dark:bg-slate-800 flex-grow"></div>
          </div>

          {/* Table Style Compact Grid */}
          <div className="divide-y divide-slate-200 dark:divide-slate-800 border-t border-b border-slate-200 dark:border-slate-800">
            {affiliates.map((affiliate, index) => (
              <div
                key={index}
                className="grid grid-cols-1 md:grid-cols-12 py-6 px-4 items-center group hover:bg-slate-50 dark:hover:bg-slate-900/50 transition-colors cursor-crosshair gap-4 md:gap-0"
              >
                <div className="hidden md:block col-span-1 text-[10px] font-bold tracking-[0.3em] text-slate-400 dark:text-slate-600">
                  {affiliate.id}
                </div>
                <div className="md:col-span-4 font-black uppercase tracking-tight text-slate-900 dark:text-slate-100 group-hover:text-primary dark:group-hover:text-primary transition-colors">
                  {affiliate.name}
                </div>
                <div className="md:col-span-4 text-xs font-bold tracking-[0.1em] text-slate-500 dark:text-slate-400 uppercase">
                  {affiliate.specialty}
                </div>
                <div className="md:col-span-2 text-[10px] font-bold tracking-[0.2em] text-slate-400 dark:text-slate-500 uppercase md:text-right">
                  {affiliate.clearance}
                </div>
                <div className="hidden md:flex col-span-1 justify-end">
                  <FiPlus className="text-xl text-slate-300 dark:text-slate-700 group-hover:text-primary dark:group-hover:text-primary transition-colors" />
                </div>
              </div>
            ))}
          </div>

          {/* Technical Footer / Recruitment CTA */}
          <div className="mt-16 flex flex-col md:flex-row justify-between items-center bg-slate-100 dark:bg-slate-900/50 p-8 md:p-12 border border-slate-200 dark:border-slate-800">
            <div className="mb-8 md:mb-0 text-center md:text-left">
              <p className="text-[10px] font-bold tracking-[0.3em] text-slate-500 dark:text-slate-400 uppercase mb-2">
                RECRUITMENT_STATUS
              </p>
              <p className="text-xl md:text-2xl font-black uppercase text-slate-900 dark:text-slate-100">
                Active Search for Senior Researchers{" "}
                <br className="hidden md:block" /> in Meta-Materials
              </p>
            </div>
            <button className="border-2 border-slate-900 dark:border-white px-8 py-4 text-[10px] font-bold tracking-[0.3em] uppercase text-slate-900 dark:text-white hover:bg-slate-900 hover:text-white dark:hover:bg-white dark:hover:text-slate-900 transition-all">
              SUBMIT_CREDENTIALS
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
