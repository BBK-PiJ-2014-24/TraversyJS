const video = document.getElementById("video");
const play = document.getElementById("play");
const stopp = document.getElementById("stop");
const progress = document.getElementById("progress");
const timestamp = document.getElementById("timestamp");

// Event Handlers
//---------------
video.addEventListener("click", toggleVideoStatus);
video.addEventListener("pause", updatePlayIcon);
video.addEventListener("play", updatePlayIcon);
video.addEventListener("timeupdate", updateProgess);

play.addEventListener("click", toggleVideoStatus);
stopp.addEventListener("click", stopVideo);

progress.addEventListener("change", setVideoProgress);

// Play and Pause video
function toggleVideoStatus() {
  console.log("Im in func");
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
}

// update play/pause icon
function updatePlayIcon() {
  if (video.paused) {
    play.innerHTML = `<i class="fa fa-play fa-2x"></i>`;
  } else {
    play.innerHTML = `<i class="fa fa-pause fa-2x"></i>`;
  }
}

// update progress & timestamp
function updateProgess() {
  progress.value = (video.currentTime / video.duration) * 100; // % of time scale

  // get mins
  let mins = Math.floor(video.currentTime / 60);
  if (mins < 10) {
    mins = "0" + String(mins);
  }

  // get seconds
  let secs = Math.floor(video.currentTime % 60);
  if (secs < 10) {
    secs = "0" + String(secs);
  }

  timestamp.innerHTML = `${mins}:${secs}`;
}

// set video time
function setVideoProgress() {
  video.currentTime = (+progress.value * video.duration) / 100; // time given %time scale x duration
}

// stop video
function stopVideo() {
  video.currentTime = 0; // there is no stop function
  video.pause();
}
