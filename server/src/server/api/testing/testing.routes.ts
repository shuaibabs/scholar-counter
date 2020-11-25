import { Request, Response } from "express";
import express from "express";
import * as gtUtil from "../../gt-utility";
import { MasterModel } from "../../models/MasterModel";
import { Testing } from "./testing"
import dotenv from "dotenv";
dotenv.config();

export const router = express.Router();
const logger = new gtUtil.Logger();
const masterModel = new MasterModel();
const methods = new gtUtil.Methods();
const cryptoJS = new gtUtil.CryptoJS();
const jwt = new gtUtil.JWT();


let authorizationPath: string = "/" + cryptoJS.MD5(methods.getAuthKey());

// API for testing get request , executing the query
router.post(authorizationPath + "/test", async (req: Request, res: Response) => {

    // getting response model
    let startMS = new Date().getTime();
    let payload;
    let resModel = masterModel.getResponseModel();
    try {
        payload = req.body;
        // **** dont change above code, please wtite your router code below **** //

        // resModel = await testApi.getQueryResult(payload);
        resModel.data = { "output": "TESTING REQUEST SUCCESS", "payload": payload };

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
router.post(authorizationPath + "/gettoken", async (req: Request, res: Response) => {
    // getting response model
    let startMS = new Date().getTime();
    let payload;
    let token = '';
    let authorization = '';
    let resModel = masterModel.getResponseModel();
    try {
        payload = req.body;
        // **** dont change above code, please wtite your router code below **** //

        authorization = req.headers['authorization'] + '';

        let userID = payload.username;
        token = jwt.getJwtToken({ userID: userID, dt: new Date() });
        if (token == '' || token == null || token == 'undefined') {
            throw 'Not able to generate TOKEN for authentication, contact system admin!';
        } else {
            //setting authorization header of response
            res.setHeader("token", token);
        }

        // resModel = await testApi.getQueryResult(payload);
        resModel.data = { authorization: authorization, username: userID, token: token };

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
router.post(authorizationPath + "/executequery", async (req: Request, res: Response) => {

    // getting response model
    let startMS = new Date().getTime();
    let payload;
    let data: any;
    let query = "SELECT CURRENT_DATE() AS `Todays_Date`, MD5(CURRENT_DATE()) AS `authorization`, LENGTH( MD5(CURRENT_DATE())) AS `MD5_Length`";
    let resModel = masterModel.getResponseModel();
    try {
        payload = req.body;
        // **** dont change above code, please wtite your router code below **** //

        if(payload.query){
            query = payload.query;
        };
        
        let tester: Testing = new Testing();

        data = await tester.executeQuery(query);
        resModel.data = data;

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
