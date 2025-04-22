import { Router } from "../router/router.js";
import { GLOBAL_ROUTES, PARAMS } from "../router/routes.js";

/**
 *
 * @param {Event} event Event object that occured
 * @param {Router} router Router class instance
 */
export const handleMovieClick = (event, router, isSearchCard=false) => {
	const cardElem = event.target.closest(isSearchCard ? ".search-card" : ".movie-card");
	if (cardElem) {
		const movieId = parseInt(cardElem.getAttribute("data-movie-id"));
		const movieType = cardElem.getAttribute("data-movie-type");

		// See more cards are also counted as movie card element
		// But they don't have movieId and movieType
		if (movieId && movieType) {
			router.route = `${GLOBAL_ROUTES.MOVIE_DETAILS}?${PARAMS.MOVIE_ID}=${movieId}&${PARAMS.MOVIE_TYPE}=${movieType}`;
		}
	}
};

/**
 *
 * @param {HTMLElement} triggerElement HTMLElement which is observed - action will be activated before 1000px from that element
 * @param {Function} action Action to perform when trigger activates
 */
export const watchInfiniteScroll = (triggerElement, action) => {
	const scrollObserver = new IntersectionObserver(
		async (entries) => {
			// Get first element from array and assign it to "entry"
			const [entry] = entries;

			if (entry.isIntersecting) {
				await action();
			}
		},
		{
			rootMargin: "1000px",
			threshold: 0,
		}
	);

	// Observes our scroll detector element
	scrollObserver.observe(triggerElement);

	// Returns cleanup function
	return () => scrollObserver.unobserve(triggerElement);
};


/**
 * Deactivates already active tab
 */
export const deactivateTab = () => {
	const activeTab = document.querySelector(".header-nav .link.active");
	if (activeTab) activeTab.classList.remove("active");
}

/**
 *
 * @param {HTMLElement} element navbar tab link element that has to be activated
 */
export const activateTab = (element) => {
	deactivateTab();
	element.classList.add("active");
};


/**
 * 
 * @param {Function} fn Function to debounce
 * @param {Time} time Time in ms for debounce delay
 */
export const debounce = (fn, time) => {
	let timeoutId;

	return (...args) => {
		if(timeoutId) clearTimeout(timeoutId);
		timeoutId = setTimeout(() => fn(...args), time);
	}
}