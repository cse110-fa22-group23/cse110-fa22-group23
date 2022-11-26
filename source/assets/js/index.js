window.addEventListener("DOMContentLoaded", init);
var data = {};
var count = 1;
var currRow;

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

        data = loadedData;
    }

    var counter = window.localStorage.getItem("counter");
    if (!(counter === null)) {
        count = JSON.parse(counter);
    }
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

window.addEventListener("click", function (e) {
    if (e.target == document.getElementById("form-modal")) {
        closeForm();
    }

    if (e.target == document.getElementById("edit-modal")) {
        closeEditForm();
    }
});

/**
 * Appends form data (from the modal) to a corresponding entry in the table. Reset form field after submit.
 */
function addRow() {
    event.preventDefault();

    const formData = getFormData("");

    let rowId = count;
    addEntry(formData, rowId);
    closeForm();
    save_data(rowId, formData);

    const form = document.getElementById("entry-form");
    if (form) form.reset();
}

/**
 * Edit the row given a reference to its data. Opens edit modal.
 * @param item (td) table data
 */
function editButton(item) {
    const row = item.closest("tr");
    currRow = row;
    const rowData = data[row.id];

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
    event.preventDefault();
    const row = currRow;
    const formData = getFormData("Edit");
    addEntry(formData, row.id, row.rowIndex);
    deleteButton(row);
    closeEditForm();
    save_data(row.id, formData);
}

/**
 * Sanitize and encode all HTML in a user-submitted string
 * https://portswigger.net/web-security/cross-site-scripting/preventing
 * @param  {String} str  The user-submitted string
 * @return {String} str  The sanitized string
 */
var sanitizeHTML = function (str) {
    return str.replace(/[^\w. ]/gi, function (c) {
        return "&#" + c.charCodeAt(0) + ";";
    });
};

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
    const row = item.closest("tr");
    currRow = row;
    deleteConfirm();
}
/**
 * Deletes the row given a reference to its data.
 */
function deleteButton() {
    const row = currRow;
    // delete from HTML
    document.getElementById("spreadsheet").deleteRow(row.rowIndex);
    // delete from local storage
    delete data[row.id];
    save_localstorage();
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
    count++;
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
        rowCells.status.setAttribute("class", "applied");
    } else if (rowCells.status.innerHTML == "In Progress") {
        rowCells.status.setAttribute("class", "in_progress");
    } else if (rowCells.status.innerHTML == "Not Started") {
        rowCells.status.setAttribute("class", "not_started");
    }
    rowCells.ranking.innerHTML = `<img src="./assets/images/stars/${entry["ranking"]}s.PNG" alt="${entry["ranking"]} stars" class="center" style="display:block;" width="100%" height="100%"></img>`;
    rowCells.deadline.innerHTML = entry["deadline"];
    rowCells.editButton.innerHTML = `<button type="button" class="tableBtn" onclick="editButton(this)"><img src="./assets/images/icons/edit-pen-icon.webp" height=15px alt="edit row"></button>`;
    rowCells.deleteButton.innerHTML = `<button type="button" class="tableBtn" onclick="deleteForm(this)"><img src="./assets/images/icons/trash-icon.webp" height=15px alt="delete row"></button>`;
}

/**
 * Saves form data (from the modal) to local storage.
 * @param id of the application (key into localstorage)
 * @param formData data fields of application
 */
function save_data(id, formData) {
    data[id.toString()] = formData;

    save_localstorage();
}

/**
 * Saves local storage.
 */
function save_localstorage() {
    window.localStorage.setItem("SpreadSheet", JSON.stringify(data));
    window.localStorage.setItem("counter", JSON.stringify(count));
}

/////////////////////////SORT TABLE////////////////////////////////////////////////////////

// determine if the same column is clicked again

/**
 * Sorts the table by the column clicked.
 * @param c TODO
 */
function sortBy(c) {
    let rows = document.getElementById("spreadsheet").rows.length - 1; // num of rows
    let columns = document.getElementById("spreadsheet").rows[0].cells.length; // num of columns
    let arrTable = [...Array(rows)].map(() => Array(columns)); // create an empty 2d array

    for (let ro = 0; ro < rows; ro++) {
        // cycle through rows
        for (let co = 0; co < columns; co++) {
            // cycle through columns
            // assign the value in each row-column to a 2d array by row-column
            arrTable[ro][co] =
                document.getElementById("spreadsheet").rows[ro].cells[
                    co
                ].innerHTML;
        }
    }

    let th = arrTable.shift(); // remove the header row from the array, and save it

    // if the same column is clicked then reverse the array

    arrTable.sort((a, b) => {
        if (a[c] === b[c]) {
            return 0;
        } else {
            return a[c] < b[c] ? -1 : 1;
        }
    });
    if (
        document.getElementById("spreadsheet").rows[0].cells[c].className ==
        "sortable asc"
    ) {
        arrTable.reverse();
    }

    arrTable.unshift(th); // put the header back in to the array

    // cycle through rows-columns placing values from the array back into the html table
    for (let ro = 0; ro < rows; ro++) {
        for (let co = 0; co < columns; co++) {
            if (ro === 0 && co === c) {
                let chosen =
                    document.getElementById("spreadsheet").rows[ro].cells[co];
                if (chosen.className == "sortable asc") {
                    chosen.className = "sortable dsc";
                } else {
                    chosen.className = "sortable asc";
                }
            }
            document.getElementById("spreadsheet").rows[ro].cells[
                co
            ].innerHTML = arrTable[ro][co];
            // TODO: restore the status class here
        }
    }
    //fix status color bubble
    for (let ro = 1; ro < rows; ro++) {
        let chosen = document.getElementById("spreadsheet").rows[ro].cells[4];
        if (chosen.innerHTML == "Applied") {
            chosen.className = "applied";
        } else if (chosen.innerHTML == "In Progress") {
            chosen.className = "in_progress";
        } else if (chosen.innerHTML == "Not Started") {
            chosen.className = "not_started";
        }
    }
    //fix status color bubble
    for (let ro = 1; ro < rows; ro++) {
        let chosen = document.getElementById("spreadsheet").rows[ro].cells[4];
        if (chosen.innerHTML == "Applied") {
            chosen.className = "applied";
        } else if (chosen.innerHTML == "In Progress") {
            chosen.className = "in_progress";
        } else if (chosen.innerHTML == "Not Started") {
            chosen.className = "not_started";
        }
    }
}

//////////////////////////END OF SORT TABLE//////////////////////////////////////////
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
    editRow,
    sortBy,
    deleteForm,
};
