import { Router } from "./router.js";
import { GLOBAL_ROUTES, PARAMS } from "./routes.js";
import { TEMPLATES } from "./templates.js";
import { createMovieCard, initHeaderNav } from "./components/index.js";
import { MovieStorage } from "./storage.js";

const router = new Router("root", GLOBAL_ROUTES);
const movieStorage = new MovieStorage();

const renderMovies = (movies, container, isTvShow = false) => {
	const fragment = document.createDocumentFragment();
	if (!movies) fragment.append("ERROR ERROR ERROR ERROR ERROR ERROR");

	else
		fragment.append(
			...movies.map((movie) => createMovieCard(movie, isTvShow))
		);
	container.append(fragment);
};

const renderBackdrop = (event, sectionContainer) => {
	const parentElem = event.target.parentElement;
	const isCardElem = parentElem.classList.contains("movie-card");
	if (isCardElem) {
		const backdropUrl = parentElem.getAttribute("data-backdrop-url");
		if (backdropUrl !== "null")
			sectionContainer.style.backgroundImage = `url(${backdropUrl})`;
	}
};

const handleMovieClick = (event) => {
	const parentElem = event.target.parentElement;
	const isCardElem = parentElem.classList.contains("movie-card");
	if (isCardElem) {
		const movieId = parseInt(parentElem.getAttribute("data-movie-id"));
		router.route = `${GLOBAL_ROUTES.MOVIE_DETAILS}?movie_id=${movieId}`;
	}
};

const initHomepage = async () => {
	const [newMovies, popularMovies, tvShows] = await Promise.all([
		movieStorage.getNewMovies(1),
		movieStorage.getPopularMovies(1),
		movieStorage.getTvShows(1),
	]);

	const newMoviesContainer = document.getElementById("new-movies-container");
	const popularMoviesContainer = document.getElementById(
		"popular-movies-container"
	);
	const tvShowsContainer = document.getElementById("tv-shows-container");

	// Clear the containers before rendering new content
	newMoviesContainer.innerHTML = "";
	popularMoviesContainer.innerHTML = "";
	tvShowsContainer.innerHTML = "";

	const newMoviesSectionContainer = document.getElementById(
		"new-movies-section-container"
	);
	const popularMoviesSectionContainer = document.getElementById(
		"popular-movies-section-container"
	);
	const tvShowsSectionContainer = document.getElementById(
		"tv-shows-section-container"
	);

	newMoviesContainer.addEventListener("mouseover", (e) =>
		renderBackdrop(e, newMoviesSectionContainer)
	);
	popularMoviesContainer.addEventListener("mouseover", (e) =>
		renderBackdrop(e, popularMoviesSectionContainer)
	);
	tvShowsContainer.addEventListener("mouseover", (e) =>
		renderBackdrop(e, tvShowsSectionContainer)
	);

	[newMoviesContainer, popularMoviesContainer, tvShowsContainer].forEach(
		(container) => container.addEventListener("click", handleMovieClick)
	);

	renderMovies(newMovies, newMoviesContainer);
	renderMovies(popularMovies, popularMoviesContainer);
	renderMovies(tvShows, tvShowsContainer, true);
};

const initMovieDetailsPage = async () => {
	const goBackH1 = document.querySelector("h1");
	goBackH1.addEventListener(
		"click",
		() => (router.route = GLOBAL_ROUTES.HOME)
	);
};

const getHashParams = (r) => {
	try {
		const route = r.split('?');
		const routeBeforeQueryString = route[0];
		const queryParams = new URLSearchParams(route[1] || '');
		const movieId = queryParams.get(PARAMS.MOVIE_ID);
		
		if(routeBeforeQueryString === GLOBAL_ROUTES.MOVIE_DETAILS
			&& !movieId) throw new Error('No movie id was provided while trying to render movie details page!');
			
		return {
			route: routeBeforeQueryString,
			params: queryParams
		}
	} catch (e) {
		console.error(e);
		return {
			route: '',
			params: new URLSearchParams()
		}
	}
}

// App init IIFE
(() => {
	const { route, params } = getHashParams(router.route);

		if (route === GLOBAL_ROUTES.HOME) {
		router.renderRoute(TEMPLATES.HOME());
		// initHeaderNav();
		initHomepage();
	} else if (route === GLOBAL_ROUTES.MOVIE_DETAILS) {
		router.renderRoute(TEMPLATES.MOVIE_DETAILS(params.get(PARAMS.MOVIE_ID)));
		// initHeaderNav();
		initMovieDetailsPage();
	}
})();

window.addEventListener(router.changeEvent, (e) => {
	const { route, params } = getHashParams(e.detail.route);

	if (route === GLOBAL_ROUTES.HOME) {
		router.renderRoute(TEMPLATES.HOME());
		// initHeaderNav();
		initHomepage();
	} else if (route === GLOBAL_ROUTES.MOVIE_DETAILS) {
		router.renderRoute(TEMPLATES.MOVIE_DETAILS(params.get(PARAMS.MOVIE_ID)));
		// initHeaderNav();
		initMovieDetailsPage();
	}
});