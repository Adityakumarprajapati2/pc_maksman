// src/components/Layout.jsx
import React from "react";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import StatusPanel from "./StatusPanel";
import AnimatedBackground from "./AnimatedBackground";

export default function Layout({ children }) {
  return (
    <div className="min-h-screen flex relative bg-background-dark text-slate-100 font-display">
      <AnimatedBackground />
      <Sidebar />
      <main className="flex-1 flex flex-col h-full relative overflow-hidden">
        <Topbar />
        <div className="flex-1 px-4 md:px-8 pb-20 overflow-auto">
          <div className="max-w-7xl mx-auto">{children}</div>
        </div>
      </main>
      <aside className="hidden xl:block w-96 p-6">
        <StatusPanel />
      </aside>
    </div>
  );
}