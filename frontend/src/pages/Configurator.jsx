// src/pages/Configurator.jsx
import React, { useState, useEffect } from "react";
import { useAppContext } from "../context/AppContext";

export default function Configurator() {
  const { addBotMessage } = useAppContext();
  const [selectedCard, setSelectedCard] = useState(null);
  const [savedRecommendations, setSavedRecommendations] = useState([]);

  // Load saved recommendations from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("savedParts");
    if (saved) {
      setSavedRecommendations(JSON.parse(saved));
    }
  }, []);

  // 22+ AI-recommended components
  const aiRecommendations = [
    {
      id: 1,
      name: "NVIDIA RTX 4090",
      category: "GPU",
      price: 189999,
      specs: "24GB GDDR6X, 2.5 GHz",
      performance: "99/100",
      powerUsage: "450W",
      useCase: "4K Gaming, 3D Rendering",
      description: "The absolute flagship GPU. Maximum performance for demanding workloads and professional rendering.",
      recommended: true,
      icon: "memory"
    },
    {
      id: 2,
      name: "NVIDIA RTX 4080",
      category: "GPU",
      price: 139999,
      specs: "16GB GDDR6X, 2.5 GHz",
      performance: "95/100",
      powerUsage: "320W",
      useCase: "1440p/4K Gaming",
      description: "Excellent for high-end gaming and professional workloads with great efficiency.",
      recommended: true,
      icon: "memory"
    },
    {
      id: 3,
      name: "NVIDIA RTX 4070 Ti",
      category: "GPU",
      price: 99999,
      specs: "12GB GDDR6X, 2.6 GHz",
      performance: "88/100",
      powerUsage: "285W",
      useCase: "1440p Gaming, Video Editing",
      description: "Great balance of performance and price for creative professionals and gamers.",
      recommended: true,
      icon: "memory"
    },
    {
      id: 4,
      name: "NVIDIA RTX 4070",
      category: "GPU",
      price: 79999,
      specs: "12GB GDDR6, 2.6 GHz",
      performance: "82/100",
      powerUsage: "200W",
      useCase: "1440p Gaming",
      description: "Sweet spot for 1440p gaming with excellent power efficiency.",
      icon: "memory"
    },
    {
      id: 5,
      name: "NVIDIA RTX 4060 Ti",
      category: "GPU",
      price: 39999,
      specs: "8GB GDDR6, 2.5 GHz",
      performance: "65/100",
      powerUsage: "165W",
      useCase: "1080p Gaming",
      description: "Budget-friendly option for smooth 1080p gaming and productivity.",
      icon: "memory"
    },
    {
      id: 6,
      name: "AMD Radeon RX 7900 XTX",
      category: "GPU",
      price: 129999,
      specs: "24GB GDDR6, 2.5 GHz",
      performance: "92/100",
      powerUsage: "420W",
      useCase: "4K Gaming, Content Creation",
      description: "AMD's flagship offering exceptional value for high-end gaming and creative work.",
      recommended: true,
      icon: "developer_board"
    },
    {
      id: 7,
      name: "AMD Radeon RX 7900 XT",
      category: "GPU",
      price: 89999,
      specs: "20GB GDDR6, 2.5 GHz",
      performance: "85/100",
      powerUsage: "380W",
      useCase: "1440p/4K Gaming",
      description: "Excellent performance-to-price ratio for gaming enthusiasts.",
      icon: "developer_board"
    },
    {
      id: 8,
      name: "AMD Radeon RX 7800 XT",
      category: "GPU",
      price: 64999,
      specs: "16GB GDDR6, 2.4 GHz",
      performance: "78/100",
      powerUsage: "320W",
      useCase: "1440p Gaming",
      description: "Great 1440p gaming performance at competitive pricing.",
      icon: "developer_board"
    },
    {
      id: 9,
      name: "Intel Arc A770",
      category: "GPU",
      price: 29999,
      specs: "8GB GDDR6, 2.4 GHz",
      performance: "60/100",
      powerUsage: "225W",
      useCase: "1080p Gaming",
      description: "Budget option with emerging driver support and good value.",
      icon: "computer"
    },
    {
      id: 10,
      name: "Intel Core i9-14900KS",
      category: "CPU",
      price: 85000,
      specs: "24 cores, 6.2 GHz",
      performance: "98/100",
      powerUsage: "253W",
      useCase: "Gaming, Content Creation",
      description: "Intel's flagship processor with highest clock speeds for extreme performance.",
      recommended: true,
      icon: "developer_board"
    },
    {
      id: 11,
      name: "Intel Core i9-13900K",
      category: "CPU",
      price: 65000,
      specs: "24 cores, 5.8 GHz",
      performance: "95/100",
      powerUsage: "253W",
      useCase: "Gaming, Video Editing",
      description: "Excellent all-rounder for gaming and creative professional work.",
      icon: "developer_board"
    },
    {
      id: 12,
      name: "AMD Ryzen 9 7950X3D",
      category: "CPU",
      price: 79999,
      specs: "16 cores, 5.7 GHz",
      performance: "96/100",
      powerUsage: "162W",
      useCase: "Gaming, Streaming",
      description: "Best gaming CPU with innovative 3D V-Cache technology for superior gaming performance.",
      recommended: true,
      icon: "computer"
    },
    {
      id: 13,
      name: "AMD Ryzen 9 7950X",
      category: "CPU",
      price: 69999,
      specs: "16 cores, 5.7 GHz",
      performance: "94/100",
      powerUsage: "162W",
      useCase: "Rendering, Streaming",
      description: "High core count perfect for multitasking, streaming, and content creation.",
      icon: "computer"
    },
    {
      id: 14,
      name: "AMD Ryzen 7 5800X3D",
      category: "CPU",
      price: 32000,
      specs: "8 cores, 4.5 GHz",
      performance: "85/100",
      powerUsage: "105W",
      useCase: "Gaming, Budget Build",
      description: "Excellent budget gaming option with great efficiency and value.",
      icon: "computer"
    },
    {
      id: 15,
      name: "Kingston Fury Beast Pro",
      category: "RAM",
      price: 15000,
      specs: "32GB DDR5, 6400MHz",
      performance: "92/100",
      powerUsage: "15W",
      useCase: "Gaming, Workstation",
      description: "High-speed DDR5 RAM with excellent performance and reliability.",
      icon: "memory"
    },
    {
      id: 16,
      name: "Corsair Dominator Platinum",
      category: "RAM",
      price: 18000,
      specs: "32GB DDR5, 6600MHz",
      performance: "94/100",
      powerUsage: "20W",
      useCase: "High-end Gaming",
      description: "Premium RGB RAM with superior performance and aesthetics.",
      recommended: true,
      icon: "memory"
    },
    {
      id: 17,
      name: "G.Skill Trident Z5",
      category: "RAM",
      price: 14500,
      specs: "32GB DDR5, 6400MHz",
      performance: "91/100",
      powerUsage: "16W",
      useCase: "Gaming, Streaming",
      description: "Reliable high-performance DDR5 memory with excellent value.",
      icon: "memory"
    },
    {
      id: 18,
      name: "Samsung 990 Pro",
      category: "SSD",
      price: 12000,
      specs: "2TB NVMe, 7100MB/s",
      performance: "96/100",
      powerUsage: "8W",
      useCase: "Gaming, Large Projects",
      description: "Fastest NVMe SSD with exceptional sequential speeds for professional work.",
      recommended: true,
      icon: "storage"
    },
    {
      id: 19,
      name: "WD Black SN850X",
      category: "SSD",
      price: 10000,
      specs: "2TB NVMe, 7000MB/s",
      performance: "95/100",
      powerUsage: "8W",
      useCase: "Gaming, Productivity",
      description: "Great alternative with excellent performance and competitive pricing.",
      icon: "storage"
    },
    {
      id: 20,
      name: "Crucial P5 Plus",
      category: "SSD",
      price: 8000,
      specs: "2TB NVMe, 6600MB/s",
      performance: "90/100",
      powerUsage: "7W",
      useCase: "Budget Gaming",
      description: "Affordable high-speed storage solution for budget builds.",
      icon: "storage"
    },
    {
      id: 21,
      name: "Seasonic Prime Platinum",
      category: "PSU",
      price: 8500,
      specs: "1200W, 80+ Platinum",
      performance: "94/100",
      powerUsage: "N/A",
      useCase: "High-end Systems",
      description: "Premium power supply with excellent efficiency and reliability.",
      recommended: true,
      icon: "power"
    },
    {
      id: 22,
      name: "NZXT Kraken Z93",
      category: "Cooling",
      price: 25000,
      specs: "360mm AIO Liquid Cooling",
      performance: "97/100",
      powerUsage: "45W",
      useCase: "High-end Gaming",
      description: "Top-tier liquid cooling solution for extreme performance and cool temperatures.",
      recommended: true,
      icon: "ac_unit"
    }
  ];

  const openModal = (card) => {
    setSelectedCard(card);
  };

  const closeModal = () => {
    setSelectedCard(null);
  };

  const saveRecommendation = (card) => {
    if (!savedRecommendations.find(r => r.id === card.id)) {
      const updatedSaved = [...savedRecommendations, card];
      setSavedRecommendations(updatedSaved);
      // Save to localStorage under "savedParts" key so Settings page can access it
      localStorage.setItem("savedParts", JSON.stringify(updatedSaved));
      addBotMessage(
        `✅ Saved "${card.name}" to your recommendations! Check Settings to manage your saved builds.`,
        "RECOMMENDATION_SAVED"
      );
    } else {
      addBotMessage(`"${card.name}" is already in your recommendations.`, "INFO");
    }
    closeModal();
  };

  return (
    <div>
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/20 text-primary mb-4">
          <span className="material-symbols-outlined text-lg">smart_toy</span>
          <span className="text-xs font-bold uppercase tracking-wide">AI Recommendation Engine</span>
        </div>
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">22+ AI-Recommended Components</h2>
        <p className="text-slate-400 max-w-2xl mx-auto text-lg">
          Select and compare optimized components. Click any card to see detailed specs. Save your favorites to Settings!
        </p>
      </div>

      {/* AI Recommendations Grid - 4-5 per row */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mb-8">
        {aiRecommendations.map((card) => (
          <div
            key={card.id}
            onClick={() => openModal(card)}
            className={`glass-card rounded-lg p-3 cursor-pointer transform transition hover:scale-105 ${
              card.recommended ? "ring-2 ring-primary/50" : ""
            } group overflow-hidden`}
          >
            <div className="h-full flex flex-col bg-slate-900/40 rounded-lg p-4 border border-white/5 hover:border-primary/30">
              {card.recommended && (
                <div className="absolute top-1 right-1 bg-primary text-white text-[8px] px-2 py-0.5 rounded">
                  AI ⭐
                </div>
              )}

              {/* Icon */}
              <div className="flex justify-center mb-2">
                <span className="material-symbols-outlined text-4xl text-slate-500">{card.icon}</span>
              </div>

              {/* Name */}
              <h3 className="text-xs font-bold text-white text-center truncate">{card.name}</h3>

              {/* Category */}
              <div className="text-[10px] text-primary text-center mt-1">{card.category}</div>

              {/* Price */}
              <div className="text-sm font-bold text-white text-center mt-2">₹{card.price.toLocaleString("en-IN")}</div>

              {/* Performance */}
              <div className="flex items-center justify-center gap-1 mt-2 text-[10px] text-slate-400">
                <span className="material-symbols-outlined text-xs">speed</span>
                <span>{card.performance}</span>
              </div>

              {/* View Details Button */}
              <button className="w-full mt-auto py-2 rounded text-[10px] font-bold text-white bg-white/10 hover:bg-primary/30 transition border border-white/10 hover:border-primary/30">
                View
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal - Detailed View */}
      {selectedCard && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur flex items-center justify-center z-50 p-4">
          <div className="glass-panel rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="flex justify-between items-start mb-6">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/20 text-primary mb-2">
                  <span className="material-symbols-outlined text-sm">{selectedCard.icon}</span>
                  <span className="text-xs font-bold">{selectedCard.category}</span>
                </div>
                <h2 className="text-3xl font-bold text-white">{selectedCard.name}</h2>
              </div>
              <button
                onClick={closeModal}
                className="text-slate-400 hover:text-white text-2xl"
              >
                ✕
              </button>
            </div>

            {/* Main Info */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-white/5 rounded-lg p-4">
                <div className="text-xs text-slate-400 mb-1">Price</div>
                <div className="text-2xl font-bold text-primary">₹{selectedCard.price.toLocaleString("en-IN")}</div>
              </div>
              <div className="bg-white/5 rounded-lg p-4">
                <div className="text-xs text-slate-400 mb-1">Performance</div>
                <div className="text-2xl font-bold text-green-400">{selectedCard.performance}</div>
              </div>
              <div className="bg-white/5 rounded-lg p-4">
                <div className="text-xs text-slate-400 mb-1">Power Usage</div>
                <div className="text-2xl font-bold text-white">{selectedCard.powerUsage}</div>
              </div>
              <div className="bg-white/5 rounded-lg p-4">
                <div className="text-xs text-slate-400 mb-1">Use Case</div>
                <div className="text-sm font-bold text-white">{selectedCard.useCase}</div>
              </div>
            </div>

            {/* Specs */}
            <div className="bg-white/5 rounded-lg p-4 mb-6">
              <div className="text-sm font-bold text-white mb-2">Specifications</div>
              <div className="text-slate-300 text-sm">{selectedCard.specs}</div>
            </div>

            {/* Description */}
            <div className="bg-white/5 rounded-lg p-4 mb-6">
              <div className="text-sm font-bold text-white mb-2">About This Component</div>
              <div className="text-slate-300 text-sm">{selectedCard.description}</div>
            </div>

            {/* AI Recommendation Badge */}
            {selectedCard.recommended && (
              <div className="bg-primary/20 border border-primary/50 rounded-lg p-4 mb-6">
                <div className="flex items-center gap-2 text-primary font-bold">
                  <span className="material-symbols-outlined">verified</span>
                  AI Recommended - Highly optimized for its category
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="flex gap-3">
              <button
                onClick={() => saveRecommendation(selectedCard)}
                className="flex-1 bg-primary text-white py-3 rounded-lg font-bold hover:bg-blue-600 transition flex items-center justify-center gap-2"
              >
                <span className="material-symbols-outlined">bookmark</span>
                Save to Settings
              </button>
              <button
                onClick={closeModal}
                className="flex-1 border border-white/20 text-white py-3 rounded-lg font-bold hover:bg-white/5 transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Saved Recommendations Summary */}
      {savedRecommendations.length > 0 && (
        <div className="glass-panel rounded-2xl p-6 mt-8">
          <h3 className="text-lg font-bold text-white mb-4">
            Saved Recommendations ({savedRecommendations.length})
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {savedRecommendations.map((item) => (
              <div key={item.id} className="bg-white/5 rounded-lg p-4 flex justify-between items-center">
                <div>
                  <div className="font-bold text-white">{item.name}</div>
                  <div className="text-sm text-slate-400">₹{item.price.toLocaleString("en-IN")}</div>
                </div>
                <button
                  onClick={() => {
                    const updated = savedRecommendations.filter(r => r.id !== item.id);
                    setSavedRecommendations(updated);
                    localStorage.setItem("savedParts", JSON.stringify(updated));
                  }}
                  className="text-slate-400 hover:text-red-500"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}