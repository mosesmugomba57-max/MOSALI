/**
 * MOSALI Backend Server
 * ---------------------
 * Express API that:
 *  1. Serves local / mock movie data (works immediately without any key)
 *  2. Proxies to TMDB when TMDB_API_KEY is set (recommended)
 *
 * Endpoints used by the frontend:
 *   GET  /api/health
 *   GET  /api/movies              → list / discover
 *   GET  /api/movies/trending
 *   GET  /api/movies/popular
 *   GET  /api/movies/top-rated
 *   GET  /api/movies/upcoming
 *   GET  /api/movies/:id
 *   GET  /api/movies/search?q=
 *   GET  /api/genres
 */

import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { movieRoutes } from "./routes/movies.js";
import { genreRoutes } from "./routes/genres.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin(origin, callback) {
      const configuredOrigin = process.env.FRONTEND_ORIGIN;
      const localViteOrigin = /^https?:\/\/(?:localhost|127\.0\.0\.1):\d+$/.test(origin || "");

      if (!origin || localViteOrigin || (configuredOrigin && origin === configuredOrigin)) {
        return callback(null, true);
      }

      callback(new Error("Origin not allowed by CORS"));
    },
    credentials: true,
  })
);
app.use(express.json());

// Health check
app.get("/api/health", (_req, res) => {
  res.json({
    status: "ok",
    service: "MOSALI API",
    tmdbConfigured: Boolean(process.env.TMDB_API_KEY && process.env.TMDB_API_KEY !== "your_tmdb_api_key_here"),
    timestamp: new Date().toISOString(),
  });
});

// API routes
app.use("/api/movies", movieRoutes);
app.use("/api/genres", genreRoutes);

// 404
app.use((_req, res) => {
  res.status(404).json({ error: "Endpoint not found" });
});

// Error handler
app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(500).json({ error: "Internal server error", message: err.message });
});

app.listen(PORT, () => {
  console.log(`\n🎬 MOSALI Backend running on http://localhost:${PORT}`);
  console.log(`   Health: http://localhost:${PORT}/api/health`);
  if (!process.env.TMDB_API_KEY || process.env.TMDB_API_KEY === "your_tmdb_api_key_here") {
    console.log(`   ⚠️  TMDB_API_KEY not set → using built-in mock data`);
    console.log(`   → Get a free key at https://www.themoviedb.org/settings/api\n`);
  } else {
    console.log(`   ✅ TMDB API key detected – live movie data enabled\n`);
  }
});
