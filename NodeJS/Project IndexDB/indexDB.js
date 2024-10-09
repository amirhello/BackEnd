const emailAddress = document.getElementById("email");
const passwordSet = document.getElementById("password");
const show = document.getElementById("show");
const add = document.getElementById("add");
const table1 = document.querySelector(".table1 tbody");
const deleteButton = document.getElementById("delete");

const request = indexedDB.open("sample", 2);

// "db" is the variable that we use for making the database
let db;

// Error handling for the database
request.onerror = () => {
  console.log("we have some error");
};

// If there are no errors, this function runs and assigns the result to the "db" variable
request.onsuccess = () => {
  console.log("run successfully");
  db = request.result;
};

// This function runs when the database needs an upgrade (e.g., creating an object store)
request.onupgradeneeded = (e) => {
  let db = e.target.result;
  let objectStore = db.createObjectStore("sample", {
    keyPath: "id",
    autoIncrement: true,
  });
  objectStore.createIndex("email", "email", { unique: false });
  objectStore.createIndex("password", "password", { unique: false });
  console.log("database created");
};

function addData() {
  let newItem = {
    email: emailAddress.value,
    password: passwordSet.value,
  };
  let transaction = db.transaction(["sample"], "readwrite");
  let objectStore = transaction.objectStore("sample");
  let request = objectStore.add(newItem);
  request.onsuccess = () => {
    alert("Item added successfully");
    emailAddress.value = "";
    passwordSet.value = "";
  };
  transaction.oncomplete = () => {
    console.log("transaction completed");
  };
  transaction.onerror = () => {
    console.log("transaction error");
  };
}

function getData() {
  //   table1.innerHTML = "";

  let objectStore = db.transaction("sample").objectStore("sample");
  objectStore.openCursor().onsuccess = (event) => {
    let cursor = event.target.result; 
    if (cursor) {
      let row = document.createElement("tr");
      row.innerHTML = `
        <td>${cursor.value.id}</td>
        <td>${cursor.value.email}</td>
        <td>${cursor.value.password}</td>
      `;
      table1.appendChild(row); 
      cursor.continue(); // Continue to the next record if it exists
    }
  };
}

function deleteAllData() {
  let transaction = db.transaction(["sample"], "readwrite");
  let objectStore = transaction.objectStore("sample");

  let request = objectStore.clear();

  request.onsuccess = () => {
    alert("All data deleted successfully.");
    table1.innerHTML = "";
  };

  request.onerror = () => {
    console.log("Error deleting data.");
  };
}

deleteButton.addEventListener("click", deleteAllData);
add.addEventListener("click", addData);
show.addEventListener("click", getData);
