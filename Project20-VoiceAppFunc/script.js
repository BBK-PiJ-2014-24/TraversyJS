// DOM ELEMENTS
// ============

const msgEl = document.getElementById('msg');

// GLOBAL VARIABLES
// ================
const randomNum = getRandomNumber();
console.log('RndNumber: ', randomNum);

window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

let recognition = new window.SpeechRecognition;

recognition.start();

// FUNCTIONS
// =========
function getRandomNumber(){
     return Math.floor(Math.random()*100) + 1;
}

function onSpeak(e){
    const msg = e.results[0][0].transcript;
    writeMessage(msg);
    // checkNumber(msg);
}

function writeMessage(msg){
    msgEl.innerHTML = `
    <div>You Said:</div>
      <span class="box">${msg}</span>
    `;

}

function checkNumber(msg){
    const num = +msg;
    if(Number.isNaN(num)){
        msgEl.innerHTML += `<div>Invalid Input</div>`;
        return;
    } 
    
    if(num > 100 || num < 1){
        msgEl.innerHTML += `<div>Invalid Number</div>`;
        return;
    } 
    
    if (num > randomNum){
        msg.innerHTML += `<div>Lower</div>`;
    } else if (num < randomNum){
        msg.innerHTML += `<div>Higher</div>`;
    } else {
        msg.innerHTML = `<h2>Correct!</h2>
        <button class="play-again" id="play-again">Play Again</button>`
    }

}

// EVENT LISTENERS
// ===============
recognition.addEventListener('result', onSpeak);
recognition.addEventListener('end', ()=>{recognition.start();} );

document.body.addEventListener('click', (e)=>{
    if(e.target.id === 'play-again'){
        window.location.reload();
    }
})