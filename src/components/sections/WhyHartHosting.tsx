import { Reveal } from "../Reveal";

const POINTS = [
  { num: "01", title: "Owner-Operated", body: "You work directly with Sam, not a franchise or call centre." },
  { num: "02", title: "Local Expertise", body: "Deep knowledge of Surrey & the Lower Mainland's short-term rental regulations and demand patterns." },
  { num: "03", title: "Transparent Reporting", body: "Clear, honest updates on income, occupancy, and expenses. No surprises." },
  { num: "04", title: "Property-First Mindset", body: "Every property is managed like Sam's own, with the same care and attention to detail." },
];

export function WhyHartHosting() {
  return (
    <section className="sec why-hart" id="why-hart">
      <div className="wrap">
        <Reveal as="div" className="why-hart-grid">
          <div className="why-hart-intro">
            <h2 className="headline">
              Why Choose <em>Hart Hosting</em>
            </h2>
            <p className="lede">
              You have options for who manages your property. Here&apos;s why homeowners choose
              to work with me directly.
            </p>
          </div>
          <div className="why-hart-features">
            {POINTS.map((point) => (
              <div className="why-feature" key={point.num}>
                <span className="why-num">{point.num}</span>
                <div>
                  <h3>{point.title}</h3>
                  <p>{point.body}</p>
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
