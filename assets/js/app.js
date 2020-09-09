if('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/serviceWorker.js')
  .then((reg) => reg)
  .catch((err) => err)
}
