import React from 'react';
import { formatINR } from '../utils/currency';

const getIcon = (profile) => {
    if (profile.includes('Budget')) return 'desktop_windows';
    if (profile.includes('Balanced')) return 'computer';
    return 'precision_manufacturing'; // High-End
};

const getIndex = (profile) => {
    if (profile.includes('Budget')) return 65;
    if (profile.includes('Balanced')) return 85;
    return 98;
};

const getColorClass = (profile) => {
    if (profile.includes('Budget')) return 'text-slate-600 group-hover:text-white';
    if (profile.includes('Balanced')) return 'text-primary';
    return 'text-purple-500 group-hover:text-purple-400';
};

export const ProfileCard = ({ build, isSelected, onSelect }) => {
    const formattedPrice = formatINR(build.totalPrice || 0);
    const perfIndex = getIndex(build.profile);
    const iconName = getIcon(build.profile);
    const colorClass = getColorClass(build.profile);

    if (isSelected) {
        return (
            <div className="glass-panel-active rounded-2xl p-1 cursor-pointer transform scale-105 z-10 relative" onClick={onSelect}>
                <div className="absolute -top-3 inset-x-0 flex justify-center z-20">
                    <span className="bg-primary text-white text-[10px] font-bold uppercase tracking-wider py-1 px-3 rounded-full shadow-[0_0_15px_rgba(59,130,246,0.6)] animate-pulse-slow">
                        AI Recommended
                    </span>
                </div>
                <div className="bg-slate-900/60 rounded-xl p-6 h-full flex flex-col relative overflow-hidden backdrop-blur-xl">
                    <div className="absolute top-0 right-0 p-4">
                        <span className="material-symbols-outlined text-4xl text-primary animate-pulse-slow">check_circle</span>
                    </div>
                    <h4 className="text-xl font-bold text-white mb-1">
                        {build.profile.split(' ')[0]} {build.profile.split(' ')[1]}
                    </h4>
                    <div className="text-3xl font-bold text-primary-glow mb-4 drop-shadow-[0_0_10px_rgba(59,130,246,0.5)]">
                        ₹{formattedPrice} <span className="text-sm font-normal text-slate-400">INR</span>
                    </div>
                    <div className="flex justify-center py-6 relative">
                        <div className="w-40 h-40 rounded-full bg-primary/20 blur-2xl absolute animate-pulse-slow"></div>
                        <span className="material-symbols-outlined text-[90px] text-white drop-shadow-[0_0_25px_rgba(59,130,246,0.6)] z-10 animate-float">
                            {iconName}
                        </span>
                    </div>
                    <p className="text-slate-300 text-xs mb-6 text-center">{build.description}</p>
                    <div className="mt-auto flex gap-2">
                        <div className="h-2 flex-1 rounded-full bg-slate-700 overflow-hidden">
                            <div className="h-full bg-primary shadow-[0_0_10px_rgba(59,130,246,0.8)]" style={{ width: `${perfIndex}%` }}></div>
                        </div>
                    </div>
                    <p className="text-[10px] text-primary text-center mt-2 font-mono">PERFORMANCE INDEX: {perfIndex}/100</p>
                </div>
            </div>
        );
    }

    return (
        <div className="glass-panel rounded-2xl p-1 cursor-pointer transition-all duration-300 hover:bg-white/10 group h-full" onClick={onSelect}>
            <div className="bg-slate-900/40 rounded-xl p-6 h-full flex flex-col relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-50 group-hover:opacity-100 transition-opacity">
                    <span className={`material-symbols-outlined text-4xl ${colorClass}`}>
                        {build.profile.includes('High') ? 'rocket_launch' : 'savings'}
                    </span>
                </div>
                <h4 className="text-xl font-bold text-white mb-1">
                    {build.profile.split(' ')[0]} {build.profile.split(' ')[1]}
                </h4>
                <div className="text-2xl font-bold text-slate-200 mb-4">
                    ₹{formattedPrice} <span className="text-sm font-normal text-slate-500">INR</span>
                </div>
                <div className="flex justify-center py-6 relative">
                    <div className={`w-32 h-32 rounded-full ${build.profile.includes('High') ? 'bg-purple-600/20' : 'bg-gradient-to-tr from-slate-700 to-slate-500'} opacity-20 blur-xl absolute`}></div>
                    <span className="material-symbols-outlined text-[80px] text-slate-300 drop-shadow-2xl z-10 group-hover:scale-110 transition-transform duration-500">
                        {iconName}
                    </span>
                </div>
                <p className="text-slate-400 text-xs mb-6 text-center">{build.description}</p>
                <button className="mt-auto w-full py-3 rounded-lg border border-white/10 text-slate-300 text-sm font-medium hover:bg-white/5 transition-colors">
                    Select Profile
                </button>
            </div>
        </div>
    );
};
