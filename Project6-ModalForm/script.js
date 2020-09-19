// Select Elements
const toggle = document.getElementById("toggle"); // Hambuger Button
const close = document.getElementById("close");
const open = document.getElementById("open"); // On Sign Up Button
const modal = document.getElementById("modal");

// Toggle NavBar
// -------------
// The 'show-nav' class is attached to the body element, which is the parent.
toggle.addEventListener("click", () => {
  document.body.classList.toggle("show-nav");
});

// Show Modal
// ----------
open.addEventListener("click", () => {
  modal.classList.add("show-modal");
});

// Close Modal
// -----------
close.addEventListener("click", () => {
  modal.classList.remove("show-modal");
});
