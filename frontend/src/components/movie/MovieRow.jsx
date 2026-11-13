import { MovieCard } from "./MovieCard/MovieCard";

/**
 * Horizontal scrolling row – inspired by Netflix, Disney+, MovieBox
 */
export function MovieRow({ title, movies = [], loading }) {
  if (loading) {
    return (
      <section className="mb-10">
        <h2 className="mb-4 px-4 text-xl font-bold text-white sm:px-8 md:text-2xl">
          {title}
        </h2>
        <div className="flex gap-3 overflow-hidden px-4 sm:px-8">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="h-[210px] w-[140px] shrink-0 animate-pulse rounded-lg bg-zinc-800 sm:h-[240px] sm:w-[160px] md:h-[270px] md:w-[180px]"
            />
          ))}
        </div>
      </section>
    );
  }

  if (!movies.length) return null;

  return (
    <section className="mb-10">
      <h2 className="mb-4 px-4 text-xl font-bold text-white sm:px-8 md:text-2xl">
        {title}
      </h2>
      <div className="scrollbar-hide flex gap-3 overflow-x-auto px-4 pb-2 sm:px-8">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </section>
  );
}
