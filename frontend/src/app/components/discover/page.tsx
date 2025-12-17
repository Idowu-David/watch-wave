'use client';

import { useEffect, useState } from "react";
import Navbar from "../common/Navbar";
import Row from "../common/Row";
import ResultCard from "../common/ResultCard";
import { TMDB_API_KEY, TMDB_BASE_URL } from "@/lib/tmdb";

export default function DiscoverPage() {
  const [query, setQuery] = useState("");

  const [trending, setTrending] = useState<any[]>([]);
  const [newReleases, setNewReleases] = useState<any[]>([]);
  const [topRated, setTopRated] = useState<any[]>([]);
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchDiscovery();
  }, []);

  async function fetchDiscovery() {
    const [trendRes, newRes, topRes] = await Promise.all([
      fetch(`${TMDB_BASE_URL}/trending/all/week?api_key=${TMDB_API_KEY}`),
      fetch(`${TMDB_BASE_URL}/movie/now_playing?api_key=${TMDB_API_KEY}`),
      fetch(`${TMDB_BASE_URL}/movie/top_rated?api_key=${TMDB_API_KEY}`)
    ]);

    const trendData = await trendRes.json();
    const newData = await newRes.json();
    const topData = await topRes.json();

    setTrending(trendData.results);
    setNewReleases(newData.results.map((m: any) => ({ ...m, media_type: "movie" })));
    setTopRated(topData.results.map((m: any) => ({ ...m, media_type: "movie" })));
  }

  useEffect(() => {
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }

    const delay = setTimeout(() => search(query), 400);
    return () => clearTimeout(delay);
  }, [query]);

  async function search(text: string) {
    setLoading(true);

    const res = await fetch(
      `${TMDB_BASE_URL}/search/multi?api_key=${TMDB_API_KEY}&query=${text}`
    );

    const data = await res.json();
    setSearchResults(
      data.results.filter((i: any) => i.media_type === "movie" || i.media_type === "tv")
    );

    setLoading(false);
  }

  return (
    <>
      <Navbar query={query} setQuery={setQuery} />

      <div className="p-6 text-white">
        {query ? (
          <>
            {loading && <p>Searching...</p>}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
              {searchResults.map((item) => (
                <ResultCard key={item.id} item={item} />
              ))}
            </div>
          </>
        ) : (
          <>
            <Row title="Trending" items={trending} />
            <Row title="New Releases" items={newReleases} />
            <Row title="Top Rated" items={topRated} />
          </>
        )}
      </div>
    </>
  );
}
