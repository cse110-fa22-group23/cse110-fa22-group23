// non-persistent state
import state from "./state.js";
import { sortBy } from "./sort.js";

window.addEventListener("DOMContentLoaded", init);

// add event listeners
window.addEventListener("click", function (e) {
    if (e.target == document.getElementById("form-modal")) {
        closeForm();
    }

    if (e.target == document.getElementById("edit-modal")) {
        closeEditForm();
    }

    if (e.target == document.getElementById("delete-modal")) {
        closeDelete();
    }
    if (e.target == document.getElementById("createBtn")) {
        openForm();
    }
});

/**
 * Callback function to run when DOM is loaded. Loads and renders data from localStorage.
 * @return 0 (int)
 */
function init() {
    // load data from localStorage if it exists
    var loadedData = window.localStorage.getItem("SpreadSheet");
    if (!(loadedData === null)) {
        loadedData = JSON.parse(loadedData);
        addEntrys(loadedData);
        state.data = loadedData;
    }

    var counter = window.localStorage.getItem("counter");
    if (!(counter === null)) {
        state.count = JSON.parse(counter);
    }

    // add listeners
    let el = document.getElementById("closeEditForm");
    el.addEventListener("click", closeEditForm);
    el = document.getElementById("companyName");
    el.addEventListener("click", () => {
        sortBy(0);
    });
    el = document.getElementById("Position");
    el.addEventListener("click", () => {
        sortBy(1);
    });
    el = document.getElementById("Location");
    el.addEventListener("click", () => {
        sortBy(2);
    });
    el = document.getElementById("Industry");
    el.addEventListener("click", () => {
        sortBy(3);
    });
    el = document.getElementById("Status");
    el.addEventListener("click", () => {
        sortBy(4);
    });
    el = document.getElementById("Ranking");
    el.addEventListener("click", () => {
        sortBy(5);
    });
    el = document.getElementById("Deadline");
    el.addEventListener("click", () => {
        sortBy(6);
    });

    el = document.getElementById("addRow");
    el.addEventListener("click", addRow);
    el = document.getElementById("closeForm");
    el.addEventListener("click", closeForm);
    el = document.getElementById("closeDelete");
    el.addEventListener("click", closeDelete);
    el = document.getElementById("deleteButton");
    el.addEventListener("click", deleteButton);
    el = document.getElementById("editRow");
    el.addEventListener("click", editRow);
    return 0;
}

/**
 * Makes the delete confirmation modal visible on the page.
 */
function deleteConfirm() {
    document.getElementById("delete-modal").style.display = "block";
}
/**
 * Makes the delete confirmation modal no longer visible on the page.
 */
