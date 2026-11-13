import { Router } from "express";
import {
  isTmdbEnabled,
  getTrending,
  getPopular,
  getTopRated,
  getUpcoming,
  getMovieById,
  searchMovies,
  discoverByGenre,
} from "../services/tmdb.js";
import { mockMovies } from "../data/mockMovies.js";

const router = Router();

function paginate(list, page = 1, pageSize = 20) {
  const start = (page - 1) * pageSize;
  return {
    page: Number(page),
    total_pages: Math.ceil(list.length / pageSize) || 1,
    results: list.slice(start, start + pageSize),
  };
}

// GET /api/movies  (optional ?page=&genre=)
router.get("/", async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;
    const genre = req.query.genre;

    if (isTmdbEnabled()) {
      if (genre) {
        return res.json(await discoverByGenre(genre, page));
      }
      return res.json(await getPopular(page));
    }

    let list = mockMovies;
    if (genre) {
      list = mockMovies.filter((m) =>
        m.genre_ids?.includes(Number(genre)) ||
        m.genres?.some((g) => g.toLowerCase() === String(genre).toLowerCase())
      );
    }
    res.json(paginate(list, page));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/trending", async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;
    if (isTmdbEnabled()) return res.json(await getTrending(page));
    res.json(paginate(mockMovies, page));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/popular", async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;
    if (isTmdbEnabled()) return res.json(await getPopular(page));
    res.json(paginate(mockMovies, page));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/top-rated", async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;
    if (isTmdbEnabled()) return res.json(await getTopRated(page));
    const sorted = [...mockMovies].sort((a, b) => b.vote_average - a.vote_average);
    res.json(paginate(sorted, page));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/upcoming", async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;
    if (isTmdbEnabled()) return res.json(await getUpcoming(page));
    res.json(paginate(mockMovies.slice().reverse(), page));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/search", async (req, res) => {
  try {
    const q = (req.query.q || "").trim();
    const page = Number(req.query.page) || 1;
    if (!q) return res.json({ page: 1, total_pages: 0, results: [] });

    if (isTmdbEnabled()) return res.json(await searchMovies(q, page));

    const filtered = mockMovies.filter(
      (m) =>
        m.title.toLowerCase().includes(q.toLowerCase()) ||
        m.overview?.toLowerCase().includes(q.toLowerCase())
    );
    res.json(paginate(filtered, page));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    if (isTmdbEnabled()) {
      return res.json(await getMovieById(id));
    }
    const movie = mockMovies.find((m) => String(m.id) === String(id));
    if (!movie) return res.status(404).json({ error: "Movie not found" });
    res.json({
      ...movie,
      year: movie.release_date?.slice(0, 4),
      rating: movie.vote_average,
      cast: [],
      similar: mockMovies.filter((m) => m.id !== movie.id).slice(0, 6),
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export { router as movieRoutes };
