import { createElement, type CSSProperties } from "react";
import StickyHeaderState from "./StickyHeaderState";
import {
  ArrowRight,
  Award,
  CheckCircle2,
  ClipboardCheck,
  Mail,
  MapPin,
  Phone,
  PlayCircle,
  ShieldCheck,
  UsersRound,
} from "lucide-react";

const navItems = ["Home", "About", "Services", "Projects", "Process", "Testimonials", "Contact"];

const topBadges = [
  { label: "20+ Years Experience", icon: Award },
  { label: "Licensed & Insured", icon: ShieldCheck },
  { label: "Lean Six Sigma Certified", icon: CheckCircle2 },
  { label: "Professional Project Management", icon: ClipboardCheck },
];

const services = [
  {
    title: "Residential Construction",
    text: "Custom homes, renovations, additions & more.",
    icon: "https://cdn.lordicon.com/cnpvyndp.json",
  },
  {
    title: "Commercial Construction",
    text: "Offices, retail, industrial & build-outs.",
    icon: "https://cdn.lordicon.com/abwrkdvl.json",
  },
  {
    title: "Land Development",
    text: "Site development, planning, infrastructure & more.",
    icon: "https://cdn.lordicon.com/wloilxuq.json",
  },
  {
    title: "Design & Build",
    text: "Smart design. Seamless construction.",
    icon: "https://cdn.lordicon.com/slduhdil.json",
  },
  {
    title: "Project Management",
    text: "On-time. On-budget. Every time.",
    icon: "https://cdn.lordicon.com/oqdmuxru.json",
  },
];

const stats = [
  { value: "20+", label: "Years of Experience" },
  { value: "100%", label: "Client Satisfaction" },
  { value: "Lean Six Sigma", label: "Certified" },
  { value: "Licensed", label: "& Insured" },
  { value: "Professional", label: "Project Managers" },
];

const projects = [
  {
    title: "Modern Luxury Home",
    category: "Residential Construction",
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=900&q=85",
  },
  {
    title: "Corporate Office Building",
    category: "Commercial Construction",
    image:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=900&q=85",
  },
  {
    title: "Land Development Project",
    category: "Land Development",
    image:
      "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=900&q=85",
  },
  {
    title: "Retail Build-Out",
    category: "Commercial Construction",
    image:
      "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=900&q=85",
  },
];

function LogoBlock() {
  return (
    <a className="logo-block" href="#home" aria-label="BULADEV home">
      <img className="logo-image" src="/img/logo/logo.png" alt="BULADEV Building & Land Development" />
    </a>
  );
}


function LordIcon({ src, size = 56 }: { src: string; size?: number }) {
  return createElement("lord-icon", {
    src,
    trigger: "loop-on-hover",
    delay: "200",
    colors: "primary:#071018,secondary:#f57216",
    style: { width: `${size}px`, height: `${size}px` } as CSSProperties,
  });
}

