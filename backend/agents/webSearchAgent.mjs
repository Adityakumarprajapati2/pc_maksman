/**
 * Agent 11 – Web Search Agent (optional)
 * Uses Tavily API for real-time price and availability data.
 * Gracefully degrades if no API key is set.
 */
import { config } from "dotenv";
config();

const TAVILY_API_KEY = process.env.TAVILY_API_KEY;

/**
 * Search the web for PC component pricing/availability info.
 * Falls back to null if Tavily is not configured.
 */
export async function webSearch(query) {
    if (!TAVILY_API_KEY) {
        console.log("[WARNING] Web search skipped – no TAVILY_API_KEY set");
        return {
            available: false,
            results: [],
            message: "Web search not configured. Using database and LLM knowledge instead."
        };
    }

    try {
        const response = await fetch("https://api.tavily.com/search", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                api_key: TAVILY_API_KEY,
                query: `${query} price in India INR buy`,
                search_depth: "basic",
                max_results: 3
            })
        });

        if (!response.ok) {
            throw new Error(`Tavily API returned ${response.status}`);
        }

        const data = await response.json();
        return {
            available: true,
            results: (data.results || []).map(r => ({
                title: r.title,
                url: r.url,
                snippet: r.content?.substring(0, 200)
            }))
        };
    } catch (error) {
        console.error("Web search error:", error.message);
        return {
            available: false,
            results: [],
            message: `Web search failed: ${error.message}`
        };
    }
}
