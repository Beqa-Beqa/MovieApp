import { router, movieStorage } from "../config/init.js";
import { GLOBAL_ROUTES, PARAMS } from "../router/routes.js";
import { renderMovies, renderBackdrop } from "../utilities/render.js";
import {
	addEventOnce,
	debounce,
	handleMovieClick,
} from "../utilities/helpers.js";
import { MOVIES, PAGE_MOVIE_COUNT } from "../config/enums.js";
import { Router } from "../router/router.js";
import { MovieStorage } from "../store/storage.js";
import {
	searchMovieCard,
	seeMoreSearchMovieCard,
} from "../components/index.js";
import { getMoviesBySearch } from "../utilities/api.js";

export const homepageTemplate = () => {
	return `
	<!-- search  -->

	<section class="search-section">
		<div class="search container">
			<form class="main-search-form">
				<input
					id="movie-search-input"
					class="main-search"
					type="search"
					placeholder="Search for Movies, Series or People"
				/>
				<i class="bx bx-search"></i>

				<div id="search-cards-container" class="searching"><!-- Search cards go here --></div>
			</form>
		</div>
	</section>

	<!-- ==================================================================== -->
	<!-- introduction  -->
	<section class="hero-section">
		<div class="hero-section-inner">
			<div class="intro-text container">
				<h1>Script Movie</h1>
				<p>
					"Welcome to Script Movie – Your Cinematic Journey Starts
					Here!"
				</p>
			</div>
		</div>
	</section>

	<!-- ======================================== -->
	<!-- new movies  -->

	<section class="movies-section" id="new-movies-section-container">
		<div class="movies container">
			<div class="movies-section-title">
				<a href=${GLOBAL_ROUTES.NEW_MOVIES} class="title">New Movies</a>
			</div>

			<div data-mouseover-event="" id="new-movies-container" class="movie-cards-container"><!-- New movies go here --></div>
		</div>
	</section>

	<!-- ======================================== -->
	<!-- Popular  -->

	<section class="movies-section" id="popular-movies-section-container">
		<div class="movies container">
			<div class="movies-section-title">
				<a href=${GLOBAL_ROUTES.POPULAR_MOVIES} class="title">Popular Movies</a>
			</div>

			<div data-mouseover-event="" id="popular-movies-container" class="movie-cards-container"><!-- Popular movies go here --></div>
		</div>
	</section>

	<!-- ======================================== -->
	<!-- Tv-Shows  -->

	<section class="movies-section" id="tv-shows-section-container">
		<div class="movies container">
			<div class="movies-section-title">
				<a href=${GLOBAL_ROUTES.TV_SHOWS_PAGE} class="title">TV-shows</a>
			</div>

			<div data-mouseover-event="" id="tv-shows-container" class="movie-cards-container"><!-- Tv shows go here --></div>
		</div>
	</section>

	<div class="overlay"></div>
			
    `;
};

/**
 *
 * @param {Router} router Router class instnace
 * @param {MovieStorage} movieStorage MovieStorage class instance
 */
async function initHomepage(router, movieStorage) {
	const [newMovies, popularMovies, tvShows] = await Promise.all([
		movieStorage.getNewMovies({ page: 1 }),
		movieStorage.getPopularMovies({ page: 1 }),
		movieStorage.getTvShows({ page: 1 }),
	]);

	const rootElement = router.rootRef;

	const newMoviesContainer = rootElement.querySelector(
		"#new-movies-container"
	);
	const popularMoviesContainer = rootElement.querySelector(
		"#popular-movies-container"
	);
	const tvShowsContainer = rootElement.querySelector("#tv-shows-container");
	const movieSearchInput = rootElement.querySelector("#movie-search-input");
	const searchCardsContainer = rootElement.querySelector(
		"#search-cards-container"
	);

	searchCardsContainer.addEventListener("click", (e) =>
		handleMovieClick(e, router, true)
	);

	// Clear the containers before rendering new content
	newMoviesContainer.innerHTML = "";
	popularMoviesContainer.innerHTML = "";
	tvShowsContainer.innerHTML = "";

	const newMoviesSectionContainer = rootElement.querySelector(
		"#new-movies-section-container"
	);
	const popularMoviesSectionContainer = rootElement.querySelector(
		"#popular-movies-section-container"
	);
	const tvShowsSectionContainer = rootElement.querySelector(
		"#tv-shows-section-container"
	);

	addEventOnce("mouseover", newMoviesContainer, (e) =>
		renderBackdrop(e, newMoviesSectionContainer)
	);
	addEventOnce("mouseover", popularMoviesContainer, (e) =>
		renderBackdrop(e, popularMoviesSectionContainer)
	);
	addEventOnce("mouseover", tvShowsContainer, (e) =>
		renderBackdrop(e, tvShowsSectionContainer)
	);

	[newMoviesContainer, popularMoviesContainer, tvShowsContainer].forEach(
		(container) =>
			addEventOnce("click", container, (e) => handleMovieClick(e, router))
	);

	renderMovies(newMovies, newMoviesContainer, MOVIES.NEW);
	renderMovies(popularMovies, popularMoviesContainer, MOVIES.POPULAR);
	renderMovies(tvShows, tvShowsContainer, MOVIES.TV);

	const getSearchLink = (search) =>
		`${GLOBAL_ROUTES.SEARCH_PAGE}?${PARAMS.MOVIE_SEARCH}=${search}`;

	const searchListener = debounce(async (search) => {
		searchCardsContainer.innerHTML = "";
		if (search.trim()) {
			const fragment = document.createDocumentFragment();
			const fetchResult = (await getMoviesBySearch(search)).data;
			const searchedMovies = fetchResult && fetchResult.results;
			searchedMovies &&
				searchedMovies.forEach((movie) =>
					fragment.append(searchMovieCard(movie, MOVIES.POPULAR))
				);

			if (fetchResult && fetchResult.total_results > PAGE_MOVIE_COUNT) {
				const seeMoreCard = seeMoreSearchMovieCard();
				addEventOnce(
					"click",
					seeMoreCard,
					() => (router.route = getSearchLink(search))
				);
				fragment.append(seeMoreCard);
			}

			searchCardsContainer.append(fragment);
		}
	}, 700);

	addEventOnce("input", movieSearchInput, (e) =>
		searchListener(e.target.value)
	);
	addEventOnce("keydown", movieSearchInput, (e) => {
		const search = e.target.value.trim();
		if (search && e.key === "Enter") router.route = getSearchLink(search);
	});
}

export const hydrateHomepage = () => async () =>
	await initHomepage(router, movieStorage);
