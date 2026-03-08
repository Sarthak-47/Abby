import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

import cookieParser from "cookie-parser";
import { authRouter } from "./auth/auth.js";
import { aiRouter } from "./Ai/main.js";
import { connectDB } from "./db/db.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

// test route
app.get("/", (req, res) => {
  res.send("Abby backend running");
});

app.use("/api/auth", authRouter);
app.use("/api/ai", aiRouter);

connectDB()
  .then(() => {
    app.listen(3001, () => {
      console.log("server running on port 3001");
    });
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB. Server not started.");
  });