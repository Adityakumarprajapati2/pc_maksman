import axios from 'axios';

// Create an Axios instance with base URL
export const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

export const MOCK_SESSION_ID = 'session_' + Math.random().toString(36).substr(2, 9);

export const chatService = {
    // Legacy support
    sendMessage: async (message, sessionId = MOCK_SESSION_ID) => {
        const response = await api.post('/chat', { message, sessionId });
        return response.data;
    },

    // New Streaming Support
    sendMessageStream: async (message, sessionId = MOCK_SESSION_ID, onProgress) => {
        const tempApiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

        try {
            const response = await fetch(`${tempApiUrl}/chat`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message, sessionId }),
            });

            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

            const reader = response.body.getReader();
            const decoder = new TextDecoder('utf-8');

            while (true) {
                const { value, done } = await reader.read();
                if (done) break;

                const chunk = decoder.decode(value, { stream: true });
                const lines = chunk.split('\n');

                for (const line of lines) {
                    if (line.startsWith('data: ')) {
                        const dataStr = line.replace('data: ', '').trim();
                        if (dataStr === '[DONE]') continue;
                        if (dataStr) {
                            try {
                                const data = JSON.parse(dataStr);
                                // Fire progression callback 
                                // e.g., {step: "classifierNode"} or {step: "FINISH", result: Object}
                                if (onProgress) onProgress(data);
                            } catch (e) {
                                console.error("Error parsing SSE chunk:", e);
                            }
                        }
                    }
                }
            }
        } catch (error) {
            console.error("sendMessageStream error:", error);
            throw error;
        }
    },
};

export const partsService = {
    getComponents: async (filters = {}) => {
        const response = await api.get('/components', { params: filters });
        return response.data;
    },
};

export const buildService = {
    saveBuild: async (buildData) => {
        const response = await api.post('/builds', buildData);
        return response.data;
    },
    getBuilds: async (sessionId = MOCK_SESSION_ID) => {
        const response = await api.get(`/builds/${sessionId}`);
        return response.data;
    },
};
