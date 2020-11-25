import * as dotenv from "dotenv";
import { MySqlMaster } from "../../db/mysql/mysqlDao";
import { MasterModel } from "../../models/MasterModel";
import { UserManagement } from '../user/user';
import * as gtUtil from "../../gt-utility";
import { json } from "express";

export const mysqlDAO = new MySqlMaster();
const logger = new gtUtil.Logger;
const masterModel = new MasterModel();

export class Login {

  userMgnt = new UserManagement();

  // This is use only for valid user_id
  async userValidate(payload: { loginID: string; }) {
    let startMS = new Date().getTime();
    let loginID = '';
    let query = '';
    let queryModel: any = masterModel.getQueryModel();
    let resModel = masterModel.getResponseModel();

    try {
      loginID = payload.loginID;
      if (loginID == 'undefined' || loginID == null || loginID.length <= 0) {
        throw 'Invalid userID:' + loginID;
      }

      //executing query
      // CONVERT(column USING utf8)
      query = "SELECT l.login_id, u.email, u.user_id,CONCAT(u.first_name,' ',u.middle_name,' ',u.last_name) AS full_name , u.photo "
        + "FROM auth_login l "
        + "LEFT JOIN auth_user u "
        + "ON l.login_id = u.login_id "
        + "WHERE l.login_id = '" + loginID + "';"
      queryModel = await mysqlDAO.executeQuery(query);

      // check if query is executed successfully
      if (queryModel.status != 1) {
        throw 'Error/Issue with DB user details query: ' + queryModel.info;
      }

      if (queryModel.fetchedRows != 1) {
        throw 'invalid user_id plz enter the correct username: ' + queryModel.info;
      }

      resModel.info = 'SUCCESS: ' + queryModel.info + ' : ' + queryModel.tat + ' : ' + queryModel.message;
      resModel.data = queryModel;
      resModel.status = 1;

    } catch (error) {
      resModel.status = -9;
      resModel.info = 'catch: ' + error + ' : ' + resModel.info;
    }
    return resModel;
  }

  // This API for validate password or user status blocked or not
  async userLogin(payload: { loginID: string; password: string; }) {
    let startMS = new Date().getTime();
    let loginID: string = '';
    let userID: string = '';
    let passwd: string = '';
    let failAttemptCount: number = 0;
    let login = false;
    let loginStatus = 'STATUS';
    let loginPasswd: string = '';
    
    let queryLogin = '';
    let queryNonActiveUser = '';
    let queryLoginSuccess = '';
    let queryUserProfile = '';
    
    let queryModelLogin: any = masterModel.getQueryModel();
    let queryModelNonActiveUser: any = masterModel.getQueryModel();
    let queryModelLoginSuccess: any = masterModel.getQueryModel();
    let queryModelUserProfile: any = masterModel.getQueryModel();
    let queryModelLoginFailed: any = masterModel.getQueryModel();

    let resModel = masterModel.getResponseModel();

    try {
      loginID = payload.loginID;
      passwd = payload.password;

      if (loginID == 'undefined' || loginID == null || loginID.length <= 8) {
        throw 'Invalid login ID:' + loginID;
      }

      if (passwd == 'undefined' || passwd == null || passwd.length <= 8) {
        throw 'Invalid passwd:' + passwd;
      }

      // query to validate Login ID
      queryLogin = "SELECT * FROM auth_login WHERE login_id = '" + loginID + "'";
      queryModelLogin = await mysqlDAO.executeQuery(queryLogin);
      if(queryModelLogin.fetchedRows != 1 || queryModelLogin.status != 1){
        throw new Error('Invalid Login ID: ' + loginID + ': ' + queryModelLogin.fetchedRows + ' users found');
      }else{
        loginStatus = queryModelLogin.rows[0].status+'';
        loginPasswd = queryModelLogin.rows[0].passwd + '';
        failAttemptCount = queryModelLogin.rows[0].failed_login_attempts;
      }

      //check for user status
      if((loginStatus).toUpperCase() != 'ACTIVE'){
        queryNonActiveUser = "UPDATE auth_login SET "
        + " failed_login_attempts = (failed_login_attempts + 1), "
        + " remarks=SUBSTRING(CONCAT(Now(), ': User Not Active: ', `status`, '\n#', remarks), 1, 1024)"
        + " WHERE  login_id = '" + loginID + "'";
        queryModelNonActiveUser = await mysqlDAO.executeQuery(queryNonActiveUser);
        if(queryModelNonActiveUser.status != 1){
          logger.log('userLogin: queryModelNonActiveUser: ' + JSON.stringify(queryModelNonActiveUser));
        }
        throw new Error('User Not Active: ' + (loginStatus).toUpperCase());
      }

      // check for user password
      if((loginPasswd + '') != (passwd + '')){
        login = false;
      }else{
        login = true;
      }

      // check if its a valid login
      if(login){
        // LOGIN SUCCESS
        queryLoginSuccess = "UPDATE `auth_login` SET `last_login_success` = CURRENT_TIMESTAMP(), `failed_login_attempts`= 0, "
        + " remarks=SUBSTRING(CONCAT(Now(), ': Login Successfull \n#', remarks), 1, 1024)"
        + " WHERE login_id = '" + loginID + "'";
        queryModelLoginSuccess= await mysqlDAO.executeQuery(queryLoginSuccess);
        if(queryModelLoginSuccess.status != 1){
          logger.log('userLogin: queryModelLoginSuccess: ' + JSON.stringify(queryModelLoginSuccess));
        }

        // getting user data
        queryUserProfile= "SELECT auth_user.*, auth_account.*, auth_login.*, master_role.role_id, master_role.role "
              + " FROM auth_user "
              + " INNER JOIN auth_login  ON auth_user.login_id = auth_login.login_id "
              + " INNER JOIN auth_user_account  ON auth_user.user_id = auth_user_account.user_id "
              + " INNER JOIN auth_user_role ON auth_user.user_id = auth_user_role.user_id "
              + " INNER JOIN auth_account  ON auth_user_account.account_id  = auth_account.account_id "
              + " INNER JOIN master_role ON auth_user_role.role_id = master_role.role_id "
              + " WHERE auth_user.login_id = '" + loginID + "'";
        queryModelUserProfile = await mysqlDAO.executeQuery(queryUserProfile);
        if(queryModelUserProfile.fetchedRows != 1 && queryModelUserProfile.status == 1){
          throw new Error('No Valid User Found for Login ID: ' + queryModelUserProfile.fetchedRows + ' users found');
        }
        userID = queryModelUserProfile.rows[0].user_id;

      }else{
        // LOGIN FAIL
        let queryFailedLogin = "UPDATE auth_login SET `status` = CASE "
        + " WHEN (failed_login_attempts >= 5 && `status` = 'Active') THEN 'Blocked' "
        + " ELSE  `status` "
        + " END, "
        + " failed_login_attempts = (failed_login_attempts + 1) "
        + " WHERE  login_id = '" + loginID + "'";
        queryModelLoginFailed = await mysqlDAO.executeQuery(queryFailedLogin);
        if(queryModelLoginFailed.status != 1){
          logger.log('userLogin: queryModelLoginFailed: ' + JSON.stringify(queryModelLoginFailed));
        }

        resModel.info = 'Login Failed, Invalid Credentials';
        throw new Error('Login Failed, Invalid Credentials');
      }
      
      //getting Menu & Tab details
      let menuPayload = { userID: userID };
      let menuModel = await this.userMgnt.getUserMenusData(menuPayload);

      // creating final model for login API
      resModel.data = {
        userDetails: queryModelUserProfile,
        authDetails: menuModel
      }

      resModel.info = resModel.info + 'SUCCESS: ' + queryModelUserProfile.info + ' : ' + queryModelUserProfile.tat + ' : ' + queryModelUserProfile.message;
      resModel.status = 1;
    } catch (error) {
      resModel.status = -9;
      resModel.info = 'catch: ' + error + ' : ' + resModel.info;
      resModel.data = {failed_login_attempts: failAttemptCount, status: loginStatus};
      logger.error('userLogin: ' + JSON.stringify(resModel));
    }
    return resModel;
  }


