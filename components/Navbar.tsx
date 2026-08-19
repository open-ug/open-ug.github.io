import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  const navLinks = [
    { name: "Projects", href: "/projects" },
    { name: "Charter", href: "/about/charter" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-background-light/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* Logo Section */}
        <div className="flex items-center gap-3">
          <Image
            src="/logo.png"
            alt="Open UG Labs Logo"
            width={32}
            height={32}
            className="h-8 w-auto"
            priority
          />
          <Link
            href="/"
            className="hidden text-xl font-extrabold tracking-tighter uppercase sm:block"
          >
            Open UG Labs
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-12">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-xs font-bold uppercase tracking-widest hover:text-primary transition-colors"
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Action Button */}
        <div className="flex items-center gap-6">
          <Link
            href="/projects"
            className="bg-primary text-slate-900 px-4 sm:px-6 py-2.5 text-[10px] sm:text-xs font-bold uppercase tracking-widest hover:bg-slate-900 hover:text-white transition-all"
          >
            View projects
          </Link>
        </div>
      </div>
    </header>
  );
}
