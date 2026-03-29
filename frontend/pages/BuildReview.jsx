// src/pages/BuildReview.jsx
import React from "react";

export default function BuildReview() {
  return (
    <main className="relative">
      <div className="bg-[#0f172a]/60 p-6 rounded-xl glass-panel">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-1">
            {/* Left column list of parts */}
            <div className="p-4 border-b border-white/10">
              <h2 className="text-xl font-bold text-white">Build Status: Ready</h2>
              <p className="text-slate-400 text-sm">Your configuration is verified compatible. 8 components selected.</p>
            </div>
            <div className="p-4 space-y-3">
              <div className="flex items-center justify-between p-3 rounded-lg hover:bg-white/5">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded bg-cover bg-center" />
                  <div>
                    <div className="text-white font-medium">Intel Core i9-13900K</div>
                    <div className="text-slate-500 text-xs">CPU • LGA1700</div>
                  </div>
                </div>
                <span className="material-symbols-outlined text-green-400">check_circle</span>
              </div>

              {/* Example of warning */}
              <div className="flex items-center justify-between p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded bg-cover bg-center" />
                  <div>
                    <div className="text-white font-medium">Corsair Vengeance 32GB</div>
                    <div className="text-yellow-500 text-xs">Clearance Warning</div>
                  </div>
                </div>
                <span className="material-symbols-outlined text-yellow-500">warning</span>
              </div>
            </div>
          </div>

          <div className="md:col-span-2">
            {/* AI Insights area */}
            <div className="p-4">
              <h3 className="text-lg font-bold text-white">AI Compatibility Insights</h3>
              <div className="mt-4 space-y-4">
                <div className="p-4 rounded-lg bg-green-500/5 border border-green-500/10">
                  <div className="text-white font-bold">Perfect Socket Match</div>
                  <p className="text-slate-300 text-sm">Intel Core i9-13900K is fully compatible with LGA1700.</p>
                </div>

                <div className="p-4 rounded-lg bg-yellow-500/5 border border-yellow-500/10">
                  <div className="text-white font-bold">Clearance Alert</div>
                  <p className="text-slate-300 text-sm">Selected RAM height is 44mm; check case clearance.</p>
                </div>

                <div className="p-4 rounded-lg bg-primary/5 border border-primary/10">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="text-white font-bold">Power Overhead</div>
                      <p className="text-slate-400 text-xs">Based on TDP estimates</p>
                    </div>
                    <div className="text-primary font-bold">+150W</div>
                  </div>
                  <div className="mt-3">
                    <div className="relative w-full h-3 bg-slate-800 rounded-full overflow-hidden">
                      <div className="absolute top-0 left-0 bottom-0 bg-gradient-to-r from-green-500 to-primary w-[85%] rounded-full"/>
                    </div>
                    <div className="flex justify-between text-xs text-slate-400 mt-2">
                      <span>0W</span>
                      <span>Est. Load: 850W</span>
                      <span>Max: 1000W</span>
                    </div>
                  </div>
                </div>

              </div>
            </div>

            {/* Footer / actions */}
            <div className="p-4 border-t border-white/10 mt-4 flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-xs">Estimated Total</p>
                <h2 className="text-3xl font-bold text-white">₹2,36,000</h2>
              </div>
              <div className="flex gap-3">
                <button className="bg-primary text-white px-4 py-3 rounded-lg">Download Parts List</button>
                <button className="bg-transparent border border-white/20 text-white px-4 py-3 rounded-lg">Share Build</button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}