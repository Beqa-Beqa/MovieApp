import { createMovieCard } from "../components/index.js";
import { MOVIES } from "../config/enums.js";
import { router, movieStorage } from "../config/init.js";
import {
	activateTab,
	addEventOnce,
	watchInfiniteScroll,
} from "../utilities/helpers.js";
import { Router } from "../router/router.js";
import { MovieStorage } from "../store/storage.js";
import { handleMovieClick } from "../utilities/helpers.js";

export const tvShowsTemplate = () => {
	return `
    	<section class="movies-page-section">
			<div class="movies-page container">
				<div class="movies-page-title">
					<h1 class="movies-title">Tv Shows</h1>
				</div>

				<div class="movies-page-cards"><!-- Cards go here --></div>
				<div id="scroll-trigger-element"></div>
			</div>
		</section>
    `;
};

/**
 *
 * @param {Router} router Router class instance
 * @param {MovieStorage} movieStorage MovieStorage class instance
 */
const initTvShowsPage = async (router, movieStorage) => {
	const moviesContainer = router.rootRef.querySelector(".movies-page-cards");

	addEventOnce("click", moviesContainer, (e) => {
		handleMovieClick(e, router);
	});

	const appendMovies = (movies) => {
		const moviesFragment = document.createDocumentFragment();
		movies.forEach((movie) =>
			moviesFragment.append(createMovieCard(movie, MOVIES.TV))
		);
		moviesContainer.append(moviesFragment);
	};

	const moviesToAppend = await movieStorage.getTvShows({
		page: 1,
		reset: true,
	});

	appendMovies(moviesToAppend);

	const fetchMoviesAndAppend = async () =>
		appendMovies(await movieStorage.getTvShows());
	const scrollTrigger = router.rootRef.querySelector(
		"#scroll-trigger-element"
	);

	watchInfiniteScroll(scrollTrigger, fetchMoviesAndAppend);
};

export const hydrateTvShowsPage = () => async () =>
	await initTvShowsPage(router, movieStorage);
