import { Link } from "react-router-dom";
import { Footer } from "../../components/Footer";

function LegalLayout({ title, subtitle, lastUpdated, children }) {
  return (
    <>
      <div className="min-h-screen bg-black text-white">
        <div className="relative pt-28 pb-16 px-4 sm:px-8 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-zinc-900/50 to-black" />
          <div className="absolute inset-0" style={{ backgroundImage: "radial-gradient(ellipse at 80% 30%, rgba(220,38,38,0.06) 0%, transparent 50%)" }} />
          <div className="relative max-w-3xl mx-auto">
            <div className="flex items-center gap-2 text-xs text-white/30 mb-8 uppercase tracking-widest">
              <Link to="/" className="hover:text-white/60 transition">Home</Link>
              <span>/</span>
              <span className="text-red-500">Legal</span>
              <span>/</span>
              <span className="text-white/50">{title}</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-black tracking-tight mb-4">{title}</h1>
            {subtitle && <p className="text-white/40 text-base mb-4">{subtitle}</p>}
            <p className="text-white/25 text-xs uppercase tracking-widest">Last updated: {lastUpdated}</p>
          </div>
        </div>
        <div className="max-w-3xl mx-auto px-4 sm:px-8 pb-24">
          {children}
        </div>
      </div>
      <Footer />
    </>
  );
}

function Clause({ number, title, children }) {
  return (
    <div className="mb-10">
      <h2 className="flex items-start gap-4 text-lg font-bold text-white mb-4">
        <span className="mt-0.5 shrink-0 w-7 h-7 rounded-full bg-red-900/40 border border-red-900/50 flex items-center justify-center text-red-500 text-xs font-bold">{number}</span>
        {title}
      </h2>
      <div className="pl-11 text-white/55 leading-7 text-sm space-y-3">{children}</div>
    </div>
  );
}

export function Privacy() {
  return (
    <LegalLayout title="Privacy Policy" subtitle="How we collect, use, and protect your personal information." lastUpdated="November 2026">
      <div className="mb-10 p-5 rounded-xl bg-zinc-900/60 border border-zinc-800 text-white/60 text-sm leading-6">
        Your privacy matters to us. This policy explains exactly what data MOSALI collects, why we collect it, and how you can control it. We will never sell your personal data to third parties.
      </div>

      <Clause number="1" title="Information We Collect">
        <p><strong className="text-white/80">Account Information:</strong> When you register, we collect your name, email address, and password (stored as a secure hash). Optional: profile photo, country, and date of birth.</p>
        <p><strong className="text-white/80">Usage Data:</strong> We automatically log which titles you view, your watch progress, search queries, device type, browser, IP address, and approximate location (country/city level).</p>
        <p><strong className="text-white/80">Payment Data:</strong> Billing transactions are processed by our payment partners (Stripe, M-Pesa). MOSALI does not store full card numbers. We retain the last 4 digits and billing address for record-keeping.</p>
        <p><strong className="text-white/80">Communications:</strong> When you contact our support team, we retain the content of that correspondence to help resolve issues and improve service.</p>
      </Clause>

      <Clause number="2" title="How We Use Your Information">
        <p>We use collected data to: provide and personalise the streaming service; process payments and manage subscriptions; send transactional emails (receipts, password resets, account alerts); recommend content based on viewing history; detect and prevent fraud; analyse aggregate usage trends to improve the platform; and comply with legal obligations.</p>
      </Clause>

      <Clause number="3" title="Data Sharing">
        <p>MOSALI does not sell your personal data. We share information only with:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Service providers (hosting, payment processing, analytics) who are contractually bound to protect your data</li>
          <li>Law enforcement when required by valid legal process</li>
          <li>Successor entities in the event of a merger, acquisition, or asset sale (you will be notified)</li>
        </ul>
      </Clause>

      <Clause number="4" title="Cookies and Tracking">
        <p>We use cookies and similar technologies. See our <Link to="/legal/cookies" className="text-red-500 hover:text-red-400">Cookie Policy</Link> for full details. Essential cookies cannot be disabled as they are needed for the platform to function. You can opt out of analytics and advertising cookies via our Cookie Preferences centre.</p>
      </Clause>

      <Clause number="5" title="Data Retention">
        <p>We retain your account data for as long as your account is active, plus 90 days after deletion to handle support requests. Watch history is retained for 2 years. Payment records are retained for 7 years as required by financial regulations.</p>
      </Clause>

      <Clause number="6" title="Your Rights">
        <p>Depending on your country of residence, you may have the right to: access the personal data we hold about you; request correction of inaccurate data; request deletion of your account and associated data; object to or restrict certain processing; and request data portability in a machine-readable format.</p>
        <p>To exercise any of these rights, <Link to="/help/contact" className="text-red-500 hover:text-red-400">contact our privacy team</Link>. We will respond within 30 days.</p>
      </Clause>

      <Clause number="7" title="Children's Privacy">
        <p>MOSALI is not directed at children under 13. We do not knowingly collect personal information from children under 13. If you believe a child has provided us with personal data, please contact us immediately and we will delete that information.</p>
      </Clause>

      <Clause number="8" title="Security">
        <p>We implement industry-standard security measures including TLS encryption for data in transit, AES-256 encryption for sensitive data at rest, regular penetration testing, and strict access controls for internal systems. No system is 100% secure; we encourage you to use a strong, unique password.</p>
      </Clause>

      <Clause number="9" title="International Transfers">
        <p>MOSALI operates globally. Your data may be transferred to and processed in countries outside your own. When we transfer data from the EEA, we rely on Standard Contractual Clauses or other approved mechanisms under GDPR.</p>
      </Clause>

      <Clause number="10" title="Changes to This Policy">
        <p>We may update this Privacy Policy periodically. We will notify you of significant changes via email or a prominent in-app notice. Your continued use of MOSALI after the effective date of the revised policy constitutes acceptance.</p>
      </Clause>

      <div className="mt-14 pt-8 border-t border-zinc-800 text-white/30 text-xs space-y-1">
        <p>Privacy questions? <Link to="/help/contact" className="text-red-500 hover:text-red-400">Contact our data protection team.</Link></p>
        <p>Related: <Link to="/legal/terms" className="text-white/50 hover:text-white">Terms of Use</Link> · <Link to="/legal/cookies" className="text-white/50 hover:text-white">Cookie Policy</Link> · <Link to="/legal/dmca" className="text-white/50 hover:text-white">DMCA Notice</Link></p>
      </div>
    </LegalLayout>
  );
}
