declare global {
  interface Window {
    Razorpay?: new (options: RazorpayOptions) => RazorpayInstance;
  }
}

export interface RazorpayOptions {
  key: string;
  subscription_id: string;
  name: string;
  description: string;
  theme: {
    color: string;
  };
  handler?: (response: { razorpay_payment_id?: string; razorpay_subscription_id?: string }) => void;
  modal?: {
    ondismiss?: () => void;
  };
  config?: {
    display?: {
      blocks?: Array<{
        name: string;
        instruments: Array<{
          method: string;
          wallets?: string[];
        }>;
      }>;
      sequence?: string[];
      preferences?: {
        show_default_blocks?: boolean;
      };
    };
  };
}

export interface RazorpayInstance {
  open: () => void;
  on: (event: string, callback: (...args: unknown[]) => void) => void;
}

let razorpayScriptPromise: Promise<void> | null = null;

export const loadRazorpayScript = (): Promise<void> => {
  if (typeof window === 'undefined') {
    return Promise.reject(new Error('Razorpay can only be loaded in the browser.'));
  }

  if (window.Razorpay) {
    return Promise.resolve();
  }

  if (!razorpayScriptPromise) {
    razorpayScriptPromise = new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.async = true;
      script.onload = () => resolve();
      script.onerror = () => {
        razorpayScriptPromise = null;
        reject(new Error('Failed to load Razorpay script.'));
      };
      document.body.appendChild(script);
    });
  }

  return razorpayScriptPromise;
};
