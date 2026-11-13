/**
 * ============================================================
 *  API CONNECTION POINT  #2  –  Movie endpoints
 * ============================================================
 * These functions talk to your backend (/api/movies/*).
 * Backend either returns mock data OR live TMDB data
 * depending on whether TMDB_API_KEY is set on the server.
 */

import api from "./api";

export async function fetchTrending(page = 1) {
  return api.get(`/movies/trending?page=${page}`);
}

export async function fetchPopular(page = 1) {
  return api.get(`/movies/popular?page=${page}`);
}

export async function fetchTopRated(page = 1) {
  return api.get(`/movies/top-rated?page=${page}`);
}

export async function fetchUpcoming(page = 1) {
  return api.get(`/movies/upcoming?page=${page}`);
}

export async function fetchMovies({ page = 1, genre } = {}) {
  const params = new URLSearchParams({ page });
  if (genre) params.set("genre", genre);
  return api.get(`/movies?${params}`);
}

export async function fetchMovieById(id) {
  return api.get(`/movies/${id}`);
}

export async function searchMovies(query, page = 1) {
  return api.get(`/movies/search?q=${encodeURIComponent(query)}&page=${page}`);
}
