// Simple in-memory chat message history with response caching
class SimpleInMemoryChatMessageHistory {
    constructor() {
        this.messages = [];
        this.userQuestions = []; // Track last 5 user questions with timestamps
        this.conversationMetadata = []; // Store conversation snapshots (up to 5)
        this.responseCache = new Map(); // Cache for Q&A pairs (normalized question -> response)
    }

    async addMessage(message) {
        this.messages.push({
            ...message,
            id: Date.now()
        });
    }

    async addMessages(messages) {
        this.messages.push(...messages.map(m => ({ ...m, id: Date.now() })));
    }

    async getMessages() {
        return this.messages;
    }

    // Normalize question for cache matching (lowercase, trim, remove extra spaces)
    normalizeQuestion(question) {
        return question.trim().toLowerCase().replace(/\s+/g, ' ');
    }

    // Check if we have a cached response for this question
    getCachedResponse(question) {
        const normalized = this.normalizeQuestion(question);
        return this.responseCache.get(normalized);
    }

    // Cache a question-response pair
    cacheResponse(question, response) {
        const normalized = this.normalizeQuestion(question);
        this.responseCache.set(normalized, response);
    }

    // Track user questions for memory (last 5)
    addUserQuestion(question) {
        const questionData = {
            text: question,
            timestamp: new Date().toISOString(),
            id: Date.now()
        };
        this.userQuestions.push(questionData);
        // Keep only last 5 questions
        if (this.userQuestions.length > 5) {
            this.userQuestions = this.userQuestions.slice(-5);
        }
    }

    // Get last 5 user questions as context
    getRecentQuestions() {
        return this.userQuestions.map((q, idx) => `[${idx + 1}] ${q.text}`);
    }

    // Get recent questions with full metadata (for sidebar)
    getRecentQuestionsWithMetadata() {
        return this.userQuestions.map(q => ({
            id: q.id,
            text: q.text,
            timestamp: q.timestamp,
            preview: q.text.substring(0, 50)
        }));
    }

    // Get full conversation history (last N messages) - both Q&A pairs
    getConversationContext(limit = 10) {
        // Return last 'limit' message pairs (user + assistant) - expanded from 5 to 10
        if (!this.messages || this.messages.length === 0) {
            return [];
        }
        const items = this.messages.slice(-(limit * 2));
        return items.map(msg => ({
            role: msg.role || "user",
            content: msg.content || msg.text || ""
        })).filter(m => m.content); // Filter out empty messages
    }

    // Get last user question
    getLastQuestion() {
        if (this.userQuestions.length === 0) return null;
        return this.userQuestions[this.userQuestions.length - 1].text;
    }
}

const sessionHistories = {};

export function getSessionHistory(sessionId) {
    if (!sessionHistories[sessionId]) {
        sessionHistories[sessionId] = new SimpleInMemoryChatMessageHistory();
    }
    return sessionHistories[sessionId];
}

export function addUserQuestion(sessionId, question) {
    const history = getSessionHistory(sessionId);
    history.addUserQuestion(question);
}

export function getRecentQuestions(sessionId) {
    const history = getSessionHistory(sessionId);
    return history.getRecentQuestions();
}

export function getConversationContext(sessionId, limit = 5) {
    const history = getSessionHistory(sessionId);
    return history.getConversationContext(limit);
}

export function getLastQuestion(sessionId) {
    const history = getSessionHistory(sessionId);
    return history.getLastQuestion();
}

export function getCachedResponse(sessionId, question) {
    const history = getSessionHistory(sessionId);
    return history.getCachedResponse(question);
}

export function cacheResponse(sessionId, question, response) {
    const history = getSessionHistory(sessionId);
    history.cacheResponse(question, response);
}

export function getRecentQuestionsWithMetadata(sessionId) {
    const history = getSessionHistory(sessionId);
    return history.getRecentQuestionsWithMetadata();
}