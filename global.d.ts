declare global {
  interface Window {
    grecaptcha: {
      reset: () => void;
      getResponse: () => string;
      render: (...args: unknown[]) => void;
    };
  }
}

export {};
