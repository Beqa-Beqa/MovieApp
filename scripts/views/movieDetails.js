import { router, movieStorage } from "../init.js";
import {
	getCreditsByMovieId,
	getImage,
	getVideoSnippetsById,
	getVideoYTURL,
} from "../utilities/utilities.js";
import { GLOBAL_ROUTES } from "../router/routes.js";
import { renderVideoSnippetYT } from "../utilities/render.js";
import { MOVIES } from "../enums.js";
import { createActorCard } from "../components/index.js";

export const movieDetailsTemplate = (movieData = {}) => {
	return `
		<section class="hero-section">
            <div class="hero-section-inner">
                <div class="movie-details">
					<img src=${movieData.imgUrl} alt="movie poster">
                    <div class="movie-details-description">
                        <h2 class="movie-description-name section-subheader">${movieData.name}</h2>
                        <div class="movie-details-description-group group-vertical">
                            <span>Release date: ${movieData.releaseDate}</span>
                            <span>Rating: ${movieData.rating}</span>
                            <span>Genres: ${movieData.genres}</span>
                        </div>
                        <div class="movie-details-description-group group-vertical">
                            <span>Overview:</span>
                            <p>${movieData.overview}</p>
                        </div>
                        <div class="movie-details-description-group group-vertical movie-actors-container-wrapper">
                            <span>Cast:</span>
                            <div class="movie-actors-container"><!-- Actor cards here --></div>
                        </div>
                    </div>
                </div>

                <div class="trailers-container">
                    <h2 class="section-subheader text-light text-center">Trailers</h2>

                    <div class="trailers-container-media"><!-- Trailers go here --></div>
                </div>
            </div>
        </section>

        <section class="suggested-movies-container">

            <div class="movies-section" id="suggested-section-container">
                <div class="movies container">
                    <div class="movies-section-title">
                        <h2>Other suggested movies</h2>
                    </div>
        
                    <div class="movie-cards-container"><!-- Movies go here --></div>
                </div>
            </div>
        </section>
	`;
};

async function initMovieDetailsPage(router, movieStorage, params) {
	if (!params.movieId || !params.movieType) router.route = GLOBAL_ROUTES.HOME;

	const movie = await movieStorage.getMovieById(
		params.movieId,
		params.movieType
	);

	const { cast, _ } = await getCreditsByMovieId(movie.id, params.movieType === MOVIES.TV ? "tv" : "movie");

	const movieData = {
		imgUrl: movie.poster_path
			? getImage(movie.poster_path)
			: movie.backdrop_path
			? getImage(movie.backdrop_path)
			: "./assets/image-not-found.jpg",
		name: movie.name || movie.title,
		releaseDate: movie.release_date || movie.first_air_date,
		rating: movie.vote_average ? `${movie.vote_average}/10.0` : "N/A",
		genres: movie.genres.length
			? movie.genres.map((genre) => genre.name).join(", ")
			: "N/A",
		overview: movie.overview ? movie.overview : "N/A",
		trailers: (
			await getVideoSnippetsById(movie.id, params.movieType === MOVIES.TV)
		).data?.results.filter((snippet) => snippet.type === "Trailer"),
		cast: cast.length ? cast : null
	};

	router.renderRoute(movieDetailsTemplate(movieData));

	if (Array.isArray(movieData.trailers) && movieData.trailers.length) {
		const container = router.rootRef.querySelector(
			".trailers-container-media"
		);
		const fragment = document.createDocumentFragment();

		movieData.trailers.forEach((trailer) => {
			const trailerDiv = document.createElement("div");
			trailerDiv.classList.add("media");
			const url = getVideoYTURL(trailer.key);
			renderVideoSnippetYT(trailerDiv, url);
			fragment.append(trailerDiv);
		});

		container.appendChild(fragment);
	} else {
		router.rootRef.querySelector(".trailers-container").remove();
	}

	if (Array.isArray(cast) && cast.length) {
		const container = router.rootRef.querySelector(
			".movie-actors-container"
		);
		const fragment = document.createDocumentFragment();

		cast.forEach((actor) => fragment.append(createActorCard(actor)));
		container.append(fragment);
	} else {
		router.rootRef
			.querySelector(".movie-actors-container-wrapper")
			.remove();
	}
}

export const hydrateMovieDetailsPage = (params) => async () =>
	await initMovieDetailsPage(router, movieStorage, params);
