export function registerServiceWorker(onUpdate?: (registration: ServiceWorkerRegistration) => void): Promise<ServiceWorkerRegistration | null> {
  if (typeof window === 'undefined' || !('serviceWorker' in navigator)) {
    return Promise.resolve(null);
  }

  const doRegister = async (): Promise<ServiceWorkerRegistration | null> => {
    try {
      const registration = await navigator.serviceWorker.register('/sw.js', { scope: '/' });

      // Check for updates
      registration.addEventListener('updatefound', () => {
        const installingWorker = registration.installing;
        if (!installingWorker) return;

        installingWorker.addEventListener('statechange', () => {
          if (installingWorker.state === 'installed') {
            if (navigator.serviceWorker.controller) {
              // New content is available
              if (onUpdate) onUpdate(registration);
            }
          }
        });
      });

      return registration;
    } catch (error) {
      console.warn('Service worker registration failed:', error);
      return null;
    }
  };

  // If page is already loaded or interactive, register immediately
  if (document.readyState === 'complete' || document.readyState === 'interactive') {
    return doRegister();
  }

  return new Promise((resolve) => {
    window.addEventListener('load', () => {
      resolve(doRegister());
    });
  });
}
