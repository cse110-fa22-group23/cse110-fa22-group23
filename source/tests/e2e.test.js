/* eslint-env jest */

// e2e.test.js

describe("Basic user flow for Website", () => {
    // load website
    beforeAll(async () => {
        await page.goto("http://127.0.0.1:5500/source/index.html");
    });

    it("Initial Home Page - has 1 row (header)", async () => {
        const numRows = await page.$$eval("tr", (rows) => {
            return rows.length;
        });
        expect(numRows).toBe(1);
    }, 500);

    it("Initial Home Page - Add Rows", async () => {
        console.log("Checking if it adds 1 row...");
        let button = await page.$("#createBtn");
        await button.click();
        // Type into form
        await page.type("#company", "Epic cool company");
        await page.type("#position", "Epic cool position");
        await page.select("#location", "Remote");
        await page.type("#industry", "Epic cool industry");
        await page.select("#status", "Applied");
        await page.select("#ranking", "5");
        await page.type("#deadline", "01012022");

        button = await page.$("#addRow");
        await button.click();

        const numRows = await page.$$eval("tr", (rows) => {
            return rows.length;
        });
        expect(numRows).toBe(2);
    }, 5000);

    it("Add 10 rows", async () => {
        const statuses = {
            0: "In Progress",
            1: "Applied",
            2: "Not Started",
        };

        const locations = {
            0: "Remote",
            1: "Northeast",
            2: "Southwest",
            3: "West",
            4: "Southeast",
            5: "Midwest",
        };

        // ddmmyyyy
        const dates = {
            0: "02012022",
            1: "01112022",
            2: "04102022",
            3: "05042022",
            4: "06032022",
            5: "07062022",
            6: "08032022",
            7: "05152022",
            8: "10062022",
            9: "02282022",
        };

        for (let i = 1; i < 11; i++) {
            let button = await page.$("#createBtn");
            await button.click();
            // Type into form
            await page.type("#company", "Epic cool company " + i);
            await page.type("#position", "Epic cool position " + i);
            await page.select("#location", locations[i % 6]);
            await page.type("#industry", "Epic cool industry " + i);
            await page.select("#status", statuses[i % 3]);
            await page.select("#ranking", String(i % 5));
            await page.type("#deadline", dates[i % 10]);

            button = await page.$("#addRow");
            await button.click();

            const numRows = await page.$$eval("tr", (rows) => {
                return rows.length;
            });
            expect(numRows).toBe(i + 2); // rows from prev tests
        }
    }, 5000);

    it("reload", async () => {
        await page.reload();

        let rows = await page.$$("tr");
        let numRows = rows.length;
        expect(numRows).toBe(12);

        const statuses = {
            0: "In Progress",
            1: "Applied",
            2: "Not Started",
        };

        const locations = {
            0: "Remote",
            1: "Northeast",
            2: "Southwest",
            3: "West",
            4: "Southeast",
            5: "Midwest",
        };

        // ddmmyyyy
        const dates = {
            0: "02012022",
            1: "01112022",
            2: "04102022",
            3: "05042022",
            4: "06032022",
            5: "07062022",
            6: "08032022",
            7: "05152022",
            8: "10062022",
            9: "02282022",
        };

        numRows -= 1; // ignore item added by add 1 test
        for (let i = 1; i < numRows; i++) {
            let company = await rows[numRows - i].$eval(
                ".company_name",
                (element) => {
                    return element.innerHTML;
                }
            );
            let position = await rows[numRows - i].$eval(
                ".position_name",
                (element) => {
                    return element.innerHTML;
                }
            );
            let location = await rows[numRows - i].$eval(
                ".location_name",
                (element) => {
                    return element.innerHTML;
                }
            );
            let industry = await rows[numRows - i].$eval(
                ".industry_name",
                (element) => {
                    return element.innerHTML;
                }
            );
            let status = await rows[numRows - i].$eval(".status", (element) => {
                return element.innerHTML;
            });
            let ranking = await rows[numRows - i].$eval(
                ".ranking_value",
                (element) => {
                    return element.innerHTML;
                }
            );
            let deadline = await rows[numRows - i].$eval(
                ".deadline_date",
                (element) => {
                    return element.innerHTML;
                }
            );

            expect(company).toBe("Epic cool company " + i);
            expect(position).toBe("Epic cool position " + i);
            expect(location).toBe(locations[i % 6]);
            expect(industry).toBe("Epic cool industry " + i);
            expect(status).toContain(statuses[i % 3]);
            expect(ranking).toContain(String(i % 5));
            // reformat date format
            deadline =
                deadline.slice(5, 7) +
                deadline.slice(8, 10) +
                deadline.slice(0, 4);
            expect(deadline).toBe(dates[i % 10]);
        }
    }, 5000);

    // Check to make sure that the localStorage is what you expect
    it("Checking the localStorage to make sure sheet is empty", async () => {
        const deleteButtons = await page.$$('button[class*="deleteBtn"]');

        for (const button of deleteButtons) {
            await button.click();

            const confirmDelete = await page.$("#deleteButton");
            await confirmDelete.click();
        }
        // deleted all the rows
        const numRows = await page.$$eval("tr", (rows) => {
            return rows.length;
        });
        expect(numRows).toBe(1);

        // spreadsheet should be empty
        let table = await page.evaluate(() =>
            localStorage.getItem("SpreadSheet")
        );
        expect(table).toBe("{}");
        let counter = await page.evaluate(() =>
            localStorage.getItem("counter")
        );
        expect(counter > 10).toBe(true);
    }, 5000);

    it("Test to see if Add Rows adds rows in local storage", async () => {
        for (let i = 0; i < 2; i++) {
            let button = await page.$("#createBtn");
            await button.click();
            // Type into form
            await page.type("#company", "Epic cool company");
            await page.type("#position", "Epic cool position");
            await page.select("#location", "Remote");
            await page.type("#industry", "Epic cool industry");
            await page.select("#status", "Applied");
            await page.select("#ranking", "5");
            await page.type("#deadline", "01012022");

            button = await page.$("#addRow");
            await button.click();
        }

        const numRows = await page.$$eval("tr", (rows) => {
            return rows.length;
        });
        expect(numRows).toBe(3);

        let table = await page.evaluate(() =>
            localStorage.getItem("SpreadSheet")
        );
        table = JSON.parse(table);
        let expected = JSON.parse(
            '{"12": {"company": "Epic cool company", "position": "Epic cool position", "location": "Remote", "industry": "Epic cool industry", "status": "Applied", "ranking": "5", "deadline": "2022&#45;01&#45;01"}, "13": {"company": "Epic cool company", "position": "Epic cool position", "location": "Remote", "industry": "Epic cool industry", "status": "Applied", "ranking": "5", "deadline": "2022&#45;01&#45;01"}}'
        );
        expect(table).toStrictEqual(expected);
        let counter = await page.evaluate(() =>
            localStorage.getItem("counter")
        );
        expect(counter > 10).toBe(true);
    }, 5000);

    it("Edit rows in table should change data", async () => {
        const editButtons = await page.$$('button[class*="editBtn"]');

        for (let i = 1; i <= editButtons.length; i++) {
            await editButtons[i - 1].click();

            // type into edit form
            await page.type("#companyEdit", " " + String(i));
            await page.type("#positionEdit", " " + i);
            await page.select("#locationEdit", "Southwest");
            await page.type("#industryEdit", " " + i);
            await page.select("#statusEdit", "In Progress");
            await page.select("#rankingEdit", String(i));
            await page.type("#deadlineEdit", "01012022");

            const editButton = await page.$("#editRow");
            // wait for localstorage
            await page.waitForTimeout(200);
            await editButton.click();
        }
        let table = await page.evaluate(() =>
            localStorage.getItem("SpreadSheet")
        );
        table = JSON.parse(table);
        // check data actually changed in table and state and local storage
        let expected = JSON.parse(
            '{"13": {"company": "Epic cool company 1", "position": "Epic cool position 1", "location": "Southwest", "industry": "Epic cool industry 1", "status": "In Progress", "ranking": "1", "deadline": "2022&#45;01&#45;01"}, "12": {"company": "Epic cool company 2", "position": "Epic cool position 2", "location": "Southwest", "industry": "Epic cool industry 2", "status": "In Progress", "ranking": "2", "deadline": "2022&#45;01&#45;01"}}'
        );
        expect(table).toStrictEqual(expected);
        // spreadsheet should stay the same otherwise
        const numRows = await page.$$eval("tr", (rows) => {
            return rows.length;
        });
        expect(numRows).toBe(3);
    }, 5000);
});
