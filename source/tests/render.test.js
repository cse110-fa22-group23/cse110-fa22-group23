/* eslint-env jest */
// render.test.js

import * as functions from "../assets/js/index.js";
import state from "../assets/js/state.js";

afterEach(() => {
    // restore the spy created with spyOn
    jest.restoreAllMocks();
    // clear state
    functions.clearLocalStorage();
    state.data = {};
    state.count = 1;
    state.currRow = undefined;
});

test("Test test function", () => {
    let mocked = jest.spyOn(functions, "addEntry").mockReturnValue("C");
    // const mockCallback = jest.fn((x) => x);
    expect(functions.testme()).toBe("C");
    expect(mocked.mock.calls.length).toBe(1);
});

test("Test deleteConfirm()", () => {
    document.body.innerHTML = `
        <div id="delete-modal"></div>
    `;
    functions.deleteConfirm();
    const myEntryEl = document.getElementById("delete-modal");
    expect(myEntryEl.style.display).toBe("block");
});

test("Test closeDelete()", () => {
    document.body.innerHTML = `
        <div id="delete-modal"></div>
    `;
    functions.closeDelete();
    const myEntryEl = document.getElementById("delete-modal");
    expect(myEntryEl.style.display).toBe("none");
});

test("Test openForm()", () => {
    document.body.innerHTML = `
        <div id="form-modal"></div>
    `;
    functions.openForm();
    const myEntryEl = document.getElementById("form-modal");
    expect(myEntryEl.style.display).toBe("block");
});

test("Test closeForm()", () => {
    document.body.innerHTML = `
        <div id="form-modal"></div>
    `;
    functions.closeForm();
    const myEntryEl = document.getElementById("form-modal");
    expect(myEntryEl.style.display).toBe("none");
});

test("Test openEditForm()", () => {
    document.body.innerHTML = `
        <div id="edit-modal"></div>
    `;
    functions.openEditForm();
    const myEntryEl = document.getElementById("edit-modal");
    expect(myEntryEl.style.display).toBe("block");
});

test("Test closeEditForm()", () => {
    document.body.innerHTML = `
        <div id="edit-modal"></div>
    `;
    functions.closeEditForm();
    const myEntryEl = document.getElementById("edit-modal");
    expect(myEntryEl.style.display).toBe("none");
});

test("Test addEntry() add rows", () => {
    document.body.innerHTML = `
        <table id="spreadsheet"><tr></tr></table>
    `;
    const entry = JSON.parse(
        '{"company":"","position":"","location":"","industry":"","status":"In Progress","ranking":"1 star","deadline":""}'
    );
    const table = document.getElementById("spreadsheet");

    // assert row is added every time
    for (let count = 1; count < 10; count++) {
        functions.addEntry(entry);
        var x = table.rows.length;
        expect(x).toBe(count + 1);
    }
});

test("Test addEntry() correct row content", () => {
    document.body.innerHTML = `
        <table id="spreadsheet"><tr></tr></table>
    `;
    const entry = JSON.parse(
        '{"company":"test company","position":"test position","location":"test location","industry":"test industry","status":"In Progress","ranking":"1 star","deadline":""}'
    );
    const table = document.getElementById("spreadsheet");

    // assert all row content is correct
    for (let count = 1; count < 2; count++) {
        functions.addEntry(entry, count, count);
        var row = table.rows[count];
        // console.log(x.innerHTML);
        expect(row.cells[0].innerHTML).toBe("test company");
        expect(row.cells[1].innerHTML).toBe("test position");
        expect(row.cells[2].innerHTML).toBe("test location");
        expect(row.cells[3].innerHTML).toBe("test industry");
        expect(row.cells[4].innerHTML).toContain("In Progress");
        expect(row.cells[5].innerHTML).toContain(
            "/assets/images/stars/1 stars.PNG"
        );
        expect(row.cells[6].innerHTML).toBe("");
    }
});

test("Test initializeRow()", () => {
    document.body.innerHTML = `
        <table id="spreadsheet"><tr></tr></table>
    `;
    const table = document.getElementById("spreadsheet");

    var output = functions.initializeRow(table, 1, 0);
    expect(JSON.stringify(output)).toBe(
        '{"company":{},"position":{},"location":{},"industry":{},"status":{},"ranking":{},"deadline":{},"editButton":{},"deleteButton":{}}'
    );
});

test("Test addEntrys() for no errors thrown", () => {
    expect(() => {
        functions.addEntrys(undefined);
    }).not.toThrow();
});

