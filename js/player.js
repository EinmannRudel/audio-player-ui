const playerVolume = document.getElementById('player__volume-button');
const volumeInput = document.querySelector('.player__volume-range');

playerVolume.addEventListener('click', () => {
	volumeInput.classList.toggle('active');
});
