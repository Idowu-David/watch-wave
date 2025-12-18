"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const watchlist_1 = __importDefault(require("../models/watchlist"));
const auth_1 = require("../middlewares/auth");
const router = express_1.default.Router();
// post a new watchlist item
router.post("/create", auth_1.authenticate, async (req, res) => {
    try {
        // console.log("REQ BODY:", req.body);
        const { tmdbId, title, status, posterUrl, rating, personalNotes } = req.body;
        const userId = req.user?.id;
        if (!tmdbId || !title || !status || !posterUrl) {
            return res.status(400).json({
                message: "Missing required fields: tmdbId, title, status, posterUrl",
            });
        }
        if (!userId) {
            return res.status(401).json({
                message: "Unauthorized: User ID not found",
            });
        }
        const watchlistItem = await watchlist_1.default.create({
            userId,
            tmdbId,
            title,
            status,
            posterUrl,
            rating,
            personalNotes,
        });
        return res.status(201).json({
            message: "Watchlist item created",
            data: watchlistItem,
        });
    }
    catch (error) {
        console.error("CREATE WATCHLIST ERROR:", error);
        return res.status(500).json({
            message: "Server error",
            error,
        });
    }
});
// get all watchlist items for a user
router.get("/getWatchList", auth_1.authenticate, async (req, res) => {
    try {
        const userId = req.user?.id;
        if (!userId) {
            return res.status(401).json({
                message: "Unauthorized: User ID not found",
            });
        }
        const watchlistItems = await watchlist_1.default.findAll({ where: { userId } });
        return res.status(200).json({
            message: "Watchlist items retrieved",
            data: watchlistItems,
        });
    }
    catch (error) {
        console.error("GET WATCHLIST ERROR:", error);
        return res.status(500).json({
            message: "Server error",
            error,
        });
    }
});
// to get either watched or want_to_watch items
router.get("/getWatchListStatus", auth_1.authenticate, async (req, res) => {
    try {
        const userId = req.user?.id;
        if (!userId) {
            return res.status(401).json({
                message: "Unauthorized: User ID not found",
            });
        }
        const { status } = req.query;
        if (status !== "watched" && status !== "want_to_watch") {
            return res.status(400).json({
                message: "Invalid status. Must be 'watched' or 'want_to_watch'.",
            });
        }
        const watchlistItems = await watchlist_1.default.findAll({
            where: { userId, status },
        });
        return res.status(200).json({
            message: "Watchlist items retrieved",
            data: watchlistItems,
        });
    }
    catch (error) {
        return res.status(500).json({
            message: "Server error",
            error,
        });
    }
});
// to put update on watchlist item
router.put("/update/:id", auth_1.authenticate, async (req, res) => {
    try {
        const userId = req.user?.id;
        const watchlistItemId = req.params.id;
        const { status, rating, personalNotes } = req.body;
        if (!userId) {
            return res.status(401).json({
                message: "Unauthorized: User ID not found",
            });
        }
        const watchlistItem = await watchlist_1.default.findByPk(watchlistItemId);
        if (!watchlistItem) {
            return res.status(404).json({
                message: "Watchlist item not found",
            });
        }
        // Ensure the authenticated user owns this item
        // if (watchlistItem.userId !== userId) {
        //     return res.status(403).json({ message: "Forbidden: you do not own this watchlist item" });
        // }
        // Validate inputs
        if (status !== undefined && status !== "watched" && status !== "want_to_watch") {
            return res.status(400).json({ message: "Invalid status. Must be 'watched' or 'want_to_watch'." });
        }
        const num = Number(rating);
        if (Number.isNaN(num) || num < 0 || num > 10) {
            return res.status(400).json({ message: "Invalid rating. Must be a number between 0 and 10." });
        }
        // Preserve valid falsy values using nullish coalescing
        watchlistItem.status = status ?? watchlistItem.status;
        watchlistItem.rating = rating ?? watchlistItem.rating;
        watchlistItem.personalNotes = personalNotes ?? watchlistItem.personalNotes;
        await watchlistItem.save();
        return res.status(200).json({
            message: "Watchlist item updated",
            data: watchlistItem,
        });
    }
    catch (error) {
        console.error("UPDATE WATCHLIST ERROR:", error);
        return res.status(500).json({
            message: "Server error",
            error,
        });
    }
});
// to delete a watchlist item
router.delete("/delete/:id", auth_1.authenticate, async (req, res) => {
    try {
        const userId = req.user?.id;
        const watchlistItemId = req.params.id;
        if (!userId) {
            return res.status(401).json({
                message: "Unauthorized: User ID not found",
            });
        }
        const watchlistItem = await watchlist_1.default.findByPk(watchlistItemId);
        if (!watchlistItem) {
            return res.status(404).json({
                message: "Watchlist item not found",
            });
        }
        // Ensure the authenticated user owns this item
        // if(watchlistItem.userId !== userId){
        //     return res.status(403).json({ message: "Forbidden: you do not own this watchlist item" });
        // }
        await watchlistItem.destroy();
        return res.status(200).json({
            message: "Watchlist item deleted",
        });
    }
    catch (error) {
        console.error("DELETE WATCHLIST ERROR:", error);
        return res.status(500).json({
            message: "Server error",
            error,
        });
    }
});
exports.default = router;
