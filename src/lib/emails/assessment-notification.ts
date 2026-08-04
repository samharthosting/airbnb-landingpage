import type { AssessmentRequest } from "@/lib/assessment-request";

/* Brand tokens, mirrored from globals.css. Email needs literal hex — no vars. */
const INK = "#1f2933";
const INK_SOFT = "#5c666f";
const INK_FAINT = "#98a0a7";
const SAND = "#f5f5f5";
const PAPER = "#ffffff";
const LINE = "#e2e4e6";
const CRIMSON = "#a32020";
const CRIMSON_LINE = "#d4a5a5";

/* Montserrat/Open Sans where the client supports webfonts, Helvetica elsewhere. */
const HEAD = "'Montserrat','Helvetica Neue',Helvetica,Arial,sans-serif";
const BODY = "'Open Sans','Helvetica Neue',Helvetica,Arial,sans-serif";

const PHONE = "(604) 996-4541";

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function firstName(fullName: string): string {
  return fullName.trim().split(/\s+/)[0] || fullName.trim();
}

function shorten(value: string, max: number): string {
  const clean = value.trim();
  return clean.length > max ? `${clean.slice(0, max - 1).trimEnd()}…` : clean;
}

function formatSentAt(date: Date): string {
  const day = new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    timeZone: "America/Vancouver",
  }).format(date);
  const time = new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "2-digit",
    timeZoneName: "short",
    timeZone: "America/Vancouver",
  }).format(date);
  return `${day} at ${time}`;
}

function formatSize(bedrooms: string, bathrooms: string): string | null {
  const parts: string[] = [];
  if (bedrooms) parts.push(`${bedrooms} bed${Number(bedrooms) === 1 ? "" : "s"}`);
  if (bathrooms) parts.push(`${bathrooms} bath${Number(bathrooms) === 1 ? "" : "s"}`);
  return parts.length ? parts.join(" · ") : null;
}

function telHref(phone: string): string {
  return `tel:${phone.replace(/[^\d+]/g, "")}`;
}

type Row = { label: string; text: string; html?: string };

function link(href: string, label: string): string {
  return `<a href="${encodeURI(href)}" style="color:${INK};text-decoration:none;border-bottom:1px solid ${CRIMSON_LINE};">${escapeHtml(label)}</a>`;
}

function buildRows(values: AssessmentRequest): Row[] {
  const rows: Row[] = [
    { label: "Email", text: values.email, html: link(`mailto:${values.email}`, values.email) },
    { label: "Phone", text: values.phone, html: link(telHref(values.phone), values.phone) },
    { label: "Address", text: values.address },
  ];

  if (values.propertyType) {
    rows.push({ label: "Property type", text: values.propertyType });
  }

  const size = formatSize(values.bedrooms, values.bathrooms);
  if (size) rows.push({ label: "Size", text: size });

  return rows;
}

export function assessmentSubject(values: AssessmentRequest): string {
  return `Assessment request: ${values.name} — ${shorten(values.address, 44)}`;
}

export function assessmentText(values: AssessmentRequest, sentAt: Date): string {
  const rows = buildRows(values);
  const width = Math.max(...rows.map((row) => row.label.length)) + 2;
  const lines = rows.map((row) => `${(row.label + ":").padEnd(width)}${row.text}`);

  const body = [
    "HART HOSTING — NEW ASSESSMENT REQUEST",
    "",
    `${values.name} asked for an income assessment on ${shorten(values.address, 60)}.`,
    `Sent ${formatSentAt(sentAt)}.`,
    "",
    ...lines,
  ];

  if (values.notes) {
    body.push("", "In their words:", values.notes);
  }

  body.push(
    "",
    `Reply to this email and it goes straight to ${firstName(values.name)}, or call ${values.phone}.`,
    "",
    "—",
    "Sent by the assessment form on harthosting.ca",
    "Hart Hosting · Co-Host & Property Management · Surrey & the Lower Mainland, BC",
  );

  return body.join("\n");
}

