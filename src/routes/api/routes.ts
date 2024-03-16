import { Router,  Request, Response, request } from "express";
import userServices from "./user/user.controller"

const api = Router().use("/user", userServices);

api.get("/", (req: Request, res: Response) => {
    res.send("Sorry, currently we dont provide API access.");
})

export default api;