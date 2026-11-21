import { Link } from "react-router-dom";
import { Footer } from "../../components/Footer";

const GUIDES = [
  {
    category: "Account",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="text-red-500">
        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
      </svg>
    ),
    articles: [
      { title: "How to create a MOSALI account", link: "#" },
      { title: "Resetting your password", link: "#" },
      { title: "Managing account settings", link: "#" },
      { title: "Switching between profiles", link: "#" },
    ],
  },
  {
    category: "Streaming",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="text-red-500">
        <path d="M21 3H3c-1.11 0-2 .89-2 2v12c0 1.1.89 2 2 2h5v2h8v-2h5c1.1 0 1.99-.9 1.99-2L23 5c0-1.11-.9-2-2-2zm0 14H3V5h18v12zm-5-6l-7 4V7l7 4z"/>
      </svg>
    ),
    articles: [
      { title: "Improving video quality", link: "#" },
      { title: "Using the video player controls", link: "#" },
      { title: "Enabling subtitles and captions", link: "#" },
      { title: "Fixing buffering and playback issues", link: "#" },
    ],
  },
  {
    category: "Downloads",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="text-red-500">
        <path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"/>
      </svg>
    ),
    articles: [
      { title: "How to download content", link: "#" },
      { title: "Managing your downloads", link: "#" },
      { title: "Download quality settings", link: "#" },
      { title: "Download limits and expiry", link: "#" },
    ],
  },
  {
    category: "Billing",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="text-red-500">
        <path d="M20 4H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm0 14H4v-6h16v6zm0-10H4V6h16v2z"/>
      </svg>
    ),
    articles: [
      { title: "Upgrading your subscription plan", link: "#" },
      { title: "Payment methods accepted", link: "#" },
      { title: "Cancelling your subscription", link: "#" },
      { title: "Understanding your invoice", link: "#" },
    ],
  },
  {
    category: "Devices",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="text-red-500">
        <path d="M17 1.01L7 1c-1.1 0-2 .9-2 2v18c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V3c0-1.1-.9-1.99-2-1.99zM17 19H7V5h10v14z"/>
      </svg>
    ),
    articles: [
      { title: "Using MOSALI on Smart TV", link: "#" },
      { title: "Casting to Chromecast", link: "#" },
      { title: "Supported browsers", link: "#" },
      { title: "Connecting with Fire Stick", link: "#" },
    ],
  },
  {
    category: "Privacy & Security",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="text-red-500">
        <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z"/>
      </svg>
    ),
    articles: [
      { title: "How we protect your data", link: "#" },
      { title: "Two-factor authentication", link: "#" },
      { title: "Viewing your watch history", link: "#" },
      { title: "Deleting your account", link: "#" },
    ],
  },
];

export function Support() {
  return (
    <>
      <div className="min-h-screen bg-black text-white">
        {/* Header */}
        <div className="relative pt-28 pb-20 px-4 sm:px-8 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-zinc-900/60 to-black" />
          <div className="absolute inset-0" style={{ backgroundImage: "radial-gradient(ellipse at 70% 40%, rgba(220,38,38,0.07) 0%, transparent 55%)" }} />
          <div className="relative max-w-5xl mx-auto text-center">
            <div className="flex items-center justify-center gap-2 text-xs text-white/30 mb-8 uppercase tracking-widest">
              <Link to="/" className="hover:text-white/60 transition">Home</Link>
              <span>/</span>
              <span className="text-red-500">Support</span>
            </div>
            <h1 className="text-5xl sm:text-6xl font-black tracking-tight mb-5 bg-gradient-to-br from-white to-white/60 bg-clip-text text-transparent">
              Support Center
            </h1>
            <p className="text-white/40 text-lg max-w-lg mx-auto mb-10">
              Find guides, tutorials, and answers to help you get the most out of MOSALI.
            </p>
            {/* Search bar */}
            <div className="max-w-xl mx-auto flex gap-3">
              <input
                type="text"
                placeholder="Search support articles..."
                className="flex-1 bg-zinc-900 border border-zinc-700 focus:border-red-500 text-white px-5 py-3 rounded-xl outline-none text-sm transition"
              />
              <button className="bg-red-600 hover:bg-red-500 text-white px-6 py-3 rounded-xl font-bold text-sm transition">
                Search
              </button>
            </div>
          </div>
        </div>

        {/* Guide categories */}
        <div className="max-w-5xl mx-auto px-4 sm:px-8 pb-24">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-16">
            {GUIDES.map((guide) => (
              <div key={guide.category} className="bg-zinc-900/60 border border-zinc-800 hover:border-zinc-700 rounded-2xl p-6 transition group">
                <div className="mb-4">{guide.icon}</div>
                <h3 className="text-white font-bold text-lg mb-4 group-hover:text-red-400 transition">{guide.category}</h3>
                <ul className="space-y-2">
                  {guide.articles.map((art) => (
                    <li key={art.title}>
                      <a href={art.link} className="text-white/50 hover:text-white text-sm transition flex items-center gap-2 group/link">
                        <span className="w-1 h-1 rounded-full bg-red-600 shrink-0 opacity-0 group-hover/link:opacity-100 transition" />
                        {art.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Contact options */}
          <div className="border-t border-zinc-800 pt-16">
            <h2 className="text-2xl font-bold text-center mb-10">Need direct help?</h2>
            <div className="grid sm:grid-cols-3 gap-5">
              {[
                {
                  icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor"><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4-8 5-8-5V6l8 5 8-5v2z"/></svg>,
                  title: "Email Support",
                  desc: "We reply within 24 hours",
                  cta: "Send a message",
                  link: "/help/contact",
                },
                {
                  icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor"><path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z"/></svg>,
                  title: "Live Chat",
                  desc: "Available 8 AM – 10 PM EAT",
                  cta: "Start chat",
                  link: "/help/contact",
                },
                {
                  icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/></svg>,
                  title: "FAQ",
                  desc: "Find instant answers",
                  cta: "Browse FAQ",
                  link: "/help/faq",
                },
              ].map((opt) => (
                <Link
                  key={opt.title}
                  to={opt.link}
                  className="bg-zinc-900/60 border border-zinc-800 hover:border-red-900/50 hover:bg-zinc-900 rounded-2xl p-6 text-center transition group"
                >
                  <div className="text-red-500 flex justify-center mb-4 group-hover:scale-110 transition-transform">{opt.icon}</div>
                  <h3 className="text-white font-bold mb-1">{opt.title}</h3>
                  <p className="text-white/40 text-sm mb-4">{opt.desc}</p>
                  <span className="text-red-500 text-sm font-semibold">{opt.cta} →</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
