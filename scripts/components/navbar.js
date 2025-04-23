import { MOVIES } from "../config/enums.js";
import { GLOBAL_ROUTES } from "../router/routes.js";
import { addEventOnce } from "../utilities/helpers.js";

const initHeaderNav = () => {
	const header = document.querySelector(".header");
	const headerNavElement = document.querySelector(".header-nav");
	const overlay = document.querySelector(".overlay");

	// Populate href attributes in header links
	headerNavElement.querySelectorAll("a").forEach((link) => {
		let route;
		switch (link.id) {
			case MOVIES.NEW:
				route = GLOBAL_ROUTES.NEW_MOVIES;
				break;
			case MOVIES.POPULAR:
				route = GLOBAL_ROUTES.POPULAR_MOVIES;
				break;
			case MOVIES.TV:
				route = GLOBAL_ROUTES.TV_SHOWS_PAGE;
				break;
		}

		link.setAttribute("href", route);
	});

	const handleNavigation = (e) => {
		const hideBurgerMenu = () => {
			headerNavElement.classList.remove("show");
			overlay.classList.remove("d-block");
		};

		const showBurgerMenu = () => {
			headerNavElement.classList.add("show");
			overlay.classList.add("d-block");
		};

		const elem = e.target;

		switch (elem.id) {
			case "headerLogo":
			case MOVIES.NEW:
			case MOVIES.POPULAR:
			case MOVIES.TV:
			case "burger-menu-close-button":
			case "overlay":
				hideBurgerMenu();
				break;
			case "burger-menu":
				showBurgerMenu();
				break;
		}
	};

	addEventOnce("click", header, handleNavigation);
};

export default initHeaderNav;
