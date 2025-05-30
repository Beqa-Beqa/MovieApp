import { EVENT_STATES, NOT_FOUND } from "./routes.js";

export class Router {
	// Element in which we render templates
	#rootRef;

	// Routes data Router class instance will work on
	#routes;

	// Event data that contains
	// event that is fired after route render starts
	// and after route ender ends
	#event;


	#eventName = "routeStateChange";

	/**
	 *
	 * @param {string} rootRef id of the element where routes are rendered at
	 * @param {Object} routes routes object which Router class instance will work on
	 */
	constructor(rootRef, routes) {
		this.#rootRef = document.getElementById(rootRef);
		this.#routes = routes;

		// state = 'loading' || 'loaded'
		/**
		 * 
		 * @param {'loading' | 'loaded'} state state if route is loading or not
		 * @returns renderStateChange event based on passed state
		 */
		this.#event = (state = EVENT_STATES.LOADED) =>
			new CustomEvent(this.#eventName, {
				detail: { state },
			})
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
		try {
			window.dispatchEvent(this.#event(EVENT_STATES.LOADING));

			const routeBeforeQueryString = newRoute.split("?")[0];
			
			if (!Object.values(this.#routes).includes(routeBeforeQueryString)) {
				throw new Error("Invalid route was provided!");
			}
			
			window.location.hash = newRoute;
		} catch (e) {
			console.error(`Something went wrong while changing routes: ${e}`);
			window.location.hash = NOT_FOUND;
		} finally {
			window.dispatchEvent(this.#event(EVENT_STATES.LOADED));
		}
	}

	get rootRef() {
		return this.#rootRef;
	}

	/**
	 * 
	 * @param {Function} cb Listener
	 */
	addRouteChangeListener(cb) {
		const handler = (e) => cb(e.detail.state);
		window.addEventListener(this.#eventName, handler);
	}

	/**
	 * @param {string} template Template string
	 * @param {Function} hydrator Template string hydrator
	 * Renders route based on current route state
	 */
	async renderRoute(template, hydrator = () => {}) {
		window.dispatchEvent(this.#event(EVENT_STATES.LOADING));
		try {
			this.#rootRef.innerHTML = template;
			await hydrator();

			window.scrollTo({
				top: 0,
				left: 0
			});
		} catch (e) {
			console.error(`Something went wrong while rendering route. ${e}`);
			this.route = NOT_FOUND;
		} finally {
			window.dispatchEvent(this.#event(EVENT_STATES.LOADED));
		}
	}
}
