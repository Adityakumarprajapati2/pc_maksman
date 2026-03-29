// src/pages/Settings.jsx
import React from "react";

export default function Settings() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-background-dark to-slate-900">
      <div className="text-center space-y-8 max-w-2xl mx-auto px-4">
        <div className="space-y-4">
          <h1 className="text-5xl md:text-6xl font-bold text-white">
            Thank You
          </h1>
          <p className="text-2xl md:text-3xl text-slate-300 font-light">
            for visiting PC Builder
          </p>
        </div>

        <div className="h-1 w-24 bg-gradient-to-r from-primary to-cyan-500 mx-auto"></div>

        <p className="text-lg text-slate-400 leading-relaxed">
          We hope this tool helped you configure and understand your perfect PC build.
        </p>

        <div className="pt-8">
          <svg
            className="w-24 h-24 mx-auto text-primary opacity-50"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>

        <div className="text-slate-500 text-sm pt-8">
          <p>PC Builder Configurator v3.0</p>
          <p className="mt-2">Built with AI-powered component recommendations</p>
        </div>
      </div>
    </div>
  );
}
