'use client';

import Link from "next/link";
import { Search, Bell, Bookmark, History, Home, User } from "lucide-react";

export default function Navbar() {
  return (
    <header className="w-full h-16 bg-zinc-950 border-b border-zinc-800 fixed top-0 left-0 z-50">
      <div className="max-w-400 mx-auto h-full px-6 flex items-center justify-between gap-6">

        <div className="flex items-center gap-8">
          <Link href="/" className="text-xl font-bold text-red-500">
            WatchWave
          </Link>

          <nav className="hidden md:flex items-center gap-6 text-sm text-zinc-300">
            <Link href="/">Home</Link>
            <Link href="/watchlist">Watch List</Link>
            <Link href="/history">History</Link>
            <Link href="/reminders">Reminders</Link>
          </nav>
        </div>

        {/* Search (UI only for now) */}
        <div className="flex-1 max-w-xl hidden md:block">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 w-4 h-4" />
            <input
              placeholder="Search movies, actors, or TV shows..."
              className="w-full pl-10 pr-4 py-2 rounded-full bg-zinc-900 border border-zinc-700 text-sm text-white"
            />
          </div>
        </div>

        <User className="w-5 h-5 text-zinc-300" />
      </div>
    </header>
  );
}
