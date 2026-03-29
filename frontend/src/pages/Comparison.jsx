// src/pages/Comparison.jsx
import React from "react";

export default function Comparison() {
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
        {/* three profile cards */}
        <div className="glass-panel rounded-2xl p-1 group h-full">
          <div className="bg-slate-900/40 rounded-xl p-6 h-full flex flex-col">
            <h4 className="text-xl font-bold text-white mb-1">Budget Friendly</h4>
            <div className="text-2xl font-bold text-slate-200 mb-4">₹54,000</div>
            <div className="flex justify-center py-6">
              <span className="material-symbols-outlined text-[80px] text-slate-300">desktop_windows</span>
            </div>
            <p className="text-slate-400 text-xs mb-6 text-center">Best for web browsing, Office apps, and streaming content.</p>
            <button className="mt-auto w-full py-3 rounded-lg border border-white/10 text-slate-300 text-sm font-medium hover:bg-white/5">Select Profile</button>
          </div>
        </div>

        <div className="glass-panel-active rounded-2xl p-1 relative z-10">
          <div className="bg-slate-900/60 rounded-xl p-6 h-full flex flex-col">
            <div className="absolute -top-3 inset-x-0 flex justify-center z-20">
              <span className="bg-primary text-white text-[10px] px-3 py-1 rounded-full animate-pulse-slow">AI Recommended</span>
            </div>
            <h4 className="text-xl font-bold text-white mb-1">Balanced Performance</h4>
            <div className="text-3xl font-bold text-primary-glow mb-4">₹1,00,000</div>
            <div className="flex justify-center py-6">
              <span className="material-symbols-outlined text-[90px] text-white animate-float">computer</span>
            </div>
            <p className="text-slate-300 text-xs mb-6 text-center">Excellent multitasker for editing, gaming, and research.</p>
            <div className="mt-auto">
              <div className="h-2 w-full bg-slate-700 rounded-full overflow-hidden">
                <div className="h-full bg-primary w-3/4" />
              </div>
              <p className="text-[10px] text-primary text-center mt-2 font-mono">PERFORMANCE INDEX: 85/100</p>
            </div>
          </div>
        </div>

        <div className="glass-panel rounded-2xl p-1 group h-full">
          <div className="bg-slate-900/40 rounded-xl p-6 h-full flex flex-col">
            <h4 className="text-xl font-bold text-white mb-1">High-End Power</h4>
            <div className="text-2xl font-bold text-slate-200 mb-4">₹1,75,000</div>
            <div className="flex justify-center py-6">
              <span className="material-symbols-outlined text-[80px] text-slate-300">precision_manufacturing</span>
            </div>
            <p className="text-slate-400 text-xs mb-6 text-center">Uncompromised speed for 3D rendering and 4K workflows.</p>
            <button className="mt-auto w-full py-3 rounded-lg border border-white/10 text-slate-300 text-sm font-medium hover:bg-white/5">Select Profile</button>
          </div>
        </div>
      </div>

      <div className="glass-panel rounded-2xl overflow-hidden mt-8">
        <div className="px-6 py-4 border-b border-white/10 bg-white/5 flex justify-between items-center">
          <h3 className="text-lg font-bold text-white">Component Configuration</h3>
          <span className="text-xs text-slate-400">Comparing <strong className="text-white">Balanced</strong> vs others</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-400">
            <thead className="bg-white/5 text-xs uppercase text-slate-300">
              <tr>
                <th className="px-6 py-4">Component</th>
                <th className="px-6 py-4 opacity-50">Budget</th>
                <th className="px-6 py-4 text-primary">Balanced (Selected)</th>
                <th className="px-6 py-4 opacity-50">High-End</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              <tr className="hover:bg-white/5">
                <td className="px-6 py-4 font-medium text-white">CPU</td>
                <td className="px-6 py-4 opacity-60">i3-12100F</td>
                <td className="px-6 py-4 text-white bg-primary/5 border-l-2 border-primary">i5-13600K</td>
                <td className="px-6 py-4 opacity-60">i9-13900K</td>
              </tr>
              <tr className="hover:bg-white/5">
                <td className="px-6 py-4 font-medium text-white">GPU</td>
                <td className="px-6 py-4 opacity-60">RX 6600</td>
                <td className="px-6 py-4 text-white bg-primary/5 border-l-2 border-primary">RTX 3060 Ti</td>
                <td className="px-6 py-4 opacity-60">RTX 4080</td>
              </tr>
              <tr className="hover:bg-white/5">
                <td className="px-6 py-4 font-medium text-white">RAM</td>
                <td className="px-6 py-4 opacity-60">16GB DDR4</td>
                <td className="px-6 py-4 text-white bg-primary/5 border-l-2 border-primary">32GB DDR5</td>
                <td className="px-6 py-4 opacity-60">64GB DDR5</td>
              </tr>
            </tbody>
            <tfoot className="border-t border-white/10 bg-white/5">
              <tr>
                <td className="px-6 py-6"></td>
                <td className="px-6 py-6"><button className="text-xs text-slate-400 hover:text-white underline">Switch to Budget</button></td>
                <td className="px-6 py-6">
                  <button className="w-full bg-primary text-white py-3 rounded-lg font-bold text-sm flex items-center justify-center gap-2">
                    Finalize This Build <span className="material-symbols-outlined">arrow_forward</span>
                  </button>
                </td>
                <td className="px-6 py-6"><button className="text-xs text-slate-400 hover:text-white underline">Switch to High-End</button></td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  );
}