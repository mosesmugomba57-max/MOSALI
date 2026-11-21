import { useState } from "react";
import { Link } from "react-router-dom";
import { MovieCard } from "../../components/movie/MovieCard/MovieCard";
import { useMyList } from "../../context/MyListContext";
import { Footer } from "../../components/Footer";

const SORT_OPTIONS = [
  { label: "Recently Added", value: "recent" },
  { label: "A to Z", value: "az" },
  { label: "Z to A", value: "za" },
  { label: "Rating", value: "rating" },
];

export function MyList() {
  const { myList, removeFromList } = useMyList();
  const [sort, setSort] = useState("recent");
  const [filterGenre, setFilterGenre] = useState("");

  const sorted = [...myList].sort((a, b) => {
    if (sort === "az") return (a.title || "").localeCompare(b.title || "");
    if (sort === "za") return (b.title || "").localeCompare(a.title || "");
    if (sort === "rating") return (b.rating ?? b.vote_average ?? 0) - (a.rating ?? a.vote_average ?? 0);
    return (b.addedAt || 0) - (a.addedAt || 0);
  });

  const genres = [...new Set(sorted.flatMap((m) => m.genres || []))].filter(Boolean);
  const filtered = filterGenre ? sorted.filter((m) => (m.genres || []).includes(filterGenre)) : sorted;

  return (
    <>
      <main className="min-h-screen bg-black text-white px-4 sm:px-8 pt-24 pb-16">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
            <div>
              <h1 className="text-4xl sm:text-5xl font-black tracking-tight">My List</h1>
              <p className="text-white/35 mt-1.5 text-sm">
                {myList.length === 0 ? "No titles saved yet" : `${myList.length} title${myList.length !== 1 ? "s" : ""}`}
              </p>
            </div>
            {myList.length > 0 && (
              <select value={sort} onChange={(e) => setSort(e.target.value)}
                className="bg-zinc-900 border border-zinc-700 focus:border-red-500 text-white/70 text-sm px-4 py-2.5 rounded-xl outline-none cursor-pointer transition">
                {SORT_OPTIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
              </select>
            )}
          </div>

          {/* Genre pills */}
          {genres.length > 0 && (
            <div className="scrollbar-hide flex gap-2 overflow-x-auto pb-3 mb-7">
              <button onClick={() => setFilterGenre("")}
                className={`shrink-0 px-4 py-1.5 rounded-full text-xs font-semibold transition border ${!filterGenre ? "bg-red-600 border-red-600 text-white" : "border-zinc-700 bg-zinc-800/60 text-white/50 hover:bg-zinc-700 hover:text-white"}`}>
                All Genres
              </button>
              {genres.map((g) => (
                <button key={g} onClick={() => setFilterGenre(g === filterGenre ? "" : g)}
                  className={`shrink-0 px-4 py-1.5 rounded-full text-xs font-semibold transition border ${filterGenre === g ? "bg-red-600 border-red-600 text-white" : "border-zinc-700 bg-zinc-800/60 text-white/50 hover:bg-zinc-700 hover:text-white"}`}>
                  {g}
                </button>
              ))}
            </div>
          )}

          {/* Empty state */}
          {myList.length === 0 && (
            <div className="flex flex-col items-center justify-center py-28 text-center">
              <div className="w-20 h-20 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center mb-6">
                <svg width="36" height="36" viewBox="0 0 24 24" fill="currentColor" className="text-zinc-600">
                  <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 14H7v-2h5v2zm5-4H7v-2h10v2zm0-4H7V7h10v2z"/>
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">Your list is empty</h2>
              <p className="text-white/35 mb-8 max-w-sm text-sm leading-relaxed">
                Save movies and shows by clicking the <span className="text-white/60">+ My List</span> button on any title.
              </p>
              <Link to="/movies"
                className="bg-red-600 hover:bg-red-500 text-white font-bold px-8 py-3 rounded-xl transition hover:scale-105 shadow-lg shadow-red-900/30">
                Browse Movies
              </Link>
            </div>
          )}

          {/* Grid */}
          {filtered.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 sm:gap-5">
              {filtered.map((movie, idx) => (
                <div key={movie.id}
                  className="animate-fadeInUp relative group/card"
                  style={{ animationDelay: `${Math.min(idx * 40, 400)}ms`, animationFillMode: "both" }}>
                  <div className="[&>div>a]:w-full w-full">
                    <MovieCard movie={movie} />
                  </div>
                  <button onClick={() => removeFromList(movie.id)}
                    className="absolute -top-2 -right-2 z-30 w-6 h-6 rounded-full bg-zinc-800 hover:bg-red-600 border border-zinc-700 hover:border-red-600 text-white/60 hover:text-white text-xs font-bold flex items-center justify-center opacity-0 group-hover/card:opacity-100 transition shadow-lg"
                    title="Remove">
                    ×
                  </button>
                </div>
              ))}
            </div>
          )}

          {myList.length > 0 && filtered.length === 0 && (
            <p className="text-center text-white/30 py-20 text-sm">No titles match this genre.</p>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
