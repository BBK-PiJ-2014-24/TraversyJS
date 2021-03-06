// DOM ELEMENTS
// ============
const days = document.getElementById('days');
const hours = document.getElementById('hours');
const minutes = document.getElementById('minutes');
const seconds = document.getElementById('seconds');
const countdown = document.getElementById('countdown');
const newyearEl = document.getElementById('year');
const loading = document.getElementById('loading');

// GLOBAL VARIABLES
// ================
const currentYear = new Date().getFullYear();

const newYearTime = new Date(`January 01 ${currentYear+1} 00:00:00`);

newyearEl.innerText = currentYear + 1;

// FUNCTIONS
// =========

// updateCountdown() - Create countdown, hook up to DOM
// -----------------
function updateCountdown(){

  const currentTime = new Date();
  const diff = newYearTime - currentTime;
  const d = Math.floor(diff/1000/60/60/24);
  const h = Math.floor(diff/1000/60/60)%24;
  const m = Math.floor(diff/1000/60)%60;
  const s = Math.floor(diff/1000)%60;

  days.innerText = d;
  hours.innerText= h < 10 ? '0'+ h : h;  
  minutes.innerText= m < 10 ? '0'+ m : m;  
  seconds.innerText= s < 10 ? '0'+ s : s;  

}
// Loading Spinner - lasting 1min
// ---------------
setTimeout(()=>{
    loading.remove(); // remove spinning gif
    countdown.style.display='flex'; // reveal countdown display
},1000);

// Start timer
// -----------
setInterval(updateCountdown, 1000);