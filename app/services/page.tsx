import Link from "next/link";
import { createElement, type CSSProperties } from "react";
import StickyHeaderState from "../StickyHeaderState";
import ScrollReveal from "../ScrollReveal";
import {
  ArrowRight,
  Award,
  BadgeCheck,
  Building2,
  CheckCircle2,
  Clock,
  DraftingCompass,
  Handshake,
  HardHat,
  Home,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
  UserCheck,
} from "lucide-react";

const navItems = [
  { label: "Home", href: "/#home" },
  { label: "About", href: "/about-us" },
  { label: "Services", href: "/services" },
  { label: "Projects", href: "/#projects" },
  { label: "Partner With Us", href: "/partner-with-us" },
  { label: "Bid List", href: "/#bid-list", featured: true },
  { label: "Contact", href: "/contact-us" },
];

const footerQuickLinks = [
  { label: "Home", href: "/#home" },
  { label: "About Us", href: "/about-us" },
  { label: "Services", href: "/services" },
  { label: "Projects", href: "/#projects" },
  { label: "Partner With Us", href: "/partner-with-us" },
  { label: "Join Our Bid List", href: "/#bid-list" },
  { label: "Contact", href: "/contact-us" },
];

const serviceLinks = [
  "Residential Construction",
  "Commercial Construction",
  "Land Development",
  "Design & Build",
  "Project Management",
  "Consulting Services",
];

const serviceCards = [
  {
    title: "Residential Construction",
    text: "Custom homes, renovations, additions, and property improvements built with quality, care, and attention to detail.",
    image: "/img/services/residential-construction.png",
    icon: Home,
  },
  {
    title: "Commercial Construction",
    text: "Offices, retail, build-outs, tenant improvements, and new construction for businesses of all sizes.",
    image: "/img/services/commercial-construction.png",
    icon: Building2,
  },
  {
    title: "Land Development",
    text: "Site development, land planning, utilities, grading, and infrastructure to transform land into value.",
    image: "/img/services/land-development.png",
    icon: MapPin,
  },
  {
    title: "Design & Planning",
    text: "Smart design solutions, feasibility planning, and value-engineered concepts to bring your vision to life.",
    image: "/img/services/design-planning.png",
    icon: DraftingCompass,
  },
  {
    title: "Project Management",
    text: "Professional project management with clear communication, scheduling, budgeting, and quality control.",
    image: "/img/services/project-management.png",
    icon: UserCheck,
  },
  {
    title: "Consulting Services",
    text: "Strategic advice and guidance for your construction and development needs from experienced professionals.",
    image: "/img/services/consulting-services.png",
    icon: Handshake,
  },
];

const reasons = [
  { label: "Licensed & Insured", icon: ShieldCheck },
  { label: "20+ Years of Experience", icon: Award },
  { label: "Lean Six Sigma Certified", icon: BadgeCheck },
  { label: "Professional Project Managers", icon: UserCheck },
  { label: "Quality, Safety & Timely Delivery", icon: CheckCircle2 },
];

function LogoBlock() {
  return (
    <Link className="logo-block" href="/#home" aria-label="BULADEV home">
      <img className="logo-image" src="/img/logo/logo-black.png" alt="BULADEV Building & Land Development" />
    </Link>
  );
}

