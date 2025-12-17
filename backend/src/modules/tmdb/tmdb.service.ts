import axios from "axios";

export const getTopRatedMovies = async (page: number = 1) => {
  const response = await axios.get(
    `${process.env.TMDB_BASE_URL}/movie/top_rated`,
    {
      params: {
        api_key: process.env.TMDB_API_KEY,
        page,
      },
    }
  );
  return response.data;
};

export const getTrendingMovies = async (time: 'day' | 'week' = 'day') => {
	
}

export const getDiscoverMovies = async (page: number = 1) => {
  const response = await axios.get(
    `${process.env.TMDB_BASE_URL}/discover/movie`,
    {
      params: {
        api_key: process.env.TMDB_API_KEY,
        sort_by: "popularity.desc",
        page: page,
      },
    }
  );
  console.log("TMDB RESPONSE: ", response);
  return response.data;
};
