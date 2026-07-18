import { CreditCard, Check, Zap, ArrowUpRight } from "lucide-react";
import { Button } from "../../components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { useSubscription } from "../../hooks/useSubscription";
import { useNavigate } from "react-router-dom";
import { useBilling } from "@/hooks/useApi";
import { useState } from "react";

export function BillingPage() {
  const { subscription, loading } = useSubscription();
  const navigate = useNavigate();
  const [page, setPage] = useState(0);
  const { data: billing, isLoading: billingLoading } = useBilling(page, 10);

  const normalizedPlanId = subscription?.planId ?? subscription?.plan ?? "FREE";

  const currentPlan = subscription
    ? {
        plan:
          normalizedPlanId === "ULTIMATE"
            ? "ultimate"
            : normalizedPlanId === "PRO"
              ? "pro"
              : "free",
        status: subscription.status.toLowerCase(),
        linksUsed: billing?.usage?.metrics.links_created ?? 0,
        clicksUsed: billing?.usage?.metrics.clicks ?? 0,
        linksLimit: subscription.maxLinks,
      }
    : {
        plan: "free" as const,
        status: "active" as const,
        linksUsed: billing?.usage?.metrics.links_created ?? 0,
        clicksUsed: billing?.usage?.metrics.clicks ?? 0,
        linksLimit: 5,
      };
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
          Billing
        </h1>
        <p className="text-slate-600 dark:text-slate-400 mt-1">
          Manage your subscription and billing details
        </p>
      </div>

      {/* Current Plan */}
      <Card className="border-slate-200 dark:border-slate-800">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-slate-900 dark:text-white">
            Current Plan
          </CardTitle>
        </CardHeader>

        <CardContent>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-indigo-50 dark:bg-indigo-900/50 rounded-xl flex items-center justify-center">
                {currentPlan.plan !== "free" ? (
                  <Zap className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
                ) : (
                  <CreditCard className="w-6 h-6 text-slate-600 dark:text-slate-400" />
                )}
              </div>

              <div>
                <p className="text-lg font-semibold text-slate-900 dark:text-white">
                  {currentPlan.plan === "ultimate"
                    ? "Ultimate Plan"
                    : currentPlan.plan === "pro"
                      ? "Pro Plan"
                      : "Free Plan"}
                </p>

                <p className="text-sm text-slate-600 dark:text-slate-400">
                  {loading
                    ? "Loading subscription..."
                    : currentPlan.plan === "ultimate"
                      ? "₹1499/month"
                      : currentPlan.plan === "pro"
                        ? "₹499/month"
                        : "₹0/month"}
                </p>
              </div>
            </div>

            <Button
              className="bg-indigo-600 hover:bg-indigo-700"
              onClick={() => navigate("/pricing")}
            >
              <ArrowUpRight className="w-4 h-4 mr-2" />
              Upgrade Plan
            </Button>
          </div>

          {/* Usage */}
          <div className="mt-6 pt-6 border-t border-slate-200 dark:border-slate-700">
            <div className="flex justify-between mb-2">
              <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                Links Created
              </span>

              <span className="text-sm text-slate-600 dark:text-slate-400">
                {billingLoading
                  ? "..."
                  : `${billing?.usage.metrics.links_created ?? 0} / ${currentPlan.linksLimit}`}
              </span>
            </div>

            {typeof currentPlan.linksLimit === "number" && (
              <div className="h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                <div
                  className="h-full bg-indigo-600 transition-all"
                  style={{
                    width: `${Math.min(
                      ((billing?.usage.metrics.links_created ?? 0) /
                        currentPlan.linksLimit) *
                        100,
                      100,
                    )}%`,
                  }}
                />
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Upgrade Card */}
      <Card className="border-indigo-500 ring-2 ring-indigo-500/20 bg-gradient-to-br from-white to-indigo-50 dark:from-slate-900 dark:to-indigo-950/30">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg">
              {currentPlan.plan === "free"
                ? "Upgrade to Pro"
                : "Upgrade to Ultimate"}
            </CardTitle>

            <div className="px-3 py-1 rounded-full bg-indigo-600 text-white text-xs font-semibold">
              {currentPlan.plan === "free" ? "₹499/month" : "₹1499/month"}
            </div>
          </div>
        </CardHeader>

        <CardContent>
          <ul className="space-y-3 mb-6">
            {(currentPlan.plan === "free"
              ? [
                  "100 Short Links",
                  "Basic Analytics",
                  "QR Code Generation",
                  "1 Custom Domain",
                  "Priority Support",
                ]
              : [
                  "1000 Short Links",
                  "Advanced Analytics",
                  "QR Code Generation",
                  "5 Custom Domains",
                  "Priority Support",
                ]
            ).map((feature) => (
              <li key={feature} className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-indigo-100 dark:bg-indigo-900/50 flex items-center justify-center">
                  <Check className="w-3 h-3 text-indigo-600 dark:text-indigo-400" />
                </div>

                <span>{feature}</span>
              </li>
            ))}
          </ul>

          <Button
            className="w-full bg-indigo-600 hover:bg-indigo-700"
            onClick={() => navigate("/pricing")}
          >
            <Zap className="w-4 h-4 mr-2" />
            {currentPlan.plan === "free"
              ? "Upgrade to Pro"
              : "Upgrade to Ultimate"}
          </Button>

          <p className="text-xs text-center text-slate-500 mt-3">
            Secure payments powered by Razorpay.
          </p>
        </CardContent>
      </Card>

      {/* Payment History */}
      {currentPlan.plan !== "free" && (
        <Card className="border-slate-200 dark:border-slate-800">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">
              Payment History
            </CardTitle>
          </CardHeader>

          <CardContent>
            {billingLoading ? (
              <div className="py-10 text-center text-slate-500">
                Loading payments...
              </div>
            ) : billing?.payments?.payments?.length === 0 ? (
              <div className="py-10 text-center text-slate-500">
                No payment history available.
              </div>
            ) : (
              <>
                <div className="space-y-4">
                  {billing?.payments?.payments?.map((payment) => (
                    <div
                      key={payment.id}
                      className="flex items-center justify-between border-b border-slate-200 dark:border-slate-700 pb-4"
                    >
                      <div>
                        <p className="font-semibold">
                          ₹{(payment.amount / 100).toFixed(2)}
                        </p>

                        <p className="text-sm text-slate-500 capitalize">
                          {payment.method}
                        </p>

                        <p className="text-xs text-slate-400">
                          {new Date(payment.paidAt).toLocaleDateString()}
                        </p>
                      </div>

                      <span
                        className={`font-medium ${
                          payment.status === "captured"
                            ? "text-green-600"
                            : "text-red-600"
                        }`}
                      >
                        {payment.status}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="flex justify-between items-center mt-6">
                  <Button
                    variant="outline"
                    disabled={page === 0}
                    onClick={() => setPage((p) => p - 1)}
                  >
                    Previous
                  </Button>

                  <span className="text-sm text-slate-500">
                    Page {(billing?.currentPage ?? 0) + 1} of{" "}
                    {billing?.totalPages ?? 1}
                  </span>

                  <Button
                    variant="outline"
                    disabled={!billing?.hasNext}
                    onClick={() => setPage((p) => p + 1)}
                  >
                    Next
                  </Button>
                </div>
              </>
            )}
          </CardContent>
        </Card>
      )}

      {/* Manage Subscription */}
      {currentPlan.plan !== "free" && (
        <div className="text-center pt-2">
          <button className="text-sm text-slate-500 hover:text-red-600 transition-colors">
            Manage Subscription
          </button>
        </div>
      )}
    </div>
  );
}

export default BillingPage;
