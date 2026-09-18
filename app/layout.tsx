import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./global.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/footer";

// Configure the Inter font with Next.js optimization
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

// Define your global SEO and meta tags
export const metadata: Metadata = {
  title: "Open UG Labs | Makerere University Undergraduate Lab",
  description:
    "An undergraduate computing lab at Makerere University's College of Computing and Information Sciences (CoCIS).",
  openGraph: {
    title: "Open UG Labs",
    description:
      "An undergraduate computing lab at Makerere University's College of Computing and Information Sciences (CoCIS).",
    url: "https://openug.org",
    siteName: "Open UG Labs",
    images: [
      {
        url: "/favicon-96x96.png",
        width: 96,
        height: 96,
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // suppressHydrationWarning is required here if you plan to use next-themes later
    <html lang="en" className="light" suppressHydrationWarning>
      <head>
        {/* Keeping Material Symbols via CDN for exact visual parity */}
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght@100..700,0..1&display=swap"
          rel="stylesheet"
        />
        <link
          rel="icon"
          type="image/png"
          href="/favicon-96x96.png"
          sizes="96x96"
        />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <meta name="apple-mobile-web-app-title" content="Open UG" />
        <link rel="manifest" href="/site.webmanifest" />
      </head>
      <body
        className={`${inter.variable} bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-slate-100 selection:bg-primary selection:text-white antialiased`}
      >
        <Navbar />
        <div className="relative min-h-screen flex flex-col">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