test("Test editButton() sets form fields", () => {
    document.body.innerHTML = `
    <table id="spreadsheet">
        <tr id="2">
        <td class="company_name">asd</td><td class="position_name">sdf</td><td class="location_name">Northeast</td><td class="industry_name">asdf</td><td class="status"><span class="not_started">Not Started</span></td><td class="ranking_value"><img src="./assets/images/stars/4s.PNG" alt="4" class="center" style="display:block;" width="100%" height="100%"></td><td class="deadline_date">2022-11-08</td><td><button type="button" class="tableBtn" onclick="editButton(this)"><img src="./assets/images/icons/edit-pen-icon.webp" alt="edit row" height="15px"></button></td><td><button type="button" class="tableBtn caution" onclick="deleteForm(this)"><img src="./assets/images/icons/trash-icon.webp" alt="delete row" height="15px"></button></td></tr><tr id="inputTable">
        </tr>
    </tbody></table>

    <!-- Edit Modal -->
        <div id="edit-modal" class="modal">
            <div class="modal-content">
                <form id="edit-form">
                    <div>
                        <label for="company">Enter Company Name:</label>
                        <input
                            type="text"
                            placeholder="Company Name"
                            name="company"
                            id="companyEdit"
                            required
                            maxlength="24"
                            title="Company (24 characters max.)"
                        />
                    </div>
                    <div>
                        <label for="position">Enter Position Title:</label>
                        <input
                            type="text"
                            placeholder="Position Name"
                            name="position"
                            id="positionEdit"
                            required
                            maxlength="24"
                            title="Position (24 characters max.)"
                        />
                    </div>
                    <div>
                        <label for="location">Enter Location:</label>
                        <select name="location" id="locationEdit">
                            <option value="">Choose location</option>
                            <option value="Remote">Remote</option>
                            <option value="Northeast">Northeast</option>
                            <option value="Southwest">Southwest</option>
                            <option value="West">West</option>
                            <option value="Southeast">Southeast</option>
                            <option value="Midwest">Midwest</option>
                        </select>
                    </div>
                    <div>
                        <label for="industry">Enter Industry:</label>
                        <input
                            type="text"
                            placeholder="Industry Name"
                            name="industry"
                            id="industryEdit"
                            required
                            maxlength="24"
                            title="Industry (24 characters max.)"
                        />
                    </div>
                    <div>
                        <label for="status">Enter Status:</label>
                        <select name="status" id="statusEdit">
                            <option value="In Progress">In Progress</option>
                            <option value="Applied">Applied</option>
                            <option value="Not Started">Not Started Yet</option>
                        </select>
                    </div>
                    <div>
                        <label for="ranking">Choose Ranking:</label>
                        <select name="ranking" id="rankingEdit">
                            <option value="1">1 star</option>
                            <option value="2">2 stars</option>
                            <option value="3">3 stars</option>
                            <option value="4">4 stars</option>
                            <option value="5">5 stars</option>
                        </select>
                    </div>
                    <div>
                        <label for="deadline">Enter Deadline:</label>
                        <input
                            type="date"
                            id="deadlineEdit"
                            name="deadline"
                            min="2022-01-01"
                            max="2023-12-31"
                        />
                    </div>
                    <br />
                    <div class="form-buttons">
                        <button class="caution" id="closeEditForm">
                            Cancel Edit
                        </button>
                        <input type="submit" value="Edit Entry" id="editRow" />
                    </div>
                </form>
            </div>
        </div>
    `;
    state.data = {
        2: {
            company: "Group 23",
            position: "Suusware Developer",
            location: "Southwest",
            industry: "UCSD",
            status: "In Progress",
            ranking: "1",
            deadline: "2022-11-10",
        },
    };

    expect(() => {
        const input = { target: document.getElementById("2") };
        functions.editButton(input);
        // assert it sets the form fields
        const expected = {
            company: "Group 23",
            position: "Suusware Developer",
            location: "Southwest",
            industry: "UCSD",
            status: "In Progress",
            ranking: "1",
            deadline: "2022&#45;11&#45;10",
        };
        expect(functions.getFormData("Edit")).toEqual(expected);
    }).not.toThrow();
});

