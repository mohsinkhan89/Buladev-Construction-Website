import Link from "next/link";
import { createElement, type CSSProperties } from "react";
import StickyHeaderState from "../StickyHeaderState";
import ScrollReveal from "../ScrollReveal";
import {
  ArrowRight,
  Award,
  BadgeCheck,
  Eye,
  HardHat,
  Home,
  Phone,
  ShieldCheck,
  Target,
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

const services = [
  "Residential Construction",
  "Commercial Construction",
  "Land Development",
  "Design & Build",
  "Project Management",
];

const aboutStats = [
  { label: "Years of Experience", value: "20+", icon: Award },
  { label: "Licensed & Insured", value: "Trusted", icon: ShieldCheck },
  { label: "Lean Six Sigma Certified", value: "Certified", icon: BadgeCheck },
  { label: "Professional Project Managers", value: "Expert", icon: UserCheck },
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

export default function AboutUsPage() {
  return (
    <main className="about-page site-canvas min-h-screen text-coal">
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
                className={`nav-link ${item.label === "About" ? "active" : ""} ${item.featured ? "nav-link-bid" : ""}`}
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

          <input className="mobile-menu-check" id="about-mobile-menu-toggle" type="checkbox" />
          <label className="mobile-menu-button" htmlFor="about-mobile-menu-toggle" aria-label="Open menu">
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

      <section className="about-hero">
        <div className="about-hero-inner mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="about-breadcrumb" aria-label="Breadcrumb">
            <Link href="/#home">
              <Home className="h-4 w-4" />
              <span>Home</span>
            </Link>
            <span className="about-breadcrumb-divider">/</span>
            <span>About Us</span>
          </div>

          <div className="about-hero-copy">
            <h1 className="about-hero-title hero-title">
              About
              <span>Us.</span>
            </h1>
            <div className="about-hero-rule" />
            <p>
              BULADEV Building & Land Development and ASA Construction LLC deliver innovative,
              sustainable, and high-quality construction and development solutions.
            </p>
          </div>
        </div>
      </section>

      <section className="about-intro-section">
        <div className="about-intro-grid mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="about-image-frame project-image-wrap">
            <img
              className="about-intro-image project-image"
              src="/img/aboutus/woweare-img.png"
              alt="Modern commercial building developed by BULADEV"
            />
          </div>

          <div className="section-heading about-section-heading">
            <p className="about-kicker">Who We Are</p>
            <h2>
              Builders, Developers, and Project <span>Partners.</span>
            </h2>
            <p>
              We are builders, developers, and professional project managers dedicated to delivering
              innovative, sustainable, and high-quality construction and development solutions.
            </p>
            <p>
              With 20 years of experience, licensed and insured services, Lean Six Sigma certified
              practices, and a skilled team, we help clients turn ideas into real, lasting results.
            </p>
          </div>
        </div>

        <div className="about-stats-row mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {aboutStats.map(({ label, value, icon: Icon }) => (
            <article className="about-stat-card stat-card" key={label}>
              <Icon className="about-stat-icon" aria-hidden="true" />
              <strong>{value}</strong>
              <span>{label}</span>
            </article>
          ))}
        </div>
      </section>

      <section className="about-values-section">
        <div className="about-values-grid mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <article className="about-value-card service-card">
            <Target className="about-value-icon" aria-hidden="true" />
            <h2>Our Mission</h2>
            <p>
              To deliver exceptional construction and development services that enhance communities
              and create value for generations.
            </p>
          </article>

          <article className="about-value-card service-card">
            <Eye className="about-value-icon" aria-hidden="true" />
            <h2>Our Vision</h2>
            <p>
              To be a leading construction and development company recognized for innovation,
              integrity, and long-term impact.
            </p>
          </article>
        </div>
      </section>

      <section className="about-cta-section px-4 pb-12 sm:px-6 lg:px-8" id="contact">
        <div className="cta-band image-match-cta mx-auto max-w-7xl text-white">
          <div className="about-cta-icon" aria-hidden="true">
            <HardHat className="h-8 w-8" />
          </div>

          <div className="image-match-cta-copy">
            <h2>Ready to Build Your Vision?</h2>
            <p>Let&apos;s work together to turn your ideas into reality.</p>
          </div>

          <div className="image-match-cta-actions">
            <a className="image-match-cta-phone" href="tel:3134449734">
              <span className="image-match-cta-phone-icon">
                <Phone className="h-5 w-5" />
              </span>
              (313) 444-9734
            </a>
            <a className="image-match-cta-button modern-action-btn magnetic-btn" href="mailto:bula@buladev.com">
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

            <div className="image-match-socials" aria-label="Social media links">
              <a href="#" aria-label="Facebook"><i className="fa-brands fa-facebook-f" /></a>
              <a href="#" aria-label="LinkedIn"><i className="fa-brands fa-linkedin-in" /></a>
              <a href="#" aria-label="Instagram"><i className="fa-brands fa-instagram" /></a>
            </div>
          </div>

          <FooterList title="Quick Links" items={[
            { label: "Home", href: "/#home" },
            { label: "About Us", href: "/about-us" },
            { label: "Partner With Us", href: "/partner-with-us" },
            { label: "Services", href: "/services" },
            { label: "Projects", href: "/#projects" },
            { label: "Join Our Bid List", href: "/#bid-list" },
            { label: "Contact", href: "/contact-us" },
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



