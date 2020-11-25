import express from "express";
import { router as testRouter } from "./api/testing/testing.routes";
import { router as loginRouter } from "./api/auth/login.routes";
import { router as reportRouter } from "./api/reports/report.routes";
import { router as platformRouter } from "./api/platform/platform.routes";
import { router as userMangRouter } from "./api/user/user.routes";
import { router as commonRouter } from './api/common/common.routes';
import { router as helpdeskRouter } from './api/helpdesk/helpdesk.router';
import { router as settingRouter } from "./api/setting/setting.routes";



export const ServerRouter = express.Router();
//default router

// TESTING API Router
ServerRouter.use(testRouter);

// Login API Router
ServerRouter.use(loginRouter);

// for report mangement
ServerRouter.use(reportRouter);

// for platform mangement
ServerRouter.use(platformRouter);

// for user mangement
ServerRouter.use(userMangRouter);

// for common routes
ServerRouter.use(commonRouter);

ServerRouter.use(helpdeskRouter);

ServerRouter.use(settingRouter);



