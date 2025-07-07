//* Main.js — handles UI logic, menu, theme, burger, playlist search and player module integration.

//* import player.js

import {
	setTracks,
	playTrackByIndex,
	initPlayer,
	renderPlaylist,
	tracks,
} from './player.js';

const playlistSearch = document.getElementById('playlist-search');

//* get API data

const getPlaylistData = async () => {
	const query = playlistSearch.value.trim();
	const URL = `https://deezerdevs-deezer.p.rapidapi.com/search?q=${query}`;

	const response = await fetch(URL, {
		method: 'GET',
		headers: {
			'x-rapidapi-key':
				'82ea998326msh6dea9523bafcc94p1f258ajsnbb1cb73375ef',
			'x-rapidapi-host': 'deezerdevs-deezer.p.rapidapi.com',
		},
	});
	const data = await response.json();
	setTracks(data.data);
	renderPlaylist(tracks);
	playTrackByIndex(0);
};

//* search song Enter
playlistSearch.addEventListener('keydown', (e) => {
	if (e.key === 'Enter') {
		getPlaylistData();
	}
});

//* init player

initPlayer();

//* local storage

const LS = localStorage;

//* burger

const navMenu = document.querySelector('.nav__menu');
const burgerOpen = document.querySelector('.burger__open');
const burgerClose = document.querySelector('.burger__close');
const burgerMenu = document.querySelector('.burger__menu');

//* playlist menu

const playlistToggle = document.getElementById('playlist-toggle');
const playlistContainer = document.getElementById('playlist-container');

//* theme

const body = document.querySelector('body');
const changeTheme = document.getElementById('theme__button');

//* saved theme

window.addEventListener('DOMContentLoaded', () => {
	const savedTheme = LS.getItem('theme');
	if (savedTheme === 'dark') {
		body.classList.add('dark');
	}
});

//* save current theme

const saveTheme = () => {
	if (body.classList.contains('dark')) LS.setItem('theme', 'dark');
	else LS.removeItem('theme');
};

//* change theme

changeTheme.addEventListener('click', () => {
	body.classList.toggle('dark');
	saveTheme();
});
//* burger logic

burgerMenu.addEventListener('click', () => {
	navMenu.classList.toggle('active');
	burgerClose.classList.toggle('active');
	burgerOpen.classList.toggle('hidden');
});

//* playlist menu

playlistToggle.addEventListener('click', (e) => {
	e.preventDefault();
	playlistContainer.classList.toggle('hide');
});
