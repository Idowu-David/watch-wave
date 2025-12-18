"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "../components/layout/sidebar";
import MovieRow from "../components/movies/movierow";
import MovieCard from "../components/movies/MovieCard";
import StatsDashboard from "../dashboard/page";
import { isAuthenticated, logout } from "../lib/auth";
import { useWatchlist } from "../components/context/WatchlistContext";
import { Search, Play, ArrowLeft, Loader2, Filter, Heart, CheckCircle2 } from "lucide-react";

const API_KEY = "97ca10f5cde769f2a4954342ecad7b02";
const BASE_URL = "https://api.themoviedb.org/3";

type ViewState = "home" | "watchlist" | "watched";

export default function DiscoverPage() {
  const router = useRouter();
  const searchInputRef = useRef<HTMLInputElement>(null);
  const { watchlist, watched } = useWatchlist();
  
  // Navigation & UI States
  const [currentView, setCurrentView] = useState<ViewState>("home");
  const [isSearching, setIsSearching] = useState(false);
  
  // Data States
  const [trending, setTrending] = useState([]);
  const [popular, setPopular] = useState([]);
  const [topRated, setTopRated] = useState([]);
  const [heroMovie, setHeroMovie] = useState<any>(null);
  const [searchResults, setSearchResults] = useState([]);
  
  // Filter States
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("popularity.desc");
  const [selectedGenre, setSelectedGenre] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedRating, setSelectedRating] = useState("");

  const years = Array.from({ length: 36 }, (_, i) => (2025 - i).toString());

  useEffect(() => {
    if (!isAuthenticated()) router.replace("/");
  }, [router]);

  // Initial Data Fetch
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const [t, p, r] = await Promise.all([
          fetch(`${BASE_URL}/trending/all/week?api_key=${API_KEY}`).then(res => res.json()),
          fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}`).then(res => res.json()),
          fetch(`${BASE_URL}/movie/top_rated?api_key=${API_KEY}`).then(res => res.json()),
        ]);
        setTrending(t.results || []);
        setPopular(p.results || []);
        setTopRated(r.results || []);
        setHeroMovie(t.results?.[0]);
      } catch (err) { console.error(err); }
    };
    fetchInitialData();
  }, []);

  // Search & Discover API Effect
  useEffect(() => {
    if (currentView !== "home" && !searchQuery) return;

    const handleDiscovery = async () => {
      setIsSearching(true);
      try {
        let url = `${BASE_URL}/discover/movie?api_key=${API_KEY}&sort_by=${sortBy}`;
        if (selectedGenre) url += `&with_genres=${selectedGenre}`;
        if (selectedYear) url += `&primary_release_year=${selectedYear}`;
        if (selectedRating) url += `&vote_average.gte=${Number(selectedRating) * 2}`;
        
        // If there's a search query, override discovery with search
        if (searchQuery.trim()) {
          url = `${BASE_URL}/search/multi?api_key=${API_KEY}&query=${encodeURIComponent(searchQuery)}`;
        }

        const res = await fetch(url);
        const data = await res.json();
        setSearchResults(data.results || []);
      } catch (err) { console.error(err); }
      setIsSearching(false);
    };

    const debounce = setTimeout(handleDiscovery, 500);
    return () => clearTimeout(debounce);
  }, [searchQuery, sortBy, selectedGenre, selectedYear, selectedRating, currentView]);

  // Keyboard Shortcut (/)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "/" && document.activeElement?.tagName !== "INPUT") {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleBack = () => {
    if (currentView !== "home" || searchQuery || selectedGenre || selectedYear || selectedRating) {
      setCurrentView("home");
      setSearchQuery("");
      setSelectedGenre("");
      setSelectedYear("");
      setSelectedRating("");
    } else {
      router.back();
    }
  };

  const selectStyle = `bg-neutral-900 text-neutral-400 text-[10px] font-black uppercase tracking-widest px-4 py-2 rounded border border-white/5 cursor-pointer hover:border-red-600 transition-all outline-none appearance-none pr-8 bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%23666%22%20stroke-width%3D%223%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%3E%3C/polyline%3E%3C/svg%3E')] bg-[length:12px] bg-[right_10px_center] bg-no-repeat`;

  return (
    <div className="grid grid-cols-[240px_1fr] h-screen w-full bg-[#141414] text-white overflow-hidden">
      
      {/* SIDEBAR */}
      <aside className="h-full bg-black border-r border-white/5 flex flex-col shrink-0">
        <div className="p-8">
          <h1 onClick={() => {setCurrentView("home"); setSearchQuery("");}} className="text-2xl font-black tracking-tighter text-red-600 italic cursor-pointer select-none">TAMO</h1>
        </div>
        <Sidebar 
          onWatchlistClick={() => setCurrentView("watchlist")} 
          onWatchedClick={() => setCurrentView("watched")}
          onHomeClick={() => setCurrentView("home")}
          activeView={currentView}
        />
      </aside>

      <main className="h-full overflow-y-auto relative flex flex-col scrollbar-hide">
        
        {/* TOP NAVIGATION & FILTERS */}
        <div className="sticky top-0 z-50 flex flex-col w-full bg-[#141414]/95 backdrop-blur-xl border-b border-white/5">
          <nav className="h-20 w-full flex justify-between items-center px-8">
            <div className="flex items-center gap-4">
              <button onClick={handleBack} className="p-2 hover:bg-white/10 rounded-full transition active:scale-90"><ArrowLeft size={18} /></button>
              <h1 className="text-lg font-black text-red-600 italic uppercase">Dashboard</h1>
            </div>

            <div className="flex items-center gap-5">
              <div className="flex items-center bg-neutral-900 border border-white/5 px-3 py-2 rounded-md w-87.5 focus-within:border-red-600 transition-all">
                {isSearching ? <Loader2 size={16} className="text-red-600 animate-spin" /> : <Search size={16} className="text-neutral-500" />}
                <input ref={searchInputRef} type="text" placeholder="Search movies (Press '/')" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="bg-transparent outline-none ml-3 text-[13px] w-full placeholder:text-neutral-700" />
              </div>
              <button onClick={logout} className="bg-red-600 hover:bg-red-700 px-6 py-2 rounded font-bold text-xs shadow-lg active:scale-95 transition">LOGOUT</button>
            </div>
          </nav>

          {/* FILTER BAR - Only show in Home/Discovery view */}
          {currentView === "home" && (
            <div className="h-14 px-8 flex items-center gap-3 overflow-x-auto no-scrollbar pb-1">
              <div className="flex items-center gap-2 text-white shrink-0 mr-3 text-[10px] font-black uppercase tracking-widest"><Filter size={12} className="text-red-600" /> DISCOVERY</div>
              <select className={selectStyle} value={selectedRating} onChange={(e) => setSelectedRating(e.target.value)}>
                <option value="">Any Rating</option>
                <option value="4">4+ Stars</option><option value="3">3+ Stars</option>
              </select>
              <select className={selectStyle} value={selectedGenre} onChange={(e) => setSelectedGenre(e.target.value)}>
                <option value="">All Genres</option>
                <option value="28">Action</option><option value="35">Comedy</option><option value="27">Horror</option><option value="878">Sci-Fi</option>
              </select>
              <select className={selectStyle} value={selectedYear} onChange={(e) => setSelectedYear(e.target.value)}>
                <option value="">Year</option>
                {years.map(y => <option key={y} value={y}>{y}</option>)}
              </select>
              <select className={selectStyle} value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                <option value="popularity.desc">Most Popular</option>
                <option value="vote_average.desc">Highest Rated</option>
              </select>
              {(searchQuery || selectedGenre || selectedYear || selectedRating) && (
                <button onClick={handleBack} className="ml-4 text-[10px] font-black text-red-600 hover:text-white transition uppercase underline underline-offset-4 shrink-0">Reset</button>
              )}
            </div>
          )}
        </div>

        {/* PAGE CONTENT */}
        <div className="flex-1">
          
          {/* 1. WATCHED (LIBRARY) VIEW */}
          {currentView === "watched" && (
            <div className="p-10 animate-in fade-in slide-in-from-bottom-2">
              <div className="flex items-center gap-3 mb-2">
                <CheckCircle2 className="text-green-500" size={24} />
                <h1 className="text-4xl font-black uppercase tracking-tighter">Already Watched</h1>
              </div>
              <p className="text-neutral-500 text-xs mb-8 tracking-widest uppercase font-bold">Your cinematic history and statistics</p>
              
              <StatsDashboard />

              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8">
                {watched.length > 0 ? (
                  watched.map((m: any) => <MovieCard key={m.id} movie={m} />)
                ) : (
                  <p className="col-span-full text-center py-20 text-neutral-600 italic">You haven't marked anything as watched yet.</p>
                )}
              </div>
            </div>
          )}

          {/* 2. WATCHLIST (WANT TO WATCH) VIEW */}
          {currentView === "watchlist" && (
            <div className="p-10 animate-in fade-in slide-in-from-bottom-2">
              <div className="flex items-center gap-3 mb-8">
                <Heart className="text-red-600 fill-red-600" size={24} />
                <h1 className="text-4xl font-black uppercase tracking-tighter">My Watchlist</h1>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8">
                {watchlist.length > 0 ? (
                  watchlist.map((m: any) => <MovieCard key={m.id} movie={m} />)
                ) : (
                  <p className="col-span-full text-center py-20 text-neutral-600 italic">Your watchlist is empty. Go find something to watch!</p>
                )}
              </div>
            </div>
          )}

          {/* 3. HOME / DISCOVERY / SEARCH VIEW */}
          {currentView === "home" && (
            <>
              {searchQuery || selectedGenre || selectedYear || selectedRating ? (
                /* SEARCH RESULTS GRID */
                <section className="p-10 animate-in fade-in slide-in-from-bottom-2">
                  <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8">
                    {searchResults.map((m: any) => <MovieCard key={m.id} movie={m} />)}
                  </div>
                </section>
              ) : (
                /* DEFAULT DASHBOARD */
                <div className="animate-in fade-in duration-1000">
                  {heroMovie && (
                    <div className="relative h-[65vh] w-full flex items-center px-12 overflow-hidden">
                      <div className="absolute inset-0">
                        <img src={`https://image.tmdb.org/t/p/original${heroMovie.backdrop_path}`} className="w-full h-full object-cover" alt="" />
                        <div className="absolute inset-0 bg-linear-to-r from-[#141414] via-transparent to-transparent" />
                        <div className="absolute inset-0 bg-linear-to-t from-[#141414] via-transparent to-transparent" />
                      </div>
                      <div className="relative z-10 max-w-xl space-y-4">
                        <h1 className="text-5xl font-black uppercase tracking-tighter leading-none drop-shadow-2xl">{heroMovie.title || heroMovie.name}</h1>
                        <p className="text-xs text-neutral-300 line-clamp-2 max-w-sm uppercase tracking-widest drop-shadow-md">{heroMovie.overview}</p>
                        <div className="flex gap-3 pt-4">
                          <button className="bg-white text-black px-8 py-3 rounded font-bold text-xs flex items-center gap-2 hover:bg-neutral-200 transition shadow-xl"><Play size={14} fill="black" /> PLAY</button>
                        </div>
                      </div>
                    </div>
                  )}
                  <div className="relative z-20 px-12 -mt-16 space-y-12 pb-20">
                    <MovieRow title="Trending Now" movies={trending} />
                    <MovieRow title="Popular Picks" movies={popular} />
                    <MovieRow title="Top Rated" movies={topRated} />
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </main>
    </div>
  );
}