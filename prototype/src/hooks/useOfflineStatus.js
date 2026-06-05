import { useEffect, useState } from 'react';

export function useOfflineStatus() {
  const [online, setOnline] = useState(
    typeof navigator !== 'undefined' ? navigator.onLine : true,
  );
  const [swReady, setSwReady] = useState(false);

  useEffect(() => {
    const onOnline = () => setOnline(true);
    const onOffline = () => setOnline(false);
    window.addEventListener('online', onOnline);
    window.addEventListener('offline', onOffline);

    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.ready.then(() => setSwReady(true)).catch(() => {});
    }

    return () => {
      window.removeEventListener('online', onOnline);
      window.removeEventListener('offline', onOffline);
    };
  }, []);

  return { online, swReady };
}
