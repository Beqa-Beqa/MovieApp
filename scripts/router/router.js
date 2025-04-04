export class Router {
	// Route which is being rendered
	#route;

	// Element's id in which we render the route
	#rootRef;

	// Routes data Router class instance will work on
	#routes;

	// Event to be fired on route change
	#event;

	// Route change event name
	#changeEvent = "routeChange";

	/**
	 *
	 * @param {string} rootRef id of the element where routes are rendered at
	 * @param {Object} routes routes object which Router class instance will work on
	 */
	constructor(rootRef, routes) {
		this.#rootRef = document.getElementById(rootRef);
		this.#routes = routes;
		this.#route = window.location.hash || this.#routes.HOME;
		this.#event = new CustomEvent(this.#changeEvent, {
			detail: { route: this.#route },
		});
	}

	get route() {
		return this.#route;
	}

	/**
	 *
	 * @param {string} newRoute
	 * @returns If the provided route is valid, changes the route and provides
	 * the new route value otherwise new error is thrown.
	 */
	set route(newRoute) {
		const routeBeforeQueryString = newRoute.split('?')[0];
		
		if (!Object.values(this.#routes).includes(routeBeforeQueryString)) {
			throw new Error("Invalid route was provided!");
		}

		this.#route = newRoute;
		this.#event.detail.route = newRoute;
		window.location.hash = newRoute;
		window.dispatchEvent(this.#event);
	}

	get changeEvent() {
		return this.#changeEvent;
	}

	/**
	 * Renders route based on current route state
	 */
	renderRoute(template, hydrator) {
		this.#rootRef.innerHTML = template;
		hydrator();
	}
}
