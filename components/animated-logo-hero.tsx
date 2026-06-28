"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowDown, Sparkles } from "lucide-react";

/* ── Showcase videos (same reels used in VideoTicker) ── */
const SHOWCASE_VIDEOS = [
  "https://streamable.com/l/diqi0e/mp4-mobile.mp4",
  "https://streamable.com/l/17z0j2/mp4-mobile.mp4",
  "https://streamable.com/l/dwina2/mp4-mobile.mp4",
  "https://streamable.com/l/kzhi0f/mp4-mobile.mp4",
  "https://streamable.com/l/lttg48/mp4-mobile.mp4",
  "https://streamable.com/l/e03hi7/mp4-mobile.mp4",
];

/* ── Particle data ── */
const PARTICLES = Array.from({ length: 28 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: 1.5 + Math.random() * 3,
  duration: 3 + Math.random() * 5,
  delay: Math.random() * 6,
  opacity: 0.3 + Math.random() * 0.6,
}));

export default function AnimatedLogoHero() {
  const [hovered, setHovered] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [activeVideo, setActiveVideo] = useState(0);
  const heroRef = useRef<HTMLElement>(null);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  /* Cycle background videos every 5 s */
  useEffect(() => {
    const id = setInterval(() => {
      setActiveVideo((v) => (v + 1) % SHOWCASE_VIDEOS.length);
    }, 5000);
    return () => clearInterval(id);
  }, []);

  /* Subtle parallax on mouse move */
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!heroRef.current) return;
    const rect = heroRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 20;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 12;
    setMousePos({ x, y });
  };

  const handleMouseLeave = () => {
    setMousePos({ x: 0, y: 0 });
    setHovered(false);
  };

  return (
    <section
      ref={heroRef}
      className="alh-section"
      aria-label="Evoke Hub hero"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* ══ FADED VIDEO SHOWCASE BACKGROUND ══ */}
      <div className="alh-video-bg" aria-hidden="true">
        {SHOWCASE_VIDEOS.map((src, i) => (
          <video
            key={i}
            ref={(el) => { videoRefs.current[i] = el; }}
            src={src}
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            className={`alh-video-slide ${i === activeVideo ? "alh-video-slide--active" : ""}`}
          />
        ))}
        {/* Overlay grid */}
        <div className="alh-video-grid" />
        {/* Strong vignette */}
        <div className="alh-video-vignette" />
      </div>

      {/* Dark base */}
      <div className="absolute inset-0 bg-[#04070F]/65" aria-hidden="true" />



      {/* ══ ANIMATED LOGO ══ */}
      <div
        className="alh-logo-wrap"
        style={{
          transform: `translate(${mousePos.x * 0.5}px, ${mousePos.y * 0.5}px)`,
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* Glow backdrop */}
        <div className={`alh-glow-backdrop ${hovered ? "alh-glow-backdrop--hovered" : ""}`} aria-hidden="true" />

        {/* Particles */}
        <div className="alh-particles" aria-hidden="true">
          {PARTICLES.map((p) => (
            <div
              key={p.id}
              className="alh-particle"
              style={{
                left: `${p.x}%`,
                top: `${p.y}%`,
                width: p.size,
                height: p.size,
                opacity: p.opacity,
                animationDuration: `${p.duration}s`,
                animationDelay: `${p.delay}s`,
              }}
            />
          ))}
        </div>

        {/* ── SVG Animated Logo ── */}
        <svg
          viewBox="0 0 520 160"
          className={`alh-svg ${hovered ? "alh-svg--hovered" : ""}`}
          aria-label="Evoke Hub"
          role="img"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Shimmer gradient */}
            <linearGradient id="shimmer-grad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#3498DB" stopOpacity="0.9" />
              <stop offset="35%" stopColor="#8b5cf6" stopOpacity="1" />
              <stop offset="65%" stopColor="#3498DB" stopOpacity="1" />
              <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.9" />
              <animateTransform
                attributeName="gradientTransform"
                type="translate"
                from="-1 0"
                to="1 0"
                dur="3s"
                repeatCount="indefinite"
              />
            </linearGradient>

            {/* Gold shimmer for HUB */}
            <linearGradient id="hub-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
              <stop offset="50%" stopColor="#c4b5fd" stopOpacity="1" />
              <stop offset="100%" stopColor="#ffffff" stopOpacity="0.85" />
            </linearGradient>

            {/* Glow filter */}
            <filter id="logo-glow" x="-20%" y="-40%" width="140%" height="180%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>

            {/* Strong glow for hover */}
            <filter id="logo-glow-strong" x="-30%" y="-60%" width="160%" height="220%">
              <feGaussianBlur stdDeviation="6" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>

            {/* Clip path for shimmer sweep */}
            <clipPath id="text-clip">
              <text
                x="50%"
                textAnchor="middle"
                y="82"
                fontSize="90"
                fontWeight="900"
                fontFamily="Montserrat, Arial, sans-serif"
                letterSpacing="-2"
              >
                EVOKE
              </text>
            </clipPath>
          </defs>

          {/* ─ Decorative top line ─ */}
          <line
            x1="30" y1="18" x2="490" y2="18"
            stroke="url(#shimmer-grad)"
            strokeWidth="0.8"
            strokeOpacity="0.4"
          >
            <animate attributeName="strokeOpacity" values="0.2;0.6;0.2" dur="2.5s" repeatCount="indefinite" />
          </line>

          {/* ─ "EVOKE" main text ─ */}
          <text
            x="50%"
            textAnchor="middle"
            y="90"
            fontSize="92"
            fontWeight="900"
            fontFamily="Montserrat, Arial, sans-serif"
            letterSpacing="-2"
            fill="url(#shimmer-grad)"
            filter="url(#logo-glow)"
            className="alh-text-evoke"
          >
            EVOKE
          </text>

          {/* ─ "EVOKE" shimmer sweep overlay ─ */}
          <rect
            x="0" y="0"
            width="520" height="110"
            fill="none"
            style={{
              WebkitClipPath: "inset(0)",
            }}
            clipPath="url(#text-clip)"
            opacity="0.35"
          >
            <animate attributeName="x" values="-520;520" dur="2.2s" repeatCount="indefinite" />
          </rect>

          {/* ─ "HUB" sub-text ─ */}
          <text
            x="50%"
            textAnchor="middle"
            y="138"
            fontSize="46"
            fontWeight="700"
            fontFamily="Montserrat, Arial, sans-serif"
            letterSpacing="18"
            fill="url(#hub-grad)"
            filter="url(#logo-glow)"
            className="alh-text-hub"
          >
            HUB
          </text>

          {/* ─ Decorative bottom line ─ */}
          <line
            x1="30" y1="155" x2="490" y2="155"
            stroke="url(#shimmer-grad)"
            strokeWidth="0.8"
            strokeOpacity="0.4"
          >
            <animate attributeName="strokeOpacity" values="0.2;0.6;0.2" dur="2.5s" repeatCount="indefinite" begin="1.25s" />
          </line>

          {/* ─ Left accent dot ─ */}
          <circle cx="14" cy="86" r="3.5" fill="#3498DB" opacity="0.8">
            <animate attributeName="opacity" values="0.4;1;0.4" dur="1.8s" repeatCount="indefinite" />
            <animate attributeName="r" values="3;4.5;3" dur="1.8s" repeatCount="indefinite" />
          </circle>

          {/* ─ Right accent dot ─ */}
          <circle cx="506" cy="86" r="3.5" fill="#a855f7" opacity="0.8">
            <animate attributeName="opacity" values="0.4;1;0.4" dur="1.8s" repeatCount="indefinite" begin="0.9s" />
            <animate attributeName="r" values="3;4.5;3" dur="1.8s" repeatCount="indefinite" begin="0.9s" />
          </circle>
        </svg>

        {/* Tagline */}
        <p className="alh-tagline">
          <span className="alh-tagline-line" />
          Creative Studio
          <span className="alh-tagline-line" />
        </p>

        {/* Video indicator dots */}
        <div className="alh-video-dots" aria-hidden="true">
          {SHOWCASE_VIDEOS.map((_, i) => (
            <button
              key={i}
              className={`alh-dot ${i === activeVideo ? "alh-dot--active" : ""}`}
              onClick={() => setActiveVideo(i)}
              aria-label={`Show showcase video ${i + 1}`}
            />
          ))}
        </div>
      </div>

      {/* ══ SCROLL CTA ══ */}
      <a
        href="#team"
        id="hero-cta"
        className="alh-cta-btn"
        aria-label="Explore our work"
        style={{ transform: `translate(${mousePos.x * 0.2}px, ${mousePos.y * 0.2}px)` }}
      >
        <Sparkles className="h-4 w-4 text-[#3498DB]" />
        Explore Our Work
        <ArrowDown className="h-4 w-4 animate-bounce" />
      </a>
    </section>
  );
}
