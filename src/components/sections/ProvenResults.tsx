import { Award, Check, ExternalLink, Star } from "lucide-react";
import { Reveal } from "../Reveal";
import { Button } from "../ui/button";
import { LISTING_STATS } from "@/lib/guest-reviews";

export function ProvenResults() {
  return (
    <section className="sec" id="proven-results">
      <div className="wrap">
        <Reveal className="section-head center">
          <h2 className="headline">Proven Results from The Hart House</h2>
        </Reveal>
        <Reveal as="div" className="proof-grid">
          <div className="proof-stat">
            <span className="num">
              {LISTING_STATS.rating}
              <Star aria-hidden="true" className="num-star" />
            </span>
            <span className="label">
              Average Rating Across {LISTING_STATS.totalReviews} Reviews
            </span>
          </div>
          <div className="proof-stat">
            <span className="num">{LISTING_STATS.fiveStarReviews}</span>
            <span className="label">Five-Star Reviews</span>
          </div>
          <div className="proof-stat proof-stat--badge">
            <Award aria-hidden="true" />
            <span className="badge-title">Guest Favorite</span>
            <span className="label">Awarded by Airbnb</span>
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
              <a href={LISTING_STATS.listingUrl} target="_blank" rel="noopener noreferrer" />
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
