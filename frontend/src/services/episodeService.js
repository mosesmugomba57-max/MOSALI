/**
 * Episode / Series API — ready for backend connection
 * Endpoint: GET /api/series/:id/episodes?season=1
 */
import api from "./api";

export async function fetchEpisodes(seriesId, season = 1) {
  return api.get(`/series/${seriesId}/episodes?season=${season}`);
}

export async function fetchSeriesDetails(seriesId) {
  return api.get(`/series/${seriesId}`);
}
