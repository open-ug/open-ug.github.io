"use client";
import React, { useState } from "react";
import { Menu, X, Github } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="bg-black border-b border-gray-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Brand */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-red-800 to-red-600 flex items-center justify-center">
              <span className="text-white font-bold text-lg">UG</span>
            </div>
            <div>
              <span className="text-xl font-semibold text-white">
                Open UG Labs
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <a
              href="#home"
              className="text-gray-300 hover:text-white font-medium transition-colors px-4 py-2"
            >
              Home
            </a>

            <a
              href="#about"
              className="text-gray-300 hover:text-white font-medium transition-colors px-4 py-2"
            >
              About
            </a>

            <a
              href="#projects"
              className="text-gray-300 hover:text-white font-medium transition-colors px-4 py-2"
            >
              Projects
            </a>

            <a
              href="#community"
              className="text-gray-300 hover:text-white font-medium transition-colors px-4 py-2"
            >
              Community
            </a>

            <a
              href="#contact"
              className="text-gray-300 hover:text-white font-medium transition-colors px-4 py-2"
            >
              Contact
            </a>
          </div>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <a
              href="#github"
              className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors px-4 py-2"
            >
              <Github className="w-5 h-5" />
              <span className="text-sm font-medium">GitHub</span>
            </a>
            <button className="bg-red-800 text-white px-6 py-2 font-medium hover:bg-red-700 transition-colors">
              Get Started
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-gray-300 hover:text-white transition-colors"
            >
              {isOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden border-t border-gray-800">
            <div className="py-4 space-y-2">
              <a
                href="#home"
                className="block text-gray-300 hover:text-white hover:bg-gray-900 font-medium px-4 py-3 transition-colors"
              >
                Home
              </a>

              <a
                href="#about"
                className="block text-gray-300 hover:text-white hover:bg-gray-900 font-medium px-4 py-3 transition-colors"
              >
                About
              </a>

              <a
                href="#projects"
                className="block text-gray-300 hover:text-white hover:bg-gray-900 font-medium px-4 py-3 transition-colors"
              >
                Projects
              </a>

              <a
                href="#community"
                className="block text-gray-300 hover:text-white hover:bg-gray-900 font-medium px-4 py-3 transition-colors"
              >
                Community
              </a>

              <a
                href="#contact"
                className="block text-gray-300 hover:text-white hover:bg-gray-900 font-medium px-4 py-3 transition-colors"
              >
                Contact
              </a>

              <div className="pt-4 border-t border-gray-800 space-y-3 px-4">
                <a
                  href="#github"
                  className="flex items-center space-x-2 text-gray-300 hover:text-white py-2"
                >
                  <Github className="w-5 h-5" />
                  <span className="font-medium">GitHub</span>
                </a>
                <button className="w-full bg-red-800 text-white px-6 py-3 font-medium hover:bg-red-700 transition-colors">
                  Get Started
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
