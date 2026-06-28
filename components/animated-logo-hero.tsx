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

/* ── Particle data — hardcoded so SSR and client produce identical HTML ── */
const PARTICLES = [
  { id:  0, x: 48.30, y: 28.31, size: 4.12, duration: 7.78, delay: 4.86, opacity: 0.35 },
  { id:  1, x: 88.03, y: 91.83, size: 2.92, duration: 3.72, delay: 1.37, opacity: 0.47 },
  { id:  2, x: 45.55, y: 97.55, size: 2.41, duration: 5.53, delay: 0.00, opacity: 0.49 },
  { id:  3, x: 85.79, y: 65.74, size: 3.08, duration: 4.80, delay: 3.55, opacity: 0.30 },
  { id:  4, x:  3.99, y: 35.67, size: 2.69, duration: 7.85, delay: 0.49, opacity: 0.62 },
  { id:  5, x: 57.96, y: 93.95, size: 3.14, duration: 4.93, delay: 4.36, opacity: 0.62 },
  { id:  6, x: 64.35, y: 76.93, size: 3.28, duration: 3.73, delay: 3.19, opacity: 0.59 },
  { id:  7, x: 99.75, y: 36.82, size: 3.95, duration: 6.06, delay: 1.50, opacity: 0.60 },
  { id:  8, x: 94.21, y: 41.71, size: 1.74, duration: 6.60, delay: 5.99, opacity: 0.89 },
  { id:  9, x: 12.50, y: 49.66, size: 2.41, duration: 7.21, delay: 3.39, opacity: 0.81 },
  { id: 10, x: 82.33, y: 12.00, size: 1.77, duration: 5.59, delay: 3.93, opacity: 0.67 },
  { id: 11, x: 66.26, y: 23.99, size: 3.39, duration: 3.52, delay: 5.72, opacity: 0.47 },
  { id: 12, x: 20.64, y: 56.93, size: 1.74, duration: 5.31, delay: 3.96, opacity: 0.75 },
  { id: 13, x: 17.13, y: 18.09, size: 4.23, duration: 7.17, delay: 1.17, opacity: 0.43 },
  { id: 14, x: 32.55, y: 54.60, size: 2.83, duration: 6.46, delay: 3.19, opacity: 0.46 },
  { id: 15, x: 47.87, y: 30.11, size: 4.16, duration: 4.17, delay: 3.84, opacity: 0.35 },
  { id: 16, x: 99.38, y: 57.38, size: 4.21, duration: 3.52, delay: 5.22, opacity: 0.70 },
  { id: 17, x: 35.16, y: 12.80, size: 4.18, duration: 5.92, delay: 3.33, opacity: 0.56 },
  { id: 18, x: 27.16, y: 49.56, size: 3.59, duration: 7.52, delay: 3.70, opacity: 0.63 },
  { id: 19, x: 95.11, y: 18.33, size: 3.87, duration: 6.28, delay: 2.96, opacity: 0.47 },
  { id: 20, x: 81.10, y: 93.22, size: 1.91, duration: 3.62, delay: 2.79, opacity: 0.82 },
  { id: 21, x: 12.76, y: 24.23, size: 2.02, duration: 5.66, delay: 4.32, opacity: 0.89 },
  { id: 22, x: 74.59, y: 67.66, size: 2.34, duration: 6.51, delay: 2.91, opacity: 0.75 },
  { id: 23, x:  1.97, y: 47.62, size: 4.42, duration: 7.03, delay: 5.71, opacity: 0.50 },
  { id: 24, x: 87.58, y:  9.97, size: 2.89, duration: 5.08, delay: 0.05, opacity: 0.71 },
  { id: 25, x: 97.40, y: 67.11, size: 2.95, duration: 3.34, delay: 4.58, opacity: 0.75 },
  { id: 26, x: 73.37, y: 17.26, size: 2.65, duration: 7.67, delay: 2.70, opacity: 0.76 },
  { id: 27, x: 79.69, y: 46.60, size: 2.01, duration: 7.94, delay: 5.70, opacity: 0.67 },
];


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
