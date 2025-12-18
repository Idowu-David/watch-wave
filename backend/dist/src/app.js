"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sequelize = void 0;
const user_1 = __importDefault(require("./models/user"));
const watchlist_1 = __importDefault(require("./models/watchlist"));
const db_1 = __importDefault(require("./config/db"));
exports.sequelize = db_1.default;
const models = {
    User: user_1.default,
    Watchlist: watchlist_1.default
};
exports.default = models;
