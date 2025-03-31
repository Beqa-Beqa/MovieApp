import { getImage } from "../utilities.js";

export const createMovieCard = (movie, isTvShow = false) => {
	const containerElement = document.createElement("div");
	containerElement.classList.add("movie-card");

	const {
		backdrop_path,
		poster_path,
		title,
		id,
		release_date,
		vote_average,
        name,
        first_air_date
	} = movie;

	const innerContent = `
        <img src=${poster_path ? getImage(poster_path) : `./assets/image-not-found.jpg`} alt="Movie poster" />
        <h3>${isTvShow ? name : title}</h3>
        <p>${isTvShow ? first_air_date : release_date}</p>
    `;

	containerElement.innerHTML = innerContent;

	return containerElement;
};

export default createMovieCard;

// adult: false
// backdrop_path: "/m2mzlsJjE3UAqeUB5fLUkpWg4Iq.jpg"
// genre_ids: Array(2)
// id: 1165067
// original_language: "en"
// original_title: "Cosmic Chaos"
// overview: "Battles in virtual reality, survival in a post-apocalyptic wasteland, a Soviet spaceship giving a distress signal - Fantastic stories created with advanced special effects and passion."
// popularity: 575.5696
// poster_path: "/mClzWv7gBqgXfjZXp49Enyoex1v.jpg"
// release_date: "2023-08-03"
// title: "Cosmic Chaos"
// video: false
// vote_average: 5.15
// vote_count: 10
