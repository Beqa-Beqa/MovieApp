import { router, movieStorage } from '../init.js';
import { GLOBAL_ROUTES, PARAMS } from "../router/routes.js";
import { createMovieCard } from '../components/movieCard.js';
import { MOVIES } from '../enums.js';

export const homepageTemplate = async () => {
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
	<section class="introduction">
		<div class="intro">
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
				<h2>New Movies</h2>
			</div>

			<div id="new-movies-container" class="movie-cards-container">

			</div>
		</div>
		<div class="movies-overlay"></div>
	</section>

	<!-- ======================================== -->
	<!-- Popular  -->

	<section class="movies-section" id="popular-movies-section-container">
		<div class="movies container">
			<div class="movies-section-title">
				<h2>Popular Movies</h2>
			</div>

			<div id="popular-movies-container" class="movie-cards-container">
				
			</div>
		</div>
		<div class="movies-overlay"></div>
	</section>

	<!-- ======================================== -->
	<!-- Tv-Shows  -->

	<section class="movies-section" id="tv-shows-section-container">
		<div class="movies container">
			<div class="movies-section-title">
				<h2>TV-shows</h2>
			</div>

			<div id="tv-shows-container" class="movie-cards-container">
				
			</div>
		</div>
		<div class="movies-overlay"></div>
	</section>

	<div class="overlay"></div>
			
    `;
};

const renderMovies = (movies, container, type) => {
	const fragment = document.createDocumentFragment();

	if (!movies) fragment.append("ERROR ERROR ERROR ERROR ERROR ERROR");
	else
		fragment.append(
			...movies.map((movie) => createMovieCard(movie, type))
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

const handleMovieClick = (event, router) => {
	const parentElem = event.target.parentElement;
	const isCardElem = parentElem.classList.contains("movie-card");
	if (isCardElem) {
		const movieId = parseInt(parentElem.getAttribute("data-movie-id"));
		const movieType = parentElem.getAttribute('data-movie-type')
		router.route = `${GLOBAL_ROUTES.MOVIE_DETAILS}?${PARAMS.MOVIE_ID}=${movieId}&${PARAMS.MOVIE_TYPE}=${movieType}`;
	}
};

async function initHomepage(router, movieStorage) {
	const [newMovies, popularMovies, tvShows] = await Promise.all([
		movieStorage.getNewMovies(),
		movieStorage.getPopularMovies(),
		movieStorage.getTvShows(),
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
		(container) => container.addEventListener("click", (e) => handleMovieClick(e, router))
	);

	renderMovies(newMovies, newMoviesContainer, MOVIES.NEW);
	renderMovies(popularMovies, popularMoviesContainer, MOVIES.POPULAR);
	renderMovies(tvShows, tvShowsContainer, MOVIES.TV);
};

export const hydrateHomepage = initHomepage.bind(null, router, movieStorage);