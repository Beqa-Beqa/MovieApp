// Enum for API
export const GENDERS_ENUM = {
    FEMALE: 1,
    MALE: 2
};

// App state Enums
export const ROUTES = {
    ADDRESS_NAME: 'movieapp_route',
    VALUES: {
        HOME: 'homepage',
        MOVIE_DETAILS: 'movie_details_page'
    },

    TEMPLATES: {
        HOME: () => '<h1>Hello World, this is homepage</h1>',
        MOVIE_DETAILS: () => '<h1>Hello again, this is movie details page</h1>',
    }
}