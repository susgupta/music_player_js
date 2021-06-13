const musicContainer = document.querySelector('.music-container');
const playBtn = document.querySelector('#play');
const prevBtn = document.querySelector('#prev');
const nextBtn = document.querySelector('#next');
const audio = document.querySelector('#audio');
const progress = document.querySelector('.progress');
const progressContainer = document.querySelector('.progress-container');
const title = document.querySelector('#title');
const cover = document.querySelector('#cover');

//song names
const songs = ['hey', 'All Aboard', 'summer', 'ukulele'];

//keep track of songs
let songIndex = 1;

//init load songs into DOM
loadSong(songs[songIndex]);

//update song details
function loadSong(song) {
    title.innerText = song;
    audio.src = `music/${song}.mp3`;
    cover.src = `images/${song}.jpg`;
}

function pauseSong() {
    musicContainer.classList.remove('play');

    let mainButton = playBtn.querySelector('i.fas');
    mainButton.classList.add('fa-play');
    mainButton.classList.remove('fa-pause');

    audio.pause();
}

function playSong() {
    musicContainer.classList.add('play');

    let mainButton = playBtn.querySelector('i.fas');
    mainButton.classList.remove('fa-play');
    mainButton.classList.add('fa-pause');

    audio.play();
}

function prevSong() {
    songIndex--;

    if (songIndex < 0) {
        songIndex = songs.length - 1;
    }

    loadSong(songs[songIndex]);
    playSong();
}

function nextSong() {
    songIndex++;

    if (songIndex > (songs.length - 1)) {
        songIndex = 0;
    }

    loadSong(songs[songIndex]);
    playSong();
}

function updateProgress(e) {
    const { duration, currentTime } = e.srcElement;

    //get from audio api and literally calculate percent to show for progress div bar
    const percentProgress = (currentTime / duration) * 100;
    progress.style.width = `${percentProgress}%`;
}

function setProgress(e) {
    const width = this.clientWidth;
    const clickX = e.offsetX;

    //get audio duration
    const duration = audio.duration;

    //now set audio time, based on where clicked on progress bar
    audio.currentTime = (clickX / width) * duration;
}

//event listeners

playBtn.addEventListener('click', () => {

    const isPlaying = musicContainer.classList.contains('play');

    if (isPlaying) {
        pauseSong();
    }
    else {
        playSong();
    }

});

prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);

audio.addEventListener('timeupdate', updateProgress);
progressContainer.addEventListener('click', setProgress);
audio.addEventListener('ended', nextSong);
