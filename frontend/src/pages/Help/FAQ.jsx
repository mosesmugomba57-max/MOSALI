import { useState } from "react";
import { Link } from "react-router-dom";
import { Footer } from "../../components/Footer";

const FAQ_DATA = [
  {
    category: "Getting Started",
    items: [
      { q: "What is MOSALI?", a: "MOSALI is a next-generation streaming platform built for African and global audiences. We offer movies, series, documentaries and exclusive originals — available on any device, anytime." },
      { q: "How do I start watching?", a: "Browse the homepage, click any title you like, and hit Watch Now. No sign-up required for browsing. Create a free account to save titles to My List and sync your watch progress." },
      { q: "Is MOSALI free to use?", a: "MOSALI offers a free tier with access to a wide catalog. Premium plans unlock HD/4K streams, downloads, early access to new releases, and ad-free viewing. Plans start from just $4.99/month." },
      { q: "Which devices are supported?", a: "MOSALI works on all modern web browsers, Android phones and tablets, iOS devices, Smart TVs (via browser or our upcoming native app), Chromecast, and Fire Stick." },
    ],
  },
  {
    category: "Streaming & Playback",
    items: [
      { q: "What video quality is available?", a: "Stream quality adapts automatically to your internet connection (Auto mode). Premium subscribers can lock to 1080p HD or 4K Ultra HD. The minimum recommended speed is 5 Mbps for HD." },
      { q: "How do I use keyboard shortcuts in the player?", a: "Space or K = Play/Pause · Arrow Left = Skip back 10s · Arrow Right = Skip forward 10s · F = Fullscreen · M = Mute · Arrow Up/Down = Volume · I = Picture-in-Picture." },
      { q: "Can I skip the intro?", a: "Yes — a Skip Intro button appears during the opening credits of any episode. Click it to jump straight to the story." },
      { q: "How does Continue Watching work?", a: "MOSALI automatically saves your playback position. When you return to any title, it resumes from where you left off. Your progress syncs across devices when logged in." },
      { q: "Why is the video buffering?", a: "Buffering is usually caused by a slow internet connection. Try switching Quality to 480p, closing background apps, or moving closer to your Wi-Fi router. If the issue persists, contact Support." },
      { q: "How do I turn on subtitles?", a: "In the video player, click the CC button in the bottom control bar. Select your preferred language from the menu. Subtitle availability varies by title." },
    ],
  },
  {
    category: "My List & Downloads",
    items: [
      { q: "How do I add something to My List?", a: "Click the + My List button on any movie card, in the hero banner, or on the detail page. Your list is saved locally and synced to your account when logged in." },
      { q: "How do I download content?", a: "On the Downloads page, select any available title and choose your quality. Downloads are stored on your device for offline viewing. This feature requires a Premium subscription." },
      { q: "How long are downloads available?", a: "Downloaded content is available for 30 days after download, or 48 hours after you first press play — whichever comes first." },
    ],
  },
  {
    category: "Account & Billing",
    items: [
      { q: "How do I cancel my subscription?", a: "Go to Settings → Subscription → Cancel Plan. Your access continues until the end of your billing period. No cancellation fees." },
      { q: "Can I share my account?", a: "MOSALI accounts are for personal use. Each subscription allows streaming on 1 device simultaneously (Free) or up to 4 devices (Premium). Profile switching is coming soon." },
      { q: "What payment methods are accepted?", a: "We accept major credit/debit cards (Visa, Mastercard), M-Pesa, PayPal, and Airtel Money. More regional payment methods are being added." },
    ],
  },
];

