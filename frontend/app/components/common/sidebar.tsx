'use client';

import Link from "next/link";
import {
  Home,
  LayoutDashboard,
  List,
  History,
  Settings,
  TrendingUp,
  Film,
  Tv
} from "lucide-react";

export default function Sidebar() {
  return (
    <aside className="w-64 h-screen bg-zinc-900 text-white fixed left-0 top-0 p-6 hidden md:flex flex-col">
      
      {/* Brand */}
      <div className="mb-10">
        <h1 className="text-2xl font-bold">WatchWave</h1>
      </div>

      {/* USER NAVIGATION */}
      <div className="mb-8">
        <p className="text-xs uppercase text-zinc-500 mb-3">
          Dashboard
        </p>

        <nav className="space-y-3">
          <NavItem icon={LayoutDashboard} label="Overview" href="/components/dashboard" />
          <NavItem icon={List} label="My Watchlist" href="/watchlist" />
          <NavItem icon={History} label="Activity" href="/activity" />
        </nav>
      </div>

      {/* CONTENT NAVIGATION */}
      <div className="mb-8">
        <p className="text-xs uppercase text-zinc-500 mb-3">
          Discover
        </p>

        <nav className="space-y-3">
          <NavItem icon={Home} label="Home" href="/components/discover" />
          <NavItem icon={TrendingUp} label="Trending" href="/discover#trending" />
          <NavItem icon={Film} label="Movies" href="/movies" />
          <NavItem icon={Tv} label="TV Shows" href="/tv" />
        </nav>
      </div>

      {/* FOOTER */}
      <div className="mt-auto">
        <NavItem icon={Settings} label="Settings" href="/settings" />
      </div>
    </aside>
  );
}

function NavItem({
  icon: Icon,
  label,
  href,
}: {
  icon: any;
  label: string;
  href: string;
}) {
  return (
    <Link
      href={href}
      className="flex items-center gap-3 px-3 py-2 rounded-md text-zinc-300 hover:bg-zinc-800 hover:text-white transition"
    >
      <Icon size={18} />
      <span className="text-sm">{label}</span>
    </Link>
  );
}
