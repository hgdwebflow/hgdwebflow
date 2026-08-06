import { createFileRoute, Link } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useState } from "react";
import {
  ArrowRight,
  CheckCircle2,
  Code2,
  Gauge,
  Loader2,
  Search,
  Smartphone,
  Wrench,
} from "lucide-react";
import { toast } from "sonner";

import { submitContact } from "@/lib/contact.functions";


const TITLE = "Website Design & Development | HGD Webflow";
const DESCRIPTION =
  "HGD Webflow designs and builds fast, mobile-first, SEO-ready websites for small businesses. Free landing page first — only pay if you love it.";

const JSON_LD = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "HGD Webflow",
  description: DESCRIPTION,
  email: "hgd.webflow@gmail.com",
  areaServed: "United Kingdom",
  serviceType: [
    "Website design",
    "Website development",
    "SEO",
    "Website maintenance",
  ],
};

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      {
        name: "keywords",
        content:
          "website design, website development, small business website, web designer, SEO, HGD Webflow",
      },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "HGD Webflow" },
      { property: "og:url", content: "/" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESCRIPTION },
      { name: "robots", content: "index, follow" },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [{ type: "application/ld+json", children: JSON.stringify(JSON_LD) }],
  }),
  component: Index,
});


const services = [
  {
    icon: Code2,
    title: "Website Design & Build",
    description:
      "Bespoke, hand-built websites designed around your brand and built to convert visitors into enquiries.",
  },
  {
    icon: Smartphone,
    title: "Responsive & Mobile-First",
    description:
      "Every layout is crafted to look sharp and work flawlessly on phones, tablets and desktops.",
  },
  {
    icon: Gauge,
    title: "Speed & Performance",
    description:
      "Lean code and optimised assets so your pages load fast and keep people on the site.",
  },
  {
    icon: Search,
    title: "SEO Foundations",
    description:
      "Clean structure, proper metadata and technical SEO built in from day one so you get found.",
  },
  {
    icon: Wrench,
    title: "Care & Maintenance",
    description:
      "Updates, fixes, backups and improvements so your site keeps working long after launch.",
  },
];

const emptyForm = {
  name: "",
  email: "",
  phone: "",
  company: "",
  budget: "",
  message: "",
};

