// src/pages/Chat.jsx
import React, { useState, useRef, useEffect } from "react";
import { sendChatMessage, checkHealth } from "../services/chatApi";
import { useAppContext } from "../context/AppContext";
import ReactMarkdown from "react-markdown";

function MessageBubble({ message, isUser, status, steps }) {
  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"} mb-4`}>
      <div
        className={`max-w-2xl px-4 py-3 rounded-lg ${
          isUser
            ? "bg-primary text-white rounded-br-none"
            : "glass-card text-white rounded-bl-none"
        }`}
      >
        {isUser ? (
          <p className="text-sm leading-relaxed">{message}</p>
        ) : (
          <ReactMarkdown 
            className="text-sm leading-relaxed markdown-content"
            components={{
              h2: ({node, ...props}) => <h2 className="text-lg font-bold mt-4 mb-2 text-primary-glow" {...props} />,
              h3: ({node, ...props}) => <h3 className="text-base font-semibold mt-3 mb-1 text-slate-200" {...props} />,
              p: ({node, ...props}) => <p className="mb-3 leading-relaxed" {...props} />,
              ul: ({node, ...props}) => <ul className="list-disc list-inside mb-2 space-y-1" {...props} />,
              ol: ({node, ...props}) => <ol className="list-decimal list-inside mb-2 space-y-1" {...props} />,
              li: ({node, ...props}) => <li className="text-sm" {...props} />,
              strong: ({node, ...props}) => <strong className="font-semibold text-primary-glow" {...props} />,
              code: ({node, ...props}) => <code className="bg-slate-700 px-1 py-0.5 rounded text-xs" {...props} />,
            }}
          >
            {message}
          </ReactMarkdown>
        )}
        {!isUser && steps && steps.length > 0 && (
          <div className="mt-3 text-xs text-slate-300 border-t border-white/10 pt-2">
            <div className="font-semibold mb-2 text-slate-200">Agent Flow:</div>
            <div className="space-y-1">
              {steps.map((step, idx) => (
                <div key={idx} className="flex items-start gap-2 text-slate-300">
                  <span className="material-symbols-outlined text-sm flex-shrink-0 mt-0.5">chevron_right</span>
                  <div className="flex-1">
                    <div className="font-medium text-white">{step.agent}</div>
                    <div className="text-xs text-slate-400">{step.description}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        {!isUser && status && (
          <div className="mt-2 text-xs text-primary font-semibold">{status}</div>
        )}
      </div>
    </div>
  );
}

export default function Chat() {
  const { setLastResponse, setSuggestedParts } = useAppContext();
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello! I'm your PC Marksman AI Assistant. Ask me anything about building a PC, comparing components, or optimizing your setup.",
      isUser: false,
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [serverHealth, setServerHealth] = useState("checking");
  const [currentSteps, setCurrentSteps] = useState([]);
  const [sessionId] = useState(() => {
    // Generate or retrieve session ID for conversation memory
    const stored = sessionStorage.getItem("pcbuilder_session_id");
    if (stored) return stored;
    const newId = `session_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
    sessionStorage.setItem("pcbuilder_session_id", newId);
    return newId;
  });
  const messagesEndRef = useRef(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    checkServerHealth();
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const checkServerHealth = async () => {
    try {
      const health = await checkHealth();
      setServerHealth("online");
      console.log("[OK] Server health:", health);
    } catch (error) {
      setServerHealth("offline");
      console.error("[ERROR] Server offline:", error.message);
    }
  };

  // Extract part names from AI response and match with component library
  const extractSuggestedParts = (aiResponse) => {
    // List of all known components that can be suggested
    const allComponents = [
      // GPUs
      "RTX 4090", "RTX 4080", "RTX 4070 Ti", "RTX 4070", "RTX 4060 Ti", "RTX 4060", "RTX 3090 Ti", "RTX 2080 Ti", "RTX 6000 Ada", "RTX 4080 Super", "RTX 4070 Super",
      "RX 7900 XTX", "RX 7900 XT", "RX 7800 XT", "RX 7700 XT", "RX 6900 XT", "RX 7600",
      "Arc A770", "Arc A750",
      // CPUs
      "Core i9-14900KS", "Core i9-14900K", "Core i9-13900K", "Core i7-14700K", "Core i5-14600K", "Core i5-13600K", "Core i9-12900K", "Core Ultra 9 285K",
      "Ryzen 9 7950X3D", "Ryzen 9 7950X", "Ryzen 9 7900X3D", "Ryzen 9 7900X", "Ryzen 7 7700X", "Ryzen 5 7600X", "Ryzen 7 5800X3D", "Ryzen 5 5600X", "Ryzen 7 5700X3D", "Ryzen 7 9700X",
      "Threadripper 5995WX", "Xeon W9-3495X",
      // RAM
      "Kingston Fury Beast Pro", "Corsair Dominator Platinum", "G.Skill Trident Z5", "Crucial Pro", "Kingston FURY Beast", "HyperX Predator", "ADATA XPG Lian",
      // SSDs
      "Samsung 990 Pro", "WD Black SN850X", "WD Black SN840", "Crucial P5 Plus", "Crucial P5", "SK Hynix Platinum", "Kingston KC3000", "Sabrent Rocket 4", "Corsair MP600", "Gigabyte AORUS", "Samsung 980 Pro", "Samsung 870 QVO", "Intel 670p", "Seagate FireCuda 530", "ADATA Gammix",
      // PSUs
      "Seasonic Prime Platinum", "Corsair RM850x", "EVGA SuperNOVA 1600T2", "Thermaltake Toughpower GF1", "Seasonic Focus GX", "MSI MAG A850GL", "Corsair AX1200", "NZXT C850", "Gigabyte P850GM", "Superflower Leadex Platinum",
      // Cooling
      "NZXT Kraken Z93", "Corsair iCUE H150i Elite", "Noctua NH-D15", "be quiet! Dark Rock Pro 4", "Lian Li Galahad 240", "Arctic Liquid Freezer", "Corsair ML120 Pro", "EK AIO 360", "Thermalright Peerless Assassin",
      // Motherboards
      "ROG Strix X870-E", "MPG B850 Edge", "Z790 Master", "ProArt X870-E", "MPG Z890 Master", "TUF Gaming X870-E", "B850 Elite", "MPG Z890 Carbon", "ROG STRIX B850", "X870E Elite", "X870E Taichi", "N7 B550",
      // Monitors
      "UltraSharp U2723DE", "ROG Swift PG279QM", "LG UltraWide 34", "MOBIUZ EW2880U", "MAG 321CURV", "LG 27UP550", "PA278CV", "S2722DGM", "ProArt PA348C", "LG 32UP550",
      // Cases
      "Corsair 5000T", "NZXT H7 Flow", "Lian Li Lancool 216", "Fractal Design Torrent", "HAF 700 EVO", "BeQuiet Dark Base 901", "Silverstone Primera PM01", "Phanteks Evolv X", "ThermalTake Core P5", "Jonsbo U4 Plus",
      // Mice
      "DeathAdder V3", "Rival 650", "G Pro X", "ROG Chakram", "M65 Elite", "Finalmouse Starlight Pro", "ZOWIE EC2", "Glorious Model O",
      // Keyboards
      "K95 Platinum XT", "K100 RGB", "BlackWidow V4", "Apex Pro", "Ducky One 3", "ROG Strix Scope", "Keychron K8 Pro", "Drop CTRL", "Leopold FC900R",
      // Headsets
      "Cloud II", "Arctis Pro", "VOID Elite", "ROG Delta", "Arctis 7", "BlackShark V2", "SCUF H6", "Beyerdynamic GAME ONE"
    ];

    const suggestedParts = [];
    
    // Search for component names in the AI response
    allComponents.forEach((component) => {
      if (aiResponse.toLowerCase().includes(component.toLowerCase())) {
        // Avoid duplicates
        if (!suggestedParts.find(p => p.toLowerCase() === component.toLowerCase())) {
          suggestedParts.push(component);
        }
      }
    });

    return suggestedParts;
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    if (serverHealth !== "online") {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now(),
          text: "[WARNING] Server is offline. Please start the backend server on http://localhost:3000",
          isUser: false,
          isError: true,
        },
      ]);
      return;
    }

    const userMessage = input.trim();
    setInput("");
    setMessages((prev) => [
      ...prev,
      {
        id: Date.now(),
        text: userMessage,
        isUser: true,
      },
    ]);

    // Save search to history
    const searchHistory = JSON.parse(localStorage.getItem("searchHistory") || "[]");
    searchHistory.push({ query: userMessage, timestamp: new Date().toISOString() });
    localStorage.setItem("searchHistory", JSON.stringify(searchHistory));

    setLoading(true);
    setCurrentSteps([]);
    let aiResponse = "";
    let steps = [];
    let timeoutTimer = null;

    try {
      // Set a 30-second timeout for the entire operation
      timeoutTimer = setTimeout(() => {
        setLoading(false);
        setMessages((prev) => [
          ...prev,
          {
            id: Date.now(),
            text: "[TIMEOUT] Request took too long (>30 seconds). Please try a simpler question or try again.",
            isUser: false,
            isError: true,
          },
        ]);
      }, 30000);

      const stream = await sendChatMessage(userMessage, sessionId);

      for await (const chunk of stream) {
        if (chunk.step && chunk.step !== "FINISH") {
          // Capture full agent metadata
          const stepInfo = {
            step: chunk.step,
            agent: chunk.agent || chunk.step,
            description: chunk.description || "Processing..."
          };
          setCurrentSteps((prev) => [...prev, stepInfo]);
          steps.push(stepInfo);
        }

        if (chunk.result) {
          const result = chunk.result;
          aiResponse = result.response || "No response generated";

          // Format builds if available
          if (result.builds && Array.isArray(result.builds)) {
            aiResponse += "\n\n**Recommended Builds:**\n";
            result.builds.forEach((build, idx) => {
              aiResponse += `\n${idx + 1}. ${build.name || "Build " + (idx + 1)}\n`;
              if (build.description)
                aiResponse += `   ${build.description}\n`;
              if (build.totalPrice)
                aiResponse += `   Price: ₹${build.totalPrice.toLocaleString('en-IN')}\n`;
              if (build.components && Array.isArray(build.components)) {
                aiResponse += `   Components: ${build.components.length} parts\n`;
              }
            });
          }

          // Include suggestions
          if (result.suggestions && Array.isArray(result.suggestions)) {
            aiResponse += "\n\n**Suggestions:**\n";
            result.suggestions.forEach((sugg, idx) => {
              aiResponse += `${idx + 1}. ${sugg}\n`;
            });
          }
        }
      }

      if (aiResponse) {
        // Extract suggested parts from AI response
        const suggested = extractSuggestedParts(aiResponse);
        if (suggested.length > 0) {
          setSuggestedParts(suggested);
          // Add notification about suggested parts being available in Configurator
          const notificationResponse = aiResponse + `\n\n✨ **AI Suggested Parts (${suggested.length}):** ${suggested.join(", ")}\n📌 *These parts are now highlighted in the Configurator page!*`;
          setMessages((prev) => [
            ...prev,
            {
              id: Date.now(),
              text: notificationResponse,
              isUser: false,
              steps: steps,
            },
          ]);
        } else {
          setMessages((prev) => [
            ...prev,
            {
              id: Date.now(),
              text: aiResponse,
              isUser: false,
              steps: steps,
            },
          ]);
        }
        // Save last response to context for sidebar
        setLastResponse(aiResponse);
      }
    } catch (error) {
      console.error("Chat error:", error);
      
      let errorMsg = error.message || "Unknown error occurred";
      
      // Only show special handling for timeout errors (don't add redundant message)
      if (error.message?.includes("[TIMEOUT]")) {
        // Timeout already handled by chat handler - don't add extra message
      } else {
        // For all other errors, add helpful message
        setMessages((prev) => [
          ...prev,
          {
            id: Date.now(),
            text: errorMsg,
            isUser: false,
            isError: true,
          },
        ]);
      }
    } finally {
      if (timeoutTimer) clearTimeout(timeoutTimer);
      setLoading(false);
      setCurrentSteps([]);
    }
  };

  return (
    <div className="space-y-6">
      {/* Server status header */}
      <div className="glass-panel p-4 rounded-lg flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">PC Marksman AI Chat</h2>
          <p className="text-sm text-slate-400 mt-1">
            Ask questions about PC components, builds, and compatibility
          </p>
        </div>
        <div
          className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
            serverHealth === "online"
              ? "bg-green-500/10 text-green-400"
              : "bg-red-500/10 text-red-400"
          }`}
        >
          <div
            className={`w-2 h-2 rounded-full ${
              serverHealth === "online" ? "bg-green-400" : "bg-red-400"
            } animate-pulse`}
          />
          <span className="text-sm font-medium capitalize">
            {serverHealth === "checking"
              ? "Checking..."
              : serverHealth === "online"
                ? "Backend Online"
                : "Backend Offline"}
          </span>
        </div>
      </div>

      {/* Chat messages container */}
      <div className="glass-panel rounded-lg p-6 h-96 overflow-y-auto space-y-4 mb-4">
        {messages.map((msg) => (
          <MessageBubble
            key={msg.id}
            message={msg.text}
            isUser={msg.isUser}
            steps={msg.steps}
            status={msg.isError ? "Error" : null}
          />
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="glass-card px-4 py-3 rounded-lg rounded-bl-none flex items-center gap-2">
              <div className="flex gap-1">
                <div className="w-2 h-2 bg-primary rounded-full animate-bounce" />
                <div
                  className="w-2 h-2 bg-primary rounded-full animate-bounce"
                  style={{ animationDelay: "0.1s" }}
                />
                <div
                  className="w-2 h-2 bg-primary rounded-full animate-bounce"
                  style={{ animationDelay: "0.2s" }}
                />
              </div>
              <span className="text-sm text-slate-300">AI is thinking...</span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Processing steps indicator */}
      {currentSteps.length > 0 && (
        <div className="glass-card p-4 rounded-lg">
          <div className="text-xs font-semibold text-slate-300 mb-3">
            [PROCESSING] Agent Pipeline:
          </div>
          <div className="space-y-2">
            {currentSteps.map((step, idx) => (
              <div key={idx} className="flex items-start gap-3">
                <div className="flex flex-col items-center">
                  <div className="w-6 h-6 bg-primary/30 border border-primary rounded-full flex items-center justify-center">
                    <span className="text-xs font-bold text-primary">{idx + 1}</span>
                  </div>
                  {idx < currentSteps.length - 1 && (
                    <div className="w-0.5 h-6 bg-primary/30 my-1" />
                  )}
                </div>
                <div className="flex-1 pt-0.5">
                  <div className="font-medium text-white text-sm">{step.agent}</div>
                  <div className="text-xs text-slate-400">{step.description}</div>
                </div>
                <span className="material-symbols-outlined text-green-400 text-sm">check_circle</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Input form */}
      <form onSubmit={handleSendMessage} className="glass-panel p-4 rounded-lg">
        <div className="flex gap-3">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={
              serverHealth === "online"
                ? "Ask me anything about PC building..."
                : "Connect backend to chat..."
            }
            disabled={loading || serverHealth !== "online"}
            className="flex-1 bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-primary/50 disabled:opacity-50"
          />
          <button
            type="submit"
            disabled={loading || !input.trim() || serverHealth !== "online"}
            className="px-6 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-primary-glow transition disabled:opacity-50 flex items-center gap-2"
          >
            <span className="material-symbols-outlined text-lg">send</span>
            Send
          </button>
        </div>
      </form>

      {/* Example questions */}
      {messages.length === 1 && (
        <div className="glass-card p-4 rounded-lg">
          <p className="text-sm font-semibold text-white mb-3">Try asking:</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {[
              "What's a good budget PC for gaming at 1080p?",
              "Can you recommend a build for AI/ML work?",
              "How do I compare RTX 4070 Ti vs RTX 3090?",
              "What's the best CPU for streaming?",
            ].map((q, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setInput(q);
                }}
                className="text-left p-3 bg-white/5 hover:bg-white/10 rounded-lg text-sm text-slate-300 hover:text-white transition border border-white/5"
              >
                {q}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
