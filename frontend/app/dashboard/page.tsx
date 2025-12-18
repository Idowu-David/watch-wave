"use client";

import { useWatchlist } from "../components/context/WatchlistContext";
import { Tv, Star, LayoutGrid, Clock } from "lucide-react";

export default function StatsDashboard() {
  const { watched } = useWatchlist();

  // 1. Calculate Average Rating
  const avgRating = watched.length > 0 
    ? (watched.reduce((acc, curr) => acc + curr.vote_average, 0) / watched.length).toFixed(1)
    : "0.0";

  // 2. Identify Top Genre (using TMDB Genre IDs)
  const genreCounts: Record<number, number> = {};
  watched.forEach(m => {
    m.genre_ids?.forEach((id: number) => {
      genreCounts[id] = (genreCounts[id] || 0) + 1;
    });
  });
  
  const topGenreId = Object.keys(genreCounts).length > 0 
    ? Object.entries(genreCounts).sort((a, b) => b[1] - a[1])[0][0]
    : null;

  const statCard = (icon: any, label: string, value: any, colorClass: string) => (
    <div className="bg-neutral-900/40 border border-white/5 p-5 rounded-2xl flex items-center gap-4 hover:border-white/10 transition-colors">
      <div className={`p-3 rounded-xl bg-opacity-10 ${colorClass}`}>
        {icon}
      </div>
      <div>
        <p className="text-[10px] font-black uppercase tracking-widest text-neutral-500">{label}</p>
        <h3 className="text-xl font-black">{value}</h3>
      </div>
    </div>
  );

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
      {statCard(<Tv className="text-blue-500" />, "Watched", watched.length, "bg-blue-500")}
      {statCard(<Star className="text-yellow-500" />, "Avg Score", `${avgRating}/10`, "bg-yellow-500")}
      {statCard(<LayoutGrid className="text-purple-500" />, "Top Genre", topGenreId ? "Action" : "None", "bg-purple-500")}
      {statCard(<Clock className="text-green-500" />, "Total Time", `${watched.length * 110}m`, "bg-green-500")}
    </div>
  );
}