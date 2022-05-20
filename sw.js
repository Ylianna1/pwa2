self.addEventListener('install', function(event) {
    console.log('[Service Worker] Installing Service Worker ...', event);
    event.waitUntil(
        caches.open("static")
            .then(function(cache){
                console.log("precaching");
                cache.add('/index.html');
                cache.add('/images/Logo.png');
                cache.add('/bootstrap-4.0.0-dist/bootstrap.css');
                cache.add('/Contact_us.html');
                cache.add('/Tomato_all_vue.html');
                cache.add('/Tomato_all.html');
                cache.add('/Tomato_one.html');
                cache.add('/Tomato_one1.html');
                cache.add('/Contact_us.html');
            })
    );
});

self.addEventListener('activate', function(event) {
    console.log('[Service Worker] Activating Service Worker ...', event);
    return self.clients.claim();
});

self.addEventListener('fetch', function(event) {
    event.respondWith(
        caches.match(event.request)
            .then(function(response){
                if (response)
                    return response;
                else
                    return fetch(event.request);
            }
        )
    );   
});