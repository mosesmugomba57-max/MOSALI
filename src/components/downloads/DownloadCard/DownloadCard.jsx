
import { useMyList } from "../../../context/MyListContext";

export function DownloadCard({
    download,
    onDelete,
    activeMenu,
    setActiveMenu,
}) {

    const { addToMyList, isInMyList } = useMyList();

    // Convert download into a movie object
    const movieForList = {
        id: `download-${download.id}`,
        title: download.title,
        poster: download.poster,
        year: download.year ?? "—",
        duration: download.duration ?? download.size,
        rating: download.rating ?? "—",
        genre: download.genre ?? "Downloaded"
    };

    const saved = isInMyList(movieForList.id);

    // Resume
    function handleResume() {
        alert(`Resuming ${download.title}`);
        setActiveMenu(null);
    }

    // Details
    function handleDetails() {
        alert(
            `Title: ${download.title}\nSize: ${download.size}\nProgress: ${download.progress}`
        );
        setActiveMenu(null);
    }

    // Share
    async function handleShare() {

        if (navigator.share) {
            try {
                await navigator.share({
                    title: download.title,
                    text: `Check out ${download.title}!`,
                });
            } catch (error) {
                console.log("Share cancelled");
            }
        } else {
            try {
                await navigator.clipboard.writeText(download.title);
                alert("Movie title copied to clipboard!");
            } catch (error) {
                alert("Unable to copy movie title.");
            }
        }

        setActiveMenu(null);
    }

    // Add to My List
    function handleAddToMyList() {

        if (!saved) {
            addToMyList(movieForList);
        }

        setActiveMenu(null);
    }

    // Delete Download
    function handleDelete() {
        onDelete(download.id);
        setActiveMenu(null);
    }

    return (

        <div className="relative flex items-center gap-4 bg-zinc-900 rounded-xl p-4 hover:bg-zinc-800 transition-all duration-300">

            {/* Movie Poster */}

            <img
                src={download.poster}
                alt={download.title}
                className="w-20 h-28 object-cover rounded-lg"
            />

            {/* Movie Information */}

            <div className="flex-1">

                <h2 className="text-white text-lg font-semibold">
                    {download.title}
                </h2>

                <p className="text-gray-400">
                    {download.size} • {download.progress}
                </p>

            </div>

            {/* THREE DOTS BUTTON */}

            <button
                onClick={() =>
                    setActiveMenu(
                        activeMenu === download.id
                            ? null
                            : download.id
                    )
                }
                className="menu-button text-white text-2xl px-3 py-1 rounded-lg hover:bg-zinc-700"
            >
                ⋮
            </button>

            {/* DROPDOWN MENU */}

            {activeMenu === download.id && (

                <div className="absolute right-4 top-16 w-56 bg-zinc-950 border border-zinc-700 rounded-xl shadow-2xl overflow-hidden z-50">

                    <button
                        onClick={handleResume}
                        className="w-full text-left px-4 py-3 text-white hover:bg-zinc-800 flex items-center gap-3"
                    >
                        ▶ Resume
                    </button>

                    <button
                        onClick={handleDetails}
                        className="w-full text-left px-4 py-3 text-white hover:bg-zinc-800 flex items-center gap-3"
                    >
                        ℹ Movie Details
                    </button>

                    {/* ADD TO MY LIST */}

                    <button
                        onClick={handleAddToMyList}
                        disabled={saved}
                        className="w-full text-left px-4 py-3 text-white hover:bg-zinc-800 disabled:text-green-500 flex items-center gap-3"
                    >
                        {saved ? "✓ Already in My List" : "＋ Add to My List"}
                    </button>

                    <button
                        onClick={handleShare}
                        className="w-full text-left px-4 py-3 text-white hover:bg-zinc-800 flex items-center gap-3"
                    >
                        📤 Share
                    </button>

                    <button
                        onClick={handleDelete}
                        className="w-full text-left px-4 py-3 text-red-400 hover:bg-red-500/10 flex items-center gap-3"
                    >
                        🗑 Remove Download
                    </button>

                </div>

            )}

        </div>

    );
}
