import { Link } from "react-router-dom";

/**
 * Full-width hero – Netflix / Prime Video style
 */
export function HeroBanner({ movie }) {
  if (!movie) {
    return (
      <div className="relative flex h-[70vh] min-h-[420px] items-center justify-center bg-zinc-900">
        <div className="h-10 w-48 animate-pulse rounded bg-zinc-700" />
      </div>
    );
  }

  const backdrop =
    movie.backdrop_path ||
    movie.poster_path ||
    "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=2070&auto=format&fit=crop";

  const title = movie.title || "Featured";
  const overview = movie.overview || "";
  const rating = movie.rating ?? movie.vote_average;
  const year = movie.year || movie.release_date?.slice(0, 4);
  const isAvatar = movie.id === 19995 || movie.title === "Avatar";
  const imagePosition = isAvatar ? "object-[58%_center]" : "object-center";

  return (
    <section className="relative flex h-[70vh] min-h-[420px] items-end overflow-hidden md:h-[80vh]">
      <img
        src={backdrop}
        alt={title}
        className={`absolute inset-0 h-full w-full object-cover ${imagePosition}`}
        onError={(e) => {
          e.target.src =
            "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=2070&auto=format&fit=crop";
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/30" />

      <div className="relative z-10 max-w-2xl px-6 pb-16 pt-24 sm:px-10 md:px-16">
        <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-red-500">
          Featured
        </p>
        <h1 className="mb-3 text-4xl font-extrabold leading-tight text-white drop-shadow-lg sm:text-5xl md:text-6xl">
          {title}
        </h1>
        <div className="mb-4 flex flex-wrap items-center gap-3 text-sm text-gray-300">
          {year && <span>{year}</span>}
          {rating != null && (
            <span className="flex items-center gap-1 text-yellow-400">
              ★ {Number(rating).toFixed(1)}
            </span>
          )}
          {movie.genres?.length > 0 && (
            <span className="text-gray-400">{movie.genres.slice(0, 3).join(" · ")}</span>
          )}
        </div>
        <p className="mb-6 line-clamp-3 max-w-xl text-sm leading-relaxed text-gray-300 sm:text-base">
          {overview}
        </p>
        <div className="flex flex-wrap gap-3">
          <Link
            to={`/movies/${movie.id}`}
            className="rounded-md bg-red-600 px-6 py-3 text-sm font-bold text-white transition hover:bg-red-700"
          >
            ▶ Play / Details
          </Link>
          <Link
            to="/movies"
            className="rounded-md border border-white/40 bg-white/10 px-6 py-3 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/20"
          >
            Browse All
          </Link>
        </div>
      </div>
    </section>
  );
}
