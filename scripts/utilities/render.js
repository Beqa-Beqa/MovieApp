import { createMovieCard } from "../components/index.js";

/**
 *
 * @param {HTMLElement} elem HTMLElement where the video has to be rendered
 * @param {string} url url of the video to be rendered
 * @returns {Boolean} if everything is finished successfully function returns true, otherwise false
 */
export const renderVideoSnippetYT = (elem, url) => {
	if (!elem) {
		console.error(`Invalid Element ${elem} provided!`);
		return false;
	}

	const frameElement = document.createElement("iframe");

	try {
		frameElement.setAttribute("src", url);
		frameElement.setAttribute("title", "Movie Video from YT");
		frameElement.setAttribute("allowfullscreen", true);
		frameElement.setAttribute("frameborder", "0");
		frameElement.classList.add("w-100", "h-100");
		elem.append(frameElement);
		return true;
	} catch (e) {
		console.error(`Failed to render video snipper: ${e.message}`);
		return false;
	}
};

/**
 *
 * @param {Array<Movies>} movies Array of movies to be rendered
 * @param {HTMLElement} container Container where the elements should be rendered
 * @param {MovieType} type Type of the movies e.g. 'newMovies' | 'popularMovies' | 'tvShows'
 */
export const renderMovies = (movies, container, type) => {
	const fragment = document.createDocumentFragment();

	if (!movies.length) {
		const moviesErrorContainer = document.createElement("div");
		moviesErrorContainer.classList.add("movies-error-container");
		moviesErrorContainer.innerHTML = `
			<p>Failed to load movies 😔 Try again 😊</p>
		`;

		fragment.append(moviesErrorContainer);
	} else {
		fragment.append(...movies.map((movie) => createMovieCard(movie, type)));
	}

	container.append(fragment);
};
