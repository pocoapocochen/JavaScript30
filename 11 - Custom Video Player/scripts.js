/* video object:
https://www.w3schools.com/jsref/dom_obj_video.asp
 */


// 1. get the elements
const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const rangeSliders = player.querySelectorAll('.player__slider');
const skipButtons = player.querySelectorAll('[data-skip]');
const fullButton = player.querySelector('.full');


// 3. build functions
function togglePlay() {
    const status = video.paused ? 'play' :'pause';
    video[status]();
    
    /* if (video.paused){
        video.play();
    } else {
        video.pause();
    } */
}

function changeToggleBtn() {
    const icon = video.paused ? '►' : '❚❚';
    toggle.textContent = icon;
}

function skip() {
    const time = this.dataset.skip;
    video.currentTime += parseInt(time);
}

function changeRangeSlider() {
    video[this.name] = this.value;
    /* this.name: 'playbackRate' or 'volume' */

    /* 
    - The playbackRate property sets or returns the current playback speed of the video. see: https://www.w3schools.com/jsref/prop_video_playbackrate.asp
    - The volume property sets or returns the audio volume of a video, from 0.0 (silent) to 1.0 (loudest). see: https://www.w3schools.com/jsref/prop_video_volume.asp
    */
}

function handleProgress() {
    const percent = (video.currentTime / video.duration) * 100;
    progressBar.style.flexBasis = `${percent}%`;

    /* The flexBasis property specifies the initial length of a flexible item.
    Note: If the element is not a flexible item, the flexBasis property has no effect. */  
}

function scrub(e) {
    const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
    video.currentTime = scrubTime;
}

function handleFullScreen() {
    if (video.requestFullscreen) {
        video.requestFullscreen();
      } else if (video.msRequestFullscreen) {
        video.msRequestFullscreen();
      } else if (video.mozRequestFullScreen) {
        video.mozRequestFullScreen();
      } else if (video.webkitRequestFullscreen) {
        video.webkitRequestFullscreen();
      }
    /* https://developer.mozilla.org/zh-TW/docs/Web/API/Fullscreen_API */
}

// 2. hook up the event listeners

// 2-1. play/pause video
video.addEventListener('click', togglePlay);
toggle.addEventListener('click', togglePlay);

// 2-2. change toggle btn
video.addEventListener('play', changeToggleBtn);
video.addEventListener('pause', changeToggleBtn);

// 2-3. change slider value
rangeSliders.forEach(rangeSlider => {rangeSlider.addEventListener('change', changeRangeSlider)})

// 2-4. change video time
skipButtons.forEach(skipButton => {skipButton.addEventListener('click', skip)}); 

// 2-5. handle progress bar
video.addEventListener('timeupdate', handleProgress);
/* https://www.w3schools.com/tags/av_event_timeupdate.asp */

// 2-6. scrub the progress bar and change the progress fill and video current time
let mousedown = false;
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', (e) => mousedown && scrub(e) /* {
    if (mousedown) {
        scrub(e);
    }
} */);
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);

// 2.7 make full screen
fullButton.addEventListener('click', handleFullScreen);