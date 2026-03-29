/**
 * PC Builder AI Orchestrator
 * Replaces the old coding-bot chain with a 14-agent PC building workflow.
 * 
 * Flow:
 * 1. Agent 1 classifies intent
 * 2. Routes to appropriate handler:
 *    - OFF_TOPIC → Agent 13
 *    - GENERAL_INFO → Agent 14
 *    - SPECIFIC_PARTS → Extract context → Run part agents in parallel → Compose response
 *    - USE_CASE_BUILDS → Generate 3 builds
 */
import { config } from "dotenv";
config();

import { classifyIntent } from "./agents/classifierAgent.mjs";
import { extractContext } from "./agents/contextExtractor.mjs";
import { runPartAgents, PART_TYPES } from "./agents/partAgents.mjs";
import { composeResponse } from "./agents/composerAgent.mjs";
import { handleOffTopic } from "./agents/safetyAgent.mjs";
import { handleGeneralInfo } from "./agents/generalInfoAgent.mjs";
import { generateUseCaseBuilds } from "./agents/useCaseBuildAgent.mjs";
import { webSearch } from "./agents/webSearchAgent.mjs";
import { addMessageToSession, updateSessionContext } from "./store.mjs";

/**
 * Main chat handler – the single entry point for all user messages.
 * @param {string} message - The user's message
 * @param {string} sessionId - Session identifier
 * @returns {object} - { type, response, components?, builds?, suggestions? }
 */
export async function handleChat(message, sessionId = "default") {
    console.log(`\n[PROCESSING] "${message.substring(0, 60)}..." [Session: ${sessionId}]`);

    // Save user message to session
    addMessageToSession(sessionId, "user", message);

    try {
        // ── Step 1: Classify intent ──────────────────────────────
        console.log("  → Agent 1: Classifying intent...");
        const intent = await classifyIntent(message);
        console.log(`  ✓ Intent: ${intent}`);

        let result;

        switch (intent) {
            case "OFF_TOPIC":
                // ── Agent 13: Off-topic handler ──────────────────
                console.log("  → Agent 13: Off-topic response");
                result = await handleOffTopic(message);
                break;

            case "GENERAL_INFO":
                // ── Agent 14: General information ────────────────
                console.log("  → Agent 14: General info response");
                result = await handleGeneralInfo(message);
                break;

            case "USE_CASE_BUILDS":
                // ── Use-Case Build flow ──────────────────────────
                console.log("  → Use-Case Build Agent: Generating 3 builds...");
                result = await generateUseCaseBuilds(message);

                // Compose a friendly response around the builds
                if (result.builds && result.builds.length > 0) {
                    console.log("  → Agent 12: Composing build response...");
                    const composedResponse = await composeResponse({
                        userMessage: message,
                        suggestions: result.builds,
                        fixedParts: {},
                        budget: null
                    });
                    result.response = composedResponse;
                } else {
                    result.response = "I tried to generate build options for you, but ran into an issue. Could you describe your use case in more detail? For example: 'gaming PC under ₹80,000' or 'video editing workstation'.";
                }
                break;

            case "SPECIFIC_PARTS":
            default:
                // ── Specific Parts flow ──────────────────────────
                result = await handleSpecificParts(message, sessionId);
                break;
        }

        // Save assistant response to session
        addMessageToSession(sessionId, "assistant", result.response || JSON.stringify(result));

        return result;

    } catch (error) {
        console.error("[ERROR] Orchestrator error:", error);
        const errorResult = {
            type: "ERROR",
            response: "Sorry, I encountered an error while processing your request. Please try again."
        };
        addMessageToSession(sessionId, "assistant", errorResult.response);
        return errorResult;
    }
}


async function handleSpecificParts(message, sessionId) {
    // ── Extract context ──────────────────────────────────────
    console.log("  → Context Extractor: Parsing requirements...");
    const context = await extractContext(message);
    console.log(`  ✓ Found ${Object.keys(context.fixedParts || {}).length} fixed parts, budget: ${context.budget || "unset"}`);

    // Update session context
    updateSessionContext(sessionId, {
        fixedParts: context.fixedParts,
        budget: context.budget
    });

    // ── Determine which agents to run ────────────────────────
    const fixedTypes = Object.keys(context.fixedParts || {});
    let neededTypes = context.neededTypes || PART_TYPES;

    // If user asked about a specific type, narrow it down
    if (neededTypes.length === 0) {
        neededTypes = PART_TYPES.filter(t => !fixedTypes.includes(t));
    }

    // For efficiency, run core agents first (CPU, Mobo, GPU) then dependents
    const coreTypes = neededTypes.filter(t => ["cpu", "motherboard", "gpu"].includes(t));
    const dependentTypes = neededTypes.filter(t => !["cpu", "motherboard", "gpu"].includes(t));

    // ── Run core part agents in parallel ─────────────────────
    console.log(`  → Part Agents: Running ${coreTypes.length} core + ${dependentTypes.length} dependent agents...`);

    const agentContext = {
        fixedParts: context.fixedParts || {},
        budget: context.budget,
        suggestedParts: {},
        userMessage: message
    };

    let allSuggestions = {};

    if (coreTypes.length > 0) {
        const coreResults = await runPartAgents(coreTypes, agentContext);
        Object.assign(allSuggestions, coreResults);

        // Merge core results into context for dependent agents
        for (const [type, result] of Object.entries(coreResults)) {
            if (result.suggestions && result.suggestions.length > 0) {
                agentContext.suggestedParts[type] = result.suggestions[0]; // first suggestion
            }
        }
    }

    // ── Run dependent agents in parallel ─────────────────────
    if (dependentTypes.length > 0) {
        const depResults = await runPartAgents(dependentTypes, agentContext);
        Object.assign(allSuggestions, depResults);
    }

    console.log(`  ✓ Got suggestions for ${Object.keys(allSuggestions).length} component types`);

    // ── Agent 12: Compose final response ─────────────────────
    console.log("  → Agent 12: Composing response...");
    const composedResponse = await composeResponse({
        userMessage: message,
        suggestions: allSuggestions,
        fixedParts: context.fixedParts,
        budget: context.budget
    });

    return {
        type: "SPECIFIC_PARTS",
        response: composedResponse,
        suggestions: allSuggestions,
        context: {
            fixedParts: context.fixedParts,
            budget: context.budget,
            requirements: context.requirements
        }
    };
}