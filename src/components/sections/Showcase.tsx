"use client";

import { useState, useSyncExternalStore } from "react";
import Image from "next/image";
import { Reveal } from "../Reveal";

const SWAP_BREAKPOINT = "(min-width: 1101px)";

function subscribeToSwapBreakpoint(callback: () => void) {
  const mq = window.matchMedia(SWAP_BREAKPOINT);
  mq.addEventListener("change", callback);
  return () => mq.removeEventListener("change", callback);
}

function getSwapBreakpointSnapshot() {
  return window.matchMedia(SWAP_BREAKPOINT).matches;
}

function getSwapBreakpointServerSnapshot() {
  return false;
}

type ShowcaseItem = { src: string; alt: string; caption: string };

const INITIAL_ITEMS: ShowcaseItem[] = [
  {
    src: "/hallway.jpg",
    alt: "Spacious, professionally styled living area with sectional sofa and entertainment unit",
    caption: "Living Area",
  },
  {
    src: "/bedroom.jpg",
    alt: "Secondary bedroom staged with layered bedding and reading lamp",
    caption: "Secondary Bedroom",
  },
  {
    src: "/bedroom-1.jpg",
    alt: "Primary bedroom with built-in shelving and city-print artwork",
    caption: "Primary Bedroom",
  },
  {
    src: "/kitchen.jpg",
    alt: "Fully equipped kitchenette with dark quartz countertops",
    caption: "Kitchen",
  },
  {
    src: "/bathroom.jpg",
    alt: "Bathroom with glass shower and in-suite laundry",
    caption: "Bath & Laundry",
  },
  {
    src: "/hallway.jpg",
    alt: "Lounge nook with bar seating and guest common area",
    caption: "Lounge",
  },
];

const TRANSITION_MS = 220;

export function Showcase() {
  const [items, setItems] = useState(INITIAL_ITEMS);
  const [fadingIndices, setFadingIndices] = useState<number[]>([]);
  const canSwap = useSyncExternalStore(
    subscribeToSwapBreakpoint,
    getSwapBreakpointSnapshot,
    getSwapBreakpointServerSnapshot,
  );

  function handleThumbnailClick(index: number) {
    if (!canSwap || fadingIndices.length > 0) return;
    setFadingIndices([0, index]);
    window.setTimeout(() => {
      setItems((prev) => {
        const next = [...prev];
        [next[0], next[index]] = [next[index], next[0]];
        return next;
      });
      setFadingIndices([]);
    }, TRANSITION_MS);
  }

  const [featured, ...thumbnails] = items;

  return (
    <section className="sec on-sand" id="showcase">
      <div className="wrap">
        <Reveal className="section-head">
          <h2 className="headline">Inside The Hart House</h2>
          <p className="lede">
            A look inside one of the properties I personally manage: the same level of care and presentation every
            homeowner I work with can expect.
          </p>
        </Reveal>
        <Reveal as="figure" className={`showcase-feature${fadingIndices.includes(0) ? " is-fading" : ""}`}>
          <Image src={featured.src} alt={featured.alt} fill sizes="100vw" style={{ objectFit: "cover" }} />
          <figcaption>{featured.caption}</figcaption>
        </Reveal>
        <Reveal as="div" className="showcase-grid">
          {thumbnails.map((item, i) => {
            const index = i + 1;
            return (
              <button
                key={item.caption}
                type="button"
                className={`showcase-card${fadingIndices.includes(index) ? " is-fading" : ""}`}
                onClick={() => handleThumbnailClick(index)}
                disabled={!canSwap}
                aria-label={`View ${item.caption} as the main photo`}
              >
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  sizes="(max-width: 560px) 50vw, (max-width: 960px) 50vw, 20vw"
                  style={{ objectFit: "cover" }}
                />
                <figcaption>{item.caption}</figcaption>
              </button>
            );
          })}
        </Reveal>
      </div>
    </section>
  );
}
