import { Router } from "express";
import { auth } from "./firebase.js";
import { protectRoute } from "../middleware/middleware.js";
import jwt from "jsonwebtoken";
import axios from "axios";

export const authRouter = Router();

// Cookie configuration
const cookieConfig = {
  maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  httpOnly: false,
  sameSite: "none",
  secure: true,
  path: "/",
};

authRouter.post("/signup", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    const userRecord = await auth.createUser({ email, password });
    const customID = userRecord.uid;

    // Set cookies
    res.cookie("email", email, cookieConfig);
    res.cookie("uid", customID, cookieConfig);

    const token = jwt.sign({ uid: customID, email }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    res.cookie("jwt", token, cookieConfig);

    res.status(200).json({
      message: "Sign-up successful",
      user: userRecord,
      customID,
      token, // Added: Return JWT token in response body
      success: true,
    });
  } catch (error) {
    if (error.code === "auth/email-already-exists") {
      return res.status(400).json({ error: "Email already exists" });
    }
    console.error("Error signing up:", error);
    res.status(500).json({ error: "Sign-up failed", details: error.message });
  }
});

authRouter.post("/signin", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    const apiKey = process.env.GOOGLE_API_KEY;
    if (!apiKey) {
      return res.status(500).json({ error: "Missing identity API Key in backend." });
    }

    let customID;
    try {
      const response = await axios.post(
        `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`,
        { email, password, returnSecureToken: true }
      );
      customID = response.data.localId;
    } catch (err) {
      return res.status(401).json({ error: "Invalid email or password." });
    }

    const userRecord = await auth.getUser(customID);

    // Set cookies
    res.cookie("email", email, cookieConfig);
    res.cookie("uid", customID, cookieConfig);

    const token = jwt.sign({ uid: customID, email }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    res.cookie("jwt", token, cookieConfig);

    res.status(200).json({
      message: "Sign-in success",
      user: userRecord,
      customID,
      token, // Added: Return JWT token in response body
      success: true,
    });
  } catch (error) {
    console.error("Error signing in:", error);
    res.status(500).json({ error: "Sign-in failed", details: error.message });
  }
});

authRouter.get("/check", protectRoute, async (req, res) => {
  try {
    res.status(200).json(req.user);
  } catch (error) {
    console.log("error in checkAuth controller", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
});
