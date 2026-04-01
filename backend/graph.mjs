import { StateGraph, END } from "@langchain/langgraph";
import { classifyIntent } from "./agents/classifierAgent.mjs";
import { extractContext } from "./agents/contextExtractor.mjs";
import { runPartAgents, PART_TYPES } from "./agents/partAgents.mjs";
import { composeResponse } from "./agents/composerAgent.mjs";
import { handleOffTopic } from "./agents/safetyAgent.mjs";
import { handleGeneralInfo } from "./agents/generalInfoAgent.mjs";
import { generateUseCaseBuilds } from "./agents/useCaseBuildAgent.mjs";

// Agent metadata for UI display
const agentMetadata = {
    classifierNode: { agentName: "Agent 1", description: "Classifying intent...", type: "classifier" },
    extractorNode: { agentName: "Context Extractor", description: "Parsing requirements...", type: "extractor" },
    partAgentsNode: { agentName: "Part Agents", description: "Running component agents...", type: "parts" },
    composerNode: { agentName: "Agent 12 Composer", description: "Composing final response...", type: "composer" },
    safetyNode: { agentName: "Agent 13", description: "Off-topic response...", type: "safety" },
    generalInfoNode: { agentName: "Agent 14", description: "Generating general info...", type: "generalInfo" },
    useCaseNode: { agentName: "Use-Case Builder", description: "Generating 3 builds...", type: "useCaseBuilder" },
    composeUseCaseNode: { agentName: "Agent 12 Composer", description: "Composing build response...", type: "composer" }
};

const graphState = {
    // Current input message
    input: {
        value: (x, y) => y,
        default: () => ""
    },
    // Conversation history for context
    conversationHistory: {
        value: (x, y) => y,
        default: () => []
    },
    // Recent user questions (last 3)
    recentQuestions: {
        value: (x, y) => y,
        default: () => []
    },
    // The classification intent
    intent: {
        value: (x, y) => y,
        default: () => "SPECIFIC_PARTS"
    },
    // The fixed components requested by user
    fixedParts: {
        value: (x, y) => ({ ...x, ...y }),
        default: () => ({})
    },
    // Target budget
    budget: {
        value: (x, y) => y,
        default: () => null
    },
    // Explicit parts requested
    neededTypes: {
        value: (x, y) => y,
        default: () => []
    },
    // Compiled part suggestions
    suggestions: {
        value: (x, y) => ({ ...x, ...y }),
        default: () => ({})
    },
    // Compiled Use Case Builds
    builds: {
        value: (x, y) => y,
        default: () => null
    },
    // Whether a piece of info triggered a fallback
    missingData: {
        value: (x, y) => y,
        default: () => false
    },
    // Generated natural language response
    finalResponse: {
        value: (x, y) => y,
        default: () => ""
    }
};

const builder = new StateGraph({
    channels: graphState
});

// ── Node 1: Classifier ──
const classifierNode = async (state) => {
    const intent = await classifyIntent(state.input, state.conversationHistory || [], state.recentQuestions || []);
    return { 
        intent,
        conversationHistory: state.conversationHistory,
        recentQuestions: state.recentQuestions
    };
};

// ── Edge Routing Functions ──
const routeFromClassifier = (state) => {
    if (state.intent === "OFF_TOPIC") return "safetyNode";
    if (state.intent === "GENERAL_INFO") return "generalInfoNode";
    if (state.intent === "USE_CASE_BUILDS") return "useCaseNode";
    return "extractorNode"; // SPECIFIC_PARTS
};

// ── Node 13 & 14: Safety and General Info ──
const safetyNode = async (state) => {
    const res = await handleOffTopic(state.input);
    return { 
        finalResponse: res.response,
        conversationHistory: state.conversationHistory,
        recentQuestions: state.recentQuestions
    };
};

const generalInfoNode = async (state) => {
    const res = await handleGeneralInfo(state.input, state.conversationHistory || [], state.recentQuestions || []);
    return { 
        finalResponse: res.response,
        conversationHistory: state.conversationHistory,
        recentQuestions: state.recentQuestions
    };
};