export default function HomePage() {
  return (
    <main className="site-canvas min-h-screen text-coal">
      <StickyHeaderState />
      <section className="hero-shell">
        <div className="hero-section mx-auto max-w-7xl px-4 sm:px-6 lg:px-0">
          <div className="top-strip">
            <div className="flex flex-wrap items-center gap-x-8 gap-y-2">
              {topBadges.map(({ label, icon: Icon }) => (
                <div key={label} className="top-strip-item">
                  <span className="mini-icon"><Icon className="h-3.5 w-3.5" /></span>
                  <span>{label}</span>
                </div>
              ))}
            </div>
            <a className="top-strip-item font-extrabold" href="tel:3134449734">
              <span className="mini-icon"><Phone className="h-3.5 w-3.5" /></span>
              (313) 444-9734
            </a>
          </div>

          <header className="site-header" data-sticky-header>
            <div className="flex items-center gap-5">
              <LogoBlock />
            </div>

            <nav className="hidden items-center gap-5 lg:flex">
              {navItems.map((item) => (
                <a className={`nav-link ${item === "Home" ? "active" : ""}`} href={`#${item.toLowerCase()}`} key={item}>
                  {item}
                </a>
              ))}
            </nav>

            <a className="header-cta magnetic-btn" href="#contact">
              Request Consultation
            </a>
          </header>

          <div className="hero-grid">
            <div className="relative z-10 max-w-5xl py-14 sm:py-20 lg:py-[5.6rem]">
              <h1 className="hero-title">
                Building
                <br />
                Better Futures.
                <br />
                <span>Together.</span>
              </h1>
              <p className="mt-5 text-lg font-semibold text-white">Plan. Build. Deliver. Succeed.</p>

              <div className="mt-4 flex flex-wrap items-center gap-3 text-sm font-bold">
                <span className="text-ember">Residential</span>
                <span className="h-1 w-1 rounded-full bg-white/50" />
                <span className="text-white">Commercial</span>
                <span className="h-1 w-1 rounded-full bg-white/50" />
                <span className="text-white">Land Development</span>
              </div>

              <p className="mt-5 max-w-lg text-sm leading-6 text-zinc-300">
                20 years of experience. Licensed & insured. Lean Six Sigma Certified.
                Professional Project Managers.
              </p>

              <div className="mt-7 flex flex-wrap items-center gap-4">
                <a className="primary-btn magnetic-btn" href="#contact">Get Started</a>
                <a className="secondary-btn magnetic-btn" href="#services">Explore Services</a>
                <a className="watch-link" href="#projects">
                  <span className="play-orbit"><PlayCircle className="h-5 w-5" /></span>
                  Watch Video
                </a>
              </div>
            </div>
          </div>

          <div className="stats-grid stats-grid-secondary">
            {stats.map((stat) => (
              <div className="stat-card" key={stat.value + stat.label}>
                <div className="stat-value">{stat.value}</div>
                <div className="stat-label">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-block services-section" id="services">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="section-heading">
            <h2>Complete Solutions. One Trusted Partner.</h2>
            <p>From concept to completion, we handle every detail with precision and care.</p>
          </div>

          <div className="service-grid">
            {services.map(({ title, text, icon }) => (
              <article className="service-card" key={title}>
                <div className="service-icon-wrap"><LordIcon src={icon} /></div>
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="projects-section pb-14 pt-2" id="projects">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="section-heading compact-heading">
            <h2>Featured Projects</h2>
          </div>

          <div className="filter-row">
            {["All", "Residential", "Commercial", "Land Development", "Retail"].map((filter, index) => (
              <button className={index === 0 ? "filter-active" : "filter-button"} key={filter}>{filter}</button>
            ))}
          </div>

          <div className="project-grid">
            {projects.map((project) => (
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
            <a className="outline-button magnetic-btn" href="#projects">
              View All Projects
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </section>

      <section className="px-4 pb-12 sm:px-6 lg:px-8" id="contact">
        <div className="cta-band image-match-cta mx-auto max-w-7xl text-white">
          <div className="image-match-cta-copy">
            <h2>Ready to Start Your Project?</h2>
            <p>Let&apos;s turn your ideas into reality with a team you can rely on.</p>
          </div>

          <div className="image-match-cta-actions">
            <a className="image-match-cta-phone" href="tel:3134449734">
              <span className="image-match-cta-phone-icon">
                <Phone className="h-5 w-5" />
              </span>
              (313) 444-9734
            </a>
            <a className="image-match-cta-button magnetic-btn" href="mailto:bula@buladev.com">
              Request Consultation
            </a>
          </div>
        </div>
      </section>
      <footer className="footer modern-footer">
        <div className="modern-footer-line" aria-hidden="true" />
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-[1.3fr_0.8fr_0.9fr_1fr] lg:px-8">
          <div>
            <div className="flex flex-wrap items-center gap-5">
              <LogoBlock />
            </div>
            <p className="mt-5 max-w-xs text-sm font-semibold leading-6 text-zinc-400">
              Building & land development support for residential, commercial, and project-managed work.
            </p>
            <div className="mt-7 flex gap-3 text-sm font-black">
              <a className="social-link" href="#" aria-label="Facebook">f</a>
              <a className="social-link" href="#" aria-label="LinkedIn">in</a>
              <a className="social-link" href="#" aria-label="Instagram">ig</a>
            </div>
          </div>

          <FooterList title="Quick Links" items={["Home", "About Us", "Services", "Projects", "Our Process", "Contact"]} />
          <FooterList title="Services" items={["Residential Construction", "Commercial Construction", "Land Development", "Design & Build", "Project Management"]} />

          <div>
            <h3 className="footer-title">Contact Info</h3>
            <ul className="space-y-3 text-sm font-semibold text-zinc-300">
              <li className="flex gap-3"><Phone className="h-4 w-4 text-ember" />(313) 444-9734</li>
              <li className="flex gap-3"><Mail className="h-4 w-4 text-ember" />bula@buladev.com</li>
              <li className="flex gap-3"><MapPin className="h-4 w-4 text-ember" />Detroit, Michigan</li>
              <li className="flex gap-3"><UsersRound className="h-4 w-4 text-ember" />Licensed & Insured</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-white/10 py-5 text-center text-xs font-semibold text-zinc-500">
          © 2025 BULADEV Building & Land Development + ASA Construction LLC. All Rights Reserved.
        </div>
      </footer>
    </main>
  );
}

function FooterList({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <h3 className="footer-title">{title}</h3>
      <ul className="space-y-2 text-sm font-semibold text-zinc-400">
        {items.map((item) => (
          <li key={item}><a href="#">{item}</a></li>
        ))}
      </ul>
    </div>
  );
}








