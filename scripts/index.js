import { router } from "./init.js";
import { GLOBAL_ROUTES, PARAMS } from "./router/routes.js";
import { homepageTemplate, hydrateHomepage } from "./views/homepage.js";
import {
	movieDetailsTemplate,
	hydrateMovieDetailsPage,
} from "./views/movieDetails.js";
import { newMoviesTemplate } from './views/newMovies.js';
import { popularMoviesTemplate } from './views/popularMovies.js';
import { tvShowsTemplate } from './views/tvShows.js';
import { initHeaderNav } from "./components/index.js";
import { cleanupLoader, renderLoader } from "./utilities/render.js";

renderLoader();

const getHashParams = (route_) => {
	try {
		const route = route_.split("?");
		const routeBeforeQueryString = route[0];
		const queryParams = new URLSearchParams(route[1] || "");
		const movieId = queryParams.get(PARAMS.MOVIE_ID);
		const movieType = queryParams.get(PARAMS.MOVIE_TYPE);

		if (
			routeBeforeQueryString === GLOBAL_ROUTES.MOVIE_DETAILS &&
			(!movieId || !movieType)
		)
			throw new Error(
				"No movie id or movie type was provided while trying to render movie details page!"
			);

		return {
			route: routeBeforeQueryString,
			params: { movieId, movieType },
		};
	} catch (e) {
		console.error(e);
		return {
			route: GLOBAL_ROUTES.HOME,
			params: {},
		};
	}
};

const handleRouteChange = (router_) => {
	const { route, params } = getHashParams(router_.route);

	let template, hydrator;

	switch (route) {
		case GLOBAL_ROUTES.TV_SHOWS_PAGE:
			template = tvShowsTemplate();
			break;

		case GLOBAL_ROUTES.POPULAR_MOVIES:
			template = popularMoviesTemplate();
			break;

		case GLOBAL_ROUTES.NEW_MOVIES:
			template = newMoviesTemplate();
			break;

		case GLOBAL_ROUTES.MOVIE_DETAILS:
			[template, hydrator] = [
				movieDetailsTemplate(),
				hydrateMovieDetailsPage(params),
			];
			break;

		default:
			[template, hydrator] = [homepageTemplate(), hydrateHomepage()];
	}

	router_.renderRoute(template, hydrator);
};


// App initialization
// Manual start is needed at first, because hashchange is not fired on load.
initHeaderNav();
handleRouteChange(router);

window.addEventListener('hashchange', () => handleRouteChange(router));


const routerRenderEvent = router.getEvent();
window.addEventListener(routerRenderEvent.eventName, (e) => {
	e.detail.state === routerRenderEvent.eventStates.LOADING ? renderLoader()
	: e.detail.state === routerRenderEvent.eventStates.LOADED ? cleanupLoader()
	: null;
});