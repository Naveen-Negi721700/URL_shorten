import express from "express";
import cors from "cors"
import routes from "./routes/url.routes.js";
import { connectShorterurlWithOriginalurl } from "./controllers/url.controllers.js";
import cookieParser from "cookie-parser";

const app = express();
console.log("CORS ORIGIN:", process.env.CORS_ORIGIN);
app.use(cors({
    origin:process.env.CORS_ORIGIN,
    credentials: true,
}))
app.set("trust proxy", 1);

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static("public"))
app.use(cookieParser())


// API routes
app.use("/api/v1/url", routes);
   
// Short URL redirect
app.get("/:shortenUrl", connectShorterurlWithOriginalurl);

export { app };