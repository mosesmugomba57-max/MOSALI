import { useState } from "react";
import { Link } from "react-router-dom";
import { Footer } from "../../components/Footer";

export function Contact() {
  const [form, setForm] = useState({ name: "", email: "", subject: "General Inquiry", message: "" });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
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
        <div className="relative pt-28 pb-20 px-4 sm:px-8 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-zinc-900/60 to-black" />
          <div className="absolute inset-0" style={{ backgroundImage: "radial-gradient(ellipse at 50% 70%, rgba(220,38,38,0.08) 0%, transparent 60%)" }} />
          <div className="relative max-w-4xl mx-auto text-center">
            <div className="flex items-center justify-center gap-2 text-xs text-white/30 mb-8 uppercase tracking-widest">
              <Link to="/" className="hover:text-white/60 transition">Home</Link>
              <span>/</span>
              <Link to="/help/support" className="hover:text-white/60 transition">Support</Link>
              <span>/</span>
              <span className="text-red-500">Contact</span>
            </div>
            <h1 className="text-5xl sm:text-6xl font-black tracking-tight mb-5 bg-gradient-to-br from-white to-white/60 bg-clip-text text-transparent">
              Contact Us
            </h1>
            <p className="text-white/40 text-lg max-w-lg mx-auto">
              Have a question, feedback, or issue? Our team is here to help. We respond within 24 hours.
            </p>
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-4 sm:px-8 pb-24">
          <div className="grid lg:grid-cols-5 gap-10">
            {/* Contact info */}
            <div className="lg:col-span-2 space-y-6">
              <div>
                <h2 className="text-xl font-bold text-white mb-5">Other ways to reach us</h2>
                <div className="space-y-4">
                  {[
                    {
                      icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4-8 5-8-5V6l8 5 8-5v2z"/></svg>,
                      label: "Email",
                      value: "support@mosali.tv",
                    },
                    {
                      icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/></svg>,
                      label: "Phone",
                      value: "+254 (0) 700 MOSALI",
                    },
                    {
                      icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>,
                      label: "Office",
                      value: "Nairobi, Kenya · Westlands Business Park",
                    },
                  ].map((item) => (
                    <div key={item.label} className="flex items-start gap-4 p-4 bg-zinc-900/50 border border-zinc-800 rounded-xl">
                      <span className="text-red-500 mt-0.5 shrink-0">{item.icon}</span>
                      <div>
                        <p className="text-white/40 text-xs uppercase tracking-wider mb-0.5">{item.label}</p>
                        <p className="text-white/80 text-sm font-medium">{item.value}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-gradient-to-br from-red-900/20 to-zinc-900 border border-red-900/30">
                <h3 className="font-bold text-white mb-2">Support Hours</h3>
                <div className="text-white/50 text-sm space-y-1">
                  <p>Monday – Friday: 8:00 AM – 10:00 PM EAT</p>
                  <p>Saturday – Sunday: 9:00 AM – 8:00 PM EAT</p>
                  <p className="text-red-400 mt-2">Email support runs 24/7</p>
                </div>
              </div>
            </div>

            {/* Form */}
            <div className="lg:col-span-3">
              {sent ? (
                <div className="h-full flex flex-col items-center justify-center text-center py-20 bg-zinc-900/40 rounded-2xl border border-zinc-800">
                  <div className="w-16 h-16 rounded-full bg-green-900/40 border border-green-700/40 flex items-center justify-center mb-5">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor" className="text-green-500">
                      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">Message Sent!</h3>
                  <p className="text-white/40 max-w-sm mb-6">Thank you for reaching out. Our team will get back to you within 24 hours.</p>
                  <button onClick={() => { setSent(false); setForm({ name: "", email: "", subject: "General Inquiry", message: "" }); }}
                    className="text-red-500 hover:text-red-400 text-sm font-semibold transition">
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="bg-zinc-900/40 border border-zinc-800 rounded-2xl p-8 space-y-5">
                  <h2 className="text-xl font-bold text-white mb-2">Send a message</h2>
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs text-white/40 uppercase tracking-wider mb-2">Full Name</label>
                      <input name="name" value={form.name} onChange={handleChange} required
                        className="w-full bg-zinc-800 border border-zinc-700 focus:border-red-500 text-white px-4 py-3 rounded-xl outline-none text-sm transition"
                        placeholder="Your name" />
                    </div>
                    <div>
                      <label className="block text-xs text-white/40 uppercase tracking-wider mb-2">Email Address</label>
                      <input name="email" type="email" value={form.email} onChange={handleChange} required
                        className="w-full bg-zinc-800 border border-zinc-700 focus:border-red-500 text-white px-4 py-3 rounded-xl outline-none text-sm transition"
                        placeholder="you@example.com" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs text-white/40 uppercase tracking-wider mb-2">Subject</label>
                    <select name="subject" value={form.subject} onChange={handleChange}
                      className="w-full bg-zinc-800 border border-zinc-700 focus:border-red-500 text-white px-4 py-3 rounded-xl outline-none text-sm transition cursor-pointer">
                      <option>General Inquiry</option>
                      <option>Technical Issue</option>
                      <option>Billing Question</option>
                      <option>Content Request</option>
                      <option>Report a Bug</option>
                      <option>Partnership / Press</option>
                      <option>DMCA / Legal</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs text-white/40 uppercase tracking-wider mb-2">Message</label>
                    <textarea name="message" value={form.message} onChange={handleChange} required rows={6}
                      className="w-full bg-zinc-800 border border-zinc-700 focus:border-red-500 text-white px-4 py-3 rounded-xl outline-none text-sm transition resize-none"
                      placeholder="Describe your issue or question in detail..." />
                  </div>
                  <button type="submit" disabled={loading}
                    className="w-full bg-red-600 hover:bg-red-500 disabled:opacity-60 text-white font-bold py-3.5 rounded-xl transition text-sm flex items-center justify-center gap-2">
                    {loading
                      ? <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Sending...</>
                      : "Send Message"
                    }
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
