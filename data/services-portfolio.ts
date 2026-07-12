/* ═══════════════════════════════════════════════════════════════════════════
   Evoke Hub — Services Portfolio Data
   ═══════════════════════════════════════════════════════════════════════════

   HOW TO ADD YOUR REAL CONTENT
   ──────────────────────────────────────────────────────────────────────────
   IMAGES
     Each image line has a  src  field. Replace the picsum.photos URL with
     any publicly accessible image URL, for example:
       • A Google Drive / Dropbox share link (set to "Anyone with link")
       • An image on your own website / CDN
       • A direct image URL from Unsplash, Pexels, or Imgur
       • A file you drop in /public, e.g. "/portfolio/photo1.jpg"

   VIDEOS
     Each video line has a  youtubeId  field. To find your YouTube video ID:
       1. Open your video on youtube.com
       2. Copy the part AFTER "?v=" in the URL
          e.g. youtube.com/watch?v=dQw4w9WgXcQ  →  ID is  dQw4w9WgXcQ
       3. Paste it in place of "PASTE_YOUTUBE_ID_HERE"

   CAPTIONS / TITLES
     Update  caption  (shown on image hover) and  title  (shown on the video
     thumbnail) to describe your actual work.

   ═══════════════════════════════════════════════════════════════════════════ */

export interface PortfolioImage {
  id: string;
  src: string;
  caption: string;
  aspect: "landscape" | "portrait" | "square";
}

