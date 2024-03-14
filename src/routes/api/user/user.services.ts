import { Router, Request, Response, NextFunction } from "express";
import PGServices from "./../../../postgre/services";
import Validator from "./../../../utils/validator";
import bcrypt from "bcrypt";

const router = Router();

router.post("/login", (req: Request, res: Response, next: NextFunction) => {
    if (Validator.loginStatus(req)) return res.json({ status: false, ercode: -1});
    next();
}, async (req: Request, res: Response) => {
    const username = req.body.username;
    const password = req.body.password;
    const userPassword = await PGServices.checkUserExistence(username);
    if (userPassword == null) return res.json({ status: false, ercode: 0 });
    const match = await bcrypt.compare(password, userPassword);
    if (match) {
        req.session.user = {"username" : username};
        return res.json({ status: true });
    }
    else {
        return res.json({status: false, ercode: 1})
    }
})

export default router;