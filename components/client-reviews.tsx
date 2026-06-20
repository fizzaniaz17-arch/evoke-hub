"use client";

import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Quote, Star, X, ChevronRight } from "lucide-react";
import { useState, useEffect } from "react";

type Review = {
  name: string;
  position: string;
  company: string;
  logo: string;
  avatar: string;
  excerpt: string;
  quote: string;
  accent: string;
};

const reviews: Review[] = [
  {
    name: "Arielle Stone",
    position: "Chief Brand Officer",
    company: "Vanta Meridian",
    logo: "VM",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=640&q=80",
    excerpt: "The launch felt cinematic, precise, and unmistakably premium.",
    quote: "Evoke Hub translated a complex enterprise story into a digital experience that felt calm, expensive, and effortless. Our board called it the clearest presentation of the brand we have ever shipped.",
    accent: "#3498DB",
  },
  {
    name: "Julian Cross",
    position: "Founder",
    company: "Northline Capital",
    logo: "NC",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=640&q=80",
    excerpt: "Every interaction communicates trust before a word is read.",
    quote: "The team understood that our site had to feel restrained, credible, and technically advanced. The final product gives our clients a sense of confidence before they ever reach the pitch deck.",
    accent: "#6200FF",
  },
  {
    name: "Mina Laurent",
    position: "VP Product",
    company: "Aster Labs",
    logo: "AL",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=640&q=80",
    excerpt: "Their motion language made a dense product feel intuitive.",
    quote: "We needed a product narrative with depth but no clutter. Evoke Hub gave us a fast, polished, immersive interface that helped buyers understand value in the first thirty seconds.",
    accent: "#A855F7",
  },
  {
    name: "Theo Mak",
    position: "Managing Director",
    company: "Helio Forge",
    logo: "HF",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=640&q=80",
    excerpt: "A luxury-grade agency experience without the usual noise.",
    quote: "The work carried a rare balance: futuristic, but still operationally useful. Our sales team now has a digital front door that feels as sharp as the conversations they want to start.",
    accent: "#22D3EE",
  },
  {
    name: "Serena Vale",
    position: "CMO",
    company: "Monarch Systems",
    logo: "MS",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=640&q=80",
    excerpt: "It looks like a category leader, not a template.",
    quote: "We asked for Apple-level restraint with more atmosphere. Evoke Hub delivered a brand system and landing experience that made our previous positioning feel instantly outdated.",
    accent: "#F59E0B",
  },
  {
    name: "Damon Pierce",
    position: "Head of Growth",
    company: "Kairo Cloud",
    logo: "KC",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=640&q=80",
    excerpt: "The site became our strongest sales enablement asset.",
    quote: "The redesign gave our team a premium story, tighter conversion paths, and a visual system that finally matched the quality of the product behind it.",
    accent: "#10B981",
  },
  {
    name: "Leah Navarro",
    position: "CEO",
    company: "Orbit Seven",
    logo: "O7",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=640&q=80",
    excerpt: "Sophisticated, fast, and deeply considered from every angle.",
    quote: "The interface feels alive without becoming decorative. It has the kind of polish that makes prospects slow down, explore, and remember the company.",
    accent: "#EC4899",
  },
];

/* How many cards to show in the stack before they fade out */
const VISIBLE_STACK = 5;

