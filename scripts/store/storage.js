import {
	getNewMovies,
	getPopularMovies,
	getPopularTVShows,
} from "../utilities/utilities.js";

export class MovieStorage {
	// Private storage map
	#storage;

	/**
	 * Creates an instance of storage for movies which keeps types of movies
	 * by their pages and ids
	 */
	constructor() {
		this.#storage = new Map([
			["newMovies", this.#createEmptyCollection()],
			["popularMovies", this.#createEmptyCollection()],
			["tvShows", this.#createEmptyCollection()],
		]);
	}

	/**
	 * 
	 * @returns Empty collection used by different types of movies in this.#storage
	 */
	#createEmptyCollection() {
		return { moviesByPage: new Map(), moviesById: new Map() };
	}


	/**
	 * 
	 * @param {string} type type of movie such as "newMovies" | "popularMovies" | "tvShows"
	 * @param {number} page page to be fetched
	 * @param {Function} fetcher utility function that fetches the data
	 * @returns in case of successfull fetch, returns array of fetched movies.
	 * otherwise returns empty array.
	 */
	async #getMovies(type, page, fetcher) {
		const data = this.#storage.get(type);
		if (data.moviesByPage.has(page)) return data.moviesByPage.get(page);

		try {
			const result = await fetcher(page);

			if(!result.success) throw new Error(`Failed to fetch, error: ${result.error}`);

			const fetchedMovies = await result.data.results ?? [];
			
			if (fetchedMovies.length) {
				fetchedMovies.forEach(movie => data.moviesById.set(movie.id, movie));
				data.moviesByPage.set(page, fetchedMovies);
			}
			
			return fetchedMovies;
		} catch (e) {
			console.error(`Something went wrong while fetching movies: ${e}`);
			return [];
		}
	}

	/**
	 * 
	 * @param {number} page page to be fetched
	 * @returns result of the fetch, array either containing new movies or an empty one
	 */
	async getNewMovies(page = 1) {
		return await this.#getMovies("newMovies", page, getNewMovies);
	}

	/**
	 * 
	 * @param {number} page page to be fetched
	 * @returns result of the fetch, array either containing popular movies or an empty one
	 */
	async getPopularMovies(page = 1) {
		return await this.#getMovies("popularMovies", page, getPopularMovies);
	}

	/**
	 * 
	 * @param {number} page page to be fetched
	 * @returns result of the fetch, array either containing tv shows or an empty one
	 */
	async getTvShows(page = 1) {
		return await this.#getMovies("tvShows", page, getPopularTVShows);
	}


	/**
	 * 
	 * @param {number} id id of the movie
	 * @returns movie of which id matches the requested one
	 */
	getMovieById(id) {
		for(let type of ['newMovies', 'popularMovies', 'tvShows']) {
			const collection = this.#storage.get(type);
			if(collection.moviesById.has(id)) return collection.moviesById.get(id);
		}

		return null;
	}
}
