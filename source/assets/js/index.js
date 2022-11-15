window.addEventListener("DOMContentLoaded", init);

/**
 * Callback function to run when DOM is loaded.
 * @return 0 (int)
 */
function init() {
    return 0;
}

/**
 * Makes the form modal visible on the page.
 */
function openForm() {
    document.getElementById("form-modal").style.display = "block";
}

/**
 * Makes the form modal no longer visible on the page.
 */
function closeForm() {
    document.getElementById("form-modal").style.display = "none";
}

window.addEventListener("click", function (e) {
    if (e.target == document.getElementById("form-modal")) {
        closeForm();
    }
});

/**
 * Appends form data (from the modal) to a corresponding entry in the table.
 */
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
    deadline1.innerHTML = document.getElementById("deadline").value;
    closeForm();
}

// To be used in tests
module.exports = { init, openForm, closeForm, AddRow };
