import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { v4 as uuidv4 } from "uuid";
import { saveQuote, getAllQuotes, type QuoteRecord } from "@/lib/quotes-db";
import { appendQuoteToExcel } from "@/lib/quotes-excel";

export interface QuotePayload {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  message?: string;
  selectedServices: Array<{
    id: string;
    name: string;
    category: string;
    price: number;
    unit: string;
  }>;
  total: number;
}

/* ── build the HTML email bodies ── */
function buildAdminEmail(data: QuotePayload, quoteId: string): string {
  const rows = data.selectedServices
    .map(
      s => `
      <tr>
        <td style="padding:10px 14px;border-bottom:1px solid #1e2a3a;">${s.name}</td>
        <td style="padding:10px 14px;border-bottom:1px solid #1e2a3a;color:#7ed957;">${s.category}</td>
        <td style="padding:10px 14px;border-bottom:1px solid #1e2a3a;text-align:right;font-weight:700;">$${s.price.toLocaleString()}${s.unit}</td>
      </tr>`
    )
    .join("");

  return `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><title>New Quote Request</title></head>
<body style="margin:0;padding:0;background:#04070f;font-family:'Segoe UI',Arial,sans-serif;color:#e0e0e0;">
  <div style="max-width:640px;margin:40px auto;background:#080d1e;border-radius:16px;overflow:hidden;border:1px solid rgba(52,152,219,0.25);">
    <!-- Header -->
    <div style="background:linear-gradient(135deg,#0f2040,#0a1830);padding:32px 40px;border-bottom:2px solid #3498db;">
      <h1 style="margin:0;font-size:22px;font-weight:800;color:#ffffff;letter-spacing:0.05em;">🔔 NEW QUOTE REQUEST</h1>
      <p style="margin:8px 0 0;color:#3498db;font-size:13px;">Evoke Hub — Admin Notification</p>
      <p style="margin:6px 0 0;font-size:11px;color:#506070;font-family:monospace;">Quote ID: ${quoteId}</p>
    </div>
    <!-- Client info -->
    <div style="padding:28px 40px;border-bottom:1px solid #1e2a3a;">
      <h2 style="margin:0 0 16px;font-size:15px;font-weight:700;text-transform:uppercase;letter-spacing:0.12em;color:#3498db;">Client Details</h2>
      <table style="width:100%;border-collapse:collapse;">
        <tr><td style="padding:6px 0;color:#a0a0b0;width:120px;">Name</td><td style="padding:6px 0;font-weight:600;">${data.name}</td></tr>
        <tr><td style="padding:6px 0;color:#a0a0b0;">Email</td><td style="padding:6px 0;"><a href="mailto:${data.email}" style="color:#3498db;">${data.email}</a></td></tr>
        ${data.phone ? `<tr><td style="padding:6px 0;color:#a0a0b0;">Phone</td><td style="padding:6px 0;">${data.phone}</td></tr>` : ""}
        ${data.company ? `<tr><td style="padding:6px 0;color:#a0a0b0;">Company</td><td style="padding:6px 0;">${data.company}</td></tr>` : ""}
      </table>
      ${data.message ? `<div style="margin-top:16px;padding:14px;background:#0d1626;border-radius:8px;border-left:3px solid #3498db;font-size:13px;line-height:1.6;color:#c0c8d8;">${data.message}</div>` : ""}
    </div>
    <!-- Services -->
    <div style="padding:28px 40px;border-bottom:1px solid #1e2a3a;">
      <h2 style="margin:0 0 16px;font-size:15px;font-weight:700;text-transform:uppercase;letter-spacing:0.12em;color:#3498db;">Requested Services</h2>
      <table style="width:100%;border-collapse:collapse;font-size:13px;">
        <thead>
          <tr style="background:#0d1626;">
            <th style="padding:10px 14px;text-align:left;color:#a0a0b0;font-weight:600;">Service</th>
            <th style="padding:10px 14px;text-align:left;color:#a0a0b0;font-weight:600;">Category</th>
            <th style="padding:10px 14px;text-align:right;color:#a0a0b0;font-weight:600;">Price</th>
          </tr>
        </thead>
        <tbody>${rows}</tbody>
      </table>
    </div>
    <!-- Total -->
    <div style="padding:24px 40px;background:#0d1626;display:flex;justify-content:space-between;align-items:center;">
      <span style="font-size:16px;font-weight:700;color:#ffffff;">ESTIMATED TOTAL</span>
      <span style="font-size:24px;font-weight:900;color:#7ed957;">$${data.total.toLocaleString()}</span>
    </div>
    <!-- Admin link -->
    <div style="padding:20px 40px;text-align:center;border-top:1px solid #1e2a3a;">
      <p style="margin:0;font-size:12px;color:#708090;">Manage this quote in the <a href="${process.env.SITE_URL ?? "http://localhost:3000"}/admin" style="color:#3498db;">Admin Dashboard</a></p>
    </div>
    <!-- Footer -->
    <div style="padding:20px 40px;text-align:center;font-size:11px;color:#505870;">
      Evoke Hub Admin System &nbsp;·&nbsp; ${new Date().toLocaleString()}
    </div>
  </div>
</body>
</html>`;
}

