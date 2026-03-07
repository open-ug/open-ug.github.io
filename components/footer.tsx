import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-background-light dark:bg-background-dark py-20 border-t border-slate-200 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-12 gap-12 mb-20">
          {/* Brand & Description */}
          <div className="col-span-12 md:col-span-4">
            <div className="flex items-center gap-3 mb-8">
              <img alt="Logo" className="h-6 w-auto" src="/logo.png" />
              <span className="text-lg font-black uppercase tracking-tighter">
                Open UG Labs
              </span>
            </div>
            <p className="text-sm text-slate-500 max-w-xs mb-8">
              The standard for software foundation research. Built for
              engineers, by engineers.
            </p>
            <div className="flex gap-4">
              <Link
                href="#"
                className="p-2 border border-slate-200 hover:border-primary hover:text-primary transition-all"
              >
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.042-1.416-4.042-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"></path>
                </svg>
              </Link>
              <Link
                href="#"
                className="p-2 border border-slate-200 hover:border-primary hover:text-primary transition-all"
              >
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.84 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"></path>
                </svg>
              </Link>
            </div>
          </div>

          {/* Links: Explore */}
          <div className="col-span-6 md:col-span-2">
            <h6 className="text-[10px] font-bold uppercase tracking-widest mb-6">
              Explore
            </h6>
            <ul className="flex flex-col gap-3 text-sm text-slate-500 font-medium">
              <li>
                <Link className="hover:text-primary" href="#">
                  Research Papers
                </Link>
              </li>
              <li>
                <Link className="hover:text-primary" href="#">
                  Labs & Infrastructure
                </Link>
              </li>
              <li>
                <Link className="hover:text-primary" href="#">
                  Toolsets
                </Link>
              </li>
              <li>
                <Link className="hover:text-primary" href="#">
                  Whitepapers
                </Link>
              </li>
            </ul>
          </div>

          {/* Links: Community */}
          <div className="col-span-6 md:col-span-2">
            <h6 className="text-[10px] font-bold uppercase tracking-widest mb-6">
              Community
            </h6>
            <ul className="flex flex-col gap-3 text-sm text-slate-500 font-medium">
              <li>
                <Link className="hover:text-primary" href="#">
                  Mentorship
                </Link>
              </li>
              <li>
                <Link className="hover:text-primary" href="#">
                  Grants Program
                </Link>
              </li>
              <li>
                <Link className="hover:text-primary" href="#">
                  Events
                </Link>
              </li>
              <li>
                <Link className="hover:text-primary" href="#">
                  Careers
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter Subscription */}
          <div className="col-span-12 md:col-span-4 flex flex-col items-start md:items-end">
            <h6 className="text-[10px] font-bold uppercase tracking-widest mb-6">
              Stay Updated
            </h6>
            <div className="flex w-full max-w-sm border border-slate-300">
              <input
                className="flex-grow bg-transparent border-none text-xs font-bold uppercase tracking-widest focus:ring-0 px-4 py-3"
                placeholder="Email Address"
                type="email"
              />
              <button className="bg-primary px-6 py-3 text-[10px] font-black uppercase tracking-widest text-slate-900 border-l border-slate-300">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-12 border-t border-slate-200 dark:border-slate-800 gap-6">
          <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
            © 2024 Open UG Labs. All Rights Reserved.
          </span>
          <div className="flex gap-8">
            <Link
              className="text-[10px] font-bold uppercase tracking-widest text-slate-400 hover:text-primary"
              href="#"
            >
              Privacy Policy
            </Link>
            <Link
              className="text-[10px] font-bold uppercase tracking-widest text-slate-400 hover:text-primary"
              href="#"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
