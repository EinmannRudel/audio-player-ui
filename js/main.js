const navMenu = document.querySelector('.nav__menu');
const burgerOpen = document.querySelector('.burger__open');
const burgerClose = document.querySelector('.burger__close');

const burgerMenu = document.querySelector('.burger__menu');

burgerMenu.addEventListener('click', () => {
	navMenu.classList.toggle('active');
	burgerClose.classList.toggle('active');
	burgerOpen.classList.toggle('hidden');
});
