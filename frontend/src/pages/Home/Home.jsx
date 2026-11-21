import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { HeroBanner } from "../../components/movie/HeroBanner";
import { MovieRow } from "../../components/movie/MovieRow";
import { Footer } from "../../components/Footer";
import { fetchTrending, fetchPopular, fetchTopRated, fetchUpcoming } from "../../services/movieService";
import { useContinueWatching } from "../../context/ContinueWatchingContext";

const GENRE_FILTERS = [
  { label: "All", id: "" },
  { label: "Action", id: "28" },
  { label: "Comedy", id: "35" },
  { label: "Horror", id: "27" },
  { label: "Sci-Fi", id: "878" },
  { label: "Romance", id: "10749" },
  { label: "Drama", id: "18" },
  { label: "Thriller", id: "53" },
  { label: "Animation", id: "16" },
  { label: "Documentary", id: "99" },
];

const COLLECTIONS = [
  { label: "Action Night", sub: "High-octane hits", gradient: "from-red-950/80 to-zinc-900/90", border: "border-red-900/30" },
  { label: "Sci-Fi Weekend", sub: "Beyond the stars", gradient: "from-blue-950/80 to-zinc-900/90", border: "border-blue-900/30" },
  { label: "Feel-Good Picks", sub: "Light up your mood", gradient: "from-amber-950/80 to-zinc-900/90", border: "border-amber-900/30" },
  { label: "Late Night Thrills", sub: "Darkness awaits", gradient: "from-purple-950/80 to-zinc-900/90", border: "border-purple-900/30" },
];

