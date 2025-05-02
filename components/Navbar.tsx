"use client";
import Link from "next/link";
import { useState } from "react";
import {
  FiHome,
  FiFolder,
  FiFileText,
  FiUser,
  FiGithub,
  FiMenu,
  FiX,
} from "react-icons/fi";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-gray-100 text-black shadow-lg z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and site name */}
          <div className="flex-shrink-0 flex items-center">
            <img className="h-12 w-12" src="/favicon.svg" alt="Open UG Logo" />
            <span className="font-bold text-xl text-black">Open UG</span>
          </div>

          {/* Desktop menu */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-4">
              <Link
                href="/"
                className="flex items-center px-3 py-2 rounded-md text-sm font-medium text-black hover:bg-red-600 hover:text-white transition duration-300"
              >
                <FiHome className="mr-1" />
                Home
              </Link>
              <a
                href="/projects"
                className="flex items-center px-3 py-2 rounded-md text-sm font-medium text-black hover:bg-red-600 hover:text-white transition duration-300"
              >
                <FiFolder className="mr-1" />
                Projects
              </a>
              <a
                href="/accords"
                className="flex items-center px-3 py-2 rounded-md text-sm font-medium text-black hover:bg-red-600 hover:text-white transition duration-300"
              >
                <FiFileText className="mr-1" />
                Accords
              </a>
              <a
                href="/about"
                className="flex items-center px-3 py-2 rounded-md text-sm font-medium text-black hover:bg-red-600 hover:text-white transition duration-300"
              >
                <FiUser className="mr-1" />
                About
              </a>
              <a
                href="https://github.com/yourusername"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center px-3 py-2 rounded-md text-sm font-medium bg-yellow-400 text-black hover:bg-yellow-500 transition duration-300"
              >
                <FiGithub className="mr-1" />
                GitHub
              </a>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-black hover:text-white hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-red-500"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                <FiX className="block h-6 w-6" />
              ) : (
                <FiMenu className="block h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu, show/hide based on menu state */}
      <div className={`${isOpen ? "block" : "hidden"} md:hidden`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t border-gray-200">
          <Link
            href="/"
            className="flex items-center px-3 py-2 rounded-md text-base font-medium text-black hover:bg-red-600 hover:text-white"
          >
            <FiHome className="mr-2" />
            Home
          </Link>
          <a
            href="/projects"
            className="flex items-center px-3 py-2 rounded-md text-base font-medium text-black hover:bg-red-600 hover:text-white"
          >
            <FiFolder className="mr-2" />
            Projects
          </a>
          <a
            href="/accords"
            className="flex items-center px-3 py-2 rounded-md text-base font-medium text-black hover:bg-red-600 hover:text-white"
          >
            <FiFileText className="mr-2" />
            Accords
          </a>
          <a
            href="/about"
            className="flex items-center px-3 py-2 rounded-md text-base font-medium text-black hover:bg-red-600 hover:text-white"
          >
            <FiUser className="mr-2" />
            About
          </a>
          <a
            href="https://github.com/yourusername"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center px-3 py-2 rounded-md text-base font-medium bg-yellow-400 text-black hover:bg-yellow-500"
          >
            <FiGithub className="mr-2" />
            GitHub
          </a>
        </div>
      </div>
    </nav>
  );
}
