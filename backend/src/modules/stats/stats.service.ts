import { Op, fn, col, literal } from "sequelize";
import Watchlist from "../../models/watchlist";

class StatsService {
    static async getTotalWatched(userId: number){
        return Watchlist.count({
            where: {
                userId,
                status: "watched",
            },
        });
    }

    static async getGenreBreakdown(userId: number){
        const results = await Watchlist.findAll({
            where: {
                userId,
                status: "watched",
                genre: { [Op.ne]: null },
            },
            attributes: [
                [literal("unnest(genre)"), "genre"],
                [fn("COUNT", col("genre")), "count"],
            ],
            group: [col("genre")],
        });
        return results;
    }

    static async getAverageRating(userId: number) {
  const result: any = await Watchlist.findOne({
    where: {
      userId,
      status: "watched",
      rating: { [Op.ne]: null },
    },
    attributes: [[fn("AVG", col("rating")), "average"]],
    raw: true,
  });

  return Number(result?.average || 0);
}

static async getTotalRuntime(userId: number) {
  const result: any = await Watchlist.findOne({
    where: {
      userId,
      status: "watched",
      runtime: { [Op.ne]: null },
    },
    attributes: [[fn("SUM", col("runtimeMinutes")), "totalMinutes"]],
    raw: true,
  });

  return Number(result?.total || 0);
}
}

export default StatsService;