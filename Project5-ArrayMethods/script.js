const main = document.getElementById("main");
const addUserBtn = document.getElementById("add-user");
const doubleBtn = document.getElementById("double");
const showMillionairesBtn = document.getElementById("show-millionaires");
const sortBtn = document.getElementById("sort");
const calculateWealthBtn = document.getElementById("calculate-wealth");

let data = [];
getRandomUser();
getRandomUser();
getRandomUser();

// Event Listeners
// ---------------
addUserBtn.addEventListener("click", getRandomUser);
doubleBtn.addEventListener("click", doubleMoney);
sortBtn.addEventListener("click", sortData);
showMillionairesBtn.addEventListener("click", filterMillionaires);
calculateWealthBtn.addEventListener("click", totalWealth);

//Fetch user data from API
// -----------------------
async function getRandomUser() {
  const res = await fetch("https://randomuser.me/api");
  const data = await res.json();
  const user = data.results[0]; //key=results
  const newUser = {
    name: `${user.name.first} ${user.name.last}`,
    money: Math.floor(Math.random() * 1000000),
  };
  addData(newUser);
}

// Add user data to list
// ----------------------
function addData(obj) {
  console.log("hello");
  data.push(obj);
  updateDOM();
}

// Render List to DOM
// ------------------
function updateDOM(providedData = data) {
  // clear main div
  main.innerHTML = `<h2><strong>Person</strong> Wealth</h2>`;

  providedData.forEach((item) => {
    const element = document.createElement("div");
    element.classList.add("person");
    element.innerHTML = `<strong> ${item.name}</strong> ${formatMoney(
      item.money
    )}`;
    main.appendChild(element); // main is the parent element
  });
}

// Helper to Reformat Money
// ------------------------
function formatMoney(money) {
  return "$" + money.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,");
}

// Double Money
// ------------
function doubleMoney() {
  data = data.map((p) => {
    return { ...p, money: p.money * 2 }; // forEach person in data, return original person obj (a single item in list) and then double money attribute
  });
  updateDOM();
}

// Sort Data
// ---------
function sortData() {
  data = data.sort((x, y) => y.money - x.money);
  updateDOM();
}

// filterMillionaires
// ------------------
function filterMillionaires() {
  data = data.filter((p) => p.money > 1000000);
  sortData();
}

// Calculate Total Wealth
// ----------------------
function totalWealth() {
  let total = data.reduce((sum, p) => sum + p.money, 0);
  total = formatMoney(total);
  console.log(total);
  const totalWealthEl = document.createElement("div");
  totalWealthEl.innerHTML = `<h3><strong>Total Wealth:</strong>${total}</h3>`;
  main.appendChild(totalWealthEl);
}
