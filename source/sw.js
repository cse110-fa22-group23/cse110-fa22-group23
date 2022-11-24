const cacheName = "jobtracker-v1";
const appShellFiles = [
    "/",
    "/source",
    "/source/index.html",
    "/source/assets/css/button.css",
    "/source/assets/css/index.css",
    "/source/assets/css/modal.css",
    "/source/assets/css/table.css",
    "/source/assets/js/index.js",
    "/source/assets/images/stars/0-star.svg",
    "/source/assets/images/stars/1-star.svg",
    "/source/assets/images/stars/2-star.svg",
    "/source/assets/images/stars/3-star.svg",
    "/source/assets/images/stars/4-star.svg",
    "/source/assets/images/stars/5-star.svg",
];

self.addEventListener("install", (e) => {
    console.log("[Service Worker] Install");
    e.waitUntil(
        (async () => {
            const cache = await caches.open(cacheName);
            console.log("[Service Worker] Caching all: app shell and content");
            await cache.addAll(appShellFiles);
        })()
    );
});

self.addEventListener("fetch", (e) => {
    e.respondWith(
        (async () => {
            const r = await caches.match(e.request);
            console.log(`[Service Worker] Fetching resource: ${e.request.url}`);
            if (r) {
                return r;
            }
            const response = await fetch(e.request);
            const cache = await caches.open(cacheName);
            console.log(
                `[Service Worker] Caching new resource: ${e.request.url}`
            );
            cache.put(e.request, response.clone());
            return response;
        })()
    );
});

// clean up old/garbage caches
self.addEventListener("activate", (e) => {
    console.log("[Service Worker] Activate");
    e.waitUntil(
        caches.keys().then((keyList) => {
            return Promise.all(
                keyList.map((key) => {
                    if (key === cacheName) {
                        return;
                    }
                    return caches.delete(key);
                })
            );
        })
    );
});
