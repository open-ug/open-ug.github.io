/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { motion } from "framer-motion";
import { FiGithub, FiLinkedin } from "react-icons/fi";

export default function Footer() {
  return (
    <footer className="relative bg-gray-950 text-gray-300 border-t border-gray-800 py-20">
      {/* Glow background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute left-1/3 bottom-0 w-[350px] h-[350px] bg-blue-600/10 blur-[160px] rounded-full" />
        <div className="absolute right-1/4 top-10 w-[280px] h-[280px] bg-blue-300/10 blur-[200px] rounded-full" />
      </div>

      <div className="relative container mx-auto px-6 z-10">
        <div className="grid md:grid-cols-4 gap-10">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-xl font-bold text-blue-300">Open UG Labs</h3>
            <p className="mt-4 text-gray-400 text-sm leading-relaxed">
              Open Pan East African Neo-Technology Laboratories.
              <br />
              Building an open-source, vendor-neutral platform for the East
              African tech ecosystem.
            </p>

            {/* Social links */}
            <div className="flex gap-5 mt-6">
              <a
                href="https://github.com/open-ug"
                target="_blank"
                className="text-gray-400 hover:text-blue-300 transition"
              >
                <FiGithub className="w-6 h-6" />
              </a>

              <a
                href="https://www.linkedin.com/company/open-ug/"
                target="_blank"
                className="text-gray-400 hover:text-blue-300 transition"
              >
                <FiLinkedin className="w-6 h-6" />
              </a>
            </div>
          </motion.div>

          {/* Navigation */}
          <FooterColumn
            title="Navigation"
            items={[
              { name: "About", link: "#about" },
              { name: "What We Do", link: "#what-we-do" },
              { name: "Projects", link: "#projects" },
              { name: "Contact", link: "#contact" },
            ]}
          />

          {/* Projects */}
          <FooterColumn
            title="Projects"
            items={[
              { name: "Conveyor CI", link: "https://conveyor.open.ug/" },
              { name: "PQ-TLS", link: "https://github.com/open-ug/pqtls" },
              { name: "Orbiton JS", link: "https://orbitonjs.com/" },
            ]}
          />

          {/* Communities */}
          <FooterColumn
            title="Communities"
            items={[
              {
                name: "Cloud Native Kampala",
                link: "https://cloudnative.open.ug/",
              },
              { name: "Quantum Uganda", link: "#" },
            ]}
          />
        </div>

        {/* Bottom line */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="mt-16 pt-8 border-t border-gray-800 text-center text-gray-500 text-sm"
        >
          © {new Date().getFullYear()} Open UG Labs — Empowering Open Research
          Across East Africa.
        </motion.div>
      </div>
    </footer>
  );
}

function FooterColumn({ title, items }: any) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <h4 className="text-lg font-semibold text-gray-100 mb-4">{title}</h4>
      <ul className="space-y-3">
        {items.map((item: any, index: number) => (
          <li key={index}>
            <a
              href={item.link}
              target="_blank"
              className="text-gray-400 hover:text-blue-300 transition text-sm"
            >
              {item.name}
            </a>
          </li>
        ))}
      </ul>
    </motion.div>
  );
}
