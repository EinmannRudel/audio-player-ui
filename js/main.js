const LS = localStorage;

//* burger

const navMenu = document.querySelector('.nav__menu');
const burgerOpen = document.querySelector('.burger__open');
const burgerClose = document.querySelector('.burger__close');
const burgerMenu = document.querySelector('.burger__menu');

//* theme

const body = document.querySelector('body');
const changeTheme = document.getElementById('theme__button');

//* theme logic

window.addEventListener('DOMContentLoaded', () => {
	const savedTheme = LS.getItem('theme');
	if (savedTheme === 'dark') {
		body.classList.add('dark');
	}
});

changeTheme.addEventListener('click', () => {
	body.classList.toggle('dark');
	saveTheme();
});

const saveTheme = () => {
	// const theme = body.classList.contains('dark') ? 'dark' : ' ';
	// LS.setItem('theme', theme);

	if (body.classList.contains('dark')) LS.setItem('theme', 'dark');
	else LS.removeItem('theme');
};

//* burger logic

burgerMenu.addEventListener('click', () => {
	navMenu.classList.toggle('active');
	burgerClose.classList.toggle('active');
	burgerOpen.classList.toggle('hidden');
});
