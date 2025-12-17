import * as dotenv from "dotenv";
dotenv.config();

import express, { type Request, type Response, Application } from "express";
import cors from "cors";
import sequelize from "./config/db";
import statsRoutes from "./modules/stats/stats.routes";

// IMPORTANT: model side-effect imports
import "./models/user";
import "./models/watchlist";

const app: Application = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use("/stats", statsRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("API is Live!!!");
});

async function startServer() {
  try {
    await sequelize.authenticate();
    console.log("✅ Database connected successfully.");

    await sequelize.sync({ alter: true });
    console.log("✅ Models synced:", Object.keys(sequelize.models));

    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error("❌ Server failed to start:", err);
    process.exit(1);
  }
}

startServer();
