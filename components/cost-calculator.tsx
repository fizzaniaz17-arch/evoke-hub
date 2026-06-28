"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Download, Send, CheckCircle, AlertCircle, Loader2, ChevronDown } from "lucide-react";
import { SERVICE_CATEGORIES, ServiceItem } from "@/data/services-pricing";

type Status = "idle" | "sending" | "success" | "error";

/* ── Animated number counter ── */
function AnimatedTotal({ value }: { value: number }) {
  return (
    <motion.span
      key={value}
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
    >
      ${value.toLocaleString()}
    </motion.span>
  );
}

export default function CostCalculator() {
  const [selected, setSelected] = useState<Record<string, boolean>>({});
  const [openCat, setOpenCat]   = useState<string>(SERVICE_CATEGORIES[0].id);
  const [name, setName]         = useState("");
  const [email, setEmail]       = useState("");
  const [phone, setPhone]       = useState("");
  const [company, setCompany]   = useState("");
  const [message, setMessage]   = useState("");
  const [status, setStatus]     = useState<Status>("idle");
  const [apiMsg, setApiMsg]     = useState("");

  const toggleService = (id: string) =>
    setSelected(prev => ({ ...prev, [id]: !prev[id] }));

  const selectedServices: ServiceItem[] = SERVICE_CATEGORIES
    .flatMap(c => c.services)
    .filter(s => selected[s.id]);
  const total = selectedServices.reduce((sum, s) => sum + s.price, 0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedServices.length) {
      setApiMsg("Please select at least one service.");
      setStatus("error");
      return;
    }
    if (!name.trim() || !email.trim()) {
      setApiMsg("Name and email are required.");
      setStatus("error");
      return;
    }

    setStatus("sending");
    setApiMsg("");

    try {
      const res = await fetch("/api/send-quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name, email, phone, company, message,
          selectedServices: selectedServices.map(s => ({
            id: s.id, name: s.name, category: s.category,
            price: s.price, unit: s.unit,
          })),
          total,
        }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error ?? "Failed");
      setStatus("success");
      setApiMsg(
        json.dev
          ? "Quote submitted! (Email sending requires SMTP setup in .env.local)"
          : `Quote sent! Check ${email} for your detailed breakdown.`
      );
      setSelected({});
      setName(""); setEmail(""); setPhone(""); setCompany(""); setMessage("");
    } catch (err: unknown) {
      setStatus("error");
      setApiMsg(err instanceof Error ? err.message : "Something went wrong.");
    }
  };

  return (
    <section
      id="contact"
      aria-labelledby="calc-title"
      className="calc-section relative overflow-hidden"
    >
      <div className="calc-bg" aria-hidden="true" />
      <div className="absolute inset-0 grid-overlay opacity-10" aria-hidden="true" />

      <div className="relative mx-auto max-w-7xl px-6 py-24 lg:px-16">

        {/* Heading */}
        <div className="calc-header">
          <div className="calc-header-left">
            <p className="calc-eyebrow">Transparent Pricing</p>
            <h2 id="calc-title" className="calc-title">
              Cost <span className="calc-title-accent">Calculator</span>
            </h2>
            <p className="calc-subtitle">
              Select services to get an instant estimate. We'll email you a full breakdown and reach out within 24 hours.
            </p>
          </div>
          <a
            href="/evoke-hub-services.csv"
            download="Evoke-Hub-Services-Pricing.csv"
            className="calc-download-btn"
            aria-label="Download services pricing sheet"
          >
            <Download className="h-4 w-4" />
            Download Pricing Sheet
          </a>
        </div>

        {/* Two-column grid */}
        <div className="calc-grid">

          {/* ── LEFT: service accordion ── */}
          <div className="calc-services-panel">
            {SERVICE_CATEGORIES.map(cat => {
              const catSelected = cat.services.filter(s => selected[s.id]).length;
              const isOpen = openCat === cat.id;
              return (
                <div key={cat.id} className="calc-category">
                  <button
                    className={`calc-cat-header${isOpen ? " calc-cat-header--open" : ""}`}
                    onClick={() => setOpenCat(isOpen ? "" : cat.id)}
                    style={{ "--cat-color": cat.color } as React.CSSProperties}
                    aria-expanded={isOpen}
                  >
                    <span className="calc-cat-label">{cat.label}</span>
                    {catSelected > 0 && (
                      <span className="calc-cat-badge" style={{ background: cat.color }}>
                        {catSelected}
                      </span>
                    )}
                    <ChevronDown className={`calc-cat-chevron${isOpen ? " rotate-180" : ""}`} />
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.26, ease: [0.22, 1, 0.36, 1] }}
                        style={{ overflow: "hidden" }}
                      >
                        <div className="calc-service-list">
                          {cat.services.map(service => {
                            const isChecked = !!selected[service.id];
                            return (
                              <label
                                key={service.id}
                                className={`calc-service-row${isChecked ? " calc-service-row--checked" : ""}`}
                                style={{ "--row-color": cat.color } as React.CSSProperties}
                              >
                                <span
                                  className={`calc-checkbox${isChecked ? " calc-checkbox--checked" : ""}`}
                                  style={isChecked ? { background: cat.color, borderColor: cat.color } : {}}
                                >
                                  {isChecked && (
                                    <svg width="10" height="10" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                                      <path d="M2 6l3 3 5-5" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                  )}
                                </span>
                                <input
                                  type="checkbox"
                                  className="sr-only"
                                  checked={isChecked}
                                  onChange={() => toggleService(service.id)}
                                  aria-label={service.name}
                                />
                                <div className="calc-service-info">
                                  <span className="calc-service-name">{service.name}</span>
                                  <span className="calc-service-desc">{service.details}</span>
                                  <span className="calc-service-revisions">
                                    {service.freeRevisions !== "—" && service.freeRevisions !== "Per Shift"
                                      ? `${service.freeRevisions} free · ${service.extraRevision} after`
                                      : service.freeRevisions}
                                  </span>
                                </div>
                                <div className="calc-service-price">
                                  <span className="calc-price-amount">{service.priceDisplay}</span>
                                  <span className="calc-price-unit">{service.unit}</span>
                                </div>
                              </label>
                            );
                          })}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

          {/* ── RIGHT: summary + form ── */}
          <div className="calc-right-panel">

            {/* Live cost summary */}
            <div className="calc-summary-card">
              <div className="calc-summary-header">
                <span className="calc-summary-label">Estimated Total</span>
                <span className="calc-summary-count">
                  {selectedServices.length} service{selectedServices.length !== 1 ? "s" : ""}
                </span>
              </div>
              <div className="calc-total-display">
                <AnimatedTotal value={total} />
              </div>
              {total === 0 && (
                <p className="calc-empty-hint">← Select services to see your estimate</p>
              )}

              <AnimatePresence>
                {selectedServices.length > 0 && (
                  <motion.ul
                    className="calc-breakdown-list"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    {selectedServices.map(s => (
                      <li key={s.id} className="calc-breakdown-row">
                        <span className="calc-breakdown-name">{s.name}</span>
                        <button
                          onClick={() => toggleService(s.id)}
                          className="calc-breakdown-remove"
                          aria-label={`Remove ${s.name}`}
                        >
                          ✕
                        </button>
                        <span className="calc-breakdown-price">
                          {s.priceDisplay}
                          <span style={{ color: "rgba(255,255,255,0.28)", fontSize: 10 }}>{s.unit}</span>
                        </span>
                      </li>
                    ))}
                    <li className="calc-breakdown-total">
                      <span>Starting Estimate</span>
                      <span className="calc-breakdown-total-val">${total.toLocaleString()}</span>
                    </li>
                  </motion.ul>
                )}
              </AnimatePresence>
            </div>

            {/* Quote form */}
            <form onSubmit={handleSubmit} className="calc-form" aria-label="Get a quote" noValidate>
              <div className="calc-form-grid">
                <div className="calc-field">
                  <label htmlFor="calc-name" className="calc-label">
                    Full Name <span aria-hidden>*</span>
                  </label>
                  <input id="calc-name" type="text" className="calc-input" placeholder="John Smith"
                    value={name} onChange={e => setName(e.target.value)} required />
                </div>
                <div className="calc-field">
                  <label htmlFor="calc-email" className="calc-label">
                    Email Address <span aria-hidden>*</span>
                  </label>
                  <input id="calc-email" type="email" className="calc-input" placeholder="you@company.com"
                    value={email} onChange={e => setEmail(e.target.value)} required />
                </div>
                <div className="calc-field">
                  <label htmlFor="calc-phone" className="calc-label">Phone Number</label>
                  <input id="calc-phone" type="tel" className="calc-input" placeholder="+1 (555) 000-0000"
                    value={phone} onChange={e => setPhone(e.target.value)} />
                </div>
                <div className="calc-field">
                  <label htmlFor="calc-company" className="calc-label">Company / Brand</label>
                  <input id="calc-company" type="text" className="calc-input" placeholder="Your Company Ltd."
                    value={company} onChange={e => setCompany(e.target.value)} />
                </div>
              </div>
              <div className="calc-field" style={{ marginTop: 16 }}>
                <label htmlFor="calc-message" className="calc-label">Additional Notes</label>
                <textarea id="calc-message" className="calc-input calc-textarea"
                  placeholder="Tell us about your project, timeline, or special requirements…"
                  rows={4} value={message} onChange={e => setMessage(e.target.value)} />
              </div>

              <AnimatePresence>
                {apiMsg && (
                  <motion.div
                    className={`calc-status${status === "success" ? " calc-status--ok" : " calc-status--err"}`}
                    initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                  >
                    {status === "success"
                      ? <CheckCircle className="h-4 w-4 flex-shrink-0" />
                      : <AlertCircle className="h-4 w-4 flex-shrink-0" />}
                    {apiMsg}
                  </motion.div>
                )}
              </AnimatePresence>

              <button
                type="submit"
                disabled={status === "sending"}
                className="calc-submit-btn"
                id="calc-submit"
              >
                {status === "sending" ? (
                  <><Loader2 className="h-4 w-4 animate-spin" /> Sending Quote…</>
                ) : (
                  <><Send className="h-4 w-4" /> Get My Quote &amp; Send Breakdown</>
                )}
              </button>
              <p className="calc-disclaimer">
                Your information is never shared with third parties. Submitting will send an automated
                detailed breakdown to your email address.
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
