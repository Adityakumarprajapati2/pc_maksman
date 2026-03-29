/**
 * Use-Case Build Agent
 * Generates 3 complete builds (Budget, Balanced, High-End) for a given use case.
 */
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { StringOutputParser } from "@langchain/core/output_parsers";
import { llm } from "../llm.mjs";
import { getAllComponents } from "../store.mjs";

const useCasePrompt = ChatPromptTemplate.fromMessages([
    ["system", `You are PC Build, a PC build specialist. The user wants a complete PC for a specific use case. Generate exactly 3 complete builds.

Available components in our database:
{availableComponents}

Rules:
1. Create 3 builds: Budget Friendly, Balanced Performance, High-End Power
2. Each build MUST include: CPU, Motherboard, RAM, Storage, GPU (if applicable), PSU, CPU Cooler, Case
3. Ensure ALL components within each build are compatible (socket match, RAM type match, PSU sufficient)
4. Use prices in ₹ (INR)
5. Prefer components from our database when possible
6. Output MUST be valid JSON only – no markdown, no extra text

Output format:
{{
  "useCase": "description of use case",
  "builds": [
    {{
      "profile": "Budget Friendly",
      "description": "Best value for the use case",
      "totalPrice": 45000,
      "components": [
        {{ "type": "cpu", "name": "...", "price": 12999, "specs": "brief specs", "componentId": "id or null" }},
        {{ "type": "motherboard", "name": "...", "price": 8999, "specs": "...", "componentId": "..." }},
        {{ "type": "ram", "name": "...", "price": 3299, "specs": "...", "componentId": "..." }},
        {{ "type": "storage", "name": "...", "price": 4999, "specs": "...", "componentId": "..." }},
        {{ "type": "gpu", "name": "...", "price": 12999, "specs": "...", "componentId": "..." }},
        {{ "type": "psu", "name": "...", "price": 3999, "specs": "...", "componentId": "..." }},
        {{ "type": "cpu-cooler", "name": "...", "price": 2199, "specs": "...", "componentId": "..." }},
        {{ "type": "case", "name": "...", "price": 4999, "specs": "...", "componentId": "..." }}
      ]
    }},
    {{
      "profile": "Balanced Performance",
      "description": "Great performance-to-price ratio",
      "totalPrice": 75000,
      "components": [...]
    }},
    {{
      "profile": "High-End Power",
      "description": "Maximum performance, no compromises",
      "totalPrice": 150000,
      "components": [...]
    }}
  ]
}}`],
    ["user", "{input}"]
]);

const useCaseChain = useCasePrompt.pipe(llm).pipe(new StringOutputParser());

export async function generateUseCaseBuilds(userMessage) {
    // Gather all available components for the LLM's reference
    const allComponents = getAllComponents();
    const componentSummary = allComponents.map(c => ({
        id: c.id,
        type: c.type,
        name: c.name,
        price: c.price,
        specs: c.specs
    }));

    try {
        const result = await useCaseChain.invoke({
            availableComponents: JSON.stringify(componentSummary),
            input: userMessage
        });

        // Extract JSON from the response
        const jsonMatch = result.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
            const parsed = JSON.parse(jsonMatch[0]);
            return {
                type: "USE_CASE_BUILDS",
                builds: parsed.builds || [],
                useCase: parsed.useCase || userMessage,
                error: null
            };
        }

        return {
            type: "USE_CASE_BUILDS",
            builds: [],
            useCase: userMessage,
            error: "Could not parse build suggestions"
        };
    } catch (error) {
        console.error("Use case build agent error:", error.message);
        return {
            type: "USE_CASE_BUILDS",
            builds: [],
            useCase: userMessage,
            error: error.message
        };
    }
}
