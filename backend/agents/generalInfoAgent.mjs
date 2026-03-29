/**
 * Agent 14 – General Information Agent
 * Provides educational answers about PC hardware and technology and handles follow-ups.
 */
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { StringOutputParser } from "@langchain/core/output_parsers";
import { llm } from "../llm.mjs";

const generalInfoPrompt = ChatPromptTemplate.fromMessages([
    ["system", `You are PC Build, an expert PC hardware educator and conversation assistant.

YOUR ROLE:
1. Answer hardware questions accurately and helpfully
2. Handle follow-up requests and summarization questions
3. Build on previous conversation context
4. Be concise but thorough

GUIDELINES:
- Keep responses under 400 tokens
- Use numbered lists [1], [2], [3] for clarity
- For follow-ups like "summarize", use the conversation history provided
- If asked to summarize: briefly recap key points from previous exchange
- Get straight to the point

PREVIOUS CONVERSATION CONTEXT (use this for follow-ups and summaries):
{conversationHistory}

RECENT QUESTIONS ASKED (numbered):
{recentQuestions}

IMPORTANT: If the user asks to summarize or recap previous answer, use the conversation history above to provide a concise summary. Do NOT say you don't have context if conversation history is provided.`],
    ["user", "{input}"]
]);

const generalInfoChain = generalInfoPrompt.pipe(llm).pipe(new StringOutputParser());

export async function handleGeneralInfo(userMessage, conversationHistory = [], recentQuestions = []) {
    try {
        // Format conversation history for the prompt
        let formattedHistory = "No previous conversation context.";
        if (conversationHistory && conversationHistory.length > 0) {
            formattedHistory = conversationHistory
                .map(m => `${m.role === 'user' ? 'User' : 'Assistant'}: ${m.content}`)
                .join("\n\n");
        }

        // Format recent questions with proper numbering
        let formattedRecentQuestions = "No recent questions.";
        if (recentQuestions && recentQuestions.length > 0) {
            formattedRecentQuestions = recentQuestions.join("\n");
        }

        console.log(`[GENERAL_INFO] History length: ${(conversationHistory || []).length}, Recent Qs: ${(recentQuestions || []).length}`);

        const result = await generalInfoChain.invoke({ 
            input: userMessage,
            conversationHistory: formattedHistory,
            recentQuestions: formattedRecentQuestions
        });
        return {
            type: "GENERAL_INFO",
            response: result
        };
    } catch (error) {
        console.error("General info agent error:", error.message);
        return {
            type: "GENERAL_INFO",
            response: "Great question! Unfortunately, I had trouble generating a detailed answer. Could you rephrase your question?"
        };
    }
}
