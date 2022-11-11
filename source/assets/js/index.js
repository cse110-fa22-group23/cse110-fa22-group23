window.addEventListener("DOMContentLoaded", init);

function init() {
    console.log("Window loaded");
    function openForm() {
        document.getElementById("myEntry").style.display = "block";
    }
    function closeForm() {
        document.getElementById("myEntry").style.display = "none";
    }
    return 0;
}

//document.getElementById("myEntry").onclick = openForm();
//document.getElementById("myEntry").onclick = openForm()

module.exports = { init };
