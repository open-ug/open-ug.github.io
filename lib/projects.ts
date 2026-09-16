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
    status: "Active",
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
    name: "Orbiton JS",
    description:
      "A lightweight, minimalist JavaScript library for building browser user interfaces.",
    href: "https://orbiton.js.org/",
    category: "Open-source software",
    status: "Active",
    external: true,
  },
  {
    name: "reactjs-media",
    description:
      "A React library for building media-rich web applications with support for audio, video and WebRTC.",
    href: "https://github.com/jim-junior/reactjs-media",
    category: "Web development",
    status: "Active",
    external: true,
  },
  {
    name: "vm-alloc",
    description:
      "A Rust based CLI tool for spinning up virtual machines using libvirt, QEMU, Firecracker and KVM using cloud images.",
    href: "https://github.com/open-ug/vm-alloc",
    category: "Applied research",
    status: "Research",
    external: true,
  },
  {
    name: "Mentant",
    description: "OCaml based Machine Learning Library",
    href: "https://github.com/open-ug/vm-alloc",
    category: "Applied research",
    status: "Research",
    external: true,
  },
  {
    name: "Git APT",
    description:
      "A Github Pages based APT repository for hosting and distributing Debian packages.",
    href: "https://github.com/open-ug/apt",
    category: "Applied research",
    status: "Research",
    external: true,
  },
];
