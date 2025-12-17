import express from "express";
import { Request, Response } from "express";
import Watchlist from "../models/watchlist";

const router = express.Router();

// post a new watchlist item
router.post("/create", async (req: Request, res: Response) => {
  try {
    console.log("REQ BODY:", req.body);

    const { userId, tmdbId, title, status, posterUrl, rating, personalNotes } = req.body;

        if (!userId || !tmdbId || !title || !status || !posterUrl) {
        return res.status(400).json({
            message: "Missing required fields: userId, tmdbId, title, status, posterUrl"
        });
        }

        const watchlistItem = await Watchlist.create({
            userId,
            tmdbId,
            title,
            status,
            posterUrl,
            rating,
            personalNotes
        });

        return res.status(201).json({
        message: "Watchlist item created",
        data: watchlistItem,
        });
    } catch (error) {
        console.error("CREATE WATCHLIST ERROR:", error);
        return res.status(500).json({
        message: "Server error",
        error,
    });
  }
});

export default router;