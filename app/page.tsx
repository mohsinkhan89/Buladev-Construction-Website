import { createElement, type CSSProperties } from "react";
import StickyHeaderState from "./StickyHeaderState";
import ScrollReveal from "./ScrollReveal";
import ProjectGallery from "./ProjectGallery";
import {
  Award,
  CheckCircle2,
  ClipboardCheck,
  Phone,
  ShieldCheck,
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
      <img className="logo-image" src="./img/logo/logo-black.png" alt="BULADEV Building & Land Development" />
    </a>
  );
}
function LogoWhite() {
  return (
    <a className="logo-block" href="#home" aria-label="BULADEV home">
      <img className="logo-image" src="./img/logo/logo.png" alt="BULADEV Building & Land Development" />
    </a>
  );
}


function ButtonLordIcon({ src, light = true }: { src: string; light?: boolean }) {
  return createElement("lord-icon", {
    src,
    trigger: "loop-on-hover",
    delay: "120",
    colors: light ? "primary:#ffffff,secondary:#fed7aa" : "primary:#071018,secondary:#f57216",
    className: "button-lord-icon",
    style: { width: "20px", height: "20px" } as CSSProperties,
  });
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
      <ScrollReveal />
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
              <LogoWhite />
            </div>

            <nav className="hidden items-center gap-5 lg:flex">
              {navItems.map((item) => (
                <a className={`nav-link ${item === "Home" ? "active" : ""}`} href={`#${item.toLowerCase()}`} key={item}>
                  {item}
                </a>
              ))}
            </nav>

            <a className="header-cta modern-action-btn magnetic-btn" href="#contact">
              <ButtonLordIcon src="https://cdn.lordicon.com/oqdmuxru.json" />
              <span>Request Consultation</span>
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
                <a className="primary-btn modern-action-btn magnetic-btn" href="#contact"><ButtonLordIcon src="https://cdn.lordicon.com/oqdmuxru.json" /><span>Get Started</span></a>
                <a className="secondary-btn modern-action-btn modern-action-btn-light magnetic-btn" href="#services"><ButtonLordIcon src="https://cdn.lordicon.com/cnpvyndp.json" light={false} /><span>Explore Services</span></a>
                <a className="watch-link modern-watch-link" href="#projects">
                  <span className="play-orbit"><ButtonLordIcon src="https://cdn.lordicon.com/slduhdil.json" /></span>
                  <span>Watch Video</span>
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

          <ProjectGallery projects={projects} />
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
            <a className="image-match-cta-button modern-action-btn magnetic-btn" href="mailto:bula@buladev.com">
              <ButtonLordIcon src="https://cdn.lordicon.com/oqdmuxru.json" />
              <span>Request Consultation</span>
            </a>
          </div>
        </div>
      </section>
      <footer className="footer image-match-footer">
        <div className="image-match-footer-inner mx-auto grid max-w-7xl gap-10 px-4 py-10 sm:px-6 lg:px-8">
          <div className="image-match-footer-brand">
            <div className="image-match-footer-logos">
              <LogoBlock />
            </div>

            <div className="image-match-socials" aria-label="Social media links">
              <a href="#" aria-label="Facebook"><i className="fa-brands fa-facebook-f" /></a>
              <a href="#" aria-label="LinkedIn"><i className="fa-brands fa-linkedin-in" /></a>
              <a href="#" aria-label="Instagram"><i className="fa-brands fa-instagram" /></a>
            </div>
          </div>

          <FooterList title="Quick Links" items={["Home", "About Us", "Services", "Projects", "Our Process", "Contact"]} />
          <FooterList title="Services" items={["Residential Construction", "Commercial Construction", "Land Development", "Design & Build", "Project Management"]} />

          <div>
            <h3 className="footer-title">Contact Info</h3>
            <ul className="image-match-contact-list">
              <li><i className="fa-solid fa-phone" /><a href="tel:3134449734">(313) 444-9734</a></li>
              <li><i className="fa-solid fa-envelope" /><a href="mailto:bula@buladev.com">bula@BULADEV.com</a></li>
              <li><i className="fa-solid fa-location-dot" /><span>Detroit, Michigan</span></li>
              <li><i className="fa-regular fa-id-card" /><span>Licensed & Insured</span></li>
            </ul>
          </div>
        </div>
        <div className="image-match-footer-copy mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p>© 2025 BULADEV Building & Land Development + ASA Construction LLC. All Rights Reserved.</p>
        </div>
      </footer>
    </main>
  );
}

function FooterList({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <h3 className="footer-title">{title}</h3>
      <ul className="image-match-footer-links">
        {items.map((item) => (
          <li key={item}><a href="#">{item}</a></li>
        ))}
      </ul>
    </div>
  );
}








