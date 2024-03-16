import { Request } from "express";

const pattern = {
    name: /^(?=.{8,20}$)([\w]+\s?)+[\w]$/,
    username:  /^[a-zA-Z0-9]{6,12}$/,
    email: /^[\w\.-]+@([\w-]+\.)+[\w-]{2,5}$/,
    password:  /^(?=.{8,1000}$)(?!([^\s])\1+$)[^\s]+$/
}

class Validator {
    static signinStatus(req : Request) : Boolean {
        return "user" in req.session ? true : false;   
    }
    static signupData(username: string, email: string, name: string, password: string) {
        return pattern.name.test(name) && pattern.username.test(username) && pattern.email.test(email) && pattern.password.test(password);
    }
}

export default Validator;