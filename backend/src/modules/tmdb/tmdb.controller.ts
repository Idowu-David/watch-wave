import { type Request, type Response } from "express";
import * as tmdbService from "./tmdb.service";

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
