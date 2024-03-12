import "dotenv/config.js";
import express from "express";
import routes from "./routes/routes";
import { join } from "path";

const app = express();
const port = process.env.PORT || 8080;

app.set("views", join(__dirname, "/views"));
app.set("view engine", "pug")

app.use(express.urlencoded({"extended" : true}));
app.use(express.json())
app.use(express.static(join(__dirname, '/public')));
app.use(express.static(join(__dirname, '/../node_modules/bootstrap/dist')));
app.use(routes)

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
})