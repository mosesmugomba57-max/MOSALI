import { Link } from "react-router-dom";
import { Footer } from "../../components/Footer";

const FEATURES = [
  {
    title: "Keyboard Navigation",
    desc: "Full keyboard control throughout the app. Navigate menus with Tab/Shift+Tab, activate buttons with Enter or Space. The video player supports dedicated shortcuts: Space/K (play/pause), Arrow keys (seek & volume), F (fullscreen), M (mute).",
    icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor" className="text-red-500"><path d="M20 5H4c-1.1 0-1.99.9-1.99 2L2 17c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm-9 3h2v2h-2V8zm0 3h2v2h-2v-2zM8 8h2v2H8V8zm0 3h2v2H8v-2zm-1 2H5v-2h2v2zm0-3H5V8h2v2zm9 7H8v-2h8v2zm0-4h-2v-2h2v2zm0-3h-2V8h2v2zm3 3h-2v-2h2v2zm0-3h-2V8h2v2z"/></svg>,
  },
  {
    title: "Closed Captions & Subtitles",
    desc: "All content is designed to support closed captions. Enable CC through the player's subtitle selector. As our library grows, every title will be captioned in multiple languages including English, Swahili, French, and Arabic.",
    icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor" className="text-red-500"><path d="M19 4H5c-1.11 0-2 .9-2 2v12c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm-8 7H9.5v-.5h-2v3h2V13H11v1c0 .55-.45 1-1 1H7c-.55 0-1-.45-1-1v-4c0-.55.45-1 1-1h3c.55 0 1 .45 1 1v1zm7 0h-1.5v-.5h-2v3h2V13H18v1c0 .55-.45 1-1 1h-3c-.55 0-1-.45-1-1v-4c0-.55.45-1 1-1h3c.55 0 1 .45 1 1v1z"/></svg>,
  },
  {
    title: "High Contrast & Readability",
    desc: "MOSALI uses high-contrast white text on dark backgrounds throughout the interface, meeting WCAG 2.1 AA contrast standards. All text is resizable without loss of content or function up to 200% zoom.",
    icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor" className="text-red-500"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8v16z"/></svg>,
  },
  {
    title: "Screen Reader Support",
    desc: "All interactive elements carry descriptive ARIA labels. Images use meaningful alt text. The player's buttons, progress bars, and menus are fully labelled for screen readers (NVDA, JAWS, VoiceOver, TalkBack).",
    icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor" className="text-red-500"><path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM6 9h12v2H6V9zm8 5H6v-2h8v2zm4-6H6V6h12v2z"/></svg>,
  },
  {
    title: "Touch & Mobile Accessibility",
    desc: "All tap targets meet the minimum 44×44 px size standard. The video player supports double-tap gestures to skip 10 seconds. Swipe gestures are supplemented by visible buttons for users who cannot use swipes.",
    icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor" className="text-red-500"><path d="M17 1.01L7 1c-1.1 0-2 .9-2 2v18c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V3c0-1.1-.9-1.99-2-1.99zM17 19H7V5h10v14z"/></svg>,
  },
  {
    title: "Reduced Motion",
    desc: "Users who have enabled 'Reduce Motion' in their operating system preferences will see minimal animations. Auto-playing hero carousels pause, and transition effects are simplified.",
    icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor" className="text-red-500"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4 6-2.5 2.5L16 13l-1.5 1.5L12 12l-2.5 2.5L8 13l2.5-2.5L8 8l1.5-1.5L12 9l2.5-2.5L16 8z"/></svg>,
  },
];

