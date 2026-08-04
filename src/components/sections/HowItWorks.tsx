import { Reveal } from "../Reveal";
import HowItWorksCards, { type Step } from "../ui/how-it-works";

const STEPS: Step[] = [
  {
    title: "Free Assessment",
    description: "I review your property and the local market to estimate its real income potential.",
    colorTheme: "crimson",
  },
  {
    title: "Custom Setup",
    description: "Photography guidance, listing copy, pricing strategy, and house rules built around your property.",
    colorTheme: "charcoal",
  },
  {
    title: "We Manage Everything",
    description: "Guest messaging, check-ins, cleaning coordination, and calendars, handled day to day.",
    colorTheme: "crimson",
  },
  {
    title: "You Get Paid",
    description: "Revenue lands in your account on a clear schedule while I handle the rest.",
    colorTheme: "charcoal",
  },
];

export function HowItWorks() {
  return (
    <section className="sec on-sand" id="how-it-works">
      <div className="wrap">
        <Reveal className="section-head center">
          <h2 className="headline">How It Works</h2>
          <p className="lede" style={{ marginLeft: "auto", marginRight: "auto" }}>
            From your first conversation to your first payout, here&apos;s exactly what to expect.
          </p>
        </Reveal>
        <Reveal as="div" className="how-it-works-cards">
          <HowItWorksCards features={STEPS} />
        </Reveal>
      </div>
    </section>
  );
}
