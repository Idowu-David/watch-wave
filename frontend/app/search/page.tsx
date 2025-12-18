"use client";

import { useWatchlist } from "@/context/WatchlistContext"; 
import { Plus, Star, Check } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";

interface SearchCardsProps {
  movies: any[];
  hasSearch: boolean;
  hasResults: boolean;
  recommended?: any[];
  toggleWatchlist: (movie: any) => void;
  toggleWatched: (movie: any) => void;
  isInWatchlist: (id: number) => boolean;
  isWatched: (id: number) => boolean;
}

const BACKEND_URL = "https://watch-wave-5es6.onrender.com";

function MovieCard({
  movie,
  toggleWatchlist,
  toggleWatched,
  isInWatchlist,
  isWatched,
}: {
  movie: any;
  toggleWatchlist: (movie: any) => void;
  toggleWatched: (movie: any) => void;
  isInWatchlist: (id: number) => boolean;
  isWatched: (id: number) => boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -8 }}
    >
      <Link href={`/moviePreview/${String(movie.id)}`}>
        <div className="h-full border border-gray-500 rounded-xl overflow-hidden shadow-sm hover:shadow-xl hover:shadow-gray-500/5">
          <div className="relative h-48 w-full overflow-hidden">
            <img
              src={
                movie.poster_path
                  ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                  : "/placeholder.png"
              }
              alt={movie.title}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="p-5">
            <div className="h-12">
            <h3 className="text-gray-50 mb-2 text-sm">{movie.title}</h3>
            </div>
            <div className="flex items-center space-x-1 mb-3">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span className="text-sm text-gray-400">{movie.vote_average?.toFixed(1)}</span>
              <span className="text-sm text-gray-400">({movie.release_date?.slice(0, 4)})</span>
            </div>

            <div className="flex justify-between gap-2">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  toggleWatchlist(movie);
                }}
                className={`flex items-center px-1 py-1 rounded-md transition-colors ${
                  isInWatchlist(Number(movie.id))
                    ? "bg-green-600 text-white hover:bg-green-700"
                    : "bg-gray-600 text-white hover:bg-gray-700"
                }`}
              >
                {isInWatchlist(Number(movie.id)) ? (
                  <Check className="w-4 h-4 mr-1" />
                ) : (
                  <Plus className="w-4 h-4 mr-1" />
                )}
                {isInWatchlist(Number(movie.id)) ? "Added" : "My List"}
              </button>

              <button
                onClick={(e) => {
                  e.preventDefault();
                  toggleWatched(movie);
                }}
                className={`flex items-center px-1 py-1 rounded-md transition-colors ${
                  isWatched(Number(movie.id))
                    ? "bg-green-600 text-white hover:bg-green-700"
                    : "bg-gray-600 text-white hover:bg-gray-700"
                }`}
              >
                {isWatched(Number(movie.id)) ? <Check className="w-4 h-4 mr-1" /> : null}
                Watched
              </button>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

function SearchCards({
  movies,
  hasSearch,
  hasResults,
  recommended,
  toggleWatchlist,
  toggleWatched,
  isInWatchlist,
  isWatched,
}: SearchCardsProps) {
  if (hasSearch && !hasResults) {
    return (
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center text-gray-400 mb-6">
          <h2 className="text-xl font-semibold mb-2">Movie not available 😕</h2>
          <p>Try searching for something else.</p>
        </div>

        {recommended && recommended.length > 0 && (
          <>
            <h3 className="text-xl font-semibold mb-4 text-gray-200">You might like these:</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-5">
              {recommended.map((movie) => (
                <MovieCard
                  key={movie.id}
                  movie={movie}
                  toggleWatchlist={toggleWatchlist}
                  toggleWatched={toggleWatched}
                  isInWatchlist={isInWatchlist}
                  isWatched={isWatched}
                />
              ))}
            </div>
          </>
        )}
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4">
      <h2 className="text-2xl font-semibold mb-6 text-gray-200">Popular Movies</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-5">
        {movies.map((movie) => (
          <MovieCard
            key={movie.id}
            movie={movie}
            toggleWatchlist={toggleWatchlist}
            toggleWatched={toggleWatched}
            isInWatchlist={isInWatchlist}
            isWatched={isWatched}
          />
        ))}
      </div>
    </div>
  );
}





export default function Search() {
  const [searchQuery, setSearchQuery] = useState("");
  const [movies, setMovies] = useState<any[]>([]);
  const [popularMovies, setPopularMovies] = useState<any[]>([]);
  const [recommended, setRecommended] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  

  const hasResults = movies.length > 0;
  const hasSearch = searchQuery.length >= 2;

  const { toggleWatchlist, toggleWatched, isInWatchlist, isWatched } = useWatchlist();

  // Fetch search results from backend
  async function fetchMovies(query: string) {
    if (!query.trim()) return;
    setLoading(true);
    try {
      const res = await fetch(`${BACKEND_URL}/api/tmdb/search?query=${encodeURIComponent(query)}`);
      const data = await res.json();
      const results = data.results || [];
      setMovies(results);

      if (results.length === 0) {
        fetchRecommended();
      }
    } catch (err) {
      console.error("Failed to fetch search results:", err);
    } finally {
      setLoading(false);
    }
  }

  async function fetchRecommended() {
    setLoading(true);
    try {
      const res = await fetch(`${BACKEND_URL}/api/tmdb/popular?page=1`);
      const data = await res.json();
      setRecommended(data.results || []);
    } catch (err) {
      console.error("Failed to fetch recommended movies:", err);
    } finally {
      setLoading(false);
    }
  }

  async function fetchPopular(pageNumber = 1) {
    setLoading(true);
    try {
      const res = await fetch(`${BACKEND_URL}/api/tmdb/popular?page=${pageNumber}`);
      const data = await res.json();
      setPopularMovies((prev) =>
        pageNumber === 1 ? data.results : [...prev, ...data.results]
      );
    } catch (err) {
      console.error("Failed to fetch popular movies:", err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (hasSearch) {
      const delay = setTimeout(() => {
        fetchMovies(searchQuery);
      }, 400);
      return () => clearTimeout(delay);
    }
  }, [searchQuery]);

  useEffect(() => {
    fetchPopular(1);
  }, []);

  useEffect(() => {
    function handleScroll() {
      const nearBottom =
        window.innerHeight + window.scrollY >= document.body.offsetHeight - 200;
      if (nearBottom && !loading && !hasSearch) {
        setPage((prev) => prev + 1);
      }
    }
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loading, hasSearch]);

  useEffect(() => {
    if (!hasSearch && page > 1) {
      fetchPopular(page);
    }
  }, [page, hasSearch]);

  const moviesToShow = hasSearch ? movies : popularMovies;

  return (
    <div className="space-y-6 p-5">
      <div>
        <h1 className="text-gray-50 text-3xl mb-2">Discover Movies</h1>
        <p className="text-gray-50">Browse and add movies to your watchlist</p>
      </div>

      <div className="relative flex items-center w-[500px] h-[40px] m-auto mb-5 border border-gray-200 rounded-md">
        <input
          type="text"
          placeholder="Search Movies..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="text-gray-50 border-0 focus:outline-none p-2 pl-9 w-full rounded-md"
        />
        <span className="absolute right-2">🔍</span>
      </div>

      <SearchCards
        movies={moviesToShow}
        hasSearch={hasSearch}
        hasResults={hasResults}
        recommended={recommended}
        toggleWatchlist={toggleWatchlist}
        toggleWatched={toggleWatched}
        isInWatchlist={isInWatchlist}
        isWatched={isWatched}
      />
    </div>
  );
}
