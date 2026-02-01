// backend/controllers/auth.controller.js
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Register
export const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Validation
    if (!username || !email || !password) {
      return res.status(400).json("Username, Email and Password are required");
    }

    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json("User already exists");

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save user
    const newUser = await User.create({ username, email, password: hashedPassword });

    // Generate token
    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {expiresIn: "1d"});

    res.status(201).json({ user: newUser, token });
  } catch (err) {
    res.status(500).json(err.message);
  }
};

// Login
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
      return res.status(400).json("Email and Password are required");
    }

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json("User not found");

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json("Invalid password");

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {expiresIn: "1d"});

    res.status(200).json({ user, token });
  } catch (err) {
    res.status(500).json(err.message);
  }
};


