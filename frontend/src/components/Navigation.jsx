import { NavLink, useNavigate, Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { useMyList } from "../context/MyListContext";
import { useAuth } from "../context/AuthContext";

const SearchIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
  </svg>
);

const BellIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z" />
  </svg>
);

const CheckIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
  </svg>
);

const INITIAL_NOTIFICATIONS = [
  {
    id: 1,
    title: "Trending Movies Updated",
    message: "Live catalog synced with TMDB. Check out today's trending movies.",
    time: "Just now",
    unread: true,
    to: "/movies",
    thumbnail: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=200&auto=format&fit=crop",
    category: "New Release",
  },
  {
    id: 2,
    title: "Enhanced Video Player Live",
    message: "Skip 10s back/forward, speed control, subtitle toggle & full orientation support are ready.",
    time: "2 hours ago",
    unread: true,
    to: "/watch/19995",
    thumbnail: "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?q=80&w=200&auto=format&fit=crop",
    category: "Feature",
  },
  {
    id: 3,
    title: "Trending on MOSALI",
    message: "Discover this week's top-rated action and sci-fi films trending worldwide.",
    time: "Yesterday",
    unread: true,
    to: "/movies",
    thumbnail: "https://images.unsplash.com/photo-1534796636912-3b95b3ab5986?q=80&w=200&auto=format&fit=crop",
    category: "Trending",
  },
  {
    id: 4,
    title: "Downloads Available",
    message: "Save your favorite movies and shows for offline viewing anytime.",
    time: "2 days ago",
    unread: false,
    to: "/downloads",
    thumbnail: "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?q=80&w=200&auto=format&fit=crop",
    category: "App",
  },
];

