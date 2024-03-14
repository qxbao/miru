import { Request, Response, NextFunction, Router } from "express";
import indexController from "./index.controller"
import dashboardController from "./dashboard/dashboard.controller"
import apiRoutes from "./api/routes"

const routes = Router()
    .use((req: Request, res: Response, next: NextFunction) => {
        console.log(`Received a ${req.method} request on ${req.path} at ${new Date().toLocaleString("vi-vn")}`)
        next();
    })
    .use(indexController)
    .use("/api", apiRoutes)
    .use("/dashboard", dashboardController);

export default Router().use("/", routes);