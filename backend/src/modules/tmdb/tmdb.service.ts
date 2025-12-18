import axios from "axios";

const TMDB_BASE_URL = process.env.TMDB_BASE_URL;
const TMDB_API_KEY = process.env.TMDB_API_KEY;

// 1. Fixed: Search now accepts a QUERY string
export const searchMovies = async (query: string, page: number = 1) => {
  const response = await axios.get(`${TMDB_BASE_URL}/search/movie`, {
    params: {
      api_key: TMDB_API_KEY,
      query: query, // Pass the search term to TMDB
      page: page,
    },
  });
  return response.data;
};

// 2. Fixed: Trending now accepts a PAGE
export const getTrendingMovies = async (page: number = 1) => {
  const response = await axios.get(`${TMDB_BASE_URL}/trending/movie/week`, {
    params: {
      api_key: TMDB_API_KEY,
      page: page,
    },
  });
  return response.data;
};

// 3. Generic Category Fetcher (for 'top_rated', 'upcoming', 'popular')
export const getMoviesByCategory = async (
  category: string,
  page: number = 1
) => {
  const response = await axios.get(`${TMDB_BASE_URL}/movie/${category}`, {
    params: {
      api_key: TMDB_API_KEY,
      page: page,
    },
  });
  return response.data;
};

// 4. Discover
export const getDiscoverMovies = async (page: number = 1) => {
  const response = await axios.get(`${TMDB_BASE_URL}/discover/movie`, {
    params: { api_key: TMDB_API_KEY, page: page },
  });
  return response.data;
};
