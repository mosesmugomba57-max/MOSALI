
import { useMyList } from "../../context/MyListContext";
import { MovieCard } from "../../components/movie/MovieCard/MovieCard";

export function MyList() {

    const { myList } = useMyList();

    return (

        <div className="min-h-screen bg-[#111] px-8 py-10">

            <h1 className="text-white text-5xl font-bold mb-10">
                My List
            </h1>

            {myList.length === 0 ? (

                <div className="flex flex-col items-center justify-center py-24 text-center">

                    <div className="text-6xl mb-5">
                        🎬
                    </div>

                    <h2 className="text-white text-2xl font-bold">
                        Your list is empty
                    </h2>

                    <p className="text-gray-400 mt-3">
                        Add your favourite movies to watch them later.
                    </p>

                </div>

            ) : (

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">

                    {myList.map((movie) => (

                        <MovieCard
                            key={movie.id}
                            movie={movie}
                        />

                    ))}

                </div>

            )}

        </div>

    );
}
