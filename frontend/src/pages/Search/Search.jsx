import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { MovieCard } from "../../components/movie/MovieCard/MovieCard";
import { Footer } from "../../components/Footer";
import { searchMovies } from "../../services/movieService";

export function Search() {
  const [searchParams, setSearchParams] = useSearchParams();
  const q = searchParams.get("q") || "";
  const [query, setQuery] = useState(q);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (!q) return;
    setSubmitted(true);
    let cancelled = false;
    setLoading(true); setError(null);
    searchMovies(q)
      .then((data) => { if (!cancelled) { setResults(data.results || []); setLoading(false); } })
      .catch((err) => { if (!cancelled) { setError(err.message); setLoading(false); } });
    return () => { cancelled = true; };
  }, [q]);

  function handleSubmit(e) {
    e.preventDefault();
    if (query.trim()) setSearchParams({ q: query.trim() });
  }

  return (
    <>
      <main className="min-h-screen bg-black text-white px-4 sm:px-8 pt-24 pb-16">
        <div className="max-w-7xl mx-auto">
          {/* Search bar */}
          <form onSubmit={handleSubmit} className="mb-10">
            <div className="flex gap-3 max-w-2xl">
              <div className="flex-1 relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
                  </svg>
                </span>
                <input type="text" value={query} onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search movies, series..."
                  className="w-full bg-zinc-900 border border-zinc-700 focus:border-red-500 text-white pl-11 pr-4 py-3.5 rounded-xl outline-none text-sm transition" />
              </div>
              <button type="submit"
                className="bg-red-600 hover:bg-red-500 text-white px-7 py-3.5 rounded-xl font-bold text-sm transition hover:scale-105">
                Search
              </button>
            </div>
          </form>

          {/* Results header */}
          {submitted && !loading && (
            <p className="text-white/30 text-sm mb-6">
              {results.length > 0
                ? `${results.length} result${results.length !== 1 ? "s" : ""} for "${q}"`
                : `No results for "${q}"`}
            </p>
          )}

          {/* Error */}
          {error && (
            <div className="mb-6 rounded-xl border border-red-900/50 bg-red-950/30 px-4 py-3 text-sm text-red-300/80">
              {error}
            </div>
          )}

          {/* Loading */}
          {loading && (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
              {Array.from({ length: 12 }).map((_, i) => (
                <div key={i} className="aspect-[2/3] animate-shimmer rounded-xl" />
              ))}
            </div>
          )}

          {/* Results */}
          {!loading && results.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
              {results.map((movie) => (
                <div key={movie.id} className="w-full [&>div>a]:w-full">
                  <MovieCard movie={movie} />
                </div>
              ))}
            </div>
          )}

          {/* No results */}
          {!loading && submitted && results.length === 0 && !error && (
            <div className="flex flex-col items-center justify-center py-28 text-center">
              <div className="w-16 h-16 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center mb-5">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor" className="text-zinc-600">
                  <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
                </svg>
              </div>
              <h2 className="text-xl font-bold text-white mb-2">No results found</h2>
              <p className="text-white/35 text-sm">Try a different title or browse by genre.</p>
            </div>
          )}

          {/* Default */}
          {!submitted && (
            <div className="flex flex-col items-center justify-center py-28 text-center">
              <div className="w-16 h-16 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center mb-5">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor" className="text-zinc-600">
                  <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
                </svg>
              </div>
              <h2 className="text-xl font-bold text-white mb-2">Search MOSALI</h2>
              <p className="text-white/35 text-sm">Find movies, series, documentaries and more.</p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
