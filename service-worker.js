self.addEventListener('push', function(event) {
  const data = event.data ? event.data.json() : {};
  const title = data.title || 'HerSignal';
  const options = {
    body: data.body || 'Your companion is thinking of you 💜',
    icon: '/hersignal/hersignal-logo.PNG',
    badge: '/hersignal/hersignal-logo.PNG',
    vibrate: [200, 100, 200],
    data: { url: data.url || '/hersignal/' },
    actions: [
      { action: 'open', title: 'Open App' },
      { action: 'dismiss', title: 'Dismiss' }
    ]
  };
  event.waitUntil(self.registration.showNotification(title, options));
});

self.addEventListener('notificationclick', function(event) {
  event.notification.close();
  if (event.action === 'open' || !event.action) {
    event.waitUntil(clients.openWindow(event.notification.data.url));
  }
});
