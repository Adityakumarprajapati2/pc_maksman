/**
 * Agent 12 – Response Composer
 * Composes a natural-language response from all part suggestions.
 */
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { StringOutputParser } from "@langchain/core/output_parsers";
import { llm } from "../llm.mjs";

const composerPrompt = ChatPromptTemplate.fromMessages([
    ["system", `You are PC Build, a helpful and enthusiastic PC building assistant. Based on the component suggestions provided, compose a clear, concise response for the user.

Rules:
1. Summarize the suggestions in a friendly, conversational tone
2. Use bullet points or tables when listing components
3. Mention prices in ₹ (Indian Rupees)
4. Highlight compatibility notes briefly
5. If there are any warnings or conflicts, mention them clearly
6. Keep your response under 800 tokens
7. End with a helpful suggestion or question to guide the user
8. Do NOT repeat or paraphrase what was already discussed in previous questions
9. Focus on new information and insights

Recent questions in conversation (to avoid repetition):
{recentQuestions}

Response structure:
- Brief intro acknowledging the user's request
- Component suggestions with prices
- Compatibility summary
- Total estimated price if applicable
- Next step suggestion`],
    ["user", `User's original query: {userMessage}

Component suggestions from our agents:
{suggestions}

Session context:
- Fixed parts: {fixedParts}
- Budget: {budget}

Please compose a helpful, well-formatted response. Remember not to repeat what was already covered in the recent questions above.`]
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
