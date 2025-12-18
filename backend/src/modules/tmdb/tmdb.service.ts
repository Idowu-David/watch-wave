import axios from "axios";

//get top rated movie
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

// get search movie
export const getsearchMovies = async (page: 1) => {
  const response = await axios.get(
    `${process.env.TMDB_BASE_URL}/search/movie`, {
      params: {
        api_key: process.env.TMDB_API_KEY,
        page: page
      }
    },
  );
  return response.data;
};
// get trending movie
export const getTrendingMovies = async (time: "day" | "week" = "day") => {
  const response = await axios.get(
    `${process.env.TMDB_BASE_URL}/trending/movie/${time}`,
    {
      params: {
        api_key: process.env.TMDB_API_KEY,
      },
    }
  );
  return response.data;
};

//watched movie
// export const getWatchedMovies = async (page: number = 1) => {
//   const response = await axios.get(
//   `${process.env.TMDB_BASE_URL}/watched/movie`, {
//     params: {
//       api_key: process.env.TMDB_API_KEY,
//       page: page
//     }
//   },
// );
// return response.data;
// };

// discover movie
export const getDiscoverMovies = async (page: number = 1) => {
  const response = await axios.get(
    `${process.env.TMDB_BASE_URL}/discover/movie`,
    {
      params: {
        api_key: process.env.TMDB_API_KEY,
        page: page,
      },
    }
  );
  console.log("TMDB RESPONSE: ", response);
  return response.data;
};
