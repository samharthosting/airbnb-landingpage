"use client";

import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "./ui/button";

export function FloatingCta() {
  const [isVisible, setIsVisible] = useState(
    () => typeof window !== "undefined" && !("IntersectionObserver" in window)
  );

  useEffect(() => {
    const hero = document.getElementById("home");
    const assessment = document.getElementById("assessment");
    if (!hero || !assessment || !("IntersectionObserver" in window)) return;

    const heroState = { visible: true };
    const assessmentState = { visible: false };

    function update() {
      setIsVisible(!heroState.visible && !assessmentState.visible);
    }

    const heroObserver = new IntersectionObserver(
      ([entry]) => {
        heroState.visible = entry.isIntersecting;
        update();
      },
      { threshold: 0 }
    );
    const assessmentObserver = new IntersectionObserver(
      ([entry]) => {
        assessmentState.visible = entry.isIntersecting;
        update();
      },
      { threshold: 0 }
    );
    heroObserver.observe(hero);
    assessmentObserver.observe(assessment);
    return () => {
      heroObserver.disconnect();
      assessmentObserver.disconnect();
    };
  }, []);

  return (
    <div className={`floating-cta${isVisible ? " is-visible" : ""}`}>
      <Button
        className="rounded-full h-auto px-8 py-4 text-sm has-data-[icon=inline-end]:pr-8"
        render={<a href="#assessment" />}
        nativeButton={false}
      >
        Request Assessment
        <ArrowRight data-icon="inline-end" />
      </Button>
    </div>
  );
}
