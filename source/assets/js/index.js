
window.addEventListener("DOMContentLoaded", init);

function init() {
    console.log("Window loaded");
   // return 0;
   function openForm(){
    document.getElementById("myEntry").style.display = "block";
   }
    function closeForm(){
        document.getElementById("myEntry").style.display = "none";
    }
}


//document.getElementById("myEntry").onclick = openForm();
//document.getElementById("myEntry").onclick = openForm()

//module.exports = { init };
