import { useRef } from "react";
import { MovieCard } from "./MovieCard/MovieCard";

export function MovieRow({ title, movies = [], loading }) {
  const scrollRef = useRef(null);

  function scroll(dir) {
    scrollRef.current?.scrollBy({ left: dir * 580, behavior: "smooth" });
  }

  if (loading) {
    return (
      <section className="mb-10 group/row">
        <div className="flex items-center gap-3 mb-5 px-4 sm:px-8">
          <span className="w-1 h-6 bg-red-600 rounded-full shrink-0" />
          <div className="h-5 w-36 animate-shimmer rounded-lg" />
        </div>
        <div className="flex gap-3 overflow-hidden px-4 sm:px-8">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="h-[220px] w-[140px] sm:w-[160px] md:w-[185px] shrink-0 animate-shimmer rounded-xl" />
          ))}
        </div>
      </section>
    );
  }

  if (!movies.length) return null;

  return (
    <section className="mb-10 group/row relative">
      {/* Header */}
      <div className="flex items-center justify-between mb-5 px-4 sm:px-8">
        <div className="flex items-center gap-3">
          <span className="w-1 h-6 bg-red-600 rounded-full shrink-0" />
          <h2 className="text-lg sm:text-xl font-bold text-white">{title}</h2>
          <span className="text-white/20 text-xs hidden sm:inline">{movies.length} titles</span>
        </div>
        <div className="hidden md:flex gap-1.5 opacity-0 group-hover/row:opacity-100 transition-opacity">
          <button onClick={() => scroll(-1)}
            className="w-8 h-8 rounded-full bg-zinc-800 hover:bg-zinc-700 text-white/70 hover:text-white flex items-center justify-center transition text-lg leading-none border border-zinc-700/50">
            ‹
          </button>
          <button onClick={() => scroll(1)}
            className="w-8 h-8 rounded-full bg-zinc-800 hover:bg-zinc-700 text-white/70 hover:text-white flex items-center justify-center transition text-lg leading-none border border-zinc-700/50">
            ›
          </button>
        </div>
      </div>

      {/* Scroll row */}
      <div className="relative">
        <button onClick={() => scroll(-1)}
          className="hidden md:flex absolute left-0 top-0 bottom-0 z-10 w-14 items-center justify-center bg-gradient-to-r from-black/70 to-transparent opacity-0 group-hover/row:opacity-100 transition-opacity text-white text-2xl font-light hover:from-black/90">
          ‹
        </button>
        <div ref={scrollRef} className="scrollbar-hide flex gap-3 overflow-x-auto px-4 sm:px-8 pb-2">
          {movies.map((movie) => <MovieCard key={movie.id} movie={movie} />)}
        </div>
        <button onClick={() => scroll(1)}
          className="hidden md:flex absolute right-0 top-0 bottom-0 z-10 w-14 items-center justify-center bg-gradient-to-l from-black/70 to-transparent opacity-0 group-hover/row:opacity-100 transition-opacity text-white text-2xl font-light hover:from-black/90">
          ›
        </button>
      </div>
    </section>
  );
}
