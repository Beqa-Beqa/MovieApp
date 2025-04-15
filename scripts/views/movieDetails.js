import { router, movieStorage } from "../init.js";
import {
	getCreditsByMovieId,
	getImage,
	getVideoSnippetsById,
	getVideoYTURL,
} from "../utilities/api.js";
import { GLOBAL_ROUTES } from "../router/routes.js";
import {
	renderBackdrop,
	renderMovies,
	renderVideoSnippetYT,
} from "../utilities/render.js";
import { MOVIES } from "../enums.js";
import { createPersonCard } from "../components/index.js";
import { handleMovieClick } from "../utilities/general.js";

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
                            <div class="movie-people-container actors"><!-- Actor cards here --></div>
                        </div>
                        <div class="movie-details-description-group group-vertical movie-directors-container-wrapper">
                            <span>Directed By:</span>
                            <div class="movie-people-container directors"><!-- Director cards here --></div>
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
                        <a class="title" href=${movieData.routeToRedirect}>Other suggested movies</a>
                    </div>
        
                    <div class="movie-cards-container"><!-- Movies go here --></div>
                </div>
            </div>
        </section>
	`;
};

async function initMovieDetailsPage(router, movieStorage, params) {
	if (!params.movieId || !params.movieType) {
		router.route = GLOBAL_ROUTES.HOME;
		// End loading state here ...
	}

	const movie = await movieStorage.getMovieById(
		params.movieId,
		params.movieType
	);

	const { cast, crew } = await getCreditsByMovieId(
		movie.id,
		params.movieType === MOVIES.TV ? "tv" : "movie"
	);

	const directedBy = crew.filter((member) => member.job === "Director");

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
		cast: cast.length ? cast : null,
	};

	let moviesToSuggest;
	let routeToRedirect;
	switch (params.movieType) {
		case MOVIES.NEW:
			moviesToSuggest = await movieStorage.getNewMovies(1);
			routeToRedirect = GLOBAL_ROUTES.NEW_MOVIES;
			break;
		case MOVIES.POPULAR:
			moviesToSuggest = await movieStorage.getPopularMovies(1);
			routeToRedirect = GLOBAL_ROUTES.POPULAR_MOVIES;
			break;
		case MOVIES.TV:
			moviesToSuggest = await movieStorage.getTvShows(1);
			routeToRedirect = GLOBAL_ROUTES.TV_SHOWS_PAGE;
			break;
	}

	movieData.routeToRedirect = routeToRedirect;

	// RERENDER HAPPENS HERE ---------------------------------------------------------
	// -------------------------------------------------------------------------------
	router.renderRoute(movieDetailsTemplate(movieData));
	// After this line everything is rerenderd -----------------------------------------
	// -------------------------------------------------------------------------------

	const trailersContainer = router.rootRef.querySelector(
		".trailers-container-media"
	);
	const actorsContainer = router.rootRef.querySelector(
		".movie-people-container.actors"
	);
	const directorsContainer = router.rootRef.querySelector(
		".movie-people-container.directors"
	);
	const moviesContainer = router.rootRef.querySelector(
		".movie-cards-container"
	);
	const moviesSection = router.rootRef.querySelector(".movies-section");

	if (Array.isArray(movieData.trailers) && movieData.trailers.length) {
		const fragment = document.createDocumentFragment();

		movieData.trailers.forEach((trailer) => {
			const trailerDiv = document.createElement("div");
			trailerDiv.classList.add("media");
			const url = getVideoYTURL(trailer.key);
			renderVideoSnippetYT(trailerDiv, url);
			fragment.append(trailerDiv);
		});

		trailersContainer.appendChild(fragment);
	} else {
		trailersContainer.remove();
	}

	if (Array.isArray(cast) && cast.length) {
		const fragment = document.createDocumentFragment();
		cast.forEach((actor) => fragment.append(createPersonCard(actor)));
		actorsContainer.append(fragment);
	} else {
		actorsContainer.remove();
	}

	if (Array.isArray(directedBy) && directedBy.length) {
		const fragment = document.createDocumentFragment();
		directedBy.forEach((director) =>
			fragment.append(createPersonCard(director))
		);
		directorsContainer.append(fragment);
	} else {
		directorsContainer.remove();
	}

	// moviesToSuggest is defined above in switch case
	renderMovies(moviesToSuggest, moviesContainer, params.movieType, [
		movie.id,
	]);
	moviesContainer.addEventListener("click", (e) => {
		handleMovieClick(e, router);
	});
	moviesContainer.addEventListener("mouseover", (e) => {
		renderBackdrop(e, moviesSection);
	});
}

export const hydrateMovieDetailsPage = (params) => async () =>
	await initMovieDetailsPage(router, movieStorage, params);
