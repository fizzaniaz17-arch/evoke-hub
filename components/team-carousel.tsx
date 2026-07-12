"use client";

import Image from "next/image";
import { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

/* ── Skill icon SVGs ── */
const SkillIcons: Record<string, React.FC<{ className?: string }>> = {
  Figma: ({ className }) => (
    <svg className={className} viewBox="0 0 38 57" fill="none">
      <path d="M19 28.5a9.5 9.5 0 1 1 19 0 9.5 9.5 0 0 1-19 0z" fill="#1ABCFE"/>
      <path d="M0 47.5A9.5 9.5 0 0 1 9.5 38H19v9.5a9.5 9.5 0 0 1-19 0z" fill="#0ACF83"/>
      <path d="M19 0v19h9.5a9.5 9.5 0 0 0 0-19H19z" fill="#FF7262"/>
      <path d="M0 9.5A9.5 9.5 0 0 0 9.5 19H19V0H9.5A9.5 9.5 0 0 0 0 9.5z" fill="#F24E1E"/>
      <path d="M0 28.5A9.5 9.5 0 0 0 9.5 38H19V19H9.5A9.5 9.5 0 0 0 0 28.5z" fill="#A259FF"/>
    </svg>
  ),
  Blender: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M6.47 9.8A5.62 5.62 0 0 0 4 14.5a5.55 5.55 0 0 0 5.5 5.5 5.62 5.62 0 0 0 4.7-2.47L7.73 9.8H6.47zm5.55-1.55a5.58 5.58 0 0 1 2 .37l-2.47-3.6a.83.83 0 0 0-1.38 0l-4.24 6.18a5.54 5.54 0 0 1 6.09-2.95zm3.36 2.46a5.5 5.5 0 0 1-4.87 7.79H20a.84.84 0 0 0 .69-1.32l-5.31-6.47z"/>
    </svg>
  ),
  HTML5: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M1.5 0h21l-1.91 21.563L11.977 24l-8.565-2.438L1.5 0zm7.031 9.75l-.232-2.718 10.059.003.23-2.622L5.412 4.41l.698 8.01h9.126l-.326 3.426-2.91.804-2.955-.81-.188-2.11H6.248l.33 4.171L12 19.351l5.379-1.443.744-8.157H8.531z"/>
    </svg>
  ),
  Bootstrap: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M11.77 11.24H9.956V8.202h2.152c1.15 0 1.82.55 1.82 1.493 0 .92-.588 1.546-2.158 1.546zm.324 1.146H9.956v3.638h2.242c1.673 0 2.37-.588 2.37-1.82 0-1.214-.773-1.818-2.474-1.818zM24 11.39v1.218C24 18.9 18.9 24 12.61 24H11.39C5.1 24 0 18.9 0 12.61v-1.218C0 5.1 5.1 0 11.39 0h1.218C18.9 0 24 5.1 24 11.39zm-6.734.623c0-1.2-.498-2.212-1.47-2.858.648-.532 1.04-1.3 1.04-2.22 0-1.842-1.35-2.994-3.486-2.994H7.956v12h5.56c2.272 0 3.75-1.184 3.75-3.928z"/>
    </svg>
  ),
  JavaScript: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M0 0h24v24H0V0zm22.034 18.276c-.175-1.095-.888-2.015-3.003-2.873-.736-.345-1.554-.585-1.797-1.14-.091-.33-.105-.51-.046-.705.15-.646.915-.84 1.515-.66.39.12.75.42.976.9 1.034-.676 1.755-1.125 1.755-1.125-.27-.42-.404-.601-.586-.78-.63-.705-1.469-1.065-2.834-1.034l-.705.089c-.676.165-1.32.525-1.71 1.005-1.14 1.291-.811 3.541.569 4.471 1.365 1.02 3.361 1.244 3.616 2.205.24 1.17-.87 1.545-1.966 1.41-.811-.18-1.26-.586-1.755-1.336l-1.83 1.051c.21.48.45.689.81 1.109 1.74 1.756 6.09 1.666 6.871-1.004.029-.09.24-.705.074-1.65l.046.067zm-8.983-7.245h-2.248c0 1.938-.009 3.864-.009 5.805 0 1.232.063 2.363-.138 2.711-.33.689-1.18.601-1.566.48-.396-.196-.597-.466-.83-.855-.063-.105-.11-.196-.127-.196l-1.825 1.125c.305.63.75 1.172 1.324 1.517.855.51 2.004.675 3.207.405.783-.226 1.458-.691 1.811-1.411.51-.93.402-2.07.397-3.346.012-2.054 0-4.109 0-6.179l.004-.056z"/>
    </svg>
  ),
  "After Effects": ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M0 0h24v24H0zm13.5 9.41c-.3-.9-.6-1.86-.87-2.7h-.03c-.24.84-.51 1.8-.81 2.7l-.51 1.62h2.73zM23.99 5v14c0 2.76-2.24 5-5 5H5c-2.76 0-5-2.24-5-5V5c0-2.76 2.24-5 5-5h13.99c2.76 0 5 2.24 5 5zM9.63 15.57L8.91 13.2H5.79l-.69 2.37H3.45L6.36 7.5h2.1l2.94 8.07zm9.12 0h-1.62l-.03-.9c-.51.69-1.26 1.05-2.22 1.05-1.77 0-3.18-1.47-3.18-3.57s1.44-3.57 3.18-3.57c.9 0 1.65.36 2.16.99V7.5H18.75z"/>
    </svg>
  ),
  "Three.js": ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M.38 0L4.98 24l14.12-5.25L24 0zm5.94 4.34l9.82-.01-1.17 3.49-6.44.01zm8.36 7.55l-5.56.01.42 2.97 4.4-1.63zm-6.23 5.98L7.27 9.26l3.67-.01 1.88 7.01z"/>
    </svg>
  ),
  Photoshop: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M0 0h24v24H0zm14.979 7.499h-1.5V14.5h1.5c2.003 0 3-1.017 3-3.017 0-1.998-.997-2.984-3-2.984zM23.99 5v14c0 2.76-2.24 5-5 5H5c-2.76 0-5-2.24-5-5V5c0-2.76 2.24-5 5-5h13.99c2.76 0 5 2.24 5 5zM6.63 13.97c.705.705 1.72.963 2.845.963.96 0 1.8-.24 2.4-.71v-1.79H9.875v1.11c-.27.12-.615.15-.96.15-.96 0-1.59-.75-1.59-1.95 0-1.14.6-1.95 1.56-1.95.57 0 .99.21 1.32.63l.84-.78C10.68 9.57 9.93 9.3 9 9.3c-1.695 0-2.865 1.185-2.865 2.895 0 .69.195 1.305.495 1.775zm8.349-6.471h-3.022v8.007h1.652V14h1.523c2.003 0 3.166-1.063 3.166-3.246 0-2.1-1.093-3.228-3.319-3.228z"/>
    </svg>
  ),
};

