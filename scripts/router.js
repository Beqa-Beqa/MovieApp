export class Router {
    // Route which is being rendered
    #route

    // Element's id in which we render the route
    #rootRef

    // Routes data Router class instance will work on
    #routes

    /**
     * 
     * @param {string} rootRef id of the element where routes are rendered at
     * @param {Object} routes routes object which Router class instance will work on
     * It must contain ADDRESS_NAME (string), VALUES (object), TEMPLATES (object) 
     * e.g.
     * ADDRESS_NAME = 'my_address_in_session_storage'
     * VALUES = { HOME: 'homepage', ABOUT: 'about', ... }
     * TEMPLATES = { HOME: () => '<h1>Hello from homepage</h1>', ... }
     */
    constructor(rootRef, routes) {
        this.#rootRef = document.getElementById(rootRef);
        this.#routes = routes;
        this.#route = window.sessionStorage.getItem(this.#routes.ADDRESS_NAME) ?? this.#routes.VALUES.HOME;
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
        if(!Object.values(this.#routes.VALUES).includes(newRoute)) {
            throw new Error('Invalid route was provided!');
        };

        this.#route = newRoute;
        window.sessionStorage.setItem(this.#routes.ADDRESS_NAME, this.#route);
        this.renderRoute();
    }

    /**
     * Renders route based on current route state
     */
    renderRoute() {
        const routeKey = Object.entries(this.#routes.VALUES).find(([key, value]) => value === this.#route)[0];
        this.#rootRef.innerHTML = this.#routes.TEMPLATES[routeKey]();
    };
}