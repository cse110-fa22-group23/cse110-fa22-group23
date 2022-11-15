# Plans for data storage schema

As per our previous ADR, we are using local storage to locally store application data.

As we start implementation, all data passing and storage MUST adhere to this schema. The idea is we have a JobApplication object to clump all the fields of metadata for a singular application. I do not think this needs to be a formal class.

```js
JobApplication {
	companyName = ""
	applicationDate = ""
	...
}
```

When we add() a new item or mutate data it should always be in this same format for consistency. We save this array of JobApplication to localstorage. When loading page we render using this pseudocode:

```js
const appdata = JSON.parse(localStorage.getItem('tabledata'));
tableHTMLpartial = ""
// for each item:
tableHTMLpartial.append(`<tr>
			*all the data fields*
			</tr>`);
```

For adding and deleting rows we can just use `table.insertRow(0);` and add the cell data innerHTML. For editing, we just have to get the row id and edit the cell innerHTML.

