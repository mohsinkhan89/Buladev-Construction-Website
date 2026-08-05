"use client";

import { useEffect } from "react";

export default function StickyHeaderState() {
  useEffect(() => {
    const header = document.querySelector<HTMLElement>("[data-sticky-header]");
    if (!header) return;

    const setHeaderState = () => {
      header.classList.toggle("is-stuck", window.scrollY > 28);
    };

    setHeaderState();
    window.addEventListener("scroll", setHeaderState, { passive: true });

    return () => window.removeEventListener("scroll", setHeaderState);
  }, []);

  return null;
}
