import Image from "next/image";
import { ArrowRight, Check } from "lucide-react";
import { Button } from "../ui/button";

const TRUST_BULLETS = [
  "Local Surrey Host",
  "Personally Manage Every Property",
  "Professional Guest Communication",
  "Dynamic Pricing Strategy",
];

export function Hero() {
  return (
    <section className="hero" id="home">
      <div className="hero-media">
        <Image
          src="/hallway-1.jpg"
          alt="Bright, professionally furnished living area in a Hart Hosting managed short-term rental in Surrey, BC"
          fill
          priority
          sizes="100vw"
        />
      </div>
      <div className="wrap">
        <div className="hero-copy">
          <span className="eyebrow">Airbnb Co-Hosting &amp; Property Management</span>
          <h1>Earn More From Your Property. Without Doing the Work.</h1>
          <p className="lede">
            Professional Airbnb co-hosting and short-term rental management for homeowners across
            Surrey &amp; the Lower Mainland: basement suites, laneway homes, condos, and
            investment properties.
          </p>
          <div className="hero-actions">
            <Button
              className="rounded-full h-auto px-8 py-4 text-sm has-data-[icon=inline-end]:pr-8"
              render={<a href="#assessment" />}
              nativeButton={false}
            >
              Get My FREE Property Income Assessment
              <ArrowRight data-icon="inline-end" />
            </Button>
            <Button
              variant="outline"
              className="rounded-full h-auto px-8 py-4 text-sm border-white/40 bg-transparent text-white hover:border-white hover:bg-white/10 hover:text-white dark:bg-transparent"
              render={<a href="#how-it-works" />}
              nativeButton={false}
            >
              Learn More
            </Button>
          </div>
          <ul className="hero-trust-bullets">
            {TRUST_BULLETS.map((item) => (
              <li key={item}>
                <Check aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div className="hero-aside">
          <strong>A Note From Sam</strong>
          <p>
            I manage every property personally. No call centre, no rotating account managers. If
            it&apos;s not earning what it should, I want to know why.
          </p>
        </div>
      </div>
    </section>
  );
}
