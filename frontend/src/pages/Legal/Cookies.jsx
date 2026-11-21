import { useState } from "react";
import { Link } from "react-router-dom";
import { Footer } from "../../components/Footer";

const COOKIE_TYPES = [
  {
    name: "Essential Cookies",
    required: true,
    desc: "These cookies are strictly necessary for MOSALI to function. They include session authentication, security tokens, and load balancing. They cannot be disabled.",
    examples: ["mosali_session", "csrf_token", "device_id"],
  },
  {
    name: "Analytics Cookies",
    required: false,
    desc: "Help us understand how users navigate MOSALI so we can improve the experience. Data is aggregated and anonymous. Provided by our internal analytics system.",
    examples: ["_analytics_id", "pageview_count", "session_duration"],
  },
  {
    name: "Performance Cookies",
    required: false,
    desc: "Used to monitor platform speed, detect errors, and ensure reliable video streaming. Helps us identify and fix technical issues faster.",
    examples: ["perf_timing", "stream_quality_log"],
  },
  {
    name: "Preference Cookies",
    required: false,
    desc: "Remember your settings across sessions — such as your chosen subtitle language, playback quality preference, and UI theme.",
    examples: ["subtitle_lang", "quality_pref", "ui_theme"],
  },
];

export function Cookies() {
  const [prefs, setPrefs] = useState({ analytics: true, performance: true, preference: true });
  const [saved, setSaved] = useState(false);

  function save() { setSaved(true); setTimeout(() => setSaved(false), 3000); }

  return (
    <>
      <div className="min-h-screen bg-black text-white">
        <div className="relative pt-28 pb-16 px-4 sm:px-8 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-zinc-900/50 to-black" />
          <div className="relative max-w-3xl mx-auto">
            <div className="flex items-center gap-2 text-xs text-white/30 mb-8 uppercase tracking-widest">
              <Link to="/" className="hover:text-white/60 transition">Home</Link>
              <span>/</span>
              <span className="text-red-500">Legal</span>
              <span>/</span>
              <span className="text-white/50">Cookie Preferences</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-black tracking-tight mb-4">Cookie Preferences</h1>
            <p className="text-white/40 text-base mb-2">Manage how MOSALI uses cookies on your device.</p>
            <p className="text-white/25 text-xs uppercase tracking-widest">Last updated: November 2026</p>
          </div>
        </div>

        <div className="max-w-3xl mx-auto px-4 sm:px-8 pb-24">
          {/* What are cookies */}
          <div className="mb-10 p-6 rounded-2xl bg-zinc-900/50 border border-zinc-800">
            <h2 className="text-lg font-bold text-white mb-3">What Are Cookies?</h2>
            <p className="text-white/55 text-sm leading-7">
              Cookies are small text files stored on your device when you visit a website. They help the site remember your preferences, keep you logged in between visits, and understand how you use the service. MOSALI uses only the cookie categories listed below — we do not use advertising or cross-site tracking cookies.
            </p>
          </div>

          {/* Cookie categories */}
          <div className="space-y-4 mb-12">
            {COOKIE_TYPES.map((type) => {
              const key = type.name.split(" ")[0].toLowerCase();
              const isOn = type.required || prefs[key];
              return (
                <div key={type.name} className="bg-zinc-900/50 border border-zinc-800 hover:border-zinc-700 rounded-2xl p-6 transition">
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <div>
                      <h3 className="text-white font-bold text-base">{type.name}</h3>
                      {type.required && (
                        <span className="text-xs text-red-400 font-semibold uppercase tracking-wider">Always Active</span>
                      )}
                    </div>
                    {/* Toggle */}
                    {!type.required ? (
                      <button
                        onClick={() => setPrefs((p) => ({ ...p, [key]: !p[key] }))}
                        className={`relative shrink-0 w-12 h-6 rounded-full transition-colors duration-300 ${isOn ? "bg-red-600" : "bg-zinc-700"}`}
                      >
                        <span className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform duration-300 ${isOn ? "translate-x-6" : "translate-x-0"}`} />
                      </button>
                    ) : (
                      <div className="relative shrink-0 w-12 h-6 rounded-full bg-red-900/40 border border-red-900/50">
                        <span className="absolute top-0.5 right-0.5 w-5 h-5 bg-red-500 rounded-full shadow" />
                      </div>
                    )}
                  </div>
                  <p className="text-white/50 text-sm leading-6 mb-3">{type.desc}</p>
                  <div className="flex flex-wrap gap-2">
                    {type.examples.map((ex) => (
                      <code key={ex} className="text-xs bg-zinc-800 text-white/40 px-2 py-0.5 rounded font-mono">{ex}</code>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Save button */}
          <div className="flex items-center gap-4">
            <button onClick={save} className="bg-red-600 hover:bg-red-500 text-white font-bold px-8 py-3 rounded-xl transition hover:scale-105">
              Save Preferences
            </button>
            {saved && <span className="text-green-400 text-sm font-semibold">Preferences saved.</span>}
          </div>

          <div className="mt-14 pt-8 border-t border-zinc-800 text-white/30 text-xs space-y-1">
            <p>Related: <Link to="/legal/privacy" className="text-white/50 hover:text-white">Privacy Policy</Link> · <Link to="/legal/terms" className="text-white/50 hover:text-white">Terms of Use</Link></p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
