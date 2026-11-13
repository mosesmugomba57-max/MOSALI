import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchMovieById } from "../../services/movieService";
import { MovieCard } from "../../components/movie/MovieCard/MovieCard";

/**
 * MOVIE DETAILS PAGE
 * API CONNECTION: GET /api/movies/:id
 */
export function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchMovieById(id);
        if (!cancelled) setMovie(data);
      } catch (err) {
        if (!cancelled) setError(err.message);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    load();
    return () => {
      cancelled = true;
    };
  }, [id]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-black text-white">
        <div className="h-10 w-10 animate-spin rounded-full border-2 border-red-600 border-t-transparent" />
      </div>
    );
  }

  if (error || !movie) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-black text-white">
        <p className="mb-4 text-red-400">{error || "Movie not found"}</p>
        <Link to="/movies" className="text-red-500 underline">
          Back to Movies
        </Link>
      </div>
    );
  }

  const backdrop =
    movie.backdrop_path ||
    movie.poster_path ||
    "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=2070";

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="relative h-[50vh] min-h-[320px]">
        <img
          src={backdrop}
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/20" />
      </div>

      <div className="relative z-10 mx-auto -mt-40 max-w-6xl px-4 pb-16 sm:px-8">
        <div className="flex flex-col gap-8 md:flex-row">
          <img
            src={
              movie.poster_path ||
              "https://via.placeholder.com/300x450/1a1a1a/666?text=No+Poster"
            }
            alt={movie.title}
            className="mx-auto h-[360px] w-[240px] shrink-0 rounded-xl object-cover shadow-2xl md:mx-0"
          />

          <div className="flex-1">
            <h1 className="mb-2 text-3xl font-extrabold sm:text-4xl md:text-5xl">
              {movie.title}
            </h1>
            <div className="mb-4 flex flex-wrap items-center gap-3 text-sm text-gray-300">
              {(movie.year || movie.release_date?.slice(0, 4)) && (
                <span>{movie.year || movie.release_date.slice(0, 4)}</span>
              )}
              {(movie.rating ?? movie.vote_average) != null && (
                <span className="text-yellow-400">
                  ★ {Number(movie.rating ?? movie.vote_average).toFixed(1)}
                </span>
              )}
              {movie.runtime && <span>{movie.runtime} min</span>}
              {movie.genres?.length > 0 && (
                <span>{movie.genres.join(" · ")}</span>
              )}
            </div>
            {movie.tagline && (
              <p className="mb-3 italic text-gray-400">"{movie.tagline}"</p>
            )}
            <p className="mb-6 max-w-2xl leading-relaxed text-gray-300">
              {movie.overview}
            </p>

            {movie.trailer && (
              <a
                href={`https://www.youtube.com/watch?v=${movie.trailer}`}
                target="_blank"
                rel="noreferrer"
                className="inline-block rounded-md bg-red-600 px-6 py-3 text-sm font-bold transition hover:bg-red-700"
              >
                ▶ Watch Trailer
              </a>
            )}
          </div>
        </div>

        {movie.cast?.length > 0 && (
          <section className="mt-12">
            <h2 className="mb-4 text-xl font-bold">Cast</h2>
            <div className="flex gap-4 overflow-x-auto pb-2">
              {movie.cast.map((c) => (
                <div key={c.id} className="w-24 shrink-0 text-center">
                  <img
                    src={
                      c.profile_path ||
                      "https://via.placeholder.com/100x150/333/666?text=?"
                    }
                    alt={c.name}
                    className="mb-2 h-32 w-24 rounded-lg object-cover"
                  />
                  <p className="text-xs font-medium">{c.name}</p>
                  <p className="text-[10px] text-gray-500">{c.character}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {movie.similar?.length > 0 && (
          <section className="mt-12">
            <h2 className="mb-4 text-xl font-bold">More Like This</h2>
            <div className="flex gap-3 overflow-x-auto pb-2">
              {movie.similar.map((m) => (
                <MovieCard key={m.id} movie={m} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
