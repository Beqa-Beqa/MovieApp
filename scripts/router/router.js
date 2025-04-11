export class Router {
	// Element in which we render templates
	#rootRef;

	// Routes data Router class instance will work on
	#routes;

	/**
	 *
	 * @param {string} rootRef id of the element where routes are rendered at
	 * @param {Object} routes routes object which Router class instance will work on
	 */
	constructor(rootRef, routes) {
		this.#rootRef = document.getElementById(rootRef);
		this.#routes = routes;
	}

	get route() {
		return window.location.hash || this.#routes.HOME;
	}

	/**
	 *
	 * @param {string} newRoute
	 * @returns If the provided route is valid, changes the route and provides
	 * the new route value otherwise new error is thrown.
	 */
	set route(newRoute) {
		const routeBeforeQueryString = newRoute.split("?")[0];
		
		if (!Object.values(this.#routes).includes(routeBeforeQueryString)) {
			throw new Error("Invalid route was provided!");
		}
		
		window.location.hash = newRoute;
	}

	get rootRef () {
		return this.#rootRef;
	}

	/**
	 * @param {string} template Template string
	 * @param {Function} hydrator Template string hydrator
	 * Renders route based on current route state
	 */
	renderRoute(template, hydrator = () => {}) {
		this.#rootRef.innerHTML = template;
		hydrator();
	}
}