export function Accessibility() {
  return (
    <>
      <div className="min-h-screen bg-black text-white">
        {/* Header */}
        <div className="relative pt-28 pb-20 px-4 sm:px-8 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-zinc-900/60 to-black" />
          <div className="absolute inset-0" style={{ backgroundImage: "radial-gradient(ellipse at 20% 50%, rgba(220,38,38,0.07) 0%, transparent 55%)" }} />
          <div className="relative max-w-4xl mx-auto">
            <div className="flex items-center gap-2 text-xs text-white/30 mb-8 uppercase tracking-widest">
              <Link to="/" className="hover:text-white/60 transition">Home</Link>
              <span>/</span>
              <Link to="/help/support" className="hover:text-white/60 transition">Support</Link>
              <span>/</span>
              <span className="text-red-500">Accessibility</span>
            </div>
            <h1 className="text-5xl sm:text-6xl font-black tracking-tight mb-5">Accessibility</h1>
            <p className="text-white/50 text-lg max-w-2xl leading-relaxed">
              MOSALI is committed to ensuring our platform is accessible and enjoyable for everyone — regardless of ability, disability, or how you choose to interact with the web.
            </p>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-8 pb-24">
          {/* Standards */}
          <div className="mb-14 p-7 rounded-2xl bg-gradient-to-br from-zinc-900 to-zinc-950 border border-zinc-800">
            <h2 className="text-xl font-bold text-white mb-3">Our Commitment</h2>
            <p className="text-white/55 leading-7 text-sm">
              We follow the <strong className="text-white/80">Web Content Accessibility Guidelines (WCAG) 2.1</strong> at Level AA. We continuously audit our platform using automated testing and manual review by users with disabilities. Our goal is to meet and exceed these standards as MOSALI grows.
            </p>
          </div>

          {/* Features grid */}
          <h2 className="text-2xl font-bold text-white mb-7 flex items-center gap-3">
            <span className="w-1 h-6 bg-red-600 rounded-full" />
            Accessibility Features
          </h2>
          <div className="grid sm:grid-cols-2 gap-5 mb-16">
            {FEATURES.map((f) => (
              <div key={f.title} className="bg-zinc-900/50 border border-zinc-800 hover:border-zinc-700 rounded-2xl p-6 transition">
                <div className="mb-4">{f.icon}</div>
                <h3 className="text-white font-bold mb-2">{f.title}</h3>
                <p className="text-white/50 text-sm leading-6">{f.desc}</p>
              </div>
            ))}
          </div>

          {/* Keyboard shortcuts */}
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
            <span className="w-1 h-6 bg-red-600 rounded-full" />
            Player Keyboard Shortcuts
          </h2>
          <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl overflow-hidden mb-16">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-zinc-800">
                  <th className="text-left px-5 py-3 text-white/40 uppercase text-xs tracking-wider font-semibold">Key</th>
                  <th className="text-left px-5 py-3 text-white/40 uppercase text-xs tracking-wider font-semibold">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800/50">
                {[
                  ["Space / K", "Play or Pause"],
                  ["Arrow Left", "Skip backward 10 seconds"],
                  ["Arrow Right", "Skip forward 10 seconds"],
                  ["Arrow Up", "Increase volume"],
                  ["Arrow Down", "Decrease volume"],
                  ["F", "Toggle fullscreen"],
                  ["M", "Toggle mute"],
                  ["I", "Toggle Picture-in-Picture"],
                ].map(([key, action]) => (
                  <tr key={key} className="hover:bg-zinc-900/60 transition">
                    <td className="px-5 py-3 font-mono text-red-400 text-xs">{key}</td>
                    <td className="px-5 py-3 text-white/60">{action}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Feedback */}
          <div className="rounded-2xl bg-gradient-to-br from-zinc-900 to-zinc-950 border border-zinc-800 p-8 text-center">
            <h3 className="text-xl font-bold text-white mb-2">Found an accessibility issue?</h3>
            <p className="text-white/40 text-sm mb-6">We want to hear from you. Please report barriers so we can fix them.</p>
            <Link to="/help/contact" className="bg-red-600 hover:bg-red-500 text-white font-bold px-7 py-3 rounded-xl transition inline-block hover:scale-105">
              Report an Issue
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
