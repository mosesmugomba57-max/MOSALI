import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchMovieById } from "../../services/movieService";
import { MovieCard } from "../../components/movie/MovieCard/MovieCard";
import { useMyList } from "../../context/MyListContext";
import { Footer } from "../../components/Footer";

function StarRating({ value }) {
  const stars = Math.round((Number(value) / 10) * 5);
  return (
    <span className="text-yellow-400">
      {"★".repeat(stars)}{"☆".repeat(5 - stars)}
    </span>
  );
}

export function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { toggleList, isInList } = useMyList();

  useEffect(() => {
    let cancelled = false;
    setLoading(true); setError(null);
    fetchMovieById(id)
      .then((data) => { if (!cancelled) { setMovie(data); setLoading(false); } })
      .catch((err) => { if (!cancelled) { setError(err.message); setLoading(false); } });
    return () => { cancelled = true; };
  }, [id]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-black text-white">
        <div className="w-12 h-12 animate-spin rounded-full border-4 border-zinc-700 border-t-red-600" />
      </div>
    );
  }

  if (error || !movie) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-black text-white gap-4">
        <p className="text-red-400">{error || "Movie not found"}</p>
        <Link to="/movies" className="text-red-500 underline">Back to Movies</Link>
      </div>
    );
  }

  const backdrop = movie.backdrop_path || movie.poster_path || movie.poster ||
    "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=2070";
  const rating = movie.rating ?? movie.vote_average;
  const year = movie.year || movie.release_date?.slice(0, 4);
  const inList = isInList(movie.id);

  return (
    <>
      <div className="min-h-screen bg-black text-white">
        {/* Backdrop */}
        <div className="relative h-[55vh] min-h-[340px]">
          <img src={backdrop} alt="" className="absolute inset-0 h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/20" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent" />
        </div>

        {/* Content */}
        <div className="relative z-10 mx-auto -mt-48 max-w-6xl px-4 pb-16 sm:px-8">
          <div className="flex flex-col gap-8 md:flex-row">
            {/* Poster */}
            <img
              src={movie.poster_path || movie.poster || "https://via.placeholder.com/300x450/18181b/555?text=MOSALI"}
              alt={movie.title}
              className="mx-auto h-[360px] w-[240px] shrink-0 rounded-2xl object-cover shadow-2xl md:mx-0 border border-zinc-800"
            />

            {/* Info */}
            <div className="flex-1">
              <h1 className="mb-2 text-3xl font-extrabold sm:text-4xl md:text-5xl leading-tight">{movie.title}</h1>

              {/* Meta */}
              <div className="mb-3 flex flex-wrap items-center gap-3 text-sm">
                {year && <span className="text-white/60">{year}</span>}
                {rating != null && (
                  <span className="flex items-center gap-1.5 text-yellow-400">
                    <StarRating value={rating} />
                    <span className="font-semibold">{Number(rating).toFixed(1)}</span>
                  </span>
                )}
                {movie.runtime && <span className="text-white/60">{movie.runtime} min</span>}
                <span className="bg-zinc-700 text-white/80 px-2 py-0.5 rounded text-xs font-bold">HD</span>
                {movie.genres?.length > 0 && (
                  <span className="text-white/50">{movie.genres.slice(0, 3).join(" · ")}</span>
                )}
              </div>

              {/* Genre pills */}
              <div className="flex flex-wrap gap-2 mb-4">
                {movie.genres?.map((g) => (
                  <span key={g} className="bg-zinc-800 border border-zinc-700 text-white/70 text-xs px-3 py-1 rounded-full">{g}</span>
                ))}
              </div>

              {movie.tagline && (
                <p className="mb-3 italic text-white/50 text-sm">"{movie.tagline}"</p>
              )}
              <p className="mb-6 max-w-2xl leading-relaxed text-white/70">{movie.overview}</p>

              {/* Action buttons */}
              <div className="flex flex-wrap gap-3">
                <Link
                  to={`/watch/${movie.id}`}
                  className="flex items-center gap-2 bg-red-600 hover:bg-red-500 text-white font-bold px-7 py-3 rounded-xl transition hover:scale-105 shadow-lg shadow-red-900/40"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z" /></svg>
                  Watch Now
                </Link>
                <button
                  onClick={() => toggleList(movie)}
                  className={`flex items-center gap-2 font-bold px-6 py-3 rounded-xl transition hover:scale-105 border ${
                    inList
                      ? "bg-white/15 border-white/40 text-white"
                      : "bg-white/5 border-white/20 text-white hover:bg-white/15"
                  }`}
                >
                  {inList ? "✓ In My List" : "+ My List"}
                </button>
                {movie.trailer && (
                  <a
                    href={`https://www.youtube.com/watch?v=${movie.trailer}`}
                    target="_blank" rel="noreferrer"
                    className="flex items-center gap-2 bg-zinc-800 hover:bg-zinc-700 text-white/80 hover:text-white font-semibold px-6 py-3 rounded-xl transition hover:scale-105 border border-zinc-700"
                  >
                    🎞 Trailer
                  </a>
                )}
                <button
                  onClick={() => {
                    if (navigator.share) navigator.share({ title: movie.title, url: window.location.href });
                    else { navigator.clipboard.writeText(window.location.href); }
                  }}
                  className="flex items-center gap-2 bg-zinc-800 hover:bg-zinc-700 text-white/60 hover:text-white px-5 py-3 rounded-xl transition border border-zinc-700"
                  title="Share"
                >
                  🔗 Share
                </button>
              </div>
            </div>
          </div>

          {/* Cast */}
          {movie.cast?.length > 0 && (
            <section className="mt-14">
              <h2 className="mb-5 text-xl font-bold flex items-center gap-2">
                <span className="w-1 h-6 bg-red-500 rounded-full inline-block" />
                Cast
              </h2>
              <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
                {movie.cast.map((c) => (
                  <div key={c.id} className="w-24 shrink-0 text-center group">
                    <img
                      src={c.profile_path || "https://via.placeholder.com/100x150/27272a/555?text=?"}
                      alt={c.name}
                      className="mb-2 h-32 w-24 rounded-xl object-cover transition group-hover:scale-105"
                    />
                    <p className="text-xs font-semibold text-white/80 leading-tight">{c.name}</p>
                    <p className="text-[10px] text-white/40 mt-0.5">{c.character}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* More Like This */}
          {movie.similar?.length > 0 && (
            <section className="mt-14">
              <h2 className="mb-5 text-xl font-bold flex items-center gap-2">
                <span className="w-1 h-6 bg-red-500 rounded-full inline-block" />
                More Like This
              </h2>
              <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
                {movie.similar.map((m) => <MovieCard key={m.id} movie={m} />)}
              </div>
            </section>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}
