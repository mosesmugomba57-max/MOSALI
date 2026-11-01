
export function StatCard({ stat }) {
    return (
        <div className="group rounded-2xl border border-zinc-800 bg-zinc-900/80 p-8 text-center transition-all duration-300 hover:-translate-y-2 hover:border-red-600 hover:bg-zinc-900">

            <div className="mb-4 text-3xl text-red-600 transition-transform duration-300 group-hover:scale-110">
                {stat.icon === "Film" ? "🎬" : "📺"}
            </div>

            <h2 className="mb-3 text-4xl font-extrabold text-red-600 md:text-5xl">
                {stat.number}
            </h2>

            <p className="font-medium text-gray-400">
                {stat.title}
            </p>

        </div>
    );
}
