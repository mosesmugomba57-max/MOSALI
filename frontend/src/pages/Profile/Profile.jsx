import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useMyList } from "../../context/MyListContext";
import { useContinueWatching } from "../../context/ContinueWatchingContext";
import { Footer } from "../../components/Footer";

export function Profile() {
  const { user, logout, updateProfile } = useAuth();
  const { myList } = useMyList();
  const { continueWatching } = useContinueWatching();
  const navigate = useNavigate();

  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(user?.name || "Salim");
  const [showSignoutModal, setShowSignoutModal] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  function handleSaveProfile(e) {
    e.preventDefault();
    updateProfile({
      name: name.trim() || user?.name || "Salim",
    });
    setIsEditing(false);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2500);
  }

  function handleSignOut() {
    logout();
    navigate("/login");
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-4">
        <div className="max-w-md w-full bg-zinc-950 border border-zinc-800 rounded-3xl p-8 text-center">
          <div className="w-16 h-16 rounded-full bg-red-950/40 border border-red-900/50 flex items-center justify-center mx-auto mb-4 text-red-500 font-bold text-xl">
            S
          </div>
          <h2 className="text-2xl font-bold mb-2">You are not signed in</h2>
          <p className="text-sm text-white/50 mb-6">
            Sign in to access your MOSALI watchlist and streaming preferences.
          </p>
          <div className="flex flex-col gap-3">
            <Link
              to="/login"
              className="bg-red-600 hover:bg-red-500 text-white font-bold py-3 rounded-xl text-sm transition"
            >
              Sign In (Salim)
            </Link>
            <Link
              to="/register"
              className="bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-white/80 font-semibold py-3 rounded-xl text-sm transition"
            >
              Create Account
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const initial = user.name ? user.name[0].toUpperCase() : "S";

  return (
    <>
      <div className="min-h-screen bg-black text-white pt-24 pb-16 px-4 sm:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Toast Notification */}
          {saveSuccess && (
            <div className="fixed top-20 right-6 z-50 bg-emerald-950/90 border border-emerald-800 text-emerald-200 text-xs px-4 py-3 rounded-xl shadow-2xl flex items-center gap-2 animate-fadeIn">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span>Profile updated successfully!</span>
            </div>
          )}

          {/* Profile Header Card */}
          <div className="relative overflow-hidden rounded-3xl bg-zinc-950 border border-zinc-800/80 p-6 sm:p-10 mb-8 shadow-2xl">
            <div className="absolute top-0 right-0 w-80 h-80 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />

            <div className="relative flex flex-col sm:flex-row items-center sm:items-start gap-6 sm:gap-8">
              {/* Monogram Badge (No face) */}
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-gradient-to-br from-red-600 to-red-900 flex items-center justify-center text-white text-3xl sm:text-4xl font-black shadow-xl ring-4 ring-zinc-900 shrink-0 select-none">
                {initial}
              </div>

              {/* User Info */}
              <div className="flex-1 text-center sm:text-left min-w-0">
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 mb-1.5">
                  <h1 className="text-2xl sm:text-3xl font-black text-white truncate">
                    {user.name || "Salim"}
                  </h1>
                  <span className="bg-red-600/20 text-red-400 border border-red-900/40 text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full">
                    {user.plan || "Premium Ultra HD"}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-white/50 mb-3">{user.email || "salomonsterk@gmail.com"}</p>
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 text-xs text-white/40">
                  <span>Member since: {user.memberSince || "November 2026"}</span>
                  <span>•</span>
                  <span>Playback: {user.videoQuality || "1080p Full HD"}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2.5 shrink-0">
                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className="px-4 py-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 hover:border-zinc-700 text-white text-xs font-semibold transition"
                >
                  {isEditing ? "Cancel" : "Edit Name"}
                </button>
                <Link
                  to="/settings"
                  className="px-4 py-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 hover:border-zinc-700 text-white text-xs font-semibold transition"
                >
                  Settings
                </Link>
                <button
                  onClick={() => setShowSignoutModal(true)}
                  className="px-4 py-2.5 rounded-xl bg-red-950/30 hover:bg-red-900/50 border border-red-900/40 text-red-400 text-xs font-semibold transition"
                >
                  Sign Out
                </button>
              </div>
            </div>

            {/* Inline Editor */}
            {isEditing && (
              <form
                onSubmit={handleSaveProfile}
                className="mt-6 pt-6 border-t border-zinc-800/80 space-y-4 animate-fadeIn"
              >
                <div className="max-w-sm">
                  <label className="block text-xs font-semibold text-white/60 mb-2">
                    Display Name
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="w-full bg-zinc-900 border border-zinc-800 focus:border-red-500 text-white px-4 py-2.5 rounded-xl outline-none text-sm transition"
                  />
                </div>

                <div className="flex items-center gap-3">
                  <button
                    type="submit"
                    className="bg-red-600 hover:bg-red-500 text-white font-bold px-5 py-2 rounded-xl text-xs transition"
                  >
                    Save
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="bg-zinc-900 hover:bg-zinc-800 text-white/60 hover:text-white px-4 py-2 rounded-xl text-xs transition"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Quick Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
            <Link
              to="/my-list"
              className="p-5 rounded-2xl bg-zinc-950 border border-zinc-800/80 hover:border-zinc-700 transition group"
            >
              <div className="text-xs uppercase tracking-wider text-white/40 mb-1">
                My List Titles
              </div>
              <div className="text-3xl font-black text-white group-hover:text-red-500 transition">
                {myList.length}
              </div>
              <div className="text-[11px] text-white/40 mt-1">Saved titles</div>
            </Link>

            <Link
              to="/"
              className="p-5 rounded-2xl bg-zinc-950 border border-zinc-800/80 hover:border-zinc-700 transition group"
            >
              <div className="text-xs uppercase tracking-wider text-white/40 mb-1">
                In Progress
              </div>
              <div className="text-3xl font-black text-white group-hover:text-red-500 transition">
                {continueWatching.length}
              </div>
              <div className="text-[11px] text-white/40 mt-1">Continue watching</div>
            </Link>

            <Link
              to="/downloads"
              className="p-5 rounded-2xl bg-zinc-950 border border-zinc-800/80 hover:border-zinc-700 transition group"
            >
              <div className="text-xs uppercase tracking-wider text-white/40 mb-1">
                Downloads
              </div>
              <div className="text-3xl font-black text-white group-hover:text-red-500 transition">
                3
              </div>
              <div className="text-[11px] text-white/40 mt-1">Offline titles</div>
            </Link>

            <div className="p-5 rounded-2xl bg-zinc-950 border border-zinc-800/80">
              <div className="text-xs uppercase tracking-wider text-white/40 mb-1">
                Current Plan
              </div>
              <div className="text-lg font-black text-red-500 truncate mt-1">
                {user.plan || "Premium"}
              </div>
              <div className="text-[11px] text-white/40 mt-1">Active</div>
            </div>
          </div>

          {/* Quick Shortcuts */}
          <div className="p-6 rounded-3xl bg-zinc-950 border border-zinc-800/80">
            <h3 className="text-sm font-bold uppercase tracking-wider text-white mb-4">
              Account Shortcuts
            </h3>
            <div className="grid sm:grid-cols-2 gap-3">
              <Link
                to="/settings"
                className="flex items-center justify-between p-3.5 rounded-xl bg-zinc-900/50 hover:bg-zinc-900 border border-zinc-800 transition text-xs font-semibold text-white/80 hover:text-white"
              >
                <span>Streaming &amp; Video Quality Settings</span>
                <span>→</span>
              </Link>
              <Link
                to="/my-list"
                className="flex items-center justify-between p-3.5 rounded-xl bg-zinc-900/50 hover:bg-zinc-900 border border-zinc-800 transition text-xs font-semibold text-white/80 hover:text-white"
              >
                <span>Manage My List</span>
                <span>→</span>
              </Link>
              <Link
                to="/help/support"
                className="flex items-center justify-between p-3.5 rounded-xl bg-zinc-900/50 hover:bg-zinc-900 border border-zinc-800 transition text-xs font-semibold text-white/80 hover:text-white"
              >
                <span>Help &amp; Customer Support</span>
                <span>→</span>
              </Link>
              <button
                onClick={() => setShowSignoutModal(true)}
                className="flex items-center justify-between p-3.5 rounded-xl bg-red-950/20 hover:bg-red-950/40 border border-red-900/30 transition text-xs font-semibold text-red-400"
              >
                <span>Sign Out of Account</span>
                <span>→</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Sign Out Confirmation Modal */}
      {showSignoutModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 sm:p-8 max-w-sm w-full text-center shadow-2xl">
            <div className="w-12 h-12 rounded-full bg-red-950/50 border border-red-900/50 flex items-center justify-center mx-auto mb-4 text-red-500 font-bold">
              !
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Sign out of MOSALI?</h3>
            <p className="text-xs text-white/50 mb-6 leading-relaxed">
              You will be redirected to the sign in page. Your saved list and progress will be safe.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowSignoutModal(false)}
                className="flex-1 bg-zinc-800 hover:bg-zinc-700 text-white font-semibold py-3 rounded-xl text-xs transition"
              >
                Cancel
              </button>
              <button
                onClick={handleSignOut}
                className="flex-1 bg-red-600 hover:bg-red-500 text-white font-bold py-3 rounded-xl text-xs transition shadow-lg shadow-red-900/40"
              >
                Yes, Sign Out
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
}
