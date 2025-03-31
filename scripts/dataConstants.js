export const ROUTES = {
    ADDRESS_NAME: 'movieapp_route',
    VALUES: {
        HOME: 'homepage',
        MOVIE_DETAILS: 'movie_details_page'
    },

    TEMPLATES: {
        HOME: () => {
            return (
                `
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
					<h1 class="typewriter">Script Movie</h1>
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

		<section class="movies-section">
			<div class="movies container">
				<div class="movies-section-title">
					<h1>New Movies</h1>
				</div>

				<div id="new-movies-container" class="movie-cards-container">

				</div>
			</div>
		</section>

		<!-- ======================================== -->
		<!-- Popular  -->

		<section class="movies-section">
			<div class="movies container">
				<div class="movies-section-title">
					<h1>Popular Movies</h1>
				</div>

				<div id="popular-movies-container" class="movie-cards-container">
					
				</div>
			</div>
		</section>

		<!-- ======================================== -->
		<!-- new movies  -->

		<section class="movies-section">
			<div class="movies container">
				<div class="movies-section-title">
					<h1>TV-shows</h1>
				</div>

				<div id="tv-shows-container" class="movie-cards-container">
					
				</div>
			</div>
		</section>

		<div class="overlay"></div>
                `
            );
        },
        MOVIE_DETAILS: () => {
            return '<h1>Hello again, this is movie details page</h1>'
        },
    }
}