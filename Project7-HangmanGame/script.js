// Select Elements
// ===============
const wordEl = document.getElementById("word");
const wrongLettersEl = document.getElementById("wrong-letters");
const playAgainBtn = document.getElementById("play-button");
const popup = document.getElementById("popup-container");
const notification = document.getElementById("notification-container");
const finalMessage = document.getElementById("final-message");

const figureParts = document.querySelectorAll(".figure-part");

// Global Variables
// ================
const words = ["application", "programming", "interface", "wizard"];
let selectedWord = words[Math.floor(Math.random() * words.length)];

const correctLetters = []; // start game with empty arrays
const wrongLetters = [];

// EventListeners
// ===============

// Keyboard Input EventListener
// ---------------------------
// 1. check if key input is a letter
// 2. if letter is in word
//     a. Check if already tried
//     b. Add to Correct Letters Array
//     c. Display Letter
// 3. if letter is NOT in word
//     a. Add to Wrong Letters Array
//     b. update number of Wrong Letters and increase Hangman
window.addEventListener("keydown", (e) => {
  console.log(e.key);
  if (e.key >= "a" && e.key <= "z") {
    const letter = e.key;
    if (selectedWord.includes(letter)) {
      if (!correctLetters.includes(letter)) {
        correctLetters.push(letter);
        displayWord();
      } else {
        showWarningNotification();
      }
    } else {
      if (!wrongLetters.includes(letter)) {
        wrongLetters.push(letter);
        updateWrongLettersEl();
      } else {
        showWarningNotification();
      }
    }
  }
});

// Restart Play Button EventListner
// --------------------------------
playAgainBtn.addEventListener("click", () => {
  // Empty Arrays
  correctLetters.splice(0);
  wrongLetters.splice(0);
  // Select New RandomWord
  selectedWord = words[Math.floor(Math.random() * words.length)];

  displayWord(); // Display guess word on Screen

  updateWrongLettersEl();

  popup.style.display = "none"; // Remove popup with restart button
});
displayWord();

// Functions
// =========

// DisplayWord()
//  ------------
// 1. Take Guess word and split into letters
// 2. For each letter in guess word compare with letters in correctLetter Array
// 3. If letter is in, display HTML
// 4. Concaternate all display HTML elements with join()
// Concaternate array elements into a string
// 5. Remove the new lines from the concat string
// 6. Check if all the letters have been guessed -> display msg
function displayWord() {
  wordEl.innerHTML = `
    ${selectedWord
      .split("")
      .map(
        (letter) => `
          <span class="letter">
            ${correctLetters.includes(letter) ? letter : ""}
          </span>
    `
      )
      .join("")}`;

  const innerWord = wordEl.innerText.replace(/\n/g, "");
  console.log(innerWord);
  if (innerWord === selectedWord) {
    finalMessage.innerText = "Congratulations, Right Answer";
    popup.style.display = "flex";
  }
}

// updateWrongLettersEl()
// ----------------------
// 1. Display incorrect letter
// 2. Add Parts to Hangman
// 3. Check if run out of guesses

function updateWrongLettersEl() {
  //   if there are incorrect letters, add Wrong title to innerHTML, and for each letter add to list.
  wrongLettersEl.innerHTML = `
    ${wrongLetters.length > 0 ? "<p>Wrong</p>" : ""} 
    ${wrongLetters.map((letter) => `<span>${letter}</span>`)}
    `;

  // for each wrong letter, add a part to the hangman
  figureParts.forEach((part, index) => {
    const errors = wrongLetters.length; // calc the number of incorrect letters
    if (index < errors) {
      part.style.display = "block"; // display part
    } else {
      part.style.display = "none"; // do not display part
    }
  });

  //  Check if the number of wrong letters = total parts on hangman
  if (wrongLetters.length === figureParts.length) {
    finalMessage.innerText = "You Lost!";
    popup.style.display = "flex";
  }
}

// showWarningNotification()
// -------------------------
// Show a warning msg if repeat same letter
function showWarningNotification() {
  notification.classList.add("show"); // add show class to Notification element
  setTimeout(() => {
    notification.classList.remove("show"); // remove msg after 2sec
  }, 2000);
}
