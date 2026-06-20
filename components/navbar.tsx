"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { Menu, X } from "lucide-react";

const NAV_LINKS = [
  { label: "Home",         href: "#"            },
  { label: "Team",         href: "#team"         },
  { label: "Services",     href: "#services"     },
  { label: "Videography",  href: "#videography"  },
  { label: "Reviews",      href: "#reviews"      },
];

export default function Navbar() {
  const [scrolled, setScrolled]     = useState(false);
  const [menuOpen, setMenuOpen]     = useState(false);
  const [activeSection, setActive]  = useState("");
  const [progress, setProgress]     = useState(0);

  const onScroll = useCallback(() => {
    const sy = window.scrollY;
    const total = document.documentElement.scrollHeight - window.innerHeight;
    setScrolled(sy > 40);
    setProgress(total > 0 ? (sy / total) * 100 : 0);

    // Highlight active section
    const ids = NAV_LINKS.map(l => l.href.replace("#", "")).filter(Boolean);
    let current = "";
    for (const id of ids) {
      const el = document.getElementById(id);
      if (el && el.getBoundingClientRect().top <= 120) current = id;
    }
    setActive(current);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [onScroll]);

  const handleLink = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href === "#") {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
    setMenuOpen(false);
  };

  return (
    <>
      {/* Scroll progress bar */}
      <div
        className="nav-progress-bar"
        style={{ width: `${progress}%` }}
        aria-hidden="true"
      />

      <header
        className={`site-nav${scrolled ? " site-nav--scrolled" : ""}`}
        role="banner"
      >
        <div className="nav-inner">
          {/* Logo */}
          <a
            href="#"
            className="nav-logo-link"
            onClick={(e) => handleLink(e, "#")}
            aria-label="Evoke Hub — go to top"
          >
            <div className="nav-logo-wrap">
              <Image
                src="/assets/evoke-hub-logo.png"
                alt="Evoke Hub"
                fill
                sizes="110px"
                className="nav-logo-img"
              />
            </div>
          </a>

          {/* Desktop links */}
          <nav className="nav-links" aria-label="Main navigation">
            {NAV_LINKS.map(({ label, href }) => {
              const id = href.replace("#", "");
              const isActive = id ? activeSection === id : activeSection === "";
              return (
                <a
                  key={href}
                  href={href}
                  className={`nav-link${isActive ? " nav-link--active" : ""}`}
                  onClick={(e) => handleLink(e, href)}
                >
                  {label}
                </a>
              );
            })}
          </nav>

          {/* CTA */}
          <a
            href="#contact"
            id="nav-cta-btn"
            className="nav-cta"
          >
            Get In Touch
          </a>

          {/* Mobile hamburger */}
          <button
            className="nav-hamburger"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(v => !v)}
          >
            {menuOpen
              ? <X className="h-5 w-5" />
              : <Menu className="h-5 w-5" />
            }
          </button>
        </div>

        {/* Mobile menu drawer */}
        <div className={`nav-mobile-drawer${menuOpen ? " nav-mobile-drawer--open" : ""}`}>
          <nav aria-label="Mobile navigation">
            {NAV_LINKS.map(({ label, href }) => (
              <a
                key={href}
                href={href}
                className="nav-mobile-link"
                onClick={(e) => handleLink(e, href)}
              >
                {label}
              </a>
            ))}
            <a href="#contact" className="nav-mobile-cta" onClick={() => setMenuOpen(false)}>
              Get In Touch
            </a>
          </nav>
        </div>
      </header>
    </>
  );
}
