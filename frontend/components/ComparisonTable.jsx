import React from 'react';
import { useAppContext } from '../context/AppContext';

const getIcon = (type) => {
    switch (type) {
        case 'cpu': return 'memory';
        case 'gpu': return 'videogame_asset';
        case 'ram': return 'dns';
        case 'storage': return 'hard_drive';
        case 'motherboard': return 'grid_view';
        default: return 'build';
    }
};

export const ComparisonTable = ({ builds, selectedIndex }) => {
    const { setCurrentBuild, setUseCaseBuilds } = useAppContext();
    const coreTypes = ['cpu', 'gpu', 'ram', 'storage'];

    const getComp = (build, type) => build.components.find(c => c.type === type) || { name: '-', specs: {} };

    const handleFinalize = () => {
        const selectedBuild = builds[selectedIndex];
        setCurrentBuild({
            name: selectedBuild.profile,
            components: selectedBuild.components,
            totalPrice: selectedBuild.totalPrice,
            compatibilityScore: 100,
            conflicts: [],
        });
        setUseCaseBuilds(null);
    };

    const selectedTitle = builds[selectedIndex].profile.split(' ')[0];

    return (
        <div className="glass-panel rounded-2xl overflow-hidden mt-8 shadow-2xl">
            <div className="px-6 py-4 border-b border-white/10 bg-white/5 flex justify-between items-center">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary">tune</span>
                    Component Configuration
                </h3>
                <span className="text-xs text-slate-400">Comparing <span className="text-white font-bold">{selectedTitle}</span> vs others</span>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-left text-sm text-slate-400">
                    <thead className="bg-white/5 text-xs uppercase text-slate-300">
                        <tr>
                            <th className="px-6 py-4 font-semibold tracking-wider">Component</th>
                            {builds.map((b, i) => (
                                <th key={i} className={`px-6 py-4 font-semibold tracking-wider ${i === selectedIndex ? 'text-primary' : 'opacity-50'}`}>
                                    {b.profile.split(' ')[0]} {i === selectedIndex && '(Selected)'}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                        {coreTypes.map(type => (
                            <tr key={type} className="hover:bg-white/5 transition-colors group">
                                <td className="px-6 py-4 font-medium text-white flex items-center gap-3">
                                    <span className="material-symbols-outlined text-slate-500">{getIcon(type)}</span> {type.toUpperCase()}
                                </td>
                                {builds.map((build, idx) => {
                                    const comp = getComp(build, type);
                                    const shortName = comp.name.split(' ').slice(0, 3).join(' ');

                                    if (idx === selectedIndex) {
                                        return (
                                            <td key={idx} className="px-6 py-4 text-white bg-primary/5 border-l-2 border-primary">
                                                <div className="flex justify-between items-center">
                                                    <span>{shortName}</span>
                                                    <span className="material-symbols-outlined text-primary text-[16px]">check_circle</span>
                                                </div>
                                            </td>
                                        );
                                    }

                                    return (
                                        <td key={idx} className="px-6 py-4 opacity-60">
                                            {shortName}
                                        </td>
                                    );
                                })}
                            </tr>
                        ))}
                    </tbody>
                    <tfoot className="border-t border-white/10 bg-white/5">
                        <tr>
                            <td className="px-6 py-6"></td>
                            {builds.map((build, idx) => {
                                if (idx === selectedIndex) {
                                    return (
                                        <td key={idx} className="px-6 py-6">
                                            <button
                                                onClick={handleFinalize}
                                                className="w-full glow-button bg-primary text-white py-3 rounded-lg font-bold text-sm flex items-center justify-center gap-2 hover:scale-105 transition-transform"
                                            >
                                                <span>Finalize This Build</span>
                                                <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                                            </button>
                                        </td>
                                    );
                                }

                                return (
                                    <td key={idx} className="px-6 py-6 text-center">
                                        <button className="text-xs text-slate-400 hover:text-white transition-colors underline decoration-slate-600">
                                            Switch to {build.profile.split(' ')[0]}
                                        </button>
                                    </td>
                                );
                            })}
                        </tr>
                    </tfoot>
                </table>
            </div>
        </div>
    );
};
