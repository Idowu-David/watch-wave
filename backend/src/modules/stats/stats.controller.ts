import { Request, Response } from "express";
import StatsService from "./stats.service";

class StatsController{
    static async getDashboard(req: Request & { user?: { id?: string } }, res: Response) {
  try {
    // assuming auth middleware sets req.user.id
    const userId = req.user?.id;

    // 1️⃣ Fetch raw stats
    const totalWatched = await StatsService.getTotalWatched(userId? Number(userId) : 0);
    const genres = await StatsService.getGenreBreakdown(userId? Number(userId) : 0);
    const averageRating = await StatsService.getAverageRating(userId ? Number(userId) : 0);
    const totalMinutes = await StatsService.getTotalRuntime(userId ? Number(userId) : 0);

    // 2️⃣ Genre percentages
    const totalGenresCount = genres.reduce(
      (sum: number, g: any) => sum + Number(g.count),
      0
    );

    const genreBreakdown = genres.map((g: any) => ({
      genre: g.genre,
      percentage:
        totalGenresCount === 0
          ? 0
          : Math.round((Number(g.count) / totalGenresCount) * 100),
    }));

    // 3️⃣ Convert time
    const days = Math.floor(totalMinutes / (60 * 24));
    const hours = Math.floor((totalMinutes % (60 * 24)) / 60);

    // 4️⃣ Final response
    return res.status(200).json({
      totalWatched,
      genreBreakdown,
      averageRating: Number(averageRating.toFixed(1)),
      timeSpent: {
        days,
        hours,
      },
    });
  } catch (error) {
    console.error("Dashboard error:", error);
    return res.status(500).json({
      message: "Failed to fetch dashboard statistics",
    });
  }
}
}
export default StatsController;