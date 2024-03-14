import "dotenv/config.js";
import express from "express";
import { join } from "path";
import cors from "cors";
import { createServer } from 'node:http';

const app = express();
const server = createServer(app);
export { server };

// Database connection
import { pool } from "./postgre/pool"
pool.connect((err) => {
    if (err) throw err;
    console.log("Database connected!");
});

// View engine config
app.set("views", join(__dirname, "/views"));
app.set("view engine", "pug")

app.use(cors());
app.use(express.urlencoded({ "extended": true }));
app.use(express.json())

// Session config
import { v4 as uuidv4 } from "uuid";
import session from "express-session";
declare module "express-session" {
    export interface SessionData {
        user: { [key: string]: any };
        count: number;
    }
}
import pgConnection from "connect-pg-simple";
const pgSession = pgConnection(session);
const sessionMiddleware = session({
    store: new pgSession({
        pool: pool
    }),
    genid: () => uuidv4(),
    saveUninitialized: false,
    resave: false,
    secret: process.env.COOKIESECRET!,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 30,
    }
});
app.use(sessionMiddleware);
export { sessionMiddleware }

// Cookie
import cookieParser from "cookie-parser";
app.use(cookieParser(process.env.COOKIESECRET))

// Static resources
app.use(express.static(join(__dirname, '/public')));
app.use(express.static(join(__dirname, '/../node_modules/bootstrap/dist')));
app.use("/lib", express.static(join(__dirname, '/../node_modules/iconoir/css')));

// Routes
import routes from "./routes/routes";
app.use(routes)

// SocketIO
import ioServices from "./socket/io.controller";
ioServices;

// Port
const port = process.env.PORT || 8080;
server.listen(port, () => {
    console.log(`Listening on port ${port}`);
})
