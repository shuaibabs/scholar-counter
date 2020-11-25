import * as dotenv from "dotenv";
import { MySqlMaster } from "../../db/mysql/mysqlDao";
import { MasterModel } from "../../models/MasterModel";
import * as gtUtil from "../../gt-utility";

export const mysqlDAO = new MySqlMaster();
const logger = new gtUtil.Logger;
const masterModel = new MasterModel();
const cryptoJS = new gtUtil.CryptoJS();
const jwt = new gtUtil.JWT();

const key = process.env.MASTER_KEY;

export class Demo {

    async demo(payload: { fullName: string; contactNumber: string; email: string; queryDetails: string; }) {

        let startMS = new Date().getTime();
        let fullName = '';
        let contactNumber = '';
        let email = '';
        let queryDetails = '';
        let query = '';
        let queryModel: any = masterModel.getQueryModel();
        let resModel = masterModel.getResponseModel();

        try {
            fullName = payload.fullName;
            contactNumber = payload.contactNumber;
            email = payload.email;
            queryDetails = payload.queryDetails;

            //   query = "INSERT INTO demo_request (full_name, email, contact, `query`, time_stamp, requested_on) VALUES ('" + fullName + "', '" + contactNumber + "', '" + email + "', '" + queryDetails + "', '" + userID + "', '" + userID + "');"
            query = "INSERT INTO demo_request (full_name, email, contact, `query`) VALUES ('" + fullName + "', '" + contactNumber + "', '" + email + "', '" + queryDetails + "');"

            logger.log('query ::' + query);
            queryModel = await mysqlDAO.executeQuery(query);
            logger.log('querymodel' + JSON.stringify(queryModel));
            // check if query is executed successfully
            if (queryModel.status != 1) {
                throw 'Error/Issue with DB user details query: ' + queryModel.info;
            }

            // if (queryModel.fetchedRows != 1) {
            //     throw 'invalid user_id plz enter the correct username: ' + queryModel.info;
            // }

            resModel.info = 'SUCCESS: ' + queryModel.info + ' : ' + queryModel.tat + ' : ' + queryModel.message;
            resModel.data = queryModel;
            resModel.status = 1;

        } catch (error) {
            resModel.status = -9;
            resModel.info = 'catch: ' + error + ' : ' + resModel.info;
        }
        return resModel;
    }

}