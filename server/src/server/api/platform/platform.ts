import * as gtUtil from "../../gt-utility";
import { MasterModel } from "../../models/MasterModel";
import { MySqlMaster } from "../../db/mysql/mysqlDao";
import dotenv from "dotenv";

dotenv.config();
const logger = new gtUtil.Logger();
const masterModel = new MasterModel();
const mySqlMaster: MySqlMaster = new MySqlMaster();

export class PlatformManagement {
  
    async getTotalPlatformDetails(payload: {userID:string}) {
        //generating query
        let startMS = new Date().getTime();
        let query = '';
        let queryModel: any = masterModel.getQueryModel();
        let resModel = masterModel.getResponseModel();
        let userID;

        try {
            // reading query parameter from request
            userID = payload.userID;
            query = "SELECT auth_account_platform.account_id, auth_account_platform.platform_id,auth_account_platform.platform,platform_code,platform_name, auth_account_platform.email,auth_account_platform.`status`,auth_account_platform.country,auth_account_platform.state,auth_account_platform.city,auth_account_platform.zip,auth_account_platform.contact_person, auth_account_platform.contact_primary,auth_account_platform.contact_secondary,auth_account_platform.sushi_url,auth_account_platform.provider_url,auth_account_platform.customer_id,auth_account_platform.requestor_id, auth_account_platform.api_key,auth_account_platform.username, auth_account_platform.password,auth_account_platform.remarks,auth_account_platform.created_on  FROM `auth_user`  INNER JOIN `auth_user_account` ON auth_user.user_id=auth_user_account.user_id INNER JOIN `auth_account_platform` ON auth_user_account.account_id=auth_account_platform.account_id WHERE `auth_user_account`.user_id='" + userID +"' ORDER  BY platform_id ASC ;";
            // getting result from executing query

            queryModel = await mySqlMaster.executeQuery(query);

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

    
    async getStatusDetailsForPieChart(payload:  { userID: string; }) {
        //generating query
        let startMS = new Date().getTime();
        let query = '';
        let queryModel: any = masterModel.getQueryModel();
        let resModel = masterModel.getResponseModel();
        let userID;

        try {
            // reading query parameter from request
            userID = payload.userID;
            query = "SELECT `status` , COUNT(*) AS `total_number`  FROM`auth_account_platform` WHERE account_id IN (SELECT account_id FROM `auth_user_account` WHERE user_id='" + userID +"') GROUP BY `status` ;";

            // getting result from executing query
            queryModel = await mySqlMaster.executeQuery(query);

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

    async createNewfPlatform(payload:  {
        account_id :string,
        platform_id:string,
        platform  :string,
        platform_code :string,
        platform_name :string,
        email :string,
        status :string,
        country :string,
        state :string,
        city :string,
        zip :string,
        contact_person :string,
        contact_primary :string,
        contact_secondary :string,
        sushi_url :string,
        provider_url :string,
        customer_id :string,
        requestor_id :string,
        api_key:string,
        username :string,
        password :string,
        customer_type:string,
    }) {
        //generating query
        let startMS = new Date().getTime();
        let query = '';
        let queryModel: any = masterModel.getQueryModel();
        let resModel = masterModel.getResponseModel();
        let account_id;
        let platform;
        let platform_code;
        let platform_name;
        let email;
        let status;
        let country;
        let state;
        let city;
        let zip;
        let contact_person;
        let contact_primary;
        let contact_secondary;
        let sushi_url;
        let provider_url;
        let customer_id;
        let requestor_id;
        let customer_type;
        let api_key;
        let username;
        let password;



        try {
            // reading query parameter from request
            account_id = payload.account_id;
            platform = payload.platform;
            platform_code = payload.platform_code;
            platform_name = payload.platform_name;
            email = payload.email;
            status = payload.status;
            country = payload.country;
            state = payload.state;
            city = payload.city;
            zip = payload.zip;
            contact_person = payload.contact_person;
            contact_primary = payload.contact_primary;
            contact_secondary = payload.contact_secondary;
            sushi_url = payload.sushi_url;
            provider_url = payload.provider_url;
            customer_id = payload.customer_id;
            requestor_id = payload.requestor_id;
            api_key = payload.api_key;
            username = payload.username;
            password = payload.password;
            customer_type = payload.customer_type;

            // Condition START  handle INTEGERS VALUE WHICH ARE    i.e 'undefined' , NULL ,''
            if (payload.account_id == 'undefined' || payload.account_id == null || payload.account_id == '') {
                account_id = 0
            }

            if (payload.zip == 'undefined' || payload.zip == null || payload.zip == '') {
                zip = 0
            }

            if (payload.contact_primary == 'undefined' || payload.contact_primary == null || payload.contact_primary == '') {
                contact_primary = 0
            }


            if (payload.contact_secondary == 'undefined' || payload.contact_secondary == null || payload.contact_secondary == '') {
                contact_secondary = 0
            }


            //CONDITION END

            query = "INSERT INTO `auth_account_platform`(account_id,platform,platform_code,platform_name,email, `status`,country,state,city,zip,contact_person,contact_primary,contact_secondary,sushi_url,provider_url,customer_id,requestor_id,customer_type,api_key,username,`password`) VALUES ('" + account_id + "','" + platform + "','" + platform_code + "','" + platform_name + "','" + email + "','" + status + "','" + country + "','" + state + "','" + city + "','" + zip + "','" + contact_person + "','" + contact_primary + "','" + contact_secondary + "','" + sushi_url + "','" + provider_url + "','" + customer_id + "','" + requestor_id + "','" + customer_type + "','" + api_key + "','" + username + "','" + password + "');";

            logger.log( query)
            console.log('checking        :' + query)

            // getting result from executing query
            queryModel = await mySqlMaster.executeQuery(query);

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

    async UpdatePlatform(payload: {
        account_id :string,
        platform_id:string,
        platform  :string,
        platform_code :string,
        platform_name :string,
        email :string,
        status :string,
        country :string,
        state :string,
        city :string,
        zip :string,
        contact_person :string,
        contact_primary :string,
        contact_secondary :string,
        sushi_url :string,
        provider_url :string,
        customer_id :string,
        requestor_id :string,
        api_key:string,
        username :string,
        password :string,
        customer_type:string,
    }) {
        //generating query
        let startMS = new Date().getTime();
        let query = '';
        let queryModel: any = masterModel.getQueryModel();
        let resModel = masterModel.getResponseModel();
        let account_id;
        let platform_id;
        let platform;
        let platform_code;
        let platform_name;
        let email;
        let status;
        let country;
        let state;
        let city;
        let zip;
        let contact_person;
        let contact_primary;
        let contact_secondary;
        let sushi_url;
        let provider_url;
        let customer_id;
        let requestor_id;
        let customer_type;
        let api_key;
        let username;
        let password;



        try {
            // reading query parameter from request
            account_id = payload.account_id;
            platform_id = payload.platform_id;
            platform = payload.platform;
            platform_code = payload.platform_code;
            platform_name = payload.platform_name;
            email = payload.email;
            status = payload.status;
            country = payload.country;
            state = payload.state;
            city = payload.city;
            zip = payload.zip;
            contact_person = payload.contact_person;
            contact_primary = payload.contact_primary;
            contact_secondary = payload.contact_secondary;
            sushi_url = payload.sushi_url;
            provider_url = payload.provider_url;
            customer_id = payload.customer_id;
            requestor_id = payload.requestor_id;
            api_key = payload.api_key;
            username = payload.username;
            password = payload.password;
            customer_type = payload.customer_type;

            // Condition START  handle INTEGERS VALUE WHICH ARE    i.e 'undefined' , NULL ,''
            if (payload.account_id == 'undefined' || payload.account_id == null || payload.account_id == '') {
                account_id = 0
            }

            if (payload.zip == 'undefined' || payload.zip == null || payload.zip == '') {
                zip = 0
            }

            if (payload.contact_primary == 'undefined' || payload.contact_primary == null || payload.contact_primary == '') {
                contact_primary = 0
            }


            if (payload.contact_secondary == 'undefined' || payload.contact_secondary == null || payload.contact_secondary == '') {
                contact_secondary = 0
            }


            //CONDITION END

            query = " UPDATE `auth_account_platform` SET platform='" + platform + "',platform_code='" + platform_code + "',platform_name='" + platform_name + "',email='" + email + "', `status`='" + status + "', country='" + country + "',state='" + state + "',city='" + city + "',zip='" + zip + "',contact_person='" + contact_person + "',contact_primary='" + contact_primary + "',contact_secondary='" + contact_secondary + "',sushi_url='" + sushi_url + "',provider_url='" + provider_url + "',customer_id='" + customer_id + "', requestor_id='" + requestor_id + "',customer_type='" + customer_type + "',api_key='" + api_key + "',username='" + username + "',`password`='" + password + "' where account_id='" + account_id + "' and platform_id='" + platform_id + "'";
            console.log('checking        :' + query)

            // getting result from executing query
            queryModel = await mySqlMaster.executeQuery(query);

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

    async DeletePlatform(payload: {account_id: string, platform_id:String}) {
        //generating query
        let startMS = new Date().getTime();
        let query = '';
        let queryModel: any = masterModel.getQueryModel();
        let resModel = masterModel.getResponseModel();
        let account_id;
        let platform_id;
        try {
            // reading query parameter from request
            account_id = payload.account_id;
            platform_id = payload.platform_id;


            query = "DELETE FROM `auth_account_platform` WHERE `account_id`='" + account_id + "' and platform_id='" + platform_id + "'";
            // getting result from executing query
            queryModel = await mySqlMaster.executeQuery(query);

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

    async getSingleAndSpecificPlatformDetails(payload:  {account_id: string, platform_id:String}) {
        //generating query
        let startMS = new Date().getTime();
        let query = '';
        let queryModel: any = masterModel.getQueryModel();
        let resModel = masterModel.getResponseModel();
        let account_id;
        let platform_id;

        try {

            // reading query parameter from request
            account_id = payload.account_id;
            platform_id = payload.platform_id
            query = "SELECT * FROM `auth_account_platform` where account_id=' " + account_id + "' and platform_id=' " + platform_id + "';";
            // getting result from executing query
            queryModel = await mySqlMaster.executeQuery(query);

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

   
    async getPlatformReportList(payload: {userID: string}) {
        //generating query
        let startMS = new Date().getTime();
        let query = '';
        let queryModel: any = masterModel.getQueryModel();
        let resModel = masterModel.getResponseModel();
        let userID;

        try {
            // reading query parameter from request
            userID = payload.userID;
            query = " SELECT  report_id, report_name, COUNT(*) AS `report_count` "
            + " FROM platform_reports "
            + " WHERE platform_id IN "
            + " (SELECT platform_id FROM auth_account_platform WHERE account_id IN "
            + " (SELECT account_id FROM auth_user_account WHERE user_id = '" + userID + "') ) "
            + " GROUP BY report_id, report_name "
            + " ORDER BY report_name ASC ";

            logger.log('getPlatformReportList: ' + query);  

            // getting result from executing query
            queryModel = await mySqlMaster.executeQuery(query);

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


    async getPlatformReportData(payload: {userID: string}) {
        //generating query
        let startMS = new Date().getTime();
        let query = '';
        let queryModel: any = masterModel.getQueryModel();
        let resModel = masterModel.getResponseModel();
        let userID;

        try {
            // reading query parameter from request
            userID = payload.userID;
            query = "SET @sql = NULL; "
                + "  SELECT GROUP_CONCAT("
                + " DISTINCT CONCAT( 'max(case when report_id = \'\'', report_id, ''' then report_status end) ', report_id ) "
                + " ) INTO @sql "
                + " FROM `view_acc_platform_reports`; "
                + " SET @sql = CONCAT('SELECT account_id, platform_id, platform_name, platform_code, ', @sql, "
                + " ' FROM view_acc_platform_reports "
                + " where view_acc_platform_reports.account_id in (select account_id from auth_user_account where user_id=''" + userID + "'')"
                + " GROUP BY account_id, platform_id, platform_name, platform_code'); "
                + " PREPARE stmt FROM @sql; "
                + " EXECUTE stmt; "
                + " DEALLOCATE PREPARE stmt;" ;

            query = "CALL `sp_get_platform_reports`(" + userID +")";

            logger.log('getPlatformReportData: ' + query);

            // getting result from executing query
            queryModel = await mySqlMaster.executeQuery(query);


            logger.log('getPlatformReportData: ' + JSON.stringify(queryModel));

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