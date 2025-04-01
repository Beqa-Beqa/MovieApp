export const TEMPLATES = {
	HOME: () => {
		return `
					<!-- ================================================ -->
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
	<!-- search  -->

	<section class="search-section">
		<div class="search container">
			<form class="main-search-form">
				<input
					class="main-search"
					type="search"
					placeholder="Search for Movies, Series or People"
				/>
				<i class="bx bx-search"></i>
			</form>
		</div>
	</section>

	<!-- ==================================================================== -->
	<!-- introduction  -->
	<section class="introduction">
		<div class="intro">
			<div class="intro-text container">
				<h1>Script Movie</h1>
				<p>
					"Welcome to Script Movie – Your Cinematic Journey Starts
					Here!"
				</p>
				<button class="see-more">See more</button>
			</div>
		</div>
	</section>

	<!-- ======================================== -->
	<!-- new movies  -->

	<section class="movies-section" id="new-movies-section-container">
		<div class="movies container">
			<div class="movies-section-title">
				<h2>New Movies</h2>
			</div>

			<div id="new-movies-container" class="movie-cards-container">

			</div>
		</div>
		<div class="movies-overlay"></div>
	</section>

	<!-- ======================================== -->
	<!-- Popular  -->

	<section class="movies-section" id="popular-movies-section-container">
		<div class="movies container">
			<div class="movies-section-title">
				<h2>Popular Movies</h2>
			</div>

			<div id="popular-movies-container" class="movie-cards-container">
				
			</div>
		</div>
		<div class="movies-overlay"></div>
	</section>

	<!-- ======================================== -->
	<!-- Tv-Shows  -->

	<section class="movies-section" id="tv-shows-section-container">
		<div class="movies container">
			<div class="movies-section-title">
				<h2>TV-shows</h2>
			</div>

			<div id="tv-shows-container" class="movie-cards-container">
				
			</div>
		</div>
		<div class="movies-overlay"></div>
	</section>

	<div class="overlay"></div>
			`;
	},
	MOVIE_DETAILS: () => {
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
	},
};
