if('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/serviceWorker.js')
  .then((reg) => console.log('service worker registeres', reg))
  .catch((err) => console.log('service worker not registeres', err))
}
