import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../../config/db";
import User from "../auth/user.model";

export interface IWatchlist {
  id: string;
  userId: string;
  tmdbId: number;
  title: string;
  posterUrl: string;
  status: "watched" | "want_to_watch";
  rating: number | null;
  personalNotes: string | null;
}
interface WatchlistCreationAttributes
  extends Optional<IWatchlist, "id" | "rating" | "personalNotes"> {}

class Watchlist
  extends Model<IWatchlist, WatchlistCreationAttributes>
  implements IWatchlist
{
  public id!: string;
  public userId!: string;
  public tmdbId!: number;
  public title!: string;
  public posterUrl!: string;
  public status!: "watched" | "want_to_watch";
  public rating!: number | null;
  public personalNotes!: string | null;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Watchlist.init(
  {
    id: {
					type: DataTypes.INTEGER,
					primaryKey: true,
					autoIncrement: true,
					allowNull: false,
				},
    userId: { type: DataTypes.INTEGER, allowNull: false },
    tmdbId: { type: DataTypes.INTEGER, allowNull: false },
    title: { type: DataTypes.STRING, allowNull: false },
    posterUrl: { type: DataTypes.STRING, allowNull: true },
    status: {
      type: DataTypes.ENUM("watched", "want_to_watch"),
      allowNull: false,
    },
    rating: {
      type: DataTypes.FLOAT,
      allowNull: true,
      validate: { min: 1, max: 10 },
    },
    personalNotes: { type: DataTypes.TEXT, allowNull: true },
  },
  {
    sequelize,
    tableName: "watchlist",
    modelName: "Watchlist",
  }
);

User.hasMany(Watchlist, {
  foreignKey: "userId",
  as: "watchlistItems",
  onDelete: "CASCADE",
});
Watchlist.belongsTo(User, { foreignKey: "userId", as: "user" });

export default Watchlist;
