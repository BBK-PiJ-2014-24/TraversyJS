// DOM ELEMENTS
// ============ 
const container = document.getElementById('container');
const text = document.getElementById('text');

// GLOBAL VARIABLES
// ================
const totalTime = 7500;
const breatheTime = totalTime*(2/5);
const holdTime = totalTime/5;

// Functions
// =========

function breathAnimation(){
    text.innerText='Breathe In';
    container.className = 'container grow';
    setTimeout(()=>{
        text.innerText='Hold';
        setTimeout(()=>{
            text.innerText='Breathe Out';
            container.className ='container shrink';
        },holdTime);
    }, breatheTime);
}

setInterval(breathAnimation, totalTime);