const musicContainer = document.querySelector(".music-container");
const playBtn = document.querySelector("#play");
const nextBtn = document.querySelector("#next");
const prevBtn = document.querySelector("#prev");
const shuffleBtn = document.querySelector("#shuffle");
const repeatBtn = document.querySelector("#repeat");
const progressContainer = document.querySelector(".progress-container");
const progress = document.querySelector("#progress");
const title = document.querySelector("#music-title span");
const audio = document.querySelector("#audio");
const disc = document.querySelector("#music-disc img");
const durationn= document.querySelector("#duration");
const curent = document.querySelector("#current")


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

let songIndex = 0;

loadSong(songs[songIndex]);


function loadSong(song) {
    title.innerText = song;
    audio.src = `./songs/${song}.mp3`
    disc.src = `./images/${song}.png`
};

function playSong() {
  musicContainer.classList.add("play")
  playBtn.querySelector("i.fa-solid").classList.remove("fa-circle-play");
  playBtn.querySelector("i.fa-solid").classList.add("fa-circle-pause");
  title.style.animationPlayState = "running"
  playBtn.classList.remove("active");
  audio.play()
}

function pauseSong() {
  musicContainer.classList.remove("play")
  playBtn.querySelector("i.fa-solid").classList.add("fa-circle-play");
  playBtn.querySelector("i.fa-solid").classList.remove("fa-circle-pause");
  title.style.animationPlayState = "paused"
  playBtn.classList.add("active");
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

 if (isShuffle) {

  songIndex = Math.floor(Math.random() * songs.length)
  
 } else {

   songIndex++
 

if (songIndex > songs.length - 1) {

  songIndex = 0;
  
}
  
 }

  loadSong(songs[songIndex])

  playSong()
}

let isShuffle= false;

function shuffleSong() {
  isShuffle = !isShuffle;
  shuffleBtn.classList.toggle("active");
}

let isRepeat= false;

function repeatSong() {
  isRepeat= !isRepeat;
  repeatBtn.classList.toggle("active");
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
repeatBtn.addEventListener("click",repeatSong);  
shuffleBtn.addEventListener("click",shuffleSong)
audio.addEventListener("timeupdate",progressUpdate);
progressContainer.addEventListener("click",setProgress);
audio.addEventListener("ended", ()=> {
  if (isRepeat) {
    audio.currentTime = 0;
    audio.play()

  } else {

    nextSong()
  }

});
audio.addEventListener("timeupdate", ()=> {

  let minute =  Math.floor(audio.currentTime / 60);
  let second = Math.floor(audio.currentTime % 60);

  current.innerHTML = `${minute<10 ? "0" + minute : minute}:${second< 10 ? "0" + second : second}`

})

audio.addEventListener("loadedmetadata", ()=> {
  if (!isNaN(audio.duration)){
  let minute =  Math.floor(audio.duration / 60);
  let second = Math.floor(audio.duration % 60);


    durationn.innerHTML = 
  `${minute<10 ? "0" + minute : minute}:`+
  `${second< 10 ? "0" + second : second}`

  }


})