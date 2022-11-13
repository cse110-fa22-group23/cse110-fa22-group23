window.addEventListener("DOMContentLoaded", init);

/**
 * Function to print a message that the window is loaded.
 */
function logMessage () {
    console.log('Window loaded.')
}

/**
 * Callback function to run when DOM is loaded.
 * @return 0 (int)
 */
function init() {
    logMessage()

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
