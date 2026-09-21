import { NextResponse } from "next/server";
import { Resend } from "resend";

const MAX_FIELD = 200;
const MAX_NOTES = 4000;

type Payload = Record<string, unknown>;

function text(value: unknown, max = MAX_FIELD) {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

const HTML_ESCAPES: Record<string, string> = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;",
};

/** Submitted values land in an HTML email, so they must never be interpolated raw. */
function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, (c) => HTML_ESCAPES[c]);
}

function validate(values: {
  name: string;
  email: string;
  phone: string;
  address: string;
}) {
  const errors: string[] = [];
  if (!values.name) errors.push("name");
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) errors.push("email");
  if (values.phone.replace(/\D/g, "").length < 10) errors.push("phone");
  if (!values.address) errors.push("address");
  return errors;
}

export async function POST(request: Request) {
  let body: Payload;
  try {
    body = (await request.json()) as Payload;
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  // Honeypot: report success so bots don't learn they were caught.
  if (text(body.company)) {
    return NextResponse.json({ ok: true });
  }

  const values = {
    name: text(body.name),
    email: text(body.email),
    phone: text(body.phone),
    address: text(body.address),
    propertyType: text(body.propertyType),
    bedrooms: text(body.bedrooms, 10),
    bathrooms: text(body.bathrooms, 10),
    notes: text(body.notes, MAX_NOTES),
  };

  const invalid = validate(values);
  if (invalid.length > 0) {
    return NextResponse.json(
      { ok: false, error: "Please check the highlighted fields.", fields: invalid },
      { status: 400 },
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL;

  if (!apiKey || !to || !from) {
    console.error("[assessment] Missing email env vars", {
      RESEND_API_KEY: Boolean(apiKey),
      CONTACT_TO_EMAIL: Boolean(to),
      CONTACT_FROM_EMAIL: Boolean(from),
    });
    return NextResponse.json(
      { ok: false, error: "We couldn't send that just now. Please try again shortly." },
      { status: 500 },
    );
  }

  const rows: [string, string][] = [
    ["Name", values.name],
    ["Email", values.email],
    ["Phone", values.phone],
    ["Property address", values.address],
    ["Property type", values.propertyType || "Not provided"],
    ["Bedrooms", values.bedrooms || "Not provided"],
    ["Bathrooms", values.bathrooms || "Not provided"],
  ];

  const html = `
    <div style="font-family:system-ui,-apple-system,Segoe UI,sans-serif;font-size:15px;color:#1f2933">
      <h2 style="margin:0 0 4px">New assessment request</h2>
      <p style="margin:0 0 20px;color:#6b7280">From the Hart Hosting website</p>
      <table cellpadding="0" cellspacing="0" style="border-collapse:collapse;width:100%;max-width:560px">
        ${rows
          .map(
            ([label, value]) => `
          <tr>
            <td style="padding:8px 16px 8px 0;color:#6b7280;white-space:nowrap;vertical-align:top;border-bottom:1px solid #e5e7eb">${escapeHtml(label)}</td>
            <td style="padding:8px 0;border-bottom:1px solid #e5e7eb"><strong>${escapeHtml(value)}</strong></td>
          </tr>`,
          )
          .join("")}
      </table>
      ${
        values.notes
          ? `<p style="margin:20px 0 6px;color:#6b7280">About the property</p>
             <p style="margin:0;white-space:pre-line">${escapeHtml(values.notes)}</p>`
          : ""
      }
      <p style="margin:24px 0 0;color:#6b7280;font-size:13px">Reply directly to this email to reach ${escapeHtml(values.name)}.</p>
    </div>`;

  const plain = [
    "New assessment request (Hart Hosting website)",
    "",
    ...rows.map(([label, value]) => `${label}: ${value}`),
    values.notes ? `\nAbout the property:\n${values.notes}` : "",
  ].join("\n");

  try {
    const resend = new Resend(apiKey);
    const { data, error } = await resend.emails.send({
      from,
      to: [to],
      replyTo: values.email,
      subject: `New assessment request - ${values.name}`,
      html,
      text: plain,
    });

    if (error) {
      console.error("[assessment] Resend rejected the send:", error);
      return NextResponse.json(
        { ok: false, error: "We couldn't send that just now. Please try again shortly." },
        { status: 502 },
      );
    }

    console.log("[assessment] Sent", data?.id);
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[assessment] Unexpected send failure:", err);
    return NextResponse.json(
      { ok: false, error: "We couldn't send that just now. Please try again shortly." },
      { status: 500 },
    );
  }
}
