// Trincomalee Kingstars Chess Academy - Standalone PWA Handler
console.log('Trincomalee Kingstars Chess Academy initialized.');

// Service Worker Registration
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then(reg => console.log('PWA Service Worker registered:', reg.scope))
      .catch(err => console.error('PWA Service Worker registration failed:', err));
  });
}
