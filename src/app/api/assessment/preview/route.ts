import { assessmentHtml } from "@/lib/emails/assessment-notification";

/**
 * Dev-only preview of the notification email at /api/assessment/preview.
 * Handy when tweaking the template. Safe to delete.
 */
export async function GET() {
  if (process.env.NODE_ENV === "production") {
    return new Response("Not found", { status: 404 });
  }

  return new Response(
    assessmentHtml(
      {
        name: "Marcus Bell",
        email: "marcus.bell@example.com",
        phone: "(604) 555-0148",
        address: "14820 76 Ave, Surrey BC",
        propertyType: "Basement Suite",
        bedrooms: "2",
        bathrooms: "1",
        notes:
          "We finished the suite last spring and it's been sitting empty since our tenant moved out in June.\n\nHonestly not sure if short-term is worth the hassle vs just finding another long-term tenant. Would like to see the numbers before we decide.",
      },
      new Date(),
    ),
    { headers: { "Content-Type": "text/html; charset=utf-8" } },
  );
}
