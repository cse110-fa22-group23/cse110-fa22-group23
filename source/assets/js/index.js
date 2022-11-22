window.addEventListener("DOMContentLoaded", init);
var data = [];

/**
 * Callback function to run when DOM is loaded. Loads and renders data from localStorage.
 * @return 0 (int)
 */
function init() {
  // load data from localStorage if it exists
  if (!(localStorage.getItem("SpreadSheet") === null)) {
    var loadedData = window.localStorage.getItem("SpreadSheet");
    loadedData = JSON.parse(loadedData);
    loadedData.forEach(addEntry);

    data = loadedData;
    console.log(loadedData);
  }
  return 0;
}

/**
 * Makes the form modal visible on the page.
 */
function openForm() {
  document.getElementById("form-modal").style.display = "block";
}

/**
 * Makes the form modal no longer visible on the page.
 */
function closeForm() {
  document.getElementById("form-modal").style.display = "none";
}

window.addEventListener("click", function (e) {
  if (e.target == document.getElementById("form-modal")) {
    closeForm();
  }
});

/**
 * Appends form data (from the modal) to a corresponding entry in the table.
 */
function addRow() {
  event.preventDefault();
  var table = document.getElementById("spreadsheet");
  var row = table.insertRow(1);
  var company1 = row.insertCell(0);
  company1.setAttribute("class", "company_name");
  var position1 = row.insertCell(1);
  position1.setAttribute("class", "position_name");
  var location1 = row.insertCell(2);
  location1.setAttribute("class", "location_name");
  var industry1 = row.insertCell(3);
  industry1.setAttribute("class", "industry_name");
  var status1 = row.insertCell(4);
  status1.setAttribute("class", "status_name");
  var ranking1 = row.insertCell(5);
  ranking1.setAttribute("class", "ranking_value");
  var deadline1 = row.insertCell(6);
  deadline1.setAttribute("class", "deadline_date");
  company1.innerHTML = document.getElementById("company").value;
  position1.innerHTML = document.getElementById("position").value;
  location1.innerHTML = document.getElementById("location").value;
  industry1.innerHTML = document.getElementById("industry").value;
  status1.innerHTML = document.getElementById("status").value;
  if (status1.innerHTML == "Applied") {
    status1.setAttribute("class", "applied");
  } else if (status1.innerHTML == "In Progress") {
    status1.setAttribute("class", "in_progress");
  } else if (status1.innerHTML == "Not Started") {
    status1.setAttribute("class", "not_started");
  }
  let rank = document.getElementById("ranking").value;
  switch (rank) {
    case "1 star":
      ranking1.innerHTML = "<img src=./assets/images/1s.PNG height=60px>";
      break;
    case "2 stars":
      ranking1.innerHTML = "<img src=./assets/images/2s.PNG height=60px>";
      break;
    case "3 stars":
      ranking1.innerHTML = "<img src=./assets/images/3s.PNG height=60px>";
      break;
    case "4 stars":
      ranking1.innerHTML = "<img src=./assets/images/4s.PNG height=60px>";
      break;
    default:
      ranking1.innerHTML = "<img src=./assets/images/5s.PNG height=60px>";
  }
  deadline1.innerHTML = document.getElementById("deadline").value;
  closeForm();
  save_data();
}

/**
 * Appends form data (from the modal) to a corresponding entry in the table.
 * @param entry a dictionary of a job application data
 */
function addEntry(entry) {
  var table = document.getElementById("spreadsheet");
  var row = table.insertRow(1);
  var company1 = row.insertCell(0);
  var position1 = row.insertCell(1);
  var location1 = row.insertCell(2);
  var industry1 = row.insertCell(3);
  var status1 = row.insertCell(4);
  var ranking1 = row.insertCell(5);
  var deadline1 = row.insertCell(6);
  company1.innerHTML = entry["company1"];
  position1.innerHTML = entry["position1"];
  location1.innerHTML = entry["location1"];
  industry1.innerHTML = entry["industry1"];
  status1.innerHTML = entry["status1"];

  switch (entry["ranking1"]) {
    case "1 star":
      ranking1.innerHTML = "<img src=./assets/images/1s.PNG height=60px>";
      break;
    case "2 stars":
      ranking1.innerHTML = "<img src=./assets/images/2s.PNG height=60px>";
      break;
    case "3 stars":
      ranking1.innerHTML = "<img src=./assets/images/3s.PNG height=60px>";
      break;
    case "4 stars":
      ranking1.innerHTML = "<img src=./assets/images/4s.PNG height=60px>";
      break;
    default:
      ranking1.innerHTML = "<img src=./assets/images/5s.PNG height=60px>";
  }
  deadline1.innerHTML = entry["deadline1"];
}

/**
 * Saves form data (from the modal) to local storage.
 */
function save_data() {
  data.push({
    company1: document.getElementById("company").value,
    position1: document.getElementById("position").value,
    location1: document.getElementById("location").value,
    industry1: document.getElementById("industry").value,
    status1: document.getElementById("status").value,
    ranking1: document.getElementById("ranking").value,
    deadline1: document.getElementById("deadline").value,
  });
  window.localStorage.setItem("SpreadSheet", JSON.stringify(data));
  //  show_data(data);
}
/**
function show_data(data){
    var arr = data;
    get_data(arr);
    var table = document.getElementById("spreadsheet");
    for(i = 0; i <= arr.length; i++){

        var row = table.insertRow(1);
        var company1 = row.insertCell(0);
        var position1 = row.insertCell(1);
        var location1 = row.insertCell(2);
        var industry1 = row.insertCell(3);
        var status1 = row.insertCell(4);
        var ranking1 = row.insertCell(5);
        var deadline1 = row.insertCell(6);
        company1.innerHTML = arr[i].company1;
        position1.innerHTML = arr[i].position1;
        location1.innerHTML = arr[i].location1;
        industry1.innerHTML = arr[i].industry1;
        status1.innerHTML = arr[i].status1;
        ranking1.innerHTML = arr[i].ranking1;
        deadline1.innerHTML = arr[i].deadline1;
    }

}

function get_data(data){
    var str = localStorage.getItem("SpreadSheet");
    if(str != null){
        data = JSON.parse(str);
    }
}
*/
//document.getElementById("myEntry").onclick = openForm();
//document.getElementById("myEntry").onclick = openForm()

// To be used in tests
module.exports = { init, openForm, closeForm, addRow, save_data, addEntry };
