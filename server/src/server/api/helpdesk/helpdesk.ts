import * as gtUtil from "../../gt-utility";
import { MasterModel } from "../../models/MasterModel";
import { MySqlMaster } from "../../db/mysql/mysqlDao";
import dotenv from "dotenv";
import { time, timeStamp } from "console";

dotenv.config();
const logger = new gtUtil.Logger();
const masterModel = new MasterModel();
const mySqlMaster: MySqlMaster = new MySqlMaster();

export class Helpdesk {

    async getUser(payload: any) {
        let startMS = new Date().getTime();
        let query = '';
        let queryModel: any = masterModel.getQueryModel();
        let resModel = masterModel.getResponseModel();
        let account_id;
        try {
            // reading query parameter from request
            account_id = payload.accountID;
            query = " SELECT auth_user_account.user_id, auth_user.login_id, CONCAT(auth_user.first_name , ' ' , auth_user.last_name) AS `name` FROM auth_user INNER JOIN auth_user_account ON auth_user_account.user_id = `auth_user`.user_id  WHERE account_id = '" + account_id + "';"
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

    async submitDetails(payload: any) {
        let startMS = new Date().getTime();
        let query = '';
        let userquery = '';
        let queryModel: any = masterModel.getQueryModel();
        let userqueryModel: any = masterModel.getQueryModel();
        let resModel = masterModel.getResponseModel();
        let account_id;
        let user;
        let complainUser;
        let menu;
        let content;
        let subject;
        let contentMessage;
        try {
            // reading query parameter from request
            account_id = payload.accountID;
            user = payload.user;
            complainUser = payload.ComplainUser;
            menu = payload.menu;
            content = payload.content;
            subject = payload.subject;

            userquery = "SELECT login_id, CONCAT(first_name ,' ' , last_name) AS `name` FROM auth_user WHERE user_id = '" + user + "';"

            // getting result from executing query
            userqueryModel = await mySqlMaster.executeQuery(userquery);

            contentMessage = '<span style=\"color: rgb(0, 102, 204);\">Created By : </span>' + userqueryModel.rows[0].name + '  ' + '||' + '  ' + userqueryModel.rows[0].login_id + '  ' + '||' + ' ' + new Date() + ' ' + '<br>' + '<br>' + content;

            query = "INSERT INTO `helpdesk_contact`(`account_id`, `user_id`, `complain_user_id`, `menu`, `content`, `subject`) VALUES ('" + account_id + "', '" + user + "', '" + complainUser + "', '" + menu + "', '" + contentMessage + "', '" + subject + "');"

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

    async getUserTicket(payload: any) {
        let startMS = new Date().getTime();
        let query = '';
        let queryModel: any = masterModel.getQueryModel();
        let resModel = masterModel.getResponseModel();
        let account_id;
        try {
            // reading query parameter from request
            account_id = payload.accountID;

            query = "SELECT `ticket_id`, login_id, complain_user_id, `menu`, `subject`, status FROM `helpdesk_contact` INNER JOIN auth_user ON auth_user.user_id = helpdesk_contact.complain_user_id WHERE account_id = '" + account_id + "' ORDER BY ticket_id DESC;"

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

    async getTicketData(payload: any) {
        let startMS = new Date().getTime();
        let query = '';
        let queryModel: any = masterModel.getQueryModel();
        let resModel = masterModel.getResponseModel();
        let ticket_id;
        try {
            // reading query parameter from request
            ticket_id = payload.ticket_id;

            query = "SELECT ticket_id, content, subject FROM helpdesk_contact WHERE ticket_id = '" + ticket_id + "' ;"

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

    async replyticket(payload: any) {
        let startMS = new Date().getTime();
        let query = '';
        let userquery = '';
        let userqueryModel: any = masterModel.getQueryModel();
        let queryModel: any = masterModel.getQueryModel();
        let resModel = masterModel.getResponseModel();
        let ticketID;
        let userID;
        let replyContent;
        let complain;
        try {
            // reading query parameter from request
            userID = payload.userID;
            ticketID = payload.ticketID;
            replyContent = payload.replyContent;


            userquery = "SELECT login_id, CONCAT(first_name ,' ' , last_name) AS `name` FROM auth_user WHERE user_id = '" + userID + "';"

            // getting result from executing query
            userqueryModel = await mySqlMaster.executeQuery(userquery);

            // complain ='Reply BY : ' +  userqueryModel.rows[0].name + '(' + userqueryModel.rows[0].login_id + ')' + replyContent;

            complain = '<span style=\"color: rgb(0, 102, 204);\">Updated By : </span>' + userqueryModel.rows[0].name + '  ' + '||' + '  ' + userqueryModel.rows[0].login_id + '  ' + '||' + ' ' + new Date() + ' ' + '<br>' + '<br>' + replyContent;

            if (userqueryModel.status == 1) {

                query = "UPDATE `helpdesk_contact` SET content = '" + complain + "', `status` = 'Open' WHERE ticket_id = '" + ticketID + "';";

                queryModel = await mySqlMaster.executeQuery(query);
            }

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


    async ticketClosed(payload: any) {
        let startMS = new Date().getTime();
        let query = '';
        let queryModel: any = masterModel.getQueryModel();
        let resModel = masterModel.getResponseModel();
        let ticket_id;
        try {
            // reading query parameter from request
            ticket_id = payload.ticketID;

            query = "UPDATE `helpdesk_contact` SET `status` = 'Closed' WHERE ticket_id = '" + ticket_id + "';"

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


    async getFaqData(payload: any) {
        let startMS = new Date().getTime();
        let query1 = '';
        let query2 = '';
        let query3 = '';
        let queryModel: any = masterModel.getQueryModel();
        let queryModel2: any = masterModel.getQueryModel();
        let queryModel3: any = masterModel.getQueryModel();
        let resModel = masterModel.getResponseModel();
        let faq: any = [];
        try {
            // reading query parameter from request

            query1 = "SELECT DISTINCT `categroy` FROM `user_faq`;"
            // getting result from executing query
            queryModel = await mySqlMaster.executeQuery(query1);

            query2 = "SELECT DISTINCT `categroy` , `sub_categroy` FROM `user_faq`;"
            queryModel2 = await mySqlMaster.executeQuery(query2);

            query3 = "SELECT DISTINCT `categroy` , `sub_categroy` , `question`, `answer` FROM `user_faq`;"
            queryModel3 = await mySqlMaster.executeQuery(query3);

            for (let i = 0; i < queryModel.rows.length; i++) {
                let categroy = {
                    categroy: queryModel.rows[i].categroy,
                    sub_categorize: [] as any
                }

                for (let j = 0; j < queryModel2.rows.length; j++) {

                    if (queryModel.rows[i].categroy === queryModel2.rows[j].categroy) {
                        let sub_categroy = {
                            sub_categroy: queryModel2.rows[j].sub_categroy,
                            QA: [] as any
                        }
                        categroy.sub_categorize.push(sub_categroy)

                        for (let k = 0; k < queryModel3.rows.length; k++) {

                            if (queryModel.rows[i].categroy === queryModel2.rows[j].categroy && queryModel2.rows[j].sub_categroy === queryModel3.rows[k].sub_categroy) {
                                let QAModel = {
                                    question: queryModel3.rows[k].question,
                                    answer: queryModel3.rows[k].answer
                                }
                                sub_categroy.QA.push(QAModel)
                            }

                        }
                    }

                }
                faq.push(categroy);
            }


            //checking result and setting the model accordingly
            if (queryModel.status == 1) {
                // updating model values
                resModel.status = queryModel.status;
                resModel.info = 'OK: DB Query: ' + queryModel.info + ' : ' + queryModel.tat + ' : ' + queryModel.message;
                resModel.data = faq;
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