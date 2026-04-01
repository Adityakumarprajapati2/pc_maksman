// src/pages/Compare.jsx
import React, { useState, useEffect } from "react";
import { useAppContext } from "../context/AppContext";

export default function Compare() {
  const { useCaseBuilds, setCurrentBuild } = useAppContext();
  const [selectedProfile, setSelectedProfile] = useState("balanced");
  const [builds, setBuilds] = useState([]);
  const [maxPrice, setMaxPrice] = useState(200000);
  const [filteredBuilds, setFilteredBuilds] = useState([]);

  // Mock builds if no real data is available
  useEffect(() => {
    if (useCaseBuilds && useCaseBuilds.length > 0) {
      setBuilds(useCaseBuilds);
      setSelectedProfile(useCaseBuilds[0]?.name?.toLowerCase() || "budget");
    } else {
      // Default mock builds
      setBuilds([
        {
          name: "Budget",
          description: "Best for web browsing, Office apps, and streaming content.",
          totalPrice: 54000,
          components: [
            { type: "CPU", name: "i3-12100F", specs: "4 cores" },
            { type: "GPU", name: "RX 6600", specs: "8GB VRAM" },
            { type: "RAM", name: "16GB DDR4", specs: "3200MHz" },
            { type: "SSD", name: "512GB NVMe", specs: "Read 3400MB/s" }
          ]
        },
        {
          name: "Balanced",
          description: "Excellent multitasker for editing, gaming, and research.",
          totalPrice: 100000,
          components: [
            { type: "CPU", name: "i5-13600K", specs: "14 cores" },
            { type: "GPU", name: "RTX 3060 Ti", specs: "8GB VRAM" },
            { type: "RAM", name: "32GB DDR5", specs: "6000MHz" },
            { type: "SSD", name: "1TB NVMe", specs: "Read 7000MB/s" }
          ]
        },
        {
          name: "High-End",
          description: "Uncompromised speed for 3D rendering and 4K workflows.",
          totalPrice: 175000,
          components: [
            { type: "CPU", name: "i9-13900K", specs: "24 cores" },
            { type: "GPU", name: "RTX 4080", specs: "16GB VRAM" },
            { type: "RAM", name: "64GB DDR5", specs: "6000MHz" },
            { type: "SSD", name: "2TB NVMe", specs: "Read 7400MB/s" }
          ]
        }
      ]);
    }
  }, [useCaseBuilds]);

  // Filter builds by max price
  useEffect(() => {
    const filtered = builds.filter(b => b.totalPrice <= maxPrice);
    setFilteredBuilds(filtered);
  }, [builds, maxPrice]);

  const handleSelectProfile = (profileName) => {
    setSelectedProfile(profileName.toLowerCase());
  };

  const handleFinalizeBuild = () => {
    const selectedBuild = builds.find(b => b.name.toLowerCase() === selectedProfile);
    if (selectedBuild) {
      setCurrentBuild({
        name: selectedBuild.name + " Build",
        components: selectedBuild.components,
        totalPrice: selectedBuild.totalPrice,
        compatibilityScore: 95,
        conflicts: []
      });
      alert(`✅ ${selectedBuild.name} build finalized! Check the BuildReview page for details.`);
    }
  };

  const selectedBuildData = builds.find(b => b.name.toLowerCase() === selectedProfile);

  return (
    <div className="space-y-8">
      {/* Price Filter Bar */}
      <div className="glass-panel rounded-2xl p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-white">Budget Filter</h3>
          <div className="text-right">
            <div className="text-2xl font-bold text-primary">₹{maxPrice.toLocaleString("en-IN")}</div>
            <div className="text-xs text-slate-400">Maximum budget</div>
          </div>
        </div>

        <div className="space-y-4">
          {/* Price Slider */}
          <input
            type="range"
            min="20000"
            max="250000"
            step="5000"
            value={maxPrice}
            onChange={(e) => setMaxPrice(Number(e.target.value))}
            className="w-full h-3 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-primary"
          />

          {/* Price Range Labels */}
          <div className="flex justify-between text-xs text-slate-400">
            <span>₹20,000</span>
            <span>₹135,000</span>
            <span>₹250,000</span>
          </div>

          {/* Quick Price Presets */}
          <div className="grid grid-cols-4 gap-2">
            <button
              onClick={() => setMaxPrice(50000)}
              className={`py-2 rounded-lg text-xs font-medium transition ${
                maxPrice === 50000
                  ? "bg-primary text-white"
                  : "bg-white/5 text-slate-300 hover:bg-white/10"
              }`}
            >
              ₹50K
            </button>
            <button
              onClick={() => setMaxPrice(100000)}
              className={`py-2 rounded-lg text-xs font-medium transition ${
                maxPrice === 100000
                  ? "bg-primary text-white"
                  : "bg-white/5 text-slate-300 hover:bg-white/10"
              }`}
            >
              ₹1L
            </button>
            <button
              onClick={() => setMaxPrice(150000)}
              className={`py-2 rounded-lg text-xs font-medium transition ${
                maxPrice === 150000
                  ? "bg-primary text-white"
                  : "bg-white/5 text-slate-300 hover:bg-white/10"
              }`}
            >
              ₹1.5L
            </button>
            <button
              onClick={() => setMaxPrice(250000)}
              className={`py-2 rounded-lg text-xs font-medium transition ${
                maxPrice === 250000
                  ? "bg-primary text-white"
                  : "bg-white/5 text-slate-300 hover:bg-white/10"
              }`}
            >
              ₹2.5L
            </button>
          </div>

          {/* Available Builds Info */}
          <div className="text-center pt-2 border-t border-white/10">
            <p className="text-xs text-slate-400">
              Showing <span className="font-bold text-white">{filteredBuilds.length}</span> of{" "}
              <span className="font-bold text-white">{builds.length}</span> builds
            </p>
          </div>
        </div>
      </div>

      {/* Profile Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
        {filteredBuilds.length > 0 ? (
          filteredBuilds.map((build, idx) => {
          const isSelected = build.name.toLowerCase() === selectedProfile;
          const icons = ["desktop_windows", "computer", "precision_manufacturing"];

          return (
            <div
              key={idx}
              className={`${
                isSelected
                  ? "glass-panel-active rounded-2xl p-1 relative z-10"
                  : "glass-panel rounded-2xl p-1 group cursor-pointer hover:scale-105 transition-transform"
              } h-full`}
              onClick={() => handleSelectProfile(build.name)}
            >
              <div
                className={`${
                  isSelected ? "bg-slate-900/60" : "bg-slate-900/40"
                } rounded-xl p-6 h-full flex flex-col`}
              >
                {isSelected && (
                  <div className="absolute -top-3 inset-x-0 flex justify-center z-20">
                    <span className="bg-primary text-white text-[10px] px-3 py-1 rounded-full animate-pulse-slow">
                      AI Recommended
                    </span>
                  </div>
                )}

                <h4 className={`text-xl font-bold ${isSelected ? "text-white" : "text-slate-300"} mb-1`}>
                  {build.name}
                </h4>

                <div
                  className={`${
                    isSelected ? "text-3xl text-primary-glow" : "text-2xl text-slate-200"
                  } font-bold mb-4`}
                >
                  ₹{build.totalPrice.toLocaleString("en-IN")}
                </div>

                <div className="flex justify-center py-6">
                  <span
                    className={`material-symbols-outlined text-[80px] ${
                      isSelected ? "text-white animate-float" : "text-slate-300"
                    }`}
                  >
                    {icons[idx]}
                  </span>
                </div>

                <p className={`${isSelected ? "text-slate-300" : "text-slate-400"} text-xs mb-6 text-center`}>
                  {build.description}
                </p>

                {isSelected && (
                  <div className="mt-auto">
                    <div className="h-2 w-full bg-slate-700 rounded-full overflow-hidden">
                      <div className="h-full bg-primary w-3/4" />
                    </div>
                    <p className="text-[10px] text-primary text-center mt-2 font-mono">
                      PERFORMANCE INDEX: 85/100
                    </p>
                  </div>
                )}

                {!isSelected && (
                  <button
                    onClick={() => handleSelectProfile(build.name)}
                    className="mt-auto w-full py-3 rounded-lg border border-white/10 text-slate-300 text-sm font-medium hover:bg-white/5 transition-colors"
                  >
                    Select Profile
                  </button>
                )}
              </div>
            </div>
          );
        })
        ) : (
          <div className="col-span-full text-center py-12">
            <span className="material-symbols-outlined text-6xl text-slate-400 block mb-4">filter_alt</span>
            <h3 className="text-xl font-bold text-slate-300 mb-2">No Builds Available</h3>
            <p className="text-slate-400 mb-4">No builds match your budget filter.</p>
            <button
              onClick={() => setMaxPrice(250000)}
              className="px-6 py-2 bg-primary text-white rounded-lg font-medium hover:bg-blue-600 transition"
            >
              Reset Filter
            </button>
          </div>
        )}
      </div>

      {/* Comparison Table */}
      <div className="glass-panel rounded-2xl overflow-hidden mt-8">
        <div className="px-6 py-4 border-b border-white/10 bg-white/5 flex justify-between items-center">
          <h3 className="text-lg font-bold text-white">Component Configuration</h3>
          <span className="text-xs text-slate-400">
            Comparing <strong className="text-white">{selectedBuildData?.name}</strong> vs others
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-400">
            <thead className="bg-white/5 text-xs uppercase text-slate-300">
              <tr>
                <th className="px-6 py-4">Component</th>
                {builds.map((build, idx) => (
                  <th
                    key={idx}
                    className={`px-6 py-4 ${
                      build.name.toLowerCase() === selectedProfile
                        ? "text-primary font-bold"
                        : "opacity-50"
                    }`}
                  >
                    {build.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {["CPU", "GPU", "RAM", "SSD"].map((componentType, idx) => (
                <tr key={idx} className="hover:bg-white/5">
                  <td className="px-6 py-4 font-medium text-white">{componentType}</td>
                  {builds.map((build, buildIdx) => {
                    const component = build.components.find(c => c.type === componentType);
                    const isSelected = build.name.toLowerCase() === selectedProfile;

                    return (
                      <td
                        key={buildIdx}
                        className={`px-6 py-4 ${
                          isSelected
                            ? "text-white bg-primary/5 border-l-2 border-primary font-medium"
                            : "opacity-60"
                        }`}
                      >
                        <div className="font-semibold">{component?.name}</div>
                        <div className="text-xs text-slate-500 mt-1">{component?.specs}</div>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
            <tfoot className="border-t border-white/10 bg-white/5">
              <tr>
                <td className="px-6 py-6"></td>
                {builds.map((build, idx) => (
                  <td key={idx} className="px-6 py-6">
                    {build.name.toLowerCase() === selectedProfile ? (
                      <button
                        onClick={handleFinalizeBuild}
                        className="w-full bg-primary text-white py-3 rounded-lg font-bold text-sm flex items-center justify-center gap-2 hover:bg-blue-600 transition-colors"
                      >
                        Finalize This Build <span className="material-symbols-outlined">arrow_forward</span>
                      </button>
                    ) : (
                      <button
                        onClick={() => handleSelectProfile(build.name)}
                        className="text-xs text-slate-400 hover:text-white underline transition-colors"
                      >
                        Switch to {build.name}
                      </button>
                    )}
                  </td>
                ))}
              </tr>
            </tfoot>
          </table>
        </div>
      </div>

      {/* Build Summary */}
      <div className="glass-panel rounded-2xl p-6">
        <h3 className="text-lg font-bold text-white mb-4">Selected Build Summary</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white/5 rounded-lg p-4">
            <div className="text-xs text-slate-400 mb-1">Profile</div>
            <div className="text-lg font-bold text-white">{selectedBuildData?.name}</div>
          </div>
          <div className="bg-white/5 rounded-lg p-4">
            <div className="text-xs text-slate-400 mb-1">Total Price</div>
            <div className="text-lg font-bold text-primary">₹{selectedBuildData?.totalPrice.toLocaleString("en-IN")}</div>
          </div>
          <div className="bg-white/5 rounded-lg p-4">
            <div className="text-xs text-slate-400 mb-1">Components</div>
            <div className="text-lg font-bold text-white">{selectedBuildData?.components.length}</div>
          </div>
          <div className="bg-white/5 rounded-lg p-4">
            <div className="text-xs text-slate-400 mb-1">Performance</div>
            <div className="text-lg font-bold text-green-400">Optimal</div>
          </div>
        </div>
      </div>
    </div>
  );
}