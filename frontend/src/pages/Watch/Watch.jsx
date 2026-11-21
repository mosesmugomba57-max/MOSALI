import { useEffect, useState, useRef } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { VideoPlayer } from "../../components/player/VideoPlayer";
import { MovieCard } from "../../components/movie/MovieCard/MovieCard";
import { fetchMovieById } from "../../services/movieService";
import { useContinueWatching } from "../../context/ContinueWatchingContext";

/* High-speed feature film video streams */
const BACKUP_STREAMS = [
  "https://media.w3.org/2010/05/sintel/trailer.mp4",
  "https://media.w3.org/2010/05/bunny/trailer.mp4",
  "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
];

const FALLBACK_CATALOG = {
  "19995": {
    id: 19995,
    title: "Avatar",
    overview:
      "In the 22nd century, a paraplegic Marine is dispatched to the moon Pandora on a unique mission, but becomes torn between following orders and protecting an alien civilization.",
    release_date: "2009-12-15",
    year: "2009",
    vote_average: 7.6,
    rating: 7.6,
    runtime: 162,
    trailer: "5PSNL1qE6VY",
    poster_path: "https://image.tmdb.org/t/p/w500/jRXYjXNq0Cs2TcJjLgxiUJFAVbu.jpg",
    backdrop_path: "https://image.tmdb.org/t/p/original/vL5LR6WdxWPjLPFRLe133jXWsh5.jpg",
    genres: ["Action", "Adventure", "Fantasy", "Science Fiction"],
    stream_url: "https://media.w3.org/2010/05/sintel/trailer.mp4",
  },
  "603692": {
    id: 603692,
    title: "John Wick: Chapter 4",
    overview:
      "With the price on his head ever increasing, John Wick uncovers a path to defeating The High Table.",
    release_date: "2023-03-22",
    year: "2023",
    vote_average: 7.8,
    rating: 7.8,
    runtime: 169,
    trailer: "qEVUtrk8_B4",
    poster_path: "https://image.tmdb.org/t/p/w500/vZloFAK7NmvMGKE7VkF5UHaz0I.jpg",
    backdrop_path: "https://image.tmdb.org/t/p/original/h8gHn0OzBoaefsYseUzzwQs0ubT.jpg",
    genres: ["Action", "Thriller", "Crime"],
    stream_url: "https://media.w3.org/2010/05/sintel/trailer.mp4",
  },
  "157336": {
    id: 157336,
    title: "Interstellar",
    overview:
      "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
    release_date: "2014-11-05",
    year: "2014",
    vote_average: 8.4,
    rating: 8.4,
    runtime: 169,
    trailer: "zSWdZVtXT7E",
    poster_path: "https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",
    backdrop_path: "https://image.tmdb.org/t/p/original/xJHokMblPvKOPSUobwN7b4G9Q9P.jpg",
    genres: ["Adventure", "Drama", "Science Fiction"],
    stream_url: "https://media.w3.org/2010/05/sintel/trailer.mp4",
  },
};

const MOCK_EPISODES = [
  { id: 1, title: "Episode 1: Awakening", duration: "45m", thumbnail: "" },
  { id: 2, title: "Episode 2: The Horizon", duration: "42m", thumbnail: "" },
  { id: 3, title: "Episode 3: Breaking Point", duration: "48m", thumbnail: "" },
  { id: 4, title: "Episode 4: Into The Abyss", duration: "44m", thumbnail: "" },
  { id: 5, title: "Episode 5: Revelation", duration: "50m", thumbnail: "" },
];

const MOCK_SUBTITLE_TRACKS = ["English", "Swahili", "French", "Arabic"];

function resolveStream(movie, movieId) {
  if (movie?.stream_url) return movie.stream_url;
  const str = String(movieId || movie?.id || "1");
  let sum = 0;
  for (let i = 0; i < str.length; i++) sum += str.charCodeAt(i);
  return BACKUP_STREAMS[sum % BACKUP_STREAMS.length];
}

