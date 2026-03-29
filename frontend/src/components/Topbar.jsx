// src/components/Topbar.jsx
import React from "react";

export default function Topbar() {
  return (
    <div className="sticky top-0 z-30 pt-6 px-4 md:px-8 pb-6 bg-gradient-to-b from-[#0f172a] via-[#0f172a]/95 to-transparent backdrop-blur-sm">
      <div className="max-w-7xl mx-auto w-full flex flex-col md:flex-row justify-between items-end md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="bg-primary/20 border border-primary/40 text-primary-glow text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded shadow-[0_0_10px_rgba(19,135,236,0.2)]">AI Configurator Mode</span>
            <span className="text-slate-400 text-xs flex items-center gap-1">
              <span className="material-symbols-outlined text-[14px]">auto_awesome</span>
              Optimized for Productivity
            </span>
          </div>
          <h2 className="text-white text-3xl md:text-4xl font-bold leading-tight tracking-tight">PC Builder - A Stack for Your Own PC</h2>
          <p className="text-slate-400 text-sm mt-1 max-w-xl">Select a base profile below to customize your build.</p>
        </div>

        <div className="flex items-center gap-4">
          <button className="glass-panel px-4 py-2 rounded-lg text-sm font-medium text-slate-300 hover:text-white hover:bg-white/10 transition flex items-center gap-2">
            <span className="material-symbols-outlined text-[18px]">share</span> Share
          </button>
          <button className="glass-panel px-4 py-2 rounded-lg text-sm font-medium text-slate-300 hover:text-white hover:bg-white/10 transition flex items-center gap-2">
            <span className="material-symbols-outlined text-[18px]">restart_alt</span> Reset
          </button>
        </div>
      </div>
    </div>
  );
}