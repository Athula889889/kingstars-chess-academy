// Trincomalee Kingstars Chess Academy - Standalone PWA Handler
console.log('Trincomalee Kingstars Chess Academy initialized.');

// Service Worker Registration
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    const isGitHubPages = window.location.pathname.includes('Trincomalee-kingstars-chess-academy');
    const swPath = isGitHubPages ? '/Trincomalee-kingstars-chess-academy/sw.js' : './sw.js';
    const scope = isGitHubPages ? '/Trincomalee-kingstars-chess-academy/' : './';

    navigator.serviceWorker.register(swPath, { scope: scope })
      .then(reg => console.log('PWA Service Worker registered for scope:', reg.scope))
      .catch(err => {
        console.warn('Primary SW registration failed, attempting relative fallback:', err);
        navigator.serviceWorker.register('./sw.js')
          .then(reg => console.log('PWA Service Worker fallback registered:', reg.scope))
          .catch(e => console.error('PWA Service Worker registration failed:', e));
      });
  });
}
