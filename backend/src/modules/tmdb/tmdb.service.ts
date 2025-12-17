import axios from "axios";
import { TMDBResponse, Movie } from "./tmdb.types";

export async function getDiscoverMovies(
  page: number
): Promise<TMDBResponse<Movie>> {
  const response = await axios.get<TMDBResponse<Movie>>(
    `${process.env.TMDB_BASE_URL}/discover/movie`,
    {
      params: {
        api_key: process.env.TMDB_API_KEY,
        page,
      },
    }
  );

  return response.data;
}
