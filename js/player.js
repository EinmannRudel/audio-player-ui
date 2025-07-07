//* save array playlist

let tracks = [];
let currentTrackIndex = 0;

//* render array playlist and add li

export const renderPlaylist = () => {
	const playlist = document.getElementById('playlist');

	playlist.innerHTML = '';

	tracks.forEach((track, index) => {
		const li = document.createElement('li');

		li.dataset.preview = track.preview;
		li.dataset.title = track.title;
		li.textContent = track.title;

		li.addEventListener('click', () => {
			playTrackByIndex(index);
		});

		playlist.appendChild(li);
	});
};

//* set Tracks

export function setTracks(newTracks) {
	tracks = newTracks;
	currentTrackIndex = 0;
}

//* do songs by index and add title, artist and automatic play 1st song

export const playTrackByIndex = (index) => {
	const track = tracks[index];
	if (!track) return;
	const player = document.getElementById('player__audio');
	const trackTitle = document.getElementById('track-title');
	const trackArtist = document.getElementById('track-artist');

	player.src = track.preview;
	player.play();
	trackTitle.textContent = track.title;
	trackArtist.textContent = track.artist.name;
	currentTrackIndex = index;
};

//* simple format time

const formatTime = (sec) => {
	const minutes = Math.floor(sec / 60);
	const seconds = Math.floor(sec % 60)
		.toString()
		.padStart(2, '0');
	return `${minutes}:${seconds}`;
};

//* init playr export

export const initPlayer = () => {
	//* player

	const player = document.getElementById('player__audio');

	const playerCurrentTime = document.querySelector('.player__current-time');
	const playerDurationTime = document.querySelector('.player__duration-time');
	const playerProgressBar = document.getElementById('progress-bar');

	//* players buttons

	const playerButtonPrev = document.querySelector('.player__button--prev');
	const playerButtonPlay = document.querySelector('.player__button--play');
	const playerButtonNext = document.querySelector('.player__button--next');

	//* players volume

	const playerVolumeButton = document.getElementById('player__volume-button');
	const volumeInput = document.querySelector('.player__volume-range');

	//* show time songs

	player.addEventListener('timeupdate', () => {
		playerCurrentTime.textContent = formatTime(player.currentTime);
		playerDurationTime.textContent = formatTime(player.duration || 0);

		playerProgressBar.value = player.currentTime;
		playerProgressBar.max = player.duration;
	});

	//* play next song auto

	player.addEventListener('ended', () => {
		if (currentTrackIndex < tracks.length - 1) {
			playTrackByIndex(currentTrackIndex + 1);
		} else {
			playTrackByIndex(0);
		}
	});

	//* visial time range

	playerProgressBar.addEventListener('input', () => {
		player.currentTime = playerProgressBar.value;
	});

	//* player button prev

	playerButtonPrev.addEventListener('click', () => {
		if (currentTrackIndex > 0) {
			playTrackByIndex(currentTrackIndex - 1);
		} else {
			playTrackByIndex(tracks.length - 1);
		}
	});

	//* player button next

	playerButtonNext.addEventListener('click', () => {
		if (currentTrackIndex < tracks.length - 1) {
			playTrackByIndex(currentTrackIndex + 1);
		} else {
			playTrackByIndex(0);
		}
	});

	//* player button play/pause

	playerButtonPlay.addEventListener('click', () => {
		player[player.paused ? 'play' : 'pause']();
	});

	//* open volume range
	playerVolumeButton.addEventListener('click', () => {
		volumeInput.classList.toggle('active');
	});

	//* change volume value

	volumeInput.addEventListener('input', () => {
		const value = volumeInput.value;
		player.volume = value / 100;
		console.log(player.volume);
	});
};

export { tracks, currentTrackIndex };
