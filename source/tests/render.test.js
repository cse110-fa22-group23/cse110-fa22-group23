/* eslint-env jest */
// render.test.js

test("Test openForm()", () => {
    document.body.innerHTML = `
        <div id="myEntry"></div>
    `;
    const { openForm } = require("../assets/js/index");

    openForm();

    const myEntryEl = document.getElementById("myEntry");

    expect(myEntryEl.style.display).toBe("block");
});

test("Test openForm()", () => {
    document.body.innerHTML = `
        <div id="myEntry"></div>
    `;
    const { closeForm } = require("../assets/js/index");

    closeForm();

    const myEntryEl = document.getElementById("myEntry");

    expect(myEntryEl.style.display).toBe("none");
});
