import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/db";
import User from "./user";

class Watchlist extends Model {
  id: string;
  userId: string;
  tmdbId: number;
  title: string;
  posterUrl: string;
  status: "watched" | "want_to_watch";
  rating: number | null;
  personalNotes: string | null;
  readonly createdAt: Date;
  readonly updatedAt: Date;
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

// Define the Association
User.hasMany(Watchlist, {
  foreignKey: "userId",
  as: "watchlistItems",
  onDelete: "CASCADE",
});
Watchlist.belongsTo(User, { foreignKey: "userId", as: "user" });

export default Watchlist;
