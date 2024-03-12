import { Router,  Request, Response, request } from "express";
import userController from "./user/user.controller"

const api = Router().use("/user", userController);

api.get("/", (req: Request, res: Response) => {
    res.send("Sorry, currently we dont provide API access.");
})

export default Router().use("/api", api);