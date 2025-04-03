
const initHeaderNav = () => {
	const headerNavElement = document.querySelector(".header-nav");
	const headerLinks = headerNavElement.querySelectorAll('.link')
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






	headerLinks.forEach((link) => {
		const hoverMenu = link.parentElement.querySelector(".hover-menu");
		if (!hoverMenu) return;

		const handleMouseEnter = () => {
			hoverMenu.classList.add("show", "hover-menu-open");
		};

		const handleMouseLeave = (event) => {
			if (!link.contains(event.relatedTarget) && !hoverMenu.contains(event.relatedTarget)) {
				hoverMenu.classList.remove("show", "hover-menu-open");
			}
		};

		link.addEventListener("mouseenter", handleMouseEnter);
		link.addEventListener("mouseleave", handleMouseLeave);
		hoverMenu.addEventListener("mouseleave", handleMouseLeave);

		const cleanup = () => {
			link.removeEventListener("mouseenter", handleMouseEnter);
			link.removeEventListener("mouseleave", handleMouseLeave);
			hoverMenu.removeEventListener("mouseleave", handleMouseLeave);
		};

		link.cleanup = cleanup;
	});


	

};






export default initHeaderNav;