import type { OpaqueDataPayload } from "@/services/BillingService";

interface AcceptDispatchResponse {
  opaqueData?: {
    dataDescriptor?: string;
    dataValue?: string;
  };
  messages?: {
    resultCode?: string;
    message?: Array<{
      code?: string;
      text?: string;
    }>;
  };
}

interface AcceptCardData {
  cardNumber: string;
  month: string;
  year: string;
  cardCode: string;
  zip?: string;
  fullName?: string;
}

interface AcceptAuthConfig {
  api_login_id: string;
  client_key: string;
  accept_js_url: string;
}

declare global {
  interface Window {
    Accept?: {
      dispatchData: (
        secureData: {
          authData: {
            apiLoginID: string;
            clientKey: string;
          };
          cardData: AcceptCardData;
        },
        callback: (response: AcceptDispatchResponse) => void,
      ) => void;
    };
  }
}

const ACCEPT_SCRIPT_ATTRIBUTE = "data-authorizenet-acceptjs";
let scriptLoadPromise: Promise<void> | null = null;

const extractAcceptError = (response: AcceptDispatchResponse): string => {
  const messages = response.messages?.message || [];
  const firstText = messages.find((item) => item?.text)?.text;

  return firstText || "Secure card tokenization failed.";
};

export const ensureAcceptJsLoaded = async (
  scriptUrl: string,
): Promise<void> => {
  if (!scriptUrl) {
    throw new Error("Authorize.Net script URL is missing.");
  }

  if (typeof window === "undefined" || typeof document === "undefined") {
    throw new Error("Secure checkout is only available in the browser.");
  }

  if (window.Accept?.dispatchData) {
    return;
  }

  if (scriptLoadPromise) {
    return scriptLoadPromise;
  }

  scriptLoadPromise = new Promise<void>((resolve, reject) => {
    const existingScript = document.querySelector<HTMLScriptElement>(
      `script[${ACCEPT_SCRIPT_ATTRIBUTE}]`,
    );

    const handleLoaded = () => {
      if (window.Accept?.dispatchData) {
        resolve();
        return;
      }

      scriptLoadPromise = null;
      reject(new Error("Authorize.Net checkout library did not initialize."));
    };

    const handleError = () => {
      scriptLoadPromise = null;
      reject(new Error("Unable to load the Authorize.Net checkout library."));
    };

    if (existingScript) {
      existingScript.addEventListener("load", handleLoaded, { once: true });
      existingScript.addEventListener("error", handleError, { once: true });
      return;
    }

    const script = document.createElement("script");
    script.src = scriptUrl;
    script.async = true;
    script.setAttribute(ACCEPT_SCRIPT_ATTRIBUTE, "true");
    script.addEventListener("load", handleLoaded, { once: true });
    script.addEventListener("error", handleError, { once: true });
    document.head.appendChild(script);
  });

  return scriptLoadPromise;
};

export const tokenizeAuthorizeNetCard = async (
  config: AcceptAuthConfig,
  card: AcceptCardData,
): Promise<OpaqueDataPayload> => {
  if (!config.api_login_id || !config.client_key || !config.accept_js_url) {
    throw new Error("Authorize.Net checkout is not fully configured.");
  }

  await ensureAcceptJsLoaded(config.accept_js_url);

  return new Promise((resolve, reject) => {
    if (!window.Accept?.dispatchData) {
      reject(new Error("Authorize.Net checkout library is unavailable."));
      return;
    }

    window.Accept.dispatchData(
      {
        authData: {
          apiLoginID: config.api_login_id,
          clientKey: config.client_key,
        },
        cardData: {
          cardNumber: card.cardNumber.replace(/\s+/g, ""),
          month: card.month.padStart(2, "0"),
          year: card.year,
          cardCode: card.cardCode,
          zip: card.zip,
          fullName: card.fullName,
        },
      },
      (response) => {
        if (response?.messages?.resultCode === "Error") {
          reject(new Error(extractAcceptError(response)));
          return;
        }

        const descriptor = response?.opaqueData?.dataDescriptor;
        const dataValue = response?.opaqueData?.dataValue;

        if (!descriptor || !dataValue) {
          reject(new Error("Authorize.Net did not return a payment token."));
          return;
        }

        resolve({
          data_descriptor: descriptor,
          data_value: dataValue,
        });
      },
    );
  });
};