function Accordion({ items }) {
  const [openIdx, setOpenIdx] = useState(null);
  return (
    <div className="space-y-2">
      {items.map((item, idx) => (
        <div key={idx} className="border border-zinc-800 rounded-xl overflow-hidden">
          <button
            onClick={() => setOpenIdx(openIdx === idx ? null : idx)}
            className="w-full flex items-center justify-between px-5 py-4 text-left bg-zinc-900/60 hover:bg-zinc-800/80 transition group"
          >
            <span className="font-medium text-white/90 group-hover:text-white text-sm sm:text-base pr-4">{item.q}</span>
            <span className={`text-white/40 shrink-0 transition-transform duration-300 ${openIdx === idx ? "rotate-180" : ""}`}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M7 10l5 5 5-5z"/></svg>
            </span>
          </button>
          <div className={`overflow-hidden transition-all duration-300 ${openIdx === idx ? "max-h-96" : "max-h-0"}`}>
            <div className="px-5 py-4 bg-zinc-950 border-t border-zinc-800/50 text-white/55 text-sm leading-7">
              {item.a}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export function FAQ() {
  const [activeCategory, setActiveCategory] = useState(0);

  return (
    <>
      <div className="min-h-screen bg-black text-white">
        {/* Header */}
        <div className="relative pt-28 pb-20 px-4 sm:px-8 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-zinc-900/80 to-black" />
          <div className="absolute inset-0" style={{ backgroundImage: "radial-gradient(ellipse at 30% 60%, rgba(220,38,38,0.08) 0%, transparent 60%)" }} />
          <div className="relative max-w-5xl mx-auto text-center">
            <div className="flex items-center justify-center gap-2 text-xs text-white/30 mb-8 uppercase tracking-widest">
              <Link to="/" className="hover:text-white/60 transition">Home</Link>
              <span>/</span>
              <span className="text-red-500">FAQ</span>
            </div>
            <h1 className="text-5xl sm:text-6xl font-black tracking-tight mb-5 bg-gradient-to-br from-white to-white/60 bg-clip-text text-transparent">
              Frequently Asked<br />Questions
            </h1>
            <p className="text-white/40 text-lg max-w-lg mx-auto">
              Everything you need to know about MOSALI. Can't find your answer?{" "}
              <Link to="/help/contact" className="text-red-500 hover:text-red-400 underline underline-offset-4">Contact our team</Link>.
            </p>
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-4 sm:px-8 pb-24">
          <div className="flex flex-col lg:flex-row gap-10">
            {/* Category sidebar */}
            <div className="lg:w-56 shrink-0">
              <nav className="sticky top-24 space-y-1">
                {FAQ_DATA.map((cat, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveCategory(idx)}
                    className={`w-full text-left px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                      activeCategory === idx
                        ? "bg-red-600/20 text-red-400 border border-red-900/40"
                        : "text-white/50 hover:text-white hover:bg-zinc-900"
                    }`}
                  >
                    {cat.category}
                  </button>
                ))}
              </nav>
            </div>

            {/* FAQ content */}
            <div className="flex-1 min-w-0">
              {FAQ_DATA.map((cat, catIdx) => (
                <div key={catIdx} className={`mb-12 ${activeCategory !== catIdx ? "hidden lg:block" : ""}`}>
                  <div className={activeCategory !== catIdx ? "hidden" : ""}>
                    <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                      <span className="w-1 h-6 bg-red-600 rounded-full" />
                      {cat.category}
                    </h2>
                    <Accordion items={cat.items} />
                  </div>
                  {/* Desktop: show all categories */}
                  <div className="hidden lg:block">
                    <h2 className="text-xl font-bold text-white mb-5 flex items-center gap-3">
                      <span className="w-1 h-5 bg-red-600 rounded-full" />
                      {cat.category}
                    </h2>
                    <Accordion items={cat.items} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Still need help */}
          <div className="mt-16 rounded-2xl bg-gradient-to-br from-zinc-900 to-zinc-950 border border-zinc-800 p-8 text-center">
            <h3 className="text-2xl font-bold mb-2">Still have questions?</h3>
            <p className="text-white/40 mb-6">Our support team is available 24/7 to help you.</p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link to="/help/contact" className="bg-red-600 hover:bg-red-500 text-white font-bold px-7 py-3 rounded-xl transition hover:scale-105">
                Contact Support
              </Link>
              <Link to="/help/support" className="bg-zinc-800 hover:bg-zinc-700 text-white font-semibold px-7 py-3 rounded-xl transition border border-zinc-700">
                Browse Support Guides
              </Link>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
