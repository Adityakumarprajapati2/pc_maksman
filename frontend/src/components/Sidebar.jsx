// src/components/Sidebar.jsx
import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";

export default function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { lastResponse } = useAppContext();
  const sessionId = sessionStorage.getItem("sessionId") || "default";

  const [recentItems, setRecentItems] = useState([
    { id: "placeholder-1", text: "new chat", type: "placeholder", isPlaceholder: true },
    { id: "placeholder-2", text: "new chat", type: "placeholder", isPlaceholder: true },
    { id: "placeholder-3", text: "new chat", type: "placeholder", isPlaceholder: true },
    { id: "placeholder-4", text: "new chat", type: "placeholder", isPlaceholder: true },
    { id: "placeholder-5", text: "new chat", type: "placeholder", isPlaceholder: true }
  ]);

  const isActive = (path) => location.pathname === path;

  // Fetch recent questions from backend when component mounts
  useEffect(() => {
    const fetchRecentQuestions = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/recent-questions?sessionId=${sessionId}`);
        if (response.ok) {
          const data = await response.json();
          if (data.recentQuestions && data.recentQuestions.length > 0) {
            const items = data.recentQuestions.map(q => ({
              id: q.id,
              text: q.preview,
              fullText: q.text,
              timestamp: q.timestamp,
              type: "question",
              isPlaceholder: false
            }));
            
            // Pad with placeholders if less than 5
            while (items.length < 5) {
              items.push({ 
                id: `placeholder-${Date.now()}-${Math.random()}`, 
                text: "new chat", 
                type: "placeholder",
                isPlaceholder: true 
              });
            }
            
            setRecentItems(items.slice(0, 5));
          }
        }
      } catch (error) {
        console.error("Failed to fetch recent questions:", error);
      }
    };

    fetchRecentQuestions();
    const interval = setInterval(fetchRecentQuestions, 5000); // Refresh every 5 seconds
    return () => clearInterval(interval);
  }, [sessionId]);

  // Also update when lastResponse changes
  useEffect(() => {
    if (lastResponse) {
      setRecentItems((prev) => {
        const realItems = prev.filter(item => !item.isPlaceholder);
        const newItems = [
          { 
            id: Date.now(), 
            text: lastResponse.substring(0, 50), 
            fullText: lastResponse,
            type: "response", 
            isPlaceholder: false 
          }, 
          ...realItems
        ];
        
        // Pad with placeholders if less than 5
        while (newItems.length < 5) {
          newItems.push({ 
            id: `placeholder-${Date.now()}-${Math.random()}`, 
            text: "new chat", 
            type: "placeholder",
            isPlaceholder: true 
          });
        }
        
        return newItems.slice(0, 5);
      });
    }
  }, [lastResponse]);

  return (
    <aside className="w-20 lg:w-64 flex-shrink-0 glass-panel flex flex-col h-full z-20 transition-all duration-300">
      <div className="flex h-full flex-col justify-between p-4">
        <div className="flex flex-col gap-6">
          <div className="flex gap-3 items-center pb-4 border-b border-white/10">
            <div className="bg-center bg-no-repeat bg-cover rounded-full size-10 ring-2 ring-primary/40 shadow-[0_0_15px_rgba(19,135,236,0.3)]" />
            <div className="hidden lg:flex flex-col">
              <h1 className="text-white text-base font-bold leading-normal tracking-wide">PC Marksman </h1>
              <p className="text-slate-400 text-xs">Configurator v3.0</p>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <Link to="/" className={`flex items-center gap-3 px-3 py-3 rounded-xl transition-all ${isActive("/") ? "bg-primary/20 text-primary border border-primary/30" : "text-slate-300 hover:bg-white/10 hover:text-white"}`}>
              <span className="material-symbols-outlined text-[24px]">add_circle</span>
              <p className="hidden lg:block text-sm font-medium">Configure</p>
            </Link>

            <Link to="/compare" className={`flex items-center gap-3 px-3 py-3 rounded-xl transition-all ${isActive("/compare") ? "bg-primary/20 text-primary border border-primary/30" : "text-slate-300 hover:bg-white/10 hover:text-white"}`}>
              <span className="material-symbols-outlined text-[24px]">compare</span>
              <p className="hidden lg:block text-sm font-medium">Compare</p>
            </Link>

            <Link to="/review" className={`flex items-center gap-3 px-3 py-3 rounded-xl transition-all ${isActive("/review") ? "bg-primary/20 text-primary border border-primary/30" : "text-slate-300 hover:bg-white/10 hover:text-white"}`}>
              <span className="material-symbols-outlined text-[24px]">check_circle</span>
              <p className="hidden lg:block text-sm font-medium">Review</p>
            </Link>

            <Link to="/chat" className={`flex items-center gap-3 px-3 py-3 rounded-xl transition-all ${isActive("/chat") ? "bg-primary/20 text-primary border border-primary/30" : "text-slate-300 hover:bg-white/10 hover:text-white"}`}>
              <span className="material-symbols-outlined text-[24px]">smart_toy</span>
              <p className="hidden lg:block text-sm font-medium">AI Chat</p>
            </Link>

            <div className="hidden lg:block pt-4 mt-2 border-t border-white/10">
              <p className="px-3 text-xs font-semibold text-slate-500 uppercase tracking-widest mb-3">Recent (5)</p>
              {recentItems && recentItems.length > 0 ? (
                recentItems.map((item, idx) => (
                  <button
                    key={item.id}
                    onClick={() => navigate("/chat")}
                    className={`flex items-center gap-3 px-3 py-2 rounded-lg w-full text-left truncate transition-colors ${
                      item.isPlaceholder
                        ? "text-slate-500 hover:bg-white/5 hover:text-slate-400"
                        : "text-slate-400 hover:bg-white/5 hover:text-white active:bg-white/10"
                    }`}
                    title={item.fullText || item.text}
                  >
                    <span className="material-symbols-outlined text-[18px]">
                      {item.isPlaceholder ? "add" : "chat"}
                    </span>
                    <span className="text-xs truncate font-medium">{item.text}</span>
                  </button>
                ))
              ) : null}
            </div>
          </div>
        </div>

        <Link to="/settings" className="flex items-center gap-3 px-3 py-2 mt-auto rounded-xl text-slate-400 hover:bg-white/10 hover:text-white cursor-pointer transition-colors">
          <span className="material-symbols-outlined text-[24px]">settings</span>
          <p className="hidden lg:block text-sm font-medium">Settings</p>
        </Link>
      </div>
    </aside>
  );
}