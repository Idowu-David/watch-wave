"use client";

import Sidebar from "@/components/ui/Sidebar";
import MovieCard from "@/components/ui/MovieCard";
import StatsDashboard from "@/components/ui/StatsDashboard";
import { useWatchlist } from "@/context/WatchlistContext";

export default function WatchlistPage() {
  const { watchlist } = useWatchlist();

  return (
    <div className="grid grid-cols-[280px_1fr] h-screen bg-[#050505] text-white overflow-hidden">
      {/* Sidebar */}
      <Sidebar currentView="watchlist" onViewChange={() => {}} />

      {/* Main Content */}
      <main className="overflow-y-auto">
        {/* Header */}
        <header className="sticky top-0 z-40 bg-[#050505]/95 backdrop-blur-xl border-b border-white/10 px-12 py-6">
          <h1 className="text-5xl font-black uppercase tracking-wider text-red-600">
            My Watchlist
          </h1>
        </header>

        <div className="p-12">
          {/* Stats */}
          <StatsDashboard />

          {/* Empty State */}
          {watchlist.length === 0 ? (
            <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
              <h2 className="text-4xl font-black uppercase tracking-wider text-white/60 mb-4">
                Your Watchlist Is Empty
              </h2>
              <p className="text-xl text-white/40 max-w-md">
                Search for movies or TV shows and add them to your watchlist.
              </p>
            </div>
          ) : (
            <>
              <div className="mb-8">
                <h2 className="text-3xl font-black uppercase tracking-wider text-white/80">
                  {watchlist.length} Item{watchlist.length !== 1 ? "s" : ""}
                </h2>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8">
                {watchlist.map((movie) => (
                  <MovieCard key={movie.id} movie={movie} />
                ))}
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  );
}
