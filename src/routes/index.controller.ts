import { NextFunction, Request, Response, Router } from 'express';
import Validator from "../utils/validator"

const router = Router();

router.get("/", (req: Request, res: Response, next: NextFunction) => {
    if (Validator.signinStatus(req)) return res.redirect("/home");
    next();
}, (req: Request, res: Response) => {
    res.render("index.pug");
});

// Change to POST soon
router.all("/logout", (req: Request, res: Response) => {
    req.session.destroy((err) => {
        if (err) throw err;
    });
    res.redirect("/");
})

export default router;