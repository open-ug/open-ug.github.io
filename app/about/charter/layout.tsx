import Image from "next/image";
import React from "react";

export const metadata = {
  title: "OPEN UG LABS CHARTER",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main className="max-w-3xl mx-auto px-4 py-8">
      <Image
        src="/logo.png"
        alt="Open UG Labs Logo"
        width={120}
        height={120}
        className="mx-auto mb-6"
      />
      <h1 className="text-5xl text-center font-extrabold mb-4">
        OPEN UG LABS CHARTER
      </h1>
      {children}
    </main>
  );
}
