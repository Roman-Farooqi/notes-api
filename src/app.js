import express from "express";
import cors from "cors";

const app = express();

// 1. Built-in & Global Middleware
app.use(cors());           // Enables Cross-Origin Resource Sharing for frontend clients
app.use(express.json());   // Parses incoming JSON payloads into `req.body`

// 2. Health Check Route (Standard in production deployments & load balancers)
app.get("/api/health", (req, res) => {
  res.status(200).json({
    status: "ok",
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
  });
});

// 3. 404 Catch-All Middleware (Runs only if no route above matched)
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.originalUrl} not found`,
  });
});

export default app;