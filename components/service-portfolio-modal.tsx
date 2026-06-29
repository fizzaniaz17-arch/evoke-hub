"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { X, LayoutGrid, PlayCircle } from "lucide-react";
import type { ServicePortfolio } from "@/data/services-portfolio";

interface Props {
  portfolio: ServicePortfolio | null;
  onClose: () => void;
}

export default function ServicePortfolioModal({ portfolio, onClose }: Props) {
  const [tab, setTab] = useState<"photos" | "videos">("photos");
  const [lightbox, setLightbox] = useState<string | null>(null);
  const [lightboxCaption, setLightboxCaption] = useState<string>("");
  const [playingVideo, setPlayingVideo] = useState<string | null>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  /* Close on Escape */
  const handleKey = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (lightbox) { setLightbox(null); return; }
        onClose();
      }
    },
    [lightbox, onClose]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [handleKey]);

  /* Lock body scroll while open */
  useEffect(() => {
    if (portfolio) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [portfolio]);

  /* Reset state when service changes */
  useEffect(() => {
    setTab("photos");
    setPlayingVideo(null);
    setLightbox(null);
  }, [portfolio?.serviceId]);

  /* Focus the panel when it opens */
  useEffect(() => {
    if (portfolio && panelRef.current) {
      panelRef.current.focus();
    }
  }, [portfolio]);

  if (!portfolio) return null;

  const openLightbox = (src: string, caption: string) => {
    setLightbox(src);
    setLightboxCaption(caption);
  };

  return (
    <>
      {/* ── Backdrop ──────────────────────────────────────────────────────── */}
      <div
        className="spm-backdrop"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* ── Slide-up panel ────────────────────────────────────────────────── */}
      <div
        ref={panelRef}
        className="spm-panel"
        role="dialog"
        aria-modal="true"
        aria-label={`${portfolio.label} portfolio`}
        tabIndex={-1}
      >
        {/* Coloured accent bar */}
        <div
          className="spm-accent-line"
          style={{ background: portfolio.accent }}
        />

        {/* Drag handle */}
        <div className="spm-handle" aria-hidden="true" />

        {/* ── Header ────────────────────────────────────────────────────── */}
        <div className="spm-header">
          <div className="spm-header-left">
            <span
              className="spm-service-dot"
              style={{ background: portfolio.accent }}
            />
            <div className="spm-header-text">
              <h2 className="spm-title">{portfolio.label}</h2>
              <p className="spm-desc">{portfolio.description}</p>
            </div>
          </div>
          <button
            className="spm-close"
            onClick={onClose}
            aria-label="Close portfolio"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* ── Tabs ──────────────────────────────────────────────────────── */}
        <div className="spm-tabs" role="tablist">
          <button
            role="tab"
            aria-selected={tab === "photos"}
            className={`spm-tab${tab === "photos" ? " spm-tab--active" : ""}`}
            style={
              tab === "photos"
                ? ({
                    "--spm-tab-color": portfolio.accent,
                  } as React.CSSProperties)
                : {}
            }
            onClick={() => { setTab("photos"); setPlayingVideo(null); }}
          >
            <LayoutGrid className="h-3.5 w-3.5" />
            Photos
            <span className="spm-tab-count">{portfolio.images.length}</span>
          </button>
          <button
            role="tab"
            aria-selected={tab === "videos"}
            className={`spm-tab${tab === "videos" ? " spm-tab--active" : ""}`}
            style={
              tab === "videos"
                ? ({
                    "--spm-tab-color": portfolio.accent,
                  } as React.CSSProperties)
                : {}
            }
            onClick={() => setTab("videos")}
          >
            <PlayCircle className="h-3.5 w-3.5" />
            Videos
            <span className="spm-tab-count">{portfolio.videos.length}</span>
          </button>
        </div>

        {/* ── Body ──────────────────────────────────────────────────────── */}
        <div className="spm-body" key={portfolio.serviceId}>

          {/* Photos tab — CSS masonry grid */}
          {tab === "photos" && (
            <div className="spm-masonry">
              {portfolio.images.map((img) => (
                <button
                  key={img.id}
                  className="spm-img-card"
                  onClick={() => openLightbox(img.src, img.caption)}
                  aria-label={`View ${img.caption}`}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={img.src}
                    alt={img.caption}
                    loading="lazy"
                    decoding="async"
                  />
                  <span className="spm-img-caption">{img.caption}</span>
                  <span className="spm-img-zoom" aria-hidden="true">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18">
                      <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/><path d="M11 8v6M8 11h6"/>
                    </svg>
                  </span>
                </button>
              ))}
            </div>
          )}

          {/* Videos tab — YouTube lazy embed grid */}
          {tab === "videos" && (
            <div className="spm-video-grid">
              {portfolio.videos.map((vid) => (
                <div key={vid.id} className="spm-video-card">
                  {playingVideo === vid.id ? (
                    <iframe
                      className="spm-iframe"
                      src={`https://www.youtube-nocookie.com/embed/${vid.youtubeId}?autoplay=1&rel=0&modestbranding=1&color=white`}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                      title={vid.title}
                    />
                  ) : (
                    <button
                      className="spm-video-thumb"
                      onClick={() => setPlayingVideo(vid.id)}
                      aria-label={`Play: ${vid.title}`}
                    >
                      {/* YouTube auto-generated thumbnail */}
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={`https://img.youtube.com/vi/${vid.youtubeId}/hqdefault.jpg`}
                        alt={vid.title}
                        loading="lazy"
                        decoding="async"
                      />
                      <div className="spm-play-overlay">
                        {/* YouTube-style play button */}
                        <div className="spm-play-btn" aria-hidden="true">
                          <svg viewBox="0 0 68 48" width="56" height="40">
                            <path
                              d="M66.52 7.74c-.78-2.93-2.49-5.41-5.42-6.19C55.79.13 34 0 34 0S12.21.13 6.9 1.55c-2.93.78-4.63 3.26-5.42 6.19C.06 13.05 0 24 0 24s.06 10.95 1.48 16.26c.78 2.93 2.49 5.41 5.42 6.19C12.21 47.87 34 48 34 48s21.79-.13 27.1-1.55c2.93-.78 4.64-3.26 5.42-6.19C67.94 34.95 68 24 68 24s-.06-10.95-1.48-16.26z"
                              fill="#FF0000"
                            />
                            <path d="M45 24 27 14v20" fill="#fff" />
                          </svg>
                        </div>
                        <p className="spm-video-title">{vid.title}</p>
                      </div>
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}

        </div>
      </div>

      {/* ── Lightbox ──────────────────────────────────────────────────────── */}
      {lightbox && (
        <div
          className="spm-lightbox"
          onClick={() => setLightbox(null)}
          role="dialog"
          aria-modal="true"
          aria-label="Image preview"
        >
          <button
            className="spm-lightbox-close"
            onClick={() => setLightbox(null)}
            aria-label="Close preview"
          >
            <X className="h-5 w-5" />
          </button>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={lightbox}
            alt={lightboxCaption}
            className="spm-lightbox-img"
            onClick={(e) => e.stopPropagation()}
          />
          {lightboxCaption && (
            <p className="spm-lightbox-caption">{lightboxCaption}</p>
          )}
        </div>
      )}
    </>
  );
}