export function Watch() {
  const { id, seriesId, season = "1", episode = "1" } = useParams();
  const movieId = id || seriesId || "19995";
  const navigate = useNavigate();
  const { addProgress, getProgress } = useContinueWatching();

  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentEpisodeIdx, setCurrentEpisodeIdx] = useState(Number(episode) - 1);
  const [episodes] = useState(MOCK_EPISODES);
  const [isSeries] = useState(!!seriesId);
  const [activeServer, setActiveServer] = useState("server1"); // "server1" | "trailer" | "embed"
  const saveTimer = useRef(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);

    fetchMovieById(movieId)
      .then((data) => {
        if (!cancelled) {
          setMovie(data);
          setLoading(false);
        }
      })
      .catch((err) => {
        console.warn("Could not reach backend API, loading catalog fallback:", err.message);
        if (!cancelled) {
          // If backend is off or returns 404, load fallback or create a dynamic title
          const fallback = FALLBACK_CATALOG[String(movieId)] || {
            id: movieId,
            title: "Featured Title",
            overview:
              "Stream this title in high definition with full custom controls, subtitles, and speed adjustments.",
            year: "2024",
            rating: 8.1,
            genres: ["Action", "Sci-Fi"],
            poster_path:
              "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=600",
            backdrop_path:
              "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=2070",
            stream_url: BACKUP_STREAMS[0],
          };
          setMovie(fallback);
          setLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [movieId]);

  function handleTimeUpdate(currentTime, duration) {
    if (!movie) return;
    clearTimeout(saveTimer.current);
    saveTimer.current = setTimeout(() => addProgress(movie, currentTime, duration), 2000);
  }

  function handleNext() {
    if (currentEpisodeIdx < episodes.length - 1) {
      setCurrentEpisodeIdx((i) => i + 1);
    }
  }

  function handlePrev() {
    if (currentEpisodeIdx > 0) {
      setCurrentEpisodeIdx((i) => i - 1);
    }
  }

  const savedProgress = movie ? getProgress(movie.id) : null;
  const currentEp = isSeries ? episodes[currentEpisodeIdx] : null;
  const playableStream = resolveStream(movie, movieId);

  if (loading) {
    return (
      <div className="min-h-screen bg-black pt-20 flex items-center justify-center">
        <div className="w-16 h-16 rounded-full border-4 border-zinc-700 border-t-red-500 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black pt-20 text-white">
      {/* ── Streaming Server Switcher Bar ── */}
      <div className="bg-zinc-950 border-b border-zinc-800/80 px-4 sm:px-8 py-2.5 flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2">
          <span className="text-white/40 uppercase tracking-wider font-bold text-[10px]">
            Server:
          </span>
          <button
            onClick={() => setActiveServer("server1")}
            className={`px-3 py-1.5 rounded-lg font-semibold transition ${
              activeServer === "server1"
                ? "bg-red-600 text-white shadow-md shadow-red-900/40"
                : "bg-zinc-900 text-white/60 hover:text-white border border-zinc-800"
            }`}
          >
            Server 1 (MOSALI Ultra HD)
          </button>

          {movie?.trailer && (
            <button
              onClick={() => setActiveServer("trailer")}
              className={`px-3 py-1.5 rounded-lg font-semibold transition ${
                activeServer === "trailer"
                  ? "bg-red-600 text-white shadow-md shadow-red-900/40"
                  : "bg-zinc-900 text-white/60 hover:text-white border border-zinc-800"
              }`}
            >
              Server 2 (Official Studio Trailer)
            </button>
          )}

          <button
            onClick={() => setActiveServer("embed")}
            className={`px-3 py-1.5 rounded-lg font-semibold transition ${
              activeServer === "embed"
                ? "bg-red-600 text-white shadow-md shadow-red-900/40"
                : "bg-zinc-900 text-white/60 hover:text-white border border-zinc-800"
            }`}
          >
            Server 3 (VIP Cloud Stream)
          </button>
        </div>

        <div className="flex items-center gap-3 text-white/40 text-[11px]">
          <span className="hidden sm:inline">1080p Full HD</span>
          <span className="hidden sm:inline">•</span>
          <span>Audio: Stereo 2.0</span>
          <span>•</span>
          <span className="text-emerald-400 font-medium">Stream Active</span>
        </div>
      </div>

      {/* ── Player Section ── */}
      <div className="lg:flex lg:gap-0">
        <div className="lg:flex-1">
          {activeServer === "trailer" && movie?.trailer ? (
            /* Server 2: Official YouTube studio stream */
            <div className="w-full aspect-video bg-black">
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${movie.trailer}?autoplay=1&rel=0&modestbranding=1`}
                title={movie.title}
                className="w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>
          ) : activeServer === "embed" ? (
            /* Server 3: VIP Cloud embed player */
            <div className="w-full aspect-video bg-black">
              <iframe
                src={`https://vidsrc.to/embed/movie/${movieId}`}
                title={movie?.title || "VIP Stream"}
                className="w-full h-full border-0"
                allowFullScreen
              />
            </div>
          ) : (
            /* Server 1: Native HTML5 Ultra HD player with skip 10s, speed, controls */
            <VideoPlayer
              src={playableStream}
              poster={movie?.backdrop_path || movie?.poster_path || movie?.poster}
              title={movie?.title || "Now Playing"}
              episodeTitle={
                currentEp ? `S${season} E${currentEpisodeIdx + 1} · ${currentEp.title}` : null
              }
              showSkipIntro={isSeries}
              onSkipIntro={() => console.log("Skip intro")}
              onNext={handleNext}
              onPrev={handlePrev}
              hasNext={isSeries && currentEpisodeIdx < episodes.length - 1}
              hasPrev={isSeries && currentEpisodeIdx > 0}
              subtitleTracks={MOCK_SUBTITLE_TRACKS}
              onEnded={isSeries ? handleNext : undefined}
              onTimeUpdate={handleTimeUpdate}
              initialTime={savedProgress?.currentTime || 0}
              episodesList={isSeries ? episodes : []}
              onEpisodeSelect={(ep, idx) => setCurrentEpisodeIdx(idx)}
              currentEpisodeIndex={currentEpisodeIdx}
            />
          )}
        </div>

        {/* Series episode selector */}
        {isSeries && (
          <div className="hidden lg:flex flex-col w-80 bg-zinc-950 border-l border-zinc-800 max-h-screen overflow-y-auto">
            <div className="sticky top-0 p-4 bg-zinc-950 border-b border-zinc-800 z-10">
              <h3 className="text-white font-bold text-lg">Season {season}</h3>
              <p className="text-white/40 text-sm">{episodes.length} Episodes</p>
            </div>
            <div className="p-3 space-y-2">
              {episodes.map((ep, idx) => (
                <button
                  key={ep.id}
                  onClick={() => setCurrentEpisodeIdx(idx)}
                  className={`w-full flex gap-3 p-2.5 rounded-xl text-left transition hover:bg-zinc-800 ${
                    currentEpisodeIdx === idx
                      ? "bg-red-900/30 border border-red-700/40"
                      : "border border-transparent"
                  }`}
                >
                  <div className="relative w-24 aspect-video rounded-lg bg-zinc-800 shrink-0 overflow-hidden">
                    {ep.thumbnail ? (
                      <img src={ep.thumbnail} alt="" className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-white/40 text-sm font-bold">
                        {idx + 1}
                      </div>
                    )}
                    {currentEpisodeIdx === idx && (
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                        <div className="w-7 h-7 rounded-full bg-red-500 flex items-center justify-center">
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="white">
                            <path d="M8 5v14l11-7z" />
                          </svg>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-white text-xs font-bold">Episode {idx + 1}</p>
                    <p className="text-white/60 text-xs truncate">{ep.title}</p>
                    <p className="text-white/40 text-xs mt-0.5">{ep.duration}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* ── Info panel (below player) ── */}
      <div className="max-w-6xl mx-auto px-4 sm:px-8 py-8">
        <div className="flex flex-col md:flex-row gap-6 md:gap-10">
          <div className="hidden md:block shrink-0">
            <img
              src={
                movie?.poster_path ||
                movie?.poster ||
                "https://via.placeholder.com/160x240/18181b/666?text=MOSALI"
              }
              alt={movie?.title}
              className="w-32 rounded-xl shadow-2xl border border-zinc-800"
            />
          </div>

          <div className="flex-1">
            <h1 className="text-2xl sm:text-3xl font-extrabold mb-2">{movie?.title}</h1>
            <div className="flex flex-wrap items-center gap-3 text-sm text-white/60 mb-4">
              {(movie?.year || movie?.release_date?.slice(0, 4)) && (
                <span>{movie?.year || movie?.release_date?.slice(0, 4)}</span>
              )}
              {(movie?.rating ?? movie?.vote_average) != null && (
                <span className="flex items-center gap-1 text-yellow-400">
                  ★ {Number(movie?.rating ?? movie?.vote_average).toFixed(1)}
                </span>
              )}
              {movie?.runtime && <span>{movie.runtime} min</span>}
              <span className="bg-zinc-700 px-2 py-0.5 rounded text-xs font-semibold text-white">
                HD
              </span>
              {movie?.genres?.slice(0, 3).map((g) => (
                <span
                  key={g}
                  className="bg-zinc-800 text-white/70 px-2.5 py-0.5 rounded-full text-xs"
                >
                  {g}
                </span>
              ))}
            </div>
            <p className="text-white/60 leading-relaxed max-w-2xl text-sm mb-6">
              {movie?.overview}
            </p>

            <div className="flex flex-wrap gap-3">
              <Link
                to={`/movies/${movie?.id}`}
                className="flex items-center gap-2 bg-zinc-800 hover:bg-zinc-700 text-white px-5 py-2.5 rounded-xl text-xs font-semibold transition border border-zinc-700"
              >
                <span>Movie Details</span>
              </Link>
              <Link
                to="/movies"
                className="flex items-center gap-2 bg-zinc-900 hover:bg-zinc-800 text-white/70 hover:text-white px-5 py-2.5 rounded-xl text-xs font-semibold transition border border-zinc-800"
              >
                <span>Browse More</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Cast */}
        {movie?.cast?.length > 0 && (
          <section className="mt-12">
            <h2 className="text-xl font-bold mb-5 flex items-center gap-2">
              <span className="w-1 h-6 bg-red-500 rounded-full inline-block" />
              Cast
            </h2>
            <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
              {movie.cast.map((person) => (
                <div key={person.id} className="w-24 shrink-0 text-center group">
                  <img
                    src={
                      person.profile_path ||
                      "https://via.placeholder.com/100x150/27272a/555?text=?"
                    }
                    alt={person.name}
                    className="mb-2 h-32 w-24 rounded-xl object-cover transition group-hover:scale-105"
                  />
                  <p className="text-xs font-semibold text-white/80 leading-tight">{person.name}</p>
                  {person.character && (
                    <p className="text-[10px] text-white/40 mt-0.5">{person.character}</p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* More Like This */}
        {movie?.similar?.length > 0 && (
          <section className="mt-12">
            <h2 className="text-xl font-bold mb-5 flex items-center gap-2">
              <span className="w-1 h-6 bg-red-500 rounded-full inline-block" />
              More Like This
            </h2>
            <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
              {movie.similar.map((m) => (
                <MovieCard key={m.id} movie={m} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
