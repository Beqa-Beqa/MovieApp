import { GLOBAL_ROUTES } from "./router/routes.js";
import { Router } from "./router/router.js";
import { MovieStorage } from "./store/storage.js";
import { initHeaderNav } from "./components/index.js";

export const router = new Router("root", GLOBAL_ROUTES);
export const movieStorage = new MovieStorage();

export const initNavbar = () => {
    initHeaderNav(router);

}