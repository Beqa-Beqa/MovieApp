import { createMovieCard, seeMoreCard } from "../components/index.js";

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
 * @param {Array<MovieIds>} exceptions Movie ids array which should be excluded from rendering
 */
export const renderMovies = (movies, container, type, exceptions=undefined) => {
	const fragment = document.createDocumentFragment();
	
	if (!movies.length) {
		const moviesErrorContainer = document.createElement("div");
		moviesErrorContainer.classList.add("movies-error-container");
		moviesErrorContainer.innerHTML = `
			<p>Failed to load movies 😔 Try again 😊</p>
		`;

		fragment.append(moviesErrorContainer);
	} else {
		if(exceptions && exceptions.length) movies = movies.filter(movie => !exceptions.includes(movie.id));
		fragment.append(...movies.map((movie) => createMovieCard(movie, type)));
		fragment.append(seeMoreCard(type));
	}

	container.append(fragment);
};

/**
 * 
 * @param {Event} event Dispatched event 
 * @param {HTMLElement} sectionContainer Container of which background changes
 */
export const renderBackdrop = (event, sectionContainer) => {
	const parentElem = event.target.parentElement;
	const isCardElem = parentElem.classList.contains("movie-card");
	if (isCardElem) {
		const backdropUrl = parentElem.getAttribute("data-backdrop-url");
		if (backdropUrl !== "null")
			sectionContainer.style.backgroundImage = `url(${backdropUrl})`;
	}
};


/**
 * Renders loader which is above every element
 */
export const renderLoader = () => {
	const wrapper = document.createElement('div');
	wrapper.classList.add('loader-wrapper');
	wrapper.id = "overlay-loader";
	wrapper.innerHTML = `
		<div class="three-body">
			<div class="three-body__dot"></div>
			<div class="three-body__dot"></div>
			<div class="three-body__dot"></div>
		</div>
	`
	document.body.append(wrapper);
}

/**
 * Cleans already rendered loader
 */
export const cleanupLoader = () => {
	const loader = document.getElementById('overlay-loader');
	if(loader) loader.remove();

	document.querySelectorAll('body > *:not(#overlay-loader)').forEach(element => element.classList.add('visibility-visible'));
}

/**
 * 
 * @param {HTMLElement} targetElement HTML Element where end of scroll text is written
 */
export const endOfInfiniteScroll = (targetElement, cb = undefined) => {
	cb && cb();
	targetElement.innerHTML = `
		<div class="w-100 text-center">
			<h2>End of movies</h2>
		</div>
	`;
}