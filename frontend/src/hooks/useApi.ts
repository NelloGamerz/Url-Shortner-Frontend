import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useProtectedApiClient, publicClient } from "../api/client";
import { createLinkApi, createPublicLinkApi } from "../api/linkApi";
import { createAnalyticsApi } from "../api/analyticsApi";
import { createUserApi } from "../api/userApi";
import { CreateLinkRequest, UpdateLinkRequest } from "../types";
import { createBillingApi } from "@/api/billingApi";
import { createDomainApi } from "../api/domainApi";

const linkKeys = {
  all: ["links"] as const,
  list: (page: number, pageSize: number) =>
    [...linkKeys.all, "list", { page, pageSize }] as const,
  detail: (id: string) => [...linkKeys.all, "detail", id] as const,
};

const analyticsKeys = {
  dashboard: ["analytics", "dashboard"] as const,
  analytics: ["analytics", "all"] as const,
  linkDetail: (id: string) => ["analytics", "link", id] as const,
};

const userKeys = {
  profile: ["user", "profile"] as const,
  subscription: ["user", "subscription"] as const,
};

export const billingKeys = {
  all: ["billing"] as const,

  details: (page: number, size: number) =>
    [...billingKeys.all, page, size] as const,
};

const domainKeys = {
  all: ["domains"] as const,

  list: () => [...domainKeys.all, "list"] as const,
};

const verifiedDomainKeys = {
  list: () => [...domainKeys.all, "verified"] as const,
};

// export function useGenerateSlug() {
//   const client = useProtectedApiClient();
//   const api = createLinkApi(client);

//   return useMutation({
//     mutationFn: () => api.generateSlug(),
//   });
// }

export function useGenerateSlug() {
  const client = useProtectedApiClient();
  const api = createLinkApi(client);

  return useMutation({
    mutationFn: (domain?: string) => api.generateSlug(domain),
  });
}

export function useVerifiedDomains() {
  const client = useProtectedApiClient();
  const api = createDomainApi(client);

  return useQuery({
    queryKey: verifiedDomainKeys.list(),
    queryFn: () => api.getVerifiedDomains(),
    staleTime: 60000,
  });
}

export function useLinks(page = 1, pageSize = 10) {
  const client = useProtectedApiClient();
  const api = createLinkApi(client);

  return useQuery({
    queryKey: linkKeys.list(page, pageSize),
    queryFn: () => api.getAll(page, pageSize),
    staleTime: 30000,
  });
}

export function useLink(id: string) {
  const client = useProtectedApiClient();
  const api = createLinkApi(client);

  return useQuery({
    queryKey: linkKeys.detail(id),
    queryFn: () => api.getById(id),
    enabled: !!id,
  });
}

export function useBilling(page = 0, size = 10) {
  const client = useProtectedApiClient();
  const api = createBillingApi(client);

  return useQuery({
    queryKey: billingKeys.details(page, size),
    queryFn: () => api.getBilling(page, size),
    staleTime: 30000,
  });
}

export function useCreateLink() {
  const client = useProtectedApiClient();
  const api = createLinkApi(client);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateLinkRequest) => api.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: linkKeys.all });
      queryClient.invalidateQueries({ queryKey: analyticsKeys.dashboard });
    },
  });
}

export function useDomains() {
  const client = useProtectedApiClient();
  const api = createDomainApi(client);

  return useQuery({
    queryKey: domainKeys.list(),

    queryFn: () => api.getDomains(),

    staleTime: 60000,
  });
}

export function useAddDomain() {
  const client = useProtectedApiClient();
  const api = createDomainApi(client);

  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: { domain: string }) => api.addDomain(data),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: domainKeys.all,
      });
    },
  });
}

export function useVerifyDomain() {
  const client = useProtectedApiClient();
  const api = createDomainApi(client);

  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => api.verifyDomain(id),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: domainKeys.all,
      });
    },
  });
}

export function useSetDefaultDomain() {
  const client = useProtectedApiClient();
  const api = createDomainApi(client);

  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => api.setDefaultDomain(id),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: domainKeys.all,
      });
    },
  });
}

export function useDeleteDomain() {
  const client = useProtectedApiClient();
  const api = createDomainApi(client);

  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => api.deleteDomain(id),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: domainKeys.all,
      });
    },
  });
}

export function useUpdateLink() {
  const client = useProtectedApiClient();
  const api = createLinkApi(client);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateLinkRequest }) =>
      api.update(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: linkKeys.detail(variables.id),
      });
      queryClient.invalidateQueries({ queryKey: linkKeys.all });
    },
  });
}

export function useDeleteLink() {
  const client = useProtectedApiClient();
  const api = createLinkApi(client);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => api.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: linkKeys.all });
      queryClient.invalidateQueries({ queryKey: analyticsKeys.dashboard });
    },
  });
}

export function usePublicShorten() {
  const api = createPublicLinkApi(publicClient);

  return useMutation({
    mutationFn: (url: string) => api.shorten(url),
  });
}

export function useDashboard() {
  const client = useProtectedApiClient();
  const api = createAnalyticsApi(client);

  return useQuery({
    queryKey: analyticsKeys.dashboard,
    queryFn: () => api.getDashboard(),
    staleTime: 60000,
  });
}

export function useAnalytics() {
  const client = useProtectedApiClient();
  const api = createAnalyticsApi(client);

  return useQuery({
    queryKey: analyticsKeys.analytics,
    queryFn: () => api.getAnalytics(),
    staleTime: 60000,
  });
}

export function useLinkAnalytics(linkId: string) {
  const client = useProtectedApiClient();
  const api = createAnalyticsApi(client);

  return useQuery({
    queryKey: analyticsKeys.linkDetail(linkId),
    queryFn: () => api.getLinkAnalytics(linkId),
    enabled: !!linkId,
    staleTime: 30000,
  });
}

export function useUserProfile() {
  const client = useProtectedApiClient();
  const api = createUserApi(client);

  return useQuery({
    queryKey: userKeys.profile,
    queryFn: () => api.getProfile(),
    staleTime: 300000,
  });
}

export function useSubscription() {
  const client = useProtectedApiClient();
  const api = createUserApi(client);

  return useQuery({
    queryKey: userKeys.subscription,
    queryFn: () => api.getSubscription(),
    staleTime: 300000,
  });
}