function buildClientEmail(data: QuotePayload, quoteId: string): string {
  const rows = data.selectedServices
    .map(
      s => `
      <tr>
        <td style="padding:12px 16px;border-bottom:1px solid #1e2a3a;">
          <div style="font-weight:600;color:#ffffff;margin-bottom:3px;">${s.name}</div>
          <div style="font-size:11px;color:#7090b0;">${s.category}</div>
        </td>
        <td style="padding:12px 16px;border-bottom:1px solid #1e2a3a;text-align:right;font-weight:700;font-size:15px;color:#7ed957;">$${s.price.toLocaleString()}<span style="font-size:11px;color:#a0a8b0;">${s.unit}</span></td>
      </tr>`
    )
    .join("");

  return `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><title>Your Evoke Hub Quote</title></head>
<body style="margin:0;padding:0;background:#04070f;font-family:'Segoe UI',Arial,sans-serif;color:#e0e0e0;">
  <div style="max-width:640px;margin:40px auto;background:#080d1e;border-radius:16px;overflow:hidden;border:1px solid rgba(52,152,219,0.2);">
    <!-- Header -->
    <div style="background:linear-gradient(135deg,#0f2040 0%,#0a1830 100%);padding:40px;text-align:center;border-bottom:2px solid rgba(52,152,219,0.4);">
      <h1 style="margin:0 0 8px;font-size:26px;font-weight:900;color:#ffffff;letter-spacing:0.04em;">EVOKE HUB</h1>
      <p style="margin:0;color:#3498db;font-size:13px;font-weight:600;letter-spacing:0.15em;text-transform:uppercase;">Premium Digital Creative Agency</p>
    </div>
    <!-- Greeting -->
    <div style="padding:32px 40px;border-bottom:1px solid #1e2a3a;">
      <h2 style="margin:0 0 12px;font-size:20px;font-weight:700;color:#ffffff;">Hello, ${data.name}! 👋</h2>
      <p style="margin:0 0 12px;font-size:14px;line-height:1.75;color:#a0a8b8;">
        Thank you for reaching out to Evoke Hub. We've received your quote request and our team will review it shortly.
        Below is a detailed summary of the services you've selected along with estimated pricing.
      </p>
      <p style="margin:0;font-size:12px;color:#506070;">Your quote reference: <strong style="color:#3498db;font-family:monospace;">${quoteId}</strong></p>
    </div>
    <!-- Services breakdown -->
    <div style="padding:28px 40px;border-bottom:1px solid #1e2a3a;">
      <h3 style="margin:0 0 16px;font-size:13px;font-weight:700;text-transform:uppercase;letter-spacing:0.15em;color:#3498db;">📋 Services Selected</h3>
      <table style="width:100%;border-collapse:collapse;font-size:13px;">
        <tbody>${rows}</tbody>
      </table>
    </div>
    <!-- Total -->
    <div style="padding:24px 40px;background:linear-gradient(135deg,#0d1a10,#0d1626);border-bottom:1px solid #1e2a3a;">
      <div style="display:flex;justify-content:space-between;align-items:center;">
        <div>
          <div style="font-size:11px;color:#708090;font-weight:600;letter-spacing:0.12em;text-transform:uppercase;margin-bottom:4px;">Estimated Total</div>
          <div style="font-size:11px;color:#708090;">*Final price confirmed after scope discussion</div>
        </div>
        <div style="font-size:32px;font-weight:900;color:#7ed957;">$${data.total.toLocaleString()}</div>
      </div>
    </div>
    <!-- Next steps -->
    <div style="padding:28px 40px;border-bottom:1px solid #1e2a3a;">
      <h3 style="margin:0 0 16px;font-size:13px;font-weight:700;text-transform:uppercase;letter-spacing:0.15em;color:#3498db;">🚀 What Happens Next?</h3>
      <ol style="margin:0;padding-left:20px;font-size:13px;line-height:2;color:#a0a8b8;">
        <li>Our team reviews your request within <strong style="color:#ffffff;">24–48 hours</strong></li>
        <li>We'll schedule a <strong style="color:#ffffff;">free discovery call</strong> to discuss your goals</li>
        <li>A detailed proposal with timeline &amp; scope will be sent to you</li>
        <li>Upon agreement, we kickstart your project with a dedicated account manager</li>
      </ol>
    </div>
    ${data.message ? `
    <div style="padding:20px 40px;border-bottom:1px solid #1e2a3a;">
      <h3 style="margin:0 0 10px;font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:0.12em;color:#708090;">Your Message</h3>
      <p style="margin:0;font-size:13px;line-height:1.7;color:#a0a8b8;font-style:italic;">"${data.message}"</p>
    </div>` : ""}
    <!-- CTA -->
    <div style="padding:32px 40px;text-align:center;border-bottom:1px solid #1e2a3a;">
      <a href="mailto:support@evokehub.com" style="display:inline-block;padding:14px 36px;background:linear-gradient(135deg,#1a5276,#3498db);color:#ffffff;text-decoration:none;border-radius:999px;font-weight:600;font-size:14px;letter-spacing:0.05em;">✉️ REPLY TO THIS EMAIL</a>
      <p style="margin:16px 0 0;font-size:12px;color:#506070;">support@evokehub.com &nbsp;·&nbsp; www.evokehub.com</p>
    </div>
    <!-- Footer -->
    <div style="padding:20px 40px;text-align:center;font-size:11px;color:#405060;line-height:1.8;">
      © ${new Date().getFullYear()} Evoke Hub. All rights reserved.<br/>
      You received this email because you submitted a quote request on our website.
    </div>
  </div>
</body>
</html>`;
}

