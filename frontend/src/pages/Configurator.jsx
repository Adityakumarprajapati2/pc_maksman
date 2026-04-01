// src/pages/Configurator.jsx
import React, { useState, useEffect } from "react";
import { useAppContext } from "../context/AppContext";

export default function Configurator() {
  const { addBotMessage } = useAppContext();
  const [selectedCard, setSelectedCard] = useState(null);
  const [savedRecommendations, setSavedRecommendations] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("price-low");

  // Load saved recommendations from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("savedParts");
    if (saved) {
      setSavedRecommendations(JSON.parse(saved));
    }
  }, []);

  // 99+ AI-recommended components across all PC building categories
  const aiRecommendations = [
    // ===== GPUs (20 options) =====
    { id: 1, name: "NVIDIA RTX 4090", category: "GPU", price: 189999, specs: "24GB GDDR6X, 2.5 GHz", performance: "99/100", powerUsage: "450W", useCase: "4K Gaming, 3D Rendering", description: "The absolute flagship GPU. Maximum performance for demanding workloads and professional rendering.", recommended: true, icon: "memory" },
    { id: 2, name: "NVIDIA RTX 4080", category: "GPU", price: 139999, specs: "16GB GDDR6X, 2.5 GHz", performance: "95/100", powerUsage: "320W", useCase: "1440p/4K Gaming", description: "Excellent for high-end gaming and professional workloads with great efficiency.", recommended: true, icon: "memory" },
    { id: 3, name: "NVIDIA RTX 4070 Ti", category: "GPU", price: 99999, specs: "12GB GDDR6X, 2.6 GHz", performance: "88/100", powerUsage: "285W", useCase: "1440p Gaming, Video Editing", description: "Great balance of performance and price for creative professionals and gamers.", recommended: true, icon: "memory" },
    { id: 4, name: "NVIDIA RTX 4070", category: "GPU", price: 79999, specs: "12GB GDDR6, 2.6 GHz", performance: "82/100", powerUsage: "200W", useCase: "1440p Gaming", description: "Sweet spot for 1440p gaming with excellent power efficiency.", icon: "memory" },
    { id: 5, name: "NVIDIA RTX 4060 Ti", category: "GPU", price: 39999, specs: "8GB GDDR6, 2.5 GHz", performance: "65/100", powerUsage: "165W", useCase: "1080p Gaming", description: "Budget-friendly option for smooth 1080p gaming and productivity.", icon: "memory" },
    { id: 6, name: "NVIDIA RTX 4060", category: "GPU", price: 24999, specs: "8GB GDDR6, 2.5 GHz", performance: "58/100", powerUsage: "115W", useCase: "1080p Gaming, Esports", description: "Ultra-budget GPU for light gaming and general productivity.", icon: "memory" },
    { id: 7, name: "AMD Radeon RX 7900 XTX", category: "GPU", price: 129999, specs: "24GB GDDR6, 2.5 GHz", performance: "92/100", powerUsage: "420W", useCase: "4K Gaming, Content Creation", description: "AMD's flagship offering exceptional value for high-end gaming and creative work.", recommended: true, icon: "developer_board" },
    { id: 8, name: "AMD Radeon RX 7900 XT", category: "GPU", price: 89999, specs: "20GB GDDR6, 2.5 GHz", performance: "85/100", powerUsage: "380W", useCase: "1440p/4K Gaming", description: "Excellent performance-to-price ratio for gaming enthusiasts.", icon: "developer_board" },
    { id: 9, name: "AMD Radeon RX 7800 XT", category: "GPU", price: 64999, specs: "16GB GDDR6, 2.4 GHz", performance: "78/100", powerUsage: "320W", useCase: "1440p Gaming", description: "Great 1440p gaming performance at competitive pricing.", icon: "developer_board" },
    { id: 10, name: "AMD Radeon RX 7700 XT", category: "GPU", price: 44999, specs: "12GB GDDR6, 2.3 GHz", performance: "68/100", powerUsage: "250W", useCase: "1440p Gaming, Budget", description: "Solid 1440p gaming option at accessible price point.", icon: "developer_board" },
    { id: 11, name: "Intel Arc A770", category: "GPU", price: 29999, specs: "8GB GDDR6, 2.4 GHz", performance: "60/100", powerUsage: "225W", useCase: "1080p Gaming", description: "Budget option with emerging driver support and good value.", icon: "computer" },
    { id: 12, name: "Intel Arc A750", category: "GPU", price: 18999, specs: "8GB GDDR6, 2.2 GHz", performance: "50/100", powerUsage: "120W", useCase: "Esports, Light Gaming", description: "Entry-level Arc GPU for budget gamers.", icon: "computer" },
    { id: 13, name: "NVIDIA RTX 3090 Ti", category: "GPU", price: 99999, specs: "24GB GDDR6X, 1.95 GHz", performance: "88/100", powerUsage: "450W", useCase: "4K Gaming, Rendering", description: "Previous gen flagship still powerhouse for professional work.", icon: "memory" },
    { id: 14, name: "AMD Radeon RX 6900 XT", category: "GPU", price: 64999, specs: "16GB GDDR6, 2.3 GHz", performance: "80/100", powerUsage: "405W", useCase: "4K Gaming", description: "Older but still capable for high-end gaming.", icon: "developer_board" },
    { id: 15, name: "NVIDIA RTX 2080 Ti", category: "GPU", price: 49999, specs: "11GB GDDR6, 1.6 GHz", performance: "75/100", powerUsage: "350W", useCase: "1440p Gaming, Some 4K", description: "Aging professional card with strong secondary market value.", icon: "memory" },
    { id: 16, name: "AMD Radeon Pro W6900X", category: "GPU", price: 149999, specs: "48GB HBM2e, Professional", performance: "94/100", powerUsage: "300W", useCase: "Professional 3D, Rendering", description: "Workstation-class GPU for professionals.", icon: "developer_board" },
    { id: 17, name: "NVIDIA RTX 6000 Ada", category: "GPU", price: 199999, specs: "48GB GDDR6, Professional", performance: "96/100", powerUsage: "435W", useCase: "Enterprise, AI Training", description: "Top-tier professional rendering GPU.", icon: "memory" },
    { id: 18, name: "AMD Radeon RX 7600", category: "GPU", price: 17999, specs: "16GB GDDR6, 2.7 GHz", performance: "45/100", powerUsage: "80W", useCase: "Office, Light Gaming", description: "Ultra-budget GPU for light workloads.", icon: "developer_board" },
    { id: 19, name: "NVIDIA RTX 4080 Super", category: "GPU", price: 159999, specs: "16GB GDDR6X, 2.5 GHz", performance: "96/100", powerUsage: "320W", useCase: "4K Gaming, Streaming", description: "Updated RTX 4080 with better performance.", icon: "memory" },
    { id: 20, name: "NVIDIA RTX 4070 Super", category: "GPU", price: 89999, specs: "12GB GDDR6X, 2.6 GHz", performance: "85/100", powerUsage: "220W", useCase: "1440p Gaming", description: "Updated RTX 4070 with performance boost.", icon: "memory" },

    // ===== CPUs (20 options) =====
    { id: 21, name: "Intel Core i9-14900KS", category: "CPU", price: 85000, specs: "24 cores, 6.2 GHz", performance: "98/100", powerUsage: "253W", useCase: "Gaming, Content Creation", description: "Intel's flagship with highest clock speeds for extreme performance.", recommended: true, icon: "developer_board" },
    { id: 22, name: "Intel Core i9-14900K", category: "CPU", price: 72000, specs: "24 cores, 6.0 GHz", performance: "96/100", powerUsage: "253W", useCase: "Gaming, Streaming", description: "Excellent all-rounder for gaming and professional workloads.", icon: "developer_board" },
    { id: 23, name: "Intel Core i9-13900K", category: "CPU", price: 65000, specs: "24 cores, 5.8 GHz", performance: "95/100", powerUsage: "253W", useCase: "Gaming, Video Editing", description: "Still excellent for gaming and creative professional work.", icon: "developer_board" },
    { id: 24, name: "Intel Core i7-14700K", category: "CPU", price: 55000, specs: "20 cores, 5.5 GHz", performance: "92/100", powerUsage: "253W", useCase: "Gaming, Streaming", description: "Great mid-range Intel option for gaming and multitasking.", icon: "developer_board" },
    { id: 25, name: "Intel Core i5-14600K", category: "CPU", price: 35000, specs: "14 cores, 5.3 GHz", performance: "82/100", powerUsage: "181W", useCase: "Gaming, Productivity", description: "Solid budget option for 1080p/1440p gaming.", icon: "developer_board" },
    { id: 26, name: "AMD Ryzen 9 7950X3D", category: "CPU", price: 79999, specs: "16 cores, 5.7 GHz", performance: "96/100", powerUsage: "162W", useCase: "Gaming, Streaming", description: "Best gaming CPU with innovative 3D V-Cache technology.", recommended: true, icon: "computer" },
    { id: 27, name: "AMD Ryzen 9 7950X", category: "CPU", price: 69999, specs: "16 cores, 5.7 GHz", performance: "94/100", powerUsage: "162W", useCase: "Rendering, Streaming", description: "High core count for multitasking and content creation.", icon: "computer" },
    { id: 28, name: "AMD Ryzen 9 7900X3D", category: "CPU", price: 59999, specs: "12 cores, 5.6 GHz", performance: "93/100", powerUsage: "120W", useCase: "Gaming, Rendering", description: "Excellent gaming CPU with good efficiency.", icon: "computer" },
    { id: 29, name: "AMD Ryzen 9 7900X", category: "CPU", price: 54999, specs: "12 cores, 5.6 GHz", performance: "91/100", powerUsage: "120W", useCase: "Gaming, Content Creation", description: "Balanced CPU for gaming and productivity.", icon: "computer" },
    { id: 30, name: "AMD Ryzen 7 7700X", category: "CPU", price: 39999, specs: "8 cores, 5.4 GHz", performance: "85/100", powerUsage: "105W", useCase: "Gaming, Streaming", description: "Great mid-range option for gamers and streamers.", icon: "computer" },
    { id: 31, name: "AMD Ryzen 5 7600X", category: "CPU", price: 24999, specs: "6 cores, 5.3 GHz", performance: "75/100", powerUsage: "105W", useCase: "Gaming, Budget", description: "Budget gaming CPU with solid performance.", icon: "computer" },
    { id: 32, name: "AMD Ryzen 7 5800X3D", category: "CPU", price: 32000, specs: "8 cores, 4.5 GHz", performance: "85/100", powerUsage: "105W", useCase: "Gaming, Budget", description: "Excellent budget gaming option with great efficiency.", icon: "computer" },
    { id: 33, name: "Intel Core i5-13600K", category: "CPU", price: 29999, specs: "14 cores, 5.1 GHz", performance: "80/100", powerUsage: "181W", useCase: "Gaming, Budget", description: "Last gen budget option with good gaming performance.", icon: "developer_board" },
    { id: 34, name: "AMD Ryzen 5 5600X", category: "CPU", price: 17999, specs: "6 cores, 4.6 GHz", performance: "72/100", powerUsage: "105W", useCase: "Budget Gaming, Office", description: "Older budget option for light gaming.", icon: "computer" },
    { id: 35, name: "Intel Core i9-12900K", category: "CPU", price: 49999, specs: "16 cores, 3.9 GHz", performance: "90/100", powerUsage: "190W", useCase: "Gaming, Content Creation", description: "Previous gen flagship still excellent for workloads.", icon: "developer_board" },
    { id: 36, name: "AMD Ryzen 7 5700X3D", category: "CPU", price: 29999, specs: "8 cores, 4.5 GHz", performance: "84/100", powerUsage: "105W", useCase: "Gaming, Budget Streaming", description: "Budget 3D V-Cache CPU for gaming.", icon: "computer" },
    { id: 37, name: "Intel Xeon W9-3495X", category: "CPU", price: 219999, specs: "60 cores, Professional", performance: "92/100", powerUsage: "350W", useCase: "Enterprise, 3D Rendering", description: "Professional workstation CPU with massive core count.", icon: "developer_board" },
    { id: 38, name: "AMD Ryzen Threadripper 5995WX", category: "CPU", price: 189999, specs: "64 cores, 4.5 GHz", performance: "91/100", powerUsage: "280W", useCase: "Professional Rendering", description: "Ultimate workstation CPU for professionals.", icon: "computer" },
    { id: 39, name: "Intel Core Ultra 9 285K", category: "CPU", price: 68000, specs: "24 cores, 5.7 GHz", performance: "94/100", powerUsage: "218W", useCase: "Gaming, Productivity", description: "Latest Intel generation with efficiency improvements.", icon: "developer_board" },
    { id: 40, name: "AMD Ryzen 7 9700X", category: "CPU", price: 45999, specs: "8 cores, 5.5 GHz", performance: "88/100", powerUsage: "120W", useCase: "Gaming, Content Creation", description: "Latest Ryzen generation CPU.", icon: "computer" },

    // ===== RAM (15 options) =====
    { id: 41, name: "Kingston Fury Beast Pro", category: "RAM", price: 15000, specs: "32GB DDR5, 6400MHz", performance: "92/100", powerUsage: "15W", useCase: "Gaming, Workstation", description: "High-speed DDR5 RAM with excellent performance and reliability.", icon: "memory" },
    { id: 42, name: "Corsair Dominator Platinum", category: "RAM", price: 18000, specs: "32GB DDR5, 6600MHz", performance: "94/100", powerUsage: "20W", useCase: "High-end Gaming", description: "Premium RGB RAM with superior performance and aesthetics.", recommended: true, icon: "memory" },
    { id: 43, name: "G.Skill Trident Z5", category: "RAM", price: 14500, specs: "32GB DDR5, 6400MHz", performance: "91/100", powerUsage: "16W", useCase: "Gaming, Streaming", description: "Reliable high-performance DDR5 memory with excellent value.", icon: "memory" },
    { id: 44, name: "G.Skill Flare X5", category: "RAM", price: 13999, specs: "32GB DDR5, 6000MHz", performance: "90/100", powerUsage: "14W", useCase: "Gaming, AMD Builds", description: "Optimized DDR5 RAM for AMD Ryzen systems.", icon: "memory" },
    { id: 45, name: "Crucial Pro", category: "RAM", price: 11000, specs: "32GB DDR5, 6000MHz", performance: "88/100", powerUsage: "12W", useCase: "Budget Gaming", description: "Budget-friendly DDR5 option with solid performance.", icon: "memory" },
    { id: 46, name: "Kingston FURY Beast", category: "RAM", price: 10500, specs: "32GB DDR5, 5600MHz", performance: "85/100", powerUsage: "12W", useCase: "Budget Gaming, Productivity", description: "Entry-level DDR5 RAM at reasonable price.", icon: "memory" },
    { id: 47, name: "Corsair Vengeance RGB Pro", category: "RAM", price: 9500, specs: "32GB DDR4, 3600MHz", performance: "80/100", powerUsage: "10W", useCase: "Gaming, DDR4 Builds", description: "Premium DDR4 option for older systems.", icon: "memory" },
    { id: 48, name: "HyperX Predator DDR5", category: "RAM", price: 16500, specs: "32GB DDR5, 6400MHz", performance: "93/100", powerUsage: "18W", useCase: "Gaming, XMP Tuning", description: "Excellent DDR5 RAM with strong OC potential.", icon: "memory" },
    { id: 49, name: "ADATA XPG Lian", category: "RAM", price: 12000, specs: "32GB DDR5, 6000MHz", performance: "87/100", powerUsage: "13W", useCase: "Gaming, Budget", description: "Stylish DDR5 RAM at competitive pricing.", icon: "memory" },
    { id: 50, name: "Patriot Viper Elite", category: "RAM", price: 8500, specs: "32GB DDR5, 5600MHz", performance: "82/100", powerUsage: "11W", useCase: "Budget DDR5", description: "Ultra-budget DDR5 option.", icon: "memory" },
    { id: 51, name: "Corsair Dominator Platinum RGB", category: "RAM", price: 19500, specs: "64GB DDR5, 6600MHz", performance: "95/100", powerUsage: "24W", useCase: "High-end Workstation", description: "Premium 64GB DDR5 kit for professionals.", icon: "memory" },
    { id: 52, name: "G.Skill Trident Z5 Royal", category: "RAM", price: 17500, specs: "32GB DDR5, 6800MHz", performance: "93/100", powerUsage: "19W", useCase: "Gaming, Overclocking", description: "High-performance DDR5 for enthusiasts.", icon: "memory" },
    { id: 53, name: "Kingston FURY Renegade", category: "RAM", price: 16000, specs: "32GB DDR5, 6400MHz", performance: "92/100", powerUsage: "16W", useCase: "Gaming, Productivity", description: "High-speed DDR5 with excellent stability.", icon: "memory" },
    { id: 54, name: "Crucial Ballistix Max", category: "RAM", price: 14000, specs: "32GB DDR4, 3600MHz", performance: "88/100", powerUsage: "11W", useCase: "DDR4 Gaming", description: "Fast DDR4 option for older platforms.", icon: "memory" },
    { id: 55, name: "Team T-Force Delta RGB", category: "RAM", price: 12500, specs: "32GB DDR5, 6000MHz", performance: "86/100", powerUsage: "13W", useCase: "Gaming, Budget", description: "Budget DDR5 with RGB lighting.", icon: "memory" },

    // ===== SSDs (15 options) =====
    { id: 56, name: "Samsung 990 Pro", category: "SSD", price: 12000, specs: "2TB NVMe, 7100MB/s", performance: "96/100", powerUsage: "8W", useCase: "Gaming, Large Projects", description: "Fastest NVMe SSD with exceptional sequential speeds.", recommended: true, icon: "storage" },
    { id: 57, name: "WD Black SN850X", category: "SSD", price: 10000, specs: "2TB NVMe, 7000MB/s", performance: "95/100", powerUsage: "8W", useCase: "Gaming, Productivity", description: "Great alternative with excellent performance and competitive pricing.", icon: "storage" },
    { id: 58, name: "Crucial P5 Plus", category: "SSD", price: 8000, specs: "2TB NVMe, 6600MB/s", performance: "90/100", powerUsage: "7W", useCase: "Budget Gaming", description: "Affordable high-speed storage solution for budget builds.", icon: "storage" },
    { id: 59, name: "Samsung 870 QVO", category: "SSD", price: 7500, specs: "2TB SATA, 550MB/s", performance: "75/100", powerUsage: "3W", useCase: "Storage, Budget", description: "Budget SATA SSD for secondary storage.", icon: "storage" },
    { id: 60, name: "SK Hynix Platinum P41", category: "SSD", price: 9500, specs: "2TB NVMe, 6500MB/s", performance: "93/100", powerUsage: "7W", useCase: "Gaming, Productivity", description: "Excellent value NVMe with great performance.", icon: "storage" },
    { id: 61, name: "Kingston KC3000", category: "SSD", price: 7000, specs: "2TB NVMe, 6000MB/s", performance: "88/100", powerUsage: "6W", useCase: "Budget Gaming", description: "Budget NVMe with solid performance.", icon: "storage" },
    { id: 62, name: "Sabrent Rocket 4 Plus", category: "SSD", price: 8500, specs: "2TB NVMe, 7000MB/s", performance: "91/100", powerUsage: "8W", useCase: "Gaming, Content Creation", description: "Fast NVMe at competitive price.", icon: "storage" },
    { id: 63, name: "Corsair MP600 ELITE XT", category: "SSD", price: 6500, specs: "2TB NVMe, 4950MB/s", performance: "85/100", powerUsage: "5W", useCase: "Budget Gaming", description: "Budget Corsair option for gaming.", icon: "storage" },
    { id: 64, name: "Gigabyte AORUS NVMe Gen4", category: "SSD", price: 7000, specs: "2TB NVMe, 4950MB/s", performance: "86/100", powerUsage: "6W", useCase: "Gaming, Budget", description: "Budget gaming SSD with RGB.", icon: "storage" },
    { id: 65, name: "Samsung 980 Pro", category: "SSD", price: 11000, specs: "2TB NVMe, 7100MB/s", performance: "95/100", powerUsage: "8W", useCase: "Gaming, Professional", description: "Previous gen flagship still excellent for gaming.", icon: "storage" },
    { id: 66, name: "WD Black SN840", category: "SSD", price: 13500, specs: "4TB NVMe, 7100MB/s", performance: "96/100", powerUsage: "9W", useCase: "Large Projects, Gaming", description: "High-capacity fast NVMe for professionals.", icon: "storage" },
    { id: 67, name: "Crucial P5", category: "SSD", price: 5500, specs: "1TB NVMe, 3400MB/s", performance: "80/100", powerUsage: "5W", useCase: "Budget, Secondary Drive", description: "Budget NVMe for secondary storage.", icon: "storage" },
    { id: 68, name: "Intel 670p", category: "SSD", price: 4000, specs: "1TB NVMe, 3500MB/s", performance: "75/100", powerUsage: "4W", useCase: "Budget, Office", description: "Entry-level NVMe for general use.", icon: "storage" },
    { id: 69, name: "Seagate FireCuda 530", category: "SSD", price: 9000, specs: "2TB NVMe, 6500MB/s", performance: "90/100", powerUsage: "7W", useCase: "Gaming, Budget", description: "Budget-friendly high-speed NVMe.", icon: "storage" },
    { id: 70, name: "ADATA Gammix S70", category: "SSD", price: 8000, specs: "2TB NVMe, 6400MB/s", performance: "89/100", powerUsage: "7W", useCase: "Gaming, Productivity", description: "Solid budget NVMe option.", icon: "storage" },

    // ===== PSUs (10 options) =====
    { id: 71, name: "Seasonic Prime Platinum", category: "PSU", price: 8500, specs: "1200W, 80+ Platinum", performance: "94/100", powerUsage: "N/A", useCase: "High-end Systems", description: "Premium power supply with excellent efficiency and reliability.", recommended: true, icon: "power" },
    { id: 72, name: "Corsair RM850x", category: "PSU", price: 6500, specs: "850W, 80+ Gold", performance: "90/100", powerUsage: "N/A", useCase: "Mid-range Gaming", description: "Reliable mid-range PSU with good efficiency.", icon: "power" },
    { id: 73, name: "EVGA SuperNOVA 1600T2", category: "PSU", price: 12000, specs: "1600W, 80+ Titanium", performance: "95/100", powerUsage: "N/A", useCase: "Extreme Gaming", description: "Massive power supply for extreme builds.", icon: "power" },
    { id: 74, name: "Thermaltake Toughpower GF1", category: "PSU", price: 5500, specs: "650W, 80+ Gold", performance: "88/100", powerUsage: "N/A", useCase: "Mid-range Gaming", description: "Budget 80+ Gold PSU for mid-range systems.", icon: "power" },
    { id: 75, name: "Seasonic Focus GX", category: "PSU", price: 6000, specs: "750W, 80+ Gold", performance: "89/100", powerUsage: "N/A", useCase: "Gaming", description: "Reliable 750W Gold-rated PSU.", icon: "power" },
    { id: 76, name: "MSI MAG A850GL", category: "PSU", price: 5800, specs: "850W, 80+ Gold", performance: "89/100", powerUsage: "N/A", useCase: "Gaming, Content Creation", description: "Budget 850W Gold option.", icon: "power" },
    { id: 77, name: "Corsair AX1200", category: "PSU", price: 10500, specs: "1200W, 80+ Platinum", performance: "93/100", powerUsage: "N/A", useCase: "High-end Builds", description: "Premium 1200W Platinum PSU.", icon: "power" },
    { id: 78, name: "NZXT C850", category: "PSU", price: 6200, specs: "850W, 80+ Gold", performance: "89/100", powerUsage: "N/A", useCase: "Gaming, Streaming", description: "Clean design Gold-rated PSU.", icon: "power" },
    { id: 79, name: "Gigabyte P850GM", category: "PSU", price: 5600, specs: "850W, 80+ Gold", performance: "88/100", powerUsage: "N/A", useCase: "Gaming", description: "Budget gaming PSU.", icon: "power" },
    { id: 80, name: "Superflower Leadex Platinum", category: "PSU", price: 9500, specs: "1000W, 80+ Platinum", performance: "92/100", powerUsage: "N/A", useCase: "Gaming, Workstation", description: "Premium efficiency 1000W PSU.", icon: "power" },

    // ===== Cooling (9 options) =====
    { id: 81, name: "NZXT Kraken Z93", category: "Cooling", price: 25000, specs: "360mm AIO Liquid", performance: "97/100", powerUsage: "45W", useCase: "High-end Gaming", description: "Top-tier liquid cooling with display for extreme performance.", recommended: true, icon: "ac_unit" },
    { id: 82, name: "Corsair iCUE H150i Elite", category: "Cooling", price: 18500, specs: "360mm AIO Liquid", performance: "95/100", powerUsage: "40W", useCase: "Gaming, Streaming", description: "Great all-in-one liquid cooler.", icon: "ac_unit" },
    { id: 83, name: "Noctua NH-D15", category: "Cooling", price: 7500, specs: "Dual Tower Air", performance: "88/100", powerUsage: "5W", useCase: "Gaming, Budget", description: "Best air cooler with excellent performance.", icon: "ac_unit" },
    { id: 84, name: "be quiet! Dark Rock Pro 4", category: "Cooling", price: 6500, specs: "Dual Tower Air", performance: "86/100", powerUsage: "4W", useCase: "Quiet Gaming", description: "Quiet high-performance air cooler.", icon: "ac_unit" },
    { id: 85, name: "Lian Li Galahad 240", category: "Cooling", price: 12000, specs: "240mm AIO Liquid", performance: "91/100", powerUsage: "35W", useCase: "Gaming, Budget AIO", description: "Budget-friendly 240mm AIO.", icon: "ac_unit" },
    { id: 86, name: "Arctic Liquid Freezer", category: "Cooling", price: 9000, specs: "240mm AIO Liquid", performance: "89/100", powerUsage: "32W", useCase: "Gaming, Budget", description: "Budget AIO with solid performance.", icon: "ac_unit" },
    { id: 87, name: "Corsair ML120 Pro", category: "Cooling", price: 4500, specs: "Dual 120mm Fans", performance: "75/100", powerUsage: "3W", useCase: "Quiet Cooling", description: "Premium silent fans for cooling.", icon: "ac_unit" },
    { id: 88, name: "EK AIO 360 D-RGB", category: "Cooling", price: 15000, specs: "360mm AIO Liquid", performance: "93/100", powerUsage: "42W", useCase: "Gaming, RGB", description: "Premium AIO with excellent cooling and RGB.", icon: "ac_unit" },
    { id: 89, name: "Thermalright Peerless Assassin", category: "Cooling", price: 4000, specs: "Twin Tower Air", performance: "82/100", powerUsage: "3W", useCase: "Budget, Silent", description: "Ultra-budget high-performance air cooler.", icon: "ac_unit" },

    // ===== Motherboards (12 options) =====
    { id: 90, name: "ASUS ROG Strix X870-E", category: "Motherboard", price: 45000, specs: "ATX, PCIe 5.0, WiFi 7", performance: "96/100", powerUsage: "N/A", useCase: "High-end Gaming", description: "Premium X870-E motherboard with PCIe 5.0 support.", recommended: true, icon: "memory" },
    { id: 91, name: "MSI MPG B850 Edge WiFi", category: "Motherboard", price: 28000, specs: "ATX, PCIe 5.0, WiFi 6E", performance: "94/100", powerUsage: "N/A", useCase: "Gaming, Content Creation", description: "Great mid-range motherboard.", icon: "memory" },
    { id: 92, name: "Gigabyte Z790 Master", category: "Motherboard", price: 32000, specs: "ATX, PCIe 5.0, WiFi 6E", performance: "95/100", powerUsage: "N/A", useCase: "Intel Gaming", description: "Premium Intel platform.", icon: "memory" },
    { id: 93, name: "ASUS ProArt X870-E", category: "Motherboard", price: 48000, specs: "ATX, PCIe 5.0, Professional", performance: "95/100", powerUsage: "N/A", useCase: "Professional Work", description: "Workstation-class motherboard.", icon: "memory" },
    { id: 94, name: "MSI MPG Z890 Master", category: "Motherboard", price: 35000, specs: "ATX, PCIe 5.0, WiFi 7", performance: "96/100", powerUsage: "N/A", useCase: "Intel Gaming", description: "Latest Intel platform board.", icon: "memory" },
    { id: 95, name: "ASUS TUF Gaming X870-E", category: "Motherboard", price: 32000, specs: "ATX, PCIe 5.0, Durability", performance: "93/100", powerUsage: "N/A", useCase: "Gaming, Budget Premium", description: "Durable gaming motherboard.", icon: "memory" },
    { id: 96, name: "Gigabyte B850 Elite", category: "Motherboard", price: 18000, specs: "ATX, PCIe 5.0, WiFi 6", performance: "88/100", powerUsage: "N/A", useCase: "Budget Gaming", description: "Budget-friendly AM5 board.", icon: "memory" },
    { id: 97, name: "MSI MPG Z890 Carbon Ultra", category: "Motherboard", price: 38000, specs: "ATX, PCIe 5.0, Premium", performance: "96/100", powerUsage: "N/A", useCase: "Premium Intel Build", description: "Top Intel platform board.", icon: "memory" },
    { id: 98, name: "ASUS ROG STRIX B850", category: "Motherboard", price: 25000, specs: "ATX, PCIe 5.0, Gaming", performance: "91/100", powerUsage: "N/A", useCase: "Gaming", description: "Gaming-focused AM5 board.", icon: "memory" },
    { id: 99, name: "Gigabyte X870E Elite", category: "Motherboard", price: 42000, specs: "ATX, PCIe 5.0, Premium", performance: "95/100", powerUsage: "N/A", useCase: "High-end Gaming", description: "Premium X870E option.", icon: "memory" },
    { id: 100, name: "ASRock X870E Taichi", category: "Motherboard", price: 38000, specs: "ATX, PCIe 5.0, Gaming", performance: "94/100", powerUsage: "N/A", useCase: "Gaming, Streaming", description: "Feature-rich gaming board.", icon: "memory" },
    { id: 101, name: "NZXT N7 B550", category: "Motherboard", price: 15000, specs: "ATX, PCIe 4.0, Clean", performance: "85/100", powerUsage: "N/A", useCase: "Budget Gaming", description: "Clean design budget board.", icon: "memory" },

    // ===== Monitors (10 options) =====
    { id: 102, name: "Dell UltraSharp U2723DE", category: "Monitor", price: 35000, specs: "27\" 1440p, USB-C", performance: "94/100", powerUsage: "65W", useCase: "Professional Work", description: "Premium monitor with USB-C connectivity.", recommended: true, icon: "monitor" },
    { id: 103, name: "ASUS ROG Swift PG279QM", category: "Monitor", price: 42000, specs: "27\" 1440p 240Hz, IPS", performance: "97/100", powerUsage: "80W", useCase: "Competitive Gaming", description: "High-refresh gaming monitor.", icon: "monitor" },
    { id: 104, name: "LG UltraWide 34\"", category: "Monitor", price: 38000, specs: "34\" 3440x1440 160Hz", performance: "96/100", powerUsage: "70W", useCase: "Gaming, Productivity", description: "Immersive ultrawide gaming.", icon: "monitor" },
    { id: 105, name: "BenQ MOBIUZ EW2880U", category: "Monitor", price: 28000, specs: "28\" 4K 60Hz", performance: "90/100", powerUsage: "75W", useCase: "Professional, Gaming", description: "4K gaming monitor.", icon: "monitor" },
    { id: 106, name: "MSI MAG 321CURV", category: "Monitor", price: 32000, specs: "32\" 1440p 165Hz Curved", performance: "93/100", powerUsage: "95W", useCase: "Gaming, Entertainment", description: "Large curved gaming monitor.", icon: "monitor" },
    { id: 107, name: "LG 27UP550", category: "Monitor", price: 22000, specs: "27\" 4K 60Hz", performance: "88/100", powerUsage: "60W", useCase: "Professional Work", description: "Budget 4K monitor.", icon: "monitor" },
    { id: 108, name: "ASUS PA278CV", category: "Monitor", price: 24000, specs: "27\" 1440p 75Hz", performance: "89/100", powerUsage: "55W", useCase: "Professional Design", description: "Color-accurate design monitor.", icon: "monitor" },
    { id: 109, name: "Dell S2722DGM", category: "Monitor", price: 25000, specs: "27\" 1440p 165Hz", performance: "92/100", powerUsage: "70W", useCase: "Gaming", description: "Budget gaming monitor.", icon: "monitor" },
    { id: 110, name: "ASUS ProArt PA348C", category: "Monitor", price: 48000, specs: "34\" Ultrawide Professional", performance: "96/100", powerUsage: "85W", useCase: "Professional Editing", description: "Premium professional ultrawide.", icon: "monitor" },
    { id: 111, name: "LG 32UP550", category: "Monitor", price: 35000, specs: "32\" 4K 60Hz", performance: "91/100", powerUsage: "80W", useCase: "Professional, Large Display", description: "Large 4K monitor.", icon: "monitor" },

    // ===== Cases (10 options) =====
    { id: 112, name: "Corsair 5000T RGB", category: "Case", price: 18000, specs: "Full Tower, Tempered Glass", performance: "92/100", powerUsage: "N/A", useCase: "High-end Gaming", description: "Premium full-tower case.", recommended: true, icon: "folder" },
    { id: 113, name: "NZXT H7 Flow", category: "Case", price: 12000, specs: "Mid Tower, 3x Fans", performance: "88/100", powerUsage: "N/A", useCase: "Mid-range Gaming", description: "Good mid-tower option.", icon: "folder" },
    { id: 114, name: "Lian Li Lancool 216", category: "Case", price: 8000, specs: "Mid Tower, Mesh", performance: "86/100", powerUsage: "N/A", useCase: "Budget Build", description: "Budget-friendly case.", icon: "folder" },
    { id: 115, name: "Fractal Design Torrent", category: "Case", price: 22000, specs: "Full Tower, Mesh", performance: "94/100", powerUsage: "N/A", useCase: "High-end Gaming", description: "Premium full-tower with fans.", icon: "folder" },
    { id: 116, name: "Cooler Master HAF 700 EVO", category: "Case", price: 16000, specs: "Full Tower, Mesh", performance: "91/100", powerUsage: "N/A", useCase: "Gaming, Cooling", description: "Large gaming case.", icon: "folder" },
    { id: 117, name: "BeQuiet Dark Base 901", category: "Case", price: 14000, specs: "Full Tower, Silent", performance: "89/100", powerUsage: "N/A", useCase: "Quiet Gaming", description: "Silent-focused full tower.", icon: "folder" },
    { id: 118, name: "Silverstone Primera PM01", category: "Case", price: 9500, specs: "Mid Tower, Aluminum", performance: "87/100", powerUsage: "N/A", useCase: "Portable Gaming", description: "Portable mid-tower.", icon: "folder" },
    { id: 119, name: "Phanteks Evolv X", category: "Case", price: 17000, specs: "Mid Tower, Tempered Glass", performance: "90/100", powerUsage: "N/A", useCase: "Gaming, Design", description: "Stylish mid-tower.", icon: "folder" },
    { id: 120, name: "ThermalTake Core P5", category: "Case", price: 9000, specs: "Mid Tower, Open Air", performance: "85/100", powerUsage: "N/A", useCase: "Custom Loops", description: "Open-air case design.", icon: "folder" },
    { id: 121, name: "Jonsbo U4 Plus", category: "Case", price: 6500, specs: "Mid Tower, Mesh", performance: "82/100", powerUsage: "N/A", useCase: "Ultra Budget", description: "Ultra-budget case.", icon: "folder" },

    // ===== Peripherals: Mice (8 options) =====
    { id: 122, name: "Razer DeathAdder V3", category: "Mouse", price: 6500, specs: "Wireless, 30000 DPI, 59g", performance: "95/100", powerUsage: "2W", useCase: "Gaming", description: "Professional lightweight gaming mouse.", recommended: true, icon: "touch_app" },
    { id: 123, name: "SteelSeries Rival 650", category: "Mouse", price: 4500, specs: "Wireless, 18000 DPI", performance: "92/100", powerUsage: "2W", useCase: "Gaming, Productivity", description: "Reliable gaming mouse.", icon: "touch_app" },
    { id: 124, name: "Logitech G Pro X", category: "Mouse", price: 5000, specs: "Wireless, 25000 DPI, 63g", performance: "93/100", powerUsage: "2W", useCase: "Esports Gaming", description: "Professional esports mouse.", icon: "touch_app" },
    { id: 125, name: "ASUS ROG Chakram", category: "Mouse", price: 6000, specs: "Wireless, 16000 DPI", performance: "91/100", powerUsage: "2W", useCase: "Gaming, ROG", description: "RGB gaming mouse.", icon: "touch_app" },
    { id: 126, name: "Corsair M65 Elite", category: "Mouse", price: 4000, specs: "Wired, 18000 DPI", performance: "88/100", powerUsage: "1W", useCase: "Gaming, Budget", description: "Budget gaming mouse.", icon: "touch_app" },
    { id: 127, name: "Finalmouse Starlight Pro", category: "Mouse", price: 7500, specs: "Wireless, 8000 DPI, 47g", performance: "94/100", powerUsage: "2W", useCase: "Esports, Competitive", description: "Ultra-light esports mouse.", icon: "touch_app" },
    { id: 128, name: "BenQ ZOWIE EC2", category: "Mouse", price: 3500, specs: "Wired, 3200 DPI", performance: "86/100", powerUsage: "1W", useCase: "Esports, Budget", description: "Budget esports mouse.", icon: "touch_app" },
    { id: 129, name: "Glorious Model O", category: "Mouse", price: 3500, specs: "Wired, Lightweight", performance: "87/100", powerUsage: "1W", useCase: "Esports, Budget", description: "Budget lightweight mouse.", icon: "touch_app" },

    // ===== Keyboards (10 options) =====
    { id: 130, name: "Corsair K95 Platinum XT", category: "Keyboard", price: 22000, specs: "Mechanical, Cherry MX", performance: "96/100", powerUsage: "5W", useCase: "Gaming, Streaming", description: "Premium mechanical keyboard.", recommended: true, icon: "keyboard" },
    { id: 131, name: "Logitech G Pro X", category: "Keyboard", price: 16000, specs: "Mechanical, GX, Compact", performance: "93/100", powerUsage: "4W", useCase: "Esports", description: "Professional compact keyboard.", icon: "keyboard" },
    { id: 132, name: "Corsair K100 RGB", category: "Keyboard", price: 18000, specs: "Mechanical, OPX", performance: "94/100", powerUsage: "5W", useCase: "Gaming, RGB", description: "Premium RGB keyboard.", icon: "keyboard" },
    { id: 133, name: "Razer BlackWidow V4", category: "Keyboard", price: 12000, specs: "Mechanical, Razer", performance: "90/100", powerUsage: "4W", useCase: "Gaming", description: "Gaming mechanical keyboard.", icon: "keyboard" },
    { id: 134, name: "SteelSeries Apex Pro", category: "Keyboard", price: 19000, specs: "Mechanical, Adjustable", performance: "95/100", powerUsage: "5W", useCase: "Gaming, Adjustable", description: "Adjustable switch keyboard.", icon: "keyboard" },
    { id: 135, name: "Ducky One 3", category: "Keyboard", price: 10000, specs: "Mechanical, Cherry", performance: "88/100", powerUsage: "3W", useCase: "Gaming, Budget", description: "Budget mechanical keyboard.", icon: "keyboard" },
    { id: 136, name: "ASUS ROG Strix Scope", category: "Keyboard", price: 13000, specs: "Mechanical, ROG", performance: "91/100", powerUsage: "4W", useCase: "Gaming, ROG", description: "ROG gaming keyboard.", icon: "keyboard" },
    { id: 137, name: "Keychron K8 Pro", category: "Keyboard", price: 9000, specs: "Mechanical, Wireless", performance: "87/100", powerUsage: "3W", useCase: "Wireless Gaming", description: "Budget wireless keyboard.", icon: "keyboard" },
    { id: 138, name: "Drop CTRL", category: "Keyboard", price: 8000, specs: "Mechanical, Programmable", performance: "85/100", powerUsage: "3W", useCase: "Budget Gaming", description: "Budget programmable keyboard.", icon: "keyboard" },
    { id: 139, name: "Leopold FC900R", category: "Keyboard", price: 11000, specs: "Mechanical, Cherry", performance: "89/100", powerUsage: "3W", useCase: "Gaming, Budget", description: "Premium budget keyboard.", icon: "keyboard" },

    // ===== Headsets (8 options) =====
    { id: 140, name: "HyperX Cloud II", category: "Headset", price: 8500, specs: "Surround Sound, Noise Cancel", performance: "91/100", powerUsage: "5W", useCase: "Gaming, Streaming", description: "Quality gaming headset.", recommended: true, icon: "headphones" },
    { id: 141, name: "SteelSeries Arctis Pro", category: "Headset", price: 14500, specs: "Wireless, Lossless", performance: "94/100", powerUsage: "6W", useCase: "Premium Gaming", description: "Premium wireless headset.", icon: "headphones" },
    { id: 142, name: "Corsair VOID Elite", category: "Headset", price: 6000, specs: "Wireless, 7.1", performance: "86/100", powerUsage: "5W", useCase: "Gaming, Budget", description: "Budget wireless headset.", icon: "headphones" },
    { id: 143, name: "ASUS ROG Delta", category: "Headset", price: 9000, specs: "Wireless, ROG", performance: "90/100", powerUsage: "5W", useCase: "Gaming, ROG", description: "ROG gaming headset.", icon: "headphones" },
    { id: 144, name: "SteelSeries Arctis 7", category: "Headset", price: 10000, specs: "Wireless, 2.4GHz", performance: "88/100", powerUsage: "5W", useCase: "Gaming, Streaming", description: "Budget SteelSeries headset.", icon: "headphones" },
    { id: 145, name: "Razer BlackShark V2", category: "Headset", price: 7500, specs: "Wired, THX", performance: "89/100", powerUsage: "4W", useCase: "Gaming, Esports", description: "Esports gaming headset.", icon: "headphones" },
    { id: 146, name: "SCUF H6", category: "Headset", price: 5500, specs: "Wired, Budget", performance: "80/100", powerUsage: "3W", useCase: "Budget Gaming", description: "Ultra-budget gaming headset.", icon: "headphones" },
    { id: 147, name: "Beyerdynamic GAME ONE", category: "Headset", price: 12000, specs: "Wired, Pro Audio", performance: "92/100", powerUsage: "4W", useCase: "Professional Gaming", description: "Professional-grade headset.", icon: "headphones" }
  ];

  // Filter and sort recommendations based on search and sort preference
  const filteredRecommendations = aiRecommendations
    .filter(item => 
      searchQuery === "" || 
      item.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === "price-low") return a.price - b.price;
      if (sortBy === "price-high") return b.price - a.price;
      if (sortBy === "performance") return parseFloat(b.performance) - parseFloat(a.performance);
      return 0;
    });

  // Get unique categories for suggestions
  const categories = [...new Set(aiRecommendations.map(item => item.category))].sort();

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
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">147+ AI-Recommended Components</h2>
        <p className="text-slate-400 max-w-2xl mx-auto text-lg">
          Search for the parts you need (GPU, CPU, RAM, SSD, Monitor, Keyboard, etc.) - sorted by price from lowest to highest
        </p>
      </div>

      {/* Search and Filter Section */}
      <div className="glass-panel rounded-2xl p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Search Input */}
          <div className="relative">
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 material-symbols-outlined">search</span>
            <input
              type="text"
              placeholder="Search by part name or category (GPU, CPU, RAM, SSD, Monitor, Keyboard...)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-900/50 border border-white/10 rounded-lg pl-10 pr-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/30"
            />
          </div>

          {/* Sort Dropdown */}
          <div className="relative">
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 material-symbols-outlined">sort</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full bg-slate-900/50 border border-white/10 rounded-lg pl-10 pr-4 py-3 text-white focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/30 cursor-pointer"
            >
              <option value="price-low">Price: Low to High ⬆️</option>
              <option value="price-high">Price: High to Low ⬇️</option>
              <option value="performance">Performance: Best First ⭐</option>
            </select>
          </div>
        </div>

        {/* Category Quick Filters */}
        <div className="mt-4">
          <p className="text-xs text-slate-400 mb-2 uppercase font-bold">Quick Categories:</p>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSearchQuery("")}
              className={`px-3 py-1.5 rounded-full text-xs font-bold transition ${
                searchQuery === "" ? "bg-primary text-white" : "bg-slate-800/50 text-slate-300 hover:bg-slate-700/50"
              }`}
            >
              All Parts
            </button>
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSearchQuery(category)}
                className={`px-3 py-1.5 rounded-full text-xs font-bold transition ${
                  searchQuery.toLowerCase() === category.toLowerCase() ? "bg-primary text-white" : "bg-slate-800/50 text-slate-300 hover:bg-slate-700/50"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Results Count */}
        <div className="mt-4 text-sm text-slate-400">
          Showing <span className="text-primary font-bold">{filteredRecommendations.length}</span> out of <span className="text-primary font-bold">{aiRecommendations.length}</span> components
        </div>
      </div>

      {/* AI Recommendations Grid - 4-5 per row */}
      {filteredRecommendations.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mb-8">
          {filteredRecommendations.map((card) => (
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
      ) : (
        <div className="text-center py-12">
          <span className="material-symbols-outlined text-6xl text-slate-600 block mb-4">search_off</span>
          <p className="text-xl text-slate-400 mb-2">No components found</p>
          <p className="text-slate-500 mb-4">Try adjusting your search or browse all categories</p>
          <button
            onClick={() => {
              setSearchQuery("");
              setSortBy("price-low");
            }}
            className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-blue-600 transition"
          >
            Reset Filters
          </button>
        </div>
      )}

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