export function Home() {
  const [trending, setTrending] = useState([]);
  const [popular, setPopular] = useState([]);
  const [topRated, setTopRated] = useState([]);
  const [upcoming, setUpcoming] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { continueWatching } = useContinueWatching();

  useEffect(() => {
    let cancelled = false;
    async function load() {
      setLoading(true);
      setError(null);
      try {
        const [t, p, tr, u] = await Promise.all([
          fetchTrending(),
          fetchPopular(),
          fetchTopRated(),
          fetchUpcoming(),
        ]);
        if (cancelled) return;
        setTrending(t.results || []);
        setPopular(p.results || []);
        setTopRated(tr.results || []);
        setUpcoming(u.results || []);
      } catch (err) {
        if (!cancelled) {
          console.error(err);
          setError("Could not load content. Make sure the backend is running.");
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    load();
    return () => {
      cancelled = true;
    };
  }, []);

  // Top trending titles from TMDB for the rotating hero banner
  const featured = trending.slice(0, 6);
  const top10 = trending.slice(0, 10);

  return (
    <>
      <div className="min-h-screen bg-black text-white">
        {/* Hero Banner directly from TMDB trending database */}
        <HeroBanner movies={featured} />

        {/* Genre filter pill row */}
        <div className="relative z-10 px-4 sm:px-8 py-4">
          <div className="scrollbar-hide flex gap-2 overflow-x-auto pb-1">
            {GENRE_FILTERS.map((g) => (
              <button
                key={g.id}
                className="shrink-0 rounded-full px-4 py-1.5 text-xs font-semibold border border-zinc-700/60 bg-zinc-800/60 text-white/60 hover:bg-zinc-700 hover:text-white transition-all"
              >
                {g.label}
              </button>
            ))}
          </div>
        </div>

        <div className="relative z-10 pb-16">
          {error && (
            <div className="mx-4 sm:mx-8 mb-6 rounded-xl border border-red-900/50 bg-red-950/30 px-5 py-3 text-sm text-red-300/80">
              {error}
            </div>
          )}

          {/* Continue Watching */}
          {continueWatching.length > 0 && (
            <section className="mb-10">
              <div className="flex items-center gap-3 mb-5 px-4 sm:px-8">
                <span className="w-1 h-6 bg-red-600 rounded-full" />
                <h2 className="text-lg sm:text-xl font-bold text-white">Continue Watching</h2>
              </div>
              <div className="scrollbar-hide flex gap-3 overflow-x-auto px-4 sm:px-8 pb-2">
                {continueWatching.map((item) => (
                  <Link
                    key={item.id}
                    to={`/watch/${item.id}`}
                    className="shrink-0 w-[200px] sm:w-[220px] group"
                  >
                    <div className="relative rounded-xl overflow-hidden bg-zinc-900">
                      <div className="aspect-video overflow-hidden">
                        <img
                          src={item.poster || "https://via.placeholder.com/320x180/18181b/555?text=..."}
                          alt={item.title}
                          className="w-full h-full object-cover transition duration-300 group-hover:scale-105"
                        />
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-zinc-700">
                        <div className="h-full bg-red-500" style={{ width: `${item.progress}%` }} />
                      </div>
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition bg-black/40">
                        <div className="w-11 h-11 rounded-full bg-red-600/90 flex items-center justify-center">
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
                            <path d="M8 5v14l11-7z" />
                          </svg>
                        </div>
                      </div>
                    </div>
                    <p className="mt-2 text-white/80 text-xs font-semibold truncate">{item.title}</p>
                    <p className="text-white/30 text-[10px]">{Math.round(item.progress)}% watched</p>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {/* Trending Now */}
          <MovieRow title="Trending Now" movies={trending} loading={loading} />

          {/* Featured Collections */}
          <section className="mb-10 px-4 sm:px-8">
            <div className="flex items-center gap-3 mb-5">
              <span className="w-1 h-6 bg-red-600 rounded-full" />
              <h2 className="text-lg sm:text-xl font-bold text-white">Featured Collections</h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {COLLECTIONS.map((c) => (
                <button
                  key={c.label}
                  className={`relative bg-gradient-to-br ${c.gradient} rounded-xl p-5 h-24 flex flex-col items-start justify-center border ${c.border} hover:scale-[1.03] transition-all group overflow-hidden text-left`}
                >
                  <span className="text-white font-bold text-sm leading-tight mb-0.5">{c.label}</span>
                  <span className="text-white/40 text-xs">{c.sub}</span>
                  <div className="absolute inset-0 bg-white/0 group-hover:bg-white/[0.03] transition rounded-xl" />
                </button>
              ))}
            </div>
          </section>

          {/* Top 10 Today from TMDB */}
          <section className="mb-10">
            <div className="flex items-center gap-3 mb-5 px-4 sm:px-8">
              <span className="w-1 h-6 bg-red-600 rounded-full" />
              <h2 className="text-lg sm:text-xl font-bold text-white">Top 10 Today</h2>
            </div>
            <div className="scrollbar-hide flex gap-5 overflow-x-auto px-4 sm:px-8 pb-2">
              {top10.map((movie, idx) => (
                <div key={movie.id} className="relative shrink-0">
                  <span
                    className="absolute -left-1 -bottom-1 z-10 font-black select-none text-6xl sm:text-7xl leading-none text-zinc-800"
                    style={{ WebkitTextStroke: "2px #3f3f46" }}
                  >
                    {idx + 1}
                  </span>
                  <div className="relative ml-6">
                    <Link
                      to={`/movies/${movie.id}`}
                      className="block w-[130px] sm:w-[150px] rounded-xl overflow-hidden bg-zinc-900 hover:scale-105 transition duration-300"
                    >
                      <div className="aspect-[2/3] overflow-hidden">
                        <img
                          src={movie.poster_path || movie.poster || "https://via.placeholder.com/300x450/18181b/555"}
                          alt={movie.title}
                          loading="lazy"
                          className="h-full w-full object-cover"
                        />
                      </div>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Popular from TMDB */}
          <MovieRow title="Popular on MOSALI" movies={popular} loading={loading} />

          <div className="mx-4 sm:mx-8 my-6 h-px bg-gradient-to-r from-transparent via-zinc-800 to-transparent" />

          {/* Top Rated from TMDB */}
          <MovieRow title="Top Rated" movies={topRated} loading={loading} />

          {/* Coming Soon from TMDB */}
          <MovieRow title="Coming Soon" movies={upcoming} loading={loading} />

          {/* Browse CTA */}
          <section className="mx-4 sm:mx-8 mt-8 rounded-2xl overflow-hidden relative">
            <div className="absolute inset-0 bg-gradient-to-r from-zinc-900 via-red-950/20 to-zinc-900 border border-zinc-800/60 rounded-2xl" />
            <div className="relative flex flex-col sm:flex-row items-center justify-between gap-5 p-8">
              <div>
                <h3 className="text-xl font-extrabold text-white mb-1">Discover More</h3>
                <p className="text-white/40 text-sm">Browse the full catalog filtered by genre, year, and rating.</p>
              </div>
              <Link
                to="/movies"
                className="shrink-0 bg-red-600 hover:bg-red-500 text-white font-bold px-7 py-3 rounded-xl transition hover:scale-105 shadow-lg shadow-red-900/30 text-sm"
              >
                Browse All Movies
              </Link>
            </div>
          </section>
        </div>
      </div>
      <Footer />
    </>
  );
}
