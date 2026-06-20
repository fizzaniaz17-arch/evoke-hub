"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

/* ──────────────────────────────────────────────
   YouTube video data — replace IDs / titles as needed
─────────────────────────────────────────────── */
const VIDEOS = [
  {
    id: "vid-1",
    youtubeId: "LXb3EKWsInQ",
    title: "Brand Identity Reel",
    channel: "Evoke Hub",
    duration: "3:47",
    views: "24K",
    description: "A cinematic showcase of brand identities we've crafted — logos, color systems, and visual languages built to last.",
  },
  {
    id: "vid-2",
    youtubeId: "ysz5S6PUM-U",
    title: "UI/UX Motion Showcase",
    channel: "Evoke Hub",
    duration: "5:12",
    views: "18K",
    description: "Fluid transitions, micro-interactions and interface animations from our top product design projects.",
  },
  {
    id: "vid-3",
    youtubeId: "ZSt9tm3RoUU",
    title: "3D Visual Renders",
    channel: "Evoke Hub",
    duration: "4:28",
    views: "31K",
    description: "Realtime 3D renders and shader work — from product visualisation to abstract brand worlds.",
  },
  {
    id: "vid-4",
    youtubeId: "V-_O7nl0Ii0",
    title: "Social Media Content Pack",
    channel: "Evoke Hub",
    duration: "2:55",
    views: "12K",
    description: "Scroll-stopping social content — reels, stories and ads engineered for engagement and recall.",
  },
  {
    id: "vid-5",
    youtubeId: "aqz-KE-bpKQ",
    title: "Behind the Process",
    channel: "Evoke Hub",
    duration: "7:04",
    views: "9.4K",
    description: "An inside look at how we take a brief from concept through strategy, design, and final delivery.",
  },
];

/* Stagger positions matching the reference image layout */
const CARD_POSITIONS = [
  // Top-left
  { gridArea: "c1", rotate: -2  },
  // Top-right
  { gridArea: "c2", rotate: 1.5 },
  // Middle-center (front/hero)
  { gridArea: "c3", rotate: 0   },
  // Bottom-left
  { gridArea: "c4", rotate: 1   },
  // Bottom-right
  { gridArea: "c5", rotate: -1.5},
];

function getThumb(youtubeId: string) {
  return `https://img.youtube.com/vi/${youtubeId}/maxresdefault.jpg`;
}
function getYouTubeUrl(youtubeId: string) {
  return `https://www.youtube.com/watch?v=${youtubeId}`;
}

