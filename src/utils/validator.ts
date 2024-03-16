import { Request } from "express";

class Validator {
    static loginStatus(req : Request) : Boolean {
        return "user" in req.session ? true : false;
        
    }
}

export default Validator;