const musicContainer = document.querySelector(".music-container");
const playBtn = document.querySelector("#play");
const nextBtn = document.querySelector("#next");
const prevBtn = document.querySelector("#prev");
const progressContainer = document.querySelector(".progress-container");
const progress = document.querySelector("#progress");
const title = document.querySelector("#music-title marquee");
const audio = document.querySelector("#audio");
const disc = document.querySelector("#music-disc img");
const marquee = document.querySelector("marquee")

const songs = [
  "David Guetta Feat. Kelly Rowland - When Love Takes Over",
  "Eminem - Stan ft. Dido",
  "Linkin Park - Numb",
  "Tame Impala - Let It Happen",
  "Enrique Iglesias - Takin' Back My Love feat. Ciara",
  "Coldplay - Adventure Of A Lifetime",
  "Mareux - The Perfect Girl",
  "Empire of the Sun - We Are The People",
];

let songIndex = 7;

loadSong(songs[songIndex]);
 marquee.stop()

function loadSong(song) {
    title.innerText = song;
    audio.src = `./songs/${song}.mp3`
    disc.src = `./images/${song}.png`
};

function playSong() {
  musicContainer.classList.add("play")
  playBtn.querySelector("i.fa-solid").classList.remove("fa-circle-play");
  playBtn.querySelector("i.fa-solid").classList.add("fa-circle-pause");
  marquee.start()
  audio.play()
}

function pauseSong() {
   musicContainer.classList.remove("play")
  playBtn.querySelector("i.fa-solid").classList.add("fa-circle-play");
  playBtn.querySelector("i.fa-solid").classList.remove("fa-circle-pause")
  marquee.stop()
  audio.pause()
}


function prevSong() {
songIndex--

if (songIndex < 0) {

  songIndex = songs.length-1
  
}
  loadSong(songs[songIndex])

  playSong()

}

function nextSong() {
  songIndex++
 

if (songIndex > songs.length - 1) {

  songIndex = 0;
  
}
  loadSong(songs[songIndex])

  playSong()
}


function progressUpdate(e) {
const {duration, currentTime} = e.srcElement
const progressPercentage = (currentTime/ duration) * 100
progress.style.width = `${progressPercentage}%`

}

function setProgress(e) {
  const width = this.clientWidth
  const clickX = e.offsetX
  const duration = audio.duration

  audio.currentTime = (clickX/ width) * duration 
  
}


playBtn.addEventListener("click", ()=>{
  const isPLaying = musicContainer.classList.contains("play");
  if (isPLaying) {
    pauseSong()
  } else {
    playSong()
  }
})

prevBtn.addEventListener("click",prevSong);
nextBtn.addEventListener("click",nextSong);
audio.addEventListener("timeupdate",progressUpdate);
progressContainer.addEventListener("click",setProgress);
audio.addEventListener("ended", nextSong)