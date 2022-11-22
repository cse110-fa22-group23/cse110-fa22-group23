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
        console.log(loadedData);
    }

    var counter = window.localStorage.getItem("counter");
    if (!(counter === null)) {
        count = JSON.parse(counter);
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
});

/**
 * Appends form data (from the modal) to a corresponding entry in the table.
 */
function addRow() {
    event.preventDefault();

    const formData = getFormData("");

    let rowId = count;
    addEntry(formData, rowId);
    closeForm();
    save_data(rowId, formData);
}

/**
 * Edit the row given a reference to its data. Opens edit modal.
 * @param td item table data
 */
function editButton(item) {
    const row = item.closest("tr");
    currRow = row;
    const rowData = data[row.id];
    console.log(rowData["company"]);
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
    return formData;
}
/**
 * Deletes the row given a reference to its data.
 * @param item td table data
 */
function deleteButton(item) {
    const row = item.closest("tr");
    // delete from HTML
    document.getElementById("spreadsheet").deleteRow(row.rowIndex);
    // delete from local storage
    console.log(data[row.id]);
    delete data[row.id];
    save_localstorage();
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
 * Appends form data (from the modal) to a corresponding entry in the table.
 * @param entry a dictionary of a job application data
 */
function addEntry(entry, id, rowIndex = 1) {
    var table = document.getElementById("spreadsheet");
    var row = table.insertRow(rowIndex);
    row.id = id;
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
    // ranking.innerHTML = `<img src="/cse110-fa22-group23/admin/source/assets/images/stars/${entry["ranking"]}-star.svg" alt="${entry["ranking"]} stars"></img>`;
    deadline.innerHTML = entry["deadline"];
    editButton.innerHTML = `<button type="button" id="createBtn" onclick="editButton(this)">Edit</button>`;
    deleteButton.innerHTML = `<button type="button" id="createBtn" onclick="deleteButton(this)">Delete</button>`;
    count++;
}

/**
 * Saves form data (from the modal) to local storage.
 */
function save_data(id, formData) {
    data[id.toString()] = formData;

    save_localstorage();
}

function save_localstorage() {
    window.localStorage.setItem("SpreadSheet", JSON.stringify(data));
    window.localStorage.setItem("counter", JSON.stringify(count));
}


// To be used in tests
// module.exports = {
//     init,
//     openForm,
//     closeForm,
//     addRow,
//     save_data,
//     addEntry,
//     deleteButton,
//     editButton,
//     editRow,
// };

let cPrev = -1; // global var saves the previous c, used to
            // determine if the same column is clicked again

function sortBy(c) {
    rows = document.getElementById("spreadsheet").rows.length-1; // num of rows
    // console.log(rows)
    columns = document.getElementById("spreadsheet").rows[0].cells.length; // num of columns
    // console.log(columns)
    arrTable = [...Array(rows)].map(e => Array(columns)); // create an empty 2d array
    // console.log(arrTable)

    for (ro=0; ro<rows; ro++) { // cycle through rows
        for (co=0; co<columns; co++) { // cycle through columns
            // assign the value in each row-column to a 2d array by row-column
            arrTable[ro][co] = document.getElementById("spreadsheet").rows[ro].cells[co].innerHTML;
        }
    }

    th = arrTable.shift(); // remove the header row from the array, and save it
    
    
    if (c !== cPrev) { // different column is clicked, so sort by the new column
        arrTable.sort(
            (a, b) => {
                if (a[c] === b[c]) {
                    return 0;
                } else {
                    return (a[c] < b[c]) ? -1 : 1;
                }
            }
        );
    } else { // if the same column is clicked then reverse the array
        arrTable.reverse();
    }
    
    cPrev = c; // save in previous c

    arrTable.unshift(th); // put the header back in to the array

    // cycle through rows-columns placing values from the array back into the html table
    for (ro=0; ro<rows; ro++) {
        for (co=0; co<columns; co++) {
            if (ro ===0){
                if (co == c){

                    let chosen = document.getElementById("spreadsheet").rows[ro].cells[co]
                    if (chosen.className == "sortable asc"){
                        chosen.className = "sortable dsc"
                    }else{chosen.className = "sortable asc"}

                }
            }
            document.getElementById("spreadsheet").rows[ro].cells[co].innerHTML = arrTable[ro][co];
        }
    }

}