import Link from "next/link";

export default function Navbar() {
  const navLinks = [
    { name: "Research", href: "/research" },
    { name: "Labs", href: "/labs" },
    { name: "Community", href: "/community" },
    { name: "About", href: "/about" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-background-light/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* Logo Section */}
        <div className="flex items-center gap-3">
          {/* Note: Using standard <img> here for the external URL to avoid next.config.js domain setup for now. 
              Switch to next/image (<Image />) for local assets. */}
          <img src="/logo.png" alt="Open UG Labs Logo" className="h-8 w-auto" />
          <Link
            href="/"
            className="text-xl font-extrabold tracking-tighter uppercase"
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
          <button className="bg-primary text-slate-900 px-6 py-2.5 text-xs font-bold uppercase tracking-widest hover:bg-opacity-90 transition-all cursor-pointer">
            Contact Us
          </button>
        </div>
      </div>
    </header>
  );
}