export function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);

  const { user, logout } = useAuth();
  const { myList } = useMyList();
  const navigate = useNavigate();
  const searchRef = useRef(null);

  const [notifications, setNotifications] = useState(() => {
    try {
      const saved = localStorage.getItem("mosali_notifications");
      return saved ? JSON.parse(saved) : INITIAL_NOTIFICATIONS;
    } catch {
      return INITIAL_NOTIFICATIONS;
    }
  });

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  useEffect(() => {
    if (searchOpen) searchRef.current?.focus();
  }, [searchOpen]);

  useEffect(() => {
    try {
      localStorage.setItem("mosali_notifications", JSON.stringify(notifications));
    } catch {
      // storage quota or disabled
    }
  }, [notifications]);

  function handleSearch(e) {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
      setSearchQuery("");
    }
  }

  function handleNotificationClick(notif) {
    setNotifications((prev) =>
      prev.map((n) => (n.id === notif.id ? { ...n, unread: false } : n))
    );
    setNotifOpen(false);
    if (notif.to) {
      navigate(notif.to);
    }
  }

  function markAllAsRead() {
    setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })));
  }

  function clearNotification(e, id) {
    e.stopPropagation();
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  }

  function clearAllNotifications() {
    setNotifications([]);
  }

  function handleSignOut() {
    logout();
    setUserMenuOpen(false);
    setMobileOpen(false);
    navigate("/login");
  }

  const unreadCount = notifications.filter((n) => n.unread).length;

  const linkClass = ({ isActive }) =>
    `text-sm font-medium transition-colors duration-200 relative pb-0.5 ${
      isActive
        ? "text-white after:absolute after:bottom-0 after:left-0 after:right-0 after:h-px after:bg-red-500"
        : "text-white/50 hover:text-white"
    }`;

  return (
    <>
      <nav
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-zinc-950/95 backdrop-blur-md border-b border-zinc-800/50 shadow-2xl"
            : "bg-gradient-to-b from-black/70 to-transparent"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3.5 sm:px-6">
          {/* Logo */}
          <NavLink to="/" className="flex items-center gap-1 group">
            <span className="text-xl font-black tracking-widest text-red-600 group-hover:text-red-500 transition">
              M<span className="text-white">OSALI</span>
            </span>
          </NavLink>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-7">
            <NavLink to="/" end className={linkClass}>
              Home
            </NavLink>
            <NavLink to="/movies" className={linkClass}>
              Movies
            </NavLink>
            <NavLink
              to="/my-list"
              className={({ isActive }) =>
                `text-sm font-medium transition-colors duration-200 relative pb-0.5 ${
                  isActive ? "text-white" : "text-white/50 hover:text-white"
                }`
              }
            >
              My List
              {myList.length > 0 && (
                <span className="ml-1.5 inline-flex items-center justify-center bg-red-600 text-white text-[9px] font-bold w-4 h-4 rounded-full">
                  {myList.length > 9 ? "9+" : myList.length}
                </span>
              )}
            </NavLink>
            <NavLink to="/downloads" className={linkClass}>
              Downloads
            </NavLink>
            <NavLink to="/about" className={linkClass}>
              About
            </NavLink>
          </div>

          {/* Right controls */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Search */}
            <div className="flex items-center">
              {searchOpen ? (
                <form onSubmit={handleSearch} className="flex items-center">
                  <input
                    ref={searchRef}
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search movies, series..."
                    className="bg-zinc-900/90 border border-zinc-700 focus:border-red-500 text-white text-sm px-4 py-2 rounded-l-xl outline-none w-40 sm:w-52 transition"
                  />
                  <button
                    type="submit"
                    className="bg-red-600 hover:bg-red-700 text-white px-3.5 py-2 rounded-r-xl transition"
                  >
                    <SearchIcon />
                  </button>
                </form>
              ) : (
                <button
                  onClick={() => setSearchOpen(true)}
                  className="text-white/50 hover:text-white p-2.5 transition rounded-lg hover:bg-white/5"
                  title="Search"
                >
                  <SearchIcon />
                </button>
              )}
              {searchOpen && (
                <button
                  onClick={() => {
                    setSearchOpen(false);
                    setSearchQuery("");
                  }}
                  className="text-white/40 hover:text-white ml-1.5 text-lg leading-none"
                >
                  ×
                </button>
              )}
            </div>

            {/* Notification Bell with Dropdown */}
            <div className="relative">
              <button
                onClick={() => {
                  setNotifOpen((v) => !v);
                  setUserMenuOpen(false);
                }}
                className={`relative p-2.5 transition rounded-lg hover:bg-white/5 ${
                  notifOpen ? "text-white bg-white/10" : "text-white/60 hover:text-white"
                }`}
                title="Notifications"
                aria-label="Notifications"
              >
                <BellIcon />
                {unreadCount > 0 && (
                  <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full ring-2 ring-zinc-950 animate-pulse" />
                )}
              </button>

              {/* Notification Popover */}
              {notifOpen && (
                <div className="absolute right-0 top-full mt-2 w-80 sm:w-96 bg-zinc-900/95 backdrop-blur-xl border border-zinc-800 rounded-2xl shadow-2xl overflow-hidden z-50 animate-fadeIn">
                  <div className="flex items-center justify-between px-4 py-3.5 border-b border-zinc-800/80 bg-zinc-950/60">
                    <div className="flex items-center gap-2">
                      <span className="text-white font-bold text-sm">Notifications</span>
                      {unreadCount > 0 && (
                        <span className="bg-red-600/30 text-red-400 border border-red-800/50 text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                          {unreadCount} new
                        </span>
                      )}
                    </div>
                    {unreadCount > 0 && (
                      <button
                        onClick={markAllAsRead}
                        className="text-xs text-red-400 hover:text-red-300 transition flex items-center gap-1 font-medium"
                      >
                        <CheckIcon /> Mark all read
                      </button>
                    )}
                  </div>

                  <div className="max-h-80 overflow-y-auto divide-y divide-zinc-800/50">
                    {notifications.length === 0 ? (
                      <div className="p-8 text-center text-white/40 text-sm">
                        <div className="w-10 h-10 rounded-full bg-zinc-800 mx-auto mb-3 flex items-center justify-center text-white/30">
                          <BellIcon />
                        </div>
                        <p className="font-medium text-white/60 mb-1">No notifications</p>
                        <p className="text-xs text-white/35">You're all caught up with latest updates!</p>
                      </div>
                    ) : (
                      notifications.map((notif) => (
                        <div
                          key={notif.id}
                          onClick={() => handleNotificationClick(notif)}
                          className={`flex items-start gap-3 p-3.5 hover:bg-zinc-800/60 cursor-pointer transition relative group ${
                            notif.unread ? "bg-red-950/15" : ""
                          }`}
                        >
                          <div className="w-12 h-14 rounded-lg bg-zinc-800 shrink-0 overflow-hidden border border-zinc-700/50">
                            {notif.thumbnail ? (
                              <img
                                src={notif.thumbnail}
                                alt=""
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-white/40">
                                <BellIcon />
                              </div>
                            )}
                          </div>

                          <div className="flex-1 min-w-0 pr-4">
                            <div className="flex items-center gap-2 mb-0.5">
                              <span className="text-[10px] uppercase font-bold tracking-wider text-red-500">
                                {notif.category}
                              </span>
                              <span className="text-[10px] text-white/30">{notif.time}</span>
                            </div>
                            <h4
                              className={`text-xs truncate ${
                                notif.unread ? "font-bold text-white" : "font-medium text-white/80"
                              }`}
                            >
                              {notif.title}
                            </h4>
                            <p className="text-[11px] text-white/50 leading-relaxed line-clamp-2 mt-0.5">
                              {notif.message}
                            </p>
                          </div>

                          {notif.unread && (
                            <span className="w-1.5 h-1.5 rounded-full bg-red-500 shrink-0 mt-2" />
                          )}

                          <button
                            onClick={(e) => clearNotification(e, notif.id)}
                            className="absolute top-2 right-2 text-white/20 hover:text-white/70 p-1 opacity-0 group-hover:opacity-100 transition text-xs"
                            title="Dismiss"
                          >
                            ×
                          </button>
                        </div>
                      ))
                    )}
                  </div>

                  {notifications.length > 0 && (
                    <div className="p-2.5 border-t border-zinc-800/80 bg-zinc-950/40 text-center">
                      <button
                        onClick={clearAllNotifications}
                        className="text-xs text-white/40 hover:text-red-400 transition font-medium"
                      >
                        Clear all notifications
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* User Profile or Sign In Button */}
            {user ? (
              <div className="relative">
                <button
                  onClick={() => {
                    setUserMenuOpen((v) => !v);
                    setNotifOpen(false);
                  }}
                  className="w-8 h-8 rounded-full overflow-hidden bg-gradient-to-br from-red-600 to-red-800 ring-2 ring-zinc-700 hover:ring-red-500 transition shadow-lg flex items-center justify-center text-white text-xs font-black select-none"
                >
                  {user.name ? user.name[0].toUpperCase() : "S"}
                </button>

                {userMenuOpen && (
                  <div className="absolute right-0 top-full mt-2 bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden shadow-2xl w-52 z-50 animate-fadeIn">
                    <div className="px-4 py-3.5 border-b border-zinc-800 bg-zinc-950/50">
                      <p className="text-white text-xs font-bold truncate">{user.name}</p>
                      <p className="text-white/40 text-[10px] truncate">{user.email}</p>
                      <span className="inline-block mt-1 bg-red-600/20 text-red-400 border border-red-900/40 text-[9px] font-bold uppercase tracking-wider px-2 py-0.2 rounded">
                        {user.plan || "Premium"}
                      </span>
                    </div>

                    <div className="p-1 space-y-0.5">
                      <NavLink
                        to="/profile"
                        onClick={() => setUserMenuOpen(false)}
                        className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs text-white/70 hover:text-white hover:bg-zinc-800 transition"
                      >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                        </svg>
                        <span>Profile</span>
                      </NavLink>

                      <NavLink
                        to="/settings"
                        onClick={() => setUserMenuOpen(false)}
                        className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs text-white/70 hover:text-white hover:bg-zinc-800 transition"
                      >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z" />
                        </svg>
                        <span>Playback &amp; Settings</span>
                      </NavLink>

                      <NavLink
                        to="/downloads"
                        onClick={() => setUserMenuOpen(false)}
                        className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs text-white/70 hover:text-white hover:bg-zinc-800 transition"
                      >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z" />
                        </svg>
                        <span>Downloads</span>
                      </NavLink>
                    </div>

                    <div className="border-t border-zinc-800 p-1">
                      <button
                        onClick={handleSignOut}
                        className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs text-red-400 hover:text-red-300 hover:bg-red-950/30 transition font-semibold"
                      >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z" />
                        </svg>
                        <span>Sign Out</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  to="/login"
                  className="text-xs font-bold text-white bg-red-600 hover:bg-red-500 px-4 py-2 rounded-xl transition shadow-md shadow-red-900/30"
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  className="hidden sm:inline-block text-xs font-semibold text-white/70 hover:text-white px-3 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 transition"
                >
                  Register
                </Link>
              </div>
            )}

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileOpen((v) => !v)}
              className="md:hidden text-white/60 hover:text-white p-2.5 transition rounded-lg hover:bg-white/5"
            >
              {mobileOpen ? (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
                </svg>
              ) : (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile slide-in menu */}
      <div
        className={`fixed inset-0 z-40 md:hidden transition-all duration-300 ${
          mobileOpen ? "visible" : "invisible"
        }`}
      >
        <div
          className={`absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity duration-300 ${
            mobileOpen ? "opacity-100" : "opacity-0"
          }`}
          onClick={() => setMobileOpen(false)}
        />
        <div
          className={`absolute top-0 right-0 h-full w-72 bg-zinc-950 border-l border-zinc-800/60 transition-transform duration-300 ${
            mobileOpen ? "translate-x-0" : "translate-x-full"
          } flex flex-col`}
        >
          <div className="flex items-center justify-between p-5 border-b border-zinc-800/60">
            <span className="text-lg font-black text-red-600 tracking-widest">MOSALI</span>
            <button
              onClick={() => setMobileOpen(false)}
              className="text-white/40 hover:text-white text-2xl leading-none"
            >
              ×
            </button>
          </div>

          {/* User card in mobile drawer */}
          {user ? (
            <div className="p-4 border-b border-zinc-800/60 bg-zinc-900/40">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-600 to-red-800 flex items-center justify-center text-white text-base font-black shadow ring-2 ring-zinc-800 shrink-0">
                  {user.name ? user.name[0].toUpperCase() : "S"}
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-bold text-white truncate">{user.name}</p>
                  <p className="text-[10px] text-white/40 truncate">{user.email}</p>
                </div>
              </div>
              <div className="flex gap-2 mt-2">
                <NavLink
                  to="/profile"
                  onClick={() => setMobileOpen(false)}
                  className="flex-1 text-center py-1.5 rounded-lg bg-zinc-800 text-[11px] font-semibold text-white/80"
                >
                  Profile
                </NavLink>
                <NavLink
                  to="/settings"
                  onClick={() => setMobileOpen(false)}
                  className="flex-1 text-center py-1.5 rounded-lg bg-zinc-800 text-[11px] font-semibold text-white/80"
                >
                  Settings
                </NavLink>
              </div>
            </div>
          ) : (
            <div className="p-4 border-b border-zinc-800/60 bg-zinc-900/40 space-y-2">
              <Link
                to="/login"
                onClick={() => setMobileOpen(false)}
                className="block w-full text-center py-2.5 rounded-xl bg-red-600 text-white font-bold text-xs shadow-md shadow-red-900/30"
              >
                Sign In
              </Link>
              <Link
                to="/register"
                onClick={() => setMobileOpen(false)}
                className="block w-full text-center py-2 rounded-xl bg-zinc-800 text-white/70 text-xs font-semibold"
              >
                Create Account
              </Link>
            </div>
          )}

          <nav className="flex flex-col gap-1 p-4 flex-1 overflow-y-auto">
            {[
              { to: "/", label: "Home", end: true },
              { to: "/movies", label: "Movies" },
              { to: "/my-list", label: `My List${myList.length > 0 ? ` (${myList.length})` : ""}` },
              { to: "/downloads", label: "Downloads" },
              { to: "/search", label: "Search" },
              { to: "/about", label: "About" },
            ].map(({ to, label, end }) => (
              <NavLink
                key={to}
                to={to}
                end={end}
                onClick={() => setMobileOpen(false)}
                className={({ isActive }) =>
                  `px-4 py-3 rounded-xl text-sm font-medium transition ${
                    isActive
                      ? "bg-red-900/30 text-red-400 border border-red-900/30"
                      : "text-white/55 hover:text-white hover:bg-zinc-900"
                  }`
                }
              >
                {label}
              </NavLink>
            ))}

            <div className="mt-4 pt-4 border-t border-zinc-800/50 space-y-1">
              <p className="text-white/25 text-xs uppercase tracking-widest px-4 mb-2">Help &amp; Legal</p>
              {[
                { to: "/help/faq", label: "FAQ" },
                { to: "/help/support", label: "Support" },
                { to: "/help/contact", label: "Contact Us" },
                { to: "/help/accessibility", label: "Accessibility" },
              ].map(({ to, label }) => (
                <NavLink
                  key={to}
                  to={to}
                  onClick={() => setMobileOpen(false)}
                  className="block px-4 py-2.5 text-sm text-white/40 hover:text-white hover:bg-zinc-900 rounded-xl transition"
                >
                  {label}
                </NavLink>
              ))}
            </div>

            {user && (
              <div className="mt-4 pt-4 border-t border-zinc-800/50">
                <button
                  onClick={handleSignOut}
                  className="w-full text-left px-4 py-2.5 text-sm text-red-400 hover:text-red-300 transition font-semibold"
                >
                  Sign Out
                </button>
              </div>
            )}
          </nav>
        </div>
      </div>

      {/* Backdrop overlay for dropdown closing */}
      {(userMenuOpen || notifOpen) && (
        <div
          className="fixed inset-0 z-30"
          onClick={() => {
            setUserMenuOpen(false);
            setNotifOpen(false);
          }}
        />
      )}
    </>
  );
}
