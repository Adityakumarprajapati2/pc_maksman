import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { chatService } from '../services/api';

const PROGRESS_STAGES = {
    classifierNode: "🧠 Classifier: Analysing your message...",
    extractorNode: "📋 Extractor: Extracting fixed parts and budget...",
    partAgentsNode: "🔍 Agents: Finding compatible parts mapping...",
    useCaseNode: "💭 Use-Case Agent: Generating build suggestions...",
    composerNode: "✨ Composer: Crafting your answer...",
    composeUseCaseNode: "✨ Composer: Formatting generated setups..."
};

export const ChatInput = () => {
    const [inputValue, setInputValue] = useState('');
    const [streamingSteps, setStreamingSteps] = useState([]);
    const { sessionId, addUserMessage, addBotMessage, setSuggestions, setUseCaseBuilds, isTyping, setIsTyping, suggestions } = useAppContext();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!inputValue.trim() || isTyping) return;

        const userText = inputValue.trim();
        setInputValue('');
        setStreamingSteps([]);
        addUserMessage(userText);
        setIsTyping(true);

        try {
            await chatService.sendMessageStream(userText, sessionId, (data) => {
                if (data.step === 'FINISH' && data.result) {
                    const response = data.result;
                    if (response.type === 'SPECIFIC_PARTS' && response.suggestions) {
                        setSuggestions(response.suggestions);
                        setUseCaseBuilds(null);
                    } else if (response.type === 'USE_CASE_BUILDS' && response.builds) {
                        setUseCaseBuilds(response.builds);
                        setSuggestions(null);
                    }
                    addBotMessage(response.response, response.type, response.suggestions || response.builds);
                } else if (data.step === 'ERROR') {
                    addBotMessage(data.error || "Sorry, I encountered an error.", "ERROR", null);
                } else if (PROGRESS_STAGES[data.step]) {
                    setStreamingSteps(prev => {
                        const current = [...prev];
                        if (current.length > 0) current[current.length - 1].status = 'done';
                        current.push({ text: PROGRESS_STAGES[data.step], status: 'active' });
                        if (current.length > 3) current.shift();
                        return current;
                    });
                }
            });

        } catch (error) {
            console.error('Chat stream error:', error);
            addBotMessage("Sorry, I encountered an error connecting to the streaming server.", "ERROR", null);
        } finally {
            setIsTyping(false);
            setStreamingSteps([]);
        }
    };

    return (
        <div className="fixed bottom-0 left-0 right-0 lg:pl-64 z-40 p-4 bg-gradient-to-t from-[#0f172a] via-[#0f172a] to-transparent pointer-events-none">
            <div className="max-w-4xl mx-auto pointer-events-auto relative">

                {/* Status indicators floating above */}
                {isTyping && streamingSteps.length > 0 && (
                    <div className="absolute -top-16 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-1 text-[11px] w-full text-center">
                        {streamingSteps.map((s, idx) => (
                            <span key={idx} className={s.status === 'active' ? 'text-primary font-bold animate-pulse-slow' : 'text-emerald-500'}>
                                {s.text} {s.status === 'done' ? '✓' : ''}
                            </span>
                        ))}
                    </div>
                )}

                {isTyping && streamingSteps.length === 0 && (
                    <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 text-[11px] text-primary bg-primary/10 border border-primary/20 px-3 py-1 rounded-full backdrop-blur-sm font-bold tracking-wider animate-pulse-slow flex items-center gap-2">
                        <span className="material-symbols-outlined text-[14px]">auto_awesome</span> AI Processing
                    </div>
                )}

                <form onSubmit={handleSubmit} className="glass-panel backdrop-blur-xl rounded-full p-2 flex items-center gap-2 shadow-2xl ring-1 ring-white/10 group focus-within:ring-primary/50 transition-all">
                    <button type="button" className="size-10 rounded-full bg-white/5 text-slate-400 flex items-center justify-center hover:bg-white/10 hover:text-white transition-colors">
                        <span className="material-symbols-outlined text-[20px]">add</span>
                    </button>
                    <input
                        className="flex-1 bg-transparent border-none focus:ring-0 text-sm text-white placeholder:text-slate-500 outline-none flex"
                        placeholder="Ask AI to filter by brand, VRAM, or ask a question..."
                        type="text"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        disabled={isTyping}
                    />
                    <button
                        type="submit"
                        disabled={isTyping || !inputValue.trim()}
                        className="size-10 rounded-full bg-primary text-white flex items-center justify-center hover:bg-blue-600 transition-colors shadow-[0_0_10px_rgba(59,130,246,0.5)] disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <span className="material-symbols-outlined text-[20px]">auto_awesome</span>
                    </button>
                </form>
            </div>
        </div>
    );
};
