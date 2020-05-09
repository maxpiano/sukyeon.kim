// {{{ selectors and variables
"use strict";
const navButtons = document.querySelectorAll(".navbutton");
const sections = document.querySelectorAll(".content");
const linksToggleButton = document.querySelector(".linkstoggle");
const linksBar = document.querySelector(".links");
const playButton = document.querySelector(".playmusic");
const infoParagraph = document.querySelector(".info > p");
const players = document.querySelectorAll(".player");
const audios = document.querySelectorAll("audio");
let audioCurrPlaying = audios[0];
// }}}

// {{{ event listeners
navButtons.forEach((button) =>
  button.addEventListener("click", function () {
    window.scrollTo({
      top: sections[this.dataset.index].offsetTop,
      left: sections[this.dataset.index].offsetLeft,
      behavior: "smooth",
    });
  })
);

linksToggleButton.addEventListener("click", function toggleLinks() {
  linksBar.classList.toggle("active");
});

playButton.addEventListener("click", handleNavAudioButton);

players.forEach((el) =>
  el.querySelector("radial-player").addEventListener("click", toggleAudio)
);
audios.forEach((audio) => audio.addEventListener("play", updateButton));
audios.forEach((audio) => audio.addEventListener("pause", updateButton));
audios.forEach((audio) => audio.addEventListener("timeupdate", updateProgress));
// }}}

// {{{ functions
function toggleAudio() {
  const audio = this.previousElementSibling;
  if (audio.paused) {
    audios.forEach((audio) => audio.pause());
    audio.play();
    audioCurrPlaying = audio;
  } else {
    audio.pause();
    // audioLastPaused = audio;
  }
}

function updateButton() {
  let state = this.paused
    ? "<i class='fas fa-play'></i>"
    : "<i class='fas fa-pause'></i>";
  this.nextElementSibling.setAttribute("icon", state);

  let navState = this.paused
    ? "<i class='fas fa-volume-down'></i>"
    : "<i class='fas fa-volume-mute'></i>";
  playButton.innerHTML = navState;
}

function updateProgress() {
  const progressTime = (this.currentTime / this.duration) * 100;
  this.nextElementSibling.setAttribute("progress", progressTime);
}

function handleNavAudioButton() {
  const mutedIcon = "<i class='fas fa-volume-mute'></i>";
  const playingIcon = "<i class='fas fa-volume-down'></i>";
  if (audioCurrPlaying.paused) {
    audioCurrPlaying.play();
    playButton.innerHTML = mutedIcon;
  } else {
    audioCurrPlaying.pause();
    playButton.innerHTML = playingIcon;
  }
}
// }}}
