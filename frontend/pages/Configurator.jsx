// src/pages/Configurator.jsx
import React from "react";

export default function Configurator() {
  return (
    <div>
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/20 text-primary mb-4">
          <span className="material-symbols-outlined text-lg">smart_toy</span>
          <span className="text-xs font-bold uppercase tracking-wide">AI Recommendation Engine</span>
        </div>
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">Select Your Graphics Card</h2>
        <p className="text-slate-400 max-w-xl mx-auto text-lg">Based on your 1440p gaming goal and Ryzen 5 5600X CPU, I've curated these top performers under ₹40,000.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left card */}
        <div className="glass-card rounded-2xl p-1 group overflow-hidden">
          <div className="h-full flex flex-col bg-slate-900/40 rounded-xl p-6 border border-white/5">
            <div className="flex justify-between items-start mb-6">
              <div className="bg-slate-800/80 text-white text-xs font-bold px-3 py-1.5 rounded-lg">Ray Tracing King</div>
              <button className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-slate-400 border border-white/5"><span className="material-symbols-outlined">favorite</span></button>
            </div>
            <div className="relative h-48 mb-6 flex items-center justify-center">
              <span className="material-symbols-outlined text-9xl text-slate-600">memory</span>
              <div className="absolute bottom-0 right-0 bg-black/60 px-2 py-1 text-[10px] text-slate-300 rounded border border-white/10">RTX 3060 Ti</div>
            </div>
            <div className="mt-auto">
              <h3 className="text-2xl font-bold text-white">NVIDIA GeForce RTX 3060 Ti</h3>
              <div className="flex items-center gap-4 mt-2 text-sm text-slate-400">
                <span className="flex items-center gap-1"><span className="material-symbols-outlined">speed</span> 1665 MHz</span>
                <span className="flex items-center gap-1"><span className="material-symbols-outlined">sd_storage</span> 8GB GDDR6</span>
              </div>
              <div className="h-px bg-white/10 my-4" />
              <div className="flex items-end justify-between">
                <div>
                  <span className="text-xs text-slate-500 uppercase font-bold">Best Price</span>
                  <div className="text-2xl font-bold text-white">₹36,500</div>
                </div>
                <button className="bg-white text-slate-900 font-bold px-6 py-3 rounded-xl shadow-lg">Add to Build</button>
              </div>
            </div>
          </div>
        </div>

        {/* Right card */}
        <div className="glass-card rounded-2xl p-1 group overflow-hidden ring-2 ring-primary/30">
          <div className="h-full flex flex-col bg-slate-900/40 rounded-xl p-6 border border-primary/30">
            <div className="absolute top-0 right-0 bg-primary text-white text-xs px-4 py-1.5 rounded-bl-xl">AI RECOMMENDED</div>
            <div className="relative h-48 mb-6 flex items-center justify-center">
              <span className="material-symbols-outlined text-9xl text-slate-600">developer_board</span>
              <div className="absolute bottom-0 right-0 bg-black/60 px-2 py-1 text-[10px] text-slate-300 rounded border border-white/10">RX 6700 XT</div>
            </div>
            <div className="mt-auto">
              <h3 className="text-2xl font-bold text-white">AMD Radeon RX 6700 XT</h3>
              <div className="flex items-center gap-4 mt-2 text-sm text-slate-400">
                <span className="flex items-center gap-1"><span className="material-symbols-outlined">speed</span> 2321 MHz</span>
                <span className="flex items-center gap-1"><span className="material-symbols-outlined">sd_storage</span> 12GB GDDR6</span>
              </div>
              <div className="h-px bg-white/10 my-4" />
              <div className="flex items-end justify-between">
                <div>
                  <span className="text-xs text-slate-500 uppercase font-bold">Best Price</span>
                  <div className="text-2xl font-bold text-white">₹34,999</div>
                </div>
                <button className="bg-primary text-white px-6 py-3 rounded-xl font-bold shadow-lg">Pick This One</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="pt-4 flex justify-center">
        <button className="glass-panel px-6 py-3 rounded-full text-slate-300 hover:text-white hover:bg-white/10">Show more alternatives</button>
      </div>
    </div>
  );
}