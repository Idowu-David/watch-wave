import { Router } from "express";
import StatsController from "./stats.controller";
//import authMiddleware from "../../middleware/auth";

const router = Router();

router.get(
  "/dashboard",
  //authMiddleware,
  StatsController.getDashboard
);

export default router;