"use client";

import { useState } from "react";
import { SERVICE_PORTFOLIO } from "@/data/services-portfolio";
import ServicePortfolioModal from "./service-portfolio-modal";

const SERVICES = [
  { id: 1,  label: "Social Media",    img: "/assets/services/svc_social_media.png" },
  { id: 2,  label: "E-Commerce",      img: "/assets/services/svc_ecommerce.png" },
  { id: 3,  label: "Google Ads",      img: "/assets/services/service_google_ads.png" },
  { id: 4,  label: "Branding",        img: "/assets/services/service_branding.png" },
  { id: 5,  label: "SEO & SMM",       img: "/assets/services/service_seo_smm.png" },
  { id: 6,  label: "Marketing",       img: "/assets/services/service_marketing.png" },
  { id: 7,  label: "Web Design",      img: "/assets/services/service_web_design.png" },
  { id: 8,  label: "Photography",     img: "/assets/services/service_photography.png" },
  { id: 9,  label: "Videography",     img: "/assets/services/service_videography.png" },
  { id: 10, label: "Graphic Design",  img: "/assets/services/service_graphic_design.png" },
  { id: 11, label: "Content Creation",img: "/assets/services/service_marketing.png" },
  { id: 12, label: "Video Editing",   img: "/assets/services/service_videography.png" },
];

export default function ServicesGrid() {
  /* The tile that is visually "active" (highlighted) */
  const [active, setActive] = useState<number | null>(null);
  /* The service whose portfolio is currently open in the modal (null = closed) */
  const [modalId, setModalId] = useState<number | null>(null);

  const activePortfolio =
    modalId !== null
      ? (SERVICE_PORTFOLIO.find((p) => p.serviceId === modalId) ?? null)
      : null;

  const openPortfolio = (id: number) => {
    setActive(id);
    setModalId(id);
  };

  const closePortfolio = () => {
    setModalId(null);
  };

  return (
    <>
      <section
        id="services"
        aria-labelledby="services-title"
        className="services-section relative overflow-hidden px-5 py-28 sm:px-8"
      >
        {/* Background */}
        <div className="services-bg" aria-hidden="true" />
        <div className="absolute inset-0 grid-overlay opacity-10" aria-hidden="true" />

        <div className="relative mx-auto max-w-7xl">
          {/* Heading */}
          <div className="mb-14 text-center">
            <p className="mb-4 font-heading text-xs font-semibold uppercase tracking-[0.38em] text-[#3498DB]">
              What We Offer
            </p>
            <h2
              id="services-title"
              className="font-heading text-4xl font-bold text-white sm:text-5xl lg:text-6xl"
            >
              Our{" "}
              <span className="services-heading-grad">Services</span>
            </h2>
            <p className="mx-auto mt-5 max-w-xl font-body text-base leading-8 text-[#A1A1AA]">
              From strategy to execution — 12 specialisations built to elevate every dimension of your brand.
            </p>
            {/* Subtle hint for users */}
            <p className="mt-3 font-body text-xs text-[#3498DB]/60 tracking-widest uppercase">
              Click any service to view portfolio →
            </p>
          </div>

          {/* 4 × 3 Tile grid */}
          <div
            className="services-grid"
            role="tablist"
            aria-label="Service categories"
          >
            {SERVICES.map((svc) => {
              const isActive = svc.id === active;
              return (
                <button
                  key={svc.id}
                  role="tab"
                  aria-selected={isActive}
                  aria-haspopup="dialog"
                  id={`service-tab-${svc.id}`}
                  onClick={() => openPortfolio(svc.id)}
                  className={`service-tile${isActive ? " service-tile--active" : ""}`}
                  style={{ "--tile-bg": `url('${svc.img}')` } as React.CSSProperties}
                >
                  {/* Label — centered by parent flexbox */}
                  <span className="service-tile-label">{svc.label}</span>
                  {/* Glow border */}
                  <span className="service-tile-glow" aria-hidden="true" />
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Portfolio modal — renders as a portal above everything */}
      <ServicePortfolioModal
        portfolio={activePortfolio}
        onClose={closePortfolio}
      />
    </>
  );
}
