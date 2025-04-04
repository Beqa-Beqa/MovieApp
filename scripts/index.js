import { Router } from "./router.js";
import { GLOBAL_ROUTES } from "./routes.js";
import { TEMPLATES } from "./templates.js";
import { createMovieCard, initHeaderNav } from "./components/index.js";
import { getNewMovies, getPopularMovies, getPopularTVShows } from './utilities.js';
import { MovieStorage } from './storage.js';

const router = new Router('root', GLOBAL_ROUTES);
const movieStorage = new MovieStorage('movieapp_movie_storage');

initHeaderNav();

const renderMovies = (movies, container, isTvShow=false) => {
    const fragment = document.createDocumentFragment();
    if(!movies) fragment.append('ERROR ERROR ERROR ERROR ERROR ERROR');
    else fragment.append(...movies.map(movie => createMovieCard(movie, isTvShow)));
    container.append(fragment);
}

const renderBackdrop = (event, sectionContainer) => {
    const parentElem = event.target.parentElement;
    const isCardElem = parentElem.classList.contains('movie-card');
    if(isCardElem) {
        const backdropUrl = parentElem.getAttribute('data-backdrop-url');
        if(backdropUrl !== 'null') sectionContainer.style.backgroundImage = `url(${backdropUrl})`;
    }
}

const handleMovieClick = (event) => {
    const parentElem = event.target.parentElement;
    const isCardElem = parentElem.classList.contains('movie-card');
    if(isCardElem) {
        const movieId = parseInt(parentElem.getAttribute('data-movie-id'));
        const movie = movieStorage.getMovieById(movieId);
        movieStorage.setMovieInView(movie);
        router.route = GLOBAL_ROUTES.MOVIE_DETAILS;
    }
}
 
const initHomepage = async () => {
    
    const [newMovies, popularMovies, tvShows] = await Promise.all([getNewMovies(), getPopularMovies(), getPopularTVShows()]);

    movieStorage.updateNewMovies(newMovies.results);
    movieStorage.updatePopularMovies(popularMovies.results);
    movieStorage.updateTvShows(tvShows.results);
    
    const newMoviesContainer = document.getElementById('new-movies-container');
    const popularMoviesContainer = document.getElementById('popular-movies-container');
    const tvShowsContainer = document.getElementById('tv-shows-container');

    // Clear the containers before rendering new content
    newMoviesContainer.innerHTML = '';
    popularMoviesContainer.innerHTML = '';
    tvShowsContainer.innerHTML = '';

    const newMoviesSectionContainer = document.getElementById('new-movies-section-container');
    const popularMoviesSectionContainer = document.getElementById('popular-movies-section-container');
    const tvShowsSectionContainer = document.getElementById('tv-shows-section-container');

    newMoviesContainer.addEventListener('mouseover', (e) => renderBackdrop(e, newMoviesSectionContainer));
    popularMoviesContainer.addEventListener('mouseover', (e) => renderBackdrop(e, popularMoviesSectionContainer));
    tvShowsContainer.addEventListener('mouseover', (e) => renderBackdrop(e, tvShowsSectionContainer));

    [newMoviesContainer, popularMoviesContainer, tvShowsContainer].forEach(container => container.addEventListener('click', handleMovieClick));
    
    renderMovies(newMovies.results, newMoviesContainer);
    renderMovies(popularMovies.results, popularMoviesContainer);
    renderMovies(tvShows.results, tvShowsContainer, true);
}

const initMovieDetailsPage = async () => {
    const goBackH1 = document.querySelector('h1');
    console.log(goBackH1);
    
    goBackH1.addEventListener('click', () => router.route = GLOBAL_ROUTES.HOME);
}

// App init IIFE
(() => {
    if(router.route === GLOBAL_ROUTES.HOME) {
        router.renderRoute(TEMPLATES.HOME());
        // initHeaderNav();
        initHomepage();
    }
    else if (router.route === GLOBAL_ROUTES.MOVIE_DETAILS) {
        router.renderRoute(TEMPLATES.MOVIE_DETAILS());
        // initHeaderNav();
        initMovieDetailsPage();
    }
})();

window.addEventListener(router.changeEvent, (e) => {
    const route = e.detail.route;
    if(route === GLOBAL_ROUTES.HOME) {
        router.renderRoute(TEMPLATES.HOME());
        // initHeaderNav();
        initHomepage();
    }
    else if (route === GLOBAL_ROUTES.MOVIE_DETAILS) {
        router.renderRoute(TEMPLATES.MOVIE_DETAILS());
        // initHeaderNav();
        initMovieDetailsPage();
    }
})