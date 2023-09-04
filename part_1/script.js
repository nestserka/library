document.addEventListener("DOMContentLoaded", function() {
   
let now_playing = document.querySelector('.now-playing');
let track_art = document.querySelector('.track-art');
let track_name = document.querySelector('.track-name');
let track_artist = document.querySelector('.track-artist');


let playpause_btn = document.querySelector('.playpause-track');
let next_btn = document.querySelector('.next-track');
let prev_btn = document.querySelector('.prev-track');
let random_btn = document.querySelector('.random-track');
let repeat_btn = document.querySelector('.repeat-track');



let seek_slider = document.querySelector('.seek_slider');
let volume_slider = document.querySelector('.volume_slider');
let curr_time = document.querySelector('.current-time');
let total_duration = document.querySelector('.total-duration');
let randomIcon = document.querySelector('.random_img');
let curr_track = document.createElement('audio');

let track_index = 0;
let isPlaying = false;
let isRandom = false;
let updateTimer;
const music_list = [
    {
        img: 'img/fire.png',
        name : 'Play with Fire',
        artist : 'Sam Tinnesz',
        music : 'music/play_with_fire.mp3'
    },
    {
        img: 'img/fever_ray.png',
        name : 'If I had a Heart',
        artist : 'Fever Ray',
        music : 'music/heart.mp3'
    },
    {
        img: 'img/viking.PNG',
        name : 'My Mother Told Me',
        artist : 'Sea Shanty',
        music : 'music/mother.mp3'
    },
    {
        img: 'img/come_with.PNG',
        name : 'Come with Me Now',
        artist : 'Kongos',
        music : 'music/come_with.mp3'
    },
    {
        img: 'img/unstoppable.PNG',
        name : 'Unstoppable',
        artist : 'The Score',
        music : 'music/unstoppable.mp3'
    }
];
loadTrack(track_index);

function loadTrack(track_index) {
    clearInterval(updateTimer);
    reset();

    curr_track.src = music_list[track_index].music;  
    curr_track.load();

    track_art.style.backgroundImage = "url(" + music_list[track_index].img + ")";
    const backgroundImageUrl = music_list[track_index].img;
    hideBackground(backgroundImageUrl);
    track_name.textContent = music_list[track_index].name;
    track_artist.textContent = music_list[track_index].artist;
    now_playing.textContent = "Playing music " + (track_index + 1) + " of " + music_list.length;
    updateTimer = setInterval(setUpdate, 1000);

    curr_track.addEventListener('ended', nextTrack);
}

function reset(){
    curr_time.textContent = "00:00";
    total_duration.textContent = "00:00";
    seek_slider.value = 0;
}

function hideBackground(value){
    const blurredElement = document.querySelector('.blurred');
    blurredElement.style.backgroundImage = `url(${value})`;
}



function playRandom(){
    isRandom = true;
    randomIcon.classList.add('randomActive');
    document.querySelector('.random_img').src = 'icons/random_two.png';
}
function pauseRandom(){
    isRandom = false;
    randomIcon.classList.remove('randomActive');
    document.querySelector('.random_img').src = 'icons/shuffle.png';
}

playpause_btn.addEventListener('click', function(){
        isPlaying ? pauseTrack() : playTrack();
});


random_btn.addEventListener('click', function(){
    console.log("click")
    isRandom ? pauseRandom() : playRandom();
});

repeat_btn.addEventListener('click', function(){
    let current_index = track_index;
    loadTrack(current_index);
    playTrack();
})

function playTrack(){
    curr_track.play();
    isPlaying = true;
    track_art.classList.add('rotate');
    document.querySelector('.pause').src = 'icons/start.png';
}
function pauseTrack(){
    curr_track.pause();
    isPlaying = false;
    track_art.classList.remove('rotate');
    document.querySelector('.pause').src = 'icons/pause.png';
}



prev_btn.addEventListener('click', function(){
    if(track_index > 0){
        track_index -= 1;
    }else{
        track_index = music_list.length -1;
    }
    loadTrack(track_index);
    playTrack();
})

next_btn.addEventListener('click', function(){
    if(track_index < music_list.length - 1 && isRandom === false){
        track_index += 1;
    }else if(track_index < music_list.length - 1 && isRandom === true){
        let random_index = Number.parseInt(Math.random() * music_list.length);
        track_index = random_index;
    }else{
        track_index = 0;
    }
    loadTrack(track_index);
    playTrack();
});

function nextTrack(){
    if(track_index < music_list.length - 1 && isRandom === false){
        track_index += 1;
    }else if(track_index < music_list.length - 1 && isRandom === true){
        let random_index = Number.parseInt(Math.random() * music_list.length);
        track_index = random_index;
    }else{
        track_index = 0;
    }
    loadTrack(track_index);
    playTrack();
}



function seekTo(){
    let seekto = curr_track.duration * (seek_slider.value / 100);
    curr_track.currentTime = seekto;
}
function setVolume(){
    curr_track.volume = volume_slider.value / 100;
}
function setUpdate(){
    let seekPosition = 0;
    if(!isNaN(curr_track.duration)){
        seekPosition = curr_track.currentTime * (100 / curr_track.duration);
        seek_slider.value = seekPosition;

        let currentMinutes = Math.floor(curr_track.currentTime / 60);
        let currentSeconds = Math.floor(curr_track.currentTime - currentMinutes * 60);
        let durationMinutes = Math.floor(curr_track.duration / 60);
        let durationSeconds = Math.floor(curr_track.duration - durationMinutes * 60);

        if(currentSeconds < 10) {currentSeconds = "0" + currentSeconds; }
        if(durationSeconds < 10) { durationSeconds = "0" + durationSeconds; }
        if(currentMinutes < 10) {currentMinutes = "0" + currentMinutes; }
        if(durationMinutes < 10) { durationMinutes = "0" + durationMinutes; }

        curr_time.textContent = currentMinutes + ":" + currentSeconds;
        total_duration.textContent = durationMinutes + ":" + durationSeconds;
    }
}
});