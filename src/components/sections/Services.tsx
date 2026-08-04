import {
  Camera,
  Tag,
  MessageCircle,
  Sparkles,
  Calendar,
  Key,
  Wrench,
  Star,
  type LucideIcon,
} from "lucide-react";
import { Reveal } from "../Reveal";

const SERVICES: { icon: LucideIcon; title: string; body: string }[] = [
  { icon: Camera, title: "Listing Setup", body: "Photography guidance, compelling listing copy, and platform setup done right the first time." },
  { icon: Tag, title: "Pricing Optimization", body: "Dynamic, data-informed pricing that adjusts to seasonality, local events, and demand." },
  { icon: MessageCircle, title: "Guest Communication", body: "Prompt, professional messaging from inquiry to checkout, protecting your reviews and reputation." },
  { icon: Sparkles, title: "Cleaning Coordination", body: "Trusted cleaning teams scheduled between every stay, with quality checks built in." },
  { icon: Calendar, title: "Calendar Management", body: "Bookings, blocks, and availability kept accurate across every platform you list on." },
  { icon: Key, title: "Check-In Support", body: "Smooth, self-serve check-ins with backup support if a guest needs help after hours." },
  { icon: Wrench, title: "Maintenance Coordination", body: "A trusted network of contractors on call for anything from a leaky faucet to a broken lock." },
  { icon: Star, title: "Guest Review Management", body: "Encouraging great reviews and responding professionally to every one, protecting your reputation." },
];

export function Services() {
  return (
    <section className="sec" id="services">
      <div className="wrap">
        <Reveal className="section-head center">
          <h2 className="headline">Full-Service Property Management</h2>
          <p className="lede" style={{ marginLeft: "auto", marginRight: "auto" }}>
            Everything required to run a successful short-term rental, handled for you.
          </p>
        </Reveal>
        <Reveal as="div" className="services-grid">
          {SERVICES.map((service) => (
            <div className="service-card" key={service.title}>
              <div className="service-icon">
                <service.icon />
              </div>
              <h3>{service.title}</h3>
              <p>{service.body}</p>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
