const progressVideo = document.querySelector('.progress-video');
const progressVolume = document.querySelector('.progress-volume');
const btnVolume = document.querySelector('.volume');
const video = document.querySelector('.video');
const buttonPlayMain = document.querySelector('.btn-play-main');
const btnPlayPause = document.querySelector('.play');
const btnFullScreen = document.querySelector('.btn-full-screen');
let volumeValue = 40;
progressVolume.value = volumeValue;

function toggleVideoStatus() {
  if (video.paused) {    
    video.play();
  } else {      
    video.pause();  
  }
};

function updateIcon() {
  if (video.paused) {
    btnPlayPause.classList.add('play');
    btnPlayPause.classList.remove('pause');
    buttonPlayMain.classList.add('btn-play-main');
    buttonPlayMain.classList.remove('button-main-hidden');
    
  } else {
    btnPlayPause.classList.add('pause');
    btnPlayPause.classList.remove('play');
    buttonPlayMain.classList.add('button-main-hidden');
    buttonPlayMain.classList.remove('btn-play-main');
    
  }
};

function videoVolume(){
  if (progressVolume.value === 0) {
		video.volume = 0;
	}
	video.volume = progressVolume.value / 100;  
}
video.addEventListener('timeupdate', videoVolume);

progressVolume.addEventListener('input', function(){
  const value = this.value;
  this.style.background = `linear-gradient(to right, #710707 0%, #710707 ${value}%, #C4C4C4 ${value}%, #C4C4C4 100%)`
  if (value==0) {
    btnVolume.classList.add('mute');
    btnVolume.classList.remove('volume');
  } else {
    btnVolume.classList.add('volume');
    btnVolume.classList.remove('mute');
  }
})

function videoMute() {
  if (progressVolume.value > 0) {
    volumeValue = progressVolume.value;
    btnVolume.classList.add('mute');
    btnVolume.classList.remove('volume');
    progressVolume.value = 0;
    progressVolume.style.background = `linear-gradient(to right, #710707 0%, #C4C4C4 0%, #C4C4C4 0%, #C4C4C4 100%)`;
    progressVolume.transition = '0.25s ease-in-out';
    
  } else if (progressVolume.value === 0 && volumeValue > 0) {
    btnVolume.classList.remove('mute');
    btnVolume.classList.add('volume'); 
    progressVolume.value = volumeValue;
    progressVolume.style.background = `linear-gradient(to right, #710707 0%, #710707  ${volumeValue}%, #C4C4C4 ${volumeValue}%, #C4C4C4 100%)`; 
  } else {
    volumeValue = 40;
    btnVolume.classList.remove('mute'); 
    btnVolume.classList.add('volume');
    progressVolume.value = volumeValue;
    progressVolume.style.background = `linear-gradient(to right, #710707 0%, #710707 ${volumeValue}%, #C4C4C4 ${volumeValue}%, #C4C4C4 100%)`; 
  }
}

btnVolume.addEventListener('click', videoMute);

function fullscreen() {
	let isInFullScreen = (document.fullscreenElement && document.fullscreenElement !== null);

	if (!isInFullScreen) {
		if (video.requestFullscreen) {
			video.requestFullscreen();
		}
	} else {
		if (document.exitFullscreen) {
			document.exitFullscreen();
		}
	}
}

function stopVideo() {
  video.currentTime = 0;
  setProgressTimer();
  video.pause();
};

function setProgressTimer() {
  progressVideo.value = (video.currentTime / video.duration) * 100;
  if (video.currentTime === video.duration) {
    progressVideo.value = 0;
    stopVideo();
  }
  progressVideo.style.background = `linear-gradient(to right, #710707 0%, #710707 ${progressVideo.value}%, #C4C4C4 ${progressVideo.value}%, #C4C4C4 100%)`;
};

function seen() {
  video.currentTime = (progressVideo.value / 100) * video.duration;
  let value = progressVideo.value
  if (video.currentTime) {
    progressVideo.style.background = `linear-gradient(to right, #710707 0%, #710707 ${value}%, #C4C4C4 ${value}%, #C4C4C4 100%)`;
  }    
}

btnPlayPause.addEventListener('click', toggleVideoStatus);
buttonPlayMain.addEventListener('click', toggleVideoStatus);
video.addEventListener('click', toggleVideoStatus);
video.addEventListener('play', updateIcon);
video.addEventListener('pause', updateIcon);
video.addEventListener('timeupdate', setProgressTimer);
progressVideo.addEventListener('input', seen);
btnFullScreen.addEventListener('click', fullscreen);
