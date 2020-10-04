// DOM ELEMENTS
// ============

const word = document.getElementById("word");
const text = document.getElementById("text");
const scoreEl = document.getElementById("score");
const timeEl = document.getElementById("time");
const endgameEl = document.getElementById("end-game-container");
const settingsBtn = document.getElementById("settings-btn");
const settings = document.getElementById("settings");
const settingsForm = document.getElementById("settings-form");
const difficultySelect = document.getElementById("difficulty");

// Dummy Word Array
// ================
const words = [
  "sigh",
  "tense",
  "airplane",
  "ball",
  "pies",
  "juice",
  "warlike",
  "bad",
  "north",
  "dependent",
  "steer",
  "silver",
  "highfalutin",
  "superficial",
  "quince",
  "eight",
  "feeble",
  "admit",
  "drag",
  "loving",
];

// Global Variables & Initializations
// ==================================
let randomWord; // Init word

let score = 0; // Init score

let time = 10; // Init time

// difficulty setting variable
let difficulty =
  localStorage.getItem("difficulty") !== null
    ? localStorage.getItem("difficulty")
    : "medium";

// difficulty value in the DOM
difficultySelect.value =
  localStorage.getItem("difficulty") !== null
    ? localStorage.getItem("difficulty")
    : "medium";

text.focus(); // Put the Cursor automatically in the input at the start of the game

const timeInterval = setInterval(updateGameTime, 1000); // calls updateGameTime() every sec

// FUNCTIONS
// =========

// updateGameTime() - called in setInterval() sets the game time
// ----------------
function updateGameTime() {
  time--; // global variable
  timeEl.innerHTML = time + "s";
  if (time === 0) {
    clearInterval(timeInterval); // Cancels setInterval
    gameOver();
  }
}

// gameOver() - displays game over window
// ----------
function gameOver() {
  endgameEl.innerHTML = `
<h1>Time Run out </h1>
<p>Your Final Score ${score}</p>
<button onclick="location.reload()">Reload</button>
`;
  endgameEl.style.display = "flex"; //Reveals the Game Over display
}

// getRandomWord() - gets random word from array
// ----------------
function getRandomWord() {
  return words[Math.floor(Math.random() * words.length)];
}

// addWordToDOM() - Dynamically adds random word to DOM
// --------------
function addWordToDOM() {
  randomWord = getRandomWord();
  word.innerHTML = randomWord;
}
addWordToDOM(); // execute

// updateScore() - updates and displays score
// -------------
function updateScore() {
  score++;
  scoreEl.innerHTML = score;
}

// EventListener
// =============

// Check Word Input - if correct inputed, then update score and time and add new word
// ----------------
text.addEventListener("input", (e) => {
  const insertedText = e.target.value;
  if (insertedText === randomWord) {
    e.target.value = "";
    addWordToDOM();
    updateScore();
    if (difficulty === "hard") {
      time += 2;
    } else if (difficulty === "medium") {
      time += 3;
    } else {
      time += 5;
    }
    updateGameTime();
  }
});

// Settings Button - Option to hide the Difficulty Setting from DOM
// ---------------
settingsBtn.addEventListener("click", () => {
  settings.classList.toggle("hide");
});

// Set Difficulty Setting - including updating local storage
// ----------------------
settingsForm.addEventListener("change", (e) => {
  difficulty = e.target.value;
  localStorage.setItem("difficulty", difficulty);
});
