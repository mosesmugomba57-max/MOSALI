import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { Footer } from "../../components/Footer";

export function Settings() {
  const { user, updateProfile, logout } = useAuth();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("playback");
  const [saveToast, setSaveToast] = useState(false);

  // Form states based on user preferences
  const [videoQuality, setVideoQuality] = useState(user?.videoQuality || "1080p");
  const [autoplayNext, setAutoplayNext] = useState(user?.autoplayNext ?? true);
  const [autoplayPreviews, setAutoplayPreviews] = useState(user?.autoplayPreviews ?? true);
  const [subtitleLang, setSubtitleLang] = useState(user?.subtitleLang || "Off");
  const [audioLang, setAudioLang] = useState(user?.audioLang || "Original (English)");
  const [downloadQuality, setDownloadQuality] = useState("High (1080p)");
  const [wifiOnly, setWifiOnly] = useState(true);
  const [emailAlerts, setEmailAlerts] = useState(true);

  // Plan state
  const [currentPlan, setCurrentPlan] = useState(user?.plan || "Premium Ultra HD");

  function triggerToast() {
    setSaveToast(true);
    setTimeout(() => setSaveToast(false), 2000);
  }

  function handleSavePlayback(e) {
    e.preventDefault();
    updateProfile({
      videoQuality,
      autoplayNext,
      autoplayPreviews,
      subtitleLang,
      audioLang,
    });
    triggerToast();
  }

  function handlePlanSwitch(newPlan) {
    setCurrentPlan(newPlan);
    updateProfile({ plan: newPlan });
    triggerToast();
  }

  function handleSignOut() {
    logout();
    navigate("/login");
  }

  function handleClearCache() {
    localStorage.removeItem("mosali_continue");
    triggerToast();
  }

  return (
    <>
      <div className="min-h-screen bg-black text-white pt-24 pb-16 px-4 sm:px-8">
        <div className="max-w-5xl mx-auto">
          {/* Toast Notification */}
          {saveToast && (
            <div className="fixed top-20 right-6 z-50 bg-emerald-950/90 border border-emerald-800 text-emerald-200 text-xs px-4 py-3 rounded-xl shadow-2xl flex items-center gap-2 animate-fadeIn">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span>Settings saved successfully!</span>
            </div>
          )}

          {/* Page Header */}
          <div className="mb-8">
            <div className="flex items-center gap-2 text-xs text-white/30 mb-2 uppercase tracking-widest">
              <Link to="/" className="hover:text-white/60 transition">
                Home
              </Link>
              <span>/</span>
              <span className="text-red-500">Settings</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-white">App &amp; Account Settings</h1>
            <p className="text-sm text-white/50 mt-1">
              Configure streaming playback, manage your subscription plan, and device preferences.
            </p>
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar Tabs */}
            <div className="lg:w-60 shrink-0">
              <nav className="flex lg:flex-col gap-1.5 overflow-x-auto pb-2 lg:pb-0 scrollbar-hide">
                {[
                  { id: "playback", label: "Playback & Video" },
                  { id: "account", label: "Subscription & Account" },
                  { id: "downloads", label: "Downloads & Storage" },
                  { id: "notifications", label: "Notifications" },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`text-left px-4 py-3 rounded-xl text-xs sm:text-sm font-semibold transition whitespace-nowrap ${
                      activeTab === tab.id
                        ? "bg-red-600/20 text-red-400 border border-red-900/40"
                        : "text-white/50 hover:text-white hover:bg-zinc-900"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </nav>

              {/* User badge */}
              {user && (
                <div className="mt-8 p-4 rounded-2xl bg-zinc-950 border border-zinc-800/80 hidden lg:block">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-600 to-red-800 flex items-center justify-center text-white text-base font-black shadow ring-2 ring-zinc-800 shrink-0 select-none">
                      {user.name ? user.name[0].toUpperCase() : "S"}
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs font-bold text-white truncate">{user.name}</p>
                      <p className="text-[10px] text-white/40 truncate">{user.email}</p>
                    </div>
                  </div>
                  <button
                    onClick={handleSignOut}
                    className="w-full text-center text-xs font-semibold py-2 rounded-lg bg-zinc-900 hover:bg-red-950/40 text-white/60 hover:text-red-400 border border-zinc-800 hover:border-red-900/40 transition"
                  >
                    Sign Out
                  </button>
                </div>
              )}
            </div>

            {/* Main Settings Panel */}
            <div className="flex-1 min-w-0">
              {/* 1. PLAYBACK & VIDEO TAB */}
              {activeTab === "playback" && (
                <form
                  onSubmit={handleSavePlayback}
                  className="space-y-6 bg-zinc-950 border border-zinc-800/80 rounded-3xl p-6 sm:p-8 animate-fadeIn"
                >
                  <div>
                    <h2 className="text-xl font-bold text-white mb-1">Playback &amp; Video Quality</h2>
                    <p className="text-xs text-white/40">
                      Customize how content streams across your browser and mobile devices.
                    </p>
                  </div>

                  {/* Quality selector */}
                  <div className="pt-4 border-t border-zinc-800/80">
                    <label className="block text-xs font-semibold uppercase tracking-wider text-white/60 mb-3">
                      Streaming Video Quality
                    </label>
                    <div className="grid sm:grid-cols-3 gap-3">
                      {[
                        { id: "Auto", label: "Auto Adaptive", sub: "Adjusts to network speed" },
                        { id: "1080p", label: "1080p Full HD", sub: "Crystal clear (Recommended)" },
                        { id: "4k", label: "4K Ultra HD", sub: "Maximum fidelity & HDR" },
                      ].map((q) => (
                        <div
                          key={q.id}
                          onClick={() => setVideoQuality(q.id)}
                          className={`p-4 rounded-2xl border cursor-pointer transition ${
                            videoQuality === q.id
                              ? "bg-red-950/20 border-red-600 text-white"
                              : "bg-zinc-900/40 border-zinc-800 hover:border-zinc-700 text-white/70"
                          }`}
                        >
                          <p className="font-bold text-sm mb-0.5">{q.label}</p>
                          <p className="text-[11px] text-white/40">{q.sub}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Toggles */}
                  <div className="pt-4 border-t border-zinc-800/80 space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-semibold text-white">Autoplay Next Episode</p>
                        <p className="text-xs text-white/40">
                          Automatically begin playing the following episode in a series.
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => setAutoplayNext(!autoplayNext)}
                        className={`relative shrink-0 w-12 h-6 rounded-full transition-colors ${
                          autoplayNext ? "bg-red-600" : "bg-zinc-700"
                        }`}
                      >
                        <span
                          className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${
                            autoplayNext ? "translate-x-6" : "translate-x-0"
                          }`}
                        />
                      </button>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-semibold text-white">Autoplay Previews on Hover</p>
                        <p className="text-xs text-white/40">
                          Play video previews while browsing titles on the home screen.
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => setAutoplayPreviews(!autoplayPreviews)}
                        className={`relative shrink-0 w-12 h-6 rounded-full transition-colors ${
                          autoplayPreviews ? "bg-red-600" : "bg-zinc-700"
                        }`}
                      >
                        <span
                          className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${
                            autoplayPreviews ? "translate-x-6" : "translate-x-0"
                          }`}
                        />
                      </button>
                    </div>
                  </div>

                  {/* Language selection */}
                  <div className="pt-4 border-t border-zinc-800/80 grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-white/60 mb-2">
                        Default Subtitle Language
                      </label>
                      <select
                        value={subtitleLang}
                        onChange={(e) => setSubtitleLang(e.target.value)}
                        className="w-full bg-zinc-900 border border-zinc-800 focus:border-red-500 text-white px-4 py-2.5 rounded-xl outline-none text-xs transition cursor-pointer"
                      >
                        <option value="Off">Off (Manual)</option>
                        <option value="English">English</option>
                        <option value="Swahili">Swahili</option>
                        <option value="French">French</option>
                        <option value="Arabic">Arabic</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-white/60 mb-2">
                        Preferred Audio Language
                      </label>
                      <select
                        value={audioLang}
                        onChange={(e) => setAudioLang(e.target.value)}
                        className="w-full bg-zinc-900 border border-zinc-800 focus:border-red-500 text-white px-4 py-2.5 rounded-xl outline-none text-xs transition cursor-pointer"
                      >
                        <option value="Original (English)">Original (English)</option>
                        <option value="Swahili Dub">Swahili Dub</option>
                        <option value="French Dub">French Dub</option>
                      </select>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="bg-red-600 hover:bg-red-500 text-white font-bold px-7 py-3 rounded-xl text-xs transition shadow-lg shadow-red-900/30"
                  >
                    Save Playback Preferences
                  </button>
                </form>
              )}

              {/* 2. SUBSCRIPTION & ACCOUNT TAB */}
              {activeTab === "account" && (
                <div className="space-y-6 bg-zinc-950 border border-zinc-800/80 rounded-3xl p-6 sm:p-8 animate-fadeIn">
                  <div>
                    <h2 className="text-xl font-bold text-white mb-1">Subscription Plan</h2>
                    <p className="text-xs text-white/40">
                      Manage your streaming plan, billing cycle, and connected account.
                    </p>
                  </div>

                  {/* Plan Cards */}
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div
                      onClick={() => handlePlanSwitch("Free Plan")}
                      className={`p-5 rounded-2xl border cursor-pointer transition ${
                        currentPlan === "Free Plan"
                          ? "bg-red-950/20 border-red-600"
                          : "bg-zinc-900/40 border-zinc-800 hover:border-zinc-700"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-bold text-base text-white">Free Basic</span>
                        <span className="text-xs text-white/40 font-mono">$0.00 / month</span>
                      </div>
                      <ul className="text-xs text-white/50 space-y-1.5 mb-4">
                        <li>• 720p HD resolution</li>
                        <li>• 1 device stream at a time</li>
                        <li>• Supported with occasional ads</li>
                      </ul>
                      {currentPlan === "Free Plan" ? (
                        <span className="inline-block bg-red-600/30 text-red-400 border border-red-900/40 text-[10px] font-bold px-2 py-0.5 rounded">
                          Current Plan
                        </span>
                      ) : (
                        <button
                          type="button"
                          className="text-xs text-red-500 hover:text-red-400 font-semibold"
                        >
                          Downgrade to Free
                        </button>
                      )}
                    </div>

                    <div
                      onClick={() => handlePlanSwitch("Premium Ultra HD")}
                      className={`p-5 rounded-2xl border cursor-pointer transition ${
                        currentPlan === "Premium Ultra HD"
                          ? "bg-red-950/30 border-red-600"
                          : "bg-zinc-900/40 border-zinc-800 hover:border-zinc-700"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-base text-white">Premium Ultra HD</span>
                          <span className="bg-red-600 text-[10px] font-bold px-1.5 py-0.2 rounded text-white">
                            Active
                          </span>
                        </div>
                        <span className="text-xs text-white/40 font-mono">$4.99 / month</span>
                      </div>
                      <ul className="text-xs text-white/50 space-y-1.5 mb-4">
                        <li>• 4K Ultra HD &amp; HDR quality</li>
                        <li>• 4 simultaneous streams</li>
                        <li>• Offline downloads on all devices</li>
                        <li>• Zero ads &amp; early releases</li>
                      </ul>
                      {currentPlan === "Premium Ultra HD" ? (
                        <span className="inline-block bg-red-600/30 text-red-400 border border-red-900/40 text-[10px] font-bold px-2 py-0.5 rounded">
                          Current Plan
                        </span>
                      ) : (
                        <button
                          type="button"
                          className="text-xs text-red-500 hover:text-red-400 font-semibold"
                        >
                          Upgrade to Premium
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Account Actions */}
                  <div className="pt-6 border-t border-zinc-800/80 space-y-4">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-white/60">
                      Security &amp; Account Actions
                    </h3>
                    <div className="flex flex-col sm:flex-row gap-3">
                      <button
                        onClick={handleSignOut}
                        className="bg-red-950/40 hover:bg-red-900/50 border border-red-900/50 text-red-400 font-bold px-6 py-3 rounded-xl text-xs transition"
                      >
                        Sign Out of MOSALI
                      </button>
                      <Link
                        to="/help/contact"
                        className="bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-white/70 hover:text-white font-semibold px-6 py-3 rounded-xl text-xs transition text-center"
                      >
                        Contact Billing Support
                      </Link>
                    </div>
                  </div>
                </div>
              )}

              {/* 3. DOWNLOADS & STORAGE TAB */}
              {activeTab === "downloads" && (
                <div className="space-y-6 bg-zinc-950 border border-zinc-800/80 rounded-3xl p-6 sm:p-8 animate-fadeIn">
                  <div>
                    <h2 className="text-xl font-bold text-white mb-1">Downloads &amp; Storage</h2>
                    <p className="text-xs text-white/40">
                      Manage offline viewing storage, file quality, and network limits.
                    </p>
                  </div>

                  <div className="pt-4 border-t border-zinc-800/80 space-y-4">
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-white/60 mb-2">
                        Download Video Quality
                      </label>
                      <select
                        value={downloadQuality}
                        onChange={(e) => setDownloadQuality(e.target.value)}
                        className="w-full sm:w-72 bg-zinc-900 border border-zinc-800 focus:border-red-500 text-white px-4 py-2.5 rounded-xl outline-none text-xs transition cursor-pointer"
                      >
                        <option value="High (1080p)">High (1080p - larger file size)</option>
                        <option value="Standard (720p)">Standard (720p - saves storage)</option>
                        <option value="Data Saver (480p)">Data Saver (480p - compact)</option>
                      </select>
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      <div>
                        <p className="text-sm font-semibold text-white">Download on Wi-Fi Only</p>
                        <p className="text-xs text-white/40">Prevent downloads over mobile cellular data.</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => setWifiOnly(!wifiOnly)}
                        className={`relative shrink-0 w-12 h-6 rounded-full transition-colors ${
                          wifiOnly ? "bg-red-600" : "bg-zinc-700"
                        }`}
                      >
                        <span
                          className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${
                            wifiOnly ? "translate-x-6" : "translate-x-0"
                          }`}
                        />
                      </button>
                    </div>
                  </div>

                  <div className="pt-6 border-t border-zinc-800/80">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-white/60 mb-3">
                      Local Cache &amp; Storage Cleanup
                    </h3>
                    <p className="text-xs text-white/40 mb-4">
                      Clear cached watch history progress and temporary session files to free up space.
                    </p>
                    <button
                      type="button"
                      onClick={handleClearCache}
                      className="bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-white/70 hover:text-white font-semibold px-5 py-2.5 rounded-xl text-xs transition"
                    >
                      Clear Playback Cache
                    </button>
                  </div>
                </div>
              )}

              {/* 4. NOTIFICATIONS TAB */}
              {activeTab === "notifications" && (
                <div className="space-y-6 bg-zinc-950 border border-zinc-800/80 rounded-3xl p-6 sm:p-8 animate-fadeIn">
                  <div>
                    <h2 className="text-xl font-bold text-white mb-1">Notification Settings</h2>
                    <p className="text-xs text-white/40">
                      Choose what updates you want to receive about new movies, series, and account activity.
                    </p>
                  </div>

                  <div className="pt-4 border-t border-zinc-800/80 space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-semibold text-white">New Release Alerts</p>
                        <p className="text-xs text-white/40">
                          Receive alerts when movies from your favourite genres or watch list drop.
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => triggerToast()}
                        className="relative shrink-0 w-12 h-6 rounded-full bg-red-600 transition-colors"
                      >
                        <span className="absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow translate-x-6 transition-transform" />
                      </button>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-semibold text-white">Weekly Recommendations Digest</p>
                        <p className="text-xs text-white/40">
                          Curated top 10 movies and series sent to your email.
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => setEmailAlerts(!emailAlerts)}
                        className={`relative shrink-0 w-12 h-6 rounded-full transition-colors ${
                          emailAlerts ? "bg-red-600" : "bg-zinc-700"
                        }`}
                      >
                        <span
                          className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${
                            emailAlerts ? "translate-x-6" : "translate-x-0"
                          }`}
                        />
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
