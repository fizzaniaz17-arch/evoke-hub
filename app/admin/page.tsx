"use client";

import { useState, useEffect, useCallback } from "react";
import {
  LogOut, Download, RefreshCw, Search, ChevronUp, ChevronDown,
  FileSpreadsheet, Users, DollarSign, Clock, CheckCircle, XCircle,
  Eye, X, Save, AlertCircle, TrendingUp
} from "lucide-react";

// ── Types ──────────────────────────────────────────────────────────────────────
type QuoteStatus = "new" | "in-review" | "quoted" | "closed";

interface QuoteService {
  id: string; name: string; category: string; price: number; unit: string;
}

interface QuoteRecord {
  quoteId: string; submittedAt: string; status: QuoteStatus; adminNote: string;
  name: string; email: string; phone: string; company: string; message: string;
  selectedServices: QuoteService[]; total: number;
}

interface Stats {
  totalQuotes: number; totalRevenue: number;
  byStatus: Partial<Record<QuoteStatus, number>>;
}

// ── Constants ──────────────────────────────────────────────────────────────────
const STATUS_META: Record<QuoteStatus, { label: string; color: string; bg: string; icon: React.ElementType }> = {
  "new":       { label: "New",       color: "#3498DB", bg: "rgba(52,152,219,0.15)",  icon: Clock },
  "in-review": { label: "In Review", color: "#FFB347", bg: "rgba(255,179,71,0.15)",  icon: TrendingUp },
  "quoted":    { label: "Quoted",    color: "#7ED957", bg: "rgba(126,217,87,0.15)",  icon: CheckCircle },
  "closed":    { label: "Closed",    color: "#808080", bg: "rgba(128,128,128,0.15)", icon: XCircle },
};

// ── Helpers ────────────────────────────────────────────────────────────────────
function fmtDate(iso: string) {
  return new Date(iso).toLocaleString("en-US", {
    year: "numeric", month: "short", day: "numeric",
    hour: "2-digit", minute: "2-digit",
  });
}

function fmtMoney(n: number) {
  return "$" + n.toLocaleString("en-US", { minimumFractionDigits: 0, maximumFractionDigits: 0 });
}

// ── Status Badge ───────────────────────────────────────────────────────────────
function StatusBadge({ status }: { status: QuoteStatus }) {
  const m = STATUS_META[status];
  const Icon = m.icon;
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", gap: 5,
      padding: "3px 10px", borderRadius: 999, fontSize: 11, fontWeight: 700,
      color: m.color, background: m.bg, border: `1px solid ${m.color}40`,
      whiteSpace: "nowrap",
    }}>
      <Icon size={11} />{m.label}
    </span>
  );
}

