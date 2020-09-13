const container = document.querySelector(".container");
const seats = document.querySelectorAll(".row .seat:not(.occupied)");
const count = document.getElementById("count");
const total = document.getElementById("total");
const movieSelect = document.getElementById("movie"); // dropdown selector menu
let ticketPrice = +movieSelect.value; // + converts to string

// Restore Local Stored Data
// --------------------------
restoreData(); // function located at the bottom

// EventListeners
// --------------
// SEAT SELECT EVENT(on the container object)
// within the container, if click on a seat and it is not occupied
// the click bubbles upto the container element
container.addEventListener("click", (e) => {
  if (
    e.target.classList.contains("seat") &&
    !e.target.classList.contains("occupied")
  ) {
    e.target.classList.toggle("selected"); // toggle add/remove class
  }
  updateSelectedCount();
});

// MOVIE SELECT EVENT(on the movie dropdown element)
movieSelect.addEventListener("change", (e) => {
  ticketPrice = +e.target.value; // + converts value to string, global variable
  storeMovieData(e.target.selectedIndex, e.target.value);
  updateSelectedCount();
});

// Handlers
// ---------
// Update seat count and display
function updateSelectedCount() {
  // find the selected seats:
  // 1. take selected seats array
  const selectedSeats = document.querySelectorAll(".row .seat.selected"); //Generates a Node List
  // 2. for each selected seat find its index in total seats array
  const seatsIndex = [...selectedSeats].map((s) => [...seats].indexOf(s));
  // 3.store seatsIndex into the inbuilt localStorage, using key:value format
  localStorage.setItem("selectedSeats", JSON.stringify(seatsIndex)); //storage must be string format
  // 4. Count number of seats
  const selectedSeatsCount = selectedSeats.length;
  // 5. Display the seat count and total cost
  count.innerText = selectedSeatsCount;
  total.innerText = selectedSeatsCount * ticketPrice;
}

// Save Chosen Movie Title and Price Data to Local Storage
function storeMovieData(movieIndex, moviePrice) {
  localStorage.setItem("selectedMovieIndex", movieIndex);
  localStorage.setItem("selectedMoviePrice", moviePrice);
}

// You must use old style notation if you want to call function ahead of initialization
function restoreData() {
  const selectedSeats = JSON.parse(localStorage.getItem("selectedSeats")); // JSON.parse reverses JSON.Stringify
  if (selectedSeats !== null && selectedSeats.length > 0) {
    seats.forEach((seat, index) => {
      // -1 means that the item is not in the index
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
