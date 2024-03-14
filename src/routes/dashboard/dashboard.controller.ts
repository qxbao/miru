import { Router, Request, Response, NextFunction, request } from "express";
import Validator from "../../utils/validator"
import PGServices from "./../../postgre/services";

const dashboardController = Router();

dashboardController.get("/", (req: Request, res: Response, next: NextFunction) => {
    if (!Validator.loginStatus(req)) return res.redirect("/");
    next();
}, async (req: Request, res: Response) => {
    const userInformation = await PGServices.getUserInformation(req.session.user!.username, ["username", "name" ,"access_level"])    
    res.render("dashboard", userInformation)
})

export default dashboardController;