test("Test editRow() changes row data", () => {
    // read index.html
    let fs = require("fs");
    let index = fs.readFileSync("../source/index.html");
    document.body.innerHTML = index.toString();

    // add dummy row
    functions.addRow();
    const row = document.getElementById("1");
    state.currRow = row;
    const formData = {
        company: "",
        position: "",
        location: "",
        industry: "",
        status: "In Progress",
        ranking: "1",
        deadline: "",
    };
    functions.editRow();

    // assert row data got changed
    expect(row.cells[0].innerHTML).toBe(formData.company);
    expect(row.cells[1].innerHTML).toBe(formData.position);
    expect(row.cells[2].innerHTML).toBe(formData.location);
    expect(row.cells[3].innerHTML).toBe(formData.industry);
    expect(row.cells[4].innerHTML).toContain("In Progress");
    expect(row.cells[5].innerHTML).toContain("/assets/images/stars/1s.PNG");
    expect(row.cells[6].innerHTML).toBe(formData.deadline);

    const numRows = document.getElementById("spreadsheet").rows.length;
    expect(numRows).toBe(3); // same as num rows before editing
    delete state.data[row.id];
});

test("Test deleteButton() deletes row", () => {
    document.body.innerHTML = `
    <table id="spreadsheet">
        <tr id="2">
        <td class="company_name">asd</td><td class="position_name">sdf</td><td class="location_name">Northeast</td><td class="industry_name">asdf</td><td class="status"><span class="not_started">Not Started</span></td><td class="ranking_value"><img src="./assets/images/stars/4s.PNG" alt="4" class="center" style="display:block;" width="100%" height="100%"></td><td class="deadline_date">2022-11-08</td><td><button type="button" class="tableBtn" onclick="editButton(this)"><img src="./assets/images/icons/edit-pen-icon.webp" alt="edit row" height="15px"></button></td><td><button type="button" class="tableBtn caution" onclick="deleteForm(this)"><img src="./assets/images/icons/trash-icon.webp" alt="delete row" height="15px"></button></td></tr>
        <tr id="3"></tr>
        <div id="delete-modal" style=""></div>
        <div id="edit-modal" style=""></div>
    </tbody></table>
    `;
    state.currRow = document.getElementById("2");

    functions.deleteButton();
    const row = document.getElementById("2");
    // assert row deleted
    expect(row).toBe(null);

    const numRows = document.getElementById("spreadsheet").rows.length;
    expect(numRows).toBe(1);
});

test("Test deleteForm() opens modal", () => {
    document.body.innerHTML = `
    <table id="spreadsheet">
        <tr id="2">
        <td class="company_name">asd</td><td class="position_name">sdf</td><td class="location_name">Northeast</td><td class="industry_name">asdf</td><td class="status"><span class="not_started">Not Started</span></td><td class="ranking_value"><img src="./assets/images/stars/4s.PNG" alt="4" class="center" style="display:block;" width="100%" height="100%"></td><td class="deadline_date">2022-11-08</td><td><button type="button" class="tableBtn" onclick="editButton(this)"><img src="./assets/images/icons/edit-pen-icon.webp" alt="edit row" height="15px"></button></td><td><button type="button" class="tableBtn caution" onclick="deleteForm(this)"><img src="./assets/images/icons/trash-icon.webp" alt="delete row" height="15px"></button></td></tr>
        <tr id="3"></tr>
        <div id="delete-modal" style=""></div>
        <div id="edit-modal" style=""></div>
    </tbody></table>
    `;
    const item = { target: document.getElementById("2") };
    functions.deleteForm(item);
    expect(document.getElementById("delete-modal").style.display).toBe("block");
});

test("Test getFormData() gets fields", () => {
    // read index.html
    let fs = require("fs");
    let index = fs.readFileSync("../source/index.html");
    document.body.innerHTML = index.toString();

    expect(() => {
        const output = functions.getFormData("Edit");

        const expected = {
            company: "",
            position: "",
            location: "",
            industry: "",
            status: "In Progress",
            ranking: "1",
            deadline: "",
        };
        expect(output).toEqual(expected);
    }).not.toThrow();
});

test("Test saveData() saves data", () => {
    const id = 12345;
    const formData = {
        company: "Group 23",
        position: "Suusware Developer",
        location: "Southwest",
        industry: "UCSD",
        status: "In Progress",
        ranking: "2",
        deadline: "2022-11-10",
    };
    functions.saveData(id, formData);
    expect(state.data).toEqual({ 12345: formData });
});

test("Test saveLocalStorage() saves data", () => {
    state.count = 12345;
    state.data = {
        company: "Group 23",
        position: "Suusware Developer",
        location: "Southwest",
        industry: "UCSD",
        status: "In Progress",
        ranking: "2",
        deadline: "2022-11-10",
    };
    functions.saveLocalStorage();
    const savedCount = JSON.parse(window.localStorage.getItem("counter"));
    const savedData = JSON.parse(window.localStorage.getItem("SpreadSheet"));
    expect(savedData).toEqual(state.data);
    expect(savedCount).toEqual(state.count);
});
