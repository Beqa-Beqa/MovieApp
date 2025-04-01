export class MovieStorage {
	#addressName;
	#storage;

	constructor(addressName) {
		this.#addressName = addressName;
		this.#storage = new Map([
			["newMovies", []],
			["popularMovies", []],
			["tvShows", []],
		]);
	}

	getNewMovies() {
		return this.#storage.get("newMovies");
	}
	getPopularMovies() {
		return this.#storage.get("popularMovies");
	}
	getTvShows() {
		return this.#storage.get("tvShows");
	}

	updateNewMovies(moviesArr) {
		this.#storage.set("newMovies", [...this.getNewMovies(), ...moviesArr]);
	}
	updatePopularMovies(moviesArr) {
		this.#storage.set("popularMovies", [
			...this.getPopularMovies(),
			...moviesArr,
		]);
	}
	updateTvShows(moviesArr) {
		this.#storage.set("tvShows", [...this.getTvShows(), ...moviesArr]);
	}

	getMovieById(id) {
		for (let movies of this.#storage.values()) {
			const result = movies.find((movie) => movie.id === id);
			if (result) return result;
		}

		return null;
	}

	setMovieInView(id) {
		window.sessionStorage.setItem(
			this.#addressName,
			JSON.stringify(this.getMovieById(id))
		);
	}
	getMovieInView() {
		return JSON.parse(window.sessionStorage.getItem(this.#addressName));
	}

	clearView() {
		window.sessionStorage.removeItem(this.#addressName);
	}
}
