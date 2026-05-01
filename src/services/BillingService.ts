import { apiClient } from "@/services/ApiService";

export interface OpaqueDataPayload {
  data_descriptor: string;
  data_value: string;
}

export interface BillingAddressPayload {
  first_name?: string;
  last_name?: string;
  company?: string;
  address?: string;
  city?: string;
  state?: string;
  zip?: string;
  country?: string;
}

export interface PurchaseTokensPayload {
  tokens: number;
  amount: number;
  opaque_data: OpaqueDataPayload;
  billing?: BillingAddressPayload;
}

export interface ActivateProPayload {
  amount: number;
  validity_days?: number;
  auto_renew?: boolean;
  opaque_data: OpaqueDataPayload;
  billing?: BillingAddressPayload;
}

export interface CheckoutGatewayConfig {
  gateway: string;
  enabled: boolean;
  environment?: string;
  api_login_id?: string;
  client_key?: string;
  accept_js_url?: string;
  currency?: string;
}

export interface CheckoutCatalog {
  token_price_per_token: string;
  tokens_per_dollar?: string;
  pro_plan: {
    name: string;
    price: string;
    validity_days: number | null;
    auto_renew: boolean;
    active: boolean;
  };
}

export default {
  getCheckoutConfig() {
    return apiClient.get("/billing/checkout-config");
  },

  purchaseTokens(payload: PurchaseTokensPayload) {
    return apiClient.post("/tokens/purchase", payload);
  },

  activatePro(payload: ActivateProPayload) {
    return apiClient.post("/subscriptions/activate-pro", payload);
  },
};
