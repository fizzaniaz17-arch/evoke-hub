import { NextRequest, NextResponse } from "next/server";
import { getQuoteById, updateQuote, type QuoteStatus } from "@/lib/quotes-db";
import { rebuildExcel } from "@/lib/quotes-excel";
import { getAllQuotes } from "@/lib/quotes-db";

function isAuthorized(req: NextRequest): boolean {
  const adminPassword = process.env.ADMIN_PASSWORD;
  if (!adminPassword) return false;
  const auth = req.headers.get("authorization") ?? "";
  return auth === `Bearer ${adminPassword}`;
}

/**
 * GET /api/admin/quotes/[id]
 * Returns a single quote by ID.
 */
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { id } = await params;
  const quote = getQuoteById(id);
  if (!quote) return NextResponse.json({ error: "Quote not found." }, { status: 404 });
  return NextResponse.json({ quote });
}

/**
 * PATCH /api/admin/quotes/[id]
 * Update status and/or adminNote for a quote.
 * Body: { status?: QuoteStatus, adminNote?: string }
 */
export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const body = await req.json() as { status?: QuoteStatus; adminNote?: string };

  const allowedStatuses: QuoteStatus[] = ["new", "in-review", "quoted", "closed"];
  if (body.status && !allowedStatuses.includes(body.status)) {
    return NextResponse.json({ error: "Invalid status value." }, { status: 400 });
  }

  const updated = updateQuote(id, {
    ...(body.status    !== undefined ? { status: body.status }       : {}),
    ...(body.adminNote !== undefined ? { adminNote: body.adminNote } : {}),
  });

  if (!updated) return NextResponse.json({ error: "Quote not found." }, { status: 404 });

  // Rebuild Excel after status update
  try {
    await rebuildExcel(getAllQuotes());
  } catch (xlErr) {
    console.error("[Admin PATCH] Excel rebuild failed:", xlErr);
  }

  return NextResponse.json({ quote: updated });
}
