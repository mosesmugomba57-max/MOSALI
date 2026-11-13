import { NavLink } from "react-router-dom";

export function Navigation() {
  const linkClass = ({ isActive }) =>
    isActive
      ? "font-semibold text-red-600"
      : "font-semibold text-gray-300 hover:text-white";

  return (
    <nav className="fixed inset-x-0 top-0 z-50 border-b border-zinc-800 bg-black/90 px-4 py-4 backdrop-blur sm:px-6">
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        <NavLink
          to="/"
          className="text-xl font-extrabold tracking-widest text-red-600"
        >
          MOSALI
        </NavLink>

        <div className="flex items-center gap-4 text-sm sm:gap-6 sm:text-base">
          <NavLink to="/" end className={linkClass}>
            Home
          </NavLink>
          <NavLink to="/movies" className={linkClass}>
            Movies
          </NavLink>
          <NavLink to="/downloads" className={linkClass}>
            Downloads
          </NavLink>
          <NavLink to="/about" className={linkClass}>
            About
          </NavLink>
        </div>
      </div>
    </nav>
  );
}
