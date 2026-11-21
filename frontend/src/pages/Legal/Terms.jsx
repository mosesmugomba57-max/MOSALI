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
          <div className="prose prose-invert prose-sm max-w-none">
            {children}
          </div>
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

export function Terms() {
  return (
    <LegalLayout title="Terms of Use" subtitle="Please read these terms carefully before using MOSALI." lastUpdated="November 2026">
      <div className="mb-10 p-5 rounded-xl bg-red-950/20 border border-red-900/30 text-red-300/80 text-sm leading-6">
        <strong className="text-red-400">Important:</strong> By accessing or using MOSALI, you agree to be bound by these Terms of Use and our Privacy Policy. If you do not agree, do not use our service.
      </div>

      <Clause number="1" title="Acceptance of Terms">
        <p>These Terms of Use ("Terms") govern your access to and use of the MOSALI streaming platform, including our website, mobile applications, and all associated services (collectively, "MOSALI" or the "Service").</p>
        <p>By creating an account, browsing content, or using any feature of MOSALI, you confirm that you are at least 13 years of age and have the legal capacity to enter into these Terms in your jurisdiction.</p>
      </Clause>

      <Clause number="2" title="Your Account">
        <p>You must provide accurate, current, and complete information when creating an account. You are responsible for maintaining the confidentiality of your login credentials and for all activity that occurs under your account.</p>
        <p>You may not share your account credentials with others or use the account of another user. MOSALI reserves the right to suspend or terminate accounts found in violation of this policy.</p>
      </Clause>

      <Clause number="3" title="Subscription and Billing">
        <p>MOSALI offers free and paid subscription tiers. Paid subscriptions are billed on a recurring basis (monthly or annually) according to the plan you select at checkout.</p>
        <p>Prices are displayed in USD and may be subject to applicable taxes. We may change subscription prices with 30 days advance notice. Your continued use after the effective date constitutes acceptance of the new price.</p>
        <p>You may cancel your subscription at any time. Cancellation takes effect at the end of the current billing period. We do not offer refunds for partial periods except where required by law.</p>
      </Clause>

      <Clause number="4" title="Content and Intellectual Property">
        <p>All content available on MOSALI — including films, series, images, text, logos, and software — is protected by copyright, trademark, and other intellectual property laws. You may not download, copy, reproduce, distribute, or create derivative works of any content without express written permission from MOSALI or the respective rights holder.</p>
        <p>MOSALI grants you a limited, non-exclusive, non-transferable, revocable licence to access and view content on MOSALI for personal, non-commercial use only.</p>
      </Clause>

      <Clause number="5" title="Prohibited Conduct">
        <p>You agree not to: use MOSALI for any unlawful purpose; attempt to gain unauthorized access to any part of the Service; use automated tools (bots, scrapers) to extract data; transmit malware or harmful code; impersonate any person or entity; or engage in any conduct that restricts or inhibits anyone's use or enjoyment of MOSALI.</p>
      </Clause>

      <Clause number="6" title="Termination">
        <p>MOSALI reserves the right to suspend or permanently terminate your access to the Service at any time, with or without notice, for any reason, including violation of these Terms.</p>
        <p>Upon termination, your right to use the Service immediately ceases. Provisions that by their nature should survive termination (including intellectual property, disclaimers, and limitations of liability) will survive.</p>
      </Clause>

      <Clause number="7" title="Disclaimer of Warranties">
        <p>The Service is provided "as is" and "as available" without warranties of any kind, either express or implied. MOSALI does not warrant that the Service will be uninterrupted, error-free, or free of viruses or other harmful components.</p>
      </Clause>

      <Clause number="8" title="Limitation of Liability">
        <p>To the fullest extent permitted by law, MOSALI shall not be liable for any indirect, incidental, special, consequential, or punitive damages — including loss of profits, data, or goodwill — arising from your use of or inability to use the Service.</p>
      </Clause>

      <Clause number="9" title="Governing Law">
        <p>These Terms are governed by and construed in accordance with the laws of Kenya, without regard to conflict of law principles. Any disputes arising from these Terms shall be subject to the exclusive jurisdiction of the courts of Nairobi, Kenya.</p>
      </Clause>

      <Clause number="10" title="Changes to These Terms">
        <p>We may update these Terms from time to time. When we do, we will update the "Last updated" date at the top of this page. Material changes will be communicated via email or a prominent notice on the platform. Your continued use of MOSALI after changes are posted constitutes acceptance.</p>
      </Clause>

      <div className="mt-14 pt-8 border-t border-zinc-800 text-white/30 text-xs space-y-1">
        <p>Questions about these Terms? <Link to="/help/contact" className="text-red-500 hover:text-red-400">Contact our legal team.</Link></p>
        <p>Related: <Link to="/legal/privacy" className="text-white/50 hover:text-white">Privacy Policy</Link> · <Link to="/legal/cookies" className="text-white/50 hover:text-white">Cookie Policy</Link> · <Link to="/legal/dmca" className="text-white/50 hover:text-white">DMCA Notice</Link></p>
      </div>
    </LegalLayout>
  );
}
