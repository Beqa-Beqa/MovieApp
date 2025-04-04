import { GLOBAL_ROUTES } from "./router/routes.js";
import { Router } from "./router/router.js";
import { MovieStorage } from "./store/storage.js";

export const router = new Router("root", GLOBAL_ROUTES);
export const movieStorage = new MovieStorage();