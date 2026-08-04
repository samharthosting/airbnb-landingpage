import { Home, MapPin, Shield, Clock } from "lucide-react";

export function TrustBar() {
  return (
    <section className="trust">
      <div className="wrap">
        <div className="trust-item">
          <Home />
          Owner-Operated, Not a Franchise
        </div>
        <div className="trust-item">
          <MapPin />
          Based in Surrey, BC
        </div>
        <div className="trust-item">
          <Shield />
          Full-Service, Start to Finish
        </div>
        <div className="trust-item">
          <Clock />
          24-Hour Response, Always
        </div>
      </div>
    </section>
  );
}
