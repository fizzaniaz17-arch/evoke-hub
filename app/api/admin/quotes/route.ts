import { NextRequest, NextResponse } from "next/server";
import { getAllQuotes, getQuoteStats } from "@/lib/quotes-db";

/** Simple bearer-token auth check */
function isAuthorized(req: NextRequest): boolean {
  const adminPassword = process.env.ADMIN_PASSWORD;
  if (!adminPassword) return false; // no password set = locked
  const auth = req.headers.get("authorization") ?? "";
  return auth === `Bearer ${adminPassword}`;
}

/**
 * GET /api/admin/quotes
 * Returns all quotes + summary stats.
 * Requires Authorization: Bearer <ADMIN_PASSWORD>
 */
export async function GET(req: NextRequest) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const quotes = getAllQuotes();
    const stats  = getQuoteStats();
    return NextResponse.json({ quotes, stats });
  } catch (err) {
    console.error("[Admin quotes GET]", err);
    return NextResponse.json({ error: "Failed to load quotes." }, { status: 500 });
  }
}
