
import { Link } from "react-router-dom";
import { aboutStats } from "../../data/aboutStats";
import { StatCard } from "../../components/about/StatCard";

export function About() {

    const handleLearnMore = () => {
        document.getElementById("about-mosali")?.scrollIntoView({
            behavior: "smooth"
        });
    };

    return (
        <main className="min-h-screen overflow-hidden bg-black text-white">

            {/* HERO SECTION */}
            <section className="relative flex min-h-screen items-center justify-center overflow-hidden">

                <img
                    src="https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=2070&auto=format&fit=crop"
                    alt="MOSALI Cinema"
                    className="absolute inset-0 h-full w-full object-cover"
                />

                <div className="absolute inset-0 bg-black/75"></div>

                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/40"></div>

                <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">

                    <p className="mb-5 font-semibold uppercase tracking-[0.4em] text-red-600">
                        Welcome to the world of entertainment
                    </p>

                    <h1 className="mb-6 text-5xl font-extrabold tracking-wide sm:text-6xl md:text-7xl">
                        ABOUT <span className="text-red-600">MOSALI</span>
                    </h1>

                    <p className="mx-auto mb-10 max-w-2xl text-base leading-8 text-gray-300 md:text-lg">
                        Discover movies and TV shows with MOSALI.
                        Experience entertainment through a modern,
                        beautiful and immersive streaming platform.
                        Your world. Your movies.
                    </p>

                    <div className="flex flex-col justify-center gap-4 sm:flex-row">

                        <Link
                            to="/movies"
                            className="rounded-lg bg-red-600 px-8 py-4 font-bold transition duration-300 hover:scale-105 hover:bg-red-700"
                        >
                            Explore Movies
                        </Link>

                        <button
                            onClick={handleLearnMore}
                            className="rounded-lg border border-white px-8 py-4 font-bold transition duration-300 hover:bg-white hover:text-black"
                        >
                            Learn More ↓
                        </button>

                    </div>

                </div>

                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-sm tracking-widest text-gray-400">
                    DISCOVER • WATCH • ENJOY
                </div>

            </section>


            {/* STATISTICS SECTION */}
            <section className="bg-zinc-950 px-6 py-24">

                <div className="mx-auto max-w-7xl">

                    <div className="mb-14 text-center">

                        <p className="mb-3 font-semibold uppercase tracking-widest text-red-600">
                            MOSALI IN NUMBERS
                        </p>

                        <h2 className="text-3xl font-bold md:text-4xl">
                            Entertainment at a Glance
                        </h2>

                        <p className="mt-4 text-gray-400">
                            A world of entertainment waiting to be explored.
                        </p>

                    </div>

                    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">

                        {aboutStats.map((stat) => (
                            <StatCard
                                key={stat.id}
                                stat={stat}
                            />
                        ))}

                    </div>

                </div>

            </section>


            {/* ABOUT MOSALI SECTION */}
            <section
                id="about-mosali"
                className="scroll-mt-20 bg-black px-6 py-24"
            >

                <div className="mx-auto grid max-w-7xl items-center gap-14 md:grid-cols-2">

                    <div>

                        <p className="mb-4 font-semibold uppercase tracking-widest text-red-600">
                            OUR STORY
                        </p>

                        <h2 className="mb-6 text-4xl font-extrabold md:text-5xl">
                            More Than Just <span className="text-red-600">Movies.</span>
                        </h2>

                        <p className="mb-6 leading-8 text-gray-400">
                            MOSALI is an entertainment platform created
                            to bring movie lovers closer to the stories
                            they enjoy.
                        </p>

                        <p className="mb-8 leading-8 text-gray-400">
                            Our goal is to provide a modern and enjoyable
                            movie discovery experience through a clean
                            interface, organised collections and easy
                            navigation.
                        </p>

                        <div className="h-1 w-24 rounded-full bg-red-600"></div>

                    </div>

                    <div className="relative">

                        <img
                            src="https://images.unsplash.com/photo-1478720568477-152d9b164e26?q=80&w=1200&auto=format&fit=crop"
                            alt="Cinema experience"
                            className="h-80 w-full rounded-2xl object-cover shadow-2xl shadow-red-950/30 md:h-96"
                        />

                        <div className="absolute inset-0 rounded-2xl border border-red-600/20"></div>

                    </div>

                </div>

            </section>


            {/* FEATURES SECTION */}
            <section className="bg-zinc-950 px-6 py-24">

                <div className="mx-auto max-w-7xl">

                    <div className="mb-14 text-center">

                        <p className="mb-3 font-semibold uppercase tracking-widest text-red-600">
                            THE MOSALI EXPERIENCE
                        </p>

                        <h2 className="text-3xl font-bold md:text-4xl">
                            Why Choose MOSALI?
                        </h2>

                    </div>

                    <div className="grid gap-8 md:grid-cols-3">

                        <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-8 transition duration-300 hover:border-red-600">

                            <div className="mb-5 text-4xl">🎬</div>

                            <h3 className="mb-4 text-xl font-bold">
                                Movie Discovery
                            </h3>

                            <p className="leading-7 text-gray-400">
                                Discover movies and explore different
                                entertainment categories.
                            </p>

                        </div>

                        <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-8 transition duration-300 hover:border-red-600">

                            <div className="mb-5 text-4xl">❤️</div>

                            <h3 className="mb-4 text-xl font-bold">
                                Your Favorites
                            </h3>

                            <p className="leading-7 text-gray-400">
                                Keep track of the movies you love
                                and build your personal collection.
                            </p>

                        </div>

                        <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-8 transition duration-300 hover:border-red-600">

                            <div className="mb-5 text-4xl">⬇️</div>

                            <h3 className="mb-4 text-xl font-bold">
                                Downloads
                            </h3>

                            <p className="leading-7 text-gray-400">
                                Access your organised downloads
                                through a dedicated section.
                            </p>

                        </div>

                    </div>

                </div>

            </section>


            {/* FINAL CALL TO ACTION */}
            <section className="bg-black px-6 py-24 text-center">

                <div className="mx-auto max-w-3xl">

                    <h2 className="mb-6 text-4xl font-extrabold md:text-5xl">
                        Ready to Explore <span className="text-red-600">MOSALI?</span>
                    </h2>

                    <p className="mb-8 leading-7 text-gray-400">
                        Your next favourite movie could be just one click away.
                        Start exploring the world of entertainment.
                    </p>

                    <Link
                        to="/movies"
                        className="inline-block rounded-lg bg-red-600 px-10 py-4 font-bold transition duration-300 hover:scale-105 hover:bg-red-700"
                    >
                        Explore Movies →
                    </Link>

                </div>

            </section>


            {/* FOOTER */}
            <footer className="border-t border-zinc-800 bg-zinc-950 px-6 py-8 text-center">

                <h2 className="mb-2 text-2xl font-extrabold tracking-widest text-red-600">
                    MOSALI
                </h2>

                <p className="text-sm text-gray-500">
                    Your World. Your Movies.
                </p>

                <p className="mt-4 text-xs text-gray-600">
                    © {new Date().getFullYear()} MOSALI. All rights reserved.
                </p>

            </footer>

        </main>
    );
}
