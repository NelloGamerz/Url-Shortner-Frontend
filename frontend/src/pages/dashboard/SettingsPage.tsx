import { useState } from "react";
import {
  Globe,
  CheckCircle,
  Clock,
  ShieldCheck,
  Copy,
  Plus,
  Trash2,
} from "lucide-react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";

import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";

import {
  useDomains,
  useAddDomain,
  useVerifyDomain,
  useDeleteDomain,
  useSetDefaultDomain,
} from "../../hooks/useApi";

import { useToast } from "../../hooks/use-toast";

const CNAME_TARGET = "cname.yourdomain.com";

export function SettingsPage() {
  const [domain, setDomain] = useState("");
  const [domainError, setDomainError] = useState("");
  const [showAddDomain, setShowAddDomain] = useState(false);

  const { toast } = useToast();

  const { data: domains = [], isLoading } = useDomains();

  const addDomainMutation = useAddDomain();

  const verifyDomainMutation = useVerifyDomain();

  const deleteDomainMutation = useDeleteDomain();

  const setDefaultDomainMutation = useSetDefaultDomain();

  const validateSubdomain = (value: string) => {
    const parts = value.split(".");

    // Require subdomain.domain.tld
    if (parts.length < 3) {
      return "Please enter a subdomain (example: go.company.com)";
    }

    // No empty parts
    if (parts.some((part) => !part)) {
      return "Invalid domain format";
    }

    const domainRegex = /^[a-zA-Z0-9-]+$/;

    if (!parts.every((part) => domainRegex.test(part))) {
      return "Domain contains invalid characters";
    }

    // Prevent localhost/IP
    if (value.includes("localhost") || /^[0-9.]+$/.test(value)) {
      return "Invalid domain";
    }

    return "";
  };

  const addDomain = () => {
    const value = domain.trim().toLowerCase();

    if (!value) {
      setDomainError("Domain is required");
      return;
    }

    const error = validateSubdomain(value);

    if (error) {
      setDomainError(error);
      return;
    }

    setDomainError("");

    addDomainMutation.mutate(
      {
        domain: value,
      },
      {
        onSuccess: () => {
          setDomain("");
          setShowAddDomain(false);

          toast({
            title: "Domain Added",
            description: "Domain added successfully.",
          });
        },

        onError: (error: any) => {
          const status = error?.response?.status;

          toast({
            variant: "destructive",
            title: "Unable to add domain",
            description:
              status === 403
                ? "You have reached your custom domain limit."
                : (error?.response?.data?.message ??
                  "Failed to add domain. Please try again."),
          });
        },
      },
    );
  };

  const getDnsHost = (domain: string) => {
    const parts = domain.split(".");

    return parts.slice(0, -2).join(".");
  };

  if (isLoading) {
    return <div className="text-slate-500">Loading settings...</div>;
  }

  return (
    <div className="space-y-6">
      {/* Header */}

      <div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
          Settings
        </h1>

        <p className="text-slate-600 dark:text-slate-400 mt-1">
          Manage your account and custom domains.
        </p>
      </div>

      {/* Custom Domains */}

      <Card className="border-slate-200 dark:border-slate-800">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Globe className="w-5 h-5" />
                Custom Domains
              </CardTitle>

              <p className="text-sm text-slate-500 mt-2">
                Use your own branded subdomain for short links.
              </p>
            </div>

            <Button
              onClick={() => {
                setShowAddDomain(true);
                setDomainError("");
              }}
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Domain
            </Button>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          {domains.length === 0 && (
            <div className="text-sm text-slate-500">
              No custom domains added yet.
            </div>
          )}

          {domains.map((item) => (
            <div
              key={item.id}
              className="
              rounded-xl
              border
              border-slate-200
              dark:border-slate-700
              p-5
              space-y-4
              "
            >
              <div className="flex justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-slate-900 dark:text-white">
                      {item.domain}
                    </h3>

                    {item.isDefault && (
                      <span
                        className="
                        text-xs
                        bg-indigo-100
                        text-indigo-700
                        px-2
                        py-1
                        rounded-full
                        "
                      >
                        Default
                      </span>
                    )}
                  </div>

                  <div className="flex gap-5 mt-3 text-sm">
                    <span className="flex items-center gap-1">
                      {item.dnsStatus === "verified" ? (
                        <CheckCircle className="w-4 h-4 text-green-500" />
                      ) : (
                        <Clock className="w-4 h-4 text-yellow-500" />
                      )}
                      DNS: {item.dnsStatus}
                    </span>

                    <span className="flex items-center gap-1">
                      {item.sslStatus === "active" ? (
                        <ShieldCheck className="w-4 h-4 text-green-500" />
                      ) : (
                        <Clock className="w-4 h-4 text-yellow-500" />
                      )}
                      HTTPS: {item.sslStatus}
                    </span>
                  </div>
                </div>

                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => deleteDomainMutation.mutate(item.id)}
                >
                  <Trash2 className="w-4 h-4 text-red-500" />
                </Button>
              </div>

              {item.dnsStatus === "pending" && (
                <div
                  className="
                  bg-slate-50
                  dark:bg-slate-900
                  rounded-lg
                  p-4
                  text-sm
                  space-y-3
                  "
                >
                  <p className="font-medium">Add this DNS record:</p>

                  <div>
                    <b>Type:</b> CNAME
                  </div>

                  <div>
                    <b>Host:</b> {getDnsHost(item.domain)}
                  </div>

                  <div className="flex items-center gap-2">
                    <b>Target:</b>

                    <code>{CNAME_TARGET}</code>

                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() =>
                        navigator.clipboard.writeText(CNAME_TARGET)
                      }
                    >
                      <Copy className="w-4 h-4" />
                    </Button>
                  </div>

                  <Button
                    size="sm"
                    onClick={() => verifyDomainMutation.mutate(item.id)}
                    disabled={verifyDomainMutation.isPending}
                  >
                    Verify DNS
                  </Button>
                </div>
              )}

              {!item.isDefault && item.dnsStatus === "verified" && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setDefaultDomainMutation.mutate(item.id)}
                >
                  Set as Default
                </Button>
              )}
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Add Domain Modal */}

      {showAddDomain && (
        <div
          className="
          fixed
          inset-0
          bg-black/40
          flex
          items-center
          justify-center
          z-50
          "
        >
          <div
            className="
            bg-white
            dark:bg-slate-900
            rounded-xl
            p-6
            w-full
            max-w-md
            space-y-5
            "
          >
            <h2 className="text-xl font-semibold">Add Custom Domain</h2>

            <Input
              placeholder="go.company.com"
              value={domain}
              onChange={(e) => {
                setDomain(e.target.value);
                setDomainError("");
              }}
            />

            {domainError && (
              <p className="text-sm text-red-500">{domainError}</p>
            )}

            <p className="text-xs text-slate-500">
              Only subdomains are supported. Example: go.company.com
            </p>

            <div className="flex justify-end gap-3">
              <Button
                variant="outline"
                onClick={() => {
                  setShowAddDomain(false);
                  setDomainError("");
                }}
              >
                Cancel
              </Button>

              <Button
                onClick={addDomain}
                disabled={addDomainMutation.isPending}
              >
                Continue
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default SettingsPage;
