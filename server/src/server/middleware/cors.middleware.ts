import express from "express";
import * as gtUtil from "../gt-utility";

export const router = express.Router();
const logger = new gtUtil.Logger();
logger.log("## CORS Middleware Configuration : Start");

router.use((req, res, next) => {
    // Allowed domians
    res.setHeader("Access-Control-Allow-Origin", "*");

    // Allowing credemtials
    res.setHeader("Access-Control-Allow-Credentials", "true");

    // Allowed Headers
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Content-Length, Origin, X-Requested-With, Content-Type, Accept, x-access-token, authorization, token"
    );

    // Exposed Headers
    res.setHeader(
        "Access-Control-Expose-Headers",
        "Content-Length, Origin, X-Requested-With, Content-Type, Accept, x-access-token, authorization, token"
    );

    // Allowed Methods
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, PATCH, DELETE, OPTIONS"
    );

    if ('OPTIONS' == req.method) {
        res.sendStatus(200);
    } else {
        next();
    }
});

logger.log("## CORS Middleware Configuration : Success");