export async function POST(req: NextRequest) {
  try {
    const data: QuotePayload = await req.json();

    // ── Validate ──────────────────────────────────────────────────────────────
    if (!data.name?.trim() || !data.email?.trim() || !data.selectedServices?.length) {
      return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      return NextResponse.json({ error: "Invalid email address." }, { status: 400 });
    }

    // ── Persist to DB ──────────────────────────────────────────────────────────
    const quoteId = uuidv4();
    const quoteRecord: QuoteRecord = {
      quoteId,
      submittedAt: new Date().toISOString(),
      status: "new",
      adminNote: "",
      name: data.name.trim(),
      email: data.email.trim(),
      phone: data.phone?.trim() ?? "",
      company: data.company?.trim() ?? "",
      message: data.message?.trim() ?? "",
      selectedServices: data.selectedServices,
      total: data.total,
    };

    saveQuote(quoteRecord);

    // ── Generate / update Excel ────────────────────────────────────────────────
    let excelBuffer: Buffer | null = null;
    try {
      const allQuotes = getAllQuotes();
      excelBuffer = await appendQuoteToExcel(quoteRecord, allQuotes);
    } catch (xlErr) {
      console.error("[Quote API] Excel generation failed:", xlErr);
    }

    // ── Check Resend API key ────────────��──────────────────────────────────────
    const RESEND_API_KEY = process.env.RESEND_API_KEY;

    if (!RESEND_API_KEY || RESEND_API_KEY === "re_paste_your_key_here") {
      console.warn("[Quote API] Resend API key not configured — email not sent. Quote ID:", quoteId);
      return NextResponse.json({
        success: true,
        dev: true,
        quoteId,
        message: "Quote saved! (Email sending requires RESEND_API_KEY in .env.local)",
      });
    }

    const resend = new Resend(RESEND_API_KEY);

    const fromAddress = `${process.env.FROM_NAME ?? "Evoke Hub"} <${process.env.FROM_EMAIL ?? "onboarding@resend.dev"}>`;
    const adminTo = process.env.ADMIN_EMAIL ?? "delivered@resend.dev";

    console.log("[Quote API] Sending emails via Resend:");
    console.log("  from:      ", fromAddress);
    console.log("  admin to:  ", adminTo);
    console.log("  client to: ", data.email);

    // Build attachments — include Excel if we have it
    type ResendAttachment = { filename: string; content: Buffer; contentType: string };
    const attachments: ResendAttachment[] = excelBuffer
      ? [{
        filename: `Evoke-Hub-Quotes-${new Date().toISOString().slice(0, 10)}.xlsx`,
        content: excelBuffer,
        contentType: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      }]
      : [];

    // ── Send admin notification ────────────────────────────────────────────────
    const adminResult = await resend.emails.send({
      from: fromAddress,
      to: [adminTo],
      replyTo: data.email,
      subject: `🔔 New Quote — ${data.name} | $${data.total.toLocaleString()} | ${data.selectedServices.length} service(s)`,
      html: buildAdminEmail(data, quoteId),
      attachments,
    });

    if (adminResult.error) {
      console.error("[Quote API] Admin email FAILED:", JSON.stringify(adminResult.error, null, 2));
    } else {
      console.log("[Quote API] Admin email sent ✓ id:", adminResult.data?.id);
    }

    // ── Send customer confirmation ─────────────────────────────────────────────
    // Resend sandbox restriction: without a verified domain, emails can only be
    // delivered to the account owner's address (adminTo). We route the client
    // confirmation through the admin inbox with replyTo = client's address so
    // the admin can forward/reply instantly. Once a domain is verified on
    // resend.com/domains, remove the `to: [adminTo]` workaround and restore
    // `to: [data.email]`.
    const clientEmailTo = adminTo; // ← change to data.email after domain verification
    const clientResult = await resend.emails.send({
      from: fromAddress,
      to: [clientEmailTo],
      replyTo: data.email,
      subject: `[FORWARD TO CLIENT] Quote for ${data.name} <${data.email}> — $${data.total.toLocaleString()}`,
      html: buildClientEmail(data, quoteId),
    });

    if (clientResult.error) {
      console.error("[Quote API] Client email FAILED:", JSON.stringify(clientResult.error, null, 2));
    } else {
      console.log("[Quote API] Client email sent ✓ id:", clientResult.data?.id, `(routed to admin — forward to ${data.email})`);
    }

    const emailFailed = !!(adminResult.error && clientResult.error);
    return NextResponse.json({
      success: true,
      quoteId,
      emailFailed,
      message: emailFailed
        ? "Quote saved! Email delivery failed — our team will contact you shortly."
        : "Quote sent successfully.",
    });

  } catch (err: unknown) {
    console.error("[Quote API] Error:", err);
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: "Failed to send quote.", detail: message }, { status: 500 });
  }
}
