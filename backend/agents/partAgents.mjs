/**
 * Agents 2–10 – Part-Specific Agents
 * Factory function creates 9 part-specific agents (CPU, Motherboard, RAM, etc.).
 * Each agent returns 2 JSON suggestions with price and compatibility notes.
 */
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { StringOutputParser } from "@langchain/core/output_parsers";
import { llm } from "../llm.mjs";
import { getComponentsByType } from "../store.mjs";

const PART_TYPES = [
    "cpu", "motherboard", "ram", "storage", "gpu", "psu", "cpu-cooler", "case", "case-fan"
];

const partPromptTemplate = ChatPromptTemplate.fromMessages([
    ["system", `You are a PC component expert specializing in {partType}.
Your job is to suggest exactly 2 compatible {partType} options based on the user's requirements.

Context:
- Fixed parts already in the build: {fixedParts}
- Budget remaining: {budget}
- Parts already suggested by other agents: {suggestedParts}
- Available components in our database: {availableComponents}

Rules:
1. Suggest parts that are COMPATIBLE with the fixed parts (matching socket, chipset, RAM type, etc.)
2. Stay within the budget if specified
3. Prefer components from our database when possible
4. Include a compatibility note explaining WHY each part works
5. Output MUST be valid JSON only - no extra text, no markdown

Output format (JSON array with exactly 2 items):
[
  {{
    "name": "Full component name",
    "brand": "Brand name",
    "model": "Model identifier",
    "price": 12999,
    "specs": {{ "key": "value" }},
    "compatibilityNote": "Why this works with the build",
    "componentId": "id from database if matched, otherwise null"
  }},
  {{
    "name": "Second option name",
    "brand": "Brand name",
    "model": "Model identifier",
    "price": 9999,
    "specs": {{ "key": "value" }},
    "compatibilityNote": "Why this is a good alternative",
    "componentId": "id from database if matched, otherwise null"
  }}
]`],
    ["user", "{input}"]
]);

const partChain = partPromptTemplate.pipe(llm).pipe(new StringOutputParser());

/**
 * Create a part-specific agent for the given type.
 */
function createPartAgent(partType) {
    return async function suggestParts(context) {
        // Fetch available parts of this type from the store
        const available = getComponentsByType(partType);
        const availableStr = available.length > 0
            ? JSON.stringify(available.map(c => ({
                id: c.id,
                name: c.name,
                brand: c.brand,
                price: c.price,
                specs: c.specs
            })))
            : "None in database – use your knowledge";

        try {
            const result = await partChain.invoke({
                partType,
                fixedParts: JSON.stringify(context.fixedParts || {}),
                budget: context.budget ? `₹${context.budget}` : "Not specified",
                suggestedParts: JSON.stringify(context.suggestedParts || {}),
                availableComponents: availableStr,
                input: context.userMessage || `Suggest 2 ${partType} options`
            });

            // Parse JSON from the response
            const jsonMatch = result.match(/\[[\s\S]*\]/);
            if (jsonMatch) {
                const parsed = JSON.parse(jsonMatch[0]);
                return { type: partType, suggestions: parsed, error: null };
            }

            return { type: partType, suggestions: [], error: "Could not parse suggestions" };
        } catch (error) {
            console.error(`Part agent (${partType}) error:`, error.message);
            return { type: partType, suggestions: [], error: error.message };
        }
    };
}

// Create all 9 part agents
export const partAgents = {};
for (const type of PART_TYPES) {
    partAgents[type] = createPartAgent(type);
}

/**
 * Run multiple part agents in parallel.
 * @param {string[]} types - Array of part types to query
 * @param {object} context - Context object with fixedParts, budget, etc.
 */
export async function runPartAgents(types, context) {
    const results = await Promise.allSettled(
        types.map(type => partAgents[type](context))
    );

    const output = {};
    results.forEach((result, idx) => {
        if (result.status === "fulfilled") {
            output[types[idx]] = result.value;
        } else {
            output[types[idx]] = {
                type: types[idx],
                suggestions: [],
                error: result.reason?.message || "Agent failed"
            };
        }
    });

    return output;
}

export { PART_TYPES };
