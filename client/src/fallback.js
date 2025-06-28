// Fallback script to ensure proper loading
console.log('Fallback script loaded');

// Clear any cached modules
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.getRegistrations().then(function(registrations) {
    for(let registration of registrations) {
      registration.unregister();
    }
  });
}

// Force reload main module
setTimeout(() => {
  const script = document.createElement('script');
  script.type = 'module';
  script.src = '/src/main.tsx?v=' + Date.now();
  document.head.appendChild(script);
}, 100);