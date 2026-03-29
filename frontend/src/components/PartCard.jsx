import React from 'react';
import { useAppContext } from '../context/AppContext';
import { formatINR } from '../utils/currency';

// Helper for dynamic icons via Google Material Symbols
const getIconForType = (type) => {
    if (!type) return 'box';
    switch (type.toLowerCase()) {
        case 'cpu': return 'memory';
        case 'gpu': return 'developer_board';
        case 'ram': return 'dns';
        case 'storage': return 'hard_drive';
        case 'motherboard': return 'grid_view';
        default: return 'box';
    }
};

export const PartCard = ({ part, isRecommended }) => {
    const { currentBuild, setCurrentBuild } = useAppContext();

    const componentId = part.componentId || part.id || part.name;
    const isSelected = currentBuild.components.some(c => (c.componentId || c.id || c.name) === componentId);

    const handleSelect = () => {
        setCurrentBuild(prev => {
            const filtered = prev.components.filter(c => c.type !== part.type);
            return {
                ...prev,
                components: [...filtered, part],
                totalPrice: filtered.reduce((sum, c) => sum + (c.price || 0), 0) + (part.price || 0)
            };
        });
    };

    const formattedPrice = formatINR(part.price);

    let mergedSpecs = [];
    if (typeof part.specs === 'object' && part.specs !== null) {
        mergedSpecs = Object.values(part.specs).slice(0, 2);
    } else if (typeof part.specs === 'string') {
        mergedSpecs = [part.specs];
    }

    const iconName = getIconForType(part.type);

    if (isRecommended) {
        return (
            <div className="glass-card rounded-2xl p-1 relative group cursor-pointer overflow-hidden ring-2 ring-primary ring-offset-2 ring-offset-slate-900 shadow-[0_0_50px_-10px_rgba(59,130,246,0.3)]">
                <div className="absolute top-0 right-0 bg-gradient-to-l from-primary to-blue-600 text-white text-xs font-bold px-4 py-1.5 rounded-bl-xl z-20 shadow-lg">
                    AI RECOMMENDED
                </div>
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="h-full flex flex-col relative z-10 bg-slate-900/40 rounded-xl p-6 border border-primary/30">
                    <div className="flex justify-between items-start mb-6">
                        <div className="bg-slate-800/80 backdrop-blur border border-white/10 text-white text-xs font-bold px-3 py-1.5 rounded-lg uppercase tracking-wider flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-red-500"></span>
                            Raw Performance
                        </div>
                        <button className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-slate-400 hover:text-red-400 transition-colors border border-white/5">
                            <span className="material-symbols-outlined">favorite</span>
                        </button>
                    </div>

                    <div className="relative h-48 mb-6 flex items-center justify-center group-hover:scale-105 transition-transform duration-500">
                        <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent opacity-50 rounded-full blur-2xl"></div>
                        <span className="material-symbols-outlined text-9xl text-slate-600 group-hover:text-slate-300 transition-colors duration-300 drop-shadow-[0_0_15px_rgba(255,255,255,0.1)]">{iconName}</span>
                    </div>

                    <div className="mt-auto space-y-4">
                        <div>
                            <h3 className="text-2xl font-bold text-white group-hover:text-primary transition-colors">{part.name}</h3>
                            <div className="flex items-center gap-4 mt-2 text-sm text-slate-400">
                                {mergedSpecs.map((spec, i) => (
                                    <span key={i} className="flex items-center gap-1">
                                        <span className="material-symbols-outlined text-base">verified</span> {spec}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div className="h-px bg-white/10"></div>

                        <div className="flex items-end justify-between">
                            <div>
                                <span className="text-xs text-slate-500 uppercase font-bold tracking-wider">Best Price</span>
                                <div className="text-2xl font-bold text-white">₹{formattedPrice}</div>
                            </div>
                            <button
                                onClick={handleSelect}
                                className={`${isSelected ? 'bg-green-600 hover:bg-green-500 text-white' : 'bg-primary text-white hover:bg-blue-600'} transition-all font-bold px-6 py-3 rounded-xl flex items-center gap-2 shadow-lg group-active:scale-95`}
                            >
                                {isSelected ? 'Selected' : 'Pick This One'}
                                <span className="material-symbols-outlined text-sm">check_circle</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="glass-card rounded-2xl p-1 relative group cursor-pointer overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="h-full flex flex-col relative z-10 bg-slate-900/40 rounded-xl p-6 border border-white/5">
                <div className="flex justify-between items-start mb-6">
                    <div className="bg-slate-800/80 backdrop-blur border border-white/10 text-white text-xs font-bold px-3 py-1.5 rounded-lg uppercase tracking-wider flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-green-400"></span>
                        Solid Choice
                    </div>
                    <button className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-slate-400 hover:text-red-400 transition-colors border border-white/5">
                        <span className="material-symbols-outlined">favorite</span>
                    </button>
                </div>

                <div className="relative h-48 mb-6 flex items-center justify-center group-hover:scale-105 transition-transform duration-500">
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent opacity-50 rounded-full blur-2xl"></div>
                    <span className="material-symbols-outlined text-9xl text-slate-600 group-hover:text-slate-300 transition-colors duration-300 drop-shadow-[0_0_15px_rgba(255,255,255,0.1)]">{iconName}</span>
                </div>

                <div className="mt-auto space-y-4">
                    <div>
                        <h3 className="text-2xl font-bold text-white group-hover:text-primary transition-colors">{part.name}</h3>
                        <div className="flex items-center gap-4 mt-2 text-sm text-slate-400">
                            {mergedSpecs.map((spec, i) => (
                                <span key={i} className="flex items-center gap-1">
                                    <span className="material-symbols-outlined text-base">verified</span> {spec}
                                </span>
                            ))}
                        </div>
                    </div>

                    <div className="h-px bg-white/10"></div>

                    <div className="flex items-end justify-between">
                        <div>
                            <span className="text-xs text-slate-500 uppercase font-bold tracking-wider">Best Price</span>
                            <div className="text-2xl font-bold text-white">₹{formattedPrice}</div>
                        </div>
                        <button
                            onClick={handleSelect}
                            className={`${isSelected ? 'bg-green-600 border-green-500 text-white' : 'bg-white text-slate-900 hover:bg-primary hover:text-white'} transition-all font-bold px-6 py-3 rounded-xl flex items-center gap-2 shadow-lg shadow-white/5 group-active:scale-95`}
                        >
                            {isSelected ? 'Selected' : 'Add to Build'}
                            <span className="material-symbols-outlined text-sm">add</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
