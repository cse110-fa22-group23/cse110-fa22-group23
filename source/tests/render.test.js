/* eslint-env jest */
// render.test.js

test("Test openForm()", () => {
    document.body.innerHTML = `
        <div id="form-modal"></div>
    `;
    const { openForm } = require("../assets/js/index");

    openForm();

    const myEntryEl = document.getElementById("form-modal");

    expect(myEntryEl.style.display).toBe("block");
});

test("Test openForm()", () => {
    document.body.innerHTML = `
        <div id="form-modal"></div>
    `;
    const { closeForm } = require("../assets/js/index");

    closeForm();

    const myEntryEl = document.getElementById("form-modal");

    expect(myEntryEl.style.display).toBe("none");
});

test("Test addEntry()", () => {
    document.body.innerHTML = `
        <table id="spreadsheet"><tr></tr></table>
    `;
    const entry = JSON.parse(
        '{"company":"","position":"","location":"","industry":"","status":"In Progress","ranking":"1 star","deadline":""}'
    );
    const table = document.getElementById("spreadsheet");
    const { addEntry } = require("../assets/js/index");

    // assert row is added every time
    for (let count = 1; count < 10; count++) {
        addEntry(entry);
        var x = table.rows.length;
        expect(x).toBe(count + 1);
    }
});
