import { NextRequest, NextResponse } from "next/server";
import { getAllQuotes } from "@/lib/quotes-db";
import { rebuildExcel } from "@/lib/quotes-excel";

function isAuthorized(req: NextRequest): boolean {
  const adminPassword = process.env.ADMIN_PASSWORD;
  if (!adminPassword) return false;
  const auth = req.headers.get("authorization") ?? "";
  return auth === `Bearer ${adminPassword}`;
}

/**
 * GET /api/admin/quotes/export
 * Streams the up-to-date quotes-log.xlsx as a file download.
 * Requires Authorization: Bearer <ADMIN_PASSWORD>
 */
export async function GET(req: NextRequest) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const allQuotes = getAllQuotes();
    const buffer    = await rebuildExcel(allQuotes);

    const filename = `Evoke-Hub-Quotes-${new Date().toISOString().slice(0, 10)}.xlsx`;

    return new NextResponse(new Uint8Array(buffer), {
      status: 200,
      headers: {
        "Content-Type":        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "Content-Disposition": `attachment; filename="${filename}"`,
        "Cache-Control":       "no-store",
      },
    });
  } catch (err) {
    console.error("[Export] Error:", err);
    return NextResponse.json({ error: "Failed to generate Excel export." }, { status: 500 });
  }
}
