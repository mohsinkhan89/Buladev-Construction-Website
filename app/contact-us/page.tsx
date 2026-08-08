import Link from "next/link";
import { createElement, type CSSProperties } from "react";
import StickyHeaderState from "../StickyHeaderState";
import ScrollReveal from "../ScrollReveal";
import ContactForm from "./ContactForm";
import {
  ArrowRight,
  Building2,
  Clock,
  Home,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";

const navItems = [
  { label: "Home", href: "/#home" },
  { label: "About", href: "/about-us" },
  { label: "Services", href: "/#services" },
  { label: "Projects", href: "/#projects" },
  { label: "Partner With Us", href: "/partner-with-us" },
  { label: "Bid List", href: "/#bid-list", featured: true },
  { label: "Contact", href: "/contact-us" },
];

const footerQuickLinks = [
  { label: "Home", href: "/#home" },
  { label: "About Us", href: "/about-us" },
  { label: "Services", href: "/#services" },
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

const contactItems = [
  { label: "Call Us", value: "(313) 444-9734", href: "tel:3134449734", icon: Phone },
  { label: "Email Us", value: "bula@BULADEV.com", href: "mailto:bula@buladev.com", icon: Mail },
  { label: "Our Office", value: "Kobe, Hyogo, Japan", href: "#office", icon: MapPin },
  { label: "Business Hours", value: "Mon - Fri: 8:00 AM - 5:00 PM", href: "#office", icon: Clock },
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

export default function ContactUsPage() {
  return (
    <main className="contact-page site-canvas min-h-screen text-coal">
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
                className={`nav-link ${item.label === "Contact" ? "active" : ""} ${item.featured ? "nav-link-bid" : ""}`}
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

          <input className="mobile-menu-check" id="contact-mobile-menu-toggle" type="checkbox" />
          <label className="mobile-menu-button" htmlFor="contact-mobile-menu-toggle" aria-label="Open menu">
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

      <section className="contact-hero">
        <div className="contact-hero-inner mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="contact-breadcrumb" aria-label="Breadcrumb">
            <Link href="/#home">
              <Home className="h-4 w-4" />
              <span>Home</span>
            </Link>
            <span className="contact-breadcrumb-divider">/</span>
            <span>Contact Us</span>
          </div>

          <div className="contact-hero-copy">
            <h1 className="contact-hero-title hero-title">
              Contact
              <span>Us.</span>
            </h1>
            <div className="contact-hero-rule" />
            <p>
              We&apos;re here to help and answer any question you might have. We look forward to hearing from you.
            </p>
          </div>
        </div>
      </section>

      <section className="contact-main-section">
        <div className="contact-main-grid mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <aside className="contact-info-panel section-heading">
            <p className="contact-kicker">Get In Touch</p>
            <h2>Let&apos;s Talk About Your Project.</h2>
            <p>Fill out the form and our team will get back to you as soon as possible.</p>

            <div className="contact-info-list">
              {contactItems.map(({ label, value, href, icon: Icon }) => (
                <a className="contact-info-item service-card" href={href} key={label}>
                  <span className="contact-info-icon"><Icon className="h-5 w-5" /></span>
                  <span>
                    <strong>{label}</strong>
                    <em>{value}</em>
                  </span>
                </a>
              ))}
            </div>
          </aside>

          <ContactForm />
        </div>
      </section>

      <section className="contact-office-section" id="office">
        <div className="contact-office-grid mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <article className="contact-office-card service-card">
            <Building2 className="contact-office-icon" aria-hidden="true" />
            <h2>Our Head Office</h2>
            <div className="contact-office-rule" />
            <p>Kobe, Hyogo, Japan</p>
            <p>Visit our office or give us a call to discuss how we can bring your vision to life.</p>
            <a className="contact-directions modern-action-btn magnetic-btn" href="https://maps.google.com/?q=Kobe%2C%20Hyogo%2C%20Japan">
              <MapPin className="h-4 w-4" />
              <span>Get Directions</span>
            </a>
          </article>

          <div className="contact-map-panel project-image-wrap" aria-label="Map showing BULADEV office location">
            <div className="contact-map-grid" />
            <div className="contact-map-roads" />
            <div className="contact-map-pin">
              <MapPin className="h-7 w-7" />
            </div>
            <span className="contact-map-label contact-map-label-one">Kobe Center</span>
            <span className="contact-map-label contact-map-label-two">Hyogo Area</span>
            <span className="contact-map-label contact-map-label-three">Port District</span>
          </div>
        </div>
      </section>

      <section className="contact-cta-section px-4 pb-12 sm:px-6 lg:px-8">
        <div className="cta-band image-match-cta mx-auto max-w-7xl text-white">
          <div className="image-match-cta-copy">
            <h2>Have a project in mind?</h2>
            <p>Let&apos;s build something great together.</p>
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

            <p className="contact-footer-copy">
              Building more than structures - we build relationships, communities, and a better future.
            </p>

            <div className="image-match-socials" aria-label="Social media links">
              <a href="#" aria-label="Facebook"><i className="fa-brands fa-facebook-f" /></a>
              <a href="#" aria-label="LinkedIn"><i className="fa-brands fa-linkedin-in" /></a>
              <a href="#" aria-label="Instagram"><i className="fa-brands fa-instagram" /></a>
            </div>
          </div>

          <FooterList title="Quick Links" items={footerQuickLinks} />
          <FooterTextList title="Our Services" items={services} />

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
          <li key={item}><Link href="/#services">{item}</Link></li>
        ))}
      </ul>
    </div>
  );
}




