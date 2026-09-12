import Router from "express";
import { handleGetAnalysiser, generateNewShortenUrl, registerUser } from "../controllers/url.controllers.js";
const routes=Router();
routes.route("/url_shorten").post(generateNewShortenUrl)
routes.route("/analytics/:shorterurl").get(handleGetAnalysiser)
routes.route("/register").post(registerUser)

export default routes
