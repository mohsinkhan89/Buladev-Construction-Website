"use client";

import { useEffect } from "react";

const revealSelectors = [
  ".hero-title",
  ".hero-grid p",
  ".hero-grid .primary-btn",
  ".hero-grid .secondary-btn",
  ".watch-link",
  ".section-heading",
  ".service-card",
  ".project-card",
  ".project-image-wrap",
  ".stats-grid",
  ".stat-card",
  ".image-match-cta",
  ".image-match-cta-copy",
  ".image-match-cta-actions",
  ".modern-footer > div",
  ".footer-title",
  ".modern-footer li",
].join(",");

export default function ScrollReveal() {
  useEffect(() => {
    const elements = Array.from(document.querySelectorAll<HTMLElement>(revealSelectors));
    if (!elements.length) return;

    elements.forEach((element) => element.classList.add("reveal-ready"));

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -12%", threshold: 0.12 },
    );

    elements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, []);

  return null;
}
