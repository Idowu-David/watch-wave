"use client";

import { Play, Plus, Check, Heart } from "lucide-react";

export default function MovieCard({ movie }: { movie: any }) {
  if (!movie.poster_path) return null;

  return (
    <div className="group/item relative cursor-pointer w-full">
      <div className="relative rounded-md overflow-hidden shadow-2xl border border-white/5 transition-transform duration-300 group-hover/item:scale-105 bg-neutral-900">
        <img
          src={`https://image.tmdb.org/t/p/w342${movie.poster_path}`}
          alt={movie.title}
          className="w-full h-auto object-cover transition-all duration-300 group-hover/item:brightness-50"
        />
        {/* ACTION OVERLAY */}
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 opacity-0 group-hover/item:opacity-100 transition-opacity duration-300 z-10">
          <div className="flex gap-2">
            <button className="p-2 bg-white rounded-full hover:bg-red-600 transition group/btn shadow-xl"><Play size={14} fill="black" className="group-hover/btn:fill-white" /></button>
            <button className="p-2 bg-neutral-900/90 border border-white/20 rounded-full hover:border-white transition shadow-xl"><Plus size={14} /></button>
          </div>
          <div className="flex gap-2">
            <button className="p-2 bg-neutral-900/90 border border-white/20 rounded-full hover:border-green-500 hover:text-green-500 transition shadow-xl"><Check size={14} /></button>
            <button className="p-2 bg-neutral-900/90 border border-white/20 rounded-full hover:border-red-500 hover:text-red-500 transition shadow-xl"><Heart size={14} /></button>
          </div>
        </div>
      </div>
      <p className="mt-2 text-[10px] font-bold truncate text-neutral-500 uppercase tracking-tighter group-hover/item:text-white transition-colors">
        {movie.title || movie.name}
      </p>
    </div>
  );
}