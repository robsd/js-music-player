audio = document.getElementById('audio');
playPause = document.getElementById('play-pause');
timeElapsed = document.getElementById('time-elapsed');
totalTime = document.getElementById('total-time');
durationBar = document.getElementById('duration-bar');
mute = document.getElementById('mute');
volumeBar = document.getElementById('volume-bar');

audio.ondurationchange = function() {
	totalTime.innerHTML = getMinsSeconds(audio.duration);
	userVolume = audio.volume;
}

playPause.onclick = function() {
	if (audio.paused) {
		audio.play();
	}
	else {
		audio.pause();
	}
};

audio.onplay = function() {
	playPause.innerHTML = '<i class="fas fa-pause"></i>';
};

audio.onpause = function() {
	playPause.innerHTML = '<i class="fas fa-play"></i>';
};

audio.ontimeupdate = function() {
	timeElapsed.innerHTML = getMinsSeconds(audio.currentTime);
	durationBar.value = Math.floor((audio.currentTime / audio.duration) * 100);
};

function getMinsSeconds(seconds) {
	mins = Math.floor(seconds / 60);
	secs = Math.floor(seconds - mins * 60);
	if (secs < 10) {
		secs = '0' + secs;
	}
	return mins + ':' + secs;
}

durationBar.oninput = function() {
	audio.currentTime = (durationBar.value * audio.duration) / 100;
}

mute.onclick = function() {
	if (audio.volume > 0.0) {
		userVolume = audio.volume;
		audio.volume = 0.0;
	}
	else {
		audio.volume = userVolume;
	}
};

audio.onvolumechange = function() {
	if (audio.volume === 0.0) {
		mute.innerHTML = '<i class="fas fa-volume-mute"></i>';
	}
	else if (audio.volume < 0.5) {
		mute.innerHTML = '<i class="fas fa-volume-down"></i>';
	}
	else {
		mute.innerHTML = '<i class="fas fa-volume-up"></i>';
	}
	volumeBar.value = audio.volume * 100;
};

volumeBar.oninput = function() {
	audio.volume = volumeBar.value / 100;
}