/* ─────────────────────────────────────────────────────────
   Evoke Hub — Services Pricing Data  (from official rate card)
───────────────────────────────────────────────────────── */

export interface ServiceItem {
  id: string;
  name: string;
  price: number;          // base / starting price in USD
  priceDisplay: string;   // shown in UI  e.g. "$60" | "$50–$100"
  unit: string;           // "/image" | "/package" | "/shift" etc.
  details: string;        // what's included
  freeRevisions: string;  // "1 Revision" | "3 Revisions" etc.
  extraRevision: string;  // per-revision charge after free quota
  category: string;
}

export interface ServiceCategory {
  id: string;
  label: string;
  icon: string;
  color: string;
  services: ServiceItem[];
}

export const SERVICE_CATEGORIES: ServiceCategory[] = [
  /* ── 1. Amazon Photography ─────────────────────────── */
  {
    id: "amazon-photography",
    label: "Amazon Photography",
    icon: "📸",
    color: "#3498DB",
    services: [
      {
        id: "amz-photo",
        name: "Amazon Photography",
        price: 60, priceDisplay: "$60",
        unit: "/image",
        details: "Solid Background or Life Style shoot",
        freeRevisions: "1 Revision",
        extraRevision: "$30/revision",
        category: "Amazon Photography",
      },
      {
        id: "amz-ebc",
        name: "Amazon EBC",
        price: 75, priceDisplay: "$75",
        unit: "/package",
        details: "5-Module Enhanced Brand Content",
        freeRevisions: "3 Revisions",
        extraRevision: "$15/revision",
        category: "Amazon Photography",
      },
      {
        id: "amz-gallery",
        name: "Amazon Gallery Images",
        price: 100, priceDisplay: "$100",
        unit: "/package",
        details: "7 professional gallery images",
        freeRevisions: "3 Revisions",
        extraRevision: "$15/revision",
        category: "Amazon Photography",
      },
      {
        id: "amz-premium-5",
        name: "Amazon Premium+ (5 Module)",
        price: 110, priceDisplay: "$110",
        unit: "/package",
        details: "5 Module — Desktop & Mobile optimised",
        freeRevisions: "3 Revisions",
        extraRevision: "$20/revision",
        category: "Amazon Photography",
      },
      {
        id: "amz-premium-7",
        name: "Amazon Premium+ (7 Module)",
        price: 135, priceDisplay: "$135",
        unit: "/package",
        details: "7 Module — Desktop & Mobile optimised",
        freeRevisions: "3 Revisions",
        extraRevision: "$20/revision",
        category: "Amazon Photography",
      },
      {
        id: "amz-storefront",
        name: "Amazon Store Front",
        price: 60, priceDisplay: "$60 (Negotiable)",
        unit: "/page",
        details: "Per Page — price negotiable based on scope",
        freeRevisions: "2 Revisions",
        extraRevision: "$20/revision",
        category: "Amazon Photography",
      },
    ],
  },

  /* ── 2. Amazon Video ────────────────────────────────── */
  {
    id: "amazon-video",
    label: "Amazon Video",
    icon: "🎬",
    color: "#FF8C00",
    services: [
      {
        id: "amz-video-shoot",
        name: "Amazon Product Video Shoot",
        price: 75, priceDisplay: "$75",
        unit: "/video",
        details: "45 sec – 1:15 min product video shoot",
        freeRevisions: "1 Revision",
        extraRevision: "$45/revision",
        category: "Amazon Video",
      },
      {
        id: "amz-video-edit",
        name: "Amazon Product Video Edit",
        price: 65, priceDisplay: "$65",
        unit: "/video",
        details: "35 sec – 45 sec edited product video",
        freeRevisions: "3 Revisions",
        extraRevision: "$15/revision",
        category: "Amazon Video",
      },
      {
        id: "amz-video-ppc",
        name: "Amazon Product Video Edit PPC",
        price: 25, priceDisplay: "$25",
        unit: "/video",
        details: "12 sec – 22 sec PPC ad cut",
        freeRevisions: "3 Revisions",
        extraRevision: "$10/revision",
        category: "Amazon Video",
      },
      {
        id: "amz-video-premium",
        name: "Amazon Product Video Edit Premium",
        price: 25, priceDisplay: "$25",
        unit: "/video",
        details: "15 sec – 25 sec premium edit",
        freeRevisions: "3 Revisions",
        extraRevision: "$10/revision",
        category: "Amazon Video",
      },
      {
        id: "amz-research-video",
        name: "Amazon Product Research Video Edit",
        price: 80, priceDisplay: "$80",
        unit: "/video",
        details: "25 sec – 35 sec research-based video",
        freeRevisions: "3 Revisions",
        extraRevision: "$15/revision",
        category: "Amazon Video",
      },
      {
        id: "amz-thumbnail",
        name: "Amazon Product Video Thumbnail",
        price: 15, priceDisplay: "$15",
        unit: "/image",
        details: "1 custom thumbnail image",
        freeRevisions: "2 Revisions",
        extraRevision: "$5/revision",
        category: "Amazon Video",
      },
    ],
  },

  /* ── 3. Amazon Copywriting ──────────────────────────── */
  {
    id: "amazon-copywriting",
    label: "Amazon Copywriting",
    icon: "✍️",
    color: "#A855F7",
    services: [
      {
        id: "amz-writeup",
        name: "Amazon Product Write Up",
        price: 45, priceDisplay: "$45",
        unit: "/listing",
        details: "Title, 5 Bullets & Explain Paragraph",
        freeRevisions: "2 Revisions",
        extraRevision: "$10/revision",
        category: "Amazon Copywriting",
      },
      {
        id: "amz-writeup-kw",
        name: "Amazon Write Up + Keyword Research",
        price: 60, priceDisplay: "$60",
        unit: "/listing",
        details: "Title, 5 Bullets, Paragraph + Keyword Excel File (Helium 10)",
        freeRevisions: "2 Revisions",
        extraRevision: "$15/revision",
        category: "Amazon Copywriting",
      },
    ],
  },

  /* ── 4. Studio & Model ──────────────────────────────── */
  {
    id: "studio-model",
    label: "Studio & Model",
    icon: "🏢",
    color: "#4ADE80",
    services: [
      {
        id: "studio",
        name: "Studio (Product Conditional)",
        price: 50, priceDisplay: "$50–$100",
        unit: "/shift",
        details: "Plain Infinity Furnished Hotel Room — includes basic lighting setup",
        freeRevisions: "Per Shift",
        extraRevision: "N/A",
        category: "Studio & Model",
      },
      {
        id: "model",
        name: "Model (Product Conditional)",
        price: 50, priceDisplay: "$50–$300",
        unit: "/shift",
        details: "Male or Female model — price varies by experience",
        freeRevisions: "Per Shift",
        extraRevision: "N/A",
        category: "Studio & Model",
      },
    ],
  },

  /* ── 5. TikTok Shop ─────────────────────────────────── */
  {
    id: "tiktok-shop",
    label: "TikTok Shop",
    icon: "🎵",
    color: "#FF0050",
    services: [
      {
        id: "tiktok-shoot-reel",
        name: "TikTok Shop Product Shoot + Reel",
        price: 60, priceDisplay: "$60",
        unit: "/package",
        details: "20 Plain Images / 10 Prop Images / 2 Reels",
        freeRevisions: "1 Revision",
        extraRevision: "$30/revision",
        category: "TikTok Shop",
      },
      {
        id: "tiktok-reel-edit",
        name: "TikTok Shop Reel Edit",
        price: 35, priceDisplay: "$35",
        unit: "/video",
        details: "35 sec – 45 sec edited reel",
        freeRevisions: "1 Revision",
        extraRevision: "$15/revision",
        category: "TikTok Shop",
      },
      {
        id: "tiktok-ugc",
        name: "TikTok Shop Reel UGC",
        price: 150, priceDisplay: "$150",
        unit: "/video",
        details: "35 sec – 45 sec UGC-style reel",
        freeRevisions: "1 Revision",
        extraRevision: "$70/revision",
        category: "TikTok Shop",
      },
    ],
  },

  /* ── 6. Market Campaign ─────────────────────────────── */
  {
    id: "market-campaign",
    label: "Market Campaign",
    icon: "📣",
    color: "#EC4899",
    services: [
      {
        id: "influencer-video",
        name: "Market Campaign (Influencer Video)",
        price: 285, priceDisplay: "$285",
        unit: "/campaign",
        details: "Shortlisted 5–10 Influencers / Video Shoot & Edit included",
        freeRevisions: "—",
        extraRevision: "—",
        category: "Market Campaign",
      },
    ],
  },
];

export const ALL_SERVICES: ServiceItem[] = SERVICE_CATEGORIES.flatMap(c => c.services);
