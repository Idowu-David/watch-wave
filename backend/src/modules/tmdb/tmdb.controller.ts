import { type Request, type Response } from "express";
import * as tmdbService from "./tmdb.service";

interface TmdbResponse {
  page: number;
  results: any[];
  total_pages: number;
  total_results: number;
}

export async function getMoviesByCategory(req: Request, res: Response) {
  const { category } = req.params;
  const page = parseInt(req.query.page as string) || 1;

  try {
    let data;

    // ARCHITECT FIX: Route traffic based on the category name
    if (category === "trending") {
      // TMDB has a specific URL structure for trending
      data = await tmdbService.getTrendingMovies(page);
    } else {
      // For 'top_rated', 'upcoming', 'popular' -> they all fit /movie/:category
      data = await tmdbService.getMoviesByCategory(category, page);
    }

    res.json({
      success: true,
      page: data.page,
      results: data.results,
      total_pages: data.total_pages,
    });
  } catch (error) {
    console.error(`Error fetching ${category}:`, error);
    res.status(500).json({
      message: `Failed to fetch ${category} movies from TMDB`,
    });
  }
}

export async function getsearchMovies(req: Request, res: Response) {
  try {
    // 1. Extract the query string (e.g., ?query=batman)
    const query = req.query.query as string;
    const page = parseInt(req.query.page as string) || 1;

    if (!query) {
      return res.status(400).json({ message: "Search query is required" });
    }

    // 2. Call the CORRECT service method
    const data = (await tmdbService.searchMovies(query, page)) as TmdbResponse;

    res.json({
      success: true,
      page: data.page,
      total_pages: data.total_pages,
      results: data.results,
    });
  } catch (error) {
    console.log("TMDB Search Error: ", error);
    res.status(500).json({
      message: "Failed to search movies",
    });
  }
}

// Keep getDiscoverController as is...
export async function getDiscoverController(req: Request, res: Response) {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const data = (await tmdbService.getDiscoverMovies(page)) as TmdbResponse;
    res.json({ success: true, ...data });
  } catch (error) {
    res.status(500).json({ message: "Failed to discover movies" });
  }
}
