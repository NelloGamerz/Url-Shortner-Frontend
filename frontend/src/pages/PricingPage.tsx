import { Link } from "react-router-dom";
import { Check, Sparkles } from "lucide-react";
import { Button } from "../components/ui/button";
import { Navbar } from "../components/layout/Navbar";
import { PricingCard } from "../components/common/PricingCard";
import { useAuth } from "@clerk/clerk-react";
import type { SubscriptionPlanId } from "../services/subscriptionService";
import { useSubscription } from "../hooks/useSubscription";

const plans: Array<{
  name: string;
  planId: SubscriptionPlanId;
  price: string;
  description: string;
  isPopular: boolean;
  buttonText: string;
  features: Array<{ text: string; included: boolean }>;
}> = [
  {
    name: "Free",
    planId: "FREE",
    price: "₹0",
    description: "Perfect for getting started",
    isPopular: false,
    buttonText: "Get Started",
    features: [
      { text: "5 Short Links", included: true },
      { text: "100 Redirects", included: true },
      { text: "No Analytics", included: true },
      { text: "QR Code Generation", included: true },
      { text: "Custom Domains", included: false },
      { text: "Priority Support", included: false },
    ],
  },
  {
    name: "Pro",
    planId: "PRO",
    price: "₹499",
    description: "Best for creators and professionals",
    isPopular: true,
    buttonText: "Upgrade to Pro",
    features: [
      { text: "100 Short Links", included: true },
      { text: "10,000 Redirects", included: true },
      { text: "Basic Analytics", included: true },
      { text: "QR Code Generation", included: true },
      { text: "Custom Domains", included: true },
      { text: "Priority Support", included: true },
    ],
  },
  {
    name: "Ultimate",
    planId: "ULTIMATE",
    price: "₹1499",
    description: "Built for businesses and power users",
    isPopular: false,
    buttonText: "Go Ultimate",
    features: [
      { text: "1000 Short Links", included: true },
      { text: "100,000 Redirects", included: true },
      { text: "Advanced Analytics", included: true },
      { text: "QR Code Generation", included: true },
      { text: "Custom Domains", included: true },
      { text: "Priority Support", included: true },
    ],
  },
];

