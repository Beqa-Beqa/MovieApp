import { MOVIES } from "../enums.js";
import { GLOBAL_ROUTES } from "../router/routes.js";

const initHeaderNav = (router) => {
	const header = document.querySelector(".header");
	const headerNavElement = document.querySelector(".header-nav");
	const overlay = document.querySelector(".overlay");

	header.addEventListener("click", (e) => {
		const hideBurgerMenu = () => {
			headerNavElement.classList.remove("show");
			overlay.classList.remove("d-block");
		};

		const showBurgerMenu = () => {
			headerNavElement.classList.add("show");
			overlay.classList.add("d-block");
		};

		const elem = e.target;

		let targetRoute;

		switch (elem.id) {
			case "headerLogo":
				targetRoute = GLOBAL_ROUTES.HOME;
				break;
			case MOVIES.NEW:
				targetRoute = GLOBAL_ROUTES.NEW_MOVIES;
				hideBurgerMenu();
				break;
			case MOVIES.POPULAR:
				targetRoute = GLOBAL_ROUTES.POPULAR_MOVIES;
				hideBurgerMenu();
				break;
			case MOVIES.TV:
				targetRoute = GLOBAL_ROUTES.TV_SHOWS_PAGE;
				hideBurgerMenu();
				break;
			case "burger-menu-close-button":
			case "overlay":
				hideBurgerMenu();
				break;
			case "burger-menu":
				showBurgerMenu();
				break;
		}

		if (targetRoute) router.route = targetRoute;
	});
};

export default initHeaderNav;