/* ── Individual Video Card ── */
function VideoCard({
  video,
  position,
  index,
}: {
  video: typeof VIDEOS[number];
  position: typeof CARD_POSITIONS[number];
  index: number;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      className="vid-card"
      style={{ "--card-rotate": `${position.rotate}deg` } as React.CSSProperties}
      initial={{ opacity: 0, y: 30, rotate: position.rotate }}
      whileInView={{ opacity: 1, y: 0, rotate: position.rotate }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.55, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ scale: 1.04, rotate: 0, zIndex: 20 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
    >
      {/* Thumbnail */}
      <div className="vid-card-thumb">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={getThumb(video.youtubeId)}
          alt={video.title}
          className="vid-card-img"
          loading="lazy"
          onError={(e) => {
            // Fallback to HQ thumb if maxres fails
            (e.currentTarget as HTMLImageElement).src =
              `https://img.youtube.com/vi/${video.youtubeId}/hqdefault.jpg`;
          }}
        />
        {/* Dark overlay */}
        <div className="vid-card-overlay" />

        {/* YouTube Play button */}
        <a
          href={getYouTubeUrl(video.youtubeId)}
          target="_blank"
          rel="noopener noreferrer"
          className="vid-play-btn"
          aria-label={`Play ${video.title} on YouTube`}
        >
          {/* YouTube official logo shape */}
          <svg viewBox="0 0 68 48" className="vid-play-icon" aria-hidden="true">
            <path className="vid-play-bg" d="M66.52 7.74c-.78-2.93-2.49-5.41-5.42-6.19C55.79.13 34 0 34 0S12.21.13 6.9 1.55c-2.93.78-4.63 3.26-5.42 6.19C.06 13.05 0 24 0 24s.06 10.95 1.48 16.26c.78 2.93 2.49 5.41 5.42 6.19C12.21 47.87 34 48 34 48s21.79-.13 27.1-1.55c2.93-.78 4.64-3.26 5.42-6.19C67.94 34.95 68 24 68 24s-.06-10.95-1.48-16.26z"/>
            <path className="vid-play-arrow" d="M45 24 27 14v20"/>
          </svg>
        </a>

        {/* Duration badge */}
        <span className="vid-duration">{video.duration}</span>
      </div>

      {/* Card meta bar */}
      <div className="vid-card-bar">
        {/* Left: channel + title */}
        <div className="vid-card-meta">
          {/* Channel avatar */}
          <div className="vid-channel-dot" aria-hidden="true">
            <svg viewBox="0 0 16 16" className="h-3 w-3 fill-white" aria-hidden="true">
              <path d="M6 0a6 6 0 1 0 0 12A6 6 0 0 0 6 0zm0 10.5A4.5 4.5 0 1 1 6 1.5a4.5 4.5 0 0 1 0 9zm6.5 2.5a.75.75 0 0 0-1.06-1.06l-1.72 1.72-1.72-1.72A.75.75 0 0 0 6.94 13l1.72 1.72-1.72 1.72a.75.75 0 0 0 1.06 1.06l1.72-1.72 1.72 1.72a.75.75 0 0 0 1.06-1.06l-1.72-1.72 1.72-1.72z"/>
            </svg>
          </div>
          <div>
            <p className="vid-card-title">{video.title}</p>
            <p className="vid-card-channel">{video.channel}</p>
          </div>
        </div>

        {/* Right: share + clock + Watch on YouTube */}
        <div className="vid-card-actions">
          <button className="vid-action-btn" aria-label="Share">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/>
              <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
            </svg>
          </button>
          <button className="vid-action-btn" aria-label="Save for later">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
            </svg>
          </button>
          <a
            href={getYouTubeUrl(video.youtubeId)}
            target="_blank"
            rel="noopener noreferrer"
            className="vid-watch-btn"
            aria-label={`Watch ${video.title} on YouTube`}
          >
            {/* YouTube wordmark */}
            <svg viewBox="0 0 90 20" className="vid-yt-logo" aria-hidden="true" fill="currentColor">
              <path d="M27.97 2.74a3.37 3.37 0 0 0-2.37-2.37C23.44 0 14.42 0 14.42 0S5.4 0 3.25.37A3.37 3.37 0 0 0 .88 2.74 35.26 35.26 0 0 0 .5 8.75a35.26 35.26 0 0 0 .38 6.01 3.37 3.37 0 0 0 2.37 2.37C5.4 17.5 14.42 17.5 14.42 17.5s9.02 0 11.18-.37a3.37 3.37 0 0 0 2.37-2.37 35.26 35.26 0 0 0 .38-6.01 35.26 35.26 0 0 0-.38-6.01zM11.54 12.5V5l7.5 3.75-7.5 3.75z"/>
              <text x="32" y="14" fontSize="13" fontFamily="Arial,sans-serif" fontWeight="bold">YouTube</text>
            </svg>
          </a>
        </div>
      </div>
    </motion.div>
  );
}

/* ── Main Section ── */
export default function VideographySection() {
  return (
    <section
      id="videography"
      aria-labelledby="videography-title"
      className="videography-section relative overflow-hidden"
    >
      {/* Background */}
      <div className="videography-bg" aria-hidden="true" />
      <div className="absolute inset-0 grid-overlay opacity-10" aria-hidden="true" />

      <div className="relative mx-auto max-w-7xl px-8 py-24 lg:px-16">

        {/* Section label */}
        <div className="mb-16">
          <p className="font-heading text-xs font-semibold uppercase tracking-[0.38em] text-[#3498DB] mb-4">
            Our Work in Motion
          </p>
          <h2
            id="videography-title"
            className="font-heading text-5xl font-bold text-white sm:text-6xl lg:text-7xl videography-title"
          >
            Videography
          </h2>
        </div>

        {/* Staggered card grid */}
        <div className="vid-grid" aria-label="Videography showcase">
          {VIDEOS.map((video, i) => (
            <VideoCard
              key={video.id}
              video={video}
              position={CARD_POSITIONS[i]}
              index={i}
            />
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 flex justify-center">
          <a
            href="https://www.youtube.com/@EvokeHub"
            target="_blank"
            rel="noopener noreferrer"
            className="vid-channel-cta"
            id="videography-channel-link"
          >
            <svg viewBox="0 0 68 48" className="h-6 w-auto" aria-hidden="true">
              <path fill="#FF0000" d="M66.52 7.74c-.78-2.93-2.49-5.41-5.42-6.19C55.79.13 34 0 34 0S12.21.13 6.9 1.55c-2.93.78-4.63 3.26-5.42 6.19C.06 13.05 0 24 0 24s.06 10.95 1.48 16.26c.78 2.93 2.49 5.41 5.42 6.19C12.21 47.87 34 48 34 48s21.79-.13 27.1-1.55c2.93-.78 4.64-3.26 5.42-6.19C67.94 34.95 68 24 68 24s-.06-10.95-1.48-16.26z"/>
              <path fill="#fff" d="M45 24 27 14v20"/>
            </svg>
            Visit Our YouTube Channel
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M7 17L17 7M17 7H7M17 7v10"/>
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