export function PricingPage() {
  const { isSignedIn } = useAuth();
  const { subscribe, isLoading, activePlan, subscription } = useSubscription();

  const currentPlanId = ((subscription?.planId ?? subscription?.plan ?? "FREE") as string).toUpperCase();

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950">
      <Navbar isAuthenticated={isSignedIn} showDashboard={isSignedIn} />

      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-50 dark:bg-indigo-950/50 rounded-full mb-6">
              <Sparkles className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
              <span className="text-sm font-medium text-indigo-600 dark:text-indigo-400">
                Simple Pricing
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 dark:text-white mb-4">
              Choose the perfect plan
            </h1>

            <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              Whether you're just getting started or managing thousands of
              links, we've got a plan for you.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {plans.map((plan) => {
              const isCurrentPlan = currentPlanId === plan.planId;
              const isFreePlan = plan.planId === "FREE";
              const isDisabled = isFreePlan || isCurrentPlan;
              const buttonText = isCurrentPlan
                ? "Current Plan"
                : isFreePlan
                  ? "Free Plan"
                  : plan.name === "Ultimate"
                    ? "Upgrade to Ultimate"
                    : "Upgrade to Pro";

              return (
                <PricingCard
                  key={plan.name}
                  name={plan.name}
                  price={plan.price}
                  description={plan.description}
                  features={plan.features}
                  isPopular={plan.isPopular}
                  buttonText={buttonText}
                  onButtonClick={() => subscribe(plan.planId)}
                  isLoading={isLoading && activePlan === plan.planId}
                  disabled={isLoading && activePlan !== plan.planId || isDisabled}
                />
              );
            })}
          </div>

          <div className="mt-8 text-center text-sm text-slate-500 dark:text-slate-400">
            Every plan includes secure HTTPS links, QR code generation, spam
            protection, and reliable uptime.
          </div>

          {/* Comparison */}
          <div className="mt-20 max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-8 text-center">
              Compare Plans
            </h2>

            <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800">
              <table className="w-full">
                <thead className="bg-slate-50 dark:bg-slate-900">
                  <tr>
                    <th className="text-left py-4 px-4 font-semibold">
                      Feature
                    </th>
                    <th className="text-center py-4 px-4 font-semibold">
                      Free
                    </th>
                    <th className="text-center py-4 px-4 font-semibold text-indigo-600 dark:text-indigo-400">
                      Pro
                    </th>
                    <th className="text-center py-4 px-4 font-semibold">
                      Ultimate
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                  {[
                    {
                      feature: "Maximum Links",
                      free: "5",
                      pro: "100",
                      ultimate: "1000",
                    },
                    {
                      feature: "Maximum Redirects",
                      free: "100",
                      pro: "10,000",
                      ultimate: "100,000",
                    },
                    {
                      feature: "Analytics",
                      free: "None",
                      pro: "Basic",
                      ultimate: "Advanced",
                    },
                    {
                      feature: "QR Code Generation",
                      free: true,
                      pro: true,
                      ultimate: true,
                    },
                    {
                      feature: "Custom Domains",
                      free: false,
                      pro: true,
                      ultimate: true,
                    },
                    {
                      feature: "Priority Support",
                      free: false,
                      pro: true,
                      ultimate: true,
                    },
                  ].map((row) => (
                    <tr key={row.feature}>
                      <td className="py-4 px-4 text-slate-700 dark:text-slate-300">
                        {row.feature}
                      </td>

                      <td className="py-4 px-4 text-center">
                        {typeof row.free === "boolean" ? (
                          row.free ? (
                            <Check className="w-5 h-5 text-emerald-500 mx-auto" />
                          ) : (
                            <span className="text-slate-400">—</span>
                          )
                        ) : (
                          row.free
                        )}
                      </td>

                      <td className="py-4 px-4 text-center bg-indigo-50/50 dark:bg-indigo-950/20">
                        {typeof row.pro === "boolean" ? (
                          row.pro ? (
                            <Check className="w-5 h-5 text-indigo-600 dark:text-indigo-400 mx-auto" />
                          ) : (
                            <span className="text-slate-400">—</span>
                          )
                        ) : (
                          <span className="font-medium text-indigo-600 dark:text-indigo-400">
                            {row.pro}
                          </span>
                        )}
                      </td>

                      <td className="py-4 px-4 text-center">
                        {typeof row.ultimate === "boolean" ? (
                          row.ultimate ? (
                            <Check className="w-5 h-5 text-emerald-500 mx-auto" />
                          ) : (
                            <span className="text-slate-400">—</span>
                          )
                        ) : (
                          row.ultimate
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* FAQ */}
          <div className="mt-20 max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-8 text-center">
              Frequently Asked Questions
            </h2>

            <div className="space-y-6">
              <div className="bg-slate-50 dark:bg-slate-900 rounded-xl p-6">
                <h3 className="font-semibold text-slate-900 dark:text-white mb-2">
                  Can I change plans later?
                </h3>

                <p className="text-slate-600 dark:text-slate-400">
                  Absolutely. You can upgrade or downgrade your subscription at
                  any time. Your new plan will take effect automatically.
                </p>
              </div>

              <div className="bg-slate-50 dark:bg-slate-900 rounded-xl p-6">
                <h3 className="font-semibold text-slate-900 dark:text-white mb-2">
                  What payment methods do you accept?
                </h3>

                <p className="text-slate-600 dark:text-slate-400">
                  Payments are securely processed through Razorpay. We support
                  UPI, Credit Cards, Debit Cards, Net Banking, and Wallets.
                </p>
              </div>

              <div className="bg-slate-50 dark:bg-slate-900 rounded-xl p-6">
                <h3 className="font-semibold text-slate-900 dark:text-white mb-2">
                  What happens when I reach my Free plan limits?
                </h3>

                <p className="text-slate-600 dark:text-slate-400">
                  The Free plan allows up to 5 short links and 100 total
                  redirects. Once you reach either limit, you can upgrade to Pro
                  or Ultimate to continue creating links and unlock higher usage
                  limits.
                </p>
              </div>

              <div className="bg-slate-50 dark:bg-slate-900 rounded-xl p-6">
                <h3 className="font-semibold text-slate-900 dark:text-white mb-2">
                  Can I cancel anytime?
                </h3>

                <p className="text-slate-600 dark:text-slate-400">
                  Yes. You can cancel your subscription whenever you like. Your
                  premium features remain active until the end of your current
                  billing period.
                </p>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="mt-20 text-center">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
              Ready to start shortening links?
            </h2>

            <p className="text-slate-600 dark:text-slate-400 mb-8">
              Choose a plan and start creating powerful, trackable short links
              in minutes.
            </p>

            <Link to="/sign-up">
              <Button
                size="lg"
                className="bg-indigo-600 hover:bg-indigo-700 text-white text-lg px-8"
              >
                Get Started Free
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default PricingPage;
