import { Router } from "../router/router.js";
import { MovieStorage } from "../store/storage.js";
import { MOVIES } from "../config/enums.js";
import { router, movieStorage } from "../config/init.js";
import { createMovieCard } from "../components/index.js";
import { activateTab, watchInfiniteScroll } from "../utilities/helpers.js";
import { handleMovieClick } from "../utilities/helpers.js";

export const popularMoviesTemplate = () => {
	return `
    	<section class="movies-page-section">
			<div class="movies-page container">
				<div class="movies-page-title">
					<h1 class="movies-title">Popular Movies</h1>
				</div>

				<div class="movies-page-cards"><!-- Cards go here --></div>
				<div id="scroll-trigger-element"></div>
			</div>
		</section>
    `;
}

/**
 *
 * @param {Router} router Router class instance
 * @param {MovieStorage} movieStorage MovieStorage class instance
 */
const initPopularMoviesPage = async (router, movieStorage) => {    
    const moviesContainer = router.rootRef.querySelector(
        ".movies-page-cards"
    );

    moviesContainer.addEventListener("click", (e) => handleMovieClick(e, router));

    const appendMovies = (movies) => {
        const moviesFragment = document.createDocumentFragment();
        movies.forEach((movie) =>
            moviesFragment.append(createMovieCard(movie, MOVIES.POPULAR))
        );
        moviesContainer.append(moviesFragment);
    };

    const moviesToAppend = await movieStorage.getPopularMovies({
        page: 1,
        reset: true,
    });

    appendMovies(moviesToAppend);

    const fetchMoviesAndAppend = async () =>
        appendMovies(await movieStorage.getNewMovies());
    const scrollTrigger = router.rootRef.querySelector(
        "#scroll-trigger-element"
    );

    watchInfiniteScroll(scrollTrigger, fetchMoviesAndAppend);
};

export const hydratePopularMoviesPage = () => async () =>
    await initPopularMoviesPage(router, movieStorage);
