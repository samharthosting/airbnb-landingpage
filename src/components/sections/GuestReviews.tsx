"use client";

import { Star } from "lucide-react";
import { Reveal } from "../Reveal";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { InfiniteMovingCards } from "../ui/infinite-moving-cards";
import {
  CATEGORY_RATINGS,
  GUEST_REVIEWS,
  LISTING_STATS,
  type GuestReview,
} from "@/lib/guest-reviews";

// Split into two rows so the full set stays browsable instead of one very long loop.
const midpoint = Math.ceil(GUEST_REVIEWS.length / 2);
const ROW_ONE = GUEST_REVIEWS.slice(0, midpoint);
const ROW_TWO = GUEST_REVIEWS.slice(midpoint);

function ReviewCard({ review }: { review: GuestReview }) {
  const { name, subtitle, rating, date, quote, photo } = review;

  return (
    <figure className="flex h-full flex-col gap-4 border border-border bg-card px-7 pt-7 pb-6 shadow-xs">
      <figcaption className="flex items-center gap-3">
        <Avatar size="lg">
          {photo && <AvatarImage src={photo} alt={name} loading="lazy" />}
          <AvatarFallback className="bg-muted font-heading font-bold text-primary">
            {name.charAt(0)}
          </AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <cite className="text-sm font-semibold text-foreground not-italic">{name}</cite>
          <span className="text-xs text-muted-foreground">{subtitle}</span>
        </div>
      </figcaption>
      <div className="flex flex-wrap items-center gap-1.5 text-xs text-muted-foreground">
        <div className="flex gap-0.5">
          {Array.from({ length: rating }).map((_, i) => (
            <Star key={i} aria-hidden="true" className="size-3.5 fill-(--gold) text-(--gold)" />
          ))}
        </div>
        <span aria-hidden="true">&middot;</span>
        <span>{date}</span>
      </div>
      {/* Clamped so one long review can't stretch every card in the row. */}
      <blockquote className="line-clamp-[6] flex-1 overflow-hidden text-[15px] leading-relaxed whitespace-pre-line text-muted-foreground">
        {quote}
      </blockquote>
    </figure>
  );
}

export function GuestReviews() {
  return (
    <section className="sec" id="guest-reviews">
      <div className="wrap">
        <Reveal className="section-head center">
          <h2 className="headline">What Guests Say About My Hosting</h2>
          <p className="lede" style={{ marginLeft: "auto", marginRight: "auto" }}>
            Real feedback from guests who&apos;ve stayed at The Hart House on Airbnb.
          </p>
        </Reveal>
        <Reveal as="div" className="review-summary">
          <div className="review-summary-score">
            <span className="review-summary-num">{LISTING_STATS.rating}</span>
            <div className="review-summary-stars" aria-hidden="true">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="size-4 fill-(--gold) text-(--gold)" />
              ))}
            </div>
            <span className="review-summary-caption">
              Guest Favorite &middot; {LISTING_STATS.totalReviews} reviews
            </span>
          </div>
          <dl className="review-summary-cats">
            {CATEGORY_RATINGS.map(({ label, value }) => (
              <div key={label} className="review-cat">
                <div className="review-cat-head">
                  <dt>{label}</dt>
                  <dd>{value.toFixed(1)}</dd>
                </div>
                <div className="review-cat-track">
                  <span style={{ width: `${(value / 5) * 100}%` }} />
                </div>
              </div>
            ))}
          </dl>
        </Reveal>
        <Reveal as="div" className="mt-14 flex flex-col gap-6">
          <InfiniteMovingCards
            items={ROW_ONE}
            renderItem={(review) => <ReviewCard review={review} />}
            cardClassName="w-[320px] sm:w-[380px]"
            speed="slow"
            gap={24}
          />
          <InfiniteMovingCards
            items={ROW_TWO}
            renderItem={(review) => <ReviewCard review={review} />}
            cardClassName="w-[320px] sm:w-[380px]"
            direction="right"
            speed="slow"
            gap={24}
          />
        </Reveal>
        <Reveal as="div" className="mt-11 flex justify-center">
          <a
            className="text-sm font-semibold text-primary underline underline-offset-4"
            href={LISTING_STATS.listingUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            Read all reviews on Airbnb
          </a>
        </Reveal>
      </div>
    </section>
  );
}
