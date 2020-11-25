import express from "express";
import parser from "body-parser";
import compression from "compression";
import * as gtUtil from "../gt-utility";


export const router = express.Router();
const logger = new gtUtil.Logger();

logger.log("## Common Middleware Configuration : Start");

router.use(parser.urlencoded({ extended: true }));
router.use(parser.json({limit: '500mb'}));
router.use(compression());

logger.log("## Common Middleware Configuration : Success");
