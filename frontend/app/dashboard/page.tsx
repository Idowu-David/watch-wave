// app/dashboard/page.tsx
"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import MovieCard from "@/components/ui/MovieCard";
import StatsDashboard from "@/components/ui/StatsDashboard";
import Sidebar from "@/components/ui/Sidebar";
import { useWatchlist } from "@/context/WatchlistContext";
import { Search, Loader2, X, Star } from "lucide-react";

export default function DashboardPage() {
  const { toggleWatchlist, toast, setToast } = useWatchlist();

  const [currentTab, setCurrentTab] = useState<"trending" | "top-rated" | "upcoming">("trending");
  const [movies, setMovies] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  const tabEndpoints = {
    "trending": "/api/tmdb/trending",
    "top-rated": "/api/tmdb/top-rated",
    "upcoming": "/api/tmdb/upcoming",
  };

  const fetchMovies = async (tab: string, pageNum: number = 1, append: boolean = false) => {
    setIsLoading(true);
    try {
      const res = await fetch(`${tabEndpoints[tab as keyof typeof tabEndpoints]}?page=${pageNum}`);
      const data = await res.json();
      if (append) {
        setMovies((prev) => [...prev, ...data.results]);
      } else {
        setMovies(data.results || []);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  // Initial load & tab change
  useEffect(() => {
    fetchMovies(currentTab, 1, false);
    setPage(1);
  }, [currentTab]);

  // Search
  useEffect(() => {
    if (!searchQuery.trim()) {
      setSearchResults([]);
      return;
    }
    const timer = setTimeout(async () => {
      setIsSearching(true);
      try {
        const res = await fetch(`/api/tmdb/search?query=${encodeURIComponent(searchQuery)}`);
        const data = await res.json();
        setSearchResults(data.results || []);
      } catch (err) {
        console.error(err);
      } finally {
        setIsSearching(false);
      }
    }, 500);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  const addToWatchlist = async (movie: any) => {
    try {
      const res = await fetch("/watchlist/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          tmdb_id: movie.id,
          title: movie.title || movie.name,
          poster_path: movie.poster_path,
          overview: movie.overview,
          release_date: movie.release_date || movie.first_air_date,
        }),
      });

      if (res.ok) {
        toggleWatchlist(movie); // update local context
        setToast({ msg: "Added to Watchlist", type: "success" });
      } else {
        setToast({ msg: "Failed to add", type: "info" });
      }
    } catch (err) {
      setToast({ msg: "Error", type: "info" });
    }
  };

  const renderContent = () => {
    const displayMovies = searchQuery ? searchResults : movies;

    if (displayMovies.length === 0 && !isLoading) {
      return <p className="text-center text-white/50 text-2xl mt-20">No movies found</p>;
    }

    const hero = displayMovies[0];
    const rest = displayMovies.slice(1);

    return (
      <div>
        {/* Hero - First movie bigger */}
        {hero && !searchQuery && (
          <div className="mb-16 relative rounded-3xl overflow-hidden h-96 md:h-[80vh]">
            <img
              src={`https://image.tmdb.org/t/p/original${hero.backdrop_path || hero.poster_path}`}
              alt=""
              className="absolute inset-0 w-full h-full object-cover brightness-50"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
            <div className="relative z-10 h-full flex items-end p-12">
              <div className="max-w-3xl">
                <h1 className="text-5xl md:text-7xl font-black uppercase mb-6">{hero.title || hero.name}</h1>
                <p className="text-xl text-white/80 mb-8 line-clamp-3">{hero.overview}</p>
                <button
                  onClick={() => setSelectedMovie(hero)}
                  className="bg-red-600 hover:bg-red-700 text-white px-12 py-4 rounded-full font-black uppercase tracking-widest"
                >
                  View Details
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Grid of remaining movies */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8">
          {rest.map((movie) => (
            <MovieCard
              key={movie.id}
              movie={movie}
              onClick={() => setSelectedMovie(movie)}
            />
          ))}
        </div>

        {/* Next Page Button */}
        {!searchQuery && (
          <div className="flex justify-end mt-12">
            <button
              onClick={() => {
                setPage(page + 1);
                fetchMovies(currentTab, page + 1, true);
              }}
              disabled={isLoading}
              className="bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white px-10 py-4 rounded-full font-black uppercase tracking-widest shadow-xl"
            >
              {isLoading ? "Loading..." : "Next Page"}
            </button>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="grid grid-cols-[280px_1fr] h-screen bg-[#050505] text-white overflow-hidden">
      <Sidebar currentView="home" onViewChange={() => {}} /> {/* adjust if needed */}

      <main className="overflow-y-auto">
        {/* Top Nav with Tabs + Search */}
        <header className="sticky top-0 z-40 bg-[#050505]/95 backdrop-blur-xl border-b border-white/10 px-12 py-6">
          <div className="flex items-center justify-between">
            {/* Tabs */}
            <div className="flex gap-8">
              {(["trending", "top-rated", "upcoming"] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setCurrentTab(tab)}
                  className={`text-xl font-black uppercase tracking-wider transition ${
                    currentTab === tab ? "text-red-600" : "text-white/60 hover:text-white"
                  }`}
                >
                  {tab.replace("-", " ")}
                </button>
              ))}
            </div>

            {/* Search */}
            <div className="max-w-md">
              <div className="relative">
                {isSearching ? (
                  <Loader2 className="absolute left-4 top-1/2 -translate-y-1/2 animate-spin text-red-600" size={20} />
                ) : (
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" size={20} />
                )}
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-white/10 border border-white/20 rounded-full pl-12 pr-6 py-4 text-white placeholder-white/40 focus:border-red-600 outline-none"
                />
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <div className="p-12">
          <StatsDashboard />
          {renderContent()}
        </div>
      </main>

      {/* Modal & Toast - same as before */}
      {/* ... (keep your existing modal and toast code) */}
    </div>
  );
}