import Router from "express";
import { handleGetAnalysiser, generateNewShortenUrl, registerUser, loginUser, logOutUser, refreshaccessToken, getUserUrls,getCurrentUser, githubLogin } from "../controllers/url.controllers.js";
import { verifyJwt } from "../middlewares/auth.middlewares.js";
const routes=Router();
routes.route("/url_shorten").post(verifyJwt, generateNewShortenUrl)
routes.route("/analytics/:shorterurl").get(handleGetAnalysiser)
routes.route("/register").post(registerUser)
routes.route("/login").post(loginUser)
routes.route("/logout").post(verifyJwt,logOutUser)
routes.route("/refresh-token").post(refreshaccessToken);
routes.route("/history").get(verifyJwt, getUserUrls);
routes.route("/currentUser").get(verifyJwt, getCurrentUser);
routes.route("/githubLogin").post(githubLogin);


export default routes
