"use client";

import { useEffect } from "react";

export default function StickyHeaderState() {
  useEffect(() => {
    const header = document.querySelector<HTMLElement>("[data-sticky-header]");
    if (!header) return;

    const setHeaderState = () => {
      const isStuck = window.scrollY > 28;

      header.style.top = isStuck ? "0.85rem" : "2.85rem";
      header.style.background = isStuck
        ? "linear-gradient(135deg, rgba(8, 17, 26, 0.94), rgba(8, 17, 26, 0.76))"
        : "linear-gradient(135deg, rgba(8, 17, 26, 0.72), rgba(8, 17, 26, 0.38))";
      header.style.boxShadow = isStuck
        ? "0 18px 60px rgba(0, 0, 0, 0.36), inset 0 1px 0 rgba(255, 255, 255, 0.12)"
        : "0 24px 70px rgba(0, 0, 0, 0.28), inset 0 1px 0 rgba(255, 255, 255, 0.08)";
      header.style.borderColor = isStuck ? "rgba(255, 255, 255, 0.18)" : "rgba(255, 255, 255, 0.10)";
      header.style.backdropFilter = isStuck ? "blur(18px) saturate(1.18)" : "blur(12px)";
    };

    setHeaderState();
    window.addEventListener("scroll", setHeaderState, { passive: true });

    return () => window.removeEventListener("scroll", setHeaderState);
  }, []);

  return null;
}
