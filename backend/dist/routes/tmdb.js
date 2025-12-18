"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const tmdb_controller_1 = require("../modules/tmdb/tmdb.controller");
const router = (0, express_1.Router)();
router.get("/discover", tmdb_controller_1.getDiscoverController);
router.get("/:category", tmdb_controller_1.getMoviesByCategory);
exports.default = router;
