import { Router } from "./router.js";
import { ROUTES } from "./dataConstants.js";
import { initHeaderNav, movieCard } from "./components/index.js";
import { getNewMovies, getPopularMovies, getPopularTVShows } from './utilities.js';
import createMovieCard from "./components/movieCard.js";

const router = new Router('root', ROUTES);
router.renderRoute();

// header 
initHeaderNav();

const renderMovies = (movies, container, isTvShow=false) => {
    const fragment = document.createDocumentFragment();

    if(!movies) fragment.append('ERROR ERROR ERROR ERROR ERROR ERROR');
    else fragment.append(...movies.map(movie => createMovieCard(movie, isTvShow)));

    container.append(fragment);
}

if(router.route === ROUTES.VALUES.HOME) {
    const initHomepage = async () => {
        const [newMovies, popularMovies, tvShows] = await Promise.all([getNewMovies(), getPopularMovies(), getPopularTVShows()]);

        const newMoviesContainer = document.getElementById('new-movies-container');
        const popularMoviesContainer = document.getElementById('popular-movies-container');
        const tvShowsContainer = document.getElementById('tv-shows-container');
        
        renderMovies(newMovies.results, newMoviesContainer);
        renderMovies(popularMovies.results, popularMoviesContainer);
        renderMovies(tvShows.results, tvShowsContainer, true);
    };

    initHomepage();
}