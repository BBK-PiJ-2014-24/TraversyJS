// Select Elements
// ---------------
const wordEl = document.getElementById("word");
const wrongLettersEl = document.getElementById("wrong-letters");
const playAgainBtn = document.getElementById("play-again");
const popup = document.getElementById("popup-container");
const notification = document.getElementById("notification-container");
const finalMessage = document.getElementById("final-message");

const figureParts = document.querySelectorAll(".figure-part");

// Global Variables
//  ---------------

const words = ["application", "programming", "interface", "wizard"];
let selectedWord = words[Math.floor(Math.random() * words.length)];

const correctLetters = ["w", "i", "z", "a", "r", "d"];
const wrongLetters = [];

// Functions
//  --------
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

displayWord();
