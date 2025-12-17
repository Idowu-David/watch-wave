import { type Request, type Response } from "express";
import * as tmdbService from "./tmdb.service";
import axios from "axios";

export async function getMoviesByCategory(req: Request, res: Response) {
  const { category } = req.params;
  const page = parseInt(req.query.page as string) || 1;

  try {
    const response = await axios.get(
      `${process.env.TMDB_BASE_URL}/movie/${category}`,
      {
        params: {
          api_key: process.env.TMDB_API_KEY,
          page,
        },
      }
    );
    res.json(response.data);
  } catch (error) {
    res.status(500).json({
      message: `Failed to fetch ${category} movies from TMDB`,
    });
  }
};


export async function getDiscoverController(req: Request, res: Response) {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const data = await tmdbService.getDiscoverMovies(page);

    res.json({
      success: true,
      page: data.page,
      total_pages: data.total_pages,
      results: data.results,
    });
  } catch (error) {
    console.log("TMDB Discover Error: ", error);
    res.status(500).json({
      message: "Failed to fetch movies from TMDB",
    });
  }
}

export async function getsearchMovies(req: Request, res: Response) {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const data = await tmdbService.getDiscoverMovies(page);

    res.json({
      success: true,
      page: data.page,
      total_pages: data.total_pages,
      results: data.results,
    });
  } catch (error) {
    console.log("TMDB Discover Error: ", error);
    res.status(500).json({
      message: "Failed to fetch movies from TMDB",
    });
  }
};
