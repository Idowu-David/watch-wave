import express from "express";
import { Request, Response } from "express";
import Watchlist from "../models/watchlist";

const router = express.Router();

// post a new watchlist item
router.post("/watchlist", async (req: Request, res: Response) => {
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


// get all watchlist items for a user
router.get("/getWatchList/:userId", async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const watchlistItems = await Watchlist.findAll({ where: { userId } });
    return res.status(200).json({
      message: "Watchlist items retrieved",
      data: watchlistItems,
    });
  } catch (error) {
    console.error("GET WATCHLIST ERROR:", error);
    return res.status(500).json({   
        message: "Server error",
        error,
    });
  }
});

// to get either watched or want_to_watch items
router.get("/getWatchListStatus/:userId/", async (req: Request, res: Response) => {
    try {
        const { userId } = req.params;
        const { status } = req.query;

        if (status !== "watched" && status !== "want_to_watch") {
            return res.status(400).json({
                message: "Invalid status. Must be 'watched' or 'want_to_watch'."
            });
            
        }

        const watchlistItems = await Watchlist.findAll({ where: { userId, status } });

        return res.status(200).json({
            message: "Watchlist items retrieved",
            data: watchlistItems,
        })
    } catch (error) {
        return res.status(500).json({   
            message: "Server error",
            error,
        });
    }
})
export default router;