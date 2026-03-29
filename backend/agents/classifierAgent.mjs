/**
 * Agent 1 – Classifier & Router
 * Classifies user input into one of four categories.
 */
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { StringOutputParser } from "@langchain/core/output_parsers";
import { classifierLlm } from "../llm.mjs";

const classifierPrompt = ChatPromptTemplate.fromMessages([
    ["system", `FAST CLASSIFY - You are a PC build query classifier. Return ONLY the category name in 1 word.

CATEGORIES (numbered for speed):
1. SPECIFIC_PARTS: Hardware components, budget, compatibility, comparisons
   Keys: "GPU", "CPU", "RAM", "budget", "compare", "compatible", "suggest", "RTX", "Ryzen", "Intel"

2. USE_CASE_BUILDS: Complete PC builds for a purpose/workload
   Keys: "build for", "gaming PC", "workstation", "streaming", "editing", "college", "use case"

3. GENERAL_INFO: Hardware knowledge, terminology, concepts
   Keys: "what is", "difference", "explain", "meaning", "how does", "GHz", "TDP", "specs"

4. OFF_TOPIC: Nothing to do with PC/hardware
   Keys: weather, poem, president, homework, etc.

RECENT QUESTIONS (numbered):
{recentQuestions}

INSTANT DECISION RULES:
- If user asks a very similar question to [1], [2], or [3] above, return that number's category
- Any hardware component name or spec = SPECIFIC_PARTS
- Any use case description = USE_CASE_BUILDS
- Any "what/how/why" about hardware = GENERAL_INFO

Respond with ONLY: SPECIFIC_PARTS, USE_CASE_BUILDS, GENERAL_INFO, or OFF_TOPIC`],
    ["user", "{input}"]
]);

const classifierChain = classifierPrompt.pipe(classifierLlm).pipe(new StringOutputParser());

export async function classifyIntent(userMessage, conversationHistory = [], recentQuestions = []) {
    try {
        // Format recent questions with numbers for fast pattern matching
        let formattedRecentQuestions = "No recent questions";
        if (recentQuestions && recentQuestions.length > 0) {
            formattedRecentQuestions = recentQuestions.join("\n");
        }

        const result = await classifierChain.invoke({ 
            input: userMessage,
            recentQuestions: formattedRecentQuestions
        });
        const cleaned = result.trim().toUpperCase();

        // Ensure we return a valid category
        const validCategories = ["SPECIFIC_PARTS", "USE_CASE_BUILDS", "GENERAL_INFO", "OFF_TOPIC"];
        if (validCategories.includes(cleaned)) {
            return cleaned;
        }

        // Fuzzy match
        for (const cat of validCategories) {
            if (cleaned.includes(cat)) return cat;
        }

        // Default to GENERAL_INFO if we can't classify
        console.warn(`Classifier returned unexpected value: "${result}". Defaulting to GENERAL_INFO.`);
        return "GENERAL_INFO";
    } catch (error) {
        console.error("Classifier agent error:", error.message);
        return "GENERAL_INFO";
    }
}
