// src/pages/Settings.jsx
import React, { useState, useEffect } from "react";
import { LogOut, User, History, Save, Settings as SettingsIcon, LogIn } from "lucide-react";

export default function Settings() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [userId, setUserId] = useState("");
  const [activeTab, setActiveTab] = useState("profile");
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [savedParts, setSavedParts] = useState([]);
  const [history, setHistory] = useState([]);
  const [darkMode, setDarkMode] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [saveSearchHistory, setSaveSearchHistory] = useState(true);

  // Initialize from localStorage
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    const savedHistory = localStorage.getItem("searchHistory");
    const savedBuilds = localStorage.getItem("savedParts");
    const savedDarkMode = localStorage.getItem("darkMode");
    const savedEmailNotif = localStorage.getItem("emailNotifications");
    const savedSearchHistorySetting = localStorage.getItem("saveSearchHistory");

    if (savedUser) {
      const user = JSON.parse(savedUser);
      setIsLoggedIn(true);
      setUserEmail(user.email);
      setUserId(user.id);
    }

    if (savedHistory) {
      setHistory(JSON.parse(savedHistory));
    }

    if (savedBuilds) {
      setSavedParts(JSON.parse(savedBuilds));
    }

    if (savedDarkMode !== null) {
      setDarkMode(JSON.parse(savedDarkMode));
    }

    if (savedEmailNotif !== null) {
      setEmailNotifications(JSON.parse(savedEmailNotif));
    }

    if (savedSearchHistorySetting !== null) {
      setSaveSearchHistory(JSON.parse(savedSearchHistorySetting));
    }
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    if (loginEmail && loginPassword) {
      const userId = "USER_" + Math.random().toString(36).substr(2, 9);
      const user = { email: loginEmail, id: userId };
      localStorage.setItem("user", JSON.stringify(user));
      setIsLoggedIn(true);
      setUserEmail(loginEmail);
      setUserId(userId);
      setLoginEmail("");
      setLoginPassword("");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    setUserEmail("");
    setUserId("");
    setActiveTab("profile");
  };

  const handleClearHistory = () => {
    if (window.confirm("Are you sure you want to clear all search history?")) {
      localStorage.removeItem("searchHistory");
      setHistory([]);
      alert("Search history cleared!");
    }
  };

  const handleDarkModeChange = (value) => {
    setDarkMode(value);
    localStorage.setItem("darkMode", JSON.stringify(value));
    alert(value ? "Dark mode enabled!" : "Dark mode disabled!");
  };

  const handleEmailNotificationsChange = (value) => {
    setEmailNotifications(value);
    localStorage.setItem("emailNotifications", JSON.stringify(value));
    alert(value ? "Email notifications enabled!" : "Email notifications disabled!");
  };

  const handleSaveSearchHistoryChange = (value) => {
    setSaveSearchHistory(value);
    localStorage.setItem("saveSearchHistory", JSON.stringify(value));
    alert(value ? "Search history will be saved!" : "Search history will not be saved!");
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-background-dark to-slate-900 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="bg-surface-dark rounded-lg shadow-2xl border border-slate-700 p-8">
            <div className="flex justify-center mb-6">
              <LogIn className="w-12 h-12 text-primary" />
            </div>
            
            <h1 className="text-3xl font-bold text-white text-center mb-2">
              Welcome to PC Marksman
            </h1>
            <p className="text-slate-400 text-center mb-8">
              Login to save your builds and access your history
            </p>

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="w-full px-4 py-2 rounded-lg bg-slate-800 border border-slate-600 text-white placeholder-slate-500 focus:border-primary focus:outline-none transition"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Password
                </label>
                <input
                  type="password"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-4 py-2 rounded-lg bg-slate-800 border border-slate-600 text-white placeholder-slate-500 focus:border-primary focus:outline-none transition"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full bg-primary hover:bg-blue-600 text-white font-semibold py-2 rounded-lg transition"
              >
                Login
              </button>
            </form>

            <p className="text-slate-400 text-center text-sm mt-6">
              Don't have an account? Sign up with any email to get started.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-background-dark to-slate-900 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-surface-dark rounded-lg border border-slate-700 p-6 mb-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                <User className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">{userEmail}</h1>
                <p className="text-slate-400 text-sm">User ID: {userId}</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 bg-red-600/20 hover:bg-red-600/30 text-red-400 px-4 py-2 rounded-lg transition border border-red-600/50"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 flex-wrap">
          {[
            { id: "profile", label: "Profile", icon: User },
            { id: "history", label: "Search History", icon: History },
            { id: "saved", label: "Saved Parts", icon: Save },
            { id: "settings", label: "Settings", icon: SettingsIcon },
          ].map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition ${
                activeTab === id
                  ? "bg-primary text-white"
                  : "bg-surface-dark text-slate-300 border border-slate-700 hover:border-primary"
              }`}
            >
              <Icon className="w-4 h-4" />
              {label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="bg-surface-dark rounded-lg border border-slate-700 p-6">
          {/* Profile Tab */}
          {activeTab === "profile" && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-white">Profile Information</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-slate-800 rounded-lg p-4">
                  <p className="text-slate-400 text-sm">Email Address</p>
                  <p className="text-white font-semibold">{userEmail}</p>
                </div>
                <div className="bg-slate-800 rounded-lg p-4">
                  <p className="text-slate-400 text-sm">User ID</p>
                  <p className="text-white font-semibold">{userId}</p>
                </div>
                <div className="bg-slate-800 rounded-lg p-4">
                  <p className="text-slate-400 text-sm">Joined Date</p>
                  <p className="text-white font-semibold">{new Date().toLocaleDateString()}</p>
                </div>
                <div className="bg-slate-800 rounded-lg p-4">
                  <p className="text-slate-400 text-sm">Account Status</p>
                  <p className="text-white font-semibold text-green-400">Active</p>
                </div>
              </div>
            </div>
          )}

          {/* Search History Tab */}
          {activeTab === "history" && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold text-white">Search History</h2>
                <button
                  onClick={handleClearHistory}
                  className="bg-red-600/20 hover:bg-red-600/30 text-red-400 px-4 py-2 rounded-lg transition border border-red-600/50 font-semibold"
                >
                  Clear History
                </button>
              </div>
              {history.length > 0 ? (
                <div className="space-y-2">
                  {history.slice(-10).reverse().map((item, index) => (
                    <div key={index} className="bg-slate-800 rounded-lg p-4 hover:bg-slate-700 transition">
                      <p className="text-white">{item.query}</p>
                      <p className="text-slate-400 text-sm">{new Date(item.timestamp).toLocaleString()}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-slate-400">No search history yet. Start searching to build your history!</p>
              )}
            </div>
          )}

          {/* Saved Parts Tab */}
          {activeTab === "saved" && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-white">Saved Parts & Builds</h2>
              {savedParts.length > 0 ? (
                <div className="grid md:grid-cols-2 gap-4">
                  {savedParts.map((part, index) => (
                    <div key={index} className="bg-slate-800 rounded-lg p-4 border border-slate-700">
                      <p className="text-white font-semibold">{part.name}</p>
                      <p className="text-slate-400 text-sm">{part.category}</p>
                      <p className="text-primary font-bold mt-2">₹{part.price.toLocaleString("en-IN")}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-slate-400">No saved parts yet. Save your favorite components to build your collection!</p>
              )}
            </div>
          )}

          {/* Settings Tab */}
          {activeTab === "settings" && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-white">Settings</h2>
              <div className="space-y-4">
                {/* Dark Mode */}
                <div className="bg-slate-800 rounded-lg p-4 flex items-center justify-between">
                  <div>
                    <p className="text-white font-semibold">Dark Mode</p>
                    <p className="text-slate-400 text-sm">Use dark theme for the app</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={darkMode}
                      onChange={(e) => handleDarkModeChange(e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-slate-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                  </label>
                </div>

                {/* Email Notifications */}
                <div className="bg-slate-800 rounded-lg p-4 flex items-center justify-between">
                  <div>
                    <p className="text-white font-semibold">Email Notifications</p>
                    <p className="text-slate-400 text-sm">Get updates on new components</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={emailNotifications}
                      onChange={(e) => handleEmailNotificationsChange(e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-slate-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                  </label>
                </div>

                {/* Save Search History */}
                <div className="bg-slate-800 rounded-lg p-4 flex items-center justify-between">
                  <div>
                    <p className="text-white font-semibold">Save Search History</p>
                    <p className="text-slate-400 text-sm">Remember your searches automatically</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={saveSearchHistory}
                      onChange={(e) => handleSaveSearchHistoryChange(e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-slate-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                  </label>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
