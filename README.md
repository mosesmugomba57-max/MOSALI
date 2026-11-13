# MOSALI – Movie Streaming Site

A modern movie browsing app inspired by **Netflix, MovieBox, Disney+, Prime Video, Hulu, Tubi, HBO Max, Apple TV+, Peacock, and Crunchyroll**.

Structure:

```
mosali-movie-site/
├── frontend/          # React + Vite + Tailwind (UI)
├── backend/           # Express API (proxies TMDB + mock data)
└── README.md
```

---

## Best API Recommendation (all movies)

### **The Movie Database (TMDB)** — recommended

| Why TMDB? | Details |
|-----------|---------|
| Catalog size | Hundreds of thousands of movies + TV shows |
| Images | High-quality posters & backdrops (hosted by TMDB) |
| Discovery | Trending, Popular, Top Rated, Upcoming, by genre |
| Free tier | Free for non-commercial use (attribution required) |
| Limits | ~40–50 requests / 10 seconds – plenty for most apps |
| Docs | https://developer.themoviedb.org/docs |

**Get a free key in 2 minutes:**

1. Create an account → https://www.themoviedb.org/signup
2. Go to https://www.themoviedb.org/settings/api
3. Request an API key (choose “Developer”)
4. Copy the **API Key (v3 auth)**

Other options researched:

| API | Best for | Free tier | Notes |
|-----|----------|-----------|-------|
| **TMDB** | Full catalog, posters, discovery | Yes | **Best overall** |
| OMDb | Simple title / IMDb-ID lookup | 1 000 req/day | Lightweight |
| TVmaze | TV shows & schedules | Unlimited (no key) | TV-focused |
| Watchmode | Where to stream | Limited free plan | Streaming availability |

---

## Quick start

### 1. Backend

```bash
cd backend
cp .env.example .env
# Edit .env and paste your TMDB_API_KEY (optional – mock data works without it)
npm install
npm run dev
```

Backend runs on **http://localhost:5000**

### 2. Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on **http://localhost:5173**

Open the browser → Home page loads trending / popular rows from the backend.

---

## Where to connect the API (already wired)

| File | Purpose |
|------|---------|
| `frontend/src/services/api.js` | **Base URL** – change `VITE_API_URL` or the default `http://localhost:5000/api` |
| `frontend/src/services/movieService.js` | All movie endpoints (trending, popular, search, details…) |
| `frontend/src/services/genreService.js` | Genre list |
| `backend/.env` | Put `TMDB_API_KEY=...` here |
| `backend/services/tmdb.js` | Actual calls to TMDB |

When `TMDB_API_KEY` is **not** set, the backend returns built-in mock movies so the UI works immediately.

---

## Pages

| Route | Description |
|-------|-------------|
| `/` | **Home** – Hero banner + Trending / Popular / Top Rated / Upcoming rows |
| `/movies` | **Movies** – Full grid + genre filter + pagination |
| `/movies/:id` | **Movie Details** – poster, overview, cast, trailer, similar |
| `/downloads` | Existing downloads page (from your original project) |
| `/about` | Existing about page |

Design patterns taken from 10+ sites:

- Netflix / Disney+ → horizontal rows, large hero, dark theme, red accent
- MovieBox / Tubi → dense poster grids, simple filters
- Prime Video / Hulu → clear genre chips, rating badges
- HBO / Apple TV+ → cinematic backdrop gradients, minimal chrome

---

## Environment variables

**Backend** (`backend/.env`):

```
PORT=5000
TMDB_API_KEY=your_key_here
FRONTEND_ORIGIN=http://localhost:5173
```

**Frontend** (`frontend/.env` – optional):

```
VITE_API_URL=http://localhost:5000/api
```

---

## API endpoints (backend)

```
GET /api/health
GET /api/movies
GET /api/movies/trending
GET /api/movies/popular
GET /api/movies/top-rated
GET /api/movies/upcoming
GET /api/movies/search?q=avatar
GET /api/movies/:id
GET /api/genres
```

---

## License & attribution

When using TMDB data, display their logo or the text
“This product uses the TMDB API but is not endorsed or certified by TMDB.”
See: https://www.themoviedb.org/documentation/api/terms-of-use