const TEAM_MEMBERS = [
  {
    id: 1,
    name: "Kai Nakamura",
    occupation: "Creative Director",
    spec: "Brand Identity & Visual Systems",
    anime: "Naruto",
    animeChar: "Naruto Uzumaki",
    accentColor: "#FF8C00",
    glowColor: "rgba(255,140,0,0.55)",
    tag: "Sage Mode",
    image: "/assets/anime-naruto.png",
    expertise: "Brand Strategy & Visual Systems",
    bornIn: "Osaka, Japan",
    dateOfBirth: "14 March 1992",
    education: "MFA Visual Communication",
    award1: "Cannes Lions Gold",
    award2: "D&AD Yellow Pencil",
    bio: "Award-winning creative director with 12+ years forging brand identities that cut through noise. Kai blends cultural nuance with strategic precision to build visual systems that endure.",
    socials: { ig: "#", be: "#", li: "#", fb: "#" },
    skills: [
      { name: "Figma",         pct: 98, icon: "Figma"         },
      { name: "Photoshop",     pct: 96, icon: "Photoshop"     },
      { name: "After Effects", pct: 90, icon: "After Effects" },
      { name: "Three.js",      pct: 75, icon: "Three.js"      },
      { name: "HTML5",         pct: 82, icon: "HTML5"         },
      { name: "JavaScript",    pct: 78, icon: "JavaScript"    },
    ],
  },
  {
    id: 2,
    name: "Zara Chen",
    occupation: "UI/UX Designer",
    spec: "Interaction Design & Motion",
    anime: "Demon Slayer",
    animeChar: "Tanjiro Kamado",
    accentColor: "#00C8FF",
    glowColor: "rgba(0,200,255,0.55)",
    tag: "Water Breathing",
    image: "/assets/anime-tanjiro.png",
    expertise: "UI/UX & Interaction Design",
    bornIn: "Shanghai, China",
    dateOfBirth: "07 August 1995",
    education: "BDes Interaction Design",
    award1: "Awwwards SOTD",
    award2: "CSS Design Awards",
    bio: "Zara architects human-centred interfaces that balance beauty with usability. Her design systems have powered products used by millions across fintech and SaaS.",
    socials: { ig: "#", be: "#", li: "#", fb: "#" },
    skills: [
      { name: "Figma",         pct: 100, icon: "Figma"         },
      { name: "HTML5",         pct: 95,  icon: "HTML5"         },
      { name: "JavaScript",    pct: 88,  icon: "JavaScript"    },
      { name: "After Effects", pct: 92,  icon: "After Effects" },
      { name: "Photoshop",     pct: 85,  icon: "Photoshop"     },
      { name: "Three.js",      pct: 70,  icon: "Three.js"      },
    ],
  },
  {
    id: 3,
    name: "Ryuu Tanaka",
    occupation: "Lead Developer",
    spec: "Full-Stack & 3D Web",
    anime: "Attack on Titan",
    animeChar: "Levi Ackerman",
    accentColor: "#4ADE80",
    glowColor: "rgba(74,222,128,0.55)",
    tag: "Humanity's Strongest",
    image: "/assets/anime-levi.png",
    expertise: "Full-Stack & WebGL",
    bornIn: "Tokyo, Japan",
    dateOfBirth: "22 November 1990",
    education: "BSc Computer Science",
    award1: "GitHub Star 2023",
    award2: "Google Dev Expert",
    bio: "Ryuu builds the scaffolding that makes impossible ideas ship. From pixel-perfect 3D scenes to high-throughput APIs, he engineers with the precision of a surgeon.",
    socials: { ig: "#", be: "#", li: "#", fb: "#" },
    skills: [
      { name: "JavaScript",    pct: 100, icon: "JavaScript"    },
      { name: "Three.js",      pct: 97,  icon: "Three.js"      },
      { name: "HTML5",         pct: 99,  icon: "HTML5"         },
      { name: "Bootstrap",     pct: 88,  icon: "Bootstrap"     },
      { name: "Figma",         pct: 72,  icon: "Figma"         },
      { name: "After Effects", pct: 65,  icon: "After Effects" },
    ],
  },
  {
    id: 4,
    name: "Akira Wolf",
    occupation: "Brand Strategist",
    spec: "Positioning & Growth Systems",
    anime: "One Piece",
    animeChar: "Roronoa Zoro",
    accentColor: "#22C55E",
    glowColor: "rgba(34,197,94,0.55)",
    tag: "Three-Sword Style",
    image: "/assets/anime-zoro.png",
    expertise: "Brand Positioning & GTM",
    bornIn: "Seoul, South Korea",
    dateOfBirth: "30 May 1991",
    education: "MBA Brand Management",
    award1: "Forbes 30 Under 30",
    award2: "Effie Award Silver",
    bio: "Akira dissects markets with ruthless clarity and builds growth strategies that compound. She's steered five startups from obscurity to market leadership.",
    socials: { ig: "#", be: "#", li: "#", fb: "#" },
    skills: [
      { name: "Figma",         pct: 78, icon: "Figma"         },
      { name: "Photoshop",     pct: 82, icon: "Photoshop"     },
      { name: "HTML5",         pct: 70, icon: "HTML5"         },
      { name: "JavaScript",    pct: 65, icon: "JavaScript"    },
      { name: "Bootstrap",     pct: 75, icon: "Bootstrap"     },
      { name: "After Effects", pct: 80, icon: "After Effects" },
    ],
  },
  {
    id: 5,
    name: "Mia Sato",
    occupation: "Motion Designer",
    spec: "3D Animation & VFX",
    anime: "My Hero Academia",
    animeChar: "Izuku Midoriya",
    accentColor: "#A3E635",
    glowColor: "rgba(163,230,53,0.55)",
    tag: "One For All",
    image: "/assets/anime-deku.png",
    expertise: "Motion Design & VFX",
    bornIn: "Kyoto, Japan",
    dateOfBirth: "18 January 1994",
    education: "BA Animation Arts",
    award1: "Motionographer Pick",
    award2: "Vimeo Staff Pick",
    bio: "Mia transforms concepts into moving narratives that stop thumbs mid-scroll. Her VFX and motion work has shipped for global campaigns and title sequences.",
    socials: { ig: "#", be: "#", li: "#", fb: "#" },
    skills: [
      { name: "After Effects", pct: 100, icon: "After Effects" },
      { name: "Blender",       pct: 95,  icon: "Blender"       },
      { name: "Figma",         pct: 80,  icon: "Figma"         },
      { name: "Photoshop",     pct: 90,  icon: "Photoshop"     },
      { name: "JavaScript",    pct: 60,  icon: "JavaScript"    },
      { name: "Three.js",      pct: 72,  icon: "Three.js"      },
    ],
  },
  {
    id: 6,
    name: "Luna Park",
    occupation: "3D Artist",
    spec: "Realtime Renders & Shaders",
    anime: "Jujutsu Kaisen",
    animeChar: "Satoru Gojo",
    accentColor: "#818CF8",
    glowColor: "rgba(129,140,248,0.55)",
    tag: "Six Eyes",
    image: "/assets/anime-gojo.png",
    expertise: "3D & Realtime Rendering",
    bornIn: "Busan, South Korea",
    dateOfBirth: "03 October 1993",
    education: "MFA Digital Arts",
    award1: "Behance Featured",
    award2: "ArtStation Showcase",
    bio: "Luna sculpts impossible worlds in three dimensions. Her realtime shaders and photorealistic renders have become the visual benchmark clients bring to every brief.",
    socials: { ig: "#", be: "#", li: "#", fb: "#" },
    skills: [
      { name: "Blender",       pct: 100, icon: "Blender"       },
      { name: "Three.js",      pct: 95,  icon: "Three.js"      },
      { name: "Figma",         pct: 85,  icon: "Figma"         },
      { name: "After Effects", pct: 88,  icon: "After Effects" },
      { name: "JavaScript",    pct: 81,  icon: "JavaScript"    },
      { name: "Photoshop",     pct: 89,  icon: "Photoshop"     },
    ],
  },
];

