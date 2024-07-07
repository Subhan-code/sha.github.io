const image = document.getElementById('cover'),
    title = document.getElementById('music-title'),
    artist = document.getElementById('music-artist'),
    currentTimeEl = document.getElementById('current-time'),
    durationEl = document.getElementById('duration'),
    progress = document.getElementById('progress'),
    playerProgress = document.getElementById('player-progress'),
    prevBtn = document.getElementById('prev'),
    nextBtn = document.getElementById('next'),
    playBtn = document.getElementById('play'),
    background = document.getElementById('bg-img'),
    carousel = document.getElementById('carousel');


const music = new Audio();

const songs = [
    {
        path: 'assets/1.mp3',
        displayName: '🌸 Aa mil 🌸',
        cover: 'assets/1.jpeg',
        artist: 'Zaeden, Lisa Mishra',
    },
    {
        path: 'assets/2.mp3',
        displayName: '🌸 O soniye 🌸',
        cover: 'assets/2.png',
        artist: 'Vibha Saraf, Arijit Singh',
    },
    {
        path: 'assets/3.mp3',
        displayName: '🌸 River flows in you 🌸',
        cover: 'assets/3.jpg',
        artist: 'Yiruma',
    }
];

let musicIndex = 0;
let isPlaying = false;

function togglePlay() {
    if (isPlaying) {
        pauseMusic();
    } else {
        playMusic();
    }
}

function playMusic() {
    isPlaying = true;
    playBtn.classList.replace('fa-play', 'fa-pause');
    playBtn.setAttribute('title', 'Pause');
    music.play();
}

function pauseMusic() {
    isPlaying = false;
    playBtn.classList.replace('fa-pause', 'fa-play');
    playBtn.setAttribute('title', 'Play');
    music.pause();
}

function loadMusic(song) {
    music.src = song.path;
    title.textContent = song.displayName;
    artist.textContent = song.artist;
    image.src = song.cover;
    updateCarousel();
}

function changeMusic(direction) {
    musicIndex = (musicIndex + direction + songs.length) % songs.length;
    loadMusic(songs[musicIndex]);
    playMusic();
}

function updateCarousel() {
    carousel.innerHTML = '';
    const prevIndex = (musicIndex - 1 + songs.length) % songs.length;
    const nextIndex = (musicIndex + 1) % songs.length;

    const prevImg = document.createElement('img');
    prevImg.src = songs[prevIndex].cover;
    prevImg.classList.add('inactive');
    carousel.appendChild(prevImg);

    const currentImg = document.createElement('img');
    currentImg.src = songs[musicIndex].cover;
    currentImg.classList.add('active');
    carousel.appendChild(currentImg);

    const nextImg = document.createElement('img');
    nextImg.src = songs[nextIndex].cover;
    nextImg.classList.add('inactive');
    carousel.appendChild(nextImg);
}

function updateProgressBar() {
    const { duration, currentTime } = music;
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;

    const formatTime = (time) => String(Math.floor(time)).padStart(2, '0');
    durationEl.textContent = `${formatTime(duration / 60)}:${formatTime(duration % 60)}`;
    currentTimeEl.textContent = `${formatTime(currentTime / 60)}:${formatTime(currentTime % 60)}`;
}

function setProgressBar(e) {
    const width = playerProgress.clientWidth;
    const clickX = e.offsetX;
    music.currentTime = (clickX / width) * music.duration;
}

playBtn.addEventListener('click', togglePlay);
prevBtn.addEventListener('click', () => changeMusic(-1));
nextBtn.addEventListener('click', () => changeMusic(1));
music.addEventListener('ended', () => changeMusic(1));
music.addEventListener('timeupdate', updateProgressBar);
playerProgress.addEventListener('click', setProgressBar);

loadMusic(songs[musicIndex]);
document.addEventListener('DOMContentLoaded', function() {
    const carouselTrack = document.querySelector('.carousel-track');
    const carouselItems = document.querySelectorAll('.carousel-item');
    const prevButton = document.getElementById('prev');
    const nextButton = document.getElementById('next');
    
    let currentIndex = 0;
    const totalItems = carouselItems.length;
    const itemWidth = carouselItems[0].offsetWidth; // Assuming all items have the same width

    // Function to update carousel position
    function updateCarousel() {
        // Calculate the current index to be centered
        let centerIndex = currentIndex;

        // Adjust centerIndex based on the number of items
        if (totalItems > 3) {
            centerIndex = (currentIndex + Math.floor(totalItems / 2)) % totalItems;
        }

        const translateX = centerIndex * -itemWidth;
        carouselTrack.style.transform = `translateX(${translateX}px)`;
    }

    // Next button click event
    nextButton.addEventListener('click', function() {
        currentIndex++;
        if (currentIndex > totalItems - 1) {
            currentIndex = 0; // Reset to beginning if at end
        }
        updateCarousel();
    });

    // Previous button click event
    prevButton.addEventListener('click', function() {
        currentIndex--;
        if (currentIndex < 0) {
            currentIndex = totalItems - 1; // Go to last item if at beginning
        }
        updateCarousel();
    });

    // Initial update
    updateCarousel();
});

