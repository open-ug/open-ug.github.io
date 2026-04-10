import React from "react";

const Mesh = () => {
  return (
    <section className="border-b border-slate-200">
      <div className="h-96 w-full bg-slate-100 dark:bg-slate-900 flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-background-light to-transparent z-10"></div>
        <div
          className="w-full h-full bg-cover bg-center opacity-40"
          style={{
            backgroundImage: "url('/mesh.png')",
          }}
        ></div>
        <div className="absolute bottom-8 right-8 z-20 text-[10px] font-mono text-slate-400 tracking-tight uppercase">
          Fig 01. Architectural Latency Mapping
        </div>
      </div>
    </section>
  );
};

export default Mesh;
