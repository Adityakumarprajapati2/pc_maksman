import React, { createContext, useContext, useState, useEffect } from 'react';
import { MOCK_SESSION_ID } from '../services/api';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
    const [sessionId] = useState(() => {
        const saved = localStorage.getItem('pcbuild_session');
        if (saved) return saved;
        localStorage.setItem('pcbuild_session', MOCK_SESSION_ID);
        return MOCK_SESSION_ID;
    });

    const [messages, setMessages] = useState([
        {
            id: 1,
            role: 'assistant',
            content: 'Welcome to PC Build! How can I help you build your dream PC today? You can ask for complete build suggestions (e.g. "gaming PC under 80k") or specific parts (e.g. "suggest a GPU for 1440p").',
            type: 'text'
        }
    ]);

    const [currentBuild, setCurrentBuild] = useState({
        name: 'New Build',
        components: [],
        totalPrice: 0,
        compatibilityScore: 100,
        conflicts: [],
    });

    const [suggestions, setSuggestions] = useState(null); // Stores part suggestions from AI
    const [useCaseBuilds, setUseCaseBuilds] = useState(null); // Stores the 3 profile builds
    const [isTyping, setIsTyping] = useState(false);
    const [lastResponse, setLastResponse] = useState(null); // Stores the last AI response
    const [suggestedParts, setSuggestedParts] = useState([]); // Stores AI-suggested parts for configurator

    // Helper to add a user message
    const addUserMessage = (content) => {
        setMessages((prev) => [...prev, { id: Date.now(), role: 'user', content, type: 'text' }]);
    };

    // Helper to add a bot message
    const addBotMessage = (content, type = 'text', data = null) => {
        setMessages((prev) => [
            ...prev,
            { id: Date.now(), role: 'assistant', content, type, data }
        ]);
    };

    return (
        <AppContext.Provider
            value={{
                sessionId,
                messages,
                setMessages,
                addUserMessage,
                addBotMessage,
                currentBuild,
                setCurrentBuild,
                suggestions,
                setSuggestions,
                useCaseBuilds,
                setUseCaseBuilds,
                isTyping,
                setIsTyping,
                lastResponse,
                setLastResponse,
                suggestedParts,
                setSuggestedParts
            }}
        >
            {children}
        </AppContext.Provider>
    );
};

export const useAppContext = () => {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error('useAppContext must be used within an AppProvider');
    }
    return context;
};
