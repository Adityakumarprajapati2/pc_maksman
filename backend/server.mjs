/**
 * PC Builder AI – Express Server
 * All routes work without MongoDB (in-memory storage).
 * MongoDB is attempted on startup but optional.
 */
import dotenv from "dotenv";
dotenv.config();
import "./llm.mjs"; 
console.log(" [1] Config loaded");

import express from "express";
console.log(" [2] Express imported");
import cors from "cors";
console.log(" [3] CORS imported");
import { connectDB, getStore } from "./db.mjs";
console.log(" [4] DB module imported");
import { loadSeedData } from "./seed.mjs";
console.log(" [5] Seed module imported");
import { buildGraph, agentMetadata } from "./graph.mjs";
console.log(" [6] Graph module imported");
import {
    getAllComponents,
    getComponentById,
    saveBuild,
    getBuildsBySession,
    getBuildById
} from "./store.mjs";
console.log(" [7] Store module imported");
import { 
    getSessionHistory,
    addUserQuestion, 
    getRecentQuestions, 
    getConversationContext,
    getLastQuestion,
    getCachedResponse,
    cacheResponse,
    getRecentQuestionsWithMetadata
} from "./memory.mjs";
console.log(" [8] Memory module imported");

const app = express();
console.log(" [8] Express app created");

// ── CORS Configuration ────────────────────────────────────────
const corsOptions = {
    origin: ['http://localhost:5173', 'http://localhost:5174', 'http://localhost:5175', 'http://localhost:3000', 'http://127.0.0.1:5173', 'http://127.0.0.1:5174', 'http://127.0.0.1:5175', 'http://127.0.0.1:3000'],
    methods: ['GET', 'POST', 'OPTIONS'],
    credentials: true,
    optionsSuccessStatus: 200
};

// ── Middleware ────────────────────────────────────────────────
app.use(cors(corsOptions));
app.use(express.json());

// ── Request logging ──────────────────────────────────────────
app.use((req, res, next) => {
    console.log(`${req.method} ${req.path} – ${new Date().toISOString()}`);
    next();
});

// ── Health check ─────────────────────────────────────────────
app.get("/api/health", (req, res) => {
    res.json({
        status: "ok",
        service: "PC Build",
        version: "1.0.0",
        componentsLoaded: getStore().components.length,
        timestamp: new Date().toISOString()
    });
});

// ── GET /api/recent-questions ────────────────────────────────
// Get the list of recent questions with metadata for sidebar
app.get("/api/recent-questions", (req, res) => {
    const { sessionId = "default" } = req.query;
    
    const recentQuestions = getRecentQuestionsWithMetadata(sessionId);
    res.json({
        sessionId,
        recentQuestions: recentQuestions,
        count: recentQuestions.length
    });
});

// ── POST /api/chat (Using SSE) ───────────────────────────────────────────
// Main chat endpoint utilizing SSE to stream progress steps directly to frontend.

