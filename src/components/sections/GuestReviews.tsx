"use client";

import { Star } from "lucide-react";
import { Reveal } from "../Reveal";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { InfiniteMovingCards } from "../ui/infinite-moving-cards";

type GuestReview = {
  name: string;
  subtitle: string;
  rating: number;
  date: string;
  stay: string;
  quote: string;
  photo?: string;
};

const GUEST_REVIEWS: GuestReview[] = [
  {
    name: "Nabil",
    subtitle: "Surrey, Canada",
    rating: 5,
    date: "June 2026",
    stay: "Stayed with kids",
    quote:
      "Great place to stay, Sam is friendly and accommodating and was proactive in offering assistance since we were moving. The place is pristine clean, cozy and the bed in the living room is comfortable to sleep on. There's a portable heater if it gets cold at nights during summer. The master bedroom is nicely tucked away and extremely cozy. The mattress is fabulous!\n\nThank you Sam for having us!",
    photo: "/Nabil.avif",
  },
  {
    name: "Bob",
    subtitle: "Edmonton, Canada",
    rating: 5,
    date: "2 weeks ago",
    stay: "Stayed a few nights",
    quote:
      "My family enjoyed our stay at Sam's Airbnb in Surrey. Very nice and comfortable place. Sam responded quickly to any questions. We would definitely stay again if we visit Surrey. Thanks",
    photo: "/Bob.avif",
  },
  {
    name: "Satyen",
    subtitle: "10 years on Airbnb",
    rating: 5,
    date: "June 2026",
    stay: "Stayed one night",
    quote:
      "Sam's apartment is nice and comfortable. He is a great communicator and made sure that our stay was pleasant. The apartment is well appointed and carefully and caringly furnished. We had everything we needed and more. The neighborhood is nice. We would love to stay there again. Thank you, Sam!",
    photo: "/Satyen.avif",
  },
  {
    name: "Iryna",
    subtitle: "Winnipeg, Canada",
    rating: 5,
    date: "June 2026",
    stay: "Stayed with kids",
    quote:
      "We had a wonderful stay! The place was clean, comfortable, and exactly as described. The host was friendly, responsive, and made the check-in process very easy. We would definitely stay here again and highly recommend it to others.",
    photo: "/Iryna.avif",
  },
];

function ReviewCard({ review }: { review: GuestReview }) {
  const { name, subtitle, rating, date, stay, quote, photo } = review;

  return (
    <figure className="flex h-full flex-col gap-4 border border-border bg-card px-7 pt-7 pb-6 shadow-xs">
      <figcaption className="flex items-center gap-3">
        <Avatar size="lg">
          {photo && <AvatarImage src={photo} alt={name} />}
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
        <span aria-hidden="true">&middot;</span>
        <span>{stay}</span>
      </div>
      <blockquote className="flex-1 text-[15px] leading-relaxed whitespace-pre-line text-muted-foreground">
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
        <Reveal as="div" className="mt-14">
          <InfiniteMovingCards
            items={GUEST_REVIEWS}
            renderItem={(review) => <ReviewCard review={review} />}
            cardClassName="w-[320px] sm:w-[380px]"
            speed="slow"
            gap={24}
          />
        </Reveal>
      </div>
    </section>
  );
}
