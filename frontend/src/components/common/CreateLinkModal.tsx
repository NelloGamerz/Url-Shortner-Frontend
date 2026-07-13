import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";

import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

import { Loader2, Sparkles } from "lucide-react";

import { useToast } from "../../hooks/use-toast";
import {
  useCreateLink,
  usePublicShorten,
  useGenerateSlug,
  useVerifiedDomains,
} from "../../hooks/useApi";

import { useAuth } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import { useSubscription } from "../../hooks/useSubscription";
import { CustomDomain } from "@/api/domainApi";

const schema = z.object({
  url: z.string().url("Please enter a valid URL"),
  customAlias: z.string().optional(),
  domain: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

interface CreateLinkModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CreateLinkModal({ open, onOpenChange }: CreateLinkModalProps) {
  const { toast } = useToast();
  const { isSignedIn } = useAuth();
  const navigate = useNavigate();

  const { subscription } = useSubscription();

  const createLink = useCreateLink();
  const publicShorten = usePublicShorten();

  const generateSlug = useGenerateSlug();
  const { data: domains = [] } = useVerifiedDomains();

  const plan = (
    subscription?.planId ??
    subscription?.plan ??
    "FREE"
  ).toUpperCase();

  const canUseCustomFeatures = plan === "PRO" || plan === "ULTIMATE";

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    setValue,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: "onChange",
  });

  const url = watch("url");
  const customAlias = watch("customAlias");
  const selectedDomain = watch("domain");

  const handleGenerateSlug = async () => {
    try {
      const response = await generateSlug.mutateAsync(selectedDomain);

      setValue("customAlias", response.slug);

      toast({
        title: "Slug Generated",
        description: response.message,
      });
    } catch {
      toast({
        title: "Error",
        description: "Failed to generate slug",
        variant: "destructive",
      });
    }
  };

  const onSubmit = async (data: FormData) => {
    try {
      const finalUrl = url.startsWith("http") ? url : `https://${url}`;

      if (isSignedIn) {
        await createLink.mutateAsync({
          url: finalUrl,

          customAlias: canUseCustomFeatures
            ? data.customAlias || undefined
            : undefined,

          domain: canUseCustomFeatures ? data.domain || undefined : undefined,
        });

        toast({
          title: "Link Created!",
          description: "Your short link has been created successfully",
        });
      } else {
        await publicShorten.mutateAsync(finalUrl);

        toast({
          title: "Link Created!",
          description: "Sign in to save and track your links",
        });
      }

      reset();

      onOpenChange(false);
    } catch (error: any) {
      const status = error?.response?.status;

      const message = error?.response?.data?.message;

      toast({
        title: status === 409 ? "Link Already Exists" : "Error",

        description:
          status === 409
            ? "This URL has already been shortened."
            : status === 403
              ? "You have reached your monthly link creation limit."
              : (message ?? "Failed to create link. Please try again."),

        variant: "destructive",
      });
    }
  };

  const handleClose = () => {
    if (!isSignedIn) {
      toast({
        title: "Sign In Required",
        description: "You need to sign in before creating short links.",
      });

      navigate("/sign-in");

      return;
    }

    onOpenChange(!open);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl">Create Short Link</DialogTitle>

          <DialogDescription>
            Enter a long URL to generate a short, shareable link
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label htmlFor="url">Original URL</Label>

            <Input
              id="url"
              placeholder="https://example.com/very-long-url-here"
              {...register("url")}
              className={errors.url ? "border-red-500" : ""}
            />

            {errors.url && (
              <p className="text-sm text-red-500">{errors.url.message}</p>
            )}
          </div>

          {canUseCustomFeatures && (
            <>
              <div className="space-y-2">
                <Label>Custom Domain</Label>

                <Select onValueChange={(value) => setValue("domain", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select domain" />
                  </SelectTrigger>

                  <SelectContent>
                    {domains.map((domain: CustomDomain) => (
                      <SelectItem key={domain.id} value={domain.domain}>
                        {domain.domain}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                {domains.length === 0 && (
                  <p className="text-xs text-slate-500">
                    No verified domains found. Add one from settings.
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="customAlias">Custom Alias</Label>

                <div className="flex gap-2">
                  <Input
                    id="customAlias"
                    placeholder="my-custom-link"
                    {...register("customAlias")}
                  />

                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleGenerateSlug}
                    disabled={generateSlug.isPending}
                  >
                    {generateSlug.isPending ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <Sparkles className="w-4 h-4" />
                    )}
                  </Button>
                </div>
              </div>
            </>
          )}

          <div className="flex justify-end gap-3 pt-4">
            <Button
              type="button"
              variant="ghost"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>

            <Button
              type="submit"
              disabled={createLink.isPending || publicShorten.isPending}
              className="bg-indigo-600 hover:bg-indigo-700"
            >
              {(createLink.isPending || publicShorten.isPending) && (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              )}
              Create Link
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
