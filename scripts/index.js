import { router } from "./init.js";
import { GLOBAL_ROUTES, PARAMS } from "./router/routes.js";
import { homepageTemplate, hydrateHomepage } from "./views/homepage.js";
import {
	movieDetailsTemplate,
	hydrateMovieDetailsPage,
} from "./views/movieDetails.js";

const getHashParams = (route_) => {
	try {
		const route = route_.split("?");
		const routeBeforeQueryString = route[0];
		const queryParams = new URLSearchParams(route[1] || "");
		const movieId = queryParams.get(PARAMS.MOVIE_ID);

		if (routeBeforeQueryString === GLOBAL_ROUTES.MOVIE_DETAILS && !movieId)
			throw new Error(
				"No movie id was provided while trying to render movie details page!"
			);

		return {
			route: routeBeforeQueryString,
			params: { movieId },
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
	if (route === GLOBAL_ROUTES.HOME) {
		router_.renderRoute(homepageTemplate(), hydrateHomepage);
	} else if (route === GLOBAL_ROUTES.MOVIE_DETAILS) {
		router_.renderRoute(
			movieDetailsTemplate(params.movieId),
			hydrateMovieDetailsPage
		);
	}
};

// App init call
handleRouteChange(router);


window.addEventListener(router.changeEvent, () => handleRouteChange(router));