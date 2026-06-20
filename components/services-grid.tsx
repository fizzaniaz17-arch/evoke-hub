"use client";

import { useState } from "react";

const SERVICES = [
  { id: 1,  label: "Social Media" },
  { id: 2,  label: "E-Commerce" },
  { id: 3,  label: "Google Ads" },
  { id: 4,  label: "Branding" },
  { id: 5,  label: "SEO & SMM" },
  { id: 6,  label: "Marketing" },
  { id: 7,  label: "Web Design" },
  { id: 8,  label: "Photography" },
  { id: 9,  label: "Videography" },
  { id: 10, label: "Sound Effects" },
  { id: 11, label: "Graphic Design" },
  { id: 12, label: "Mobile App" },
  { id: 13, label: "Entertainment" },
  { id: 14, label: "UI / UX Design" },
  { id: 15, label: "Art & Taste" },
];

export default function ServicesGrid() {
  const [active, setActive] = useState<number>(15);

  return (
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
            From strategy to execution — 15 specialisations built to elevate every dimension of your brand.
          </p>
        </div>

        {/* 5 × 3 Grid */}
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
                id={`service-tab-${svc.id}`}
                onClick={() => setActive(svc.id)}
                className={`service-tile${isActive ? " service-tile--active" : ""}`}
              >
                {/* Number watermark */}
                <span className="service-tile-num" aria-hidden="true">
                  {String(svc.id).padStart(2, "0")}.
                </span>
                {/* Label */}
                <span className="service-tile-label">{svc.label}</span>
                {/* Hover / active glow border */}
                <span className="service-tile-glow" aria-hidden="true" />
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
