/**
 * Unified data access layer.
 * Works with in-memory store. If MongoDB models are available, uses them instead.
 * All functions return plain JS objects, so the rest of the app doesn't care.
 */
import { getStore } from "./db.mjs";

// ─── Components ──────────────────────────────────────────────
export function getAllComponents(filter = {}) {
    const store = getStore();
    let results = [...store.components];

    if (filter.type) {
        results = results.filter(c => c.type === filter.type);
    }
    if (filter.brand) {
        results = results.filter(c =>
            c.brand.toLowerCase().includes(filter.brand.toLowerCase())
        );
    }
    if (filter.minPrice) {
        results = results.filter(c => c.price >= Number(filter.minPrice));
    }
    if (filter.maxPrice) {
        results = results.filter(c => c.price <= Number(filter.maxPrice));
    }
    if (filter.search) {
        const q = filter.search.toLowerCase();
        results = results.filter(c =>
            c.name.toLowerCase().includes(q) ||
            c.brand.toLowerCase().includes(q) ||
            c.model.toLowerCase().includes(q)
        );
    }

    return results;
}

export function getComponentById(id) {
    const store = getStore();
    return store.components.find(c => c.id === id) || null;
}

export function getComponentsByType(type) {
    return getAllComponents({ type });
}

// ─── Builds ──────────────────────────────────────────────────
export function saveBuild(buildData) {
    const store = getStore();
    const build = {
        id: `build_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        ...buildData
    };
    store.builds.push(build);
    return build;
}

export function getBuildsBySession(sessionId) {
    const store = getStore();
    return store.builds.filter(b => b.sessionId === sessionId);
}

export function getBuildById(id) {
    const store = getStore();
    return store.builds.find(b => b.id === id) || null;
}

// ─── Sessions ────────────────────────────────────────────────
export function getSession(sessionId) {
    const store = getStore();
    if (!store.sessions[sessionId]) {
        store.sessions[sessionId] = {
            sessionId,
            messages: [],
            context: {
                fixedParts: {},
                budget: null,
                suggestedParts: {},
                useCase: null
            }
        };
    }
    return store.sessions[sessionId];
}

export function addMessageToSession(sessionId, role, content) {
    const session = getSession(sessionId);
    session.messages.push({
        role,
        content,
        timestamp: new Date().toISOString()
    });
    return session;
}

export function updateSessionContext(sessionId, contextUpdate) {
    const session = getSession(sessionId);
    session.context = { ...session.context, ...contextUpdate };
    return session;
}
