import Image from "next/image";
import { ArrowDown, Sparkles, Phone, MapPin, Mail } from "lucide-react";
import ClientReviews from "@/components/client-reviews";
import TeamCarousel from "@/components/team-carousel";
import ServicesGrid from "@/components/services-grid";
import VideographySection from "@/components/videography-section";
import Navbar from "@/components/navbar";
import ScrollToTop from "@/components/scroll-to-top";
import CostCalculator from "@/components/cost-calculator";
import VideoTicker from "@/components/video-ticker";

/* Emoji faces scattered on the sides — purely decorative */
const SIDE_EMOJIS = [
  { emoji: "😎", top: "8%",  side: "left",  size: 72, opacity: 0.13, delay: "0s"   },
  { emoji: "😂", top: "28%", side: "left",  size: 90, opacity: 0.10, delay: "1.2s" },
  { emoji: "🤩", top: "52%", side: "left",  size: 64, opacity: 0.14, delay: "2.4s" },
  { emoji: "😏", top: "72%", side: "left",  size: 80, opacity: 0.09, delay: "0.6s" },
  { emoji: "😤", top: "88%", side: "left",  size: 56, opacity: 0.11, delay: "3.0s" },
  { emoji: "🥶", top: "12%", side: "right", size: 80, opacity: 0.11, delay: "1.8s" },
  { emoji: "😈", top: "32%", side: "right", size: 68, opacity: 0.13, delay: "0.4s" },
  { emoji: "🤯", top: "56%", side: "right", size: 88, opacity: 0.10, delay: "2.0s" },
  { emoji: "😤", top: "76%", side: "right", size: 60, opacity: 0.12, delay: "1.0s" },
  { emoji: "🫡", top: "90%", side: "right", size: 72, opacity: 0.09, delay: "2.8s" },
] as const;

