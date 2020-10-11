// Dom Elements
// ============
const mainTag = document.querySelector("main");
const voiceSelectEl = document.getElementById("voices");
const textarea = document.getElementById("text");
const readBtn = document.getElementById("read");
const toggleBtn = document.getElementById("toggle");
const closeBtn = document.getElementById("close");

// Global Variables & Initializations
// ===================================

let voices = [];
const speechObj = new SpeechSynthesisUtterance(); // instantiate speech object 

// Functions
// =========

// createBox() - called on each obj within the Data array
// -----------
// 1. Create div element for photo container in grid
// 2. Add classlists 
// 3. Add innerHTML for img and text
// 4. Attach an eventListener so that when clicked it will launch speech 
// 5. Add photo to grid container
function createBox(item) {
  const { image, text } = item;
  const box = document.createElement("div"); // create div element for photos in grig
  box.classList.add("box");  //add 
  box.innerHTML = `
    <img src='${image}' alt='${text}' /> 
    <p class='info'>${text}</p>
  `;
  box.addEventListener('click', ()=> {
    setTextMessage(text);
    speakText();
    box.classList.add('active');
    setTimeout(()=>{
      box.classList.remove('active');
    },800);
  });
  mainTag.append(box);
}

 // setTextMessage() - Passes inputed text to the speechObj 
  function setTextMessage(text){
    speechObj.text = text;
  }
  
  // speakText() -- Calls static method to speak inputed Text with speecgObj
  function speakText(){
    speechSynthesis.speak(speechObj);
  }
  
// getVoices() - Gets list of speaking voices and puts in option list 
// -----------
  function getVoices() {
    voices = speechSynthesis.getVoices(); // get array of speaking voices from speechSynethesis
    voices.forEach((voice) => {
      const option = document.createElement("option");  // create option element
      option.value = voice.name; // impart value to option tag
      option.innerText = `${voice.name} - ${voice.lang}`; // Add Text for Option
      voiceSelectEl.appendChild(option); // Add option to VoiceSelect Element
    });
  }
  getVoices(); // automatically called
  
  // setVoice(e) - EventListener Fn to set the selected voice for the speechObj
  // -----------
  function setVoice(e){
    speechObj.voice = voices.find(voice => voice.name === e.target.value);
  }
  
// EventListener
// =============
// dropsdown text box
toggleBtn.addEventListener("click", () => {
  document.getElementById("text-box").classList.toggle("show");
});

// close text box
closeBtn.addEventListener("click", () => {
  document.getElementById("text-box").classList.remove("show");
});

speechSynthesis.addEventListener("voiceschanged", getVoices);

// select voice
voiceSelectEl.addEventListener('change', setVoice);

// read out text from textbox
readBtn.addEventListener('click',()=>{
  setTextMessage(textarea.value); 
  speakText();
});

// DATA
// ====
const data = [
  {
    image: "./img/drink.jpg",
    text: "I'm Thirsty",
  },
  {
    image: "./img/food.jpg",
    text: "I'm Hungry",
  },
  {
    image: "./img/tired.jpg",
    text: "I'm Tired",
  },
  {
    image: "./img/hurt.jpg",
    text: "I'm Hurt",
  },
  {
    image: "./img/happy.jpg",
    text: "I'm Happy",
  },
  {
    image: "./img/angry.jpg",
    text: "I'm Angry",
  },
  {
    image: "./img/sad.jpg",
    text: "I'm Sad",
  },
  {
    image: "./img/scared.jpg",
    text: "I'm Scared",
  },
  {
    image: "./img/outside.jpg",
    text: "I Want To Go Outside",
  },
  {
    image: "./img/home.jpg",
    text: "I Want To Go Home",
  },
  {
    image: "./img/school.jpg",
    text: "I Want To Go To School",
  },
  {
    image: "./img/grandma.jpg",
    text: "I Want To Go To Grandmas",
  },
];

data.forEach(createBox);

