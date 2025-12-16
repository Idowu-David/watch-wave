import express, { type Request, type Response, Application } from "express";
import cors from "cors";
import * as dotenv from "dotenv";
import sequelize, { connectDB } from "./config/db";

import User from "./modules/auth/user.model";
import Watchlist from "./modules/watchlist/watchlist.model";

dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// --- ROUTES WILL BE ADDED HERE ---
// import authRoutes from './modules/auth/auth.routes';
// app.use('/api/auth', authRoutes);

app.get('/', (req: Request, res: Response) => {
	res.send('API is Live!!!')
})

async function startServer() {
  await connectDB();

  // Create tables based on the models. Use { alter: true } to update schema non-destructively
  await sequelize.sync({ alter: true });
  console.log("✅ Database models synchronized with PostgreSQL (Sequelize).");

  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
