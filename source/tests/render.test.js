/* eslint-env jest */
// render.test.js

// const functions = require("../assets/js/index.js");
import * as functions from "../assets/js/index.js";
import state from "../assets/js/state.js";
// const state = require("../assets/js/state.js");

test("Test test function", () => {
    let mocked = jest.spyOn(functions, "addEntry").mockReturnValue("C");
    // const mockCallback = jest.fn((x) => x);
    expect(functions.testme()).toBe("C");
    expect(mocked.mock.calls.length).toBe(1);
    mocked.mockRestore();
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

test("Test editButton()", () => {
    document.body.innerHTML = `
    <table id="spreadsheet">
        <tr id="2">
        <td class="company_name">asd</td><td class="position_name">sdf</td><td class="location_name">Northeast</td><td class="industry_name">asdf</td><td class="status"><span class="not_started">Not Started</span></td><td class="ranking_value"><img src="./assets/images/stars/4s.PNG" alt="4" class="center" style="display:block;" width="100%" height="100%"></td><td class="deadline_date">2022-11-08</td><td><button type="button" class="tableBtn" onclick="editButton(this)"><img src="./assets/images/icons/edit-pen-icon.webp" alt="edit row" height="15px"></button></td><td><button type="button" class="tableBtn caution" onclick="deleteForm(this)"><img src="./assets/images/icons/trash-icon.webp" alt="delete row" height="15px"></button></td></tr><tr id="inputTable">
        </tr>
    </tbody></table>
    `;
    state.data = {
        2: {
            company: "asd",
            position: "",
            location: "",
            industry: "",
            status: "In Progress",
            ranking: "1",
            deadline: "",
        },
    };
    // console.log(state.data);
    expect(() => {
        // item.closest("tr");
        // functions.set('data', state.data)
        const input = { target: document.getElementById("2") };
        // TODO: right now this test is failing because it is trying to get the data from the html but we haven't put the form fields in the html
        // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

        functions.editButton(input);
    }).not.toThrow();
});

// test("Test editRow() correct row content", () => {
//     //functions.editRow();
//     //expect(functions.editRow).toHaveReturned();
//     //expect(functions.editRow).toThrow();

//     expect(() => {
//         functions.editRow();
//     }).not.toThrow();
// });
