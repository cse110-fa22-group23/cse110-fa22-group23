/**
 * @jest-environment jsdom
 */
/* eslint-env jest */
// sort.test.js

import functions from "../assets/js/index.js";
import { sortBy } from "../assets/js/sort.js";

test("Test sort() sorts correct row content", () => {
    for (let col = 0; col < 7; col++) {
        sortByColumn(col);
    }
});

function sortByColumn(col) {
    document.body.innerHTML = `
        <table id="spreadsheet" style="background-color: rgba(0, 0, 0, 0)">
            <!--table header-->
            <tbody><tr>
                <th class="sortable" id="companyName" onclick="sortBy(0)">
                    COMPANY:
                </th>
                <th class="sortable" id="Position" onclick="sortBy(1)">
                    POSITION:
                </th>
                <th class="sortable" id="Location" onclick="sortBy(2)">
                    LOCATION:
                </th>
                <th class="sortable" id="Industry" onclick="sortBy(3)">
                    INDUSTRY:
                </th>
                <th class="sortable" id="Status" onclick="sortBy(4)">
                    STATUS:
                </th>
                <th class="sortable" id="Ranking" onclick="sortBy(5)">
                    RANKING:
                </th>
                <th class="sortable" id="Deadline" onclick="sortBy(6)">
                    DEADLINE:
                </th>
            </tr>
            <!-- javascript render here -->
        </tbody></table>
    `;

    const entry1 = JSON.parse(
        '{"company":"B","position":"G","location":"Southwest","industry":"B","status":"In Progress","ranking":"1 star","deadline":"2022-10-09"}'
    );
    const entry2 = JSON.parse(
        '{"company":"C","position":"H","location":"Northeast","industry":"C","status":"Not Started Yet","ranking":"3 star","deadline":"2022-11-10"}'
    );
    const entry3 = JSON.parse(
        '{"company":"A","position":"F","location":"Remote","industry":"A","status":"Applied","ranking":"2 star","deadline":"2022-09-20"}'
    );
    const table = document.getElementById("spreadsheet");

    // add all rows
    for (let count = 1; count < 4; count++) {
        if (count == 1) {
            functions.addEntry(entry1, count, count);
        } else if (count == 2) {
            functions.addEntry(entry2, count, count);
        } else if (count == 3) {
            functions.addEntry(entry3, count, count);
        }
    }

    // get all items in column
    let data = [];
    sortBy(col);
    for (let count = 1; count < 4; count++) {
        data.push(table.rows[count].cells[col].innerHTML);
    }
    // console.log("sorted " + data);
    expect(data).toEqual(data.sort());

    //sort by reverse order
    data = [];
    sortBy(col);
    for (let count = 1; count < 4; count++) {
        data.push(table.rows[count].cells[col].innerHTML);
    }
    // console.log("sorted  reverse " + data);
    expect(data).toEqual(data.sort().reverse());
}
