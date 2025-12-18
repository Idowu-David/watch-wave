import * as dotenv from "dotenv";
dotenv.config();

import express, { type Request, type Response, Application } from "express";
import cors from "cors";
import sequelize from "./config/db";

import "./models/user";
import "./models/watchlist";
import authRoutes from "./routes/auth";
import tmdbRoutes from './routes/tmdb'
import watchlistRoutes from "./routes/watchlist";

const app: Application = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("API is Live!!!");
});

app.use('/api/tmdb', tmdbRoutes)
app.use('/api/watchlist', watchlistRoutes)


app.get("/", (req: Request, res: Response) => {
  res.send("API is Live!!!");
});

async function startServer() {
  try {
    await sequelize.authenticate();
    console.log("✅ Database connected successfully.");

    await sequelize.sync();
    console.log("✅ Models synced:", Object.keys(sequelize.models));

    app.use("/auth", authRoutes);
    app.use("/watchlist", watchlistRoutes);

    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error("❌ Server failed to start:", err);
    process.exit(1);
  }
}

startServer();
