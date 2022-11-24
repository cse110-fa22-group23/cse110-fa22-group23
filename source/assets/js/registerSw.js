/**
 * Registers a service worker for the current page.
 */
const registerServiceWorker = async () => {
    try {
        const registration = await navigator.serviceWorker.register("./sw.js", {
            scope: "./sw.js",
        });
        if (registration.installing) {
            console.log("Service worker installing");
        } else if (registration.waiting) {
            console.log("Service worker installed");
        } else if (registration.active) {
            console.log("Service worker active");
        }
    } catch (error) {
        console.error(`Registration failed with ${error}`);
    }
};

window.addEventListener("load", () => {
    if ("serviceWorker" in navigator) {
        registerServiceWorker();
    }
});
