import { Router } from "express";
import {
  getDiscoverController,
  getMoviesByCategory,
} from "../modules/tmdb/tmdb.controller";

const router = Router();

router.get("/discover", getDiscoverController);
router.get("/:category", getMoviesByCategory);

export default router;
