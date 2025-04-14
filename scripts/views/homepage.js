import { router, movieStorage } from "../init.js";
import { GLOBAL_ROUTES, PARAMS } from "../router/routes.js";
import { renderMovies, renderBackdrop, renderLoader, cleanupLoader } from "../utilities/render.js";
import { MOVIES } from "../enums.js";

export const homepageTemplate = () => {
	return `
	<!-- search  -->

	<section class="search-section">
		<div class="search container">
			<form class="main-search-form">
				<input
					class="main-search"
					type="search"
					placeholder="Search for Movies, Series or People"
				/>
				<i class="bx bx-search"></i>
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
				<button class="see-more">See more</button>
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

			<div id="new-movies-container" class="movie-cards-container">

			</div>
		</div>
	</section>

	<!-- ======================================== -->
	<!-- Popular  -->

	<section class="movies-section" id="popular-movies-section-container">
		<div class="movies container">
			<div class="movies-section-title">
				<a href=${GLOBAL_ROUTES.POPULAR_MOVIES} class="title">Popular Movies</a>
			</div>

			<div id="popular-movies-container" class="movie-cards-container">
				
			</div>
		</div>
	</section>

	<!-- ======================================== -->
	<!-- Tv-Shows  -->

	<section class="movies-section" id="tv-shows-section-container">
		<div class="movies container">
			<div class="movies-section-title">
				<a href=${GLOBAL_ROUTES.TV_SHOWS_PAGE} class="title">TV-shows</a>
			</div>

			<div id="tv-shows-container" class="movie-cards-container">
				
			</div>
		</div>
	</section>

	<div class="overlay"></div>
			
    `;
};

const handleMovieClick = (event, router) => {
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

async function initHomepage(router, movieStorage) {
	const [newMovies, popularMovies, tvShows] = await Promise.all([
		movieStorage.getNewMovies(1),
		movieStorage.getPopularMovies(1),
		movieStorage.getTvShows(1),
	]);

	const rootElement = router.rootRef;

	const newMoviesContainer = rootElement.querySelector("#new-movies-container");
	const popularMoviesContainer = rootElement.querySelector(
		"#popular-movies-container"
	);
	const tvShowsContainer = rootElement.querySelector("#tv-shows-container");

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
		(container) =>
			container.addEventListener("click", (e) =>
				handleMovieClick(e, router)
			)
	);

	renderMovies(newMovies, newMoviesContainer, MOVIES.NEW);
	renderMovies(popularMovies, popularMoviesContainer, MOVIES.POPULAR);
	renderMovies(tvShows, tvShowsContainer, MOVIES.TV);
}

export const hydrateHomepage = () => async () => await initHomepage(router, movieStorage);
