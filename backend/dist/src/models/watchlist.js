"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const db_1 = __importDefault(require("../config/db"));
const user_1 = __importDefault(require("./user"));
class Watchlist extends sequelize_1.Model {
}
Watchlist.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    userId: { type: sequelize_1.DataTypes.INTEGER, allowNull: false },
    tmdbId: { type: sequelize_1.DataTypes.INTEGER, allowNull: false },
    title: { type: sequelize_1.DataTypes.STRING, allowNull: false },
    posterUrl: { type: sequelize_1.DataTypes.STRING, allowNull: true },
    status: {
        type: sequelize_1.DataTypes.ENUM("watched", "want_to_watch"),
        allowNull: false,
    },
    rating: {
        type: sequelize_1.DataTypes.FLOAT,
        allowNull: true,
        validate: { min: 1, max: 10 },
    },
    personalNotes: { type: sequelize_1.DataTypes.TEXT, allowNull: true },
}, {
    sequelize: db_1.default,
    tableName: "watchlist",
    modelName: "Watchlist",
});
// Define the Association
user_1.default.hasMany(Watchlist, {
    foreignKey: "userId",
    as: "watchlistItems",
    onDelete: "CASCADE",
});
Watchlist.belongsTo(user_1.default, { foreignKey: "userId", as: "user" });
exports.default = Watchlist;
