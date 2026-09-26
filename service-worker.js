const CACHE_NAME = "brawl-vs-v1";

self.addEventListener("install", () => {
    self.skipWaiting();
});

self.addEventListener("activate", event => {
    event.waitUntil(
        self.clients.claim()
    );
});

self.addEventListener("fetch", event => {

    event.respondWith(

        fetch(event.request)

        .catch(() => {

            return caches.match(event.request);

        })

    );

});