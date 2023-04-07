const playBtn = document.querySelector(".play-btn");
const pauseBtn = document.querySelector(".pause-btn");
const stopBtn = document.querySelector(".stop-btn");
const prevBtn = document.querySelector(".prev-btn");
const nextBtn = document.querySelector(".next-btn");
const volDownBtn = document.querySelector(".vol-down-btn");
const volUpBtn = document.querySelector(".vol-up-btn");
const volSlider = document.querySelector(".vol-slider");
const uploadBtn = document.querySelector("#upload-btn");
const songList = document.querySelector(".song-list");
const skipForwardBtn = document.getElementById('skipForwardBtn');
const skipBackwardBtn = document.getElementById('skipBackwardBtn');
const audioTime = document.getElementById('audioTime');
const audioName = document.getElementById('audioName');
const progressBar = document.querySelector('.progress-bar');
const video = document.getElementById("my-video");



let audio = new Audio();
let songIndex = 0;
// Update progress bar as audio plays
// Assuming you have access to an audio element named 'audioElement'

let songTimes = [0]

audio.addEventListener('timeupdate', () => {
    const currentTime = audio.currentTime;
    const duration = audio.duration;
    const progressPercent = (currentTime / duration) * 100;
    progressBar.style.width = `${progressPercent}%`;

    const minutes = Math.floor(audio.currentTime / 60);
    const seconds = Math.floor(audio.currentTime % 60)
        .toString()
        .padStart(2, '0');
    audioTime.textContent = `${minutes}:${seconds}`;

    songTimes[0] = currentTime

    if (currentTime === duration) {
        video.pause();
        audio.pause();
    }

});



function playSong() {
    audio.src = songList.children[songIndex].getAttribute("data-src");
    audioTitle = songList.children[songIndex].innerHTML;
    audioName.innerHTML = audioTitle;
    audio.currentTime = songTimes[0];
    audio.volume = volSlider.value;
    audio.play();
    video.play();
    playBtn.style.display = "none";
    pauseBtn.style.display = "inline-block";
}


function pauseSong() {
    const currentTime = audio.currentTime;

    audio.pause();
    video.pause();

    playBtn.style.display = "inline-block";
    pauseBtn.style.display = "none";
}




//play music  by clicking list



skipForwardBtn.addEventListener('click', () => {
    audio.currentTime += 5;
});
skipBackwardBtn.addEventListener('click', () => {
    audio.currentTime -= 5;
});

function stopSong() {
    audio.pause();
    video.pause();
    audio.currentTime = 0;
    playBtn.style.display = "inline-block";
    pauseBtn.style.display = "none";
}

function prevSong() {
    songTimes[0] = 0;
    if (songIndex > 0) {
        songIndex--;
        playSong();
    }
}

function nextSong() {
    songTimes[0] = 0;
    if (songIndex < songList.children.length - 1) {
        songIndex++;
        playSong();
    }
}

function setVolume() {
    audio.volume = volSlider.value;
}

function uploadSongs() {
    const files = uploadBtn.files;
    for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const url = URL.createObjectURL(file);
        const listItem = document.createElement("li");
        listItem.setAttribute("data-src", url);
        listItem.innerHTML = file.name;
        songList.appendChild(listItem);
    }
}


// Function to play a song


playBtn.addEventListener("click", playSong);
pauseBtn.addEventListener("click", pauseSong);
stopBtn.addEventListener("click", stopSong);
prevBtn.addEventListener("click", prevSong);
nextBtn.addEventListener("click", nextSong);

volDownBtn.addEventListener("click", () => {

    volSlider.value = parseFloat(volSlider.value) - 0.1;
    setVolume(volSlider.value);

});
volUpBtn.addEventListener("click", () => {
    volSlider.value = parseFloat(volSlider.value) + 0.1
    setVolume(volSlider.value);
});
volSlider.addEventListener("input", setVolume);
uploadBtn.addEventListener("change", uploadSongs);
audio.addEventListener("ended", nextSong);