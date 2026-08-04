"use client";

import React from "react";
import { LazyMotion, domAnimation, m } from "motion/react";

type ColorTheme = "crimson" | "charcoal";

interface CardProps {
  number: string;
  title: string;
  description: string;
  colorTheme?: ColorTheme;
  className?: string;
  rotate?: string;
}

const Pin = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
  >
    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
    <path d="M16 3a1 1 0 0 1 .117 1.993l-.117 .007v4.764l1.894 3.789a1 1 0 0 1 .1 .331l.006 .116v2a1 1 0 0 1 -.883 .993l-.117 .007h-4v4a1 1 0 0 1 -1.993 .117l-.007 -.117v-4h-4a1 1 0 0 1 -.993 -.883l-.007 -.117v-2a1 1 0 0 1 .06 -.34l.046 -.107l1.894 -3.791v-4.762a1 1 0 0 1 -.117 -1.993l.117 -.007h8z" />
  </svg>
);

const THEME_CLASSES: Record<ColorTheme, { bg: string; text: string; border: string }> = {
  crimson: {
    bg: "bg-(--crimson)/8",
    text: "text-(--crimson)",
    border: "border-(--crimson)/25",
  },
  charcoal: {
    bg: "bg-muted",
    text: "text-foreground",
    border: "border-border",
  },
};

const Card = ({ number, title, description, colorTheme = "crimson", className, rotate }: CardProps) => {
  const theme = THEME_CLASSES[colorTheme];

  return (
    <div
      className={`relative w-full md:w-[280px] transition-transform duration-300 hover:z-30 hover:scale-105 ${rotate} ${className}`}
    >
      <div className="rounded-[25px] border border-border bg-card p-2 shadow-lg">
        <Pin className={`z-20 mx-auto mb-6 h-8 w-8 ${theme.text}`} />
        <div
          className={`relative flex h-full flex-col overflow-hidden rounded-[15px] border p-[15px] ${theme.bg} ${theme.border}`}
        >
          <span
            className={`mb-5 text-4xl font-extrabold [font-family:var(--font-heading)] ${theme.text}`}
          >
            {number}
          </span>
          <h3 className="mb-2.5 text-2xl font-bold leading-none [font-family:var(--font-heading)] text-foreground">
            {title}
          </h3>
          <p className="text-sm/5 tracking-tight text-muted-foreground">{description}</p>
        </div>
      </div>
    </div>
  );
};

export interface Step {
  title: string;
  description: string;
  colorTheme?: ColorTheme;
}

export interface StepPosition {
  className?: string;
  rotate?: string;
}

export interface HowItWorksProps {
  features?: Step[];
  className?: string;
  stepPositions?: StepPosition[];
}

const DEFAULT_CARD_POSITIONS: StepPosition[] = [
  { className: "md:absolute md:top-0 md:left-[15%]", rotate: "rotate-6" },
  { className: "md:absolute md:top-[120px] md:right-[15%]", rotate: "-rotate-6" },
  { className: "md:absolute md:top-[450px] md:left-[15%]", rotate: "rotate-6" },
  { className: "md:absolute md:top-[570px] md:right-[10%]", rotate: "-rotate-6" },
  { className: "md:absolute md:top-[850px] md:left-[15%]", rotate: "rotate-6" },
];

const DEFAULT_STEPS: Step[] = [
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

export default function HowItWorks({ features, className, stepPositions }: HowItWorksProps) {
  const data = features && features.length > 0 ? features : DEFAULT_STEPS;
  const positions = stepPositions || DEFAULT_CARD_POSITIONS;

  let height = 1130;
  if (data.length === 1) height = 400;
  else if (data.length === 2) height = 450;
  else if (data.length === 3) height = 800;
  else if (data.length === 4) height = 900;
  else height = 1130;

  return (
    <LazyMotion features={domAnimation}>
      <div className={`relative ${className ?? ""}`}>
        <div
          className="relative mx-auto flex h-auto w-full max-w-[1000px] flex-col space-y-8 md:block md:h-(--md-height) md:space-y-0"
          style={{ "--md-height": `${height}px` } as React.CSSProperties}
        >
          {data.length > 1 && (
            <svg
              className="pointer-events-none absolute top-0 left-0 z-0 hidden h-full w-full md:block"
              viewBox={`0 0 1000 ${height}`}
              preserveAspectRatio="none"
            >
              {(() => {
                const pathD = data.reduce((acc, _, index) => {
                  if (index >= data.length - 1) return acc;
                  if (index === 0) return "M 290 150 C 500 150, 550 270, 710 270";
                  if (index === 1) return acc + " C 850 270, 500 350, 290 450";
                  if (index === 2) return acc + " C 290 600, 550 720, 750 720";
                  if (index === 3) return acc + " C 950 720, 500 800, 290 850";
                  return acc;
                }, "");
                return (
                  <m.path
                    d={pathD}
                    stroke="var(--crimson)"
                    strokeWidth="2"
                    strokeDasharray="8 6"
                    fill="none"
                    strokeLinecap="round"
                    vectorEffect="non-scaling-stroke"
                    initial={{ strokeDashoffset: 0 }}
                    animate={{ strokeDashoffset: -140 }}
                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                  />
                );
              })()}
            </svg>
          )}

          {data.map((step, index) => {
            const position = positions[index % positions.length];
            return (
              <Card
                key={step.title}
                number={`0${index + 1}`}
                title={step.title}
                description={step.description}
                colorTheme={step.colorTheme || "crimson"}
                rotate={position.rotate}
                className={position.className}
              />
            );
          })}
        </div>
      </div>
    </LazyMotion>
  );
}
