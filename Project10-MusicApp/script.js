// DOM ELEMENTS
// ============
const musicContainer = document.getElementById('music-container');
const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');

const audio = document.getElementById('audio');
const progress = document.getElementById('progress');
const progressContainer = document.getElementById('progress-container');
const title = document.getElementById('title');
const cover = document.getElementById('cover');

// GLOBAL VARIABLES
// ================
const songs = ['hey', 'summer', 'ukulele'];
let songIndex = 1;
loadSong(songs[songIndex]);


// FUNCTIONS
// =========
function loadSong(song){
    title.innerText = song;
    audio.src=`music/${song}.mp3`
    cover.src=`images/${song}.jpg`
}

function playSong(){
    musicContainer.classList.add('play');
    playBtn.querySelector('i.fas').classList.remove('fa-play');
    playBtn.querySelector('i.fas').classList.add('fa-pause');
    audio.play();
}

function pauseSong(){
    musicContainer.classList.remove('play');
    playBtn.querySelector('i.fas').classList.remove('fa-pause');
    playBtn.querySelector('i.fas').classList.add('fa-play');
    audio.pause();
}

function prevSong(){
    songIndex--;
    if(songIndex <0){
        songIndex=songs.length -1;
    }
    loadSong(songs[songIndex]);
    playSong();
}

function nextSong(){
    console.log('hello');
    songIndex++;
    if(songIndex >  songs.length -1 ){
        songIndex=0;
    }
    loadSong(songs[songIndex]);
    playSong();
}


// EVENT LISTENERS
// ===============
playBtn.addEventListener('click', ()=>{
    const isPlaying = musicContainer.classList.contains('play');
    if(isPlaying){
        pauseSong();
    } else {
        playSong();
    }
});

prevBtn.addEventListener('click',prevSong);
nextBtn.addEventListener('click',nextSong);

