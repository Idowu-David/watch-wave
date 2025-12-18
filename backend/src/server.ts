import * as dotenv from "dotenv";
dotenv.config();

import express, { type Request, type Response, Application } from "express";
import cors from "cors";
import sequelize from "./config/db";

import "./models/user";
import "./models/watchlist";

import authRoutes from "./routes/auth";
import tmdbRoutes from "./routes/tmdb";
import watchlistRoutes from "./routes/watchlist";

const app: Application = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: "*", // Allows all origins — change to your frontend URL in production
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("API is Live!!!");
});

app.use("/api/tmdb", tmdbRoutes);
app.use("/api/watchlist", watchlistRoutes);
app.use("/auth", authRoutes);
app.use("/watchlist", watchlistRoutes);

async function startServer() {
  try {
    await sequelize.authenticate();
    console.log("Database connected successfully.");

    await sequelize.sync({ alter: true });
    console.log("Models synced");

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error("Server failed to start:", err);
    process.exit(1);
  }
}

startServer();