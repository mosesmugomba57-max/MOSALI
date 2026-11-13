/**
 * TMDB service layer
 * ------------------
 * All external calls to The Movie Database go through here.
 * If no API key is set, callers fall back to mock data.
 */

const TMDB_BASE = "https://api.themoviedb.org/3";
const IMAGE_BASE = "https://image.tmdb.org/t/p";

function getKey() {
  const key = process.env.TMDB_API_KEY;
  if (!key || key === "your_tmdb_api_key_here") return null;
  return key;
}

export function isTmdbEnabled() {
  return Boolean(getKey());
}

export function posterUrl(path, size = "w500") {
  if (!path) return null;
  if (path.startsWith("http")) return path;
  return `${IMAGE_BASE}/${size}${path}`;
}

export function backdropUrl(path, size = "original") {
  if (!path) return null;
  if (path.startsWith("http")) return path;
  return `${IMAGE_BASE}/${size}${path}`;
}

async function tmdbFetch(endpoint, params = {}) {
  const key = getKey();
  if (!key) throw new Error("TMDB_API_KEY not configured");

  const url = new URL(`${TMDB_BASE}${endpoint}`);
  url.searchParams.set("api_key", key);
  url.searchParams.set("language", "en-US");
  Object.entries(params).forEach(([k, v]) => {
    if (v !== undefined && v !== null) url.searchParams.set(k, v);
  });

  const res = await fetch(url.toString());
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`TMDB ${res.status}: ${text}`);
  }
  return res.json();
}

/** Normalize a TMDB movie object into the shape the frontend expects */
export function normalizeMovie(m) {
  return {
    id: m.id,
    title: m.title || m.name,
    overview: m.overview || "",
    release_date: m.release_date || m.first_air_date || "",
    year: (m.release_date || m.first_air_date || "").slice(0, 4),
    vote_average: m.vote_average ?? 0,
    rating: Number((m.vote_average ?? 0).toFixed(1)),
    runtime: m.runtime || null,
    poster_path: posterUrl(m.poster_path),
    backdrop_path: backdropUrl(m.backdrop_path),
    genre_ids: m.genre_ids || [],
    genres: m.genres ? m.genres.map((g) => g.name) : [],
    popularity: m.popularity,
  };
}

export async function getTrending(page = 1) {
  const data = await tmdbFetch("/trending/movie/week", { page });
  return {
    page: data.page,
    total_pages: data.total_pages,
    results: data.results.map(normalizeMovie),
  };
}

export async function getPopular(page = 1) {
  const data = await tmdbFetch("/movie/popular", { page });
  return {
    page: data.page,
    total_pages: data.total_pages,
    results: data.results.map(normalizeMovie),
  };
}

export async function getTopRated(page = 1) {
  const data = await tmdbFetch("/movie/top_rated", { page });
  return {
    page: data.page,
    total_pages: data.total_pages,
    results: data.results.map(normalizeMovie),
  };
}

export async function getUpcoming(page = 1) {
  const data = await tmdbFetch("/movie/upcoming", { page });
  return {
    page: data.page,
    total_pages: data.total_pages,
    results: data.results.map(normalizeMovie),
  };
}

export async function getMovieById(id) {
  const data = await tmdbFetch(`/movie/${id}`, {
    append_to_response: "credits,videos,similar",
  });
  return {
    ...normalizeMovie(data),
    runtime: data.runtime,
    genres: data.genres?.map((g) => g.name) || [],
    budget: data.budget,
    revenue: data.revenue,
    status: data.status,
    tagline: data.tagline,
    cast: data.credits?.cast?.slice(0, 12).map((c) => ({
      id: c.id,
      name: c.name,
      character: c.character,
      profile_path: posterUrl(c.profile_path, "w185"),
    })),
    trailer: data.videos?.results?.find(
      (v) => v.site === "YouTube" && v.type === "Trailer"
    )?.key,
    similar: data.similar?.results?.slice(0, 8).map(normalizeMovie) || [],
  };
}

export async function searchMovies(query, page = 1) {
  const data = await tmdbFetch("/search/movie", { query, page, include_adult: false });
  return {
    page: data.page,
    total_pages: data.total_pages,
    total_results: data.total_results,
    results: data.results.map(normalizeMovie),
  };
}

export async function getGenres() {
  const data = await tmdbFetch("/genre/movie/list");
  return data.genres;
}

export async function discoverByGenre(genreId, page = 1) {
  const data = await tmdbFetch("/discover/movie", {
    with_genres: genreId,
    page,
    sort_by: "popularity.desc",
  });
  return {
    page: data.page,
    total_pages: data.total_pages,
    results: data.results.map(normalizeMovie),
  };
}