app.post("/api/chat", async (req, res) => {
    console.log("BODY RECEIVED:", req.body);
    const body = req.body || {};
let { message, sessionId = "default" } = body;

  if (!req.body || !message) {
    return res.status(400).json({ 
        error: "Message is required",
        hint: "Send JSON body: { \"message\": \"your query\" }"
    });
}
    res.writeHead(200, {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        "Connection": "keep-alive"
    });

    try {
        // Handle "repeat last question" command
        const repeatPattern = /^(repeat|retry|try again|redo)\s*(last\s*)?(question|query)?$/i;
        if (repeatPattern.test(message.trim())) {
            const lastQuestion = getLastQuestion(sessionId);
            
            if (lastQuestion) {
                console.log(`[REPEAT] Session ${sessionId}: Repeating last question: "${lastQuestion}"`);
                // Add context to help with better processing
                message = `[REPEAT REQUEST] Please provide a detailed and thorough answer to: ${lastQuestion}`;
            } else {
                res.write(`data: ${JSON.stringify({ step: "ERROR", message: "No previous question to repeat" })}\n\n`);
                res.write(`data: [DONE]\n\n`);
                res.end();
                return;
            }
        }
        
        // FAST PATH: Check if we have a cached response for this exact question
        const cachedResponse = getCachedResponse(sessionId, message);
        if (cachedResponse) {
            console.log(`[CACHE HIT] Session ${sessionId}: Using cached response for "${message.substring(0, 60)}..."`);
            
            const parsedResponse = {
                type: "CACHED",
                response: cachedResponse,
                suggestions: [],
                builds: null
            };
            
            res.write(`data: ${JSON.stringify({ step: "CACHE", agent: "Memory Cache", description: "Using cached response..." })}\n\n`);
            res.write(`data: ${JSON.stringify({ step: "FINISH", result: parsedResponse })}\n\n`);
            res.write(`data: [DONE]\n\n`);
            res.end();
            return;
        }
        
        // Get conversation history BEFORE adding current message (expanded to 10 for better context)
        const conversationHistory = getConversationContext(sessionId, 10);
        
        // Add current user question to memory for next request
        addUserQuestion(sessionId, message);
        
        // Get recent questions (includes the one just added)
        const recentQuestions = getRecentQuestions(sessionId);

        console.log(`[PROCESS] Session ${sessionId}: Conv history (${conversationHistory.length} msgs), Recent qs (${recentQuestions.length})`);

        // Pass conversation history and recent questions to graph
        const stream = await buildGraph.stream(
            { 
                input: message,
                conversationHistory: conversationHistory,
                recentQuestions: recentQuestions
            }, 
            { configurable: { thread_id: sessionId } }
        );

        let finalResponse = null;

        for await (const chunk of stream) {
            // chunk keys refer to nodes executed, and map to their explicit returned state objects.
            const nodeName = Object.keys(chunk)[0];
            const metadata = agentMetadata[nodeName] || { agentName: nodeName, description: "Processing..." };

            res.write(`data: ${JSON.stringify({ 
                step: nodeName, 
                agent: metadata.agentName,
                description: metadata.description,
                status: "completed" 
            })}\n\n`);

            // Capture final response from terminal nodes
            if (nodeName === "composeUseCaseNode" || nodeName === "composerNode" || nodeName === "safetyNode" || nodeName === "generalInfoNode") {
                const finalState = chunk[nodeName];
                
                if (finalState.finalResponse) {
                    finalResponse = finalState.finalResponse;
                    
                    // Save this exchange to memory for next request
                    const history = getSessionHistory(sessionId);
                    history.messages.push({
                        role: "user",
                        content: message,
                        timestamp: new Date().toISOString()
                    });
                    history.messages.push({
                        role: "assistant",
                        content: finalResponse,
                        timestamp: new Date().toISOString()
                    });
                    
                    // Cache response for fast retrieval of repeated questions
                    cacheResponse(sessionId, message, finalResponse);
                    
                    // Preparing structure compatible with what Frontend expects
                    const parsedResponse = {
                        type: finalState.intent || (finalState.builds ? "USE_CASE_BUILDS" : "SPECIFIC_PARTS"),
                        response: finalResponse,
                        suggestions: finalState.suggestions,
                        builds: finalState.builds
                    };

                    res.write(`data: ${JSON.stringify({ step: "FINISH", result: parsedResponse })}\n\n`);
                }
            }
        }

        // Ensure we send a response if none was captured
        if (!finalResponse) {
            const fallbackResponse = {
                type: "ERROR",
                response: "I apologize, but I couldn't generate a response. Please try rephrasing your question."
            };
            res.write(`data: ${JSON.stringify({ step: "FINISH", result: fallbackResponse })}\n\n`);
        }

        res.write(`data: [DONE]\n\n`);
        res.end();

    } catch (error) {
        console.error("Chat streaming endpoint error:", error);
        const errorResponse = {
            type: "ERROR",
            response: "Sorry, I encountered an error while processing your request. Please try again."
        };
        res.write(`data: ${JSON.stringify({ step: "FINISH", result: errorResponse })}\n\n`);
        res.write(`data: [DONE]\n\n`);
        res.end();
    }
});

