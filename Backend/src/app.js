import express from "express";
import cors from "cors"
import routes from "./routes/url.routes.js";
import { connectShorterurlWithOriginalurl } from "./controllers/url.controllers.js";

const app = express();
app.use(cors({
    origin:process.env.CORS_ORIGIN,
    credentials: true,
}))
app.set("trust proxy", 1);

app.use(express.json());

// API routes
app.use("/api/v1/url", routes);

// Short URL redirect
app.get("/:shortenUrl", connectShorterurlWithOriginalurl);

export { app };