"use client";

import { createElement, useMemo, useState, type CSSProperties } from "react";
import { Mail } from "lucide-react";

type Project = {
  title: string;
  category: string;
  image: string;
};

const filters = [
  { label: "All", icon: "https://cdn.lordicon.com/oqdmuxru.json" },
  { label: "Residential", icon: "https://cdn.lordicon.com/cnpvyndp.json" },
  { label: "Commercial", icon: "https://cdn.lordicon.com/abwrkdvl.json" },
  { label: "Land Development", icon: "https://cdn.lordicon.com/wloilxuq.json" },
  { label: "Retail", icon: "https://cdn.lordicon.com/slduhdil.json" },
];

function ButtonLordIcon({
  src,
  light = false,
  target = ".modern-filter-button",
}: {
  src: string;
  light?: boolean;
  target?: string;
}) {
  return createElement("lord-icon", {
    src,
    trigger: "loop-on-hover",
    target,
    delay: "120",
    colors: light ? "primary:#ffffff,secondary:#fed7aa" : "primary:#071018,secondary:#f57216",
    className: "button-lord-icon filter-lord-icon",
    style: { width: "20px", height: "20px" } as CSSProperties,
  });
}

function projectMatchesFilter(project: Project, filter: string) {
  const haystack = `${project.title} ${project.category}`.toLowerCase();

  if (filter === "All") return true;
  if (filter === "Retail") return haystack.includes("retail");
  if (filter === "Land Development") return haystack.includes("land");

  return haystack.includes(filter.toLowerCase());
}

export default function ProjectGallery({ projects }: { projects: Project[] }) {
  const [activeFilter, setActiveFilter] = useState("All");

  const visibleProjects = useMemo(
    () => projects.filter((project) => projectMatchesFilter(project, activeFilter)),
    [activeFilter, projects],
  );

  return (
    <>
      <div className="filter-row modern-filter-row" role="tablist" aria-label="Project categories">
        {filters.map((filter) => {
          const isActive = activeFilter === filter.label;

          return (
            <button
              aria-selected={isActive}
              className={isActive ? "filter-active modern-filter-button" : "filter-button modern-filter-button"}
              key={filter.label}
              onClick={() => setActiveFilter(filter.label)}
              role="tab"
              type="button"
            >
              <ButtonLordIcon src={filter.icon} light={isActive} />
              <span>{filter.label}</span>
            </button>
          );
        })}
      </div>

      <div className="project-grid" aria-live="polite">
        {visibleProjects.map((project) => (
          <article className="project-card" key={project.title}>
            <div className="project-image-wrap">
              <div className="project-image" style={{ backgroundImage: `url("${project.image}")` }} />
              <span className="project-badge">Featured</span>
            </div>
            <div className="project-body p-4">
              <h3>{project.title}</h3>
              <p>{project.category}</p>
            </div>
          </article>
        ))}
      </div>

      <div className="mt-8 text-center">
        <button className="outline-button modern-outline-button magnetic-btn" onClick={() => setActiveFilter("All")} type="button">
          {createElement("lord-icon", {
            src: "https://cdn.lordicon.com/oqdmuxru.json",
            trigger: "loop-on-hover",
            target: ".modern-outline-button",
            delay: "120",
            colors: "primary:#071018,secondary:#f57216",
            className: "button-lord-icon",
            style: { width: "20px", height: "20px" } as CSSProperties,
          })}
          <span>View All Projects</span>
        </button>
      </div>
    </>
  );
}

