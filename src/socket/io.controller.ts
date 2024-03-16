import io from "./io"
import { type Request } from "express";
import ioServices from "./io.services"; 
import Validator from "../utils/validator";

const activeUsers:Array<Object> = [];

io.on('connection', (socket) => {
    const req = socket.request as Request;
    if ("user" in req.session) activeUsers.push({
        username: req.session.user!.username,
        socketid: socket.id
    })
    
    socket.on("disconnect", () => {
        console.log(`User ${socket.id} disconnected`);
        
        ioServices.removeUser(activeUsers, socket.id);
    })

    socket.on("req dashboard info", async() =>  {
        if(!Validator.loginStatus(req)) return false;
        const info = await ioServices.getDashboardInfo(req.session.user!);
        socket.emit("dashboard info", info);
    })
});

export default io;