export interface PortfolioVideo {
  id: string;
  youtubeId: string;
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

/* ═══════════════════════════════════════════════════════════════════════════
   SERVICE PORTFOLIO — all 15 tabs
   ═══════════════════════════════════════════════════════════════════════════ */
export const SERVICE_PORTFOLIO: ServicePortfolio[] = [

  /* ───────────────────────────────────────────────────────────────────────
     1.  SOCIAL MEDIA
     ─────────────────────────────────────────────────────────────────────── */
  {
    serviceId: 1,
    label: "Social Media",
    description: "Content creation, management & growth strategies for Instagram, TikTok, Facebook & more.",
    accent: "#E1306C",
    images: [
      // 📸 PHOTO 1 — replace src with your Social Media portfolio image URL
      { id: "sm-1", src: "https://picsum.photos/seed/sm-campaign/900/600",  caption: "Instagram Campaign",  aspect: "landscape" },
      // 📸 PHOTO 2 — replace src with your Social Media portfolio image URL
      { id: "sm-2", src: "https://picsum.photos/seed/sm-story/600/900",     caption: "Story Design",        aspect: "portrait"  },
      // 📸 PHOTO 3 — replace src with your Social Media portfolio image URL
      { id: "sm-3", src: "https://picsum.photos/seed/sm-reel/800/800",      caption: "Reel Thumbnail",      aspect: "square"    },
      // 📸 PHOTO 4 — replace src with your Social Media portfolio image URL
      { id: "sm-4", src: "https://picsum.photos/seed/sm-feed/900/580",      caption: "Feed Grid Layout",    aspect: "landscape" },
      // 📸 PHOTO 5 — replace src with your Social Media portfolio image URL
      { id: "sm-5", src: "https://picsum.photos/seed/sm-tiktok/600/900",    caption: "TikTok Content",      aspect: "portrait"  },
      // 📸 PHOTO 6 — replace src with your Social Media portfolio image URL
      { id: "sm-6", src: "https://picsum.photos/seed/sm-analytics/900/600", caption: "Analytics Dashboard", aspect: "landscape" },
    ],
    videos: [
      // 🎬 VIDEO 1 — replace youtubeId with your YouTube video ID for Social Media
      { id: "sm-v1", youtubeId: "PASTE_YOUTUBE_ID_HERE", title: "Social Media Campaign Reel" },
      // 🎬 VIDEO 2 — replace youtubeId with your YouTube video ID for Social Media
      { id: "sm-v2", youtubeId: "PASTE_YOUTUBE_ID_HERE", title: "Instagram Growth Strategy"  },
    ],
  },

  /* ───────────────────────────────────────────────────────────────────────
     2.  E-COMMERCE
     ─────────────────────────────────────────────────────────────────────── */
  {
    serviceId: 2,
    label: "E-Commerce",
    description: "Full-service Amazon & marketplace optimisation — listings, EBC, A+ content & storefront design.",
    accent: "#FF9900",
    images: [
      // 📸 PHOTO 1 — replace src with your E-Commerce portfolio image URL
      { id: "ec-1", src: "https://picsum.photos/seed/ec-listing/900/600",    caption: "Amazon Listing Design", aspect: "landscape" },
      // 📸 PHOTO 2 — replace src with your E-Commerce portfolio image URL
      { id: "ec-2", src: "https://picsum.photos/seed/ec-packaging/600/900",  caption: "Product Packaging",     aspect: "portrait"  },
      // 📸 PHOTO 3 — replace src with your E-Commerce portfolio image URL
      { id: "ec-3", src: "https://picsum.photos/seed/ec-aplus/900/560",      caption: "A+ Content Module",     aspect: "landscape" },
      // 📸 PHOTO 4 — replace src with your E-Commerce portfolio image URL
      { id: "ec-4", src: "https://picsum.photos/seed/ec-storefront/800/800", caption: "Brand Storefront",      aspect: "square"    },
      // 📸 PHOTO 5 — replace src with your E-Commerce portfolio image URL
      { id: "ec-5", src: "https://picsum.photos/seed/ec-gallery/900/600",    caption: "Gallery Images",        aspect: "landscape" },
      // 📸 PHOTO 6 — replace src with your E-Commerce portfolio image URL
      { id: "ec-6", src: "https://picsum.photos/seed/ec-ebc/600/900",        caption: "EBC Design",            aspect: "portrait"  },
    ],
    videos: [
      // 🎬 VIDEO 1 — replace youtubeId with your YouTube video ID for E-Commerce
      { id: "ec-v1", youtubeId: "PASTE_YOUTUBE_ID_HERE", title: "Amazon Product Showcase" },
      // 🎬 VIDEO 2 — replace youtubeId with your YouTube video ID for E-Commerce
      { id: "ec-v2", youtubeId: "PASTE_YOUTUBE_ID_HERE", title: "E-Commerce Brand Story"  },
    ],
  },

  /* ───────────────────────────────────────────────────────────────────────
     3.  GOOGLE ADS
     ─────────────────────────────────────────────────────────────────────── */
  {
    serviceId: 3,
    label: "Google Ads",
    description: "Performance-driven PPC campaigns — Search, Display, Shopping & YouTube Ads.",
    accent: "#4285F4",
    images: [
      // 📸 PHOTO 1 — replace src with your Google Ads portfolio image URL
      { id: "ga-1", src: "https://picsum.photos/seed/ga-dashboard/900/600", caption: "Campaign Dashboard", aspect: "landscape" },
      // 📸 PHOTO 2 — replace src with your Google Ads portfolio image URL
      { id: "ga-2", src: "https://picsum.photos/seed/ga-display/900/580",   caption: "Display Ad Design",  aspect: "landscape" },
      // 📸 PHOTO 3 — replace src with your Google Ads portfolio image URL
      { id: "ga-3", src: "https://picsum.photos/seed/ga-search/600/800",    caption: "Search Ad Copy",     aspect: "portrait"  },
      // 📸 PHOTO 4 — replace src with your Google Ads portfolio image URL
      { id: "ga-4", src: "https://picsum.photos/seed/ga-shopping/900/560",  caption: "Shopping Campaign",  aspect: "landscape" },
      // 📸 PHOTO 5 — replace src with your Google Ads portfolio image URL
      { id: "ga-5", src: "https://picsum.photos/seed/ga-analytics/800/800", caption: "Analytics Report",   aspect: "square"    },
    ],
    videos: [
      // 🎬 VIDEO 1 — replace youtubeId with your YouTube video ID for Google Ads
      { id: "ga-v1", youtubeId: "PASTE_YOUTUBE_ID_HERE", title: "Google Ads Performance Report" },
      // 🎬 VIDEO 2 — replace youtubeId with your YouTube video ID for Google Ads
      { id: "ga-v2", youtubeId: "PASTE_YOUTUBE_ID_HERE", title: "Display Campaign Showcase"    },
    ],
  },

  /* ───────────────────────────────────────────────────────────────────────
     4.  BRANDING
     ─────────────────────────────────────────────────────────────────────── */
  {
    serviceId: 4,
    label: "Branding",
    description: "Identity systems, logo design, brand guidelines & visual language that tell your story.",
    accent: "#8B5CF6",
    images: [
      // 📸 PHOTO 1 — replace src with your Branding portfolio image URL
      { id: "br-1", src: "https://picsum.photos/seed/br-identity/900/600",   caption: "Brand Identity Board", aspect: "landscape" },
      // 📸 PHOTO 2 — replace src with your Branding portfolio image URL
      { id: "br-2", src: "https://picsum.photos/seed/br-logo/600/900",       caption: "Logo Design",          aspect: "portrait"  },
      // 📸 PHOTO 3 — replace src with your Branding portfolio image URL
      { id: "br-3", src: "https://picsum.photos/seed/br-stationery/900/600", caption: "Brand Stationery",     aspect: "landscape" },
      // 📸 PHOTO 4 — replace src with your Branding portfolio image URL
      { id: "br-4", src: "https://picsum.photos/seed/br-styleguide/800/800", caption: "Style Guide",          aspect: "square"    },
      // 📸 PHOTO 5 — replace src with your Branding portfolio image URL
      { id: "br-5", src: "https://picsum.photos/seed/br-packaging/900/560",  caption: "Packaging Design",     aspect: "landscape" },
      // 📸 PHOTO 6 — replace src with your Branding portfolio image URL
      { id: "br-6", src: "https://picsum.photos/seed/br-mockup/600/800",     caption: "Brand Mockup",         aspect: "portrait"  },
    ],
    videos: [
      // 🎬 VIDEO 1 — replace youtubeId with your YouTube video ID for Branding
      { id: "br-v1", youtubeId: "PASTE_YOUTUBE_ID_HERE", title: "Brand Identity Reveal"        },
      // 🎬 VIDEO 2 — replace youtubeId with your YouTube video ID for Branding
      { id: "br-v2", youtubeId: "PASTE_YOUTUBE_ID_HERE", title: "Logo Animation Reel"          },
      // 🎬 VIDEO 3 — replace youtubeId with your YouTube video ID for Branding
      { id: "br-v3", youtubeId: "PASTE_YOUTUBE_ID_HERE", title: "Brand Guidelines Walkthrough" },
    ],
  },

  /* ───────────────────────────────────────────────────────────────────────
     5.  SEO & SMM
     ─────────────────────────────────────────────────────────────────────── */
  {
    serviceId: 5,
    label: "SEO & SMM",
    description: "Organic growth through search optimisation and social media marketing strategies.",
    accent: "#06B6D4",
    images: [
      // 📸 PHOTO 1 — replace src with your SEO & SMM portfolio image URL
      { id: "seo-1", src: "https://picsum.photos/seed/seo-dashboard/900/600", caption: "SEO Dashboard",    aspect: "landscape" },
      // 📸 PHOTO 2 — replace src with your SEO & SMM portfolio image URL
      { id: "seo-2", src: "https://picsum.photos/seed/seo-keywords/900/580",  caption: "Keyword Strategy", aspect: "landscape" },
      // 📸 PHOTO 3 — replace src with your SEO & SMM portfolio image URL
      { id: "seo-3", src: "https://picsum.photos/seed/seo-calendar/600/800",  caption: "Social Calendar",  aspect: "portrait"  },
      // 📸 PHOTO 4 — replace src with your SEO & SMM portfolio image URL
      { id: "seo-4", src: "https://picsum.photos/seed/seo-report/800/800",    caption: "Analytics Report", aspect: "square"    },
      // 📸 PHOTO 5 — replace src with your SEO & SMM portfolio image URL
      { id: "seo-5", src: "https://picsum.photos/seed/seo-serp/900/560",      caption: "SERP Results",     aspect: "landscape" },
    ],
    videos: [
      // 🎬 VIDEO 1 — replace youtubeId with your YouTube video ID for SEO & SMM
      { id: "seo-v1", youtubeId: "PASTE_YOUTUBE_ID_HERE", title: "SEO Strategy Overview"  },
      // 🎬 VIDEO 2 — replace youtubeId with your YouTube video ID for SEO & SMM
      { id: "seo-v2", youtubeId: "PASTE_YOUTUBE_ID_HERE", title: "Social Growth Campaign" },
    ],
  },

  /* ───────────────────────────────────────────────────────────────────────
     6.  MARKETING
     ─────────────────────────────────────────────────────────────────────── */
  {
    serviceId: 6,
    label: "Marketing",
    description: "End-to-end marketing campaigns — strategy, creative, execution & measurement.",
    accent: "#F59E0B",
    images: [
      // 📸 PHOTO 1 — replace src with your Marketing portfolio image URL
      { id: "mkt-1", src: "https://picsum.photos/seed/mkt-strategy/900/600",   caption: "Campaign Strategy", aspect: "landscape" },
      // 📸 PHOTO 2 — replace src with your Marketing portfolio image URL
      { id: "mkt-2", src: "https://picsum.photos/seed/mkt-creative/900/580",   caption: "Ad Creative",       aspect: "landscape" },
      // 📸 PHOTO 3 — replace src with your Marketing portfolio image URL
      { id: "mkt-3", src: "https://picsum.photos/seed/mkt-results/600/900",    caption: "Campaign Results",  aspect: "portrait"  },
      // 📸 PHOTO 4 — replace src with your Marketing portfolio image URL
      { id: "mkt-4", src: "https://picsum.photos/seed/mkt-brand/800/800",      caption: "Brand Campaign",    aspect: "square"    },
      // 📸 PHOTO 5 — replace src with your Marketing portfolio image URL
      { id: "mkt-5", src: "https://picsum.photos/seed/mkt-influencer/900/560", caption: "Influencer Brief",  aspect: "landscape" },
    ],
    videos: [
      // 🎬 VIDEO 1 — replace youtubeId with your YouTube video ID for Marketing
      { id: "mkt-v1", youtubeId: "PASTE_YOUTUBE_ID_HERE", title: "Marketing Campaign Reel" },
      // 🎬 VIDEO 2 — replace youtubeId with your YouTube video ID for Marketing
      { id: "mkt-v2", youtubeId: "PASTE_YOUTUBE_ID_HERE", title: "Brand Awareness Launch"  },
    ],
  },

  /* ───────────────────────────────────────────────────────────────────────
     7.  WEB DESIGN
     ─────────────────────────────────────────────────────────────────────── */
  {
    serviceId: 7,
    label: "Web Design",
    description: "Conversion-focused websites, landing pages & e-commerce builds that look stunning on every device.",
    accent: "#3B82F6",
    images: [
      // 📸 PHOTO 1 — replace src with your Web Design portfolio image URL
      { id: "wd-1", src: "https://picsum.photos/seed/wd-landing/900/580",    caption: "Landing Page Design", aspect: "landscape" },
      // 📸 PHOTO 2 — replace src with your Web Design portfolio image URL
      { id: "wd-2", src: "https://picsum.photos/seed/wd-ecommerce/900/600",  caption: "E-Commerce Website",  aspect: "landscape" },
      // 📸 PHOTO 3 — replace src with your Web Design portfolio image URL
      { id: "wd-3", src: "https://picsum.photos/seed/wd-mobile/600/900",     caption: "Mobile Responsive",   aspect: "portrait"  },
      // 📸 PHOTO 4 — replace src with your Web Design portfolio image URL
      { id: "wd-4", src: "https://picsum.photos/seed/wd-components/800/800", caption: "Component Library",   aspect: "square"    },
      // 📸 PHOTO 5 — replace src with your Web Design portfolio image URL
      { id: "wd-5", src: "https://picsum.photos/seed/wd-dashboard/900/580",  caption: "Dashboard UI",        aspect: "landscape" },
      // 📸 PHOTO 6 — replace src with your Web Design portfolio image URL
      { id: "wd-6", src: "https://picsum.photos/seed/wd-appui/600/800",      caption: "App UI Design",       aspect: "portrait"  },
    ],
    videos: [
      // 🎬 VIDEO 1 — replace youtubeId with your YouTube video ID for Web Design
      { id: "wd-v1", youtubeId: "PASTE_YOUTUBE_ID_HERE", title: "Website Design Walkthrough" },
      // 🎬 VIDEO 2 — replace youtubeId with your YouTube video ID for Web Design
      { id: "wd-v2", youtubeId: "PASTE_YOUTUBE_ID_HERE", title: "UI Component Showcase"      },
    ],
  },

  /* ───────────────────────────────────────────────────────────────────────
     8.  PHOTOGRAPHY
     ─────────────────────────────────────────────────────────────────────── */
  {
    serviceId: 8,
    label: "Photography",
    description: "Studio & lifestyle product photography — Amazon images, EBC shoots & lifestyle campaigns.",
    accent: "#EC4899",
    images: [
      // 📸 PHOTO 1 — replace src with your Photography portfolio image URL
      { id: "ph-1", src: "https://picsum.photos/seed/ph-product/900/600",   caption: "Product Shoot",   aspect: "landscape" },
      // 📸 PHOTO 2 — replace src with your Photography portfolio image URL
      { id: "ph-2", src: "https://picsum.photos/seed/ph-lifestyle/600/900", caption: "Lifestyle Photo", aspect: "portrait"  },
      // 📸 PHOTO 3 — replace src with your Photography portfolio image URL
      { id: "ph-3", src: "https://picsum.photos/seed/ph-studio/900/600",    caption: "Studio Setup",    aspect: "landscape" },
      // 📸 PHOTO 4 — replace src with your Photography portfolio image URL
      { id: "ph-4", src: "https://picsum.photos/seed/ph-gallery/800/800",   caption: "Amazon Gallery",  aspect: "square"    },
      // 📸 PHOTO 5 — replace src with your Photography portfolio image URL
      { id: "ph-5", src: "https://picsum.photos/seed/ph-model/600/900",     caption: "Model Shoot",     aspect: "portrait"  },
      // 📸 PHOTO 6 — replace src with your Photography portfolio image URL
      { id: "ph-6", src: "https://picsum.photos/seed/ph-packshot/900/580",  caption: "Packshot",        aspect: "landscape" },
    ],
    videos: [
      // 🎬 VIDEO 1 — replace youtubeId with your YouTube video ID for Photography
      { id: "ph-v1", youtubeId: "PASTE_YOUTUBE_ID_HERE", title: "Behind the Shoot"        },
      // 🎬 VIDEO 2 — replace youtubeId with your YouTube video ID for Photography
      { id: "ph-v2", youtubeId: "PASTE_YOUTUBE_ID_HERE", title: "Studio Photography Reel" },
      // 🎬 VIDEO 3 — replace youtubeId with your YouTube video ID for Photography
      { id: "ph-v3", youtubeId: "PASTE_YOUTUBE_ID_HERE", title: "Lifestyle Campaign BTS"  },
    ],
  },

  /* ───────────────────────────────────────────────────────────────────────
     9.  VIDEOGRAPHY
     ─────────────────────────────────────────────────────────────────────── */
  {
    serviceId: 9,
    label: "Videography",
    description: "Cinematic product videos, reels, TikTok content & brand films that stop the scroll.",
    accent: "#EF4444",
    images: [
      // 📸 PHOTO 1 — replace src with your Videography portfolio image URL
      { id: "vg-1", src: "https://picsum.photos/seed/vg-production/900/560", caption: "Video Production", aspect: "landscape" },
      // 📸 PHOTO 2 — replace src with your Videography portfolio image URL
      { id: "vg-2", src: "https://picsum.photos/seed/vg-lighting/900/600",   caption: "On-Set Lighting",  aspect: "landscape" },
      // 📸 PHOTO 3 — replace src with your Videography portfolio image URL
      { id: "vg-3", src: "https://picsum.photos/seed/vg-reel/600/900",       caption: "Reel Frame",       aspect: "portrait"  },
      // 📸 PHOTO 4 — replace src with your Videography portfolio image URL
      { id: "vg-4", src: "https://picsum.photos/seed/vg-colorgrade/800/800", caption: "Colour Grade",     aspect: "square"    },
      // 📸 PHOTO 5 — replace src with your Videography portfolio image URL
      { id: "vg-5", src: "https://picsum.photos/seed/vg-motion/900/600",     caption: "Motion Graphics",  aspect: "landscape" },
      // 📸 PHOTO 6 — replace src with your Videography portfolio image URL
      { id: "vg-6", src: "https://picsum.photos/seed/vg-bts/600/800",        caption: "BTS Shot",         aspect: "portrait"  },
    ],
    videos: [
      // 🎬 VIDEO 1 — replace youtubeId with your YouTube video ID for Videography
      { id: "vg-v1", youtubeId: "PASTE_YOUTUBE_ID_HERE", title: "Cinematic Brand Film" },
      // 🎬 VIDEO 2 — replace youtubeId with your YouTube video ID for Videography
      { id: "vg-v2", youtubeId: "PASTE_YOUTUBE_ID_HERE", title: "Product Video Reel"   },
      // 🎬 VIDEO 3 — replace youtubeId with your YouTube video ID for Videography
      { id: "vg-v3", youtubeId: "PASTE_YOUTUBE_ID_HERE", title: "TikTok Content Pack"  },
    ],
  },

  /* ───────────────────────────────────────────────────────────────────────
     10.  SOUND EFFECTS
     ─────────────────────────────────────────────────────────────────────── */
  {
    serviceId: 10,
    label: "Sound Effects",
    description: "Custom audio branding, SFX design, music scoring & podcast production.",
    accent: "#A855F7",
    images: [
      // 📸 PHOTO 1 — replace src with your Sound Effects portfolio image URL
      { id: "sfx-1", src: "https://picsum.photos/seed/sfx-studio/900/600",    caption: "Recording Studio", aspect: "landscape" },
      // 📸 PHOTO 2 — replace src with your Sound Effects portfolio image URL
      { id: "sfx-2", src: "https://picsum.photos/seed/sfx-mixing/900/580",    caption: "Audio Mixing",     aspect: "landscape" },
      // 📸 PHOTO 3 — replace src with your Sound Effects portfolio image URL
      { id: "sfx-3", src: "https://picsum.photos/seed/sfx-podcast/600/800",   caption: "Podcast Setup",    aspect: "portrait"  },
      // 📸 PHOTO 4 — replace src with your Sound Effects portfolio image URL
      { id: "sfx-4", src: "https://picsum.photos/seed/sfx-design/800/800",    caption: "Sound Design",     aspect: "square"    },
      // 📸 PHOTO 5 — replace src with your Sound Effects portfolio image URL
      { id: "sfx-5", src: "https://picsum.photos/seed/sfx-recording/900/600", caption: "Live Recording",   aspect: "landscape" },
    ],
    videos: [
      // 🎬 VIDEO 1 — replace youtubeId with your YouTube video ID for Sound Effects
      { id: "sfx-v1", youtubeId: "PASTE_YOUTUBE_ID_HERE", title: "Sound Design Reel"       },
      // 🎬 VIDEO 2 — replace youtubeId with your YouTube video ID for Sound Effects
      { id: "sfx-v2", youtubeId: "PASTE_YOUTUBE_ID_HERE", title: "Audio Branding Showcase" },
    ],
  },

  /* ───────────────────────────────────────────────────────────────────────
     11.  GRAPHIC DESIGN
     ─────────────────────────────────────────────────────────────────────── */
  {
    serviceId: 11,
    label: "Graphic Design",
    description: "Print & digital design — posters, banners, packaging, social assets & illustration.",
    accent: "#F97316",
    images: [
      // 📸 PHOTO 1 — replace src with your Graphic Design portfolio image URL
      { id: "gd-1", src: "https://picsum.photos/seed/gd-poster/900/600",       caption: "Poster Design",    aspect: "landscape" },
      // 📸 PHOTO 2 — replace src with your Graphic Design portfolio image URL
      { id: "gd-2", src: "https://picsum.photos/seed/gd-packaging/600/900",    caption: "Packaging Design", aspect: "portrait"  },
      // 📸 PHOTO 3 — replace src with your Graphic Design portfolio image URL
      { id: "gd-3", src: "https://picsum.photos/seed/gd-banners/900/580",      caption: "Banner Ads",       aspect: "landscape" },
      // 📸 PHOTO 4 — replace src with your Graphic Design portfolio image URL
      { id: "gd-4", src: "https://picsum.photos/seed/gd-social/800/800",       caption: "Social Assets",    aspect: "square"    },
      // 📸 PHOTO 5 — replace src with your Graphic Design portfolio image URL
      { id: "gd-5", src: "https://picsum.photos/seed/gd-illustration/900/600", caption: "Illustration",     aspect: "landscape" },
      // 📸 PHOTO 6 — replace src with your Graphic Design portfolio image URL
      { id: "gd-6", src: "https://picsum.photos/seed/gd-print/600/800",        caption: "Print Design",     aspect: "portrait"  },
    ],
    videos: [
      // 🎬 VIDEO 1 — replace youtubeId with your YouTube video ID for Graphic Design
      { id: "gd-v1", youtubeId: "PASTE_YOUTUBE_ID_HERE", title: "Design Process Timelapse" },
      // 🎬 VIDEO 2 — replace youtubeId with your YouTube video ID for Graphic Design
      { id: "gd-v2", youtubeId: "PASTE_YOUTUBE_ID_HERE", title: "Graphic Design Portfolio" },
    ],
  },

  /* ───────────────────────────────────────────────────────────────────────
     12.  MOBILE APP
     ─────────────────────────────────────────────────────────────────────── */
  {
    serviceId: 12,
    label: "Mobile App",
    description: "iOS & Android app design — wireframes, prototypes, UI systems & developer handoff.",
    accent: "#10B981",
    images: [
      // 📸 PHOTO 1 — replace src with your Mobile App portfolio image URL
      { id: "ma-1", src: "https://picsum.photos/seed/ma-ui/900/600",          caption: "App UI Design",     aspect: "landscape" },
      // 📸 PHOTO 2 — replace src with your Mobile App portfolio image URL
      { id: "ma-2", src: "https://picsum.photos/seed/ma-onboarding/600/900",  caption: "Onboarding Flow",   aspect: "portrait"  },
      // 📸 PHOTO 3 — replace src with your Mobile App portfolio image URL
      { id: "ma-3", src: "https://picsum.photos/seed/ma-components/800/800",  caption: "Component Library", aspect: "square"    },
      // 📸 PHOTO 4 — replace src with your Mobile App portfolio image URL
      { id: "ma-4", src: "https://picsum.photos/seed/ma-prototype/900/580",   caption: "Prototype Demo",    aspect: "landscape" },
      // 📸 PHOTO 5 — replace src with your Mobile App portfolio image URL
      { id: "ma-5", src: "https://picsum.photos/seed/ma-darkmode/600/900",    caption: "Dark Mode UI",      aspect: "portrait"  },
      // 📸 PHOTO 6 — replace src with your Mobile App portfolio image URL
      { id: "ma-6", src: "https://picsum.photos/seed/ma-screens/900/600",     caption: "Screen Designs",    aspect: "landscape" },
    ],
    videos: [
      // 🎬 VIDEO 1 — replace youtubeId with your YouTube video ID for Mobile App
      { id: "ma-v1", youtubeId: "PASTE_YOUTUBE_ID_HERE", title: "App UI Walkthrough" },
      // 🎬 VIDEO 2 — replace youtubeId with your YouTube video ID for Mobile App
      { id: "ma-v2", youtubeId: "PASTE_YOUTUBE_ID_HERE", title: "Prototype Demo"     },
    ],
  },

  /* ───────────────────────────────────────────────────────────────────────
     13.  ENTERTAINMENT
     ─────────────────────────────────────────────────────────────────────── */
  {
    serviceId: 13,
    label: "Entertainment",
    description: "Event coverage, live streaming, concerts, stage shows & entertainment brand content.",
    accent: "#FBBF24",
    images: [
      // 📸 PHOTO 1 — replace src with your Entertainment portfolio image URL
      { id: "ent-1", src: "https://picsum.photos/seed/ent-event/900/600",      caption: "Event Coverage",   aspect: "landscape" },
      // 📸 PHOTO 2 — replace src with your Entertainment portfolio image URL
      { id: "ent-2", src: "https://picsum.photos/seed/ent-stage/900/580",      caption: "Stage Production", aspect: "landscape" },
      // 📸 PHOTO 3 — replace src with your Entertainment portfolio image URL
      { id: "ent-3", src: "https://picsum.photos/seed/ent-live/600/900",       caption: "Live Performance", aspect: "portrait"  },
      // 📸 PHOTO 4 — replace src with your Entertainment portfolio image URL
      { id: "ent-4", src: "https://picsum.photos/seed/ent-highlights/800/800", caption: "Event Highlights", aspect: "square"    },
      // 📸 PHOTO 5 — replace src with your Entertainment portfolio image URL
      { id: "ent-5", src: "https://picsum.photos/seed/ent-brand/900/560",      caption: "Brand Experience", aspect: "landscape" },
    ],
    videos: [
      // 🎬 VIDEO 1 — replace youtubeId with your YouTube video ID for Entertainment
      { id: "ent-v1", youtubeId: "PASTE_YOUTUBE_ID_HERE", title: "Event Highlight Reel"     },
      // 🎬 VIDEO 2 — replace youtubeId with your YouTube video ID for Entertainment
      { id: "ent-v2", youtubeId: "PASTE_YOUTUBE_ID_HERE", title: "Live Show Coverage"       },
      // 🎬 VIDEO 3 — replace youtubeId with your YouTube video ID for Entertainment
      { id: "ent-v3", youtubeId: "PASTE_YOUTUBE_ID_HERE", title: "Entertainment Brand Film" },
    ],
  },

  /* ───────────────────────────────────────────────────────────────────────
     14.  UI / UX DESIGN
     ─────────────────────────────────────────────────────────────────────── */
  {
    serviceId: 14,
    label: "UI / UX Design",
    description: "User research, wireframing, prototyping & pixel-perfect UI for web & mobile products.",
    accent: "#6366F1",
    images: [
      // 📸 PHOTO 1 — replace src with your UI/UX Design portfolio image URL
      { id: "ux-1", src: "https://picsum.photos/seed/ux-wireframes/900/600",    caption: "Wireframe Design",  aspect: "landscape" },
      // 📸 PHOTO 2 — replace src with your UI/UX Design portfolio image URL
      { id: "ux-2", src: "https://picsum.photos/seed/ux-userflow/900/580",      caption: "User Flow Map",     aspect: "landscape" },
      // 📸 PHOTO 3 — replace src with your UI/UX Design portfolio image URL
      { id: "ux-3", src: "https://picsum.photos/seed/ux-designsystem/600/800",  caption: "Design System",     aspect: "portrait"  },
      // 📸 PHOTO 4 — replace src with your UI/UX Design portfolio image URL
      { id: "ux-4", src: "https://picsum.photos/seed/ux-prototype/800/800",     caption: "Prototype",         aspect: "square"    },
      // 📸 PHOTO 5 — replace src with your UI/UX Design portfolio image URL
      { id: "ux-5", src: "https://picsum.photos/seed/ux-testing/900/600",       caption: "Usability Testing", aspect: "landscape" },
      // 📸 PHOTO 6 — replace src with your UI/UX Design portfolio image URL
      { id: "ux-6", src: "https://picsum.photos/seed/ux-handoff/600/900",       caption: "Final UI Handoff",  aspect: "portrait"  },
    ],
    videos: [
      // 🎬 VIDEO 1 — replace youtubeId with your YouTube video ID for UI/UX Design
      { id: "ux-v1", youtubeId: "PASTE_YOUTUBE_ID_HERE", title: "UX Research Process"   },
      // 🎬 VIDEO 2 — replace youtubeId with your YouTube video ID for UI/UX Design
      { id: "ux-v2", youtubeId: "PASTE_YOUTUBE_ID_HERE", title: "UI Design Walkthrough" },
    ],
  },

  /* ───────────────────────────────────────────────────────────────────────
     15.  ART & TASTE
     ─────────────────────────────────────────────────────────────────────── */
  {
    serviceId: 15,
    label: "Art & Taste",
    description: "Fine art direction, food photography, creative campaigns & editorial visual storytelling.",
    accent: "#14B8A6",
    images: [
      // 📸 PHOTO 1 — replace src with your Art & Taste portfolio image URL
      { id: "at-1", src: "https://picsum.photos/seed/at-food/900/600",         caption: "Food Photography",    aspect: "landscape" },
      // 📸 PHOTO 2 — replace src with your Art & Taste portfolio image URL
      { id: "at-2", src: "https://picsum.photos/seed/at-artdirection/600/900", caption: "Art Direction",       aspect: "portrait"  },
      // 📸 PHOTO 3 — replace src with your Art & Taste portfolio image URL
      { id: "at-3", src: "https://picsum.photos/seed/at-editorial/800/800",    caption: "Editorial Shoot",     aspect: "square"    },
      // 📸 PHOTO 4 — replace src with your Art & Taste portfolio image URL
      { id: "at-4", src: "https://picsum.photos/seed/at-finedining/900/580",   caption: "Fine Dining",         aspect: "landscape" },
      // 📸 PHOTO 5 — replace src with your Art & Taste portfolio image URL
      { id: "at-5", src: "https://picsum.photos/seed/at-stilllife/600/900",    caption: "Creative Still Life",  aspect: "portrait"  },
      // 📸 PHOTO 6 — replace src with your Art & Taste portfolio image URL
      { id: "at-6", src: "https://picsum.photos/seed/at-restaurant/900/560",   caption: "Restaurant Branding",  aspect: "landscape" },
    ],
    videos: [
      // 🎬 VIDEO 1 — replace youtubeId with your YouTube video ID for Art & Taste
      { id: "at-v1", youtubeId: "PASTE_YOUTUBE_ID_HERE", title: "Food Photography Reel"  },
      // 🎬 VIDEO 2 — replace youtubeId with your YouTube video ID for Art & Taste
      { id: "at-v2", youtubeId: "PASTE_YOUTUBE_ID_HERE", title: "Art Direction Showcase" },
    ],
  },
];
