document.addEventListener("DOMContentLoaded", function () {

    let now_playing = document.querySelector('.now-playing');
    let track_art = document.querySelector('.track-art');
    let track_name = document.querySelector('.track-name');
    let track_artist = document.querySelector('.track-artist');


    let playpause_btn = document.querySelector('.playpause-track');
    let next_btn = document.querySelector('.next-track');
    let prev_btn = document.querySelector('.prev-track');
    let random_btn = document.querySelector('.random-track');
    let repeat_btn = document.querySelector('.repeat-track');


    let slider_bar = document.querySelector('.slider-bar');
    let volume_slider = document.querySelector('.volume_slider');
    let volume_up = document.querySelector('.volume-up');
    let curr_time = document.querySelector('.current-time');
    let total_duration = document.querySelector('.total-duration');
    let curr_track = document.createElement('audio');

    let track_index = 0;
    let currentlyPlaying = false;
    let isShuffle = false;
    let updateTimer;
    const songList = [
        {
            img: 'img/fire.png',
            name: 'Play with Fire',
            artist: 'Sam Tinnesz',
            music: 'music/play_with_fire.mp3'
        },
        {
            img: 'img/fever_ray.png',
            name: 'If I had a Heart',
            artist: 'Fever Ray',
            music: 'music/heart.mp3'
        },
        {
            img: 'img/viking.PNG',
            name: 'My Mother Told Me',
            artist: 'Sea Shanty',
            music: 'music/mother.mp3'
        },
        {
            img: 'img/come_with.PNG',
            name: 'Come with Me Now',
            artist: 'Kongos',
            music: 'music/come_with.mp3'
        },
        {
            img: 'img/unstoppable.PNG',
            name: 'Unstoppable',
            artist: 'The Score',
            music: 'music/unstoppable.mp3'
        }
    ];

    loadTrack(track_index);

    function loadTrack(track_index) {
        clearInterval(updateTimer);
        reset();

        const track = songList[track_index];
        const { music, img, name, artist } = track;

        curr_track.src = music;
        curr_track.load();

        track_art.style.backgroundImage = `url(${img})`;
        hideBackground(img);
        track_name.textContent = name;
        track_artist.textContent = artist;
        now_playing.textContent = `Playing song ${track_index + 1} out of ${songList.length}`;
        updateTimer = setInterval(setUpdate, 1000);
        curr_track.addEventListener('ended', nextTrack);
    }

    function reset() {
        curr_time.textContent = "00:00";
        total_duration.textContent = "00:00";
        slider_bar.value = 0;
    }

    function hideBackground(value) {
        const blurredElement = document.querySelector('.blurred');
        blurredElement.style.backgroundImage = `url(${value})`;
    }

    function playRandom() {
        isShuffle = true;
        document.querySelector('.random_img').src = 'icons/random_two.png';
    }

    function pauseRandom() {
        isShuffle = false;
        document.querySelector('.random_img').src = 'icons/shuffle.png';
    }


    function playTrack() {
        curr_track.play();
        currentlyPlaying = true;
        track_art.classList.add('rotate');
        document.querySelector('.pause').src = 'icons/start.png';
    }
    function pauseTrack() {
        curr_track.pause();
        currentlyPlaying = false;
        track_art.classList.remove('rotate');
        document.querySelector('.pause').src = 'icons/pause.png';
    }


    prev_btn.addEventListener('click', function () {
        slider_bar.style.background = "#FFF";
        track_index = (track_index > 0) ? (track_index - 1) : (songList.length - 1);
        loadTrack(track_index);
        playTrack();
    });

    next_btn.addEventListener('click', function () {
        slider_bar.style.background = "#FFF";
        if (!isShuffle && track_index < songList.length - 1) {
            track_index += 1;
        } else if (isShuffle) {
            let random_index = Number.parseInt(Math.random() * songList.length);
            track_index = random_index;
        } else {
            track_index = 0;
        }
        loadTrack(track_index);
        playTrack();
    });

    playpause_btn.addEventListener('click', function () {
        currentlyPlaying ? pauseTrack() : playTrack();
    });

    random_btn.addEventListener('click', function () {
        console.log("click")
        isShuffle ? pauseRandom() : playRandom();
    });

    repeat_btn.addEventListener('click', function () {
        let current_index = track_index;
        loadTrack(current_index);
        playTrack();
    });

    slider_bar.addEventListener('click', function () {
        let moveTo = curr_track.duration * (slider_bar.value / 100);
        curr_track.currentTime = moveTo;
        setUpdate();
    });

    function openVolumeSlider() {
        volume_slider.classList.add('active');
    }
      
    function closeVolumeSlider() {
        volume_slider.classList.remove('active');
    }
      
    volume_up.addEventListener('click', function (event) {
        event.stopPropagation(); 
        volume_slider.classList.contains('active') ? closeVolumeSlider() : openVolumeSlider();
      });

    document.addEventListener('click', function () {
        if (volume_slider.classList.contains('active')) {
          closeVolumeSlider();
        }
    });

    volume_slider.addEventListener('click', function (event) {
        curr_track.volume = volume_slider.value / 100;
        if (curr_track.volume === 0) {
            document.querySelector('.volume-up').src = 'icons/volume-down.png';
        } else {
            document.querySelector('.volume-up').src = 'icons/volume-up.png';
        }
        event.stopPropagation(); 
        setTimeout(function () {
            closeVolumeSlider();
          }, 2000); 
    });


    function nextTrack() {
        slider_bar.style.background = "#FFF";
        if (!isShuffle) {
            track_index = (track_index + 1) % songList.length;
        } else {
            track_index = Math.floor(Math.random() * songList.length);
        }
        loadTrack(track_index);
        playTrack();
    }


    function setUpdate() {
        if (isNaN(curr_track.duration)) {
            return;
        }
        const seekPosition = (curr_track.currentTime / curr_track.duration) * 100;
        slider_bar.value = seekPosition;
        curr_time.textContent = formatTime(curr_track.currentTime);
        total_duration.textContent = formatTime(curr_track.duration);
        const gradientValue = `linear-gradient(90deg, rgba(187, 24, 70, 1) 0%, rgba(255, 255, 0, 1) ${slider_bar.value}%, rgba(255, 255, 255, 1) ${slider_bar.value}%)`;
        slider_bar.style.background = gradientValue;
    }

    function formatTime(time) {
        const minutes = Math.floor(time / 60).toString().padStart(2, '0');
        const seconds = Math.floor(time % 60).toString().padStart(2, '0');
        return `${minutes}:${seconds}`;
    }
});