export function assessmentHtml(values: AssessmentRequest, sentAt: Date): string {
  const built = buildRows(values);
  const rows = built
    .map((row, index) => {
      const rule = index === built.length - 1 ? "none" : `1px solid ${LINE}`;
      return `
                  <tr>
                    <td class="lbl" style="width:126px;padding:13px 18px 13px 0;border-bottom:${rule};font-family:${BODY};font-size:11px;font-weight:700;line-height:18px;letter-spacing:0.16em;text-transform:uppercase;color:${INK_SOFT};vertical-align:middle;">${escapeHtml(row.label)}</td>
                    <td class="val" style="padding:13px 0;border-bottom:${rule};font-family:${HEAD};font-size:17px;font-weight:500;line-height:26px;color:${INK};vertical-align:middle;">${row.html ?? escapeHtml(row.text)}</td>
                  </tr>`;
    })
    .join("");

  const notes = values.notes
    ? `
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-top:30px;">
                  <tr>
                    <td style="background:${SAND};border-left:2px solid ${CRIMSON};border-radius:0 10px 10px 0;padding:20px 24px;">
                      <p style="margin:0 0 8px;font-family:${BODY};font-size:11px;font-weight:700;line-height:18px;letter-spacing:0.16em;text-transform:uppercase;color:${INK_SOFT};">In their words</p>
                      <p style="margin:0;font-family:${BODY};font-size:15.5px;font-weight:400;line-height:26px;color:${INK};">${escapeHtml(values.notes).replace(/\r?\n/g, "<br />")}</p>
                    </td>
                  </tr>
                </table>`
    : "";

  const preheader = escapeHtml(
    [values.address, values.phone, values.propertyType].filter(Boolean).join("  ·  "),
  );

  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="color-scheme" content="light" />
    <meta name="supported-color-schemes" content="light" />
    <title>${escapeHtml(assessmentSubject(values))}</title>
    <link
      href="https://fonts.googleapis.com/css2?family=Montserrat:wght@500;700;800&amp;family=Open+Sans:wght@400;600;700&amp;display=swap"
      rel="stylesheet"
    />
    <style>
      a { color: ${INK}; }
      @media only screen and (max-width: 480px) {
        .sheet { padding: 30px 24px 32px !important; }
        .h1 { font-size: 23px !important; line-height: 31px !important; }
        .lbl {
          display: block !important;
          width: auto !important;
          padding: 14px 0 1px !important;
          border-bottom: 0 !important;
        }
        .val { display: block !important; padding: 0 0 14px !important; }
      }
    </style>
  </head>
  <body style="margin:0;padding:0;background:${SAND};">
    <div style="display:none;max-height:0;overflow:hidden;opacity:0;">${preheader}</div>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:${SAND};">
      <tr>
        <td align="center" style="padding:32px 16px 40px;">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:600px;">
            <tr>
              <td class="sheet" style="background:${PAPER};border:1px solid ${LINE};border-radius:16px;padding:40px 44px 42px;">

                <p style="margin:0;font-family:${HEAD};font-size:19px;font-weight:800;line-height:26px;letter-spacing:0.04em;color:${INK};">
                  <span style="color:${CRIMSON};">Hart</span> Hosting
                </p>
                <p style="margin:3px 0 0;font-family:${BODY};font-size:9.5px;font-weight:400;line-height:16px;letter-spacing:0.28em;text-transform:uppercase;color:${INK_FAINT};">
                  Co-Host &amp; Property Management
                </p>

                <div style="height:1px;line-height:1px;font-size:0;background:${LINE};margin:26px 0 30px;">&nbsp;</div>

                <table role="presentation" cellpadding="0" cellspacing="0" border="0">
                  <tr>
                    <td style="width:28px;vertical-align:middle;">
                      <div style="height:1px;line-height:1px;font-size:0;background:${CRIMSON_LINE};">&nbsp;</div>
                    </td>
                    <td style="padding-left:12px;font-family:${HEAD};font-size:11px;font-weight:700;line-height:16px;letter-spacing:0.22em;text-transform:uppercase;color:${CRIMSON};vertical-align:middle;">
                      New assessment request
                    </td>
                  </tr>
                </table>

                <h1 class="h1" style="margin:16px 0 0;font-family:${HEAD};font-size:27px;font-weight:800;line-height:35px;letter-spacing:-0.01em;color:${INK};">
                  ${escapeHtml(values.name)} asked for an income assessment.
                </h1>
                <p style="margin:12px 0 0;font-family:${BODY};font-size:14px;font-weight:400;line-height:22px;color:${INK_FAINT};">
                  Sent ${escapeHtml(formatSentAt(sentAt))}
                </p>

                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-top:28px;">${rows}
                </table>
                ${notes}

                <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin-top:34px;">
                  <tr>
                    <td style="background:${CRIMSON};border-radius:999px;">
                      <a href="mailto:${encodeURI(values.email)}?subject=${encodeURIComponent(`Your property assessment — ${values.address}`)}" style="display:inline-block;padding:15px 32px;font-family:${HEAD};font-size:13px;font-weight:600;line-height:16px;letter-spacing:0.02em;color:#ffffff;text-decoration:none;">
                        Reply to ${escapeHtml(firstName(values.name))}
                      </a>
                    </td>
                  </tr>
                </table>
                <p style="margin:14px 0 0;font-family:${BODY};font-size:13.5px;font-weight:400;line-height:22px;color:${INK_SOFT};">
                  Or call them at <a href="${encodeURI(telHref(values.phone))}" style="color:${INK};text-decoration:none;border-bottom:1px solid ${CRIMSON_LINE};">${escapeHtml(values.phone)}</a>.
                </p>

              </td>
            </tr>
          </table>

          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:600px;">
            <tr>
              <td align="center" style="padding:22px 24px 0;">
                <p style="margin:0;font-family:${BODY};font-size:12px;font-weight:400;line-height:20px;color:${INK_FAINT};">
                  Sent by the assessment form on harthosting.ca
                </p>
                <p style="margin:4px 0 0;font-family:${BODY};font-size:12px;font-weight:400;line-height:20px;color:${INK_FAINT};">
                  Surrey &amp; the Lower Mainland, BC · ${PHONE}
                </p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}
