import { AxiosInstance } from "axios";


export interface CustomDomain {
  id: string;
  domain: string;
  dnsStatus: "pending" | "verified" | "failed";
  sslStatus: "pending" | "active" | "failed";
  isDefault: boolean;
  createdAt: string;
}


export interface AddDomainRequest {
  domain: string;
}


export const createDomainApi = (client: AxiosInstance) => ({

  getDomains: async (): Promise<CustomDomain[]> => {
    const response = await client.get("/domains");
    return response.data;
  },


  addDomain: async (
    data: AddDomainRequest
  ): Promise<CustomDomain> => {
    const response = await client.post("/domains", data);
    return response.data;
  },


  verifyDomain: async (
    domainId: string
  ): Promise<CustomDomain> => {
    const response = await client.post(
      `/domains/${domainId}/verify`
    );

    return response.data;
  },


  setDefaultDomain: async (
    domainId: string
  ): Promise<CustomDomain> => {
    const response = await client.patch(
      `/domains/${domainId}/default`
    );

    return response.data;
  },


  deleteDomain: async (
    domainId: string
  ): Promise<void> => {
    await client.delete(
      `/domains/${domainId}`
    );
  },

});