import { Router } from "../router/router.js";
import { GLOBAL_ROUTES, PARAMS } from "../router/routes.js";

/**
 * 
 * @param {Event} event Event object that occured
 * @param {Router} router Router class instance
 */
export const handleMovieClick = (event, router) => {
	const cardElem = event.target.closest(".movie-card");
	if (cardElem) {
		const movieId = parseInt(cardElem.getAttribute("data-movie-id"));
		const movieType = cardElem.getAttribute("data-movie-type");

		// See more cards are also counted as movie card element
		// But they don't have movieId and movieType
		if(movieId && movieType) {
			router.route = `${GLOBAL_ROUTES.MOVIE_DETAILS}?${PARAMS.MOVIE_ID}=${movieId}&${PARAMS.MOVIE_TYPE}=${movieType}`;
		}
	}
};
