// Define Elements in JS
const currencyEl_one = document.getElementById("currency-one");
const currencyEl_two = document.getElementById("currency-two");
const amount_one = document.getElementById("amount-one");
const amount_two = document.getElementById("amount-two");
const rateEl = document.getElementById("rate");
const swap = document.getElementById("swap");

// Event Listeners
currencyEl_one.addEventListener("change", calculate);
currencyEl_two.addEventListener("change", calculate);
amount_one.addEventListener("input", calculate); // fires off on input
amount_two.addEventListener("input", calculate);
swap.addEventListener("click", swapCurrency);

// Fetch xrates and update the DOM
function calculate() {
  const currency_one = currencyEl_one.value;
  const currency_two = currencyEl_two.value;

  fetch(`https://api.exchangeratesapi.io/latest/`)
    .then((res) => res.json()) // convert res obj to a json obj
    // data is now the json obj
    .then((data) => {
      let rate1 = 1.0;
      let rate2 = 1.0;
      console.log(data);
      if (currency_one !== "EUR") {
        rate1 = data.rates[currency_one];
      }
      if (currency_two !== "EUR") {
        rate2 = data.rates[currency_two];
      }
      console.log(rate1, rate2);
      const cross_rate = (rate2 / rate1).toFixed(4); // restrict to 4dp
      console.log(cross_rate);
      rateEl.innerText = `${currency_one}1 = ${currency_two}${cross_rate}`;
      amount_two.value = (amount_one.value * cross_rate).toFixed(2);
    });
}

function swapCurrency() {
  const temp = currencyEl_one.value;
  currencyEl_one.value = currencyEl_two.value;
  currencyEl_two.value = temp;
  calculate();
}
