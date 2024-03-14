import { Router, Request, Response, NextFunction, request } from "express";
import Validator from "../../utils/validator"

const dashboardController = Router();

dashboardController.get("/", (req: Request, res: Response, next: NextFunction) => {
    if (!Validator.loginStatus(req)) return res.redirect("/");
    next();
}, (req: Request, res: Response) => {
    res.render("dashboard", req.session.user)
})

export default dashboardController;