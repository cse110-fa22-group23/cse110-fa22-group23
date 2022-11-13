window.addEventListener("DOMContentLoaded", init);

/**
 * Callback function to run when DOM is loaded.
 * @return 0 (int)
 */
function init() {
    console.log("Window loaded");

    return 0;
}

/**
 * Makes the form modal visible on the page.
 */
function openForm() {
    document.getElementById("myEntry").style.display = "block";
}

/**
 * Makes the form modal no longer visible on the page.
 */
function closeForm() {
    document.getElementById("myEntry").style.display = "none";
}

// To be used in tests
module.exports = { init, openForm, closeForm };
