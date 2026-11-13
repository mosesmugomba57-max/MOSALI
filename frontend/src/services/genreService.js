/**
 * ============================================================
 *  API CONNECTION POINT  #3  –  Genres
 * ============================================================
 */

import api from "./api";

export async function fetchGenres() {
  return api.get("/genres");
}
