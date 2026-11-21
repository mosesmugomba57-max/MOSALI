import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { Footer } from "../../components/Footer";

export function Login() {
  const [email, setEmail] = useState("salomonsterk@gmail.com");
  const [password, setPassword] = useState("salim");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";

  async function handleSubmit(e) {
    e.preventDefault();
    if (!email || !password) {
      setError("Please fill in both email/username and password.");
      return;
    }

    setLoading(true);
    setError("");

    const res = await login(email, password);
    setLoading(false);

    if (res.success) {
      navigate(from, { replace: true });
    } else {
      setError(res.error || "Invalid credentials.");
    }
  }

  function handleQuickLogin() {
    setEmail("salomonsterk@gmail.com");
    setPassword("salim");
    setLoading(true);
    setTimeout(async () => {
      await login("salomonsterk@gmail.com", "salim");
      setLoading(false);
      navigate(from, { replace: true });
    }, 300);
  }

  return (
    <>
      <div className="min-h-screen bg-black text-white relative flex flex-col justify-between overflow-hidden">
        {/* Abstract Cinematic Gradient (No faces) */}
        <div
          className="absolute inset-0 opacity-20 pointer-events-none"
          style={{
            background:
              "radial-gradient(circle at 20% 30%, #b91c1c 0%, transparent 40%), radial-gradient(circle at 80% 70%, #7f1d1d 0%, transparent 45%)",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/95 to-black pointer-events-none" />

        {/* Top Header */}
        <header className="relative z-10 px-6 py-6 sm:px-12 flex items-center justify-between">
          <Link to="/" className="text-2xl sm:text-3xl font-black tracking-widest text-red-600">
            M<span className="text-white">OSALI</span>
          </Link>
          <Link
            to="/register"
            className="text-xs sm:text-sm font-semibold text-white/70 hover:text-white transition px-4 py-2 rounded-xl bg-white/5 border border-white/10 hover:border-white/25"
          >
            Create Account
          </Link>
        </header>

        {/* Main Form */}
        <main className="relative z-10 flex-1 flex items-center justify-center px-4 py-12">
          <div className="w-full max-w-md bg-zinc-950/90 backdrop-blur-2xl border border-zinc-800/80 rounded-3xl p-8 sm:p-10 shadow-2xl">
            <div className="mb-6">
              <h1 className="text-3xl font-black tracking-tight text-white mb-2">Sign In</h1>
              <p className="text-xs text-white/50">
                Enter your credentials to access your MOSALI watchlist and streaming.
              </p>
            </div>

            {/* Quick credentials pill */}
            <div className="mb-6 p-3 rounded-2xl bg-zinc-900/80 border border-zinc-800 text-xs text-white/70 space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-white/40 font-mono text-[11px]">Email / User:</span>
                <span className="font-semibold text-white">salomonsterk@gmail.com</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-white/40 font-mono text-[11px]">Password:</span>
                <span className="font-semibold text-red-400 font-mono">salim</span>
              </div>
            </div>

            {error && (
              <div className="mb-6 rounded-xl border border-red-900/60 bg-red-950/40 p-3.5 text-xs text-red-300 flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-red-500 mt-1.5 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-white/60 mb-2">
                  Email or Username
                </label>
                <input
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="salomonsterk@gmail.com or salim"
                  required
                  className="w-full bg-zinc-900/90 border border-zinc-800 focus:border-red-500 text-white px-4 py-3 rounded-xl outline-none text-sm transition placeholder:text-zinc-600"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-xs font-semibold uppercase tracking-wider text-white/60">
                    Password
                  </label>
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-xs text-white/40 hover:text-white transition"
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="salim"
                  required
                  className="w-full bg-zinc-900/90 border border-zinc-800 focus:border-red-500 text-white px-4 py-3 rounded-xl outline-none text-sm transition placeholder:text-zinc-600"
                />
              </div>

              <div className="flex items-center justify-between text-xs text-white/60 pt-1">
                <label className="flex items-center gap-2 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-4 h-4 rounded bg-zinc-800 border-zinc-700 accent-red-600 cursor-pointer"
                  />
                  <span>Remember me</span>
                </label>
                <Link to="/help/support" className="text-white/40 hover:text-red-400 transition">
                  Need help?
                </Link>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-red-600 hover:bg-red-500 disabled:opacity-50 text-white font-bold py-3.5 rounded-xl text-sm transition shadow-lg shadow-red-900/40 hover:scale-[1.01] flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Signing In...</span>
                  </>
                ) : (
                  "Sign In"
                )}
              </button>
            </form>

            <div className="mt-4">
              <button
                type="button"
                onClick={handleQuickLogin}
                className="w-full bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 hover:border-zinc-700 text-white/80 hover:text-white font-semibold py-3 rounded-xl text-xs transition flex items-center justify-center gap-2"
              >
                <span>Instant Sign In (Salim)</span>
              </button>
            </div>

            <div className="mt-8 pt-6 border-t border-zinc-800/80 text-center text-xs text-white/40">
              New to MOSALI?{" "}
              <Link to="/register" className="text-white font-semibold hover:text-red-400 transition underline">
                Create an account
              </Link>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
}
