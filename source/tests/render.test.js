/* eslint-env jest */
// render.test.js

test("Simple DOM test", () => {
    document.body.innerHTML = `
        <h1 id="title">Team 23 Application</h1>
    `;
    require("../assets/js/index");

    const titleHeader = document.getElementById("title");

    titleHeader.value = "Value changed";

    expect(titleHeader.value).toBe("Value changed");
});
