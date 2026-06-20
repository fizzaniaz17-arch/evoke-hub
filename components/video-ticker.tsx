"use client";

import { useState } from "react";
import { Pause, Play } from "lucide-react";

/* ─── 9 Streamable work-reel URLs ─── */
const VIDEOS = [
  { src: "https://streamable.com/l/diqi0e/mp4-mobile.mp4", label: "Reel 01" },
  { src: "https://streamable.com/l/17z0j2/mp4-mobile.mp4", label: "Reel 02" },
  { src: "https://streamable.com/l/dwina2/mp4-mobile.mp4", label: "Reel 03" },
  { src: "https://streamable.com/l/kzhi0f/mp4-mobile.mp4", label: "Reel 04" },
  { src: "https://streamable.com/l/lttg48/mp4-mobile.mp4", label: "Reel 05" },
  { src: "https://streamable.com/l/e03hi7/mp4-mobile.mp4", label: "Reel 06" },
  { src: "https://streamable.com/l/prgi89/mp4-mobile.mp4", label: "Reel 07" },
  { src: "https://streamable.com/l/cnugix/mp4-mobile.mp4", label: "Reel 08" },
  { src: "https://streamable.com/l/vytztg/mp4-mobile.mp4", label: "Reel 09" },
];

/* Duplicate the list so the CSS translate(-50%) creates a seamless loop */
const DOUBLED = [...VIDEOS, ...VIDEOS];

export default function VideoTicker() {
  const [paused, setPaused]       = useState(false);
  const [activeIdx, setActiveIdx] = useState<number | null>(null);

  return (
    <section
      id="testimonials"
      aria-labelledby="vt-heading"
      className="vt-section relative overflow-hidden"
    >
      {/* ── Section heading ── */}
      <div className="relative mx-auto max-w-7xl px-6 pt-20 pb-12 text-center lg:px-16">
        <p className="vt-eyebrow">Our Portfolio</p>
        <h2 id="vt-heading" className="vt-title">
          Testimonials &amp; <span className="vt-accent">Work Reels</span>
        </h2>
        <p className="vt-subtitle">
          Hover any clip to pause the reel and watch it in full
        </p>
      </div>

      {/* ── Horizontal marquee ticker ── */}
      <div
        className="vt-wrap"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => { setPaused(false); setActiveIdx(null); }}
        aria-label="Scrolling portfolio video reel — hover to pause"
      >
        {/* Edge fades */}
        <div className="vt-fade vt-fade--left"  aria-hidden="true" />
        <div className="vt-fade vt-fade--right" aria-hidden="true" />

        {/* The track scrolls horizontally via CSS animation */}
        <div
          className="vt-track"
          style={{ animationPlayState: paused ? "paused" : "running" }}
          aria-hidden="true"
        >
          {DOUBLED.map((v, idx) => {
            const isActive = idx === activeIdx;
            return (
              <div
                key={idx}
                className={`vt-card${isActive ? " vt-card--active" : ""}`}
                onMouseEnter={() => setActiveIdx(idx)}
                onMouseLeave={() => setActiveIdx(null)}
              >
                {/* Video — autoplay, loop, muted (required for autoplay) */}
                <video
                  src={v.src}
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload={idx >= VIDEOS.length ? "none" : "metadata"}
                  className="vt-video"
                />

                {/* Hover overlay */}
                <div className="vt-overlay">
                  <div className="vt-play-ring">
                    {isActive
                      ? <Pause  className="h-5 w-5 fill-white text-white" />
                      : <Play   className="h-5 w-5 fill-white text-white" />}
                  </div>
                  <span className="vt-card-label">{v.label}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Pause / scroll hint */}
      <div className="relative mx-auto max-w-7xl px-6 pb-20 pt-6 text-center">
        {paused
          ? <p className="vt-pause-hint vt-pause-hint--visible">⏸ Paused — move away to resume</p>
          : <p className="vt-hint">← Hover any clip to pause &amp; watch →</p>}
      </div>
    </section>
  );
}
