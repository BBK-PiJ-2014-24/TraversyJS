const container = document.querySelector(".container");
const seats = document.querySelectorAll(".row .seat:not(.occupied)");
const count = document.getElementById("count");
const total = document.getElementById("total");
const movieSelect = document.getElementById("movie"); // dropdown selector menu
let ticketPrice = +movieSelect.value; // + converts to string

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
  updateSelectedCount();
});

// Handlers
// ---------

const updateSelectedCount = () => {
  const selectedSeats = document.querySelectorAll(".row .seat.selected"); //Generates a Node List
  const selectedSeatsCount = selectedSeats.length;
  count.innerText = selectedSeatsCount;
  total.innerText = selectedSeatsCount * ticketPrice;
};
