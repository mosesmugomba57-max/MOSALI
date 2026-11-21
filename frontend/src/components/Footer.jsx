import { Link } from "react-router-dom";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-zinc-950 border-t border-zinc-800/50">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 pt-14 pb-8">
        {/* Top section */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-8 mb-12">
          {/* Brand */}
          <div className="col-span-2">
            <Link to="/" className="inline-block mb-4">
              <span className="text-2xl font-black tracking-widest text-red-600 hover:text-red-500 transition">MOSALI</span>
            </Link>
            <p className="text-xs text-white/35 leading-relaxed mb-5 max-w-xs">
              Your World. Your Movies. Stream the stories that move you — anytime, on any device.
            </p>
            {/* Social icons */}
            <div className="flex gap-2.5">
              {[
                { label: "X (Twitter)", href: "#", icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg> },
                { label: "Instagram", href: "#", icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/></svg> },
                { label: "YouTube", href: "#", icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg> },
              ].map((s) => (
                <a key={s.label} href={s.href} title={s.label}
                  className="w-8 h-8 rounded-lg bg-zinc-800/80 hover:bg-zinc-700 border border-zinc-700/50 hover:border-zinc-600 flex items-center justify-center text-white/50 hover:text-white transition">
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-white/70 font-semibold text-xs uppercase tracking-widest mb-4">Company</h3>
            <ul className="space-y-2.5">
              {[
                { label: "About", to: "/about" },
                { label: "Careers", to: "#" },
                { label: "Press", to: "#" },
                { label: "Blog", to: "#" },
              ].map((l) => (
                <li key={l.label}>
                  <Link to={l.to} className="text-white/35 hover:text-white/80 transition text-xs">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Help */}
          <div>
            <h3 className="text-white/70 font-semibold text-xs uppercase tracking-widest mb-4">Help</h3>
            <ul className="space-y-2.5">
              {[
                { label: "FAQ", to: "/help/faq" },
                { label: "Support", to: "/help/support" },
                { label: "Contact Us", to: "/help/contact" },
                { label: "Accessibility", to: "/help/accessibility" },
              ].map((l) => (
                <li key={l.label}>
                  <Link to={l.to} className="text-white/35 hover:text-white/80 transition text-xs">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-white/70 font-semibold text-xs uppercase tracking-widest mb-4">Legal</h3>
            <ul className="space-y-2.5">
              {[
                { label: "Terms of Use", to: "/legal/terms" },
                { label: "Privacy Policy", to: "/legal/privacy" },
                { label: "Cookie Preferences", to: "/legal/cookies" },
                { label: "DMCA", to: "/legal/dmca" },
              ].map((l) => (
                <li key={l.label}>
                  <Link to={l.to} className="text-white/35 hover:text-white/80 transition text-xs">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Catalog */}
          <div>
            <h3 className="text-white/70 font-semibold text-xs uppercase tracking-widest mb-4">Discover</h3>
            <ul className="space-y-2.5">
              {[
                { label: "Movies", to: "/movies" },
                { label: "My List", to: "/my-list" },
                { label: "Downloads", to: "/downloads" },
                { label: "Search", to: "/search" },
              ].map((l) => (
                <li key={l.label}>
                  <Link to={l.to} className="text-white/35 hover:text-white/80 transition text-xs">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-zinc-800/50 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <p className="text-xs text-white/25">© {year} MOSALI. All rights reserved.</p>
            <span className="hidden sm:block w-px h-3 bg-zinc-700" />
            <Link to="/legal/terms" className="text-xs text-white/25 hover:text-white/50 transition">Terms</Link>
            <Link to="/legal/privacy" className="text-xs text-white/25 hover:text-white/50 transition">Privacy</Link>
            <Link to="/legal/cookies" className="text-xs text-white/25 hover:text-white/50 transition">Cookies</Link>
          </div>
          <select className="bg-transparent outline-none cursor-pointer text-white/30 hover:text-white/60 transition text-xs border border-zinc-700/50 rounded-lg px-3 py-1.5">
            <option>English</option>
            <option>Swahili</option>
            <option>French</option>
            <option>Arabic</option>
          </select>
        </div>
      </div>
    </footer>
  );
}
