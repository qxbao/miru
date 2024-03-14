import io from "./io"
import { type Request } from "express";

io.on('connection', (socket) => {
    const req = socket.request as Request;
    console.log("new user");
    
});

export default io;