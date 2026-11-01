export function MovieCard({ movie }) {
    return (
        <div className="group relative cursor-pointer">

            <div className="overflow-hidden rounded-2xl">

                <img
                    src={movie.poster}
                    alt={movie.title}
                    className="w-full h-72 object-cover transition duration-500 group-hover:scale-110"
                />

            </div>

            {/* Overlay */}

            <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition duration-300 rounded-2xl flex flex-col justify-end p-4">

                <h2 className="text-white font-bold text-lg">
                    {movie.title}
                </h2>

                <p className="text-gray-300 text-sm mt-1">
                    {movie.year} • {movie.duration}
                </p>

                <div className="flex justify-between items-center mt-3">

                    <span className="bg-red-600 px-2 py-1 rounded text-xs text-white">
                        ★ {movie.rating}
                    </span>

                    <span className="text-gray-300 text-sm">
                        {movie.genre}
                    </span>

                </div>

            </div>

        </div>
    );
}