import { router, movieStorage } from '../init.js';
import { GLOBAL_ROUTES } from '../router/routes.js';

export const movieDetailsTemplate = async (movieId, type) => {
    const movie = await movieStorage.getMovieById(movieId, type);
	const name = movie.title ?? movie.name;

    return `
    <!-- ============================================================= -->
    <h1>Hello again, this is movie</h1>
    <p>${name}</p>
`;
}

async function initMovieDetailsPage(router, movieStorage) {
	// const goBackH1 = document.querySelector("h1");
	// goBackH1.addEventListener(
	// 	"click",
	// 	() => (router.route = GLOBAL_ROUTES.HOME)
	// );
};

export const hydrateMovieDetailsPage = initMovieDetailsPage.bind(null, router, movieStorage);