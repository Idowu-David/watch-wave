"use client";

import { Home, Heart, CheckCircle2, Settings, Film } from "lucide-react";

// 1. Define the props to match exactly what DiscoverPage is sending
interface SidebarProps {
  onHomeClick: () => void;
  onWatchlistClick: () => void;
  onWatchedClick: () => void;
  activeView: "home" | "watchlist" | "watched";
}

export default function Sidebar({ 
  onHomeClick, 
  onWatchlistClick, 
  onWatchedClick, 
  activeView 
}: SidebarProps) {

  // Define the menu items and map them to the props
  const menuItems = [
    { 
      id: "home", 
      icon: <Home size={18} />, 
      label: "Home", 
      action: onHomeClick 
    },
    { 
      id: "watchlist", 
      icon: <Heart size={18} />, 
      label: "Watchlist", 
      action: onWatchlistClick 
    },
    { 
      id: "watched", 
      icon: <CheckCircle2 size={18} />, 
      label: "User Dashboard", 
      action: onWatchedClick 
    },
  ];

  return (
    <div className="flex flex-col h-full py-6">
      <div className="flex-1 px-4 space-y-2">
        <p className="px-4 text-[10px] font-black uppercase tracking-[0.2em] text-neutral-600 mb-4">Menu</p>
        
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={item.action}
            className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl text-sm font-bold transition-all duration-300 group ${
              activeView === item.id 
                ? "bg-red-600 text-white shadow-lg shadow-red-600/20" 
                : "text-neutral-500 hover:text-white hover:bg-white/5"
            }`}
          >
            <span className={`transition-colors duration-300 ${
              activeView === item.id ? "text-white" : "text-neutral-500 group-hover:text-red-500"
            }`}>
              {item.icon}
            </span>
            {item.label}
          </button>
        ))}
      </div>

      <div className="px-4 pt-4 border-t border-white/5 space-y-2">
        <button className="w-full flex items-center gap-4 px-4 py-3 rounded-xl text-sm font-bold text-neutral-500 hover:text-white hover:bg-white/5 transition-all">
          <Settings size={18} /> Settings
        </button>
      </div>
    </div>
  );
}