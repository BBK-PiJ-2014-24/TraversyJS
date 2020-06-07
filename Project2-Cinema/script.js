const container = document.querySelector(".container");
const seats = document.querySelectorAll(".row .seat:not(.occupied)");
const count = document.getElementById("count");
const total = document.getElementById("total");
const movieSelect = document.getElementById("movie"); // dropdown selector menu
let ticketPrice = +movieSelect.value; // + converts to string

// Restore Local Stored Data
// --------------------------
restoreData();

// EventListeners
// --------------
// SEAT SELECT EVENT
// within the container, if click on a seat and it is not occupied
container.addEventListener("click", (e) => {
  if (
    e.target.classList.contains("seat") &&
    !e.target.classList.contains("occupied")
  ) {
    e.target.classList.toggle("selected"); // toggle add/remove class
  }
  updateSelectedCount();
});

// MOVIE SELECT EVENT
movieSelect.addEventListener("change", (e) => {
  ticketPrice = +e.target.value;
  storeMovieData(e.target.selectedIndex, e.target.value);
  updateSelectedCount();
});

// Handlers
// ---------

function updateSelectedCount() {
  const selectedSeats = document.querySelectorAll(".row .seat.selected"); //Generates a Node List
  // find the selected seats:
  // 1. take selected seats array
  // 2. for each selected seat find its index in total seats array
  const seatsIndex = [...selectedSeats].map((s) => [...seats].indexOf(s));

  // store seatsIndex into the inbuilt localStorage, using key:value format
  localStorage.setItem("selectedSeats", JSON.stringify(seatsIndex)); //storage must be string format

  const selectedSeatsCount = selectedSeats.length;
  count.innerText = selectedSeatsCount;
  total.innerText = selectedSeatsCount * ticketPrice;
}

// Save Data to Local Storage
function storeMovieData(movieIndex, moviePrice) {
  localStorage.setItem("selectedMovieIndex", movieIndex);
  localStorage.setItem("selectedMoviePrice", moviePrice);
}

// You must use old style notation if you want to call function ahead of initialization
function restoreData() {
  const selectedSeats = JSON.parse(localStorage.getItem("selectedSeats")); // JSON.parse reverses JSON.Stringify
  if (selectedSeats !== null && selectedSeats.length > 0) {
    seats.forEach((seat, index) => {
      if (selectedSeats.indexOf(index) > -1) {
        seat.classList.add("selected");
      }
    });
  }
  const selectedMovieIndex = localStorage.getItem("selectedMovieIndex");
  if (selectedMovieIndex !== null) {
    movieSelect.selectedIndex = selectedMovieIndex;
  }
}

updateSelectedCount();