export default function Home() {
  return (
    <>
      <Navbar />
      <ScrollToTop />
      <main className="min-h-screen overflow-hidden bg-[#04070F] text-white">

      {/* ══ HERO ══ */}
      <section
        className="hero-logo-section relative flex min-h-screen flex-col items-center justify-center overflow-hidden"
        aria-label="Evoke Hub hero"
      >
        {/* Dark site background */}
        <div className="absolute inset-0 bg-[#04070F]" aria-hidden="true" />

        {/* Floating emoji decorations */}
        {SIDE_EMOJIS.map((item, i) => (
          <span
            key={i}
            className="hero-emoji-deco"
            aria-hidden="true"
            style={{
              top: item.top,
              [item.side]: "clamp(4px, 3vw, 52px)",
              fontSize: item.size,
              opacity: item.opacity,
              animationDelay: item.delay,
            }}
          >
            {item.emoji}
          </span>
        ))}

        {/* ── Logo — centred naturally by flexbox ── */}
        <div className="hero-logo-wrap relative z-10">
          <Image
            src="/assets/evoke-hub-logo.png"
            alt="Evoke Hub"
            width={1060}
            height={730}
            priority
            className="hero-full-logo"
          />
          {/* Soft bottom gradient covers the "100" watermark */}
          <div
            className="absolute inset-x-0 bottom-0 pointer-events-none"
            style={{ height: "18%", background: "linear-gradient(to top, #04070F 55%, transparent 100%)" }}
            aria-hidden="true"
          />
        </div>

        {/* Scroll CTA */}
        <a
          href="#team"
          id="hero-cta"
          className="relative z-10 mt-10 inline-flex items-center gap-3 rounded-full border border-white/15 bg-white/[0.06] px-7 py-3.5 font-heading text-sm font-semibold text-white backdrop-blur-xl transition-all duration-300 hover:border-[#3498DB]/60 hover:bg-[#3498DB]/15 focus:outline-none focus:ring-2 focus:ring-[#3498DB] focus:ring-offset-2 focus:ring-offset-[#04070F]"
          aria-label="Explore our work"
        >
          <Sparkles className="h-4 w-4 text-[#3498DB]" />
          Explore Our Work
          <ArrowDown className="h-4 w-4 animate-bounce" />
        </a>
      </section>

      {/* ══ MEET THE TEAM ══ */}
      <TeamCarousel />

      {/* ══ SERVICES GRID ══ */}
      <ServicesGrid />

      {/* ══ VIDEOGRAPHY ══ */}
      <VideographySection />

      {/* ══ CLIENT REVIEWS ══ */}
      <ClientReviews />

      {/* ══ WORK VIDEO REEL ══ */}
      <VideoTicker />

      {/* ══ COST CALCULATOR ══ */}
      <CostCalculator />

      {/* ══ FOOTER CTA BANNER ══ */}
      <section className="footer-cta-banner relative overflow-hidden" aria-label="Contact us CTA">
        <div className="footer-cta-bg" aria-hidden="true" />
        <div className="relative mx-auto flex max-w-7xl flex-col items-start gap-8 px-8 py-20 md:flex-row md:items-center md:justify-between md:px-16">
          <div className="footer-cta-text">
            <h2 className="font-heading text-4xl font-bold leading-tight text-white sm:text-5xl md:text-6xl">
              Have an Idea?{" "}
              <span className="footer-cta-highlight">Let's{"\n"}Make It Happen!</span>
            </h2>
          </div>
          <a
            href="#contact"
            id="footer-get-in-touch"
            className="footer-cta-btn"
            aria-label="Get in touch with Evoke Hub"
          >
            Get In Touch
          </a>
        </div>
        {/* Decorative grid */}
        <div className="absolute inset-0 grid-overlay opacity-10" aria-hidden="true" />
      </section>

      {/* ══ MAIN FOOTER ══ */}
      <footer className="site-footer relative overflow-hidden" aria-label="Site footer">
        <div className="site-footer-bg" aria-hidden="true" />
        <div className="relative mx-auto grid max-w-7xl grid-cols-1 gap-12 px-8 py-16 sm:grid-cols-2 lg:grid-cols-4 lg:px-16">

          {/* Col 1 — Brand */}
          <div className="footer-brand-col">
            <div className="footer-logo-wrap">
              <Image
                src="/assets/evoke-hub-logo.png"
                alt="Evoke Hub"
                width={140}
                height={60}
                className="footer-logo-img"
              />
            </div>
            <p className="footer-brand-desc">
              We craft premium digital experiences that move brands forward — with precision, polish, and purpose.
            </p>
          </div>

          {/* Col 2 — Navigation */}
          <div className="footer-links-col">
            <h3 className="footer-col-title">Navigation</h3>
            <nav aria-label="Footer navigation">
              <ul className="footer-nav-list">
                {["Home", "About", "Services", "Portfolio"].map((item) => (
                  <li key={item}>
                    <a href={`#${item.toLowerCase()}`} className="footer-nav-link">{item}</a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Col 3 — Quick Links */}
          <div className="footer-links-col">
            <h3 className="footer-col-title">Quick Link</h3>
            <nav aria-label="Quick links">
              <ul className="footer-nav-list">
                {["Home", "About", "Services", "Portfolio"].map((item) => (
                  <li key={item}>
                    <a href={`#${item.toLowerCase()}`} className="footer-nav-link footer-nav-link--accent">{item}</a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Col 4 — Contact */}
          <div className="footer-contact-col">
            <ul className="footer-contact-list">
              <li className="footer-contact-item">
                <Phone className="footer-contact-icon" aria-hidden="true" />
                <a href="tel:+10511520992" className="footer-contact-link">(105) 115–2992</a>
              </li>
              <li className="footer-contact-item">
                <MapPin className="footer-contact-icon" aria-hidden="true" />
                <address className="footer-contact-addr">201 King Street, 3rd Floor</address>
              </li>
              <li className="footer-contact-item">
                <Mail className="footer-contact-icon" aria-hidden="true" />
                <a href="mailto:support@evokehub.com" className="footer-contact-link">support@evokehub.com</a>
              </li>
            </ul>
            {/* Social icons — inline SVGs to avoid lucide version issues */}
            <div className="footer-socials" role="list" aria-label="Social media links">
              {/* Facebook */}
              <a href="#" className="footer-social-btn" aria-label="Facebook" role="listitem">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
              </a>
              {/* X / Twitter */}
              <a href="#" className="footer-social-btn" aria-label="Twitter / X" role="listitem">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              {/* YouTube */}
              <a href="#" className="footer-social-btn" aria-label="YouTube" role="listitem">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58zM9.75 15.02V8.98L15.5 12l-5.75 3.02z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="footer-bottom">
          <div className="mx-auto max-w-7xl px-8 lg:px-16">
            <p className="footer-copy">
              © {new Date().getFullYear()} Evoke Hub. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </main>
    </>
  );
}
