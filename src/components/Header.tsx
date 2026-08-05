"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "./ui/button";
import { HouseHeartIcon } from "./HouseHeartIcon";

const NAV_LINKS = [
  { href: "#home", label: "Home" },
  { href: "#services", label: "Services" },
  { href: "#about", label: "About" },
  { href: "#assessment", label: "Assessment" },
  { href: "#faq", label: "FAQ" },
  { href: "#contact", label: "Contact" },
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    function onScroll() {
      setIsScrolled(window.scrollY > 10);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`site-header${isScrolled ? " is-scrolled" : ""}`}>
      <div className="wrap">
        <a href="#home" className="brand-link">
          <HouseHeartIcon className="brand-icon" />
          <span className="brand">
            <em>Hart</em> Hosting
            <small>Co-Host &amp; Property Management</small>
          </span>
        </a>
        <nav className={`nav-list${isOpen ? " is-open" : ""}`}>
          {NAV_LINKS.map((link) => (
            <a key={link.href} href={link.href} onClick={() => setIsOpen(false)}>
              {link.label}
            </a>
          ))}
        </nav>
        <div className="header-cta">
          <Button
            className="rounded-full h-auto px-6 py-2.5 text-sm"
            render={<a href="#assessment" />}
            nativeButton={false}
          >
            Free Assessment
          </Button>
          <Button
            variant="ghost"
            className="nav-toggle"
            aria-label="Toggle menu"
            aria-expanded={isOpen}
            onClick={() => setIsOpen((v) => !v)}
          >
            {isOpen ? <X /> : <Menu />}
          </Button>
        </div>
      </div>
    </header>
  );
}