function closeDelete() {
    document.getElementById("delete-modal").style.display = "none";
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

/**
 * Makes the form modal visible on the page.
 */
function openEditForm() {
    document.getElementById("edit-modal").style.display = "block";
}

/**
 * Makes the form modal no longer visible on the page.
 */
function closeEditForm() {
    document.getElementById("edit-modal").style.display = "none";
}

/**
 * Appends form data (from the modal) to a corresponding entry in the table. Reset form field after submit.
 */
function addRow() {
    // event.preventDefault();

    const formData = getFormData("");

    let rowId = state.count;
    addEntry(formData, rowId);
    closeForm();
    saveData(rowId, formData);

    const form = document.getElementById("entry-form");
    if (form) form.reset();
}

/**
 * Edit the row given a reference to its data. Opens edit modal.
 * @param item (td) table data
 */
function editButton(item) {
    const row = item.target.closest("tr");
    state.currRow = row;
    const rowData = state.data[row.id];
    // prefill form with row data
    document.getElementById("companyEdit").value = rowData["company"];
    document.getElementById("positionEdit").value = rowData["position"];
    document.getElementById("locationEdit").value = rowData["location"];
    document.getElementById("industryEdit").value = rowData["industry"];
    document.getElementById("statusEdit").value = rowData["status"];
    document.getElementById("rankingEdit").value = rowData["ranking"];
    document.getElementById("deadlineEdit").value = rowData["deadline"];

    openEditForm();
}

/**
 *  Edit row from the data in the modal.
 */
function editRow() {
    // event.preventDefault();
    const row = state.currRow;
    const formData = f.getFormData("Edit");
    addEntry(formData, row.id, row.rowIndex);
    deleteButton(row);
    closeEditForm();
    saveData(row.id, formData);
}

/**
 * Sanitize and encode all HTML in a user-submitted string
 * https://portswigger.net/web-security/cross-site-scripting/preventing
 * @param  {String} str  The user-submitted string
 * @return {String} str  The sanitized string
 */
function sanitizeHTML(str) {
    return str.replace(/[^\w. ]/gi, function (c) {
        return "&#" + c.charCodeAt(0) + ";";
    });
}

/**
 * Get the data inside the edit form.
 * @param postfix to add to the 'id' because all ids must be unique
 *  * @example <caption>Example usage of to get edit form data.</caption>
 * // returns the edit form data
 * getEditFormData("Edit");
 * @returns formData object of form fields
 */
function getFormData(postfix) {
    const formData = {
        company: document.getElementById(`company${postfix}`).value,
        position: document.getElementById(`position${postfix}`).value,
        location: document.getElementById(`location${postfix}`).value,
        industry: document.getElementById(`industry${postfix}`).value,
        status: document.getElementById(`status${postfix}`).value,
        ranking: document.getElementById(`ranking${postfix}`).value,
        deadline: document.getElementById(`deadline${postfix}`).value,
    };

    // attempt to sanitize user input and enforce character limit
    for (var key in formData) {
        formData[key] = sanitizeHTML(formData[key]);
        formData[key] = formData[key].substring(0, 24);
    }

    return formData;
}

/**
 * Sets the row to be deleted.
 * @param item (td) table data
 */
function deleteForm(item) {
    const row = item.target.closest("tr");
    state.currRow = row;
    deleteConfirm();
}

/**
 * Deletes the row given a reference to its data.
 */
function deleteButton() {
    const row = state.currRow;
    // delete from HTML
    document.getElementById("spreadsheet").deleteRow(row.rowIndex);
    // delete from local storage
    delete state.data[row.id];
    saveLocalStorage();
    closeDelete();
}

/**
 * Add multiple entrys to the table.
 * @param entrys array of entrys
 */
function addEntrys(entrys) {
    for (var key in entrys) {
        addEntry(entrys[key], key);
    }
}

/**
 * Initializes a newly created row with corresponding fields.
 * @param table the table to add the row to
 * @param id the id to be assigned to the row
 * @param rowIndex the index of the row to be added
 * @returns an object containing the cells of the newly created row
 */
function initializeRow(table, id, rowIndex) {
    var row = table.insertRow(rowIndex);
    var rowCells = {};
    row.id = id;
    state.count = state.count + 1;
    rowCells.company = row.insertCell(0);
    rowCells.company.setAttribute("class", "company_name");
    rowCells.position = row.insertCell(1);
    rowCells.position.setAttribute("class", "position_name");
    rowCells.location = row.insertCell(2);
    rowCells.location.setAttribute("class", "location_name");
    rowCells.industry = row.insertCell(3);
    rowCells.industry.setAttribute("class", "industry_name");
    rowCells.status = row.insertCell(4);
    rowCells.status.setAttribute("class", "status_name");
    rowCells.ranking = row.insertCell(5);
    rowCells.ranking.setAttribute("class", "ranking_value");
    rowCells.deadline = row.insertCell(6);
    rowCells.deadline.setAttribute("class", "deadline_date");
    rowCells.editButton = row.insertCell(7);
    rowCells.deleteButton = row.insertCell(8);

    return rowCells;
}

/**
 * Appends form data (from the modal) to a corresponding entry in the table.
 * @param entry a dictionary of a job application data
 * @param id the id to be assigned to the row
 * @param rowIndex the index of the row to be added
 */
function addEntry(entry, id, rowIndex = 1) {
    var table = document.getElementById("spreadsheet");
    var rowCells = initializeRow(table, id, rowIndex);

    rowCells.company.innerHTML = entry["company"];
    rowCells.position.innerHTML = entry["position"];
    rowCells.location.innerHTML = entry["location"];
    rowCells.industry.innerHTML = entry["industry"];
    rowCells.status.innerHTML = entry["status"];
    if (rowCells.status.innerHTML == "Applied") {
        rowCells.status.innerHTML = `<span class="applied">${entry["status"]}</span>`;
    } else if (rowCells.status.innerHTML == "In Progress") {
        rowCells.status.innerHTML = `<span class="in_progress">${entry["status"]}</span>`;
    } else if (rowCells.status.innerHTML == "Not Started") {
        rowCells.status.innerHTML = `<span class="not_started">${entry["status"]}</span>`;
    }
    rowCells.status.setAttribute("class", "status");
    rowCells.ranking.innerHTML = `<img src="./assets/images/stars/${entry["ranking"]}s.PNG" alt="${entry["ranking"]} stars" class="center" style="display:block;" width="100%" height="100%"></img>`;
    rowCells.deadline.innerHTML = entry["deadline"];
    rowCells.editButton.innerHTML = `<button type="button" class="tableBtn" ><img src="./assets/images/icons/edit-pen-icon.webp" height=15px alt="edit row"></button>`;
    rowCells.editButton.addEventListener("click", editButton);
    rowCells.deleteButton.innerHTML = `<button type="button" class="tableBtn caution" ><img src="./assets/images/icons/trash-icon.webp" height=15px alt="delete row"></button>`;
    rowCells.deleteButton.addEventListener("click", deleteForm);
}

/**
 * Saves form data (from the modal) to local storage.
 * @param id of the application (key into localstorage)
 * @param formData data fields of application
 */
function saveData(id, formData) {
    state.data[id.toString()] = formData;
    saveLocalStorage();
}

/**
 * Saves local storage.
 */
function saveLocalStorage() {
    window.localStorage.setItem("SpreadSheet", JSON.stringify(state.data));
    window.localStorage.setItem("counter", JSON.stringify(state.count));
}

/**
 * Sample test for mocking internal function calls.
 */
function testme() {
    // example dependency injection
    let returned_value = f.addEntry();
    return returned_value;
}

/**
 * Clear localstorage.
 */
function clearLocalStorage() {
    window.localStorage.clear();
}

// To be used in tests
const f = {
    init,
    openForm,
    closeForm,
    addRow,
    saveData,
    addEntry,
    deleteButton,
    editButton,
    getFormData,
    editRow,
    deleteForm,
    closeEditForm,
    openEditForm,
    closeDelete,
    deleteConfirm,
    initializeRow,
    addEntrys,
    saveLocalStorage,
    testme,
    clearLocalStorage,
};

export default f;