export default function ClientReviews() {
  const [active, setActive] = useState<number | null>(null);
  const [frontIndex, setFrontIndex] = useState(0);

  /* Close on Escape */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setActive(null); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const openCard = (idx: number) => setActive(idx);
  const closeCard = () => setActive(null);

  /* Cycle which review sits at the front of the stack */
  const cycleFront = (dir: 1 | -1) => {
    setFrontIndex((prev) => (prev + dir + reviews.length) % reviews.length);
  };

  return (
    <section
      id="reviews"
      aria-labelledby="reviews-title"
      className="stack-section relative overflow-hidden px-5 py-28 sm:px-8"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_55%_at_50%_60%,rgba(98,0,255,0.18),transparent_55%),radial-gradient(ellipse_50%_40%_at_70%_20%,rgba(52,152,219,0.12),transparent_50%),linear-gradient(160deg,#04070F,#080d1a_50%,#04070F)]" />
      <div className="absolute inset-0 grid-overlay opacity-20" aria-hidden="true" />

      <div className="relative mx-auto max-w-7xl">

        {/* ── Heading row ── */}
        <div className="mb-20 flex flex-col items-start gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="font-heading text-xs font-bold uppercase tracking-[0.38em] text-[#3498DB]">
              Client Signal
            </p>
            <h2
              id="reviews-title"
              className="mt-4 max-w-2xl font-heading text-4xl font-semibold leading-tight text-white sm:text-5xl lg:text-6xl"
            >
              Stories from the{" "}
              <span className="stack-heading-grad">people we built for.</span>
            </h2>
            <p className="mt-5 max-w-lg font-body text-base leading-8 text-[#A1A1AA]">
              Click any card in the stack to read the full testimonial.
            </p>
          </div>

          {/* Stack nav */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => cycleFront(-1)}
              className="icon-button"
              aria-label="Previous review"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6" /></svg>
            </button>
            <span className="font-heading text-sm text-[#A1A1AA]">
              {frontIndex + 1} / {reviews.length}
            </span>
            <button
              onClick={() => cycleFront(1)}
              className="icon-button"
              aria-label="Next review"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6" /></svg>
            </button>
          </div>
        </div>

        {/* ── 3-D isometric stack ── */}
        <div className="stack-scene-wrap">
          <div className="stack-scene" aria-label="Review card stack">
            {reviews.map((review, i) => {
              /* Reorder so frontIndex is always position 0 */
              const pos = (i - frontIndex + reviews.length) % reviews.length;
              const isTop = pos === 0;
              const hidden = pos >= VISIBLE_STACK;

              /* Isometric stack offsets — each card behind goes right+down+back */
              const sx = pos * 48;
              const sy = pos * 52;
              const sz = -pos * 100;
              const cardScale = 1 - pos * 0.028;

              return (
                <motion.div
                  key={review.name}
                  className={`iso-stack-card${isTop ? " iso-stack-card--top" : ""}`}
                  style={{
                    zIndex: reviews.length - pos,
                    pointerEvents: hidden ? "none" : "auto",
                    "--card-accent": review.accent,
                  } as React.CSSProperties}
                  animate={
                    hidden
                      ? { opacity: 0, scale: 0 }
                      : {
                          /* Isometric tilt */
                          rotateX: 55,
                          rotateZ: -28,
                          x: sx,
                          y: sy,
                          z: sz,
                          scale: cardScale,
                          opacity: 1 - pos * 0.12,
                        }
                  }
                  whileHover={
                    !hidden
                      ? { z: sz + 30, scale: cardScale + 0.02 }
                      : {}
                  }
                  transition={{ type: "spring", stiffness: 90, damping: 18, mass: 0.85 }}
                  onClick={() => openCard(i)}
                  role="button"
                  tabIndex={hidden ? -1 : 0}
                  aria-label={`Read review from ${review.name}, ${review.company}`}
                  onKeyDown={(e) => e.key === "Enter" && openCard(i)}
                >
                  {/* Card inner – shows a peek of the review in tilt */}
                  <div className="iso-card-inner">
                    {/* Top bar */}
                    <div className="iso-card-topbar">
                      <div className="iso-card-logo" style={{ color: review.accent, borderColor: review.accent + "44", background: review.accent + "18" }}>
                        {review.logo}
                      </div>
                      <div className="iso-card-stars">
                        {Array.from({ length: 5 }).map((_, si) => (
                          <Star key={si} className="h-3.5 w-3.5 fill-current" style={{ color: review.accent }} />
                        ))}
                      </div>
                    </div>

                    {/* Avatar + name */}
                    <div className="iso-card-person">
                      <div className="iso-card-avatar">
                        <Image src={review.avatar} alt="" fill sizes="56px" className="object-cover" loading="lazy" />
                      </div>
                      <div>
                        <div className="iso-card-name">{review.name}</div>
                        <div className="iso-card-role">{review.position} · {review.company}</div>
                      </div>
                    </div>

                    {/* Excerpt */}
                    <p className="iso-card-excerpt">"{review.excerpt}"</p>

                    {/* Click hint on top card */}
                    {isTop && (
                      <div className="iso-card-hint" style={{ color: review.accent }}>
                        Click to read full review →
                      </div>
                    )}

                    {/* Decorative lines (newspaper/document feel) */}
                    <div className="iso-card-lines" aria-hidden="true">
                      {Array.from({ length: 6 }).map((_, li) => (
                        <div key={li} className="iso-card-line" />
                      ))}
                    </div>
                  </div>

                  {/* Card edge glow on top card */}
                  {isTop && (
                    <div
                      className="iso-card-edge-glow"
                      style={{ boxShadow: `0 0 0 1.5px ${review.accent}66, 0 0 60px ${review.accent}44, 0 24px 80px rgba(0,0,0,0.7)` }}
                      aria-hidden="true"
                    />
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Dot row */}
        <div className="mt-16 flex justify-center gap-2" role="tablist">
          {reviews.map((r, i) => (
            <button
              key={r.name}
              onClick={() => setFrontIndex(i)}
              role="tab"
              aria-selected={i === frontIndex}
              aria-label={r.name}
              className="stack-dot"
              style={i === frontIndex ? { background: reviews[frontIndex].accent, width: 28 } : {}}
            />
          ))}
        </div>
      </div>

      {/* ══ Pop-out expanded card overlay ══ */}
      <AnimatePresence>
        {active !== null && (
          <>
            {/* Backdrop */}
            <motion.div
              className="pop-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={closeCard}
              aria-hidden="true"
            />

            {/* Expanded card */}
            <motion.div
              className="pop-card"
              role="dialog"
              aria-modal="true"
              aria-label={`Review from ${reviews[active].name}`}
              initial={{ opacity: 0, scale: 0.72, rotateX: 55, rotateZ: -28, y: 80 }}
              animate={{ opacity: 1, scale: 1, rotateX: 0, rotateZ: 0, y: 0 }}
              exit={{ opacity: 0, scale: 0.78, rotateX: 40, rotateZ: -20, y: 60 }}
              transition={{ type: "spring", stiffness: 100, damping: 20, mass: 0.9 }}
              style={{ "--card-accent": reviews[active].accent } as React.CSSProperties}
            >
              {/* Close */}
              <button
                onClick={closeCard}
                className="pop-close"
                aria-label="Close review"
              >
                <X className="h-5 w-5" />
              </button>

              {/* Accent top bar */}
              <div className="pop-accent-bar" style={{ background: `linear-gradient(90deg, ${reviews[active].accent}, ${reviews[active].accent}00)` }} />

              <div className="pop-body">
                {/* Left – avatar */}
                <div className="pop-avatar-col">
                  <div className="pop-avatar-wrap">
                    <Image
                      src={reviews[active].avatar}
                      alt={reviews[active].name}
                      fill
                      sizes="280px"
                      className="object-cover"
                      priority
                    />
                    <div className="pop-avatar-fade" />
                  </div>
                  <div className="pop-logo-badge" style={{ color: reviews[active].accent, borderColor: reviews[active].accent + "55", background: reviews[active].accent + "14" }}>
                    {reviews[active].logo}
                  </div>
                </div>

                {/* Right – content */}
                <div className="pop-content">
                  {/* Stars */}
                  <div className="pop-stars">
                    {Array.from({ length: 5 }).map((_, si) => (
                      <Star key={si} className="h-5 w-5 fill-current" style={{ color: reviews[active].accent }} />
                    ))}
                    <Quote className="ml-auto h-8 w-8 opacity-40" style={{ color: reviews[active].accent }} />
                  </div>

                  <h3 className="pop-name">{reviews[active].name}</h3>
                  <p className="pop-meta">{reviews[active].position} · {reviews[active].company}</p>

                  <blockquote className="pop-quote">
                    &ldquo;{reviews[active].quote}&rdquo;
                  </blockquote>

                  <div className="pop-footer">
                    <span className="pop-verified">✓ Verified Partner</span>
                    <button className="pop-cta" style={{ background: reviews[active].accent }}>
                      View Case Study
                      <ChevronRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
}
