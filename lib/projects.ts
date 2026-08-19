export type Project = {
  name: string;
  description: string;
  href: string;
  category: string;
  status: string;
  external?: boolean;
};

export const projects: Project[] = [
  {
    name: "Makerere CS Website",
    description:
      "Maintaining and improving the digital home of Makerere University's Department of Computer Science.",
    href: "/projects/makerere-cs-website",
    category: "Digital infrastructure",
    status: "Recruiting",
  },
  {
    name: "Conveyor CI",
    description:
      "An open-source, lightweight engine for building continuous integration and delivery systems.",
    href: "https://conveyor.open.ug/",
    category: "Developer tools",
    status: "Active",
    external: true,
  },
  {
    name: "Post Quantum TLS",
    description:
      "An experimental TLS protocol variant designed to support post-quantum cryptography.",
    href: "https://github.com/open-ug/pqtls",
    category: "Applied research",
    status: "Research",
    external: true,
  },
  {
    name: "Orbiton JS",
    description:
      "A lightweight, minimalist JavaScript library for building browser user interfaces.",
    href: "https://orbiton.js.org/",
    category: "Open-source software",
    status: "Active",
    external: true,
  },
];