function LogoWhite() {
  return (
    <Link className="logo-block" href="/#home" aria-label="BULADEV home">
      <img className="logo-image" src="/img/logo/logo.png" alt="BULADEV Building & Land Development" />
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

export default function ServicesPage() {
  return (
    <main className="services-page site-canvas min-h-screen text-coal">
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
                className={`nav-link ${item.label === "Services" ? "active" : ""} ${item.featured ? "nav-link-bid" : ""}`}
                href={item.href}
                key={item.label}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <Link className="header-cta modern-action-btn magnetic-btn" href="/contact-us">
            <ButtonLordIcon src="https://cdn.lordicon.com/oqdmuxru.json" />
            <span>Request Consultation</span>
          </Link>

          <input className="mobile-menu-check" id="services-mobile-menu-toggle" type="checkbox" />
          <label className="mobile-menu-button" htmlFor="services-mobile-menu-toggle" aria-label="Open menu">
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
            <Link className="mobile-menu-cta modern-action-btn magnetic-btn" href="/contact-us">
              <ButtonLordIcon src="https://cdn.lordicon.com/oqdmuxru.json" />
              <span>Request Consultation</span>
            </Link>
          </div>
        </div>
      </header>

      <section className="services-hero">
        <div className="services-hero-inner mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="services-breadcrumb" aria-label="Breadcrumb">
            <Link href="/#home">
              <Home className="h-4 w-4" />
              <span>Home</span>
            </Link>
            <span className="services-breadcrumb-divider">/</span>
            <span>Services</span>
          </div>

          <div className="services-hero-copy">
            <h1 className="services-hero-title hero-title">
              Our
              <span>Services.</span>
            </h1>
            <div className="services-hero-rule" />
            <p>
              Comprehensive construction, development, and project management solutions built on experience, quality, and trust.
            </p>
          </div>
        </div>
      </section>

      <section className="services-list-section">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="section-heading services-section-heading">
            <p className="services-kicker">What We Do</p>
            <h2>Complete Solutions for Every Stage of Your Project</h2>
            <p>
              From planning to completion, we deliver high-quality, safe, and efficient construction and development services for residential, commercial, and land projects.
            </p>
          </div>

          <div className="services-card-grid">
            {serviceCards.map(({ title, text, image, icon: Icon }) => (
              <article className="services-card service-card" key={title}>
                <div className="services-card-image-wrap project-image-wrap">
                  <img className="services-card-image project-image" src={image} alt={title} />
                  <span className="services-card-icon"><Icon className="h-8 w-8" /></span>
                </div>
                <div className="services-card-body">
                  <h3>{title}</h3>
                  <p>{text}</p>
                  <Link className="services-card-link" href="/contact-us">
                    <span>Learn More</span>
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="services-why-section px-4 sm:px-6 lg:px-8">
        <div className="services-why-grid mx-auto max-w-7xl">
          <div className="services-why-copy">
            <h2>Why Choose <span>BULADEV & ASA?</span></h2>
            <p>We combine experience, planning, and quality to deliver projects that stand the test of time.</p>
          </div>

          <div className="services-reasons">
            {reasons.map(({ label, icon: Icon }) => (
              <article className="services-reason stat-card" key={label}>
                <Icon className="services-reason-icon" aria-hidden="true" />
                <span>{label}</span>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="services-cta-section px-4 pb-12 sm:px-6 lg:px-8">
        <div className="cta-band image-match-cta mx-auto max-w-7xl text-white">
          <div className="image-match-cta-copy">
            <h2>Ready to Start Your Project?</h2>
            <p>Let&apos;s build something great together.</p>
          </div>

          <div className="image-match-cta-actions">
            <a className="image-match-cta-phone" href="tel:3134449734">
              <span className="image-match-cta-phone-icon">
                <Phone className="h-5 w-5" />
              </span>
              (313) 444-9734
            </a>
            <a className="image-match-cta-button modern-action-btn magnetic-btn" href="/contact-us">
              <span>Request Consultation</span>
              <ArrowRight className="h-4 w-4" />
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

            <p className="services-footer-copy">
              Building more than structures - we build relationships, communities, and a better future.
            </p>

            <div className="image-match-socials" aria-label="Social media links">
              <a href="#" aria-label="Facebook"><i className="fa-brands fa-facebook-f" /></a>
              <a href="#" aria-label="LinkedIn"><i className="fa-brands fa-linkedin-in" /></a>
              <a href="#" aria-label="Instagram"><i className="fa-brands fa-instagram" /></a>
            </div>
          </div>

          <FooterList title="Quick Links" items={footerQuickLinks} />
          <FooterTextList title="Our Services" items={serviceLinks} />

          <div>
            <h3 className="footer-title">Contact Info</h3>
            <ul className="image-match-contact-list">
              <li><Phone className="h-4 w-4" /><a href="tel:3134449734">(313) 444-9734</a></li>
              <li><Mail className="h-4 w-4" /><a href="mailto:bula@buladev.com">bula@BULADEV.com</a></li>
              <li><MapPin className="h-4 w-4" /><span>Kobe, Hyogo, Japan</span></li>
              <li><Clock className="h-4 w-4" /><span>Mon - Fri: 8:00 AM - 5:00 PM</span></li>
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

function FooterTextList({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <h3 className="footer-title">{title}</h3>
      <ul className="image-match-footer-links">
        {items.map((item) => (
          <li key={item}><Link href="/services">{item}</Link></li>
        ))}
      </ul>
    </div>
  );
}
