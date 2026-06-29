/**
 * Evoke Hub — Quotes Database (JSON flat-file)
 * All quotes are persisted to `data/quotes-db.json` on the server.
 * This module is server-only (uses `fs`).
 */
import fs from "fs";
import path from "path";

// ── Types ─────────────────────────────────────────────────────────────────────

export type QuoteStatus = "new" | "in-review" | "quoted" | "closed";

export interface QuoteService {
  id: string;
  name: string;
  category: string;
  price: number;
  unit: string;
}

export interface QuoteRecord {
  quoteId: string;
  submittedAt: string;         // ISO 8601
  status: QuoteStatus;
  adminNote: string;

  // Client info
  name: string;
  email: string;
  phone: string;
  company: string;
  message: string;

  // Services
  selectedServices: QuoteService[];
  total: number;
}

// ── Paths ──────────────────────────────────────────────────────────────────────

const DATA_DIR  = path.join(process.cwd(), "data");
const DB_PATH   = path.join(DATA_DIR, "quotes-db.json");

function ensureDataDir() {
  if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
}

// ── Read / Write helpers ───────────────────────────────────────────────────────

function readDb(): QuoteRecord[] {
  ensureDataDir();
  if (!fs.existsSync(DB_PATH)) return [];
  try {
    return JSON.parse(fs.readFileSync(DB_PATH, "utf-8")) as QuoteRecord[];
  } catch {
    return [];
  }
}

function writeDb(records: QuoteRecord[]): void {
  ensureDataDir();
  fs.writeFileSync(DB_PATH, JSON.stringify(records, null, 2), "utf-8");
}

// ── Public API ─────────────────────────────────────────────────────────────────

/** Append a new quote to the DB. Returns the saved record. */
export function saveQuote(quote: QuoteRecord): QuoteRecord {
  const records = readDb();
  records.push(quote);
  writeDb(records);
  return quote;
}

/** Return all quotes, newest first. */
export function getAllQuotes(): QuoteRecord[] {
  return readDb().reverse();
}

/** Return a single quote by ID, or null. */
export function getQuoteById(quoteId: string): QuoteRecord | null {
  return readDb().find(q => q.quoteId === quoteId) ?? null;
}

/** Update status and/or adminNote for a quote. Returns updated record or null. */
export function updateQuote(
  quoteId: string,
  patch: Partial<Pick<QuoteRecord, "status" | "adminNote">>
): QuoteRecord | null {
  const records = readDb();
  const idx = records.findIndex(q => q.quoteId === quoteId);
  if (idx === -1) return null;
  records[idx] = { ...records[idx], ...patch };
  writeDb(records);
  return records[idx];
}

/** Summary statistics for the dashboard. */
export function getQuoteStats() {
  const quotes = readDb();
  const totalRevenue = quotes.reduce((s, q) => s + q.total, 0);
  const byStatus = quotes.reduce(
    (acc, q) => { acc[q.status] = (acc[q.status] ?? 0) + 1; return acc; },
    {} as Record<QuoteStatus, number>
  );
  return {
    totalQuotes: quotes.length,
    totalRevenue,
    byStatus,
  };
}
