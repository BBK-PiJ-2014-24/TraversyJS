// DOM Elements
// ============
const balance = document.getElementById("balance");
const money_plus = document.getElementById("money-plus");
const money_minus = document.getElementById("money-minus");
const list = document.getElementById("list");
const form = document.getElementById("form");
const text = document.getElementById("text");
const amount = document.getElementById("amount");

// Global Variables LocalStorage and Dummy Data
// ============================================
// const dummyTransactions = [
//   { id: 1, text: "Flower", amount: -20 },
//   { id: 2, text: "Salary", amount: 300 },
//   { id: 3, text: "Book", amount: -10 },
//   { id: 4, text: "Camera", amount: 150 },
// ];

// Get Local Storage Transactions
const localStorageTransactions = JSON.parse(
  localStorage.getItem("transactions")
); // JSON.parse converts to obj and numberical attributes to numbers

// let transactions = LocalStored Transactions or if none create new array
let transactions =
  localStorage.getItem("transactions") !== null ? localStorageTransactions : [];

// EventListeners
// ==============
form.addEventListener("submit", addTransaction); // submit a transaction with addTransaction()

// Functions
// =========

// addTransaction(e) -attached to "Add Transaction" button
// -----------------
//1. Take User input and create a Transaction obj
//2. Add to transaction array and local storage
//3. Post to DOM
function addTransaction(e) {
  e.preventDefault();
  if (text.value.trim() === "" || amount.value.trim() === "") {
    alert("Add item and amount");
  } else {
    const transaction = {
      id: generateRandomID(),
      text: text.value,
      amount: +amount.value, // convert to string
    };
    transactions.push(transaction); // memory storage
    addTransactionDOM(transaction);
    updateAggregateValues();
    updateLocalStorage(); // local storage

    text.value = "";
    amount.value = "";
  }
}
// generateRandowmID()
// -------------------
function generateRandomID() {
  return Math.floor(Math.random() * 10000);
}

// addTransactionDOM(t)
// --------------------
// Take transaction obj and post it to the DOM
//  a. create element
//  b. add innerHTML
//  c. appendChild
function addTransactionDOM(transaction) {
  const sign = transaction.amount < 0 ? "-" : "+";

  const item = document.createElement("li");
  item.classList.add(transaction.amount < 0 ? "minus" : "plus");
  item.innerHTML = `
${transaction.text}<span>${sign}${Math.abs(
    transaction.amount
  )}</span><button class="delete-btn" onclick="removeTransaction(${
    transaction.id
  })">x</button>
`;

  list.appendChild(item);
}

// updateAggregateValues()
// -----------------------
// 1. collects the "amount" attribute from each transaction obj using map()
// 2. filter for +/-, reduce to sum
// 3. add to DOM the total, expense and income.
function updateAggregateValues() {
  const amounts = transactions.map((transaction) => transaction.amount);

  const total = amounts.reduce((acc, item) => (acc += item), 0).toFixed(2);

  const income = amounts
    .filter((item) => item > 0)
    .reduce((acc, item) => (acc += item), 0)
    .toFixed(2);

  const expense = amounts
    .filter((item) => item < 0)
    .reduce((acc, item) => (acc += item), 0)
    .toFixed(2);

  balance.innerText = `$${total}`;
  money_plus.innerText = `$${income}`;
  money_minus.innerText = `$${expense}`;

  console.log(expense);
}

// Update Local Storage
// --------------------
function updateLocalStorage() {
  localStorage.setItem("transactions", JSON.stringify(transactions));
}

// removeTransaction(id)
// ---------------------
// RemoveTransaction with click on delete-btn
function removeTransaction(id) {
  transactions = transactions.filter((t) => t.id !== id); // remove item from list
  updateLocalStorage(); // update the local storage
  init(); //refresh the page
}

// init() initialize/refresh the page
// ------
function init() {
  list.innerHTML = "";
  transactions.forEach(addTransactionDOM);
  updateAggregateValues();
}

init();
