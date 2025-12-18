"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticate = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authenticate = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).json({ message: "No Authorization header provided" });
    }
    const token = authHeader.startsWith("Bearer ")
        ? authHeader.split(" ")[1]
        : authHeader;
    if (!token) {
        return res.status(401).json({ message: "No token provided" });
    }
    const secret = process.env.JWT_SECRET;
    if (!secret) {
        return res
            .status(500)
            .json({ message: "Server configuration error: JWT_SECRET not set" });
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, secret);
        req.user = decoded;
        next();
    }
    catch (error) {
        return res.status(401).json({ message: "Unauthorized: Invalid token" });
    }
};
exports.authenticate = authenticate;
