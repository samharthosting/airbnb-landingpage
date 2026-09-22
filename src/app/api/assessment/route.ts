import { NextResponse } from "next/server";
import { Resend } from "resend";

import { parseAssessmentRequest, validateAssessment } from "@/lib/assessment-request";
import {
  assessmentHtml,
  assessmentSubject,
  assessmentText,
} from "@/lib/emails/assessment-notification";

const GENERIC_ERROR = "Something went wrong on our end and your request didn't send.";

/**
 * Best-effort throttle. Serverless instances don't share memory, so this trims
 * obvious abuse rather than guaranteeing a hard limit.
 */
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, number[]>();

function isRateLimited(key: string): boolean {
  const now = Date.now();
  const recent = (hits.get(key) ?? []).filter((at) => now - at < WINDOW_MS);
  recent.push(now);
  hits.set(key, recent);

  if (hits.size > 500) {
    for (const [ip, times] of hits) {
      if (times.every((at) => now - at >= WINDOW_MS)) hits.delete(ip);
    }
  }

  return recent.length > MAX_PER_WINDOW;
}

function clientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  return request.headers.get("x-real-ip") ?? "unknown";
}

/** Strips anything that could break out of an email header. */
function headerSafe(value: string): string {
  return value.replace(/["<>\r\n]/g, "").trim();
}

export async function POST(request: Request) {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL;

  if (!apiKey || !to || !from) {
    console.error(
      "Assessment form is not configured: set RESEND_API_KEY, CONTACT_TO_EMAIL and CONTACT_FROM_EMAIL.",
    );
    return NextResponse.json({ error: GENERIC_ERROR }, { status: 500 });
  }

  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: GENERIC_ERROR }, { status: 400 });
  }

  // Honeypot: real people never fill this in.
  const honeypot = (payload as { company?: unknown } | null)?.company;
  if (typeof honeypot === "string" && honeypot.trim()) {
    return NextResponse.json({ ok: true });
  }

  if (isRateLimited(clientIp(request))) {
    return NextResponse.json(
      { error: "You've already sent a few requests. Give it a few minutes before trying again." },
      { status: 429 },
    );
  }

  const values = parseAssessmentRequest(payload);
  const errors = validateAssessment(values);
  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ errors }, { status: 400 });
  }

  const sentAt = new Date();
  const resend = new Resend(apiKey);

  try {
    const { data, error } = await resend.emails.send({
      from,
      to: [to],
      replyTo: `${headerSafe(values.name)} <${headerSafe(values.email)}>`,
      subject: assessmentSubject(values),
      html: assessmentHtml(values, sentAt),
      text: assessmentText(values, sentAt),
    });

    if (error) {
      console.error("Resend rejected the assessment email:", error);
      return NextResponse.json({ error: GENERIC_ERROR }, { status: 502 });
    }

    console.log(`Assessment request sent (${data?.id}) for ${values.email}`);
    return NextResponse.json({ ok: true });
  } catch (cause) {
    console.error("Failed to send the assessment email:", cause);
    return NextResponse.json({ error: GENERIC_ERROR }, { status: 500 });
  }
}
