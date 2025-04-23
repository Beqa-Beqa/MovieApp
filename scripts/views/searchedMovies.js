import { Router } from "../router/router.js";
import { router } from "../config/init.js";
import { NOT_FOUND } from "../router/routes.js";
import { getMoviesBySearch } from "../utilities/api.js";
import {
	addEventOnce,
	handleMovieClick,
	watchInfiniteScroll,
} from "../utilities/helpers.js";
import { MOVIES, PAGE_MOVIE_COUNT } from "../config/enums.js";
import { createMovieCard } from "../components/movieCard.js";
import { endOfInfiniteScroll } from "../utilities/render.js";

export const searchedMoviesTemplate = () => {
	return `
    	<section class="movies-page-section">
			<div class="movies-page container">
				<div class="movies-page-title">
					<h1 class="movies-title"></h1>
				</div>

				<div class="movies-page-cards"><!-- Cards go here --></div>
				<div id="scroll-trigger-element"></div>
                <div id="scroll-end-element"></div>
			</div>
		</section>
    `;
};

/**
 *
 * @param {Router} router Router class instance
 * @param {Params} params Search parameters from hash
 */
const initSearchedMoviesPage = async (router, params) => {
	if (!params.movieSearch) return (router.route = NOT_FOUND);
	let pageOfSearch = 1;

	router.rootRef.querySelector(
		".movies-title"
	).textContent = `Movies by search: "${params.movieSearch}"`;

	const moviesContainer = router.rootRef.querySelector(".movies-page-cards");

	addEventOnce("click", moviesContainer, (e) => handleMovieClick(e, router));

	const appendMovies = (movies) => {
		if (movies && movies.length) {
			const moviesFragment = document.createDocumentFragment();
			movies.forEach((movie) =>
				moviesFragment.append(createMovieCard(movie, MOVIES.POPULAR))
			);
			moviesContainer.append(moviesFragment);
		} else {
			const notFoundDiv = document.createElement("div");
			notFoundDiv.classList.add("movies-error-container");
			notFoundDiv.innerHTML = `
                <p>No movies found 😔 Try something else 😊</p>
            `;
			moviesContainer.append(notFoundDiv);
		}
	};

	const fetchMoviesAndAppend = async () => {
		const movieFetchResult = await getMoviesBySearch(
			params.movieSearch,
			pageOfSearch
		);

		if (movieFetchResult.success) {
			pageOfSearch++;
			const movies = movieFetchResult.data.results;
			appendMovies(movies);

			return {
				totalResults: movieFetchResult.data.total_results,
				currentResults: movies.length,
			};
		}
	};

	const count = await fetchMoviesAndAppend();

	const scrollTrigger = router.rootRef.querySelector(
		"#scroll-trigger-element"
	);

	if (count.totalResults && count.totalResults > PAGE_MOVIE_COUNT) {
		const unobserve = watchInfiniteScroll(scrollTrigger, async () => {
			const count = await fetchMoviesAndAppend();
			if (count.currentResults < PAGE_MOVIE_COUNT) {
				const scrollEndElement = router.rootRef.querySelector(
					"#scroll-end-element"
				);
				endOfInfiniteScroll(scrollEndElement, unobserve);
			}
		});
	}
};

export const hydrateSearchedMoviesPage = (params) => async () =>
	await initSearchedMoviesPage(router, params);
