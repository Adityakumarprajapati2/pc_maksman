// src/services/chatApi.js
const API_BASE = "http://localhost:3000/api";

export async function sendChatMessage(message, sessionId = "default") {
  try {
    // Set 30-second timeout for the fetch request
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 30000);

    const response = await fetch(`${API_BASE}/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message, sessionId }),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    if (!response.body) {
      throw new Error("No response body");
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let buffer = "";

    return {
      async *[Symbol.asyncIterator]() {
        const iterationTimeout = setTimeout(() => {
          reader.cancel("Response streaming timeout");
        }, 30000);

        try {
          while (true) {
            const { done, value } = await reader.read();
            if (done) break;

            buffer += decoder.decode(value, { stream: true });
            const lines = buffer.split("\n");
            buffer = lines.pop() || "";

            for (const line of lines) {
              if (line.startsWith("data: ")) {
                const data = line.slice(6);
                if (data === "[DONE]") {
                  clearTimeout(iterationTimeout);
                  return;
                }
                try {
                  const parsed = JSON.parse(data);
                  yield parsed;
                } catch (e) {
                  console.error("Failed to parse SSE data:", e);
                }
              }
            }
          }
        } finally {
          clearTimeout(iterationTimeout);
          reader.releaseLock();
        }
      },
    };
  } catch (error) {
    if (error.name === "AbortError") {
      console.error("Chat request timeout: AI took too long to respond (>30 seconds)");
      throw new Error("[TIMEOUT] Request is taking too long (>30s). Please try again or simplify your question.");
    }
    if (error instanceof TypeError && error.message.includes("Failed to fetch")) {
      console.error("Chat API connection error:", error);
      throw new Error("[CONNECTION ERROR] Cannot reach backend server at http://localhost:3000. Make sure the server is running with: npm start");
    }
    console.error("Chat API error:", error);
    throw new Error(`[ERROR] ${error.message || "Chat request failed"}`);
  }
}

export async function getComponents(filters = {}) {
  try {
    const params = new URLSearchParams();
    if (filters.type) params.append("type", filters.type);
    if (filters.brand) params.append("brand", filters.brand);
    if (filters.minPrice) params.append("minPrice", filters.minPrice);
    if (filters.maxPrice) params.append("maxPrice", filters.maxPrice);
    if (filters.search) params.append("search", filters.search);

    const response = await fetch(`${API_BASE}/components?${params.toString()}`);
    if (!response.ok) throw new Error("Failed to fetch components");
    return await response.json();
  } catch (error) {
    console.error("Get components error:", error);
    throw error;
  }
}

export async function checkHealth() {
  try {
    const response = await fetch(`${API_BASE}/health`);
    if (!response.ok) throw new Error("Health check failed");
    return await response.json();
  } catch (error) {
    console.error("Health check error:", error);
    throw error;
  }
}
