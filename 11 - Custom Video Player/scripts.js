const player = document.querySelector(".player");
const video = player.querySelector(".viewer");
const playerSkipButtons = player.querySelectorAll("[data-skip]");
const playerSliders = player.querySelectorAll(".player__slider");
const toggle = player.querySelector(".toggle");
const progress = player.querySelector(".progress");
const progressBar = player.querySelector(".progress__filled");
const fullscreen = player.querySelector(".full_screen");

function toggleControl(e) {
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
}
function updateButton(e) {
  const icon = this.paused ? "►" : "❚ ❚";
  toggle.textContent = icon;
}

function togglePlay() {
  const method = video.paused ? "play" : "pause";
  video[method]();
}

video.addEventListener("pause", updateButton);

video.addEventListener("play", updateButton);

video.addEventListener("click", toggleControl);

toggle.addEventListener("click", togglePlay);

function skipVideo(e) {
  const skipBy = this.dataset.skip;
  video.currentTime += parseInt(skipBy);
}

playerSkipButtons.forEach((control) =>
  control.addEventListener("click", skipVideo)
);

function updatePlayerSpeedVolume(e) {
  console.log("called", this.name);
  video[this.name] = this.value;
}

playerSliders.forEach((control) =>
  control.addEventListener("change", updatePlayerSpeedVolume)
);

playerSliders.forEach((control) =>
  control.addEventListener("mousemove", updatePlayerSpeedVolume)
);

function updateProgressBar(e) {
  const percent = (video.currentTime / video.duration) * 100;
  progressBar.style.flexBasis = `${percent}%`;
}

video.addEventListener("timeupdate", updateProgressBar);

function scrub(e) {
  const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = scrubTime;
}

let mousedown = false;
progress.addEventListener("click", scrub);
progress.addEventListener("mousemove", (e) => mousedown && scrub(e));
progress.addEventListener("mousedown", () => (mousedown = true));
progress.addEventListener("mouseup", () => (mousedown = false));



fullscreen.addEventListener('click',(e) => {
    video.requestFullscreen();
})