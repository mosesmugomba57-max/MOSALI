import { useState } from "react";
import { Link } from "react-router-dom";
import { Footer } from "../../components/Footer";

export function DMCA() {
  const [form, setForm] = useState({ name: "", email: "", company: "", url: "", description: "", sworn: false });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    const val = e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setForm((f) => ({ ...f, [e.target.name]: val }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => { setLoading(false); setSent(true); }, 1500);
  }

  return (
    <>
      <div className="min-h-screen bg-black text-white">
        {/* Header */}
        <div className="relative pt-28 pb-16 px-4 sm:px-8 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-zinc-900/50 to-black" />
          <div className="relative max-w-3xl mx-auto">
            <div className="flex items-center gap-2 text-xs text-white/30 mb-8 uppercase tracking-widest">
              <Link to="/" className="hover:text-white/60 transition">Home</Link>
              <span>/</span>
              <span className="text-red-500">Legal</span>
              <span>/</span>
              <span className="text-white/50">DMCA</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-black tracking-tight mb-4">DMCA Notice &amp; Takedown</h1>
            <p className="text-white/40 text-base">Copyright infringement reporting policy.</p>
          </div>
        </div>

        <div className="max-w-3xl mx-auto px-4 sm:px-8 pb-24">
          {/* Policy text */}
          <div className="mb-12 space-y-8">
            <div>
              <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
                <span className="w-1 h-5 bg-red-600 rounded-full" />
                Our Copyright Policy
              </h2>
              <p className="text-white/55 leading-7 text-sm">
                MOSALI respects the intellectual property rights of others. We comply with the Digital Millennium Copyright Act (DMCA) and other applicable copyright laws. If you believe that content available on MOSALI infringes your copyright, please submit a takedown notice using the form below.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
                <span className="w-1 h-5 bg-red-600 rounded-full" />
                What Makes a Valid Notice
              </h2>
              <ul className="text-white/55 text-sm leading-7 space-y-2 pl-4 border-l border-zinc-800">
                <li>Your full legal name and contact information (email and mailing address)</li>
                <li>Identification of the copyrighted work you claim has been infringed</li>
                <li>The specific URL(s) or location(s) on MOSALI of the infringing content</li>
                <li>A statement that you have a good-faith belief the use is not authorised by the copyright owner, its agent, or the law</li>
                <li>A statement that the information in the notice is accurate and, under penalty of perjury, that you are the copyright owner or authorised to act on behalf of one</li>
                <li>Your physical or electronic signature</li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
                <span className="w-1 h-5 bg-red-600 rounded-full" />
                Counter-Notification
              </h2>
              <p className="text-white/55 leading-7 text-sm">
                If you believe content was removed from MOSALI as a result of a mistake or misidentification of the material, you may submit a counter-notification. We will forward your counter-notification to the original complainant. If the complainant does not file a court action within 10–14 business days, we may restore the content. <Link to="/help/contact" className="text-red-500 hover:text-red-400">Contact our legal team</Link> for counter-notification guidance.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-zinc-900/60 border border-zinc-800 text-white/50 text-sm leading-6">
              <strong className="text-white/70">Warning:</strong> Submitting a false DMCA notice is a serious matter. If you knowingly misrepresent that content is infringing, you may be liable for damages, attorney's fees, and other costs under 17 U.S.C. § 512(f).
            </div>
          </div>

          {/* DMCA Form */}
          <h2 className="text-2xl font-bold text-white mb-6">Submit a Takedown Notice</h2>
          {sent ? (
            <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-10 text-center">
              <div className="w-14 h-14 rounded-full bg-green-900/40 border border-green-700/40 flex items-center justify-center mb-4 mx-auto">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor" className="text-green-500"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Notice Received</h3>
              <p className="text-white/40 text-sm max-w-sm mx-auto">We will review your submission within 2–3 business days and take appropriate action. You will receive a confirmation email shortly.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="bg-zinc-900/40 border border-zinc-800 rounded-2xl p-7 space-y-5">
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs text-white/40 uppercase tracking-wider mb-2">Full Legal Name *</label>
                  <input name="name" value={form.name} onChange={handleChange} required
                    className="w-full bg-zinc-800 border border-zinc-700 focus:border-red-500 text-white px-4 py-3 rounded-xl outline-none text-sm transition" placeholder="Your full name" />
                </div>
                <div>
                  <label className="block text-xs text-white/40 uppercase tracking-wider mb-2">Email Address *</label>
                  <input name="email" type="email" value={form.email} onChange={handleChange} required
                    className="w-full bg-zinc-800 border border-zinc-700 focus:border-red-500 text-white px-4 py-3 rounded-xl outline-none text-sm transition" placeholder="legal@yourcompany.com" />
                </div>
              </div>
              <div>
                <label className="block text-xs text-white/40 uppercase tracking-wider mb-2">Company / Organisation (if applicable)</label>
                <input name="company" value={form.company} onChange={handleChange}
                  className="w-full bg-zinc-800 border border-zinc-700 focus:border-red-500 text-white px-4 py-3 rounded-xl outline-none text-sm transition" placeholder="Your company name" />
              </div>
              <div>
                <label className="block text-xs text-white/40 uppercase tracking-wider mb-2">URL of Infringing Content on MOSALI *</label>
                <input name="url" value={form.url} onChange={handleChange} required
                  className="w-full bg-zinc-800 border border-zinc-700 focus:border-red-500 text-white px-4 py-3 rounded-xl outline-none text-sm transition" placeholder="https://mosali.tv/watch/..." />
              </div>
              <div>
                <label className="block text-xs text-white/40 uppercase tracking-wider mb-2">Description of Infringement *</label>
                <textarea name="description" value={form.description} onChange={handleChange} required rows={5}
                  className="w-full bg-zinc-800 border border-zinc-700 focus:border-red-500 text-white px-4 py-3 rounded-xl outline-none text-sm transition resize-none"
                  placeholder="Describe the copyrighted work and how it is being infringed, including links to the original work..." />
              </div>
              <div className="flex items-start gap-3">
                <input type="checkbox" name="sworn" checked={form.sworn} onChange={handleChange} required
                  className="mt-1 w-4 h-4 accent-red-600 cursor-pointer" />
                <label className="text-white/50 text-sm leading-6 cursor-pointer">
                  I swear, under penalty of perjury, that the information in this notice is accurate, and that I am the copyright owner or am authorised to act on behalf of the copyright owner.
                </label>
              </div>
              <button type="submit" disabled={loading || !form.sworn}
                className="w-full bg-red-600 hover:bg-red-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-3.5 rounded-xl transition text-sm flex items-center justify-center gap-2">
                {loading ? <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Submitting...</> : "Submit DMCA Notice"}
              </button>
            </form>
          )}

          <div className="mt-12 pt-8 border-t border-zinc-800 text-white/30 text-xs space-y-1">
            <p>Designated DMCA Agent: <span className="text-white/50">legal@mosali.tv</span></p>
            <p>Related: <Link to="/legal/terms" className="text-white/50 hover:text-white">Terms of Use</Link> · <Link to="/legal/privacy" className="text-white/50 hover:text-white">Privacy Policy</Link></p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