// ── Global Error Handler ──────────────────────────────────────
app.use((err, req, res, next) => {
    console.error("[ERROR] Unhandled error:", err);
    if (!res.headersSent) {
        res.status(500).json({
            error: "Internal server error",
            message: err.message,
            timestamp: new Date().toISOString()
        });
    }
});

// ── GET /api/components ──────────────────────────────────────
// Search and filter components. Query params: type, brand, minPrice, maxPrice, search
app.get("/api/components", (req, res) => {
    const filter = {
        type: req.query.type,
        brand: req.query.brand,
        minPrice: req.query.minPrice,
        maxPrice: req.query.maxPrice,
        search: req.query.search
    };

    const components = getAllComponents(filter);
    res.json({
        count: components.length,
        components
    });
});

// ── GET /api/components/:id ──────────────────────────────────
app.get("/api/components/:id", (req, res) => {
    const component = getComponentById(req.params.id);
    if (!component) {
        return res.status(404).json({ error: "Component not found" });
    }
    res.json(component);
});

// ── POST /api/builds ─────────────────────────────────────────
// Save a build. Body: { sessionId, name, components, totalPrice, ... }
app.post("/api/builds", (req, res) => {
    const { sessionId, name, components, totalPrice, compatibilityScore, conflicts, notes } = req.body;

    if (!sessionId || !name) {
        return res.status(400).json({ error: "sessionId and name are required" });
    }

    const build = saveBuild({
        sessionId,
        name,
        components: components || [],
        totalPrice: totalPrice || 0,
        compatibilityScore: compatibilityScore || 100,
        conflicts: conflicts || [],
        notes: notes || ""
    });

    res.status(201).json(build);
});

// ── GET /api/builds/:sessionId ───────────────────────────────
// Get all builds for a session.
app.get("/api/builds/:sessionId", (req, res) => {
    const builds = getBuildsBySession(req.params.sessionId);
    res.json({
        count: builds.length,
        builds
    });
});

// ── GET /api/build/:id ───────────────────────────────────────
// Get a specific build by ID.
app.get("/api/build/:id", (req, res) => {
    const build = getBuildById(req.params.id);
    if (!build) {
        return res.status(404).json({ error: "Build not found" });
    }
    res.json(build);
});

// ── POST /api/feedback ───────────────────────────────────────
// Optional: user feedback on suggestions.
app.post("/api/feedback", (req, res) => {
    const { sessionId, componentId, rating, comment } = req.body;
    console.log(`📝 Feedback received: component=${componentId}, rating=${rating}`);
    // In-memory – just acknowledge for now
    res.json({ success: true, message: "Thank you for your feedback!" });
});

// ── Start server ─────────────────────────────────────────────
const PORT = process.env.PORT || 3000;

async function startServer() {
    try {
        // Try MongoDB connection (optional)
        await connectDB();

        // Load seed data into in-memory store
        loadSeedData(getStore());

        app.listen(PORT, () => {
            console.log(`\n[OK] PC Build Server running on port ${PORT}`);
            console.log(`   Environment: ${process.env.NODE_ENV || "development"}`);
            console.log(`   Health check: http://localhost:${PORT}/api/health`);
            console.log(`   Recent questions: http://localhost:${PORT}/api/recent-questions`);
            console.log(`   Components: http://localhost:${PORT}/api/components`);
            console.log(`   Chat (SSE): POST http://localhost:${PORT}/api/chat`);
            console.log(`   CORS enabled for localhost:5173 and localhost:3000\n`);
        });
    } catch (error) {
        console.error("[ERROR] Failed to start server:", error.message);
        process.exit(1);
    }
}

startServer();