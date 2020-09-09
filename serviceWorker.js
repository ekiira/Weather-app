const staticCacheName = 'site-static';
const assets = [
  '/',
  '/index.html',
  '/assets/js/app.js',
  '/assets/js/index.js',
  '/assets/css/style.css',
  '/assets/images/bg-2.jpeg',
  '/assets/images/clear-sky.jpeg',
  '/assets/images/clouds.jpeg',
  '/assets/images/drizzle.jpeg',
  '/assets/images/rain.jpeg',
  '/assets/images/snow.jpeg',
  '/assets/images/storm.jpeg',
  '/assets/icons/favicon-16x16.png',
  '/assets/icons/favicon-32x32.png',
  '/assets/icons/favicon.ico'
];

// install service worker
self.addEventListener('install', evt => {
  evt.waitUntil(
    caches.open(staticCacheName).then((cache) => {
      console.log('caching shell assets');
      cache.addAll(assets);
    })
  );
})

// activate service worker
self.addEventListener('activate', evt => {
  evt.waitUntil(
    caches.keys().then(keys => {
      //console.log(keys);
      return Promise.all(keys
        .filter(key => key !== staticCacheName)
        .map(key => caches.delete(key))
      );
    })
  );
})

// fetch event
self.addEventListener('fetch', evt => {
  evt.respondWith(
    caches.match(evt.request).then(cacheRes => {
      return cacheRes || fetch(evt.request);
    })
  );
})
