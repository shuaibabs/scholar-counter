import { Request, Response } from "express";
import express from "express";
import * as gtUtil from "../../gt-utility";
import { MasterModel } from "../../models/MasterModel";
import dotenv from "dotenv";
import {PlatformManagement} from "./platform"
dotenv.config();

export const router = express.Router();
const logger = new gtUtil.Logger();
const masterModel = new MasterModel();
const methods = new gtUtil.Methods();
const platform = new PlatformManagement();

router.post("/platform/total/details", async (req: Request, res: Response) => {

    // getting response model
    let startMS = new Date().getTime();
    let payload;
    let resModel = masterModel.getResponseModel();
    try {
        payload = req.body;
        // **** dont change above code, please wtite your router code below **** //

         resModel = await platform.getTotalPlatformDetails(payload);
         resModel.status = 1;
         resModel.info = 'SUCCESS';
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

router.post("/platform/status/details", async (req: Request, res: Response) => {

    // getting response model
    let startMS = new Date().getTime();
    let payload;
    let resModel = masterModel.getResponseModel();
    try {
        payload = req.body;
        // **** dont change above code, please wtite your router code below **** //

         resModel = await platform.getStatusDetailsForPieChart(payload);
         resModel.status = 1;
         resModel.info = 'SUCCESS';
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

router.post("/platform/create", async (req: Request, res: Response) => {

    // getting response model
    let startMS = new Date().getTime();
    let payload;
    let resModel = masterModel.getResponseModel();
    try {
        payload = req.body;
        // **** dont change above code, please wtite your router code below **** //

         resModel = await platform.createNewfPlatform(payload);
         resModel.status = 1;
         resModel.info = 'SUCCESS';
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

router.post("/platform/update", async (req: Request, res: Response) => {

    // getting response model
    let startMS = new Date().getTime();
    let payload;
    let resModel = masterModel.getResponseModel();
    try {
        payload = req.body;
        // **** dont change above code, please wtite your router code below **** //

         resModel = await platform.UpdatePlatform(payload);
         resModel.status = 1;
         resModel.info = 'SUCCESS';
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

router.post("/platform/delete", async (req: Request, res: Response) => {

    // getting response model
    let startMS = new Date().getTime();
    let payload;
    let resModel = masterModel.getResponseModel();
    try {
        payload = req.body;
        // **** dont change above code, please wtite your router code below **** //

         resModel = await platform.DeletePlatform(payload);
         resModel.status = 1;
         resModel.info = 'SUCCESS';
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

router.post("/platform/singleAndSpecific/detail", async (req: Request, res: Response) => {

    // getting response model
    let startMS = new Date().getTime();
    let payload;
    let resModel = masterModel.getResponseModel();
    try {
        payload = req.body;
        // **** dont change above code, please wtite your router code below **** //

         resModel = await platform.getSingleAndSpecificPlatformDetails(payload);
         resModel.status = 1;
         resModel.info = 'SUCCESS';
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


router.post("/platform/reportlist", async (req: Request, res: Response) => {

    // getting response model
    let startMS = new Date().getTime();
    let payload;
    let resModel = masterModel.getResponseModel();
    try {
        payload = req.body;
        // **** dont change above code, please wtite your router code below **** //

         resModel = await platform.getPlatformReportList(payload);
         resModel.status = 1;
         resModel.info = 'SUCCESS';
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

router.post("/platform/reportdata", async (req: Request, res: Response) => {

    // getting response model
    let startMS = new Date().getTime();
    let payload;
    let resModel = masterModel.getResponseModel();
    try {
        payload = req.body;
        // **** dont change above code, please wtite your router code below **** //

         resModel = await platform.getPlatformReportData(payload);
         resModel.status = 1;
         resModel.info = 'SUCCESS';

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