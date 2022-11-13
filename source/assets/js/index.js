//window.addEventListener("DOMContentLoaded", init);

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
function AddRow() {
    var table = document.getElementById("spreadsheet");
    var row = table.insertRow(1);
    var company1 = row.insertCell(0);
    var position1 = row.insertCell(1);
    var location1 = row.insertCell(2);
    var industry1 = row.insertCell(3);
    var status1 = row.insertCell(4);
    var ranking1 = row.insertCell(5);
    var deadline1 = row.insertCell(6);
    company1.innerHTML = document.getElementById("company").value;
    position1.innerHTML = document.getElementById("position").value;
    location1.innerHTML = document.getElementById("location").value;
    industry1.innerHTML = document.getElementById("industry").value;
    status1.innerHTML = document.getElementById("status").value;
    ranking1.innerHTML = document.getElementById("ranking").value;
    deadline1.innerHTML = document.getElementById("start").value;
    closeForm();
}
//document.getElementById("myEntry").onclick = openForm();
//document.getElementById("myEntry").onclick = openForm()
// To be used in tests
module.exports = { init, openForm, closeForm, AddRow };
