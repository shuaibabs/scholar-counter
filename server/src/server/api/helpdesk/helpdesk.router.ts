import { Request, Response } from "express";
import express from "express";
import * as gtUtil from "../../gt-utility";
import { MasterModel } from "../../models/MasterModel";
import dotenv from "dotenv";
import { Helpdesk } from "./helpdesk"
dotenv.config();

export const router = express.Router();
const logger = new gtUtil.Logger();
const masterModel = new MasterModel();
const methods = new gtUtil.Methods();
const helpdesk = new Helpdesk();

router.post("/helpdesk/getuser", async (req: Request, res: Response) => {

    // getting response model
    let startMS = new Date().getTime();
    let payload;
    let resModel = masterModel.getResponseModel();
    try {
        payload = req.body;
        // ** dont change above code, please wtite your router code below ** //

         resModel = await helpdesk.getUser(payload);
         resModel.status = 1;
         resModel.info = 'SUCCESS';
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

router.post("/helpdesk/submitdetails", async (req: Request, res: Response) => {

    // getting response model
    let startMS = new Date().getTime();
    let payload;
    let resModel = masterModel.getResponseModel();
    try {
        payload = req.body;
        // ** dont change above code, please wtite your router code below ** //

         resModel = await helpdesk.submitDetails(payload);
         resModel.status = 1;
         resModel.info = 'SUCCESS';
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

router.post("/helpdesk/getuserticket", async (req: Request, res: Response) => {

    // getting response model
    let startMS = new Date().getTime();
    let payload;
    let resModel = masterModel.getResponseModel();
    try {
        payload = req.body;
        // ** dont change above code, please wtite your router code below ** //

         resModel = await helpdesk.getUserTicket(payload);
         resModel.status = 1;
         resModel.info = 'SUCCESS';
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

router.post("/helpdesk/ticketing/getticketdata", async (req: Request, res: Response) => {

    // getting response model
    let startMS = new Date().getTime();
    let payload;
    let resModel = masterModel.getResponseModel();
    try {
        payload = req.body;
        // ** dont change above code, please wtite your router code below ** //

         resModel = await helpdesk.getTicketData(payload);
         resModel.status = 1;
         resModel.info = 'SUCCESS';
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

router.post("/helpdesk/ticketing/replyticket", async (req: Request, res: Response) => {

    // getting response model
    let startMS = new Date().getTime();
    let payload;
    let resModel = masterModel.getResponseModel();
    try {
        payload = req.body;
        // ** dont change above code, please wtite your router code below ** //

         resModel = await helpdesk.replyticket(payload);
         resModel.status = 1;
         resModel.info = 'SUCCESS';
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


router.post("/helpdesk/ticketing/ticketclosed", async (req: Request, res: Response) => {

    // getting response model
    let startMS = new Date().getTime();
    let payload;
    let resModel = masterModel.getResponseModel();
    try {
        payload = req.body;
        // ** dont change above code, please wtite your router code below ** //

         resModel = await helpdesk.ticketClosed(payload);
         resModel.status = 1;
         resModel.info = 'SUCCESS';
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


router.post("/helpdesk/faq/getfaqdata", async (req: Request, res: Response) => {

    // getting response model
    let startMS = new Date().getTime();
    let payload;
    let resModel = masterModel.getResponseModel();
    try {
        payload = req.body;
        // ** dont change above code, please wtite your router code below ** //

         resModel = await helpdesk.getFaqData(payload);
         resModel.status = 1;
         resModel.info = 'SUCCESS';
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