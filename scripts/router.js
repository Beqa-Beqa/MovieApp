import { ROUTES } from './dataConstants.js';

export class Router {
    // Route which is being rendered
    #route = window.sessionStorage.getItem(ROUTES.ADDRESS_NAME) ?? ROUTES.VALUES.HOME;

    // Element's id in which we render the route
    #rootRef

    constructor(rootRef) {
        this.#rootRef = document.getElementById(rootRef);
    }

    /**
     * 
     * @param {string} newRoute
     * @returns If the provided route is valid, changes the route and provides 
     * the new route value otherwise new error is thrown.
     */
    changeRoute(newRoute) {
        if(Object.values(ROUTES.VALUES).includes(newRoute)) {
            this.#route = newRoute;
            window.sessionStorage.setItem(ROUTES.ADDRESS_NAME, this.#route);
            this.renderRoute();
            return this.#route;
        }

        throw new Error('Invalid route was provided!');
    }

    renderRoute() {
        const routeKey = Object.entries(ROUTES.VALUES).find(([key, value]) => value === this.#route)[0];
        this.#rootRef.innerHTML = ROUTES.TEMPLATES[routeKey]();
    };

    getCurrentRoute() {
        return this.#route;
    }
}