  async search(payload: any) {
    let startMS = new Date().getTime();
    let loginID = '';
    let query = '';
    let queryModel: any = masterModel.getQueryModel();
    let resModel = masterModel.getResponseModel();

    try {
      loginID = payload.loginID;
      if (loginID == 'undefined' || loginID == null || loginID.length <= 0) {
        throw 'Invalid userID:' + loginID;
      }

      console.log('loginID::' + JSON.stringify(loginID))
      //executing query
      // CONVERT(column USING utf8)
      query = "SELECT `security_question_1`, `security_answer_1`, `security_question_2`, `security_answer_2`, `security_question_3`, `security_answer_3` FROM `auth_user` WHERE login_id = '" + loginID   + "';"

      logger.log('query::' + query)
      
      queryModel = await mysqlDAO.executeQuery(query);

      logger.log('queryModel::' + JSON.stringify(queryModel))

      // check if query is executed successfully
      if (queryModel.status != 1) {
        throw 'Error/Issue with DB user details query: ' + queryModel.info;
      }

      if (queryModel.fetchedRows != 1) {
        throw 'invalid user_id plz enter the correct username: ' + queryModel.info;
      }

      resModel.info = 'SUCCESS: ' + queryModel.info + ' : ' + queryModel.tat + ' : ' + queryModel.message;
      resModel.data = queryModel;
      resModel.status = 1;

    } catch (error) {
      resModel.status = -9;
      resModel.info = 'catch: ' + error + ' : ' + resModel.info;
    }
    return resModel;
  }


  async changePasswd(payload: any) {
    let startMS = new Date().getTime();
    let loginID = '';
    let query = '';
    let queryModel: any = masterModel.getQueryModel();
    let resModel = masterModel.getResponseModel();

    try {
      loginID = payload.loginID;
      if (loginID == 'undefined' || loginID == null || loginID.length <= 0) {
        throw 'Invalid userID:' + loginID;
      }

      console.log('loginID::' + JSON.stringify(loginID))
      //executing query
      // CONVERT(column USING utf8)
      query = "UPDATE `auth_login` SET `passwd` = '123456789' WHERE `login_id` = '" + loginID + "';"
      queryModel = await mysqlDAO.executeQuery(query);

      // console.log('queryModel::' + JSON.stringify(queryModel))

      // check if query is executed successfully
      if (queryModel.status != 1) {
        throw 'Error/Issue with DB user details query: ' + queryModel.info;
      }

      if (queryModel.fetchedRows != 1) {
        throw 'invalid user_id plz enter the correct username: ' + queryModel.info;
      }

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
