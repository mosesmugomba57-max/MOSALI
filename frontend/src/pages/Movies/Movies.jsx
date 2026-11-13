import { useEffect, useState } from "react";
import { MovieCard } from "../../components/movie/MovieCard/MovieCard";
import { Footer } from "../../components/Footer";
import { fetchMovies } from "../../services/movieService";
import { fetchGenres } from "../../services/genreService";

/**
 * MOVIES PAGE – grid of all movies + genre filter
 * Inspired by: Netflix browse, MovieBox catalog, Disney+ grid
 *
 * API CONNECTION: /api/movies and /api/genres
 */
export function Movies() {
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchGenres()
      .then((data) => setGenres(data.genres || []))
      .catch(console.error);
  }, []);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoading(true);
      setError(null);
      try {
        // ========== API CALL ==========
        const data = await fetchMovies({
          page,
          genre: selectedGenre || undefined,
        });
        if (cancelled) return;
        setMovies(data.results || []);
        setTotalPages(data.total_pages || 1);
      } catch (err) {
        if (!cancelled) {
          setError("Failed to load movies. Is the backend running?");
          console.error(err);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, [page, selectedGenre]);

  function handleGenreChange(id) {
    setSelectedGenre(id);
    setPage(1);
  }

  return (
    <>
      <main className="min-h-screen bg-black px-4 pb-16 pt-24 text-white sm:px-8">
        <div className="mx-auto max-w-7xl">
          <h1 className="mb-2 text-3xl font-extrabold tracking-tight sm:text-4xl">
            Movies
          </h1>
          <p className="mb-8 text-gray-400">
            Browse the full catalog. Filter by genre.
          </p>

          <div className="mb-8 flex flex-wrap gap-2">
            <button
              onClick={() => handleGenreChange("")}
              className={`rounded-full px-4 py-1.5 text-sm font-medium transition ${
                !selectedGenre
                  ? "bg-red-600 text-white"
                  : "bg-zinc-800 text-gray-300 hover:bg-zinc-700"
              }`}
            >
              All
            </button>
            {genres.map((g) => (
              <button
                key={g.id}
                onClick={() => handleGenreChange(String(g.id))}
                className={`rounded-full px-4 py-1.5 text-sm font-medium transition ${
                  selectedGenre === String(g.id)
                    ? "bg-red-600 text-white"
                    : "bg-zinc-800 text-gray-300 hover:bg-zinc-700"
                }`}
              >
                {g.name}
              </button>
            ))}
          </div>

          {error && (
            <div className="mb-6 rounded-lg border border-red-800 bg-red-950/50 px-4 py-3 text-sm text-red-300">
              {error}
            </div>
          )}

          {loading ? (
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
              {Array.from({ length: 12 }).map((_, i) => (
                <div
                  key={i}
                  className="aspect-[2/3] animate-pulse rounded-lg bg-zinc-800"
                />
              ))}
            </div>
          ) : movies.length === 0 ? (
            <p className="py-20 text-center text-gray-500">No movies found.</p>
          ) : (
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
              {movies.map((movie) => (
                <div key={movie.id} className="w-full [&>a]:w-full">
                  <MovieCard movie={movie} />
                </div>
              ))}
            </div>
          )}

          {totalPages > 1 && (
            <div className="mt-10 flex items-center justify-center gap-4">
              <button
                disabled={page <= 1}
                onClick={() => setPage((p) => p - 1)}
                className="rounded-md bg-zinc-800 px-4 py-2 text-sm font-medium disabled:opacity-40 hover:bg-zinc-700"
              >
                ← Prev
              </button>
              <span className="text-sm text-gray-400">
                Page {page} of {totalPages}
              </span>
              <button
                disabled={page >= totalPages}
                onClick={() => setPage((p) => p + 1)}
                className="rounded-md bg-zinc-800 px-4 py-2 text-sm font-medium disabled:opacity-40 hover:bg-zinc-700"
              >
                Next →
              </button>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
