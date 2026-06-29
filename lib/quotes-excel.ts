/**
 * Evoke Hub — Excel Quote Logger
 * Creates/updates `data/quotes-log.xlsx` using ExcelJS.
 * Server-only module.
 */
import ExcelJS from "exceljs";
import path from "path";
import fs from "fs";
import type { QuoteRecord } from "./quotes-db";

const DATA_DIR   = path.join(process.cwd(), "data");
const EXCEL_PATH = path.join(DATA_DIR, "quotes-log.xlsx");

// ── Column Definitions ─────────────────────────────────────────────────────────

const COLUMNS: ExcelJS.Column[] = [
  { header: "Quote ID",       key: "quoteId",      width: 38 },
  { header: "Submitted At",   key: "submittedAt",  width: 22 },
  { header: "Status",         key: "status",       width: 12 },
  { header: "Client Name",    key: "name",         width: 22 },
  { header: "Email",          key: "email",        width: 30 },
  { header: "Phone",          key: "phone",        width: 18 },
  { header: "Company",        key: "company",      width: 24 },
  { header: "Services",       key: "services",     width: 60 },
  { header: "# Services",     key: "serviceCount", width: 12 },
  { header: "Total (USD)",    key: "total",        width: 14 },
  { header: "Admin Notes",    key: "adminNote",    width: 36 },
  { header: "Message",        key: "message",      width: 50 },
] as ExcelJS.Column[];

// Status → fill colour map
const STATUS_FILLS: Record<string, string> = {
  "new":       "FF3498DB",  // blue
  "in-review": "FFFFB347",  // orange
  "quoted":    "FF7ED957",  // green
  "closed":    "FF808080",  // grey
};

// ── Header styling ─────────────────────────────────────────────────────────────

function styleHeader(row: ExcelJS.Row) {
  row.eachCell(cell => {
    cell.fill   = { type: "pattern", pattern: "solid", fgColor: { argb: "FF0A1830" } };
    cell.font   = { bold: true, color: { argb: "FFFFFFFF" }, size: 11 };
    cell.border = {
      bottom: { style: "medium", color: { argb: "FF3498DB" } },
    };
    cell.alignment = { vertical: "middle", horizontal: "center", wrapText: true };
  });
  row.height = 28;
}

// ── Row styling ────────────────────────────────────────────────────────────────

function styleDataRow(row: ExcelJS.Row, status: string) {
  const isEven = row.number % 2 === 0;
  const bg = isEven ? "FF0D1626" : "FF080d1e";

  row.eachCell({ includeEmpty: true }, (cell, colNum) => {
    cell.fill = { type: "pattern", pattern: "solid", fgColor: { argb: bg } };
    cell.font = { color: { argb: "FFD0D8E8" }, size: 10 };
    cell.alignment = { vertical: "middle", wrapText: colNum === 8 || colNum === 12 };
    cell.border = {
      bottom: { style: "thin", color: { argb: "FF1E2A3A" } },
    };
  });

  // Status cell — column 3
  const statusCell = row.getCell(3);
  const argb = STATUS_FILLS[status] ?? "FF808080";
  statusCell.fill  = { type: "pattern", pattern: "solid", fgColor: { argb } };
  statusCell.font  = { bold: true, color: { argb: "FFFFFFFF" }, size: 10 };
  statusCell.alignment = { horizontal: "center", vertical: "middle" };

  // Total cell — column 10, green bold
  const totalCell = row.getCell(10);
  totalCell.font = { bold: true, color: { argb: "FF7ED957" }, size: 11 };
  totalCell.numFmt = '"$"#,##0.00';
  totalCell.alignment = { horizontal: "right", vertical: "middle" };

  row.height = 22;
}

// ── Main export ────────────────────────────────────────────────────────────────

/** Rebuild the entire Excel file from scratch with all records passed in. */
export async function rebuildExcel(quotes: QuoteRecord[]): Promise<Buffer> {
  if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });

  const wb = new ExcelJS.Workbook();
  wb.creator  = "Evoke Hub System";
  wb.created  = new Date();
  wb.modified = new Date();

  const ws = wb.addWorksheet("Quotes", {
    views: [{ state: "frozen", xSplit: 0, ySplit: 1 }],
    pageSetup: { fitToPage: true, fitToWidth: 1 },
  });

  ws.columns = COLUMNS;

  // Header row
  const headerRow = ws.getRow(1);
  styleHeader(headerRow);
  headerRow.commit();

  // Data rows
  for (const q of quotes) {
    const row = ws.addRow({
      quoteId:      q.quoteId,
      submittedAt:  q.submittedAt,
      status:       q.status,
      name:         q.name,
      email:        q.email,
      phone:        q.phone || "—",
      company:      q.company || "—",
      services:     q.selectedServices.map(s => `${s.name} (${s.category})`).join(" | "),
      serviceCount: q.selectedServices.length,
      total:        q.total,
      adminNote:    q.adminNote || "",
      message:      q.message || "",
    });
    styleDataRow(row, q.status);
    row.commit();
  }

  // Summary row at the bottom
  if (quotes.length > 0) {
    ws.addRow({});
    const sumRow = ws.addRow({
      name:  `Total Quotes: ${quotes.length}`,
      total: quotes.reduce((s, q) => s + q.total, 0),
    });
    sumRow.getCell(4).font  = { bold: true, color: { argb: "FF3498DB" }, size: 11 };
    sumRow.getCell(10).font = { bold: true, color: { argb: "FF7ED957" }, size: 12 };
    sumRow.getCell(10).numFmt = '"$"#,##0.00';
    sumRow.height = 24;
    sumRow.commit();
  }

  // Save to disk
  await wb.xlsx.writeFile(EXCEL_PATH);

  // Return as buffer (for email attachment)
  const buffer = await wb.xlsx.writeBuffer();
  return Buffer.from(buffer);
}

/** Append a single new quote row and save.  Falls back to full rebuild if needed. */
export async function appendQuoteToExcel(
  quote: QuoteRecord,
  allQuotes: QuoteRecord[]
): Promise<Buffer> {
  // Always rebuild so formatting stays consistent and summary row is updated
  return rebuildExcel(allQuotes);
}

/** Return the Excel file path (for streaming downloads). */
export function getExcelPath(): string {
  return EXCEL_PATH;
}
