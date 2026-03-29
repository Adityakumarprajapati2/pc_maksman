// src/components/StatusPanel.jsx
import React from "react";

export default function StatusPanel() {
  return (
    <div className="status-panel glass-panel p-4 rounded-lg">
      <h4 className="text-sm font-bold text-slate-200">Build Status</h4>
      <div className="health-circle w-28 h-28 rounded-full bg-gradient-to-b from-[#06233a] to-[#08314d] text-center flex items-center justify-center mt-4">
        <div className="text-2xl font-bold text-[#8bd3ff]">85%</div>
      </div>
      <div className="mt-4 space-y-2 text-sm text-slate-300">
        <div className="flex justify-between"><span>Power</span><strong className="text-emerald-400">Optimal</strong></div>
        <div className="flex justify-between"><span>Thermal</span><strong className="text-primary">Good</strong></div>
        <div className="flex justify-between"><span>Fit</span><strong className="text-amber-400">Conflict</strong></div>
      </div>
    </div>
  );
}