import { Award, Check, ExternalLink } from "lucide-react";
import { Reveal } from "../Reveal";
import { Button } from "../ui/button";

export function ProvenResults() {
  return (
    <section className="sec" id="proven-results">
      <div className="wrap">
        <Reveal className="section-head center">
          <h2 className="headline">Proven Results from The Hart House</h2>
        </Reveal>
        <Reveal as="div" className="proof-grid">
          <div className="proof-stat">
            <span className="num">20+</span>
            <span className="label">Five-Star Reviews</span>
          </div>
          <div className="proof-stat proof-stat--badge">
            <Award aria-hidden="true" />
            <span className="badge-title">Guest Favorite</span>
            <span className="label">Top 10% of All Homes</span>
          </div>
          <div className="proof-stat proof-stat--badge">
            <Check aria-hidden="true" />
            <span className="label">Professionally Managed by Sam</span>
          </div>
        </Reveal>
        <Reveal as="div" className="proof-cta">
          <Button
            className="rounded-full h-auto px-8 py-4 text-sm has-data-[icon=inline-end]:pr-8"
            render={
              <a href="https://www.airbnb.ca/rooms/1631598477076471125" target="_blank" rel="noopener noreferrer" />
            }
            nativeButton={false}
          >
            View My Airbnb Listing
            <ExternalLink data-icon="inline-end" />
          </Button>
        </Reveal>
      </div>
    </section>
  );
}
