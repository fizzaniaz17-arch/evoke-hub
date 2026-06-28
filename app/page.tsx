import Image from "next/image";
import { ArrowDown, Phone, MapPin, Mail } from "lucide-react";
import ClientReviews from "@/components/client-reviews";
import TeamCarousel from "@/components/team-carousel";
import ServicesGrid from "@/components/services-grid";
import VideographySection from "@/components/videography-section";
import Navbar from "@/components/navbar";
import ScrollToTop from "@/components/scroll-to-top";
import CostCalculator from "@/components/cost-calculator";
import VideoTicker from "@/components/video-ticker";
import AnimatedLogoHero from "@/components/animated-logo-hero";

export default function Home() {
  return (
    <>
      <Navbar />
      <ScrollToTop />
      <main className="min-h-screen overflow-hidden bg-[#04070F] text-white">

      {/* ══ HERO ══ */}
      <AnimatedLogoHero />

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
