import { APIBase, APIImgBase, APIReadKey, YTVidBase } from "./apiConstants.js";

/**
 *
 * @param {string} url
 * @returns Promise, which after fulfilled returns result of the request or an empty object if failed
 */
const makeRequest = async (url) => {
	try {
		const result = await fetch(url, {
			headers: {
				accept: "application/json",
				Authorization: `Bearer ${APIReadKey}`,
			},
			method: "GET",
		});
		if (!result.ok)
			throw new Error(`Request failed! Status: ${result.status}`);
		return { success: true, data: await result.json() };
	} catch (e) {
		console.error(`Something went wrong ${e.message}`);
		return { success: false, error: e.message };
	}
};

/**
 *
 * @param {number} page
 */
export const getPopularMovies = async (page = 1) => {
	const url = `${APIBase}/movie/popular?language=en-US&include_video=true&page=${page}`;
	return await makeRequest(url);
};

/**
 *
 * @param {string} movieId
 */
export const getVideoSnippetsById = async (movieId, isTvShow = false) => {
	const url = `${APIBase}/${
		isTvShow ? "tv" : "movie"
	}/${movieId}/videos?language=en-US`;
	return await makeRequest(url);
};

/**
 *
 * @param {string} snippetKey
 * @returns Video url from YT ( Only from YT )
 */
export const getVideoYTURL = (snippetKey) => `${YTVidBase}/${snippetKey}`;

/**
 *
 * @param {string} movieId
 */
export const getMovieDetailsById = async (movieId, type) => {
	// movies | tv
	const url = `${APIBase}/${type}/${movieId}?language=en-US`;
	return await makeRequest(url);
};

/**
 *
 * @param {string} search
 * @param {number} page
 */
export const getMoviesBySearch = async (search, page = 1, tvShow = false) => {
	const url = `${APIBase}/search/${
		tvShow ? "tv" : "movie"
	}?query=${search}&language=en-US&page=${page}`;
	return await makeRequest(url);
};

/**
 *
 * @param {number} page
 */
export const getPopularTVShows = async (page = 1) => {
	const url = `${APIBase}/tv/popular?language=en-US&page=${page}`;
	return await makeRequest(url);
};

/**
 *
 * @param {string} movieId
 * @param {boolean} onlyActors If true is provided for this parameter, only actors data will be retrieved
 */
export const getCreditsByMovieId = async (movieId, type) => {
	// type = movies | tv
	const url = `${APIBase}/${type}/${movieId}/credits?language=en-US`;
	const result = await makeRequest(url);
	return result.data;
};

/**
 *
 * @param {string} actorId
 */
export const getActorImagesById = async (actorId) => {
	const url = `${APIBase}/person/${actorId}/images?language=en-US`;
	return await makeRequest(url);
};

/**
 *
 * @param {string} actorId
 */
export const getActorDetailsById = async (actorId) => {
	const url = `${APIBase}/person/${actorId}?language=en-US`;
	return await makeRequest(url);
};

export const getMovieCategories = async () => {
	const url = `${APIBase}/genre/movie/list`;
	return await makeRequest(url);
};

/**
 *
 * @param {number} genreId
 * @param {number} page
 */
export const getMoviesByGenre = async (genreId, page = 1) => {
	const url = `${APIBase}/discover/movie?language=en-US&with_genres=${genreId}&page=${page}`;
	return await makeRequest(url);
};

/**
 *
 * @param {string} path
 */
export const getImage = (path, width = 500) =>
	path ? `${APIImgBase}${width}/${path}` : null;

/**
 *
 * @param {number} page
 */
export const getNewMovies = async (page = 1) => {
	const date = new Date();
	const fullYear = date.getFullYear();
	const fullMonth = (date.getMonth() + 1).toString().padStart(2, "0");
	const monthDay = date.getDate();
	const ltDate = `${fullYear}-${fullMonth}-${monthDay}`;

	const url = `https://api.themoviedb.org/3/discover/movie?language=en-US&page=${page}&sort_by=release_date.desc&primary_release_date.lte=${ltDate}`;
	return await makeRequest(url);
};
