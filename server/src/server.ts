import * as gtUtil from "./server/gt-utility";
const logger = new gtUtil.Logger();
logger.log("*************  Starting App server  *************");

import http from "http";
import express from "express";
import helmet from "helmet";
import { router as CommonRouter } from "./server/middleware/common.middleware";
import { router as ErrorRouter } from "./server/middleware/error.middleware";
import { router as CorsRouter } from "./server/middleware/cors.middleware";
import { router as AuthRouter } from "./server/middleware/auth.middleware"
import { ServerRouter } from "./server/server.routes";
import * as mysql from "./server/db/mysql/mysqlDao";

process.on("uncaughtException", e => {
  console.log(e);
  logger.log("*************  Starting App server : APP SERVER CRASHED : ERROR(uncaughtException) : " + e);
  process.exit(1);
});

process.on("unhandledRejection", e => {
  console.log(e);
  logger.log("*************  Starting App server : APP SERVER CRASHED : ERROR(unhandledRejection) : " + e);
  //process.exit(1);
});

//creating express app
const app = express();

const mysqlConn = mysql.connPool;

// securing app
logger.log("**Securing application with HELMET");
app.use(helmet());

logger.log("**Integrating COMMON Middleware of the application");
app.use(CommonRouter);

logger.log("**Integrating CORS Middleware of the application");
app.use(CorsRouter);

logger.log("**Integrating ERROR Middleware of the application");
app.use(ErrorRouter);

logger.log("**Integrating AUTH Middleware of the application");
app.use(AuthRouter);

logger.log("**Integrating Default/All Routes of the application");
app.use(ServerRouter);

logger.log("**Configuring listening Port of server");
const PORT = process.env.NODE_EXPRESS_PORT;

logger.log("**Creating http server ");
const server = http.createServer(app);

server.listen(PORT, () =>
  logger.log("*************  Server is running on " + JSON.stringify(server.address()) + "  *************")
);