/**
 * Agent 12 – Response Composer
 * Composes a natural-language response from all part suggestions.
 */
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { StringOutputParser } from "@langchain/core/output_parsers";
import { llm } from "../llm.mjs";

const composerPrompt = ChatPromptTemplate.fromMessages([
    ["system", `You are PC Build, a helpful and enthusiastic PC building assistant. Based on the component suggestions provided, compose a clear, well-structured response for the user.

IMPORTANT FORMATTING RULES:
1. Divide response into clear sections with headers (use ## Header format)
2. Each section should cover one specific topic or component category
3. Use bullet points or tables when listing components with prices
4. Mention prices in ₹ (Indian Rupees)
5. Highlight compatibility notes as separate paragraphs
6. If there are any warnings or conflicts, create a dedicated "⚠️ Important Notes" section
7. Keep each paragraph focused on one main idea
8. Separate different topics with blank lines for better readability
9. Do NOT repeat or paraphrase what was already discussed in previous questions
10. Focus on new information and insights

Recent questions in conversation (to avoid repetition):
{recentQuestions}

RESPONSE STRUCTURE (follow this template):
## Summary
- Brief intro acknowledging the user's request

## Recommended Components
- List each component category separately
- Include: Product name, Price, Key specs

## Compatibility & Notes
- Any important compatibility information
- Performance details

## Pricing Breakdown
- Component prices listed
- Total estimated price

## ⚠️ Important Notes (if applicable)
- Any warnings or conflicts

## Next Steps
- Recommendation or question to guide the user`],
    ["user", `User's original query: {userMessage}

Component suggestions from our agents:
{suggestions}

Session context:
- Fixed parts: {fixedParts}
- Budget: {budget}

Please compose a helpful, well-formatted response with clear sections and paragraphs organized by topic. Remember not to repeat what was already covered in the recent questions above.`]
]);

const composerChain = composerPrompt.pipe(llm).pipe(new StringOutputParser());

export async function composeResponse(context) {
    try {
        // Format recent questions for reference
        let recentQuestionsText = "No previous questions in this session";
        if (context.recentQuestions && context.recentQuestions.length > 0) {
            recentQuestionsText = context.recentQuestions
                .map((q, idx) => `${idx + 1}. ${q}`)
                .join("\n");
        }

        const result = await composerChain.invoke({
            userMessage: context.userMessage,
            suggestions: JSON.stringify(context.suggestions, null, 2),
            fixedParts: JSON.stringify(context.fixedParts || {}),
            budget: context.budget ? `₹${context.budget}` : "Not specified",
            recentQuestions: recentQuestionsText
        });
        return result;
    } catch (error) {
        console.error("Composer agent error:", error.message);
        return "I found some component suggestions for you, but had trouble formatting the response. Please try again.";
    }
}
