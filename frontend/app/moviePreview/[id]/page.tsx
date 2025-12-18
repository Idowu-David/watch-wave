"use client";
import { useWatchlist } from "@/context/WatchlistContext";
import { useParams } from "next/navigation";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Plus, Star, Check } from "lucide-react";
 



export default function MoviePreviewPage() {
  const params = useParams();
  const movieId = params.id as string;

  const [movie, setMovie] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [cast, setCast] = useState<any[]>([]);
  

  const { toggleWatchlist, toggleWatched, isInWatchlist, isWatched } = useWatchlist()
  const addedToList = movie ? isInWatchlist(movie.id) : false;
  const alreadyWatched = movie ? isWatched(movie.id) : false;

  useEffect(() => {
    async function fetchMovie() {
      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/movie/${movieId}?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`
        );
        const data = await res.json();
        setMovie(data);
      } catch (err) {
        console.error("Failed to fetch movie details", err);
      } finally {
        setLoading(false);
      }
    }

    fetchMovie();
  }, [movieId]);

  useEffect(() => {
    async function fetchCast() {
      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`
        );
        const data = await res.json();
        setCast(data.cast?.slice(0, 6) || []);
      } catch (err) {
        console.error("Failed to fetch cast", err);
      }
    }
  
    fetchCast();
  }, [movieId]);
  


  if (loading) {
    return (
      <p className="text-center text-gray-400 mt-10">
        Loading movie details...
      </p>
    );
  }

  if (!movie || movie.success === false) {
    return (
      <p className="text-center text-gray-200 mt-10">
        Movie not found.
      </p>
    );
  }

  
  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4 py-8">
      <div className="max-w-4xl w-full bg-gray-800 border border-gray-700 rounded-xl shadow-xl p-6">

        <Link href="/search" className="text-red-500 mb-5 inline-block">
          Back to Search
        </Link>

        <div className="flex flex-col md:flex-row gap-6">

          {/* Poster */}
          <div className="w-full md:w-1/3 h-72">
            <img
              src={
                movie.poster_path
                  ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                  : "/placeholder.png"
              }
              alt={movie.title}
              className="w-full h-full object-contain rounded-lg shadow-lg"
            />
          </div>

          {/* Details */}
          <div className="w-full md:w-2/3 text-gray-200">
            <h1 className="text-2xl font-bold mb-2">
              {movie.title} ({movie.release_date?.slice(0, 4)})
            </h1>

            <div className="flex items-center gap-2 text-sm text-gray-400 mb-3">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              {movie.vote_average?.toFixed(1)}
            </div>

            <p className="text-sm text-gray-400 mb-4">
              {movie.genres?.map((g: any) => g.name).join(" / ")}
            </p>

            <h2 className="text-lg font-semibold mb-2">Description</h2>
            <p className="text-gray-300 mb-6">
              {movie.overview || "No description available."}
            </p>

            <h2 className="text-lg font-semibold mb-2">Cast</h2>

            {cast.length === 0 ? (
              <p className="text-gray-400 mb-4">Cast information not available.</p>
            ) : (
              <ul className="grid grid-cols-2 gap-2 text-gray-300 mb-6">
                {cast.map((actor) => (
                  <li key={actor.id}>
                    {actor.name}
                    <span className="text-gray-500 text-sm">
                      {" "}as {actor.character}
                    </span>
                  </li>
                ))}
              </ul>
            )}


            <div className="flex gap-3">
              {/* My List Button */}
                    <button
                      onClick={() => toggleWatchlist(movie)}
                      className={`flex items-center px-3 py-2 rounded-md transition-colors ${
                        addedToList
                          ? "bg-green-600 text-white hover:bg-green-700"
                          : "bg-gray-600 text-white hover:bg-gray-500"
                      }`}
                    >
                      {addedToList ? <Check className="w-4 h-4 mr-1" /> : <Plus className="w-4 h-4 mr-1" />}
                      {addedToList ? "Added" : "My List"}
                    </button>

                    {/* Watched Button */}
                    <button
                      onClick={() => toggleWatched(movie)}
                      className={`flex items-center px-3 py-2 rounded-md transition-colors ${
                        alreadyWatched
                          ? "bg-green-600 text-white hover:bg-green-700"
                          : "bg-gray-600 text-white hover:bg-gray-500"
                      }`}
                    >
                      {alreadyWatched ? <Check className="w-4 h-4 mr-1" /> : null}
                      Watched
                    </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
