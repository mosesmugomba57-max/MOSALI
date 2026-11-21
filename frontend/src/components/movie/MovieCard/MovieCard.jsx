import { Link } from "react-router-dom";
import { useMyList } from "../../../context/MyListContext";

function RatingBadge({ rating }) {
  if (rating == null) return null;
  const r = Number(rating);
  const color = r >= 7 ? "bg-emerald-700" : r >= 5 ? "bg-yellow-700" : "bg-red-800";
  return (
    <span className={`absolute top-2 left-2 ${color} text-white text-[9px] font-bold px-1.5 py-0.5 rounded-md z-10 shadow`}>
      {r.toFixed(1)}
    </span>
  );
}

export function MovieCard({ movie }) {
  const { toggleList, isInList } = useMyList();
  const poster = movie.poster_path || movie.poster ||
    "https://via.placeholder.com/300x450/18181b/555?text=MOSALI";
  const title = movie.title || "Untitled";
  const year = movie.year || movie.release_date?.slice(0, 4) || "";
  const rating = movie.rating ?? movie.vote_average ?? null;
  const inList = isInList(movie.id);

  return (
    <div className="group relative block w-[140px] shrink-0 sm:w-[160px] md:w-[185px]">
      <Link to={`/movies/${movie.id}`}
        className="block overflow-hidden rounded-xl bg-zinc-900 transition-all duration-300 group-hover:scale-105 group-hover:shadow-2xl group-hover:shadow-black/80 group-hover:z-10 relative">
        <div className="aspect-[2/3] overflow-hidden">
          <img src={poster} alt={title} loading="lazy"
            className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
            onError={(e) => { e.target.src = "https://via.placeholder.com/300x450/18181b/555?text=MOSALI"; }} />
        </div>

        <RatingBadge rating={rating} />

        {/* My List toggle */}
        <button
          onClick={(e) => { e.preventDefault(); e.stopPropagation(); toggleList(movie); }}
          className={`absolute top-2 right-2 z-20 w-7 h-7 rounded-full flex items-center justify-center transition-all opacity-0 group-hover:opacity-100 shadow ${
            inList ? "bg-red-600 text-white" : "bg-black/70 hover:bg-red-600 text-white"
          }`}
          title={inList ? "Remove from My List" : "Add to My List"}
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
            {inList
              ? <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
              : <path d="M19 13H13v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
            }
          </svg>
        </button>

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition duration-300 flex flex-col justify-end p-3 rounded-xl">
          <h3 className="text-white text-xs font-bold leading-tight line-clamp-2 mb-1">{title}</h3>
          <div className="flex items-center gap-2 text-[10px] text-white/50 mb-2.5">
            {year && <span>{year}</span>}
            {rating != null && <span className="text-yellow-400">★ {Number(rating).toFixed(1)}</span>}
          </div>
          <Link to={`/watch/${movie.id}`} onClick={(e) => e.stopPropagation()}
            className="flex items-center justify-center gap-1.5 bg-red-600 hover:bg-red-500 text-white text-[11px] font-bold py-1.5 rounded-lg transition">
            <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
            Play
          </Link>
        </div>
      </Link>
    </div>
  );
}
