
const initHeaderNav = () => {
	const headerNavElement = document.querySelector(".header-nav");
	const burgerMenu = document.querySelector(".bx-menu");
	const overlay = document.querySelector(".overlay");
	const burgerMenuCloseBtn = document.getElementById(
		"burger-menu-close-button"
	);
	
	burgerMenuCloseBtn.addEventListener("click", () => {
		headerNavElement.classList.remove("show");
		overlay.style.display = "none";
	});

	burgerMenu.addEventListener("click", () => {
		headerNavElement.classList.add("show");
		overlay.style.display = "block";
	});

	overlay.addEventListener("click", () => {
		headerNavElement.classList.remove("show");
		overlay.style.display = "none";
	});


};






export default initHeaderNav;