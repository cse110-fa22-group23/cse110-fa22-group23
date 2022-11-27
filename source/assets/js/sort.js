/**
 * Sorts the table by the column clicked.
 * @param c column index to sort by
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
            "sortable asc" ||
        document.getElementById("spreadsheet").rows[0].cells[c].className ==
            "sortable asc selected"
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
                if (chosen.className == "sortable asc selected") {
                    chosen.className = "sortable dsc selected";
                } else if (chosen.className == "sortable dsc selected") {
                    chosen.className = "sortable asc selected";
                } else if (chosen.className == "sortable asc") {
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
    // fix status color bubble
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
    // fix status color bubble
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

    const selectedHeaders = document.querySelectorAll(".selected");
    // remove selected status from other cols
    selectedHeaders.forEach((header) => {
        header.classList.remove("selected");
    });
    document
        .getElementById("spreadsheet")
        .rows[0].cells[c].classList.add("selected");
}

export { sortBy };
