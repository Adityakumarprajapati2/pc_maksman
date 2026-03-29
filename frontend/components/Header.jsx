import React from 'react';
import { useAppContext } from '../context/AppContext';
import { formatINR } from '../utils/currency';

export const Header = () => {
    const { currentBuild } = useAppContext();

    const formattedSpent = formatINR(currentBuild.totalPrice || 0);
    const rawBudget = 100000; // Hardcoded default budget
    const formattedBudget = formatINR(rawBudget);
    const percentage = Math.min((currentBuild.totalPrice / rawBudget) * 100, 100);

    const isOverBudget = percentage > 90;

    return (
        <div className="absolute top-6 left-6 right-6 z-30 flex justify-center pointer-events-none">
            <div className="glass-panel rounded-full px-6 py-3 flex items-center gap-8 shadow-2xl pointer-events-auto max-w-4xl w-full justify-between">

                {/* Budget Section */}
                <div className="flex items-center gap-4">
                    <div className="flex flex-col">
                        <span className="text-[10px] text-slate-400 uppercase tracking-wider font-bold">Total Budget</span>
                        <div className="flex items-baseline gap-1">
                            <span className="text-lg font-bold text-white">₹{formattedSpent}</span>
                            <span className="text-xs text-slate-400">/ ₹{formattedBudget}</span>
                        </div>
                    </div>
                    <div className="w-32 h-1.5 bg-slate-700 rounded-full overflow-hidden">
                        <div
                            className={`h-full ${isOverBudget ? 'bg-gradient-to-r from-red-400 to-red-600 shadow-[0_0_10px_rgba(239,68,68,0.5)]' : 'bg-gradient-to-r from-green-400 to-green-600 shadow-[0_0_10px_rgba(34,197,94,0.5)]'}`}
                            style={{ width: `${percentage || 0}%` }}
                        ></div>
                    </div>
                </div>

                {/* Metrics Section */}
                <div className="flex items-center gap-6">
                    {/* Compatibility */}
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-green-500/20 text-green-400 flex items-center justify-center border border-green-500/30 shadow-[0_0_15px_rgba(74,222,128,0.2)]">
                            <span className="material-symbols-outlined text-lg">check</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-xs font-bold text-green-400">Compatible</span>
                            <span className="text-[10px] text-slate-400">
                                {currentBuild.components.length > 0 ? `${currentBuild.components.length} parts ✓` : 'Select parts'}
                            </span>
                        </div>
                    </div>

                    <div className="h-8 w-px bg-white/10"></div>

                    {/* Power */}
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-yellow-500/20 text-yellow-400 flex items-center justify-center border border-yellow-500/30">
                            <span className="material-symbols-outlined text-lg">bolt</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-xs font-bold text-yellow-400">Est. Power</span>
                            <span className="text-[10px] text-slate-400">---W / ---W PSU</span>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};
