import { Link } from "react-router-dom";

/* ── Shared layout for Help/Legal pages ── */
export function PageLayout({ title, subtitle, children, breadcrumb = "Help" }) {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero header */}
      <div className="relative pt-28 pb-16 px-4 sm:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-zinc-900 via-black to-black" />
        <div className="absolute inset-0 opacity-5"
          style={{ backgroundImage: "radial-gradient(circle at 20% 50%, #dc2626 0%, transparent 50%), radial-gradient(circle at 80% 20%, #991b1b 0%, transparent 40%)" }} />
        <div className="relative max-w-4xl mx-auto">
          <div className="flex items-center gap-2 text-xs text-white/30 mb-6 uppercase tracking-widest">
            <Link to="/" className="hover:text-white/60 transition">MOSALI</Link>
            <span>/</span>
            <span className="text-white/50">{breadcrumb}</span>
            <span>/</span>
            <span className="text-red-500">{title}</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-black tracking-tight mb-4">{title}</h1>
          {subtitle && <p className="text-white/50 text-lg max-w-xl leading-relaxed">{subtitle}</p>}
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-8 pb-24">
        {children}
      </div>
    </div>
  );
}

export function Section({ title, children }) {
  return (
    <div className="mb-10">
      <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
        <span className="w-1 h-5 bg-red-600 rounded-full inline-block shrink-0" />
        {title}
      </h2>
      <div className="text-white/60 leading-relaxed space-y-3 pl-4 border-l border-zinc-800">
        {children}
      </div>
    </div>
  );
}

export function AccordionItem({ question, answer }) {
  const [open, setOpen] = window.__accordion_hook
    ? window.__accordion_hook(question)
    : [false, () => {}];

  return null; // placeholder - use SimpleAccordion below
}

export function SimpleAccordion({ items }) {
  const [openIdx, setOpenIdx] = window.__accordion_state
    ? window.__accordion_state
    : [null, () => {}];
  return (
    <div className="space-y-2">
      {items.map((item, idx) => (
        <div key={idx} className="border border-zinc-800 rounded-xl overflow-hidden">
          <button
            onClick={() => setOpenIdx(openIdx === idx ? null : idx)}
            className="w-full flex items-center justify-between px-5 py-4 text-left bg-zinc-900 hover:bg-zinc-800 transition group"
          >
            <span className="font-semibold text-white/90 group-hover:text-white text-sm sm:text-base">{item.q}</span>
            <span className={`text-white/40 transition-transform duration-200 ${openIdx === idx ? "rotate-180" : ""}`}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M7 10l5 5 5-5z"/></svg>
            </span>
          </button>
          {openIdx === idx && (
            <div className="px-5 py-4 bg-zinc-950 border-t border-zinc-800 text-white/60 text-sm leading-relaxed">
              {item.a}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
