import { Link2, ShieldCheck, Mail } from "lucide-react";
import { Link } from "react-router-dom";
import { Navbar } from "../components/layout/Navbar";
import { SEO } from "../components/SEO";

const sections = [
  {
    title: "Information We Collect",
    content: [
      "When you create an account or use ViaLink, we may collect information such as your name, email address, account details, and authentication information handled through Clerk.",
      "We also process data related to the URLs you create, including custom aliases, custom domains, and QR code generation details.",
      "Subscription information, including plan selection and billing-related metadata, may also be collected to provide and manage your account.",
    ],
  },
  {
    title: "Link Analytics Data",
    content: [
      "ViaLink collects and processes click analytics to provide dashboard insights. This may include the number of clicks, approximate geographic location, device information, browser information, operating system, referrer information, and the date and time of clicks.",
      "These analytics help you understand link performance and improve your campaigns.",
    ],
  },
  {
    title: "Authentication Services",
    content: [
      "ViaLink uses Clerk for authentication. We do not store passwords directly in our application. Authentication data is processed by Clerk according to their privacy practices.",
    ],
  },
  {
    title: "Payment Information",
    content: [
      "Payments are processed by Razorpay. ViaLink does not store card numbers, UPI PINs, or banking credentials. Subscription payments are securely handled by Razorpay.",
    ],
  },
  {
    title: "How We Use Information",
    content: [
      "We use your information to provide URL shortening, generate QR codes, deliver analytics, manage subscriptions, improve the service, prevent abuse, and support customer needs.",
    ],
  },
  {
    title: "Cookies and Tracking Technologies",
    content: [
      "We may use cookies, local storage, and similar technologies to remember preferences, maintain sessions, and understand service usage. You may control these settings through your browser.",
    ],
  },
  {
    title: "Data Storage and Security",
    content: [
      "ViaLink is hosted on Oracle Cloud VPS. We use reasonable administrative, technical, and physical safeguards to protect your information. No online service can guarantee absolute security.",
    ],
  },
  {
    title: "Data Retention",
    content: [
      "We retain personal data for as long as necessary to provide the service, fulfill legal obligations, resolve disputes, and enforce agreements. If you delete your account, we may retain limited data where required by law.",
    ],
  },
  {
    title: "Account Deletion and User Requests",
    content: [
      "You may request access, correction, or deletion of your personal information by contacting us at support@vialink.in. We will review your request in accordance with applicable law.",
    ],
  },
  {
    title: "Third Party Services",
    content: [
      "ViaLink uses third-party services including Clerk for authentication, Razorpay for payments, and Oracle Cloud for hosting. These providers process data according to their own privacy practices.",
    ],
  },
  {
    title: "Children's Privacy",
    content: [
      "ViaLink is not intended for children under the age of 13. If we discover that we have collected personal information from a child without appropriate consent, we will take steps to delete it.",
    ],
  },
  {
    title: "Changes to Privacy Policy",
    content: [
      "We may update this Privacy Policy from time to time. Material changes will be posted on this page with an updated effective date.",
    ],
  },
];

export function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100">
      <SEO
        title="Privacy Policy | ViaLink"
        description="Read ViaLink's privacy policy covering data collection, analytics, payments, security, and user rights."
        keywords="ViaLink privacy policy, URL shortener privacy, analytics privacy"
        canonical="https://vialink.in/privacy"
      />

      <Navbar />

      <main className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="rounded-3xl border border-slate-200 bg-slate-50/80 p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900/70 sm:p-10 lg:p-12">
            <div className="flex flex-wrap items-center gap-3 text-sm text-indigo-600 dark:text-indigo-400">
              <span className="inline-flex items-center rounded-full bg-indigo-50 px-3 py-1 font-medium dark:bg-indigo-950/60">
                <ShieldCheck className="mr-2 h-4 w-4" />
                Privacy Commitment
              </span>
            </div>

            <h1 className="mt-6 text-4xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-5xl">
              Privacy Policy
            </h1>
            <p className="mt-4 max-w-3xl text-lg text-slate-600 dark:text-slate-400">
              This Privacy Policy explains how ViaLink collects, uses, stores, and protects your information when you use our URL shortener SaaS platform.
            </p>
            <p className="mt-4 text-sm text-slate-500 dark:text-slate-400">
              Last updated: 19 July 2026
            </p>

            <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-950/70">
              <p className="text-base leading-8 text-slate-700 dark:text-slate-300">
                ViaLink is committed to protecting your privacy. We operate from India and are currently managed as an individual-run service. This policy is intended to be clear, transparent, and practical for our users.
              </p>
            </div>

            <div className="mt-10 space-y-6">
              {sections.map((section) => (
                <section
                  key={section.title}
                  className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-950/70"
                >
                  <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
                    {section.title}
                  </h2>
                  <div className="mt-4 space-y-3 text-sm leading-7 text-slate-700 dark:text-slate-300">
                    {section.content.map((text) => (
                      <p key={text}>{text}</p>
                    ))}
                  </div>
                </section>
              ))}
            </div>

            <section className="mt-10 rounded-2xl border border-indigo-200 bg-indigo-50/70 p-6 dark:border-indigo-900/60 dark:bg-indigo-950/40">
              <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
                Contact Information
              </h2>
              <p className="mt-3 text-sm leading-7 text-slate-700 dark:text-slate-300">
                If you have questions about this Privacy Policy or your data, please contact us at <a href="mailto:support@vialink.in" className="font-medium text-indigo-600 dark:text-indigo-400">support@vialink.in</a>.
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

export default PrivacyPolicy;
