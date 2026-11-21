import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { Footer } from "../../components/Footer";

export function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [selectedPlan, setSelectedPlan] = useState("Premium");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { register } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !password) {
      setError("Please fill in all required fields.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    setLoading(true);
    setError("");

    const res = await register(name, email, password, selectedPlan);
    setLoading(false);

    if (res.success) {
      navigate("/");
    } else {
      setError(res.error || "Failed to create account.");
    }
  }

  return (
    <>
      <div className="min-h-screen bg-black text-white relative flex flex-col justify-between overflow-hidden">
        {/* Abstract Cinematic Backdrop (No faces) */}
        <div
          className="absolute inset-0 opacity-20 pointer-events-none"
          style={{
            background:
              "radial-gradient(circle at 20% 30%, #b91c1c 0%, transparent 40%), radial-gradient(circle at 80% 70%, #7f1d1d 0%, transparent 45%)",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/85 to-black/70 pointer-events-none" />

        {/* Top Header */}
        <header className="relative z-10 px-6 py-6 sm:px-12 flex items-center justify-between">
          <Link to="/" className="text-2xl sm:text-3xl font-black tracking-widest text-red-600">
            M<span className="text-white">OSALI</span>
          </Link>
          <Link
            to="/login"
            className="text-xs sm:text-sm font-semibold text-white/70 hover:text-white transition px-4 py-2 rounded-xl bg-white/5 border border-white/10 hover:border-white/25"
          >
            Sign In
          </Link>
        </header>

        {/* Main Content */}
        <main className="relative z-10 flex-1 flex items-center justify-center px-4 py-12">
          <div className="w-full max-w-xl bg-zinc-950/90 backdrop-blur-2xl border border-zinc-800/80 rounded-3xl p-8 sm:p-10 shadow-2xl">
            <div className="mb-8">
              <span className="text-xs font-bold uppercase tracking-wider text-red-500 mb-1 block">
                Start Watching Today
              </span>
              <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-white mb-2">
                Create Your Account
              </h1>
              <p className="text-sm text-white/50">
                Join MOSALI to unlock thousands of movies, series, and personalized recommendations.
              </p>
            </div>

            {error && (
              <div className="mb-6 rounded-xl border border-red-900/60 bg-red-950/40 p-4 text-xs text-red-300 flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-red-500 mt-1.5 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name & Email */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-white/60 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Maya Chen"
                    required
                    className="w-full bg-zinc-900/90 border border-zinc-800 focus:border-red-500 text-white px-4 py-3.5 rounded-xl outline-none text-sm transition placeholder:text-zinc-600"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-white/60 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="maya@example.com"
                    required
                    className="w-full bg-zinc-900/90 border border-zinc-800 focus:border-red-500 text-white px-4 py-3.5 rounded-xl outline-none text-sm transition placeholder:text-zinc-600"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-white/60 mb-2">
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="At least 6 characters"
                  required
                  className="w-full bg-zinc-900/90 border border-zinc-800 focus:border-red-500 text-white px-4 py-3.5 rounded-xl outline-none text-sm transition placeholder:text-zinc-600"
                />
              </div>

              {/* Plan Picker */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-white/60 mb-3">
                  Choose Your Streaming Tier
                </label>
                <div className="grid sm:grid-cols-2 gap-3">
                  <div
                    onClick={() => setSelectedPlan("Free")}
                    className={`p-4 rounded-2xl border cursor-pointer transition relative ${
                      selectedPlan === "Free"
                        ? "bg-red-950/20 border-red-600"
                        : "bg-zinc-900/60 border-zinc-800 hover:border-zinc-700"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold text-sm text-white">Free Basic</span>
                      <span className="text-xs text-white/40 font-mono">$0</span>
                    </div>
                    <p className="text-xs text-white/50 leading-relaxed">
                      720p HD streaming, standard catalog, ad-supported.
                    </p>
                  </div>

                  <div
                    onClick={() => setSelectedPlan("Premium")}
                    className={`p-4 rounded-2xl border cursor-pointer transition relative ${
                      selectedPlan === "Premium"
                        ? "bg-red-950/30 border-red-600"
                        : "bg-zinc-900/60 border-zinc-800 hover:border-zinc-700"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-1.5">
                        <span className="font-bold text-sm text-white">Premium Ultra</span>
                        <span className="bg-red-600 text-[10px] font-bold px-1.5 py-0.2 rounded text-white">
                          BEST
                        </span>
                      </div>
                      <span className="text-xs text-white/40 font-mono">$4.99/mo</span>
                    </div>
                    <p className="text-xs text-white/50 leading-relaxed">
                      4K Ultra HD, offline downloads, ad-free, 4 devices.
                    </p>
                  </div>
                </div>
              </div>

              <p className="text-[11px] text-white/40 leading-relaxed">
                By clicking "Create Account", you agree to the{" "}
                <Link to="/legal/terms" className="text-white/60 hover:text-white underline">
                  Terms of Use
                </Link>{" "}
                and acknowledge our{" "}
                <Link to="/legal/privacy" className="text-white/60 hover:text-white underline">
                  Privacy Policy
                </Link>
                .
              </p>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-red-600 hover:bg-red-500 disabled:opacity-50 text-white font-bold py-3.5 rounded-xl text-sm transition shadow-lg shadow-red-900/40 hover:scale-[1.01] flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Creating Your Account...</span>
                  </>
                ) : (
                  "Create Account"
                )}
              </button>
            </form>

            <div className="mt-8 pt-6 border-t border-zinc-800/80 text-center text-xs text-white/40">
              Already have an account?{" "}
              <Link to="/login" className="text-white font-semibold hover:text-red-400 transition underline">
                Sign in here
              </Link>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
}
