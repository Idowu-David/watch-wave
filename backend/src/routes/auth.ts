import express, { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from "../modules/auth/user.model";

dotenv.config();

const router = express.Router();

router.post("/signup", async (req: Request, res: Response) => {
  const { firstName, lastName, email, password } = req.body;

  if (!firstName || !lastName || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }
  // 2. Check if user already exists
  const existingUser = await User.findOne({ where: { email } });

  if (existingUser) {
    return res
      .status(409)
      .json({ message: "User with this email already exists" });
  }

  // 3. Hash the password
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);

  // 4. Create the new user
  const newUser = await User.create({
    firstName: firstName,
    lastName: lastName,
    email: email,
    password: hashedPassword,
  });

  // 5. Generate JWT Token
  const token = jwt.sign(
    { id: newUser.id, email: newUser.email },
    process.env.JWT_SECRET || "default_secret",
    { expiresIn: "1d" }
  );

  // 6. Send Response
  return res.status(201).json({
    message: "User registered successfully",
    token,
    user: {
      id: newUser.id,
      email: newUser.email,
      firstName: newUser.firstName,
      lastName: newUser.lastName,
    },
  });
});

router.post("/login", async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const foundUser = await User.findOne({ where: { email } });
  if (!foundUser) {
    return res.status(400).json({ message: "User does not exist" });
  }
  const isPassword = await bcrypt.compare(password, foundUser.password);
  if (!isPassword) {
    return res.status(400).json({ message: "Invalid Password" });
  }

  const token = jwt.sign(
    { id: foundUser.id },
    process.env.JWT_SECRET || "default_secret",
    { expiresIn: "1d" }
  );

  return res.status(201).json({
    user: {
      id: foundUser.id,
      message: "User logged in successfully",
      firstName: foundUser.firstName,
      lastName: foundUser.lastName,
      email: foundUser.email,
    },
    token,
  });
});

export default router;
