import { Link } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";
import { useMyList } from "../../context/MyListContext";

const PlayIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
);
const PlusIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M19 13H13v6h-2v-6H5v-2h6V5h2v6h6v2z"/></svg>
);
const CheckIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>
);
const InfoIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/></svg>
);

export function HeroBanner({ movies = [], movie: singleMovie }) {
  const featured = movies.length > 0 ? movies : singleMovie ? [singleMovie] : [];
  const [activeIdx, setActiveIdx] = useState(0);
  const { toggleList, isInList } = useMyList();

  const advance = useCallback(() => {
    setActiveIdx((i) => (i + 1) % Math.max(featured.length, 1));
  }, [featured.length]);

  useEffect(() => {
    if (featured.length <= 1) return;
    const t = setInterval(advance, 8000);
    return () => clearInterval(t);
  }, [advance, featured.length]);

  const movie = featured[activeIdx] || null;

  if (!movie) {
    return (
      <div className="relative flex h-[75vh] min-h-[500px] items-center justify-center bg-zinc-900">
        <div className="w-56 h-10 animate-shimmer rounded-xl" />
      </div>
    );
  }

  const backdrop = movie.backdrop_path || movie.poster_path || movie.poster ||
    "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=2070&auto=format&fit=crop";
  const title = movie.title || "Featured";
  const overview = movie.overview || "";
  const rating = movie.rating ?? movie.vote_average;
  const year = movie.year || movie.release_date?.slice(0, 4);
  const inList = isInList(movie.id);

  return (
    <section className="relative flex h-[78vh] min-h-[540px] items-end overflow-hidden md:h-[88vh]">
      {/* Background images */}
      {featured.map((m, i) => {
        const bg = m.backdrop_path || m.poster_path || m.poster ||
          "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=2070";
        return (
          <img key={m.id} src={bg} alt=""
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ${i === activeIdx ? "opacity-100" : "opacity-0"}`}
            onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=2070"; }} />
        );
      })}

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/50 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/50" />

      {/* Content */}
      <div className="relative z-10 max-w-3xl px-6 pb-20 pt-24 sm:px-10 md:px-16 w-full">
        {/* Live indicator */}
        <div className="mb-4 flex items-center gap-2.5">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-70" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-red-600" />
          </span>
          <p className="text-xs font-bold uppercase tracking-widest text-red-400">Featured</p>
        </div>

        {/* Title */}
        <h1 className="mb-3 text-4xl font-extrabold leading-tight text-white sm:text-5xl md:text-7xl"
          style={{ textShadow: "0 4px 32px rgba(0,0,0,0.9)" }}>
          {title}
        </h1>

        {/* Meta */}
        <div className="mb-5 flex flex-wrap items-center gap-3 text-sm">
          {year && <span className="text-white/60 font-medium">{year}</span>}
          {rating != null && (
            <span className="text-yellow-400 font-semibold">★ {Number(rating).toFixed(1)}</span>
          )}
          {movie.runtime && <span className="text-white/50">{movie.runtime} min</span>}
          <span className="bg-white/10 backdrop-blur border border-white/15 text-white/70 text-xs font-bold px-2 py-0.5 rounded">HD</span>
          {movie.genres?.slice(0, 3).map((g) => (
            <span key={g} className="bg-white/10 backdrop-blur border border-white/15 text-white/60 text-xs px-2.5 py-0.5 rounded-full">{g}</span>
          ))}
        </div>

        {/* Overview */}
        <p className="mb-7 line-clamp-3 max-w-xl text-sm leading-relaxed text-white/55 hidden sm:block">
          {overview}
        </p>

        {/* Buttons */}
        <div className="flex flex-wrap gap-3">
          <Link to={`/watch/${movie.id}`}
            className="flex items-center gap-2 rounded-xl bg-red-600 hover:bg-red-500 px-7 py-3 text-sm font-bold text-white transition-all shadow-xl shadow-red-900/40 hover:shadow-red-900/60 hover:scale-105">
            <PlayIcon /> Play Now
          </Link>
          <button onClick={() => toggleList(movie)}
            className={`flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold transition-all backdrop-blur border hover:scale-105 ${
              inList ? "bg-white/15 border-white/40 text-white" : "bg-black/30 border-white/25 text-white hover:bg-white/10"
            }`}>
            {inList ? <><CheckIcon /> In My List</> : <><PlusIcon /> My List</>}
          </button>
          <Link to={`/movies/${movie.id}`}
            className="flex items-center gap-2 rounded-xl bg-black/30 backdrop-blur border border-white/20 hover:bg-white/10 px-5 py-3 text-sm font-semibold text-white transition-all hover:scale-105">
            <InfoIcon /> More Info
          </Link>
        </div>
      </div>

      {/* Dot indicators */}
      {featured.length > 1 && (
        <div className="absolute bottom-7 right-6 z-20 flex gap-1.5">
          {featured.map((_, i) => (
            <button key={i} onClick={() => setActiveIdx(i)}
              className={`rounded-full transition-all duration-300 ${i === activeIdx ? "w-5 h-1.5 bg-red-500" : "w-1.5 h-1.5 bg-white/30 hover:bg-white/60"}`} />
          ))}
        </div>
      )}
    </section>
  );
}
