import { Request } from "express";

class Validator {
    static loginStatus(req : Request) : Boolean {
        return req.session.user ? true : false;
    }
}

export default Validator;