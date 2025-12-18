"use client";

import { useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import MovieCard from "./MovieCard";

export default function MovieRow({ title, movies }: { title: string; movies: any[] }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [showButtons, setShowButtons] = useState(false);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollTo = direction === "left" ? scrollLeft - clientWidth * 0.8 : scrollLeft + clientWidth * 0.8;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
    }
  };

  if (!movies.length) return null;

  return (
    <div className="space-y-3 group relative" onMouseEnter={() => setShowButtons(true)} onMouseLeave={() => setShowButtons(false)}>
      <h2 className="text-sm font-bold text-gray-400 group-hover:text-white transition px-2 uppercase tracking-widest">{title}</h2>
      <div className="relative flex items-center">
        <button onClick={() => scroll("left")} className={`absolute left-0 z-40 h-[80%] w-10 bg-black/70 hover:bg-red-600 transition-all duration-300 flex items-center justify-center rounded-r-md ${showButtons ? "opacity-100" : "opacity-0 invisible"}`}><ChevronLeft size={24} /></button>
        <div ref={scrollRef} className="flex gap-6 overflow-x-auto scrollbar-hide scroll-smooth px-2 py-4">
          {movies.map((movie) => (
            <div key={movie.id} className="min-w-35 md:min-w-45">
              <MovieCard movie={movie} />
            </div>
          ))}
        </div>
        <button onClick={() => scroll("right")} className={`absolute right-0 z-40 h-[80%] w-10 bg-black/70 hover:bg-red-600 transition-all duration-300 flex items-center justify-center rounded-l-md ${showButtons ? "opacity-100" : "opacity-0 invisible"}`}><ChevronRight size={24} /></button>
      </div>
    </div>
  );
}