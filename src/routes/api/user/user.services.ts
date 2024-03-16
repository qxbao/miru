import { Request, Response } from "express";
import bcrypt from "bcrypt";
import PGServices from "../../../postgre/services";
import Validator from "../../../utils/validator";

const signinProcess = async (req: Request, res: Response) => {
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
}

const signupProcess = async (req: Request, res: Response) => {
    const data = req.body;
    if (Validator.signupData(data.username, data.email, data.name, data.password)) {
        const usernameExistence = await PGServices.checkUserExistence(data.username);
        // Existed username
        if (usernameExistence) return res.send({status : false, code: 1});
        const signupStatus = await PGServices.createUser(data.username, await bcrypt.hash(data.password, 12), data.email, data.name);
        const propertyStatus = await PGServices.createProperty(data.username);
        // Database error occured
        if (!signupStatus || !propertyStatus) return res.send({status : false, code: 2});
        return res.send({status : true});
    }
    // Invalid data submitted
    return res.send({status : false, code: 3});
}

export {signinProcess, signupProcess};