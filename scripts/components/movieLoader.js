const movieLoader = () => {
	const loaderDiv = document.createElement("div");
	loaderDiv.setAttribute("data-uuid", "movie-loader-ghost");
	loaderDiv.classList.add("ghost");
	loaderDiv.innerHTML = `
        <div id="red">
            <div id="pupil"></div>
            <div id="pupil1"></div>
            <div id="eye"></div>
            <div id="eye1"></div>
            <div id="top0"></div>
            <div id="top1"></div>
            <div id="top2"></div>
            <div id="top3"></div>
            <div id="top4"></div>
            <div id="st0"></div>
            <div id="st1"></div>
            <div id="st2"></div>
            <div id="st3"></div>
            <div id="st4"></div>
            <div id="st5"></div>
            <div id="an1"></div>
            <div id="an2"></div>
            <div id="an3"></div>
            <div id="an4"></div>
            <div id="an5"></div>
            <div id="an6"></div>
            <div id="an7"></div>
            <div id="an8"></div>
            <div id="an9"></div>
            <div id="an10"></div>
            <div id="an11"></div>
            <div id="an12"></div>
            <div id="an13"></div>
            <div id="an14"></div>
            <div id="an15"></div>
            <div id="an16"></div>
            <div id="an17"></div>
            <div id="an18"></div>
        </div>
        <div id="shadow"></div>
    `;

	return loaderDiv;
};

/**
 *
 * @param {HTMLElement} container HTML element where to inject loader
 */
export const injectMovieLoader = (container) => {
	container.append(movieLoader());
};

/**
 *
 * @param {HTMLElement} container HTML element where to remove loader from
 */
export const removeMovieLoader = (container) => {
    const element = container.querySelector('[data-uuid="movie-loader-ghost"]');
	element && container.removeChild(element);
};
