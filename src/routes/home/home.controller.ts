import { Router, Request, Response, NextFunction, request } from "express";
import Validator from "../../utils/validator"
import PGServices from "../../postgre/services";

const homeController = Router();

homeController.get("/", (req: Request, res: Response, next: NextFunction) => {
    if (!Validator.signinStatus(req)) return res.redirect("/");
    next();
}, async (req: Request, res: Response) => {
    const userInformation = await PGServices.getUserInformation(req.session.user!.username, ["username", "name" ,"access_level"])    
    res.render("home", userInformation);
})

export default homeController;