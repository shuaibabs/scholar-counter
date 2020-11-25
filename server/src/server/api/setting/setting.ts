import * as gtUtil from "../../gt-utility";
import { MasterModel } from "../../models/MasterModel";
import { MySqlMaster } from "../../db/mysql/mysqlDao";
import dotenv from "dotenv";
import { verify } from "crypto";

dotenv.config();
const logger = new gtUtil.Logger();
const masterModel = new MasterModel();
const mySqlMaster: MySqlMaster = new MySqlMaster();

export class Setting {


    async userSetting(payload: any) {
        let startMS = new Date().getTime();
        let query = '';
        let queryModel: any = masterModel.getQueryModel();
        let resModel = masterModel.getResponseModel();
        let userID = ''
        let sideMenu = '';
        let headerIcon = '';
        let notification = '';
        let windowLogout = '';
        let selectMenu = '';
        let selectedColor = '';
        let session_time_out = '';
        let Menu = '';
        try {
            // reading query parameter from request
            userID = payload.userID;
            Menu = payload.Menu;
            notification = payload.notification;
            windowLogout = payload.windowLogout;
            selectMenu = payload.selectMenu;
            selectedColor = payload.selectedColor;
            session_time_out = payload.tokenTIme;

            if (payload.Menu = 'true') {
                sideMenu = 'true',
                    headerIcon = 'true'
            } else {
                if (payload.Menu = 'Menu') {
                    sideMenu = 'true'
                } else {
                    headerIcon = 'true'
                }
            }

            query = "UPDATE `user_settings` SET `session_time_out` = '" + session_time_out + "', `side_navigation` = '" + sideMenu + "', `notification`= '" + notification + "', `on_load_page`= (SELECT router FROM `master_menu` WHERE menu_id = '" + selectMenu + "'), `window_logout` = '" + windowLogout + "', `header_icon` = '" + headerIcon + "', `theme_color` = '" + selectedColor + "' WHERE user_id = '" + userID + "';"

            logger.log('query::' + query);
            queryModel = await mySqlMaster.executeQuery(query);

            logger.log('queryModel::' + JSON.stringify(queryModel));

            //checking result and setting the model accordingly
            if (queryModel.status == 1) {
                // updating model values
                resModel.status = queryModel.status;
                resModel.info = 'OK: DB Query: ' + queryModel.info + ' : ' + queryModel.tat + ' : ' + queryModel.message;
                resModel.data = queryModel;
            } else {
                resModel.status = -3;
                resModel.info = 'ERROR: DB Query: ' + JSON.stringify(queryModel);
            }

        } catch (error) {
            resModel.status = -33;
            resModel.info = 'catch : ' + resModel.info + ' : ' + error;
            logger.error(JSON.stringify(resModel));
        } finally {
            try { resModel.tat = (new Date().getTime() - startMS) / 1000; } catch (error) { }
        }
        //returning the model
        return resModel;
    }

}