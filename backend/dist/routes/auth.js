"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
const user_1 = __importDefault(require("../models/user"));
dotenv_1.default.config();
const router = express_1.default.Router();
// Helper
const generateToken = (id) => {
    const secret = process.env.JWT_SECRET;
    if (!secret)
        throw new Error("Server configuration error: JWT_SECRET not set");
    return jsonwebtoken_1.default.sign({ id }, secret, {
        expiresIn: "1d",
    });
};
router.post("/signup", async (req, res) => {
    try {
        const { firstName, lastName, email, password } = req.body;
        if (!firstName || !lastName || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }
        const existingUser = await user_1.default.findOne({ where: { email } });
        if (existingUser) {
            return res.status(409).json({ message: "User already exists" });
        }
        const hashedPassword = await bcryptjs_1.default.hash(password, 10);
        const newUser = await user_1.default.create({
            firstName,
            lastName,
            email,
            password: hashedPassword,
        });
        return res.status(201).json({
            message: "User registered successfully",
            // Frontend should read this success message and redirect to /login
            user: {
                id: newUser.id,
                firstName: newUser.firstName,
                lastName: newUser.lastName,
                email: newUser.email,
            },
        });
    }
    catch (error) {
        return res
            .status(500)
            .json({ message: error.message || "Something went wrong" });
    }
});
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }
        const foundUser = await user_1.default.findOne({ where: { email } });
        if (!foundUser) {
            return res.status(400).json({ message: "Invalid credentials" });
        }
        const isPasswordValid = await bcryptjs_1.default.compare(password, foundUser.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: "Invalid credentials" });
        }
        // TOKEN IS GENERATED HERE ONLY
        const token = generateToken(foundUser.id.toString());
        return res.status(200).json({
            message: "User logged in successfully",
            token,
            user: {
                id: foundUser.id,
                firstName: foundUser.firstName,
                lastName: foundUser.lastName,
                email: foundUser.email,
            },
        });
    }
    catch (error) {
        return res
            .status(500)
            .json({ message: error.message || "Something went wrong" });
    }
});
exports.default = router;
