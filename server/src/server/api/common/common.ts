import * as gtUtil from "../../gt-utility";
import { Request, Response, json } from "express";
import { MasterModel } from "../../models/MasterModel";
import { MySqlMaster } from "../../db/mysql/mysqlDao";
import dotenv from "dotenv";

dotenv.config();
const logger = new gtUtil.Logger();
const masterModel = new MasterModel();
const mySqlMaster: MySqlMaster = new MySqlMaster();

export class Common {


    // user profile update
    async logUserActivity(payload: { userID: string; message: string; action: string; }) {

        let startMS = new Date().getTime();
        let userID = '';
        let query = '';
        let queryModel: any = masterModel.getQueryModel();
        let resModel = masterModel.getResponseModel();
        let message = '';
        let action = '';

        try {
            userID = payload.userID;
            message = payload.message;
            action = payload.action;

            if (userID == 'undefined' || userID == null || userID.length <= 0) {
                throw 'Invalid userID:' + userID;
            }

            query = "insert into audit_log (user_id, `message`, `action`) values ('"
                + userID + "','" + message + "','" + action + "')";
                logger.log('logUserActivity: query: ' + query);
            queryModel = await mySqlMaster.executeQuery(query);

            // check if query is executed successfully
            if (queryModel.status != 1) {
                throw 'Error/Issue with DB query: ' + queryModel.info;
            }

            if (queryModel.affectedRows != 1) {
                throw 'No/Zero Record Affected: ' + queryModel.info;
            }

            resModel.info = 'SUCCESS: ' + queryModel.info + ' : ' + queryModel.tat + ' : ' + queryModel.message;
            resModel.data = queryModel;
            resModel.status = 1;

        } catch (error) {
            resModel.status = -9;
            resModel.info = 'catch: ' + error + ' : ' + resModel.info;
            logger.log('logUserActivity: catch: ' + error + ' : ' + query + ' : ' + resModel.info);
        }
        return resModel;
    }

    async executeQuery(query: string) {

        let mySqlMaster: MySqlMaster;
        let queryModel:any = masterModel.getQueryModel();
        try {
            mySqlMaster = new MySqlMaster();
            queryModel = await mySqlMaster.executeQuery(query);

        } catch (error) {
            logger.error("Common.executeQuery(query): " + error + ": " + JSON.stringify(error));
        }
        return queryModel;
    }

}