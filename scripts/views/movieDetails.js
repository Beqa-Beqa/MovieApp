import { router, movieStorage } from '../init.js';
import { GLOBAL_ROUTES } from '../router/routes.js';

export const movieDetailsTemplate = (movieId) => {
    console.log(movieId);
	
    return `
    <!-- header  -->
    <header>
        <div class="header container">
            <div class="header-logo">
                <a href="#">Script Movie <i class="bx bx-movie"></i></a>
            </div>

            <div class="header-nav">
                <button id="burger-menu-close-button">X</button>
            </div>

            <div class="burger-menu">
                <i class="bx bx-menu"></i>
            </div>
            <div class="hover-menu"></div>
        </div>
    </header>

    <!-- ============================================================= -->
    <h1>Hello again, this is movie details page</h1>
`;
}

async function initMovieDetailsPage(router, movieStorage) {
	const goBackH1 = document.querySelector("h1");
	goBackH1.addEventListener(
		"click",
		() => (router.route = GLOBAL_ROUTES.HOME)
	);
};

export const hydrateMovieDetailsPage = initMovieDetailsPage.bind(null, router, movieStorage);