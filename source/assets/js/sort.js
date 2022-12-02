/**
 * Sorts the table by the column clicked.
 * @param c column index to sort by
 */
function sortBy(c) {
    var table = document.getElementById("spreadsheet");
    var switching = true;
    var dir = "asc";
    var switchcount = 0;

    // loop until no more switching has been done
    var rows, i, x, y, shouldSwitch;
    while (switching) {
        // default to no switching
        switching = false;
        rows = table.rows;
        // loop through all table rows, except for header
        for (i = 1; i < rows.length - 1; i++) {
            // Start by saying there should be no switching:
            shouldSwitch = false;
            // get consecutive elements for compare
            x = rows[i].cells[c];
            y = rows[i + 1].cells[c];

            if (x == null || y == null) {
                continue;
            }

            // check if rows should be switched
            if (
                dir == "asc" &&
                x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()
            ) {
                // if out of order, break from loop
                shouldSwitch = true;
                break;
            } else if (
                dir == "desc" &&
                x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()
            ) {
                // if out of order, break from loop
                shouldSwitch = true;
                break;
            }
        }
        if (shouldSwitch) {
            // if a switch has been marked, continue switching
            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
            switching = true;
            switchcount++;
        } else {
            // if no switching and direction is "asc", set direction to "desc" and loop again
            if (switchcount == 0 && dir == "asc") {
                dir = "desc";
                switching = true;
            }
        }
    }
    // remove "selected", "asc", and "desc" statuses from other cols
    const selectedHeaders = document.querySelectorAll(".selected");
    selectedHeaders.forEach((header) => {
        header.classList.remove("selected");
        header.classList.remove("asc");
        header.classList.remove("desc");
    });

    // add selected status to current col
    table.rows[0].cells[c].classList.add("selected");

    // change table header arrow based on sort (dir is asc or desc)
    table.rows[0].cells[c].classList.add(dir);
}

export { sortBy };
