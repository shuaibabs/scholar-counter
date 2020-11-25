import { Request, Response } from "express";
import express from "express";
import * as gtUtil from "../../gt-utility";
import { MasterModel } from "../../models/MasterModel";
import dotenv from "dotenv";
import { Common } from "./common"
dotenv.config();

export const router = express.Router();
const logger = new gtUtil.Logger();
const masterModel = new MasterModel();
const methods = new gtUtil.Methods();
const common = new Common();


router.post("/common/loguseractivity", async (req: Request, res: Response) => {

    // getting response model
    let startMS = new Date().getTime();
    let payload;
    let resModel = masterModel.getResponseModel();
    try {
        payload = req.body;
        // **** dont change above code, please wtite your router code below **** //

         resModel = await common.logUserActivity(payload);

        // **** dont change below code, write your code baove this only **** //
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

// API for testing get request , executing the query
router.post("common/executequery", async (req: Request, res: Response) => {

    // getting response model
    let startMS = new Date().getTime();
    let payload;
    let data: any;
    let query = "SELECT NOW() AS `CURRENT_DATE_TIME`";
    let resModel = masterModel.getResponseModel();
    try {
        payload = req.body;
        // **** dont change above code, please wtite your router code below **** //

        if(payload.query){
            query = payload.query;
        };

        data = await common.executeQuery(query);
        resModel.data = data;
        resModel.status = 1;

        // **** dont change below code, write your code baove this only **** //
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