window.addEventListener("DOMContentLoaded", init);

function init() {
    console.log("Window loaded");

    return 0;
}

function openForm() {
    document.getElementById("myEntry").style.display = "block";
}

function closeForm() {
    document.getElementById("myEntry").style.display = "none";
}

//document.getElementById("myEntry").onclick = openForm();
//document.getElementById("myEntry").onclick = openForm()

// To be used in tests
module.exports = { init, openForm, closeForm };
