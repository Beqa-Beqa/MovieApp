import { getImage } from "../utilities/api.js";
import { MOVIES } from '../enums.js';

const createMovieCard = (movie, type) => {
	const containerElement = document.createElement("div");
	containerElement.classList.add("movie-card");

	const {
		backdrop_path,
		poster_path,
		title,
		id,
		release_date,
        name,
        first_air_date,
	} = movie;

	const backdropUrl = getImage(backdrop_path, 1280);

	const isTvShow = type === MOVIES.TV;

	const innerContent = `
        <img src=${poster_path ? getImage(poster_path) : backdrop_path ? getImage(backdrop_path) : `./assets/image-not-found.jpg`} alt="Movie poster" />
		<div class="movie-card-description">
        	<h3>${isTvShow ? name : title}</h3>
        	<p>${isTvShow ? first_air_date : release_date}</p>
		</div>
    `;

	containerElement.innerHTML = innerContent;
	containerElement.setAttribute('data-backdrop-url', backdropUrl);
	containerElement.setAttribute('data-movie-id', id);
	containerElement.setAttribute('data-movie-type', type);

	return containerElement;
};

export default createMovieCard;