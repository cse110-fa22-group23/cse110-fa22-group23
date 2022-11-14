//window.addEventListener("DOMContentLoaded", init);
var data = [];
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

/**
 * Appends form data (from the modal) to a corresponding entry in the table.
 */
function AddRow() {
    event.preventDefault();
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
    // closeForm();
    save_data();
}

/**
 * Saves form data (from the modal) to local storage.
 */

function save_data() {
    data.push({
        company1: document.getElementById("company").value,
        position1: document.getElementById("position").value,
        location1: document.getElementById("location").value,
        industry1: document.getElementById("industry").value,
        status1: document.getElementById("status").value,
        ranking1: document.getElementById("ranking").value,
        deadline1: document.getElementById("start").value,
    });
    window.localStorage.setItem("SpreadSheet", JSON.stringify(data));
    //  show_data(data);
}
/**
function show_data(data){
    var arr = data;
    get_data(arr);
    var table = document.getElementById("spreadsheet");
    for(i = 0; i <= arr.length; i++){

        var row = table.insertRow(1);
        var company1 = row.insertCell(0);
        var position1 = row.insertCell(1);
        var location1 = row.insertCell(2);
        var industry1 = row.insertCell(3);
        var status1 = row.insertCell(4);
        var ranking1 = row.insertCell(5);
        var deadline1 = row.insertCell(6);
        company1.innerHTML = arr[i].company1;
        position1.innerHTML = arr[i].position1;
        location1.innerHTML = arr[i].location1;
        industry1.innerHTML = arr[i].industry1;
        status1.innerHTML = arr[i].status1;
        ranking1.innerHTML = arr[i].ranking1;
        deadline1.innerHTML = arr[i].deadline1;
    }

}

function get_data(data){
    var str = localStorage.getItem("SpreadSheet");
    if(str != null){
        data = JSON.parse(str);
    }
}
*/
//document.getElementById("myEntry").onclick = openForm();
//document.getElementById("myEntry").onclick = openForm()

// To be used in tests
module.exports = { init, openForm, closeForm, AddRow, save_data };