// ── Stat Card ──────────────────────────────────────────────────────────────────
function StatCard({ icon: Icon, label, value, color }: {
  icon: React.ElementType; label: string; value: string | number; color: string;
}) {
  return (
    <div style={{
      background: "#080d1e", border: "1px solid rgba(52,152,219,0.18)",
      borderRadius: 14, padding: "20px 24px", display: "flex", alignItems: "center", gap: 16,
    }}>
      <div style={{
        width: 48, height: 48, borderRadius: 12,
        background: `${color}1a`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
      }}>
        <Icon size={22} color={color} />
      </div>
      <div>
        <div style={{ fontSize: 11, color: "#708090", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.1em" }}>{label}</div>
        <div style={{ fontSize: 22, fontWeight: 800, color: "#fff", marginTop: 2 }}>{value}</div>
      </div>
    </div>
  );
}

// ── Quote Detail Modal ─────────────────────────────────────────────────────────
function QuoteModal({
  quote, password, onClose, onUpdated,
}: {
  quote: QuoteRecord;
  password: string;
  onClose: () => void;
  onUpdated: (q: QuoteRecord) => void;
}) {
  const [status, setStatus]     = useState<QuoteStatus>(quote.status);
  const [note, setNote]         = useState(quote.adminNote);
  const [saving, setSaving]     = useState(false);
  const [saveMsg, setSaveMsg]   = useState("");

  const save = async () => {
    setSaving(true); setSaveMsg("");
    try {
      const res = await fetch(`/api/admin/quotes/${quote.quoteId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${password}` },
        body: JSON.stringify({ status, adminNote: note }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error);
      onUpdated(json.quote);
      setSaveMsg("✓ Saved");
      setTimeout(() => setSaveMsg(""), 2000);
    } catch (e) {
      setSaveMsg("Error: " + (e instanceof Error ? e.message : "Unknown"));
    } finally {
      setSaving(false);
    }
  };

  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 9999,
      background: "rgba(4,7,15,0.85)", backdropFilter: "blur(8px)",
      display: "flex", alignItems: "center", justifyContent: "center", padding: 24,
    }} onClick={onClose}>
      <div style={{
        background: "#080d1e", border: "1px solid rgba(52,152,219,0.3)",
        borderRadius: 20, width: "100%", maxWidth: 680, maxHeight: "90vh",
        overflow: "auto", padding: 36, position: "relative",
      }} onClick={e => e.stopPropagation()}>
        {/* Close */}
        <button onClick={onClose} style={{
          position: "absolute", top: 18, right: 18,
          background: "rgba(255,255,255,0.06)", border: "none", borderRadius: 8,
          color: "#fff", cursor: "pointer", padding: 8, display: "flex",
        }}><X size={18} /></button>

        {/* Header */}
        <div style={{ marginBottom: 24 }}>
          <div style={{ fontSize: 11, color: "#3498db", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase" }}>Quote Details</div>
          <div style={{ fontSize: 20, fontWeight: 800, color: "#fff", marginTop: 4 }}>{quote.name}</div>
          <div style={{ fontSize: 11, color: "#506070", fontFamily: "monospace", marginTop: 4 }}>{quote.quoteId}</div>
        </div>

        {/* Client info grid */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 24 }}>
          {[
            ["Email", quote.email],
            ["Phone", quote.phone || "—"],
            ["Company", quote.company || "—"],
            ["Submitted", fmtDate(quote.submittedAt)],
          ].map(([k, v]) => (
            <div key={k} style={{ background: "#0d1626", borderRadius: 10, padding: "12px 16px" }}>
              <div style={{ fontSize: 10, color: "#506070", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 4 }}>{k}</div>
              <div style={{ fontSize: 13, color: "#c0d0e0", wordBreak: "break-all" }}>{v}</div>
            </div>
          ))}
        </div>

        {/* Services table */}
        <div style={{ marginBottom: 24 }}>
          <div style={{ fontSize: 11, color: "#3498db", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 10 }}>Selected Services</div>
          <div style={{ background: "#0d1626", borderRadius: 12, overflow: "hidden" }}>
            {quote.selectedServices.map((s, i) => (
              <div key={s.id} style={{
                display: "flex", justifyContent: "space-between", alignItems: "center",
                padding: "10px 16px",
                borderBottom: i < quote.selectedServices.length - 1 ? "1px solid #1e2a3a" : "none",
              }}>
                <div>
                  <div style={{ fontSize: 13, color: "#e0e8f0", fontWeight: 600 }}>{s.name}</div>
                  <div style={{ fontSize: 11, color: "#506070" }}>{s.category}</div>
                </div>
                <div style={{ fontSize: 14, fontWeight: 700, color: "#7ed957" }}>${s.price.toLocaleString()}<span style={{ fontSize: 10, color: "#506070", fontWeight: 400 }}>{s.unit}</span></div>
              </div>
            ))}
            <div style={{
              display: "flex", justifyContent: "space-between", alignItems: "center",
              padding: "12px 16px", background: "#0a1424",
            }}>
              <span style={{ fontSize: 12, fontWeight: 700, color: "#a0b0c0", textTransform: "uppercase", letterSpacing: "0.1em" }}>Estimated Total</span>
              <span style={{ fontSize: 20, fontWeight: 900, color: "#7ed957" }}>{fmtMoney(quote.total)}</span>
            </div>
          </div>
        </div>

        {/* Message */}
        {quote.message && (
          <div style={{ marginBottom: 24 }}>
            <div style={{ fontSize: 11, color: "#708090", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 8 }}>Client Message</div>
            <div style={{ background: "#0d1626", borderRadius: 10, padding: "14px 16px", fontSize: 13, color: "#a0b8c8", lineHeight: 1.7, fontStyle: "italic" }}>"{quote.message}"</div>
          </div>
        )}

        {/* Admin controls */}
        <div style={{ background: "#0a1424", borderRadius: 14, padding: 20, border: "1px solid rgba(52,152,219,0.18)" }}>
          <div style={{ fontSize: 11, color: "#3498db", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 14 }}>Admin Controls</div>
          <div style={{ marginBottom: 14 }}>
            <label style={{ fontSize: 11, color: "#708090", display: "block", marginBottom: 6 }}>Status</label>
            <select
              value={status}
              onChange={e => setStatus(e.target.value as QuoteStatus)}
              style={{
                width: "100%", background: "#080d1e", border: "1px solid rgba(52,152,219,0.3)",
                borderRadius: 8, color: STATUS_META[status].color,
                padding: "10px 14px", fontSize: 13, fontWeight: 700, cursor: "pointer",
                outline: "none",
              }}
            >
              {(Object.keys(STATUS_META) as QuoteStatus[]).map(s => (
                <option key={s} value={s} style={{ color: STATUS_META[s].color }}>{STATUS_META[s].label}</option>
              ))}
            </select>
          </div>
          <div style={{ marginBottom: 16 }}>
            <label style={{ fontSize: 11, color: "#708090", display: "block", marginBottom: 6 }}>Admin Notes</label>
            <textarea
              value={note}
              onChange={e => setNote(e.target.value)}
              rows={3}
              placeholder="Internal notes about this quote…"
              style={{
                width: "100%", background: "#080d1e", border: "1px solid rgba(52,152,219,0.25)",
                borderRadius: 8, color: "#d0d8e8", padding: "10px 14px", fontSize: 13,
                resize: "vertical", outline: "none", boxSizing: "border-box",
              }}
            />
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <button
              onClick={save} disabled={saving}
              style={{
                background: "linear-gradient(135deg,#1a5276,#3498db)", border: "none",
                borderRadius: 8, color: "#fff", padding: "10px 24px", fontWeight: 700,
                fontSize: 13, cursor: saving ? "not-allowed" : "pointer",
                display: "flex", alignItems: "center", gap: 8, opacity: saving ? 0.7 : 1,
              }}
            >
              <Save size={15} />{saving ? "Saving…" : "Save Changes"}
            </button>
            {saveMsg && (
              <span style={{ fontSize: 12, color: saveMsg.startsWith("Error") ? "#ff6b6b" : "#7ed957", fontWeight: 600 }}>
                {saveMsg}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Main Page ──────────────────────────────────────────────────────────────────
export default function AdminPage() {
  const [password, setPassword]       = useState("");
  const [inputPw, setInputPw]         = useState("");
  const [authError, setAuthError]     = useState("");
  const [quotes, setQuotes]           = useState<QuoteRecord[]>([]);
  const [stats, setStats]             = useState<Stats | null>(null);
  const [loading, setLoading]         = useState(false);
  const [error, setError]             = useState("");
  const [search, setSearch]           = useState("");
  const [filterStatus, setFilterStatus] = useState<QuoteStatus | "all">("all");
  const [sortBy, setSortBy]           = useState<"submittedAt" | "total" | "name">("submittedAt");
  const [sortDir, setSortDir]         = useState<"asc" | "desc">("desc");
  const [selectedQuote, setSelectedQuote] = useState<QuoteRecord | null>(null);
  const [downloading, setDownloading] = useState(false);

  // Restore password from sessionStorage
  useEffect(() => {
    const saved = sessionStorage.getItem("admin_pw");
    if (saved) { setPassword(saved); }
  }, []);

  const fetchQuotes = useCallback(async (pw: string) => {
    setLoading(true); setError("");
    try {
      const res = await fetch("/api/admin/quotes", {
        headers: { Authorization: `Bearer ${pw}` },
      });
      if (res.status === 401) { setError("Unauthorized — wrong password."); setPassword(""); sessionStorage.removeItem("admin_pw"); return; }
      const json = await res.json();
      if (!res.ok) throw new Error(json.error);
      setQuotes(json.quotes);
      setStats(json.stats);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to load quotes.");
    } finally {
      setLoading(false);
    }
  }, []);

  // Auto-fetch when password is set
  useEffect(() => {
    if (password) fetchQuotes(password);
  }, [password, fetchQuotes]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputPw.trim()) { setAuthError("Please enter the admin password."); return; }
    setAuthError("");
    sessionStorage.setItem("admin_pw", inputPw);
    setPassword(inputPw);
    setInputPw("");
  };

  const handleLogout = () => {
    setPassword(""); sessionStorage.removeItem("admin_pw");
    setQuotes([]); setStats(null);
  };

  const handleDownload = async () => {
    setDownloading(true);
    try {
      const res = await fetch("/api/admin/quotes/export", {
        headers: { Authorization: `Bearer ${password}` },
      });
      if (!res.ok) { alert("Export failed."); return; }
      const blob = await res.blob();
      const url  = URL.createObjectURL(blob);
      const a    = document.createElement("a");
      a.href     = url;
      a.download = `Evoke-Hub-Quotes-${new Date().toISOString().slice(0, 10)}.xlsx`;
      a.click();
      URL.revokeObjectURL(url);
    } finally {
      setDownloading(false);
    }
  };

  const handleQuoteUpdated = (updated: QuoteRecord) => {
    setQuotes(prev => prev.map(q => q.quoteId === updated.quoteId ? updated : q));
    setSelectedQuote(updated);
  };

  // Sort + filter
  const filtered = quotes
    .filter(q => {
      const matchStatus = filterStatus === "all" || q.status === filterStatus;
      const term = search.toLowerCase();
      const matchSearch = !term || [q.name, q.email, q.company, q.quoteId].some(v => v.toLowerCase().includes(term));
      return matchStatus && matchSearch;
    })
    .sort((a, b) => {
      let cmp = 0;
      if (sortBy === "submittedAt") cmp = new Date(a.submittedAt).getTime() - new Date(b.submittedAt).getTime();
      if (sortBy === "total")       cmp = a.total - b.total;
      if (sortBy === "name")        cmp = a.name.localeCompare(b.name);
      return sortDir === "asc" ? cmp : -cmp;
    });

  const toggleSort = (col: typeof sortBy) => {
    if (sortBy === col) setSortDir(d => d === "asc" ? "desc" : "asc");
    else { setSortBy(col); setSortDir("desc"); }
  };

  // ── Login screen ──────────────────────────────────────────────────────────
  if (!password) {
    return (
      <div style={{
        minHeight: "100vh", background: "#04070f",
        display: "flex", alignItems: "center", justifyContent: "center",
        fontFamily: "'Segoe UI', Arial, sans-serif",
      }}>
        <div style={{
          background: "#080d1e", border: "1px solid rgba(52,152,219,0.3)",
          borderRadius: 20, padding: "48px 40px", width: "100%", maxWidth: 420,
        }}>
          <div style={{ textAlign: "center", marginBottom: 36 }}>
            <div style={{
              width: 64, height: 64, borderRadius: 16, margin: "0 auto 16px",
              background: "linear-gradient(135deg,#1a5276,#3498db)",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <FileSpreadsheet size={30} color="#fff" />
            </div>
            <h1 style={{ margin: 0, fontSize: 22, fontWeight: 800, color: "#fff" }}>EVOKE HUB</h1>
            <p style={{ margin: "6px 0 0", fontSize: 12, color: "#3498db", fontWeight: 600, letterSpacing: "0.15em", textTransform: "uppercase" }}>Admin Dashboard</p>
          </div>
          <form onSubmit={handleLogin}>
            <div style={{ marginBottom: 16 }}>
              <label style={{ fontSize: 11, color: "#708090", display: "block", marginBottom: 6, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase" }}>Password</label>
              <input
                id="admin-password"
                type="password"
                value={inputPw}
                onChange={e => setInputPw(e.target.value)}
                placeholder="Enter admin password"
                autoFocus
                style={{
                  width: "100%", background: "#0d1626", border: "1px solid rgba(52,152,219,0.3)",
                  borderRadius: 10, color: "#e0e8f0", padding: "12px 16px", fontSize: 14,
                  outline: "none", boxSizing: "border-box",
                }}
              />
            </div>
            {authError && (
              <div style={{ display: "flex", alignItems: "center", gap: 8, color: "#ff6b6b", fontSize: 12, marginBottom: 12 }}>
                <AlertCircle size={14} />{authError}
              </div>
            )}
            <button
              type="submit"
              id="admin-login-btn"
              style={{
                width: "100%", background: "linear-gradient(135deg,#1a5276,#3498db)",
                border: "none", borderRadius: 10, color: "#fff", padding: "13px",
                fontWeight: 700, fontSize: 14, cursor: "pointer", letterSpacing: "0.05em",
              }}
            >
              Sign In
            </button>
          </form>
        </div>
      </div>
    );
  }

  // ── Dashboard ─────────────────────────────────────────────────────────────
  return (
    <div style={{
      minHeight: "100vh", background: "#04070f",
      fontFamily: "'Segoe UI', Arial, sans-serif", color: "#e0e0e0",
    }}>
      {/* Top bar */}
      <div style={{
        background: "#080d1e", borderBottom: "1px solid rgba(52,152,219,0.2)",
        padding: "0 24px", display: "flex", alignItems: "center", justifyContent: "space-between",
        height: 60, position: "sticky", top: 0, zIndex: 100,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{
            width: 32, height: 32, borderRadius: 8, background: "linear-gradient(135deg,#1a5276,#3498db)",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <FileSpreadsheet size={16} color="#fff" />
          </div>
          <span style={{ fontWeight: 800, fontSize: 16, color: "#fff", letterSpacing: "0.05em" }}>EVOKE HUB</span>
          <span style={{ fontSize: 11, color: "#3498db", fontWeight: 600, letterSpacing: "0.15em", textTransform: "uppercase" }}>Quotes Dashboard</span>
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          <button
            onClick={() => fetchQuotes(password)}
            disabled={loading}
            id="admin-refresh"
            style={{
              background: "rgba(52,152,219,0.12)", border: "1px solid rgba(52,152,219,0.3)",
              borderRadius: 8, color: "#3498db", padding: "7px 14px", cursor: "pointer",
              display: "flex", alignItems: "center", gap: 6, fontSize: 12, fontWeight: 600,
            }}
          >
            <RefreshCw size={13} className={loading ? "animate-spin" : ""} />Refresh
          </button>
          <button
            onClick={handleDownload} disabled={downloading}
            id="admin-export"
            style={{
              background: "rgba(126,217,87,0.12)", border: "1px solid rgba(126,217,87,0.3)",
              borderRadius: 8, color: "#7ed957", padding: "7px 14px", cursor: "pointer",
              display: "flex", alignItems: "center", gap: 6, fontSize: 12, fontWeight: 600,
            }}
          >
            <Download size={13} />{downloading ? "Downloading…" : "Export Excel"}
          </button>
          <button
            onClick={handleLogout}
            id="admin-logout"
            style={{
              background: "rgba(255,107,107,0.1)", border: "1px solid rgba(255,107,107,0.25)",
              borderRadius: 8, color: "#ff6b6b", padding: "7px 14px", cursor: "pointer",
              display: "flex", alignItems: "center", gap: 6, fontSize: 12, fontWeight: 600,
            }}
          >
            <LogOut size={13} />Logout
          </button>
        </div>
      </div>

      <div style={{ maxWidth: 1400, margin: "0 auto", padding: "28px 24px" }}>

        {/* Error */}
        {error && (
          <div style={{
            background: "rgba(255,107,107,0.1)", border: "1px solid rgba(255,107,107,0.3)",
            borderRadius: 10, padding: "12px 16px", marginBottom: 20,
            display: "flex", alignItems: "center", gap: 10, color: "#ff6b6b", fontSize: 13,
          }}>
            <AlertCircle size={16} />{error}
          </div>
        )}

        {/* Stats */}
        {stats && (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 14, marginBottom: 28 }}>
            <StatCard icon={Users}      label="Total Quotes"  value={stats.totalQuotes}           color="#3498db" />
            <StatCard icon={DollarSign} label="Total Revenue" value={fmtMoney(stats.totalRevenue)} color="#7ed957" />
            <StatCard icon={Clock}      label="New"           value={stats.byStatus["new"] ?? 0}         color="#3498db" />
            <StatCard icon={TrendingUp} label="In Review"     value={stats.byStatus["in-review"] ?? 0}   color="#ffb347" />
            <StatCard icon={CheckCircle}label="Quoted"        value={stats.byStatus["quoted"] ?? 0}      color="#7ed957" />
            <StatCard icon={XCircle}    label="Closed"        value={stats.byStatus["closed"] ?? 0}      color="#808080" />
          </div>
        )}

        {/* Filters */}
        <div style={{
          background: "#080d1e", border: "1px solid rgba(52,152,219,0.18)",
          borderRadius: 14, padding: "16px 20px", marginBottom: 18,
          display: "flex", flexWrap: "wrap", gap: 12, alignItems: "center",
        }}>
          <div style={{ position: "relative", flex: "1 1 220px" }}>
            <Search size={14} style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: "#506070" }} />
            <input
              id="admin-search"
              type="search"
              placeholder="Search by name, email, company…"
              value={search}
              onChange={e => setSearch(e.target.value)}
              style={{
                width: "100%", background: "#0d1626", border: "1px solid rgba(52,152,219,0.25)",
                borderRadius: 8, color: "#d0d8e8", padding: "9px 14px 9px 36px",
                fontSize: 13, outline: "none", boxSizing: "border-box",
              }}
            />
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            {(["all", "new", "in-review", "quoted", "closed"] as const).map(s => (
              <button
                key={s}
                onClick={() => setFilterStatus(s)}
                style={{
                  padding: "7px 14px", borderRadius: 20, fontSize: 11, fontWeight: 700,
                  cursor: "pointer", border: "1px solid",
                  color: filterStatus === s ? "#fff" : (s === "all" ? "#708090" : STATUS_META[s as QuoteStatus]?.color ?? "#708090"),
                  background: filterStatus === s
                    ? (s === "all" ? "#3498db" : STATUS_META[s as QuoteStatus]?.color ?? "#3498db")
                    : "transparent",
                  borderColor: s === "all" ? "#3498db40" : (STATUS_META[s as QuoteStatus]?.color ?? "#708090") + "40",
                  textTransform: "capitalize",
                }}
              >
                {s === "all" ? "All" : STATUS_META[s as QuoteStatus]?.label}
              </button>
            ))}
          </div>
        </div>

        {/* Table */}
        {loading ? (
          <div style={{ textAlign: "center", padding: 60, color: "#3498db", fontSize: 14 }}>
            <RefreshCw size={24} style={{ display: "block", margin: "0 auto 12px", animation: "spin 1s linear infinite" }} />
            Loading quotes…
          </div>
        ) : filtered.length === 0 ? (
          <div style={{
            background: "#080d1e", border: "1px solid rgba(52,152,219,0.15)",
            borderRadius: 14, padding: 48, textAlign: "center",
          }}>
            <FileSpreadsheet size={40} color="#3498db" style={{ opacity: 0.4, margin: "0 auto 12px" }} />
            <p style={{ color: "#506070", fontSize: 14, margin: 0 }}>
              {quotes.length === 0 ? "No quotes yet. Submit a quote from the website to get started." : "No quotes match your filters."}
            </p>
          </div>
        ) : (
          <div style={{ background: "#080d1e", border: "1px solid rgba(52,152,219,0.18)", borderRadius: 14, overflow: "hidden" }}>
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
                <thead>
                  <tr style={{ background: "#0a1424", borderBottom: "2px solid rgba(52,152,219,0.25)" }}>
                    {[
                      { key: "submittedAt", label: "Date" },
                      { key: "name",        label: "Client" },
                      { key: null,          label: "Services" },
                      { key: "total",       label: "Total" },
                      { key: null,          label: "Status" },
                      { key: null,          label: "Actions" },
                    ].map(({ key, label }) => (
                      <th
                        key={label}
                        onClick={key ? () => toggleSort(key as typeof sortBy) : undefined}
                        style={{
                          padding: "13px 16px", textAlign: "left",
                          color: "#708090", fontWeight: 700, fontSize: 10,
                          textTransform: "uppercase", letterSpacing: "0.12em",
                          cursor: key ? "pointer" : "default", whiteSpace: "nowrap",
                          userSelect: "none",
                        }}
                      >
                        <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
                          {label}
                          {key && sortBy === key && (
                            sortDir === "asc" ? <ChevronUp size={12} color="#3498db" /> : <ChevronDown size={12} color="#3498db" />
                          )}
                        </span>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((q, i) => (
                    <tr
                      key={q.quoteId}
                      style={{
                        background: i % 2 === 0 ? "transparent" : "#0a1424",
                        borderBottom: "1px solid rgba(30,42,58,0.8)",
                        transition: "background 0.15s",
                      }}
                      onMouseEnter={e => (e.currentTarget.style.background = "rgba(52,152,219,0.07)")}
                      onMouseLeave={e => (e.currentTarget.style.background = i % 2 === 0 ? "transparent" : "#0a1424")}
                    >
                      <td style={{ padding: "13px 16px", color: "#708090", whiteSpace: "nowrap" }}>{fmtDate(q.submittedAt)}</td>
                      <td style={{ padding: "13px 16px" }}>
                        <div style={{ fontWeight: 600, color: "#e0e8f0" }}>{q.name}</div>
                        <div style={{ fontSize: 11, color: "#506070" }}>{q.email}</div>
                        {q.company && <div style={{ fontSize: 11, color: "#506070" }}>{q.company}</div>}
                      </td>
                      <td style={{ padding: "13px 16px" }}>
                        <div style={{ color: "#c0d0e0" }}>{q.selectedServices.length} service{q.selectedServices.length !== 1 ? "s" : ""}</div>
                        <div style={{ fontSize: 11, color: "#506070", maxWidth: 220, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                          {q.selectedServices.map(s => s.name).join(", ")}
                        </div>
                      </td>
                      <td style={{ padding: "13px 16px", fontWeight: 800, fontSize: 15, color: "#7ed957", whiteSpace: "nowrap" }}>
                        {fmtMoney(q.total)}
                      </td>
                      <td style={{ padding: "13px 16px" }}><StatusBadge status={q.status} /></td>
                      <td style={{ padding: "13px 16px" }}>
                        <button
                          onClick={() => setSelectedQuote(q)}
                          style={{
                            background: "rgba(52,152,219,0.12)", border: "1px solid rgba(52,152,219,0.3)",
                            borderRadius: 7, color: "#3498db", padding: "6px 12px", cursor: "pointer",
                            display: "flex", alignItems: "center", gap: 5, fontSize: 11, fontWeight: 600,
                          }}
                        >
                          <Eye size={12} />View
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div style={{ padding: "12px 16px", borderTop: "1px solid rgba(30,42,58,0.8)", fontSize: 11, color: "#506070", textAlign: "right" }}>
              {filtered.length} of {quotes.length} quotes
            </div>
          </div>
        )}
      </div>

      {/* Quote modal */}
      {selectedQuote && (
        <QuoteModal
          quote={selectedQuote}
          password={password}
          onClose={() => setSelectedQuote(null)}
          onUpdated={handleQuoteUpdated}
        />
      )}

      <style>{`
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        * { box-sizing: border-box; }
        ::-webkit-scrollbar { width: 6px; height: 6px; }
        ::-webkit-scrollbar-track { background: #080d1e; }
        ::-webkit-scrollbar-thumb { background: rgba(52,152,219,0.3); border-radius: 3px; }
      `}</style>
    </div>
  );
}