type Member = typeof TEAM_MEMBERS[number];

/* ─────────────────────────────────────────
   Member Detail Modal
───────────────────────────────────────── */
function MemberModal({ member, onClose }: { member: Member; onClose: () => void }) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handler);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <>
      {/* Backdrop */}
      <motion.div
        className="member-modal-backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.22 }}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal */}
      <motion.div
        className="member-modal"
        role="dialog"
        aria-modal="true"
        aria-label={`${member.name} profile`}
        initial={{ opacity: 0, scale: 0.88, y: 48 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.90, y: 30 }}
        transition={{ type: "spring", stiffness: 110, damping: 22, mass: 0.8 }}
        style={{ "--member-accent": member.accentColor, "--member-glow": member.glowColor } as React.CSSProperties}
      >
        {/* Close */}
        <button className="member-modal-close" onClick={onClose} aria-label="Close profile">
          <X className="h-5 w-5" />
        </button>

        {/* Accent stripe */}
        <div className="member-modal-stripe" style={{ background: member.accentColor }} />

        <div className="member-modal-inner">
          {/* Name watermark */}
          <div className="member-modal-watermark" aria-hidden="true">
            {member.name.split(" ")[0].toUpperCase()}
          </div>

          {/* Hero: stats | portrait | stats */}
          <div className="member-modal-hero">
            {/* LEFT */}
            <div className="member-modal-stats member-modal-stats--left">
              {[
                { label: "EXPERTISE",    value: member.expertise    },
                { label: "DATE OF BIRTH",value: member.dateOfBirth  },
                { label: "BEST DESIGN",  value: member.award1       },
              ].map(s => (
                <div key={s.label} className="member-stat-card">
                  <span className="member-stat-label">{s.label}</span>
                  <span className="member-stat-value">{s.value}</span>
                </div>
              ))}
            </div>

            {/* CENTER portrait */}
            <div className="member-modal-portrait-wrap">
              <div
                className="member-modal-portrait"
                style={{ boxShadow: `0 0 0 3px ${member.accentColor}55, 0 0 60px ${member.glowColor}, 0 0 120px ${member.glowColor.replace("0.55","0.25")}` }}
              >
                <Image src={member.image} alt={member.name} fill sizes="280px" className="object-cover object-top" priority />
              </div>
              <p className="member-modal-name">{member.name}</p>
              <p className="member-modal-role" style={{ color: member.accentColor }}>{member.occupation}</p>
              <p className="member-modal-bio">{member.bio}</p>
            </div>

            {/* RIGHT */}
            <div className="member-modal-stats member-modal-stats--right">
              {[
                { label: "BORN IN",   value: member.bornIn    },
                { label: "EDUCATION", value: member.education  },
                { label: "AWARD",     value: member.award2     },
              ].map(s => (
                <div key={s.label} className="member-stat-card">
                  <span className="member-stat-label">{s.label}</span>
                  <span className="member-stat-value">{s.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Socials */}
          <div className="member-modal-socials">
            {[
              { label: "Instagram", href: member.socials.ig, path: <><rect x="2" y="2" width="20" height="20" rx="5" stroke="currentColor" strokeWidth="2" fill="none"/><circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="2" fill="none"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor"/></> },
              { label: "Behance",   href: member.socials.be, path: <path d="M7.5 5.5h3.5c1.5 0 2.5.8 2.5 2.1 0 .9-.5 1.6-1.3 1.9.9.3 1.5 1 1.5 2.1 0 1.5-1.1 2.4-2.8 2.4H7.5V5.5zm1.5 3.4h1.9c.7 0 1.1-.4 1.1-.9 0-.6-.4-.9-1.1-.9H9v1.8zm0 3.5h2.1c.8 0 1.3-.4 1.3-1.1 0-.6-.5-1-1.3-1H9v2.1zm7.2-1.2c.1 1 .8 1.5 1.7 1.5.6 0 1-.2 1.3-.7h1.4c-.4 1.2-1.5 2-2.8 2-1.9 0-3-1.3-3-3.1 0-1.7 1.1-3.1 3-3.1 2 0 3 1.5 2.8 3.4h-4.4zm2.7-1.8c-.1-.8-.7-1.3-1.4-1.3-.8 0-1.3.5-1.4 1.3h2.8zm-3.4-3.4h3.5v.9H15.5V6z"/> },
              { label: "LinkedIn",  href: member.socials.li, path: <><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7H10v-7a6 6 0 0 1 6-6zM2 9h4v12H2z"/><circle cx="4" cy="4" r="2"/></> },
              { label: "Facebook",  href: member.socials.fb, path: <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/> },
            ].map(s => (
              <a key={s.label} href={s.href} className="member-social-btn" aria-label={s.label}
                 style={{ "--btn-accent": member.accentColor } as React.CSSProperties}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">{s.path}</svg>
              </a>
            ))}
          </div>

          {/* Skills */}
          <div className="member-modal-skills">
            {member.skills.map((skill) => {
              const Icon = SkillIcons[skill.icon];
              return (
                <div key={skill.name} className="member-skill-pill" style={{ "--pill-accent": member.accentColor } as React.CSSProperties}>
                  <div className="member-skill-icon-wrap">
                    {Icon ? <Icon className="member-skill-icon" /> : <span className="member-skill-icon-text">{skill.icon[0]}</span>}
                    <svg className="member-skill-ring" viewBox="0 0 44 44" aria-hidden="true">
                      <circle cx="22" cy="22" r="19" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="2.5"/>
                      <circle cx="22" cy="22" r="19" fill="none" stroke={member.accentColor}
                        strokeWidth="2.5" strokeLinecap="round"
                        strokeDasharray={`${(skill.pct / 100) * 119.4} 119.4`}
                        strokeDashoffset="29.85"
                        style={{ transition: "stroke-dasharray 1s ease" }}
                      />
                    </svg>
                  </div>
                  <span className="member-skill-pct">{skill.pct}%</span>
                  <span className="member-skill-name">{skill.name}</span>
                </div>
              );
            })}
          </div>
        </div>
      </motion.div>
    </>
  );
}

/* ─────────────────────────────────────────
   Main Carousel
───────────────────────────────────────── */
const CARD_COUNT = TEAM_MEMBERS.length;
const ANGLE_STEP = 360 / CARD_COUNT;

/* Pick a 3-D ring radius that keeps cards inside the viewport */
function useRadius() {
  const [radius, setRadius] = useState(420);
  useEffect(() => {
    const calc = () => {
      const w = window.innerWidth;
      if (w <= 420)  setRadius(170);
      else if (w <= 640)  setRadius(220);
      else if (w <= 900)  setRadius(300);
      else if (w <= 1100) setRadius(360);
      else                setRadius(420);
    };
    calc();
    window.addEventListener("resize", calc);
    return () => window.removeEventListener("resize", calc);
  }, []);
  return radius;
}

export default function TeamCarousel() {
  const BASE_RADIUS = useRadius();
  const [activeIndex, setActiveIndex] = useState(0);
  const [isDragging, setIsDragging]   = useState(false);
  const [isHovered, setIsHovered]     = useState(false);
  const [openMember, setOpenMember]   = useState<Member | null>(null);

  const angleRef        = useRef(0);
  const targetAngleRef  = useRef(0);
  const rafRef          = useRef<number | null>(null);
  const ringRef         = useRef<HTMLDivElement>(null);
  const dragStartX      = useRef(0);
  const dragStartAngle  = useRef(0);
  const dragDeltaRef    = useRef(0);   // px moved since pointerdown
  const pointerDownTime = useRef(0);   // ms since epoch

  /* smooth lerp */
  const animate = useCallback(() => {
    angleRef.current += (targetAngleRef.current - angleRef.current) * 0.072;
    if (ringRef.current) ringRef.current.style.transform = `rotateY(${angleRef.current}deg)`;
    const norm = (((-angleRef.current % 360) + 360) % 360);
    setActiveIndex(Math.round(norm / ANGLE_STEP) % CARD_COUNT);
    rafRef.current = requestAnimationFrame(animate);
  }, []);

  useEffect(() => {
    rafRef.current = requestAnimationFrame(animate);
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, [animate]);

  /* auto-rotate — pauses when modal is open */
  useEffect(() => {
    if (isHovered || isDragging || openMember) return;
    const id = setInterval(() => { targetAngleRef.current -= ANGLE_STEP; }, 3200);
    return () => clearInterval(id);
  }, [isHovered, isDragging, openMember]);

  const rotateTo = (idx: number) => {
    const current = (((-angleRef.current % 360) + 360) % 360);
    const target  = (idx * ANGLE_STEP) % 360;
    let delta = target - current;
    if (delta > 180)  delta -= 360;
    if (delta < -180) delta += 360;
    targetAngleRef.current = angleRef.current - delta;
  };

  /* ── Stage pointer events (drag only, no capture) ── */
  const onStagePointerDown = (e: React.PointerEvent) => {
    setIsDragging(true);
    dragStartX.current     = e.clientX;
    dragStartAngle.current = targetAngleRef.current;
    dragDeltaRef.current   = 0;
    pointerDownTime.current = Date.now();
    // NOTE: deliberately NOT calling setPointerCapture — it prevents child click events
  };
  const onStagePointerMove = (e: React.PointerEvent) => {
    if (!isDragging) return;
    dragDeltaRef.current = Math.abs(e.clientX - dragStartX.current);
    targetAngleRef.current = dragStartAngle.current + (e.clientX - dragStartX.current) * 0.35;
  };
  const onStagePointerUp = () => {
    setIsDragging(false);
    // Only snap if it was a real drag (moved > 10px)
    if (dragDeltaRef.current > 10) {
      const norm = (((-targetAngleRef.current % 360) + 360) % 360);
      rotateTo(Math.round(norm / ANGLE_STEP) % CARD_COUNT);
    }
  };

  /* ── Card click: open modal if barely moved and short press ── */
  const onCardClick = (e: React.MouseEvent, member: Member, idx: number) => {
    e.stopPropagation();
    const elapsed = Date.now() - pointerDownTime.current;
    if (dragDeltaRef.current < 10 && elapsed < 400) {
      setOpenMember(member);
    } else {
      rotateTo(idx);
    }
  };

  return (
    <>
      <section
        id="team"
        className="team-section relative overflow-hidden px-5 py-32 sm:px-8"
        aria-label="Meet the team"
      >
        <div className="team-bg-glow" aria-hidden="true" />
        <div className="absolute inset-0 grid-overlay opacity-20" aria-hidden="true" />

        {/* Heading */}
        <div className="relative z-10 mx-auto max-w-3xl text-center">
          <p className="mb-4 font-heading text-xs font-semibold uppercase tracking-[0.38em] text-[#3498DB]">
            The Crew
          </p>
          <h2 className="font-heading text-5xl font-semibold leading-tight text-white sm:text-6xl lg:text-7xl">
            Meet the{" "}
            <span className="team-heading-gradient">Expert Team</span>
          </h2>
          <p className="mt-6 font-body text-base leading-8 text-[#A1A1AA] sm:text-lg">
            Six talented creatives. One unstoppable team. Click any card to explore their story.
          </p>
        </div>

        {/* 3-D Carousel Stage */}
        <div
          className="team-stage"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onPointerDown={onStagePointerDown}
          onPointerMove={onStagePointerMove}
          onPointerUp={onStagePointerUp}
          onPointerCancel={onStagePointerUp}
          aria-roledescription="carousel"
          style={{ cursor: isDragging ? "grabbing" : "grab" }}
        >
          <div className="team-orbit-ring" aria-hidden="true" />
          <div ref={ringRef} className="team-ring" style={{ "--radius": `${BASE_RADIUS}px` } as React.CSSProperties}>
            {TEAM_MEMBERS.map((member, idx) => {
              const isActive = idx === activeIndex;
              return (
                <div
                  key={member.id}
                  className={`team-card${isActive ? " team-card-active" : ""}`}
                  style={{
                    transform: `rotateY(${idx * ANGLE_STEP}deg) translateZ(${BASE_RADIUS}px)`,
                    "--accent": member.accentColor,
                    "--glow":   member.glowColor,
                  } as React.CSSProperties}
                  onClick={(e) => onCardClick(e, member, idx)}
                  tabIndex={0}
                  onKeyDown={(e) => { if (e.key === "Enter") setOpenMember(member); }}
                  role="button"
                  aria-label={`View ${member.name}'s profile`}
                >
                  <div className="team-card-img-wrap">
                    <Image src={member.image} alt={`${member.name} — ${member.occupation}`}
                      fill sizes="260px" className="team-card-img" />
                    <div className="team-card-shimmer" aria-hidden="true" />
                    <span className="team-card-tag"
                      style={{ color: member.accentColor, borderColor: member.accentColor + "55", background: member.accentColor + "18" }}>
                      {member.occupation}
                    </span>
                  </div>
                  <div className="team-card-body">
                    <div className="team-card-expertise" style={{ color: member.accentColor }}>
                      {member.expertise}
                    </div>
                    <div className="team-card-name">{member.name}</div>
                    <div className="team-card-role">{member.occupation}</div>
                    <div className="team-card-spec">{member.spec}</div>
                  </div>
                  <div className="team-card-click-hint" style={{ color: member.accentColor }}>
                    View Profile
                  </div>
                  {isActive && (
                    <div className="team-card-active-glow"
                      style={{ boxShadow: `0 0 0 2px ${member.accentColor}88, 0 0 40px ${member.glowColor}, 0 0 80px ${member.glowColor.replace("0.55","0.3")}` }}
                      aria-hidden="true" />
                  )}
                </div>
              );
            })}
          </div>
          <div className="team-floor" aria-hidden="true" />
        </div>

        {/* Controls */}
        <div className="relative z-10 mt-8 flex items-center justify-center gap-6">
          <button onClick={() => { targetAngleRef.current += ANGLE_STEP; }} className="team-nav-btn" aria-label="Previous member">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
          </button>
          <div className="flex gap-2.5" role="tablist">
            {TEAM_MEMBERS.map((m, idx) => (
              <button key={m.id} onClick={() => rotateTo(idx)}
                className={`team-dot${idx === activeIndex ? " team-dot-active" : ""}`}
                style={{ "--accent": m.accentColor } as React.CSSProperties}
                aria-selected={idx === activeIndex} role="tab" aria-label={m.name} />
            ))}
          </div>
          <button onClick={() => { targetAngleRef.current -= ANGLE_STEP; }} className="team-nav-btn" aria-label="Next member">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
          </button>
        </div>


      </section>

      {/* Member Detail Modal — rendered outside section, inside fragment */}
      <AnimatePresence>
        {openMember && (
          <MemberModal key={openMember.id} member={openMember} onClose={() => setOpenMember(null)} />
        )}
      </AnimatePresence>
    </>
  );
}
