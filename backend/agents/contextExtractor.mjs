/**
 * Context Extraction Agent
 * Extracts fixed parts, budget, and requirements from user messages.
 */
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { StringOutputParser } from "@langchain/core/output_parsers";
import { classifierLlm } from "../llm.mjs";

const extractionPrompt = ChatPromptTemplate.fromMessages([
    ["system", `Extract structured information from the user's PC building query. Return ONLY valid JSON.

Extract:
- fixedParts: components the user already has or specifically wants (e.g., "i5-13500HX" → {{ "cpu": "i5-13500HX" }})
- budget: total budget in INR as a number (null if not specified)
- requirements: any specific requirements like "for gaming", "1440p", etc.
- neededTypes: which component types they need help with. If they have a CPU, they probably need motherboard, ram, gpu, storage, psu, cpu-cooler, case, case-fan suggestions.

Output format:
{{
  "fixedParts": {{ "type": "specific name" }},
  "budget": 30000,
  "requirements": ["gaming", "1440p"],
  "neededTypes": ["gpu", "motherboard", "ram", "storage", "psu", "cpu-cooler", "case", "case-fan"]
}}

If budget is mentioned with ₹ or "rupees" or "rs" or "k" (meaning thousands), convert to number.
Examples: "30k" → 30000, "₹1,00,000" → 100000, "50000 rupees" → 50000`],
    ["user", "{input}"]
]);

const extractionChain = extractionPrompt.pipe(classifierLlm).pipe(new StringOutputParser());

export async function extractContext(userMessage) {
    try {
        const result = await extractionChain.invoke({ input: userMessage });

        const jsonMatch = result.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
            return JSON.parse(jsonMatch[0]);
        }

        // Fallback: return empty context
        return {
            fixedParts: {},
            budget: null,
            requirements: [],
            neededTypes: ["cpu", "motherboard", "ram", "storage", "gpu", "psu", "cpu-cooler", "case", "case-fan"]
        };
    } catch (error) {
        console.error("Context extraction error:", error.message);
        return {
            fixedParts: {},
            budget: null,
            requirements: [],
            neededTypes: ["cpu", "motherboard", "ram", "storage", "gpu", "psu", "cpu-cooler", "case", "case-fan"]
        };
    }
}
