"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiMenu, FiX } from "react-icons/fi";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const navLinks = [{ name: "About", href: "#about" }];

  return (
    <header className="fixed top-0 left-0 w-full z-40">
      {/* Frosted glass background */}
      <div className="backdrop-blur-xl bg-white/10 border-b border-white/10 shadow-lg">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="flex items-center gap-3"
          >
            <img
              src="/logo.png" // Replace with your actual logo asset
              alt="Logo"
              width={38}
              height={38}
              className="opacity-90"
            />
            <span className="text-white font-semibold text-lg tracking-wide hidden sm:block">
              OPEN UG LABS
            </span>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8 text-white/90 font-medium">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="hover:text-white transition-colors duration-200"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setOpen(true)}
            className="md:hidden text-white text-2xl"
          >
            <FiMenu />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 120, damping: 20 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-xl z-50 flex flex-col"
          >
            <div className="flex justify-end p-6">
              <button
                onClick={() => setOpen(false)}
                className="text-white text-3xl"
              >
                <FiX />
              </button>
            </div>

            <div className="flex flex-col items-center justify-center gap-8 mt-10 text-white text-2xl font-light">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="hover:text-blue-200 transition-colors"
                >
                  {link.name}
                </a>
              ))}

              <button className="mt-10 px-8 py-3 rounded-full bg-white/20 hover:bg-white/30 border border-white/20 transition-all">
                Join Us
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
