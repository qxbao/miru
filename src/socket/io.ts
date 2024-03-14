import { Server } from "socket.io";

import { server, sessionMiddleware } from "../index"

const io = new Server(server);
io.engine.use(sessionMiddleware);

export default io;