// ── Node: Use Case ──
const useCaseNode = async (state) => {
    const res = await generateUseCaseBuilds(state.input);
    return {
        builds: res.builds || [],
        finalResponse: res.builds?.length > 0 ? null : "I tried to generate build options for you, but ran into an issue.",
        conversationHistory: state.conversationHistory,
        recentQuestions: state.recentQuestions
    };
};

const composeUseCaseNode = async (state) => {
    // Always try to compose a response, even if builds failed
    if (!state.builds || state.builds.length === 0) {
        // If no builds, return what we have or generate a fallback
        if (state.finalResponse) {
            return {
                conversationHistory: state.conversationHistory,
                recentQuestions: state.recentQuestions
            };
        }
        // No builds and no response - compose from scratch
    }
    
    const composed = await composeResponse({
        userMessage: state.input,
        suggestions: state.builds || [],
        fixedParts: {},
        budget: null,
        recentQuestions: state.recentQuestions || []
    });
    return { 
        finalResponse: composed,
        conversationHistory: state.conversationHistory,
        recentQuestions: state.recentQuestions
    };
};

// ── Specific Parts Flow ──
const extractorNode = async (state) => {
    const context = await extractContext(state.input);
    const fixedTypes = Object.keys(context.fixedParts || {});
    let needed = context.neededTypes || PART_TYPES;

    if (needed.length === 0) {
        needed = PART_TYPES.filter(t => !fixedTypes.includes(t));
    }

    return {
        fixedParts: context.fixedParts || {},
        budget: context.budget,
        neededTypes: needed,
        conversationHistory: state.conversationHistory,
        recentQuestions: state.recentQuestions
    };
};

// For LangGraph parallel nodes, a single unified node mapping over parts is sometimes cleaner,
// since we process multiple dynamic sub-nodes.
const partAgentsNode = async (state) => {
    const agentContext = {
        fixedParts: state.fixedParts || {},
        budget: state.budget,
        suggestedParts: {},
        userMessage: state.input
    };

    const coreTypes = state.neededTypes.filter(t => ["cpu", "motherboard", "gpu"].includes(t));
    const dependentTypes = state.neededTypes.filter(t => !["cpu", "motherboard", "gpu"].includes(t));

    let allSuggestions = {};

    if (coreTypes.length > 0) {
        const coreResults = await runPartAgents(coreTypes, agentContext);
        Object.assign(allSuggestions, coreResults);

        for (const [type, result] of Object.entries(coreResults)) {
            if (result.suggestions && result.suggestions.length > 0) {
                agentContext.suggestedParts[type] = result.suggestions[0];
            }
        }
    }

    if (dependentTypes.length > 0) {
        const depResults = await runPartAgents(dependentTypes, agentContext);
        Object.assign(allSuggestions, depResults);
    }

    return { 
        suggestions: allSuggestions,
        conversationHistory: state.conversationHistory,
        recentQuestions: state.recentQuestions
    };
};

const composerNode = async (state) => {
    const composedResponse = await composeResponse({
        userMessage: state.input,
        suggestions: state.suggestions,
        fixedParts: state.fixedParts,
        budget: state.budget,
        recentQuestions: state.recentQuestions || []
    });
    return { 
        finalResponse: composedResponse,
        conversationHistory: state.conversationHistory,
        recentQuestions: state.recentQuestions
    };
};

// ── Define Graph ──
builder.addNode("classifierNode", classifierNode);
builder.addNode("safetyNode", safetyNode);
builder.addNode("generalInfoNode", generalInfoNode);
builder.addNode("useCaseNode", useCaseNode);
builder.addNode("composeUseCaseNode", composeUseCaseNode);
builder.addNode("extractorNode", extractorNode);
builder.addNode("partAgentsNode", partAgentsNode);
builder.addNode("composerNode", composerNode);

// ── Edges ──
builder.setEntryPoint("classifierNode");
builder.addConditionalEdges("classifierNode", routeFromClassifier);

// Linear endpoints
builder.addEdge("safetyNode", END);
builder.addEdge("generalInfoNode", END);

// Use Case flow
builder.addEdge("useCaseNode", "composeUseCaseNode");
builder.addEdge("composeUseCaseNode", END);

// Specific Parts flow
builder.addEdge("extractorNode", "partAgentsNode");
builder.addEdge("partAgentsNode", "composerNode");
builder.addEdge("composerNode", END);

export const buildGraph = builder.compile();
export { agentMetadata };
