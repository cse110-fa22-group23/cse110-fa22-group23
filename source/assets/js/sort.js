/**
 * Sorts the table by the column clicked.
 * @param c column index to sort by
 */
function sortBy(c) {
    var table, rows, switching, i, x, y, shouldSwitch;
    table = document.getElementById("spreadsheet");
    switching = true;
    /* Make a loop that will continue until
    no switching has been done: */
    var dir = "asc";
    var switchcount = 0;

    while (switching) {
        // Start by saying: no switching is done:
        switching = false;
        rows = table.rows;
        /* Loop through all table rows (except the
            first, which contains table headers): */
        for (i = 1; i < rows.length - 1; i++) {
            // Start by saying there should be no switching:
            shouldSwitch = false;
            /* Get the two elements you want to compare,
                one from current row and one from the next: */
            x = rows[i].cells[c];
            y = rows[i + 1].cells[c];

            // Check if the two rows should switch place:
            if (dir == "asc") {
                if (
                    x != null &&
                    y != null &&
                    x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()
                ) {
                    // If so, mark as a switch and break the loop:
                    shouldSwitch = true;
                    break;
                }
            } else if (dir == "desc") {
                if (
                    x != null &&
                    y != null &&
                    x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()
                ) {
                    // If so, mark as a switch and break the loop:
                    shouldSwitch = true;
                    break;
                }
            }
        }
        if (shouldSwitch) {
            /* If a switch has been marked, make the switch
                        and mark that a switch has been done: */
            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
            switching = true;

            // Each time a switch is done, increase this count by 1:
            switchcount++;
        } else {
            /* If no switching has been done AND the direction is "asc",
                        set the direction to "desc" and run the while loop again. */
            if (switchcount == 0 && dir == "asc") {
                dir = "desc";
                switching = true;
            }
        }
    }
    // remove selected, asc, and desc statuses from other cols
    const selectedHeaders = document.querySelectorAll(".selected");

    selectedHeaders.forEach((header) => {
        header.classList.remove("selected");
        header.classList.remove("asc");
        header.classList.remove("desc");
    });

    // add selected status to current col
    table.rows[0].cells[c].classList.add("selected");

    if (dir == "asc") {
        table.rows[0].cells[c].classList.add("asc");
    } else {
        table.rows[0].cells[c].classList.add("desc");
    }
}

export { sortBy };
