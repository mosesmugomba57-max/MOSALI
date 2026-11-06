
import { useMyList } from "../../../context/MyListContext";

export function MovieCard({ movie }) {

    const {
        addToMyList,
        removeFromMyList,
        isInMyList
    } = useMyList();

    const saved = isInMyList(movie.id);

    function handleMyList() {
        if (saved) {
            removeFromMyList(movie.id);
        } else {
            addToMyList(movie);
        }
    }

    return (
        <div className="group relative cursor-pointer rounded-2xl overflow-hidden bg-zinc-900">

            {/* Movie Poster */}

            <div className="overflow-hidden rounded-2xl">

                <img
                    src={movie.poster}
                    alt={movie.title}
                    className="w-full h-72 object-cover scale-105 transition duration-500 group-hover:scale-110"
                />

            </div>

            {/* Add / Remove My List Button */}

            <button
                onClick={handleMyList}
                className={`absolute top-3 right-3 z-30 w-10 h-10 rounded-full flex items-center justify-center text-xl font-bold transition ${
                    saved
                        ? "bg-red-600 text-white"
                        : "bg-black/90 text-white hover:bg-red-600"
                }`}
                title={saved ? "Remove from My List" : "Add to My List"}
            >
                {saved ? "✓" : "+"}
            </button>

            {/* ALWAYS VISIBLE OVERLAY */}

            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent rounded-2xl flex flex-col justify-end p-4 opacity-100">

                <h2 className="text-white font-bold text-lg">
                    {movie.title}
                </h2>

                <p className="text-gray-300 text-sm mt-1">
                    {movie.year ?? "—"} • {movie.duration ?? "—"}
                </p>

                <div className="flex justify-between items-center mt-3">

                    <span className="bg-red-600 px-2 py-1 rounded text-xs text-white font-semibold">
                        ★ {movie.rating ?? "—"}
                    </span>

                    <span className="text-gray-300 text-sm">
                        {movie.genre ?? "Downloaded"}
                    </span>

                </div>

            </div>

        </div>
    );
}
