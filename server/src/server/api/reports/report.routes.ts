import { Request, Response } from "express";
import express from "express";
import * as gtUtil from "../../gt-utility";
import { MasterModel } from "../../models/MasterModel";
import { MySqlMaster } from "../../db/mysql/mysqlDao";
import dotenv from "dotenv";
import { Reports } from "./report"
dotenv.config();

export const router = express.Router();
const logger = new gtUtil.Logger();
const masterModel = new MasterModel();
const methods = new gtUtil.Methods();
const cryptoJS = new gtUtil.CryptoJS();
const jwt = new gtUtil.JWT();
const report = new Reports();

let authorizationPath: string = "/" + cryptoJS.MD5(methods.getDateMySQL());


// API for testing get request , executing the query
router.post("/reporttypes", async (req: Request, res: Response) => {

    // getting response model
    let startMS = new Date().getTime();
    let payload;
    let resModel = masterModel.getResponseModel();
    try {
        payload = req.body;
        // **** dont change above code, please wtite your router code below **** /

        // resModel = await testApi.getQueryResult(payload);
        resModel = await report.get_ReportTypes(payload)
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
router.post("/report/reportname", async (req: Request, res: Response) => {

    // getting response model
    let startMS = new Date().getTime();
    let payload;
    let resModel = masterModel.getResponseModel();
    try {
        payload = req.body;
        // **** dont change above code, please wtite your router code below **** /

        // resModel = await testApi.getQueryResult(payload);
        resModel = await report.getReportName(payload)
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
router.post("/metrictypes", async (req: Request, res: Response) => {

    // getting response model
    let startMS = new Date().getTime();
    let payload;
    let resModel = masterModel.getResponseModel();
    try {
        payload = req.body;
        // **** dont change above code, please wtite your router code below **** /

        // resModel = await testApi.getQueryResult(payload);
        resModel = await report.get_Metric_types(payload)
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
router.post("/datatypes", async (req: Request, res: Response) => {

    // getting response model
    let startMS = new Date().getTime();
    let payload;
    let resModel = masterModel.getResponseModel();
    try {
        payload = req.body;
        // **** dont change above code, please wtite your router code below **** /

        // resModel = await testApi.getQueryResult(payload);
        resModel = await report.get_Data_types(payload)
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
router.post("/accesstypes", async (req: Request, res: Response) => {

    // getting response model
    let startMS = new Date().getTime();
    let payload;
    let resModel = masterModel.getResponseModel();
    try {
        payload = req.body;
        // **** dont change above code, please wtite your router code below **** /

        // resModel = await testApi.getQueryResult(payload);
        resModel = await report.get_Access_types(payload)
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
router.post("/accessmethods", async (req: Request, res: Response) => {

    // getting response model
    let startMS = new Date().getTime();
    let payload;
    let resModel = masterModel.getResponseModel();
    try {
        payload = req.body;
        // **** dont change above code, please wtite your router code below **** /

        // resModel = await testApi.getQueryResult(payload);
        resModel = await report.get_Access_method(payload)
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
router.post("/report/preview", async (req: Request, res: Response) => {

    // getting response model
    let startMS = new Date().getTime();
    let payload;
    let resModel = masterModel.getResponseModel();
    try {
        payload = req.body;
        // **** dont change above code, please wtite your router code below **** /

        // resModel = await testApi.getQueryResult(payload);
        resModel = await report.getTablePreview(payload)
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