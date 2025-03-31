import { Router } from "./router.js";
import { ROUTES } from "./dataConstants.js";
import { initHeaderNav, createMovieCard } from "./components/index.js";
import { getNewMovies, getPopularMovies, getPopularTVShows } from './utilities.js';

const router = new Router('root', ROUTES);
router.renderRoute();

// header 
initHeaderNav();

const renderMovies = (movies, container, moviesSectionContainer, isTvShow=false) => {
    const fragment = document.createDocumentFragment();

    if(!movies) fragment.append('ERROR ERROR ERROR ERROR ERROR ERROR');
    else fragment.append(...movies.map(movie => createMovieCard(movie, moviesSectionContainer, isTvShow)));

    container.append(fragment);
}

const renderBackdrop = (event, sectionContainer) => {
    if(event.target.tagName === 'IMG' || event.target.classList.contains('movie-card')) {
        const backdropUrl = event.target.getAttribute('data-backdrop-url');
        if(backdropUrl !== 'null') sectionContainer.style.backgroundImage = `url(${backdropUrl})`;
    }
}

if(router.route === ROUTES.VALUES.HOME) {
    const initHomepage = async () => {
        const [newMovies, popularMovies, tvShows] = await Promise.all([getNewMovies(), getPopularMovies(), getPopularTVShows()]);
        
        const newMoviesContainer = document.getElementById('new-movies-container');
        const popularMoviesContainer = document.getElementById('popular-movies-container');
        const tvShowsContainer = document.getElementById('tv-shows-container');

        const newMoviesSectionContainer = document.getElementById('new-movies-section-container');
        const popularMoviesSectionContainer = document.getElementById('popular-movies-section-container');
        const tvShowsSectionContainer = document.getElementById('tv-shows-section-container');

        newMoviesContainer.addEventListener('mouseover', (e) => renderBackdrop(e, newMoviesSectionContainer));
        popularMoviesContainer.addEventListener('mouseover', (e) => renderBackdrop(e, popularMoviesSectionContainer));
        tvShowsContainer.addEventListener('mouseover', (e) => renderBackdrop(e, tvShowsSectionContainer));
        
        renderMovies(newMovies.results, newMoviesContainer, newMoviesSectionContainer);
        renderMovies(popularMovies.results, popularMoviesContainer,popularMoviesSectionContainer);
        renderMovies(tvShows.results, tvShowsContainer, tvShowsSectionContainer, true);
    };

    initHomepage();
}