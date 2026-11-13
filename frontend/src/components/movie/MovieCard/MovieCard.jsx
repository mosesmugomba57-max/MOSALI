import { Link } from "react-router-dom";

/**
 * Netflix / MovieBox style poster card
 */
export function MovieCard({ movie }) {
  const poster =
    movie.poster_path ||
    movie.poster ||
    "https://via.placeholder.com/300x450/1a1a1a/666?text=No+Poster";

  const title = movie.title || "Untitled";
  const year = movie.year || movie.release_date?.slice(0, 4) || "";
  const rating = movie.rating ?? movie.vote_average ?? null;

  return (
    <Link
      to={`/movies/${movie.id}`}
      className="group relative block w-[140px] shrink-0 overflow-hidden rounded-lg bg-zinc-900 sm:w-[160px] md:w-[180px]"
    >
      <div className="aspect-[2/3] overflow-hidden">
        <img
          src={poster}
          alt={title}
          loading="lazy"
          className="h-full w-full object-cover transition duration-300 group-hover:scale-110"
          onError={(e) => {
            e.target.src =
              "https://via.placeholder.com/300x450/1a1a1a/666?text=No+Poster";
          }}
        />
      </div>

      {/* Hover overlay */}
      <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black via-black/40 to-transparent p-3 opacity-0 transition duration-300 group-hover:opacity-100">
        <h3 className="line-clamp-2 text-sm font-bold text-white">{title}</h3>
        <div className="mt-1 flex items-center gap-2 text-xs text-gray-300">
          {year && <span>{year}</span>}
          {rating != null && (
            <span className="flex items-center gap-0.5 text-yellow-400">
              ★ {Number(rating).toFixed(1)}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
