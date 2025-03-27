import { APIBase, APIReadKey, YTVidBase } from "./apiConstants.js";

/**
 * 
 * @param {string} url 
 * @returns Promise, which after fulfilled returns result of the request
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
		return await result.json();
	} catch (e) {
		console.error(`Something went wrong ${e.message}`);
		return {};
	}
};

/**
 * 
 * @param {number} page 
 */
export const getMostRecentMovies = async (page = 1) => {
	const url = `${APIBase}/movie/popular?language=en-US&include_video=true&page=${page}`;
	return await makeRequest(url);
};

/**
 * 
 * @param {string} movieId 
 */
export const getVideoSnippetsById = async (movieId) => {
	const url = `${APIBase}/movie/${movieId}/videos?language=en-US`;
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
export const getMovieDetailsById = async (movieId) => {
	const url = `${APIBase}/movie/${movieId}?language=en-US`;
	return await makeRequest(url);
};


/**
 * 
 * @param {string} search
 * @param {number} page 
 */
export const getMoviesBySearch = async (search, page = 1) => {
	const url = `${APIBase}/search/movie?query=${search}&language=en-US&page=${page}`;
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
export const getCreditsByMovieId = async (movieId, onlyActors=false) => {
	const url = `${APIBase}/movie/${movieId}/credits?language=en-US`;
	const result = await makeRequest(url);
    if(!onlyActors) return result;

    return result.cast ?? [];
};


/**
 * 
 * @param {string} actorId 
 */
export const getActorImagesById = async (actorId) => {
    const url = `${APIBase}/person/${actorId}/images?language=en-US`;
    return await makeRequest(url);
}


/**
 * 
 * @param {string} actorId 
 */
export const getActorDetailsById = async (actorId) => {
    const url = `${APIBase}/person/${actorId}?language=en-US`;
    return await makeRequest(url);
}


export const getMovieCategories = async () => {
    const url = `${APIBase}/genre/movie/list`;
    return await makeRequest(url);
};


/**
 * 
 * @param {number} genreId
 * @param {number} page 
 */
export const getMoviesByGenre = async (genreId, page=1) => {
    const url = `${APIBase}/discover/movie?language=en-US&with_genres=${genreId}&page=${page}`;
    return await makeRequest(url);
}