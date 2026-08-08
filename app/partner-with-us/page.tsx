import Link from "next/link";
import { createElement, type CSSProperties } from "react";
import StickyHeaderState from "../StickyHeaderState";
import ScrollReveal from "../ScrollReveal";
import { Home, Phone } from "lucide-react";

const navItems = [
  { label: "Home", href: "/#home" },
  { label: "About", href: "/about-us" },
  { label: "Partner With Us", href: "/partner-with-us" },
  { label: "Services", href: "/services" },
  { label: "Projects", href: "/#projects" },
  { label: "Bid List", href: "/#bid-list", featured: true },
  { label: "Contact", href: "/contact-us" },
];

const partnerCards = [
  {
    title: "Partner with Buladev Building",
    image: "/img/partners/partner-building.png",
    href: "/#bid-list",
    icon: "https://cdn.lordicon.com/abwrkdvl.json",
  },
  {
    title: "Partner with Buladev Development",
    image: "/img/partners/partner-development.png",
    href: "/#bid-list",
    icon: "https://cdn.lordicon.com/wloilxuq.json",
  },
];

const footerQuickLinks = [
  { label: "Home", href: "/#home" },
  { label: "About Us", href: "/about-us" },
  { label: "Partner With Us", href: "/partner-with-us" },
  { label: "Services", href: "/services" },
  { label: "Projects", href: "/#projects" },
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
    colors: light ? "primary:#ffffff,secondary:#fed7aa" : "primary:#f57216,secondary:#f57216",
    className: "button-lord-icon",
    style: { width: "20px", height: "20px" } as CSSProperties,
  });
}

function CardLordIcon({ src }: { src: string }) {
  return createElement("lord-icon", {
    src,
    trigger: "loop-on-hover",
    target: ".partner-card",
    delay: "160",
    colors: "primary:#ffffff,secondary:#fed7aa",
    className: "partner-card-lord-icon",
    style: { width: "34px", height: "34px" } as CSSProperties,
  });
}

export default function PartnerWithUsPage() {
  return (
    <main className="partner-page site-canvas min-h-screen text-coal">
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
                className={`nav-link ${item.label === "Partner With Us" ? "active" : ""} ${item.featured ? "nav-link-bid" : ""}`}
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

          <input className="mobile-menu-check" id="partner-mobile-menu-toggle" type="checkbox" />
          <label className="mobile-menu-button" htmlFor="partner-mobile-menu-toggle" aria-label="Open menu">
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

      <section className="partner-hero">
        <div className="partner-hero-inner mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="partner-breadcrumb" aria-label="Breadcrumb">
            <Link href="/#home">
              <Home className="h-4 w-4" />
              <span>Home</span>
            </Link>
            <span className="partner-breadcrumb-divider">/</span>
            <span>Partner With Us</span>
          </div>

          <div className="partner-hero-copy">
            <h1 className="partner-hero-title">
              Partner
              <span>With Us.</span>
            </h1>
            {/* <div className="partner-hero-rule" /> */}
            <p>
              Collaboration is at the core of everything we build.<br />
              Together, we create lasting impact in our communities.
            </p>
            <Link className="partner-hero-button modern-action-btn magnetic-btn" href="#partner-options">
              <ButtonLordIcon src="https://cdn.lordicon.com/abwrkdvl.json" />
              <span>Let&apos;s Build Together</span>
            </Link>
          </div>
        </div>
      </section>

      <section className="partner-options-section" id="partner-options">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="partner-card-grid">
            {partnerCards.map((card) => (
              <article className="partner-card" key={card.title}>
                <img src={card.image} alt={card.title} />
                <div className="partner-card-body">
                  <div className="partner-card-icon" aria-hidden="true">
                    <CardLordIcon src={card.icon} />
                  </div>
                  <h2>{card.title}</h2>
                  <Link className="partner-card-learn-more" href={card.href}>
                    <span>Learn More</span>
                    <ButtonLordIcon
                      src="https://cdn.lordicon.com/zmkotitn.json"
                      light={false}
                      target=".partner-card-learn-more"
                    />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="partner-cta-section px-4 pb-12 sm:px-6 lg:px-8" id="contact">
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

            <p className="partner-footer-copy">
              Building more than structures - we build relationships, communities, and a better future.
            </p>

            <div className="image-match-socials" aria-label="Social media links">
              <a href="#" aria-label="Facebook"><i className="fa-brands fa-facebook-f" /></a>
              <a href="#" aria-label="LinkedIn"><i className="fa-brands fa-linkedin-in" /></a>
              <a href="#" aria-label="Instagram"><i className="fa-brands fa-instagram" /></a>
            </div>
          </div>

          <FooterList title="Quick Links" items={footerQuickLinks} />
          <FooterTextList title="Services" items={services} />

          <div>
            <h3 className="footer-title">Contact Info</h3>
            <ul className="image-match-contact-list">
              <li><i className="fa-solid fa-phone" /><a href="tel:3134449734">(313) 444-9734</a></li>
              <li><i className="fa-solid fa-envelope" /><a href="mailto:bula@buladev.com">bids@BULADEV.com</a></li>
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

function FooterTextList({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <h3 className="footer-title">{title}</h3>
      <ul className="image-match-footer-links">
        {items.map((item) => (
          <li key={item}><Link href="/#services">{item}</Link></li>
        ))}
      </ul>
    </div>
  );
}



