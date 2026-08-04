import { Reveal } from "../Reveal";

const CONTACT_ROWS = [
  {
    label: "Call or Text",
    value: <a href="tel:+16049964541">(604) 996-4541</a>,
  },
  {
    label: "Email",
    value: <a href="mailto:sam@harthosting.ca">sam@harthosting.ca</a>,
  },
  {
    label: "Service Area",
    value: "Surrey & the Lower Mainland, BC",
  },
];

export function Contact() {
  return (
    <section className="sec" id="contact">
      <div className="wrap">
        <Reveal className="section-head center">
          <h2 className="headline">Let&apos;s Talk About Your Property</h2>
          <p className="lede" style={{ marginLeft: "auto", marginRight: "auto" }}>
            Prefer to talk it through first? Reach out directly, or request your free assessment
            above.
          </p>
        </Reveal>
        <Reveal as="div" className="contact-rows">
          {CONTACT_ROWS.map((row) => (
            <div className="contact-row" key={row.label}>
              <span className="label">{row.label}</span>
              <span className="value">{row.value}</span>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
