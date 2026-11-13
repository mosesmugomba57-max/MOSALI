import { Router } from "express";
import { isTmdbEnabled, getGenres } from "../services/tmdb.js";
import { mockGenres } from "../data/mockMovies.js";

const router = Router();

// GET /api/genres
router.get("/", async (_req, res) => {
  try {
    if (isTmdbEnabled()) {
      const genres = await getGenres();
      return res.json({ genres });
    }
    res.json({ genres: mockGenres });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export { router as genreRoutes };
