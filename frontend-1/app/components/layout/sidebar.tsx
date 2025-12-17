"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Clock, Bookmark, Bell } from "lucide-react";

export default function Sidebar() {
  const pathname = usePathname();

  const linkStyle = (path: string) => `
    flex items-center gap-3 px-4 py-2 rounded-md transition-all duration-200
    ${pathname === path 
      ? "bg-red-600/10 text-red-600 font-bold" 
      : "text-neutral-500 hover:text-gray-200 hover:bg-white/5"}
  `;

  return (
    <div className="flex flex-col h-full px-2">
      <nav className="flex flex-col gap-1">
        <Link href="/components/discover" className={linkStyle("/components/discover")}>
          <Home size={18} /> 
          <span className="text-[13px] tracking-wide">Discover</span>
        </Link>

        <Link href="/components/watchlist" className={linkStyle("/components/watchlist")}>
          <Bookmark size={18} /> 
          <span className="text-[13px] tracking-wide">Watchlist</span>
        </Link>

        <Link href="/components/history" className={linkStyle("/components/history")}>
          <Clock size={18} /> 
          <span className="text-[13px] tracking-wide">History</span>
        </Link>

        <Link href="/components/reminders" className={linkStyle("/components/reminders")}>
          <Bell size={18} /> 
          <span className="text-[13px] tracking-wide">Reminders</span>
        </Link>
      </nav>
    </div>
  );
}