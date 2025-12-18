"use client";

import { Play, Plus, Check, Heart, Star } from "lucide-react";
import { useWatchlist } from "../context/WatchlistContext";

export default function MovieCard({ movie }: { movie: any }) {
  const { toggleWatchlist, isInWatchlist } = useWatchlist();
  
  if (!movie.poster_path) return null;

  const saved = isInWatchlist(movie.id);
  const rating = movie.vote_average ? (movie.vote_average / 2).toFixed(1) : "0.0";
  const starCount = Math.round(movie.vote_average / 2);

  return (
    <div className="group/item relative cursor-pointer w-full">
      <div className="relative rounded-md overflow-hidden shadow-2xl border border-white/5 transition-transform duration-300 group-hover/item:scale-105 bg-neutral-900">
        <img
          src={`https://image.tmdb.org/t/p/w342${movie.poster_path}`}
          alt={movie.title}
          className="w-full h-auto object-cover transition-all duration-300 group-hover/item:brightness-[0.3]"
        />
        
        {/* Rating Badge */}
        <div className="absolute top-2 right-2 z-20 bg-black/80 backdrop-blur-md px-2 py-1 rounded flex items-center gap-1 border border-white/10 opacity-0 group-hover/item:opacity-100 transition-opacity">
          <Star size={10} className="fill-yellow-500 text-yellow-500" />
          <span className="text-[10px] font-black">{rating}</span>
        </div>

        {/* ACTIONS */}
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 opacity-0 group-hover/item:opacity-100 transition-opacity duration-300 z-10">
          <div className="flex gap-2">
            <button className="p-2 bg-white rounded-full hover:bg-red-600 transition group/btn shadow-xl">
              <Play size={14} fill="black" className="group-hover/btn:fill-white" />
            </button>
            
            {/* WATCHLIST TOGGLE BUTTON */}
            <button 
              onClick={(e) => {
                e.stopPropagation(); // Prevents clicking the movie card itself
                toggleWatchlist(movie);
              }}
              className={`p-2 rounded-full border transition shadow-xl ${
                saved ? "bg-red-600 border-red-600 text-white" : "bg-neutral-900/90 border-white/20 text-white hover:border-white"
              }`}
            >
              {saved ? <Check size={14} /> : <Plus size={14} />}
            </button>
          </div>
        </div>
      </div>

      <div className="mt-2 space-y-1">
        <p className="text-[10px] font-bold truncate text-neutral-500 uppercase tracking-tighter group-hover/item:text-white transition-colors">
          {movie.title || movie.name}
        </p>
        <div className="flex gap-0.5">
          {[...Array(5)].map((_, i) => (
            <Star key={i} size={10} className={i < starCount ? "fill-yellow-500 text-yellow-500" : "text-neutral-800"} />
          ))}
        </div>
      </div>
    </div>
  );
}