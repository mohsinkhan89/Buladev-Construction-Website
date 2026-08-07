import Link from "next/link";
import { createElement, type CSSProperties } from "react";
import StickyHeaderState from "./StickyHeaderState";
import ScrollReveal from "./ScrollReveal";
import ProjectGallery from "./ProjectGallery";
import BidListForm from "./BidListForm";
import { CheckCircle2, ClipboardCheck, FileText, MapPin, Phone } from "lucide-react";

const navItems = [
  { label: "Home", href: "/#home" },
  { label: "Partner With Us", href: "/partner-with-us" },
  { label: "Services", href: "/#services" },
  { label: "Projects", href: "/#projects" },
  { label: "Bid List", href: "/#bid-list", featured: true },
  { label: "Contact", href: "/#contact" },
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
    <Link className="logo-block" href="/#home" aria-label="BULADEV home">
      <img className="logo-image" src="./img/logo/logo-black.png" alt="BULADEV Building & Land Development" />
    </Link>
  );
}
function LogoWhite() {
  return (
    <Link className="logo-block" href="/#home" aria-label="BULADEV home">
      <img className="logo-image" src="./img/logo/logo.png" alt="BULADEV Building & Land Development" />
    </Link>
  );
}


function ButtonLordIcon({
  src,
  light = true,
  target = ".modern-action-btn",
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
    className: "button-lord-icon",
    style: { width: "20px", height: "20px" } as CSSProperties,
  });
}
function LordIcon({ src, size = 56, target = ".service-card" }: { src: string; size?: number; target?: string }) {
  return createElement("lord-icon", {
    src,
    trigger: "loop-on-hover",
    target,
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
      <header className="site-header" data-sticky-header>
        <div className="site-header-inner">
          <div className="flex items-center gap-5">
            <LogoWhite />
          </div>

          <nav className="hidden items-center gap-5 lg:flex">
            {navItems.map((item) => (
              <Link
                className={`nav-link ${item.label === "Home" ? "active" : ""} ${item.featured ? "nav-link-bid" : ""}`}
                href={item.href}
                key={item.label}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <Link className="header-cta modern-action-btn magnetic-btn" href="/#contact">
            <ButtonLordIcon src="https://cdn.lordicon.com/oqdmuxru.json" />
            <span>Request Consultation</span>
          </Link>
          <input className="mobile-menu-check" id="mobile-menu-toggle" type="checkbox" />
          <label className="mobile-menu-button" htmlFor="mobile-menu-toggle" aria-label="Open menu">
            <span />
            <span />
            <span />
          </label>

          <div className="mobile-menu-panel">
            <nav className="mobile-menu-nav" aria-label="Mobile navigation">
              {navItems.map((item) => (
                <Link href={item.href} key={item.label}>{item.label === "Bid List" ? "Join Our Bid List" : item.label}</Link>
              ))}
            </nav>
            <Link className="mobile-menu-cta modern-action-btn magnetic-btn" href="/#contact">
              <ButtonLordIcon src="https://cdn.lordicon.com/oqdmuxru.json" />
              <span>Request Consultation</span>
            </Link>
          </div>
        </div>
      </header>
      <section className="hero-shell" id="home">
        <div className="hero-section mx-auto max-w-7xl px-4 sm:px-6 lg:px-0">
          <div className="hero-grid">
            <div className="relative z-10 max-w-5xl pb-14 sm:pb-20 lg:pb-[5.6rem]">
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
                <Link className="primary-btn modern-action-btn magnetic-btn" href="/#contact"><ButtonLordIcon src="https://cdn.lordicon.com/oqdmuxru.json" /><span>Get Started</span></Link>
                <Link className="secondary-btn modern-action-btn modern-action-btn-light magnetic-btn" href="/#services"><ButtonLordIcon src="https://cdn.lordicon.com/cnpvyndp.json" /><span>Explore Services</span></Link>
                <Link className="secondary-btn modern-action-btn modern-action-btn-light magnetic-btn" href="/partner-with-us"><ButtonLordIcon src="https://cdn.lordicon.com/abwrkdvl.json" /><span>Partner With Us</span></Link>
                <Link className="watch-link modern-watch-link" href="/#projects">
                  <span className="play-orbit"><ButtonLordIcon src="https://cdn.lordicon.com/slduhdil.json" target=".modern-watch-link" /></span>
                  <span>Watch Video</span>
                </Link>
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


      <section className="bid-list-section section-block" id="bid-list">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="bid-list-shell">
            <div className="bid-list-copy">
              <div className="contact-cards-content">
                <span className="bid-list-kicker">
                  <ClipboardCheck className="h-5 w-5" />
                  Subcontractor & Vendor Opportunities
                </span>
                <h2>Join Our Bid List</h2>
                <p>
                  Partner with BULADEV on upcoming residential, commercial, and land development
                  projects. Share your company details and trade focus so our estimating team can
                  include you in the right bid invitations.
                </p>
                <div className="bid-list-benefits" aria-label="Bid list benefits">
                  <div>
                    <CheckCircle2 className="h-5 w-5" />
                    <span>Project-fit bid invites</span>
                  </div>
                  <div>
                    <FileText className="h-5 w-5" />
                    <span>Trade and scope matching</span>
                  </div>
                  <div>
                    <MapPin className="h-5 w-5" />
                    <span>Michigan-area opportunities</span>
                  </div>
                </div>
              </div>

            </div>

            <BidListForm />
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

          <FooterList title="Quick Links" items={[
            { label: "Home", href: "/#home" },
            { label: "Partner With Us", href: "/partner-with-us" },
            { label: "Services", href: "/#services" },
            { label: "Projects", href: "/#projects" },
            { label: "Join Our Bid List", href: "/#bid-list" },
            { label: "Contact", href: "/#contact" },
          ]} />
          <FooterList title="Services" items={["Residential Construction", "Commercial Construction", "Land Development", "Design & Build", "Project Management"].map((label) => ({ label, href: "/#services" }))} />

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
          <p>&copy; 2025 BULADEV Building & Land Development + ASA Construction LLC. All Rights Reserved.</p>
        </div>
      </footer>
    </main>
  );
}

function FooterList({ title, items }: { title: string; items: { label: string; href: string }[] }) {
  return (
    <div>
      <h3 className="footer-title">{title}</h3>
      <ul className="image-match-footer-links">
        {items.map((item) => (
          <li key={item.label}><Link href={item.href}>{item.label}</Link></li>
        ))}
      </ul>
    </div>
  );
}









