import { MOVIES } from "../config/enums.js";
import { getImage } from "../utilities/api.js";

export const searchMovieCard = (movie, type) => {
	const {
		backdrop_path,
		poster_path,
		title,
		id,
		release_date,
		name,
		first_air_date,
	} = movie;

	const isTvShow = type === MOVIES.TV;

	const cardContainer = document.createElement("div");
	cardContainer.classList.add("search-card");
	cardContainer.innerHTML = `
        <div class="search-image">
            <img src=${
				poster_path
					? getImage(poster_path)
					: backdrop_path
					? getImage(backdrop_path)
					: `./assets/image-not-found.jpg`
			} alt='Movie image'>
        </div>

        <div class="search-text">
            <h2>${isTvShow ? name : title ?? "No title"}</h2>
        </div>
    `;

	cardContainer.setAttribute('data-movie-id', id);
	cardContainer.setAttribute('data-movie-type', type);

	return cardContainer;
};

export const seeMoreSearchMovieCard = () => {
	const cardContainer = document.createElement("div");
	cardContainer.classList.add("search-card");
	cardContainer.innerHTML = `
        <hr/>
        <div class="search-text text-center w-100">
            <h2>+ See More</h2>
        </div>
    `;
	return cardContainer;
};
