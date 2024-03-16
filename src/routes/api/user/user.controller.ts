import { Router, Request, Response, NextFunction } from "express";
import Validator from "../../../utils/validator";
import { signinProcess, signupProcess } from "./user.services";

const router = Router();

router.post("/signin", (req: Request, res: Response, next: NextFunction) => {
    if (Validator.signinStatus(req)) return res.json({ status: false, ercode: -1});
    next();
}, (req: Request, res: Response) => signinProcess(req, res))


router.post("/signup", (req: Request, res: Response, next: NextFunction) => {
    if (Validator.signinStatus(req)) return res.json({ status: false, ercode: -1});
    next();
}, (req: Request, res: Response) => signupProcess(req, res))


export default router;