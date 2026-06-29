/* ─────────────────────────────────────────────────────────────────────────
   Evoke Hub — Services Portfolio Data
   ─────────────────────────────────────────────────────────────────────────
   PLACEHOLDER CONTENT:
   • Images  → picsum.photos (deterministic seeds — always loads, looks great)
               Replace src with your actual portfolio image URLs.
   • Videos  → YouTube placeholder IDs in the YT object below.
               Replace each youtubeId with your real YouTube video IDs.
               Format: https://youtube.com/watch?v=YOUR_ID_HERE
   ───────────────────────────────────────────────────────────────────────── */

export interface PortfolioImage {
  id: string;
  src: string;
  caption: string;
  aspect: "landscape" | "portrait" | "square";
}

export interface PortfolioVideo {
  id: string;
  youtubeId: string; // ← REPLACE with your actual YouTube video ID
  title: string;
}

export interface ServicePortfolio {
  serviceId: number;
  label: string;
  description: string;
  accent: string;
  images: PortfolioImage[];
  videos: PortfolioVideo[];
}

/** Builds a picsum placeholder image URL with a deterministic seed */
const img = (
  seed: string,
  w: number,
  h: number,
  aspect: "landscape" | "portrait" | "square"
): PortfolioImage => ({
  id: seed,
  src: `https://picsum.photos/seed/${seed}/${w}/${h}`,
  caption: seed
    .split("-")
    .slice(1)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" "),
  aspect,
});

/* ── YouTube placeholder IDs ───────────────────────────────────────────────
   All five IDs below are 100% publicly embeddable on YouTube.
   REPLACE each value with a real YouTube video ID from your channel.
   ───────────────────────────────────────────────────────────────────────── */
const YT = {
  A: "dQw4w9WgXcQ", // REPLACE → your video ID
  B: "9bZkp7q19f0", // REPLACE → your video ID
  C: "kJQP7kiw5Fk", // REPLACE → your video ID
  D: "JGwWNGJdvx8", // REPLACE → your video ID
  E: "uelHwf8o7_U", // REPLACE → your video ID
};

