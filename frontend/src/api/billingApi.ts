import { AxiosInstance } from "axios";

export interface Payment {
  id: string;
  razorpayPaymentId: string;
  amount: number;
  currency: string;
  method: string;
  status: string;
  paidAt: string;
}

export interface Usage {
  id: string;
  userId: string;
  linksCreated: number;
  clicks: number;
  period: string;
  updatedAt: string;
}

export interface PaymentPageResponse {
  payments: Payment[];
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
  hasNext: boolean;
}

export interface BillingResponse {
  usage: Usage;
  payments: PaymentPageResponse;
  currentPage: number;
  totalPages: number;
  totalElements: number;
  hasNext: boolean;
}

export const createBillingApi = (client: AxiosInstance) => ({
  getBilling(page = 0, size = 10) {
    return client
      .get<BillingResponse>(`/usage?page=${page}&size=${size}`)
      .then((res) => res.data);
  },
});