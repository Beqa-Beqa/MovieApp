import { ROUTES } from "./dataConstants.js";
import { Router } from "./router.js";

const router = new Router('root', ROUTES);

router.renderRoute();