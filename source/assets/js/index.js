window.addEventListener("DOMContentLoaded", init);
var data = [];

/**
 * Callback function to run when DOM is loaded. Loads and renders data from localStorage.
 * @return 0 (int)
 */
function init() {
    // load data from localStorage if it exists
    if (!(localStorage.getItem("SpreadSheet") === null)) {
        var loadedData = window.localStorage.getItem("SpreadSheet");
        loadedData = JSON.parse(loadedData);
        addEntrys(loadedData);

        data = loadedData;
        console.log(loadedData);
    }
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
function addRow() {
    event.preventDefault();

    const formData = {
        company: document.getElementById("company").value,
        position: document.getElementById("position").value,
        location: document.getElementById("location").value,
        industry: document.getElementById("industry").value,
        status: document.getElementById("status").value,
        ranking: document.getElementById("ranking").value,
        deadline: document.getElementById("deadline").value,
    };

    addEntry(formData);
    closeForm();
    save_data();
}

/**
 * Edit the row given a reference to its data. Opens edit modal.
 * @param td item table data
 */
function editButton(item) {
    const row = item.closest("tr");
    console.log(row, item)
    document.getElementById("form-modal").style.display = "block";
    return 0;
}

/**
 * Deletes the row given a reference to its data.
 * @param td item table data
 */
function deleteButton(item) {
    const row = item.closest("tr");
    document.getElementById("spreadsheet").deleteRow(row.rowIndex);
}

/**
 * Add multiple entrys to the table.
 * @param entrys array of entrys
 */
function addEntrys(entrys) {
    entrys.forEach((entry) => {
        addEntry(entry);
    });
}

/**
 * Appends form data (from the modal) to a corresponding entry in the table.
 * @param entry a dictionary of a job application data
 */
function addEntry(entry) {
    var table = document.getElementById("spreadsheet");
    var row = table.insertRow(1);
    var company = row.insertCell(0);
    company.setAttribute("class", "company_name");
    var position = row.insertCell(1);
    position.setAttribute("class", "position_name");
    var location = row.insertCell(2);
    location.setAttribute("class", "location_name");
    var industry = row.insertCell(3);
    industry.setAttribute("class", "industry_name");
    var status = row.insertCell(4);
    status.setAttribute("class", "status_name");
    var ranking = row.insertCell(5);
    ranking.setAttribute("class", "ranking_value");
    var deadline = row.insertCell(6);
    deadline.setAttribute("class", "deadline_date");
    var editButton = row.insertCell(7);
    var deleteButton = row.insertCell(8);
    company.innerHTML = entry["company"];
    position.innerHTML = entry["position"];
    location.innerHTML = entry["location"];
    industry.innerHTML = entry["industry"];
    status.innerHTML = entry["status"];
    if (status.innerHTML == "Applied") {
        status.setAttribute("class", "applied");
    } else if (status.innerHTML == "In Progress") {
        status.setAttribute("class", "in_progress");
    } else if (status.innerHTML == "Not Started") {
        status.setAttribute("class", "not_started");
    }
    ranking.innerHTML = `<img src="/source/assets/images/stars/${entry["ranking"]}-star.svg" alt="${entry["ranking"]} stars"></img>`;
    deadline.innerHTML = entry["deadline"];
    editButton.innerHTML = `<button type="button" id="createBtn" onclick="editButton(this)">Edit</button>`;
    deleteButton.innerHTML = `<button type="button" id="createBtn" onclick="deleteButton(this)">Delete</button>`;
}

/**
 * Saves form data (from the modal) to local storage.
 */
function save_data() {
    data.push({
        company: document.getElementById("company").value,
        position: document.getElementById("position").value,
        location: document.getElementById("location").value,
        industry: document.getElementById("industry").value,
        status: document.getElementById("status").value,
        ranking: document.getElementById("ranking").value,
        deadline: document.getElementById("deadline").value,
    });
    window.localStorage.setItem("SpreadSheet", JSON.stringify(data));
}

// To be used in tests
module.exports = {
    init,
    openForm,
    closeForm,
    addRow,
    save_data,
    addEntry,
    deleteButton,
    editButton,
};