function Index() {
  const send = useServerFn(submitContact);
  const [form, setForm] = useState(emptyForm);
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);

  const update = (key: keyof typeof emptyForm) => (value: string) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitting) return;
    setSubmitting(true);
    try {
      await send({ data: form });
      setSent(true);
      setForm(emptyForm);
      toast.success("Enquiry sent — we'll be in touch shortly.");
    } catch (error) {
      console.error(error);
      toast.error(
        error instanceof Error ? error.message : "Something went wrong. Please try again.",
      );
    } finally {
      setSubmitting(false);
    }
  }

  const fieldClass =
    "w-full rounded-lg border border-input bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-foreground/40 focus:outline-none focus:ring-2 focus:ring-ring/30";

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-50 border-b border-border bg-background/85 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <Link to="/" className="flex items-center gap-3">
            <img
              src={hgdLogo.url}
              alt="HGD Webflow logo"
              width={40}
              height={40}
              className="h-10 w-10 rounded-lg object-cover"
            />
            <span className="font-heading text-lg font-bold uppercase tracking-[0.2em]">
              HGD<span className="text-muted-foreground"> Webflow</span>
            </span>
          </Link>

          <nav className="hidden items-center gap-8 text-sm font-medium text-muted-foreground md:flex">
            <a href="#services" className="transition-colors hover:text-foreground">
              Services
            </a>
            <a href="#offer" className="transition-colors hover:text-foreground">
              Free landing page
            </a>
            <a href="#contact" className="transition-colors hover:text-foreground">
              Contact
            </a>
          </nav>

        </div>
      </header>

      {/* Hero */}
      <section className="border-b border-border px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div className="mx-auto max-w-6xl">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-muted-foreground">
            Website design &amp; development
          </p>
          <h1 className="mt-6 max-w-4xl font-heading text-4xl font-bold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
            Websites that look sharp and actually win work.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            HGD Webflow designs and builds fast, clean, mobile-first websites for businesses that
            want to be taken seriously online. No templates, no bloat — just a site that does its
            job.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-base font-semibold text-primary-foreground transition-opacity hover:opacity-90"
            >
              Start your project
              <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href="#services"
              className="inline-flex items-center gap-2 rounded-full border border-border px-7 py-3.5 text-base font-semibold transition-colors hover:bg-secondary"
            >
              See what we do
            </a>
          </div>

          <div className="mt-14 grid gap-4 border-t border-border pt-10 sm:grid-cols-3">
            {["Built for you", "Quick response time", "Fast creation and SEO optimised"].map((item) => (
              <div key={item} className="flex items-center gap-2 text-sm text-muted-foreground">
                <CheckCircle2 className="h-4 w-4 text-foreground" />
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="px-4 py-20 sm:px-6 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-6xl">
          <h2 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl">What we do</h2>
          <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
            Everything needed to get your business online properly — designed, built and looked
            after in one place.
          </p>

          <div className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <div key={service.title} className="bg-background p-7 transition-colors hover:bg-card">
                <service.icon className="h-6 w-6" />
                <h3 className="mt-5 font-heading text-lg font-semibold">{service.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Free landing page offer */}
      <section id="offer" className="border-y border-border px-4 py-20 sm:px-6 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-12 lg:grid-cols-[1.2fr_1fr]">
            <div>
              <h2 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
                Try before you commit.
              </h2>
              <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
                I will build you a free landing page for your business. If you like it, we can move
                forward. If you don't, just say you no longer want the website and you will be
                charged nothing.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-base font-semibold text-primary-foreground transition-opacity hover:opacity-90"
                >
                  Claim your free page
                  <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            </div>

            <div className="space-y-6">
              {[
                {
                  title: "No upfront cost",
                  description: "I design and build the landing page first. You only pay if you want to keep going.",
                },
                {
                  title: "No pressure",
                  description: "If it's not right, just let me know. There's no contract or fee to walk away.",
                },
                {
                  title: "Built for your business",
                  description: "The page is tailored to your brand, your message and what you want visitors to do.",
                },
              ].map((item) => (
                <div key={item.title} className="flex gap-4">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-foreground" />
                  <div>
                    <h3 className="font-heading text-base font-semibold">{item.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact form */}
      <section id="contact" className="px-4 py-20 sm:px-6 lg:px-8 lg:py-24">
        <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[1fr_1.2fr]">
          <div>
            <h2 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl">
              Tell us about your project
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Fill in the form and we'll get back to you with honest advice, a timeline and a price.
              No jargon, no pressure.
            </p>
            <ul className="mt-8 space-y-3 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-foreground" /> Reply within one working day
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-foreground" /> Your details are never shared
              </li>
            </ul>
          </div>

          <div className="rounded-2xl border border-border bg-card p-6 sm:p-8">
            {sent ? (
              <div className="py-10 text-center">
                <CheckCircle2 className="mx-auto h-10 w-10" />
                <h3 className="mt-5 font-heading text-xl font-semibold">Thanks — enquiry received</h3>
                <p className="mt-3 text-sm text-muted-foreground">
                  We've got your details and will be in touch shortly.
                </p>
                <button
                  type="button"
                  onClick={() => setSent(false)}
                  className="mt-6 rounded-full border border-border px-5 py-2.5 text-sm font-semibold transition-colors hover:bg-secondary"
                >
                  Send another enquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="name" className="mb-2 block text-sm font-medium">
                      Name *
                    </label>
                    <input
                      id="name"
                      name="name"
                      required
                      maxLength={100}
                      value={form.name}
                      onChange={(e) => update("name")(e.target.value)}
                      className={fieldClass}
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="mb-2 block text-sm font-medium">
                      Email *
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      maxLength={255}
                      value={form.email}
                      onChange={(e) => update("email")(e.target.value)}
                      className={fieldClass}
                      placeholder="you@example.com"
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="mb-2 block text-sm font-medium">
                      Phone
                    </label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      maxLength={40}
                      value={form.phone}
                      onChange={(e) => update("phone")(e.target.value)}
                      className={fieldClass}
                      placeholder="Optional"
                    />
                  </div>
                  <div>
                    <label htmlFor="company" className="mb-2 block text-sm font-medium">
                      Business name
                    </label>
                    <input
                      id="company"
                      name="company"
                      maxLength={120}
                      value={form.company}
                      onChange={(e) => update("company")(e.target.value)}
                      className={fieldClass}
                      placeholder="Optional"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label htmlFor="budget" className="mb-2 block text-sm font-medium">
                      Budget
                    </label>
                    <input
                      id="budget"
                      name="budget"
                      maxLength={80}
                      value={form.budget}
                      onChange={(e) => update("budget")(e.target.value)}
                      className={fieldClass}
                      placeholder="Optional — e.g. around £2,000"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="mb-2 block text-sm font-medium">
                    Project details * — what is your business and what do you offer?
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    maxLength={2000}
                    value={form.message}
                    onChange={(e) => update("message")(e.target.value)}
                    className={fieldClass}
                    placeholder="Tell us what your business is and what you offer, what you need building, and when you need it by."
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-7 py-3.5 text-base font-semibold text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-60"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" /> Sending…
                    </>
                  ) : (
                    <>
                      Send enquiry <ArrowRight className="h-4 w-4" />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      <footer className="border-t border-border px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 sm:flex-row">
          <div className="flex items-center gap-3">
            <img
              src={hgdLogo.url}
              alt="HGD Webflow logo"
              width={36}
              height={36}
              loading="lazy"
              className="h-9 w-9 rounded-lg object-cover"
            />
            <span className="font-heading text-base font-bold uppercase tracking-[0.2em]">
              HGD Webflow
            </span>
          </div>
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} HGD Webflow. Website design &amp; development.
          </p>
          <a
            href="mailto:hgd.webflow@gmail.com"
            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            hgd.webflow@gmail.com
          </a>
        </div>
      </footer>
    </div>
  );
}
