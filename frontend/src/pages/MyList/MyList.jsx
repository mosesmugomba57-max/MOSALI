import { movies } from "../../data/movies";
import { MovieCard } from "../../components/movies/MovieCard/MovieCard";

export function MyList() {

    return (

        <div className="min-h-screen bg-[#111] px-8 py-10">

            <h1 className="text-white text-5xl font-bold mb-10">

                My List

            </h1>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">

                {movies.map((movie) => (

                    <MovieCard
                        key={movie.id}
                        movie={movie}
                    />

                ))}

            </div>

        </div>

    )

}