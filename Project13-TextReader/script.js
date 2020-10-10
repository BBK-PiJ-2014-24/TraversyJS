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
const message = new SpeechSynthesisUtterance(); 

// Functions
// =========

function createBox(item) {
  const { image, text } = item;
  const box = document.createElement("div");
  box.classList.add("box");

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

function setTextMessage(text){
  message.text = text;
}

function speakText(){
  speechSynthesis.speak(message);
}


function getVoices() {
  voices = speechSynthesis.getVoices();
  voices.forEach((voice) => {
    const option = document.createElement("option");
    option.value = voice.name;
    option.innerText = `${voice.name} ${voice.lang}`;

    voiceSelectEl.appendChild(option);
  });
}

function setVoice(e){
  message.voice = voices.find(voice => voice.name === e.target.value);
}

// EventListener
// =============
toggleBtn.addEventListener("click", () => {
  document.getElementById("text-box").classList.toggle("show");
});

closeBtn.addEventListener("click", () => {
  document.getElementById("text-box").classList.remove("show");
});

speechSynthesis.addEventListener("voiceschanged", getVoices);

voiceSelectEl.addEventListener('change', setVoice);

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

getVoices();
