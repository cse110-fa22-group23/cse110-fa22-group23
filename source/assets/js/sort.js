/**
 * Sorts the table by the column clicked.
 * @param c column index to sort by
 */
function sortBy(c) {
    // let rows = document.getElementById("spreadsheet").rows.length - 1; // num of rows
    // let columns = document.getElementById("spreadsheet").rows[0].cells.length; // num of columns

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
            console.log(x);
            console.log(y);
            // Check if the two rows should switch place:
            if (dir == "asc") {
                if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
                    // If so, mark as a switch and break the loop:
                    shouldSwitch = true;
                    break;
                }
            } else if (dir == "desc") {
                if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
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
