import Image from "next/image";
import { Reveal } from "../Reveal";

const REASONS = [
  {
    num: "01",
    title: "Higher Income Potential",
    body: "Nightly and weekly rates typically outperform a fixed monthly lease, especially near transit, hospitals, and universities in the Lower Mainland.",
  },
  {
    num: "02",
    title: "You Keep Full Flexibility",
    body: "Block off dates for personal use, family visits, or renovations, something a long-term tenant never allows.",
  },
  {
    num: "03",
    title: "More Eyes On Your Property",
    body: "Frequent professional cleanings between every stay mean issues get caught early, not months later.",
  },
  {
    num: "04",
    title: "Diversified, Year-Round Demand",
    body: "Business travellers, medical visitors, relocating families, and tourists all book short stays across every season.",
  },
];

export function WhyShortTermRentals() {
  return (
    <section className="sec" id="why-str">
      <div className="wrap">
        <Reveal className="section-head">
          <h2 className="headline">Why Homeowners Are Choosing Short-Term Rentals</h2>
          <p className="lede">
            A well-managed short-term rental can outperform a traditional lease, while giving you
            far more control over your own property.
          </p>
        </Reveal>
        <div className="str-grid">
          <Reveal>
            <div
              style={{
                position: "relative",
                aspectRatio: "4 / 5",
                width: "100%",
                borderRadius: "var(--radius-lg)",
                boxShadow: "var(--shadow-md)",
                overflow: "hidden",
              }}
            >
              <Image
                src="/calender.png"
                alt="A packed weekday calendar next to a suitcase and key, symbolizing the flexibility of short-term rental bookings versus a fixed long-term lease"
                fill
                sizes="(max-width: 860px) 100vw, 40vw"
                style={{ objectFit: "cover" }}
              />
            </div>
          </Reveal>
          <Reveal as="div" className="str-list">
            {REASONS.map((reason) => (
              <div className="str-row" key={reason.num}>
                <span className="num">{reason.num}</span>
                <div>
                  <h3>{reason.title}</h3>
                  <p>{reason.body}</p>
                </div>
              </div>
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
