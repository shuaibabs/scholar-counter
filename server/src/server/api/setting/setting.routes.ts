import { Request, Response } from "express";
import express from "express";
import * as gtUtil from "../../gt-utility";
import { MasterModel } from "../../models/MasterModel";
import dotenv from "dotenv";
import { Setting } from "./setting";
dotenv.config();

export const router = express.Router();
const logger = new gtUtil.Logger();
const masterModel = new MasterModel();
const methods = new gtUtil.Methods();
const setting = new Setting();

router.post("/user/setting", async (req: Request, res: Response) => {

    // getting response model
    let startMS = new Date().getTime();
    let payload;
    let resModel = masterModel.getResponseModel();
    try {
        payload = req.body;
        // ** dont change above code, please wtite your router code below ** //

        resModel = await setting.userSetting(payload);

        // ** dont change below code, write your code baove this only ** //
    } catch (error) {
        resModel.status = -9;
        resModel.info = 'catch: ' + error + ' : ' + resModel.info;
        logger.error(req.path + ' : ' + JSON.stringify(resModel));
    } finally {
        resModel.endDT = new Date();
        resModel.tat = (new Date().getTime() - startMS) / 1000;
        res.status(gtUtil.Constants.HTTP_OK).json(resModel);
    }
});