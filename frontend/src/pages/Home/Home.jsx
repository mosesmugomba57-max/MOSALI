import { useEffect, useState } from "react";
import { HeroBanner } from "../../components/movie/HeroBanner";
import { MovieRow } from "../../components/movie/MovieRow";
import { Footer } from "../../components/Footer";
import {
  fetchTrending,
  fetchPopular,
  fetchTopRated,
  fetchUpcoming,
} from "../../services/movieService";

/**
 * HOME PAGE
 * Inspired by: Netflix, Disney+, MovieBox, Prime Video, Hulu, Tubi
 * - Hero banner with featured title
 * - Horizontal rows: Trending, Popular, Top Rated, Upcoming
 *
 * API CONNECTION: All data comes from backend → TMDB (or mock)
 */
export function Home() {
  const [trending, setTrending] = useState([]);
  const [popular, setPopular] = useState([]);
  const [topRated, setTopRated] = useState([]);
  const [upcoming, setUpcoming] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoading(true);
      setError(null);
      try {
        // ========== API CALLS (connect here) ==========
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
          setError(
            "Could not load movies. Make sure the backend is running on port 5000."
          );
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

  const featured = trending[0] || popular[0] || null;

  return (
    <>
      <div className="min-h-screen bg-black text-white">
        <HeroBanner movie={featured} />

        <div className="relative z-10 -mt-16 pb-16">
          {error && (
            <div className="mx-4 mb-6 rounded-lg border border-red-800 bg-red-950/50 px-4 py-3 text-sm text-red-300 sm:mx-8">
              {error}
            </div>
          )}

          <MovieRow title="Trending Now" movies={trending} loading={loading} />
          <MovieRow title="Popular on MOSALI" movies={popular} loading={loading} />
          <MovieRow title="Top Rated" movies={topRated} loading={loading} />
          <MovieRow title="Coming Soon" movies={upcoming} loading={loading} />
        </div>
      </div>
      <Footer />
    </>
  );
}
