import { Router } from "express";
import indexController from "./index/index.controller"
import apiRoutes from "./api/routes"

const routes = Router()
    .use(apiRoutes)
    .use(indexController);

export default Router().use("/", routes);