// Unified Service Worker: Caching + Offline Support + Web Push Notifications
const CACHE_VERSION = 'v1.0.0';
const STATIC_CACHE = `toeic-static-${CACHE_VERSION}`;
const DYNAMIC_CACHE = `toeic-dynamic-${CACHE_VERSION}`;
const DATA_CACHE = `toeic-data-${CACHE_VERSION}`;

// Pre-cache essential app shell URLs
const PRECACHE_URLS = [
  '/',
  '/offline',
  '/manifest.json',
  '/icons/icon-192.png',
  '/icons/icon-512.png',
  '/notification-icon-192.png',
  '/notification-badge-72.png',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(STATIC_CACHE).then((cache) => {
      return cache.addAll(PRECACHE_URLS).catch((err) => {
        console.warn('Precache partial fail:', err);
      });
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (![STATIC_CACHE, DYNAMIC_CACHE, DATA_CACHE].includes(key)) {
            return caches.delete(key);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Cache First Strategy
async function cacheFirst(request) {
  const cachedResponse = await caches.match(request);
  if (cachedResponse) return cachedResponse;
  try {
    const networkResponse = await fetch(request);
    if (networkResponse && networkResponse.status === 200) {
      const cache = await caches.open(STATIC_CACHE);
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  } catch (error) {
    return cachedResponse || new Response('Asset unavailable offline', { status: 503 });
  }
}

// Stale-While-Revalidate Strategy
async function staleWhileRevalidate(request) {
  const cache = await caches.open(DATA_CACHE);
  const cachedResponse = await cache.match(request);

  const fetchPromise = fetch(request)
    .then((networkResponse) => {
      if (networkResponse && networkResponse.status === 200) {
        cache.put(request, networkResponse.clone());
      }
      return networkResponse;
    })
    .catch(() => cachedResponse);

  return cachedResponse || fetchPromise;
}

// Network First with Offline Fallback
async function networkFirst(request) {
  try {
    const networkResponse = await fetch(request);
    if (networkResponse && networkResponse.status === 200) {
      const cache = await caches.open(DYNAMIC_CACHE);
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  } catch (error) {
    const cachedResponse = await caches.match(request);
    if (cachedResponse) return cachedResponse;

    if (request.mode === 'navigate') {
      const offlineFallback = await caches.match('/offline');
      if (offlineFallback) return offlineFallback;
    }

    return new Response('Network error occurred', { status: 503 });
  }
}

self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);

  // Skip non-GET requests and internal schemes (chrome-extension, etc.)
  if (event.request.method !== 'GET') return;
  if (!url.protocol.startsWith('http')) return;

  // Static assets: Cache First
  if (url.pathname.match(/\.(js|css|png|jpg|jpeg|svg|webp|woff2?|ico)$/)) {
    event.respondWith(cacheFirst(event.request));
    return;
  }

  // Data endpoints & public JSONs: Stale While Revalidate
  if (url.pathname.startsWith('/data/') || url.pathname.endsWith('.json')) {
    event.respondWith(staleWhileRevalidate(event.request));
    return;
  }

  // API calls: Network First
  if (url.pathname.startsWith('/api/')) {
    event.respondWith(
      fetch(event.request).catch(async () => {
        const cached = await caches.match(event.request);
        return cached || new Response(JSON.stringify({ error: 'Offline mode' }), {
          status: 503,
          headers: { 'Content-Type': 'application/json' },
        });
      })
    );
    return;
  }

  // HTML Page navigations: Network First with offline fallback
  if (event.request.mode === 'navigate') {
    event.respondWith(networkFirst(event.request));
    return;
  }
});

// Push Notification Handling
self.addEventListener('push', (event) => {
  let data = {};
  if (event.data) {
    try {
      data = event.data.json();
    } catch {
      data = { title: 'TOEIC Mastery', body: event.data.text() };
    }
  }

  const title = data.title || 'TOEIC Vocabulary Mastery';
  const options = {
    body: data.body || 'Đã đến giờ ôn tập từ vựng hôm nay!',
    icon: data.icon || '/notification-icon-192.png',
    badge: data.badge || '/notification-badge-72.png',
    tag: data.tag || 'toeic-reminder',
    data: {
      url: data.url || '/',
      dateOfArrival: Date.now(),
    },
    actions: [
      { action: 'study', title: '📚 Học ngay' },
      { action: 'dismiss', title: 'Đóng' },
    ],
    vibrate: [200, 100, 200],
    requireInteraction: false,
  };

  event.waitUntil(self.registration.showNotification(title, options));
});

// Notification Click Handling
self.addEventListener('notificationclick', (event) => {
  event.notification.close();

  if (event.action === 'dismiss') {
    return;
  }

  const targetUrl = event.notification.data?.url || '/';

  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
      // Focus existing tab if open
      for (const client of clientList) {
        if (client.url.includes(targetUrl) && 'focus' in client) {
          return client.focus();
        }
      }
      // Open new tab/window
      if (clients.openWindow) {
        return clients.openWindow(targetUrl);
      }
    })
  );
});
