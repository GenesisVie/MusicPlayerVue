var cacheName = "cache1.4";
const STATIC_DATAS = [
    "/",
    "/favicon.ico",
    "/index.html",
    "/assets/",
    "/assets/logo.png",
    "/assets/logo.svg",
    "/img/",
    "/img/icons/",
    "/img/icons/android-chrome-192x192.png",
    "/img/icons/android-chrome-512x512.png",
    "/img/icons/android-chrome-maskable-192x192.png",
    "/img/icons/android-chrome-maskable-512x512.png",
    "/img/icons/apple-touch-icon-60x60.png",
    "/img/icons/apple-touch-icon-76x76.png",
    "/img/icons/apple-touch-icon-120x120.png",
    "/img/icons/apple-touch-icon-152x152.png",
    "/img/icons/apple-touch-icon-180x180.png",
    "/img/icons/apple-touch-icon.png",
    "/img/icons/favicon-16x16.png",
    "/img/icons/favicon-32x32.png",
    "/assets/artistCover/",
    "/assets/artistCover/alpha.png",
    "/assets/artistCover/arum.jpg",
    "/assets/artistCover/cm.jpg",
    "/assets/artistCover/damso.jpg",
    "/assets/artistCover/dinos.jpg",
    "/assets/artistCover/freeze-corleone.jpg",
    "/assets/artistCover/kalashcriminel.jpg",
    "/assets/artistCover/nepal.jpg",
    "/assets/artistCover/oussanousava.jpg",
    "/assets/cover/",
    "/assets/cover/umla.jpeg",
    "/assets/cover/arum.jpg",
    "/assets/cover/cm.jpg",
    "/assets/cover/qalf.jpg",
    "/assets/cover/dinos.jpg",
    "/assets/cover/LMF.jpg",
    "/assets/cover/But_en_or.jpg",
    "/assets/cover/nepal.jpeg",
    "/assets/cover/Fler_maler.jpeg",
    "/assets/audio/",
    "/assets/audio/But_en_or.mp3",
    "/assets/audio/Comme_à_la_maison.mp3",
    "/assets/audio/Damso_Horizontal.mp3",
    "/assets/audio/Fler_maler.mp3",
    "/assets/audio/Freeze_Raël.mp3",
    "/assets/audio/Mi_le_en_lair.mp3",
    "/assets/audio/Moinsun.mp3",
    "/assets/audio/nepal_rien_dspecial.mp3",
    "/assets/audio/stupéfiantetnoir.mp3",
];
if ("serviceWorker" in navigator) {
    navigator.serviceWorker
        .register("serviceworker.js")
        .then(() => {
            console.log("Work !");
        })
        .catch((e) => {
            console.error("Error: ", e);
        });
}

self.addEventListener("install", function (event) {
    event.waitUntil(
        caches.open(cacheName).then(function (cache) {
            return cache.addAll(STATIC_DATAS);
        })
    );
});

self.addEventListener("fetch", function (event) {
    event.respondWith(
        caches.match(event.request).then(function (response) {
            return response || fetch(event.request);
        })
    );
});