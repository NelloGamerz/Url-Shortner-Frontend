import { Link2, FileText, Mail, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Navbar } from "../components/layout/Navbar";
import { SEO } from "../components/SEO";

const planDetails = [
  {
    name: "Free Plan",
    features: ["5 short links", "Basic analytics"],
  },
  {
    name: "Pro Plan",
    features: ["100 short links", "Advanced analytics", "QR code generation", "Custom aliases", "1 custom domain"],
  },
  {
    name: "Ultimate Plan",
    features: ["1000 short links", "Advanced analytics", "QR code generation", "Custom aliases", "5 custom domains", "Priority support"],
  },
];

const sections = [
  {
    title: "About ViaLink",
    content: [
      "ViaLink is a URL shortener SaaS platform that helps users shorten, manage, and track links. We provide link management tools, QR code generation, custom aliases, custom domains, and analytics dashboards.",
    ],
  },
  {
    title: "Account Registration",
    content: [
      "To use certain features, you may need to create an account. You agree to provide accurate and complete information and to keep your account credentials secure. You are responsible for all activity under your account.",
    ],
  },
  {
    title: "Subscription Plans",
    content: [
      "ViaLink offers monthly subscription plans. The plans and features may change over time, and we reserve the right to introduce new plans or adjust existing ones.",
    ],
  },
  {
    title: "Payments and Billing",
    content: [
      "Subscription plans are billed monthly through Razorpay. You agree to pay all applicable fees and taxes. Subscription cancellation is available according to the billing settings in your account. Payments are generally non-refundable unless required by applicable law or approved by ViaLink.",
    ],
  },
  {
    title: "Acceptable Use Policy",
    content: [
      "You may not use ViaLink to distribute malware, phishing content, spam, fraud, illegal material, copyright-infringing content, or other harmful activities. We reserve the right to suspend or remove links that violate these terms.",
    ],
  },
  {
    title: "Link Suspension and Removal",
    content: [
      "ViaLink may suspend or remove links or accounts that violate these Terms, pose a security risk, or otherwise create abuse or legal concerns.",
    ],
  },
  {
    title: "Fair Usage Policy",
    content: [
      "We reserve the right to enforce fair use of our service, including limits on excessive usage that may affect system performance or service quality for other users.",
    ],
  },
  {
    title: "User Responsibilities",
    content: [
      "You are responsible for the content you shorten and distribute. You must ensure that your use of the service complies with applicable law and does not infringe the rights of others.",
    ],
  },
  {
    title: "Intellectual Property",
    content: [
      "ViaLink and its related materials are owned by us or our licensors. You may use the service only for lawful purposes and may not copy or redistribute the platform or branding without permission.",
    ],
  },
  {
    title: "Service Availability",
    content: [
      "We strive to keep ViaLink available and reliable, but we do not guarantee uninterrupted service. Maintenance, outages, or technical issues may temporarily affect availability.",
    ],
  },
  {
    title: "Limitation of Liability",
    content: [
      "ViaLink shall not be liable for indirect, incidental, or consequential damages arising from the use of the service, except to the extent prohibited by law.",
    ],
  },
  {
    title: "Termination",
    content: [
      "We may suspend or terminate your access to the service if you breach these Terms or if the service is no longer provided.",
    ],
  },
  {
    title: "Changes to Terms",
    content: [
      "We may update these Terms from time to time. Continued use of the service after changes are posted means you accept the revised Terms.",
    ],
  },
  {
    title: "Governing Law",
    content: [
      "These Terms are governed by the laws of India, without regard to conflict of law principles.",
    ],
  },
];

export function Terms() {
  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100">
      <SEO
        title="Terms of Service | ViaLink"
        description="Read ViaLink's terms of service covering account use, billing, acceptable use, and liability."
        keywords="ViaLink terms of service, URL shortener terms"
        canonical="https://vialink.in/terms"
      />

      <Navbar />

      <main className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="rounded-3xl border border-slate-200 bg-slate-50/80 p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900/70 sm:p-10 lg:p-12">
            <div className="flex flex-wrap items-center gap-3 text-sm text-indigo-600 dark:text-indigo-400">
              <span className="inline-flex items-center rounded-full bg-indigo-50 px-3 py-1 font-medium dark:bg-indigo-950/60">
                <FileText className="mr-2 h-4 w-4" />
                Service Agreement
              </span>
            </div>

            <h1 className="mt-6 text-4xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-5xl">
              Terms of Service
            </h1>
            <p className="mt-4 max-w-3xl text-lg text-slate-600 dark:text-slate-400">
              These Terms of Service govern your use of ViaLink and the services we provide.
            </p>
            <p className="mt-4 text-sm text-slate-500 dark:text-slate-400">
              Last updated: 19 July 2026
            </p>

            <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-950/70">
              <p className="text-base leading-8 text-slate-700 dark:text-slate-300">
                By using ViaLink, you agree to these Terms of Service. Please read them carefully before using the platform.
              </p>
            </div>

            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {planDetails.map((plan) => (
                <div key={plan.name} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-950/70">
                  <h2 className="text-lg font-semibold text-slate-900 dark:text-white">{plan.name}</h2>
                  <ul className="mt-3 space-y-2 text-sm text-slate-700 dark:text-slate-300">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2">
                        <ArrowRight className="mt-0.5 h-4 w-4 shrink-0 text-indigo-600 dark:text-indigo-400" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div className="mt-10 space-y-6">
              {sections.map((section) => (
                <section key={section.title} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-950/70">
                  <h2 className="text-xl font-semibold text-slate-900 dark:text-white">{section.title}</h2>
                  <div className="mt-4 space-y-3 text-sm leading-7 text-slate-700 dark:text-slate-300">
                    {section.content.map((text) => (
                      <p key={text}>{text}</p>
                    ))}
                  </div>
                </section>
              ))}
            </div>

            <section className="mt-10 rounded-2xl border border-indigo-200 bg-indigo-50/70 p-6 dark:border-indigo-900/60 dark:bg-indigo-950/40">
              <h2 className="text-xl font-semibold text-slate-900 dark:text-white">Contact Information</h2>
              <p className="mt-3 text-sm leading-7 text-slate-700 dark:text-slate-300">
                For questions about these Terms, please contact us at <a href="mailto:support@vialink.in" className="font-medium text-indigo-600 dark:text-indigo-400">support@vialink.in</a>.
              </p>
            </section>
          </div>
        </div>
      </main>

      <footer className="border-t border-slate-200 bg-white/80 px-4 py-10 dark:border-slate-800 dark:bg-slate-950/80 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600">
              <Link2 className="h-5 w-5 text-white" />
            </div>
            <span className="text-lg font-semibold text-slate-900 dark:text-white">ViaLink</span>
          </div>
          <div className="flex flex-wrap items-center gap-4 text-sm text-slate-600 dark:text-slate-400">
            <Link to="/privacy" className="transition hover:text-indigo-600 dark:hover:text-indigo-400">
              Privacy
            </Link>
            <Link to="/terms" className="transition hover:text-indigo-600 dark:hover:text-indigo-400">
              Terms
            </Link>
            <a href="mailto:support@vialink.in" className="inline-flex items-center gap-1 transition hover:text-indigo-600 dark:hover:text-indigo-400">
              <Mail className="h-4 w-4" />
              Contact
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Terms;
