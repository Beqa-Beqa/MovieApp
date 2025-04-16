import { router } from "./init.js";
import { EVENT_STATES, GLOBAL_ROUTES, PARAMS } from "./router/routes.js";
import { homepageTemplate, hydrateHomepage } from "./views/homepage.js";
import {
	movieDetailsTemplate,
	hydrateMovieDetailsPage,
} from "./views/movieDetails.js";
import { newMoviesTemplate, hydrateNewMoviesPage } from "./views/newMovies.js";
import {
	popularMoviesTemplate,
	hydratePopularMoviesPage,
} from "./views/popularMovies.js";
import { tvShowsTemplate, hydrateTvShowsPage } from "./views/tvShows.js";
import { initHeaderNav } from "./components/index.js";
import { cleanupLoader, renderLoader } from "./utilities/render.js";
import { notFoundTemplate, hydrateNotFoundPage } from "./views/404.js";

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
		case GLOBAL_ROUTES.DEFAULT:
		case GLOBAL_ROUTES.HOME:
			[template, hydrator] = [homepageTemplate(), hydrateHomepage()];
			break;

		case GLOBAL_ROUTES.TV_SHOWS_PAGE:
			[template, hydrator] = [tvShowsTemplate(), hydrateTvShowsPage()];
			break;

		case GLOBAL_ROUTES.POPULAR_MOVIES:
			[template, hydrator] = [
				popularMoviesTemplate(),
				hydratePopularMoviesPage(),
			];
			break;

		case GLOBAL_ROUTES.NEW_MOVIES:
			[template, hydrator] = [
				newMoviesTemplate(),
				hydrateNewMoviesPage(),
			];
			break;

		case GLOBAL_ROUTES.MOVIE_DETAILS:
			[template, hydrator] = [
				movieDetailsTemplate(),
				hydrateMovieDetailsPage(params),
			];
			break;

		default:
			[template, hydrator] = [notFoundTemplate(), hydrateNotFoundPage()];
			break;
	}

	router_.renderRoute(template, hydrator);
};

// App initialization
// Manual start is needed at first, because hashchange is not fired on load.
initHeaderNav();
handleRouteChange(router);

window.addEventListener("hashchange", () => handleRouteChange(router));

const routeLoadHandler = (loadState) => {
	loadState === EVENT_STATES.LOADING
		? renderLoader()
		: loadState === EVENT_STATES.LOADED
		? cleanupLoader()
		: null;
};

router.addRouteChangeListener(routeLoadHandler);