/* ── Portfolio data for all 15 services ─────────────────────────────────── */
export const SERVICE_PORTFOLIO: ServicePortfolio[] = [
  /* ─── 1. Social Media ─────────────────────────────────────────────────── */
  {
    serviceId: 1,
    label: "Social Media",
    description:
      "Content creation, management & growth strategies for Instagram, TikTok, Facebook & more.",
    accent: "#E1306C",
    images: [
      img("sm-campaign", 900, 600, "landscape"),
      img("sm-story", 600, 900, "portrait"),
      img("sm-reel", 800, 800, "square"),
      img("sm-feed", 900, 580, "landscape"),
      img("sm-tiktok", 600, 900, "portrait"),
      img("sm-analytics", 900, 600, "landscape"),
    ],
    videos: [
      { id: "sm-v1", youtubeId: YT.A, title: "Social Media Campaign Reel" },
      { id: "sm-v2", youtubeId: YT.B, title: "Instagram Growth Strategy" },
    ],
  },

  /* ─── 2. E-Commerce ───────────────────────────────────────────────────── */
  {
    serviceId: 2,
    label: "E-Commerce",
    description:
      "Full-service Amazon & marketplace optimisation — listings, EBC, A+ content & storefront design.",
    accent: "#FF9900",
    images: [
      img("ec-listing", 900, 600, "landscape"),
      img("ec-packaging", 600, 900, "portrait"),
      img("ec-aplus", 900, 560, "landscape"),
      img("ec-storefront", 800, 800, "square"),
      img("ec-gallery", 900, 600, "landscape"),
      img("ec-ebc", 600, 900, "portrait"),
    ],
    videos: [
      { id: "ec-v1", youtubeId: YT.C, title: "Amazon Product Showcase" },
      { id: "ec-v2", youtubeId: YT.D, title: "E-Commerce Brand Story" },
    ],
  },

  /* ─── 3. Google Ads ───────────────────────────────────────────────────── */
  {
    serviceId: 3,
    label: "Google Ads",
    description:
      "Performance-driven PPC campaigns — Search, Display, Shopping & YouTube Ads.",
    accent: "#4285F4",
    images: [
      img("ga-dashboard", 900, 600, "landscape"),
      img("ga-display", 900, 580, "landscape"),
      img("ga-search", 600, 800, "portrait"),
      img("ga-shopping", 900, 560, "landscape"),
      img("ga-analytics", 800, 800, "square"),
    ],
    videos: [
      { id: "ga-v1", youtubeId: YT.E, title: "Google Ads Performance Report" },
      { id: "ga-v2", youtubeId: YT.A, title: "Display Campaign Showcase" },
    ],
  },

  /* ─── 4. Branding ─────────────────────────────────────────────────────── */
  {
    serviceId: 4,
    label: "Branding",
    description:
      "Identity systems, logo design, brand guidelines & visual language that tell your story.",
    accent: "#8B5CF6",
    images: [
      img("br-identity", 900, 600, "landscape"),
      img("br-logo", 600, 900, "portrait"),
      img("br-stationery", 900, 600, "landscape"),
      img("br-styleguide", 800, 800, "square"),
      img("br-packaging", 900, 560, "landscape"),
      img("br-mockup", 600, 800, "portrait"),
    ],
    videos: [
      { id: "br-v1", youtubeId: YT.B, title: "Brand Identity Reveal" },
      { id: "br-v2", youtubeId: YT.C, title: "Logo Animation Reel" },
      { id: "br-v3", youtubeId: YT.D, title: "Brand Guidelines Walkthrough" },
    ],
  },

  /* ─── 5. SEO & SMM ────────────────────────────────────────────────────── */
  {
    serviceId: 5,
    label: "SEO & SMM",
    description:
      "Organic growth through search optimisation and social media marketing strategies.",
    accent: "#06B6D4",
    images: [
      img("seo-dashboard", 900, 600, "landscape"),
      img("seo-keywords", 900, 580, "landscape"),
      img("seo-calendar", 600, 800, "portrait"),
      img("seo-report", 800, 800, "square"),
      img("seo-serp", 900, 560, "landscape"),
    ],
    videos: [
      { id: "seo-v1", youtubeId: YT.E, title: "SEO Strategy Overview" },
      { id: "seo-v2", youtubeId: YT.A, title: "Social Growth Campaign" },
    ],
  },

  /* ─── 6. Marketing ────────────────────────────────────────────────────── */
  {
    serviceId: 6,
    label: "Marketing",
    description:
      "End-to-end marketing campaigns — strategy, creative, execution & measurement.",
    accent: "#F59E0B",
    images: [
      img("mkt-strategy", 900, 600, "landscape"),
      img("mkt-creative", 900, 580, "landscape"),
      img("mkt-results", 600, 900, "portrait"),
      img("mkt-brand", 800, 800, "square"),
      img("mkt-influencer", 900, 560, "landscape"),
    ],
    videos: [
      { id: "mkt-v1", youtubeId: YT.B, title: "Marketing Campaign Reel" },
      { id: "mkt-v2", youtubeId: YT.C, title: "Brand Awareness Launch" },
    ],
  },

  /* ─── 7. Web Design ───────────────────────────────────────────────────── */
  {
    serviceId: 7,
    label: "Web Design",
    description:
      "Conversion-focused websites, landing pages & e-commerce builds that look stunning on every device.",
    accent: "#3B82F6",
    images: [
      img("wd-landing", 900, 580, "landscape"),
      img("wd-ecommerce", 900, 600, "landscape"),
      img("wd-mobile", 600, 900, "portrait"),
      img("wd-components", 800, 800, "square"),
      img("wd-dashboard", 900, 580, "landscape"),
      img("wd-appui", 600, 800, "portrait"),
    ],
    videos: [
      { id: "wd-v1", youtubeId: YT.D, title: "Website Design Walkthrough" },
      { id: "wd-v2", youtubeId: YT.E, title: "UI Component Showcase" },
    ],
  },

  /* ─── 8. Photography ──────────────────────────────────────────────────── */
  {
    serviceId: 8,
    label: "Photography",
    description:
      "Studio & lifestyle product photography — Amazon images, EBC shoots & lifestyle campaigns.",
    accent: "#EC4899",
    images: [
      img("ph-product", 900, 600, "landscape"),
      img("ph-lifestyle", 600, 900, "portrait"),
      img("ph-studio", 900, 600, "landscape"),
      img("ph-gallery", 800, 800, "square"),
      img("ph-model", 600, 900, "portrait"),
      img("ph-packshot", 900, 580, "landscape"),
    ],
    videos: [
      { id: "ph-v1", youtubeId: YT.A, title: "Behind the Shoot" },
      { id: "ph-v2", youtubeId: YT.B, title: "Studio Photography Reel" },
      { id: "ph-v3", youtubeId: YT.C, title: "Lifestyle Campaign BTS" },
    ],
  },

  /* ─── 9. Videography ──────────────────────────────────────────────────── */
  {
    serviceId: 9,
    label: "Videography",
    description:
      "Cinematic product videos, reels, TikTok content & brand films that stop the scroll.",
    accent: "#EF4444",
    images: [
      img("vg-production", 900, 560, "landscape"),
      img("vg-lighting", 900, 600, "landscape"),
      img("vg-reel", 600, 900, "portrait"),
      img("vg-colorgrade", 800, 800, "square"),
      img("vg-motion", 900, 600, "landscape"),
      img("vg-bts", 600, 800, "portrait"),
    ],
    videos: [
      { id: "vg-v1", youtubeId: YT.D, title: "Cinematic Brand Film" },
      { id: "vg-v2", youtubeId: YT.E, title: "Product Video Reel" },
      { id: "vg-v3", youtubeId: YT.A, title: "TikTok Content Pack" },
    ],
  },

  /* ─── 10. Sound Effects ───────────────────────────────────────────────── */
  {
    serviceId: 10,
    label: "Sound Effects",
    description:
      "Custom audio branding, SFX design, music scoring & podcast production.",
    accent: "#A855F7",
    images: [
      img("sfx-studio", 900, 600, "landscape"),
      img("sfx-mixing", 900, 580, "landscape"),
      img("sfx-podcast", 600, 800, "portrait"),
      img("sfx-design", 800, 800, "square"),
      img("sfx-recording", 900, 600, "landscape"),
    ],
    videos: [
      { id: "sfx-v1", youtubeId: YT.B, title: "Sound Design Reel" },
      { id: "sfx-v2", youtubeId: YT.C, title: "Audio Branding Showcase" },
    ],
  },

  /* ─── 11. Graphic Design ──────────────────────────────────────────────── */
  {
    serviceId: 11,
    label: "Graphic Design",
    description:
      "Print & digital design — posters, banners, packaging, social assets & illustration.",
    accent: "#F97316",
    images: [
      img("gd-poster", 900, 600, "landscape"),
      img("gd-packaging", 600, 900, "portrait"),
      img("gd-banners", 900, 580, "landscape"),
      img("gd-social", 800, 800, "square"),
      img("gd-illustration", 900, 600, "landscape"),
      img("gd-print", 600, 800, "portrait"),
    ],
    videos: [
      { id: "gd-v1", youtubeId: YT.D, title: "Design Process Timelapse" },
      { id: "gd-v2", youtubeId: YT.E, title: "Graphic Design Portfolio" },
    ],
  },

  /* ─── 12. Mobile App ──────────────────────────────────────────────────── */
  {
    serviceId: 12,
    label: "Mobile App",
    description:
      "iOS & Android app design — wireframes, prototypes, UI systems & developer handoff.",
    accent: "#10B981",
    images: [
      img("ma-ui", 900, 600, "landscape"),
      img("ma-onboarding", 600, 900, "portrait"),
      img("ma-components", 800, 800, "square"),
      img("ma-prototype", 900, 580, "landscape"),
      img("ma-darkmode", 600, 900, "portrait"),
      img("ma-screens", 900, 600, "landscape"),
    ],
    videos: [
      { id: "ma-v1", youtubeId: YT.A, title: "App UI Walkthrough" },
      { id: "ma-v2", youtubeId: YT.B, title: "Prototype Demo" },
    ],
  },

  /* ─── 13. Entertainment ───────────────────────────────────────────────── */
  {
    serviceId: 13,
    label: "Entertainment",
    description:
      "Event coverage, live streaming, concerts, stage shows & entertainment brand content.",
    accent: "#FBBF24",
    images: [
      img("ent-event", 900, 600, "landscape"),
      img("ent-stage", 900, 580, "landscape"),
      img("ent-live", 600, 900, "portrait"),
      img("ent-highlights", 800, 800, "square"),
      img("ent-brand", 900, 560, "landscape"),
    ],
    videos: [
      { id: "ent-v1", youtubeId: YT.C, title: "Event Highlight Reel" },
      { id: "ent-v2", youtubeId: YT.D, title: "Live Show Coverage" },
      { id: "ent-v3", youtubeId: YT.E, title: "Entertainment Brand Film" },
    ],
  },

  /* ─── 14. UI / UX Design ─────────────────────────────────────────────── */
  {
    serviceId: 14,
    label: "UI / UX Design",
    description:
      "User research, wireframing, prototyping & pixel-perfect UI for web & mobile products.",
    accent: "#6366F1",
    images: [
      img("ux-wireframes", 900, 600, "landscape"),
      img("ux-userflow", 900, 580, "landscape"),
      img("ux-designsystem", 600, 800, "portrait"),
      img("ux-prototype", 800, 800, "square"),
      img("ux-testing", 900, 600, "landscape"),
      img("ux-handoff", 600, 900, "portrait"),
    ],
    videos: [
      { id: "ux-v1", youtubeId: YT.A, title: "UX Research Process" },
      { id: "ux-v2", youtubeId: YT.B, title: "UI Design Walkthrough" },
    ],
  },

  /* ─── 15. Art & Taste ────────────────────────────────────────────────── */
  {
    serviceId: 15,
    label: "Art & Taste",
    description:
      "Fine art direction, food photography, creative campaigns & editorial visual storytelling.",
    accent: "#14B8A6",
    images: [
      img("at-food", 900, 600, "landscape"),
      img("at-artdirection", 600, 900, "portrait"),
      img("at-editorial", 800, 800, "square"),
      img("at-finedining", 900, 580, "landscape"),
      img("at-stilllife", 600, 900, "portrait"),
      img("at-restaurant", 900, 560, "landscape"),
    ],
    videos: [
      { id: "at-v1", youtubeId: YT.C, title: "Food Photography Reel" },
      { id: "at-v2", youtubeId: YT.D, title: "Art Direction Showcase" },
    ],
  },
];
