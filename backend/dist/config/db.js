"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const isProduction = process.env.NODE_ENV === "production";
const sequelize = process.env.DATABASE_URL
    ? new sequelize_1.Sequelize(process.env.DATABASE_URL, {
        dialect: "postgres",
        logging: false,
        dialectOptions: {
            ssl: {
                require: true,
                rejectUnauthorized: false,
            },
        },
    })
    : new sequelize_1.Sequelize(process.env.DATABASE_NAME, process.env.DATABASE_USER, process.env.DATABASE_PASSWORD, {
        host: process.env.DATABASE_HOST,
        port: parseInt(process.env.DB_PORT),
        dialect: "postgres",
        logging: false,
        define: {
            timestamps: true,
            underscored: true,
        },
    });
exports.default = sequelize;
