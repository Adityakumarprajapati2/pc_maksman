// src/pages/BuildHealth.jsx
import React from "react";
import Layout from "../components/Layout";
import { useAppContext } from "../context/AppContext.jsx";

function CircularGauge({value=85,size=140,stroke=12}){
  const radius = (size - stroke) / 2;
  const center = size / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (value/100) * circumference;
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <defs>
        <linearGradient id="g" x1="0" x2="1"><stop offset="0" stopColor="#60a5fa"/><stop offset="1" stopColor="#6ee7b7"/></linearGradient>
      </defs>
      <g transform={`rotate(-90 ${center} ${center})`}>
        <circle cx={center} cy={center} r={radius} stroke="rgba(255,255,255,0.06)" strokeWidth={stroke} fill="none"/>
        <circle cx={center} cy={center} r={radius} stroke="url(#g)" strokeWidth={stroke} strokeLinecap="round" fill="none"
          strokeDasharray={`${circumference} ${circumference}`} strokeDashoffset={offset} />
      </g>
      <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" className="text-white" style={{fontSize:18, fill:'white', fontWeight:700}}>{value}%</text>
    </svg>
  );
}

function HealthRow({label, value, status="ok"}){
  const statusColor = status === "ok" ? "text-green-300" : status === "warn" ? "text-yellow-300" : "text-red-300";
  return (
    <div className="flex items-center justify-between glass-card p-3 rounded">
      <div>
        <div className="font-medium">{label}</div>
        <div className="text-xs small-muted">Score: {value}%</div>
      </div>
      <div className={`font-semibold ${statusColor}`}>{status.toUpperCase()}</div>
    </div>
  );
}

export default function BuildHealth(){
  const { analyze } = useAppContext?.() || {};
  return (
    <Layout title="Build Health">
      <section className="glass-panel p-6 flex flex-col lg:flex-row items-center gap-6">
        <div className="flex items-center gap-6">
          <CircularGauge value={85} />
          <div>
            <h3 className="text-xl font-semibold">Overall Build Health</h3>
            <p className="text-sm small-muted mt-1">Score reflects power headroom, thermal margin and mechanical fit.</p>
          </div>
        </div>

        <div className="flex-1 grid grid-cols-1 gap-3">
          <HealthRow label="Power" value={78} status="warn" />
          <HealthRow label="Thermal" value={92} status="ok" />
          <HealthRow label="Fit" value={88} status="ok" />
        </div>
      </section>

      <section className="mt-4">
        <div className="glass-card p-4">
          <h4 className="font-semibold">Critical Alerts</h4>
          <div className="mt-3 space-y-2">
            <div className="p-3 rounded border-l-4 border-red-500 bg-red-600/6">
              <div className="font-medium">Case Fit Conflict</div>
              <div className="text-sm small-muted mt-1">Selected GPU length exceeds case limit. Consider shorter models or larger case.</div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}