import { Check } from "lucide-react";
import { Reveal } from "../Reveal";
import { AssessmentForm } from "../AssessmentForm";

const INCLUDES = [
  { title: "Estimated Nightly Rate", body: "Based on comparable properties in your neighbourhood." },
  { title: "Estimated Monthly Revenue Range", body: "A realistic range, not a guess, grounded in local market data." },
  { title: "Occupancy Estimate", body: "What booking levels to realistically expect through the year." },
  { title: "Long-Term Rental Comparison", body: "How short-term income stacks up against a traditional lease." },
  { title: "Revenue Recommendations", body: "Practical suggestions to help your property earn more." },
];

export function Assessment() {
  return (
    <section className="sec assess" id="assessment">
      <div className="wrap">
        <Reveal className="section-head center">
          <h2 className="headline">Your Free Property Income Assessment</h2>
          <p className="lede" style={{ marginLeft: "auto", marginRight: "auto" }}>
            In one no-obligation conversation, I&apos;ll personally review your property and the
            local market to show you what it could really earn.
          </p>
        </Reveal>
        <div className="assess-grid">
          <Reveal as="div" className="assess-list">
            {INCLUDES.map((item) => (
              <div className="assess-item" key={item.title}>
                <Check />
                <div>
                  <h4>{item.title}</h4>
                  <p>{item.body}</p>
                </div>
              </div>
            ))}
          </Reveal>
          <Reveal>
            <AssessmentForm />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
