import React from "react";

export default function AnimatedBackground() {
  return (
    <div className="animated-bg pointer-events-none">
      <div className="absolute inset-0 opacity-30 mix-blend-screen bg-radial-1 bg-radial-2"></div>

      <div className="floating-shape w-96 h-96 top-20 left-20 animate-float" aria-hidden="true" />
      <div className="floating-shape round w-64 h-64 bottom-40 right-40 animate-float-delayed" aria-hidden="true" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 blur-[120px] rounded-full animate-pulse-slow opacity-70" aria-hidden="true" />

      <div className="absolute top-1/4 right-1/4 opacity-20 animate-float" style={{ animationDuration: "30s" }}>
        <span className="material-symbols-outlined text-[6rem] text-slate-700">computer</span>
      </div>
      <div className="absolute bottom-1/3 left-1/3 opacity-10 animate-float-delayed" style={{ animationDuration: "35s" }}>
        <span className="material-symbols-outlined text-[6rem] text-slate-700">memory</span>
      </div>
    </div>
  );
}