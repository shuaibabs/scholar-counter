import * as gtUtil from "../../gt-utility";
import { MasterModel } from "../../models/MasterModel";
import { MySqlMaster } from "../../db/mysql/mysqlDao";
import dotenv from "dotenv";
import { exception } from "console";

dotenv.config();
const logger = new gtUtil.Logger();
const masterModel = new MasterModel();
const mySqlMaster: MySqlMaster = new MySqlMaster();


export class UserManagement {

  async getUserRoles(payload: {userID: string, accountID: string; }) {

    let startMS = new Date().getTime();
    let accountID = '';
    let userID = '';
    let query = '';
    let queryModel: any = masterModel.getQueryModel();
    let resModel = masterModel.getResponseModel();

    try {
      accountID = payload.accountID;
      userID = payload.userID;
      if (accountID == 'undefined' || accountID == null || accountID.length <= 0) {
        throw 'Invalid accountID:' + accountID;
      }

      if (userID == 'undefined' || userID == null || userID.length <= 0) {
        throw 'Invalid userID:' + userID;
      }

      query = "SELECT DISTINCT master_role.role, master_role.role_id, master_role.description "
      + " from master_role "
      + " INNER JOIN auth_role ON master_role.role_id = auth_role.role_id"
      + " where master_role.role_id > 10 "
      + " order by role asc";
      logger.log('query ::' + query);

      queryModel = await mySqlMaster.executeQuery(query);

      // check if query is executed successfully
      if (queryModel.status != 1) {
        throw 'Error/Issue with DB user details query: ' + queryModel.info;
      }

      if (queryModel.fetchedRows <= 0) {
        throw 'invalid accountID/userID no user found: ' + queryModel.info;
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

  async getUserList(payload: { accountID: string; }) {

    let startMS = new Date().getTime();
    let accountID = '';
    let query = '';
    let queryModel: any = masterModel.getQueryModel();
    let resModel = masterModel.getResponseModel();

    try {
      accountID = payload.accountID;
      if (accountID == 'undefined' || accountID == null || accountID.length <= 0) {
        throw 'Invalid accountID:' + accountID;
      }

      //executing query
      // query = "SELECT  *FROM `auth_login` where login_id = '" + userID + "';";

      query = "SELECT `auth_user`.user_id, `auth_user`.login_id, `auth_user`.first_name, `auth_user`.middle_name, `auth_user`.last_name, "
      + " `auth_user`.contact_primary, auth_user.email, auth_login.status, master_role.role_id, master_role.role "
      + " FROM `auth_user` "
      + " INNER JOIN `auth_login` on auth_user.login_id = auth_login.login_id"
      + " INNER JOIN `auth_user_account` USING (`user_id`) "
      + " INNER JOIN `auth_user_role` USING (user_id) "
      + " INNER JOIN master_role ON auth_user_role.role_id = master_role.role_id "
      + " WHERE auth_user_account.`account_id` = '" + accountID + "';"
      logger.log('query ::' + query);

      queryModel = await mySqlMaster.executeQuery(query);

      // check if query is executed successfully
      if (queryModel.status != 1) {
        throw 'Error/Issue with DB user details query: ' + queryModel.info;
      }

      if (queryModel.fetchedRows <= 0) {
        throw 'invalid accountID no user found: ' + queryModel.info;
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

  // user profile update
  async createNewUser(
    payload: {
      loginID: '',
      userID: '',
      role: '',
      roleID: '',
      displayRole: '',
      passwd: '',
      firstName: '',
      middleName: '',
      lastName: '',
      displayName: '',
      email: '',
      contactPrimary: '0',
      contactSecondary: '0',
      status: '',
      securityQuestion1: 'Place/City of my birth?',
      securityQuestion2: 'Name of my very first school?',
      securityQuestion3: 'My favrouite subject?',
      securityAnswer1: '',
      securityAnswer2: '',
      securityAnswer3: '',
      remarks: '',
      photo: '',
      accountID: '',
      accountCode: '',
      accountName: '',
      accountDesc: '',
      logo: '',
    }) {

    let startMS = new Date().getTime();

    let loginID = '';
    let userID = '';
    let accountID = '';
    let passwd = ''
    let email = '';
    
    let queryLoginCheck = '';
    let queryLogin = '';
    let queryUser = '';
    let queryUserID = '';
    let queryRole = '';
    let queryAccount = '';

    let queryModelLoginCheck: any = masterModel.getQueryModel();
    let queryModelLogin: any = masterModel.getQueryModel();
    let queryModelUser: any = masterModel.getQueryModel();
    let queryModelUserID: any = masterModel.getQueryModel();
    let queryModelRole: any = masterModel.getQueryModel();
    let queryModelAccount: any = masterModel.getQueryModel();
    
    let resModel = masterModel.getResponseModel();

    try {
      loginID = payload.loginID;
      accountID = payload.accountID;
      email = payload.email;
      passwd = payload.passwd;


      if (loginID == 'undefined' || loginID == null || loginID.length <= 8) {
        throw 'Invalid loginID:' + loginID;
      }

      if (passwd == 'undefined' || passwd == null || passwd.length < 8) {
        throw 'Invalid Password:' + passwd;
      }

      // check if loginID already exists
      queryLoginCheck = "select 1 from auth_login where login_id='" + payload.loginID + "'";
      logger.log('queryLoginCheck: ' + queryLoginCheck);
      queryModelLoginCheck = await mySqlMaster.executeQuery(queryLoginCheck)
      if(queryModelLoginCheck.status != 1 || queryModelLoginCheck.fetchedRows > 0){
        throw new Error("Login ID : " + payload.loginID + " : already exists");
      }

      queryLogin = "insert into auth_login (login_id, passwd, `status`, remarks) values('"
      + payload.loginID + "','" + passwd + "','" + payload.status + "', SUBSTRING(CONCAT('" + payload.remarks + "', '\n#', remarks), 1, 1024) )";
      logger.log('queryLogin: ' + queryLogin);
      queryModelLogin = await mySqlMaster.executeQuery(queryLogin)
      if(queryModelLogin.status != 1 || queryModelLogin.fetchedRows > 0){
        throw new Error("Error in creating Login ID: " + JSON.stringify(queryModelLogin));
      }

      queryUser = "insert into auth_user (login_id, first_name, middle_name, last_name, contact_primary, "
      + " contact_secondary, email, security_question_1, security_question_2, security_question_3,  "
      + " security_answer_1, security_answer_2, security_answer_3, photo, remarks) values ('"
      + payload.loginID + "','" + payload.firstName + "','" + payload.middleName + "','" + payload.lastName + "','"
      + payload.contactPrimary + "','" + payload.contactSecondary + "','" + payload.email + "','"
      + payload.securityQuestion1 + "','" + payload.securityQuestion2 + "','" + payload.securityQuestion3 + "','"
      + payload.securityAnswer1 + "','" + payload.securityAnswer2 + "','" + payload.securityAnswer3 + "','"
      + payload.photo + "', SUBSTRING(CONCAT('" + payload.remarks + "', '\n#', remarks), 1, 1024) )";
      logger.log('queryUser: ' + queryUser);
      queryModelUser = await mySqlMaster.executeQuery(queryUser)
      if(queryModelUser.status != 1 || queryModelUser.affectedRows <= 0){
        throw new Error("Error in creating Usser ID: " + JSON.stringify(queryModelUser));
      }

      //query to get userID from user_auth table
      queryUserID = "select user_id from auth_user where login_id='" + payload.loginID + "'";
      logger.log('queryUserID: ' + queryUserID);
      queryModelUserID = await mySqlMaster.executeQuery(queryUserID)
      if(queryModelUserID.status != 1 || queryModelUserID.fetchedRows <= 0){
        throw new Error("Error in getting Newly Created UserID from auth_user Table: " + JSON.stringify(queryModelUserID));
      }
      userID = queryModelUserID.rows[0].user_id + '';

      queryRole = "insert into auth_user_role (user_id, role_id) values('" + userID + "','" + payload.roleID + "')";
      queryModelRole = await mySqlMaster.executeQuery(queryRole)
      if(queryModelRole.status != 1 || queryModelRole.affectedRows <= 0){
        throw new Error("Error in Generating Role for UserID: " + userID + " : " + JSON.stringify(queryModelRole));
      }

      queryAccount = "insert into auth_user_account (user_id, account_id) values('" + userID + "','" + payload.accountID + "')";
      queryModelAccount = await mySqlMaster.executeQuery(queryAccount)
      if(queryModelAccount.status != 1 || queryModelAccount.affectedRecords <= 0){
        throw new Error("Error in Assigning Account to New userID: " + userID + " : " + JSON.stringify(queryModelAccount));
      }

      resModel.info = 'SUCCESS: ' + queryModelRole.info + ' : ' + queryModelRole.tat + ' : ' + queryModelRole.message;
      resModel.data = queryModelRole;
      resModel.status = 1;

    } catch (error) {
      resModel.status = -9;
      resModel.info = 'catch: ' + error + ' : ' + resModel.info;
    }
    return resModel;
  }

  async updateUserDetails(
    payload: {
      loginID: '',
      userID: '',
      role: '',
      roleID: '',
      displayRole: '',
      passwd: '',
      firstName: '',
      middleName: '',
      lastName: '',
      displayName: '',
      email: '',
      contactPrimary: '0',
      contactSecondary: '0',
      status: '',
      securityQuestion1: 'Place/City of my birth?',
      securityQuestion2: 'Name of my very first school?',
      securityQuestion3: 'My favrouite subject?',
      securityAnswer1: '',
      securityAnswer2: '',
      securityAnswer3: '',
      remarks: '',
      photo: '',
      accountID: '',
      accountCode: '',
      accountName: '',
      accountDesc: '',
      logo: '',
    }) {

    let startMS = new Date().getTime();
    let userID = '';
    let queryModelLogin: any = masterModel.getQueryModel();
    let queryModelUser: any = masterModel.getQueryModel();
    let queryModelRole: any = masterModel.getQueryModel();
    let resModel = masterModel.getResponseModel();

    let queryLogin = '';
    let queryUser = '';
    let queryRole = '';
    try {
      userID = payload.userID;
      if (userID == 'undefined' || userID == null || userID.length <= 0) {
        throw 'Invalid accountID:' + userID;
      }

      queryLogin = "update auth_login set "
      + " `status`='" + payload.status + "', passwd='" + payload.passwd + "', "
      + " remarks = SUBSTRING(CONCAT('" + payload.remarks + "', '\n#', remarks), 1, 1024) "
      + " where login_id='" + payload.loginID + "'";
      logger.log('queryLogin: ' + queryLogin);
      queryModelLogin =await mySqlMaster.executeQuery(queryLogin);
      if(queryModelLogin.status != 1 || queryModelLogin.affectedRows <= 0){
        throw new Error('Error in updating Login details: ' + JSON.stringify(queryModelLogin));
      }

      queryUser = "update auth_user set "
      + " email='" + payload.email + "', first_name='" + payload.firstName + "', "
      + " middle_name='" + payload.middleName + "', last_name='" + payload.lastName + "', "
      + " contact_primary='" + payload.contactPrimary + "', contact_secondary='" + payload.contactSecondary + "', "
      + " security_question_1='" +payload.securityQuestion1 + "', security_answer_1='" + payload.securityAnswer1 + "', "
      + " security_question_2='" +payload.securityQuestion2 + "', security_answer_2='" + payload.securityAnswer2 + "', "
      + " security_question_3='" +payload.securityQuestion3 + "', security_answer_3='" + payload.securityAnswer3 + "', "
      + " remarks=SUBSTRING(CONCAT('" + payload.remarks + "', '\n#', remarks), 1, 1024) "
      + " where user_id='" + payload.userID + "'";
      logger.log('queryUser: ' + queryUser);
      queryModelUser =await mySqlMaster.executeQuery(queryUser);
      if(queryModelUser.status != 1 || queryModelUser.affectedRows <= 0){
        throw new Error('Error in updating User details: ' + JSON.stringify(queryModelUser));
      }

      queryRole = "update auth_user_role set "
      + " role_id='" + payload.roleID + "' "
      + " where user_id='" + payload.userID + "'";
      logger.log('queryRole: ' + queryRole);
      queryModelRole =await mySqlMaster.executeQuery(queryRole);
      if(queryModelRole.status != 1){
        throw new Error('Error in updating User Role details: ' + JSON.stringify(queryModelRole));
      }

      resModel.info = 'SUCCESS: ' + queryModelUser.info + ' : ' + queryModelUser.tat + ' : ' + queryModelUser.message;
      resModel.data = queryModelUser;
      resModel.status = 1;

    } catch (error) {
      resModel.status = -9;
      resModel.info = 'catch: ' + error + ' : ' + resModel.info;
    }
    return resModel;
  }

  async getUserMenusData(payload: {userID: string}) {
    //generating query
    let startMS = new Date().getTime();
    let query1 = '';
    let query2 = '';
    let resModel = masterModel.getResponseModel();
    let menu: any = [];
    let userID;
    try {
      // reading query parameter from request
      userID = payload.userID;
      query1 = "SELECT DISTINCT master_menu.menu_id, menu ,router ,icon ,master_menu.menu_id_order "
      + " FROM master_menu  INNER JOIN  auth_role ON master_menu.menu_id = auth_role.menu_id "
      +" WHERE role_id = (SELECT role_id FROM auth_user_role WHERE user_id = '" + userID + "') "
      +" ORDER BY master_menu.menu_id_order;";

      query2 = "SELECT DISTINCT(menu_id), menu_id_order, tab_id_order, tab_id "
      + " FROM auth_role WHERE role_id = (SELECT role_id FROM auth_user_role WHERE user_id = '" + userID + "') "
      + " ORDER BY menu_id_order;";

      // getting result from executing query
      let queryModel1: any = await mySqlMaster.executeQuery(query1);
      let queryModel2: any = await mySqlMaster.executeQuery(query2);

      //1st Loop  START
      for (let index = 0; index < queryModel1.rows.length; index++) {
        let menuModel = {
          menu_id: queryModel1.rows[index].menu_id,
          menu: queryModel1.rows[index].menu,
          router: queryModel1.rows[index].router,
          icon: queryModel1.rows[index].icon,
          menu_id_order: queryModel1.rows[index].menu_id_order,
          tab: [] as any
        }

        //2ND Loop  START 
        for (let j = 0; j < queryModel2.rows.length; j++) {

          if (queryModel1.rows[index].menu_id === queryModel2.rows[j].menu_id) {
            let tabModel = {
              tab_id_order: queryModel2.rows[j].tab_id_order,
              tab_id: queryModel2.rows[j].tab_id,
            }
            menuModel.tab.push(tabModel)
          }
          //2ND Loop  END
        }
        menu.push(menuModel)
        console.log(JSON.stringify(menuModel))
      }
      //1st Loop  END

      //checking result and setting the model accordingly
      if (queryModel1.status == 1) {
        // updating model values
        resModel.status = queryModel1.status;
        resModel.info = 'OK: DB Query: ' + queryModel1.info + ' : ' + queryModel1.tat + ' : ' + queryModel1.message;
        resModel.data = menu;
      } else {
        resModel.status = -3;
        resModel.info = 'getMenusAndTabs: ' + JSON.stringify(queryModel1) + ' : ' + + JSON.stringify(queryModel2);
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

  async getUserProfileDetails(payload: { userID: string; }) {

    let startMS = new Date().getTime();
    let userID = '';
    let query = '';
    let image = '';
    let queryModel: any = masterModel.getQueryModel();
    let resModel = masterModel.getResponseModel();

    try {
      userID = payload.userID;

      logger.log(userID);
      if (userID == 'undefined' || userID == null || userID.length <= 0) {
        throw 'Invalid userID:' + userID;
      }
      query = "SELECT auth_user.*, auth_account.*, auth_login.*, master_role.role_id, master_role.role "
      + " FROM auth_user "
      + " INNER JOIN auth_login  ON auth_user.login_id = auth_login.login_id "
      + " INNER JOIN auth_user_account  ON auth_user.user_id = auth_user_account.user_id "
      + " INNER JOIN auth_user_role ON auth_user.user_id = auth_user_role.user_id "
      + " INNER JOIN auth_account  ON auth_user_account.account_id  = auth_account.account_id "
      + " INNER JOIN master_role ON auth_user_role.role_id = master_role.role_id "
      + " WHERE auth_user.user_id = '" + userID + "'";

      logger.log('query ::' + query);
      queryModel = await mySqlMaster.executeQuery(query);

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

  // user profile update
  async updateUserProfileDetails(payload: {
    loginID: '',
    userID: '',
    role: '',
    roleID: '',
    firstName: '',
    middleName: '',
    lastName: '',
    email: '',
    contactPrimary: '0',
    contactSecondary: '0',
    status: '',
    mobileno: '',
    remarks: '',
    photo: '',
    accountID: '',
    accountCode: '',
    accountName: '',
    accountDesc: '',
    logo: ''
  }) {

    let startMS = new Date().getTime();
    let query = '';
    let queryModel: any = masterModel.getQueryModel();
    let resModel = masterModel.getResponseModel();

    try {
      if (payload.userID + '' == 'undefined' || payload.userID == null || payload.userID.length <= 0) {
        throw 'Invalid userID:' + payload.userID;
      }

      if (payload.contactPrimary.toString() == 'undefined' || payload.contactPrimary == null || payload.contactPrimary.length <= 0) {
        payload.contactPrimary = '0';
      }
      if (payload.contactSecondary + '' == 'undefined' || payload.contactSecondary == null || payload.contactSecondary.length <= 0) {
        payload.contactSecondary = '0';
      }

      query = "UPDATE auth_user SET "
        + " first_name = '" + payload.firstName + "', "
        + " middle_name = '" + payload.middleName + "', "
        + " last_name = '" + payload.lastName + "',"
        + " contact_primary = '" + payload.contactPrimary + "',"
        + " contact_secondary = '" + payload.contactSecondary + "',"
        + " email = '" + payload.email + "'"
        + " WHERE user_id = '" + payload.userID + "';"

      logger.log('query ::' + query);

      queryModel = await mySqlMaster.executeQuery(query);

      // logger.log('querymodel' + JSON.stringify(queryModel));

      // check if query is executed successfully
      if (queryModel.status != 1) {
        throw 'Error/Issue with DB user details query: ' + queryModel.info;
      }

      if (queryModel.affectedRows != 1) {
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

  async updateUserSecurityDetails(payload: { userID: string; FirstQuestion: string; SecondQuestion: string; ThirdQuestion: string; FirstAnswer: string; SecondAnswer: string; ThirdAnswer: string; }) {

    let startMS = new Date().getTime();
    let userID = '';
    let FirstQuestion = '';
    let SecondQuestion = '';
    let ThirdQuestion = '';
    let FirstAnswer = '';
    let SecondAnswer = '';
    let ThirdAnswer = '';
    let query = '';
    let image = '';
    let queryModel: any = masterModel.getQueryModel();
    let resModel = masterModel.getResponseModel();

    try {
      userID = payload.userID;
      FirstQuestion = payload.FirstQuestion;
      SecondQuestion = payload.SecondQuestion;
      ThirdQuestion = payload.ThirdQuestion;
      FirstAnswer = payload.FirstAnswer;
      SecondAnswer = payload.SecondAnswer;
      ThirdAnswer = payload.ThirdAnswer;

      logger.log(userID);
      if (userID == 'undefined' || userID == null || userID.length <= 0) {
        throw 'Invalid userID:' + userID;
      }

      //executing query
      // query = "SELECT  *FROM `auth_login` where login_id = '" + userID + "';";

      query = "UPDATE auth_user SET security_question_1 = '" + FirstQuestion + "' , security_answer_1 = '" + FirstAnswer + "' , security_question_2 = '" + SecondQuestion + "', security_answer_2 = '" + SecondAnswer + "' ,security_question_3 = '" + ThirdQuestion + "', security_answer_3 = '" + ThirdAnswer + "' WHERE user_id = '" + userID + "';"

      logger.log('query ::' + query);

      queryModel = await mySqlMaster.executeQuery(query);

      logger.log('querymodel' + JSON.stringify(queryModel));

      // check if query is executed successfully
      if (queryModel.status != 1) {
        throw 'Error/Issue with DB user details query: ' + queryModel.info;
      }

      if (queryModel.affectedRows != 1) {
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

  //this API for login Activity
  async getUserSceurityDetails(payload: { userID: string; }) {

    let startMS = new Date().getTime();
    let userID = '';
    let query = '';
    let queryModel: any = masterModel.getQueryModel();
    let resModel = masterModel.getResponseModel();

    try {
      userID = payload.userID;
      if (userID == 'undefined' || userID == null || userID.length <= 0) {
        throw 'Invalid userID:' + userID;
      }

      query = "SELECT l.status ,  l.created_on , l.last_login_success , l.last_login_fail ,"
      + " u.security_question_1 , u.security_answer_1 ,u.security_question_2 , u.security_answer_2,"
      + " u.security_question_3 , u.security_answer_3 "
      + " FROM auth_user u "
      + " LEFT JOIN auth_login l ON u.login_id = l.login_id "
      + " WHERE u.user_id = '" + userID + "'";

      queryModel = await mySqlMaster.executeQuery(query);

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

  //this API for login Activity
  async changeUserPassword(payload: { loginID: string; passwd: string; newPasswd: string }) {

    let startMS = new Date().getTime();
    let loginID = '';
    let query = '';
    let query1 = '';
    let passwd = '';
    let newPasswd = '';
    let queryModel: any = masterModel.getQueryModel();
    let queryModel1: any = masterModel.getQueryModel();
    let resModel = masterModel.getResponseModel();

    try {
      loginID = payload.loginID;
      passwd = payload.passwd;
      newPasswd = payload.newPasswd;

      logger.log(loginID);
      if (loginID == 'undefined' || loginID == null || loginID.length <= 0) {
        throw 'Invalid userID:' + loginID;
      }

      query = "SELECT passwd FROM auth_login WHERE login_id = '" + loginID + "';"
      queryModel = await mySqlMaster.executeQuery(query);

      logger.log('querymodel' + JSON.stringify(queryModel));

      if (queryModel.fetchedRows == 1) {
        if (queryModel.rows[0].passwd == passwd) {
          query1 = "UPDATE auth_login SET passwd = '" + newPasswd + "' WHERE login_id =  '" + loginID + "';"
          queryModel1 = await mySqlMaster.executeQuery(query1);

          logger.log('querymodel' + JSON.stringify(queryModel1));
        } else {
          throw 'Invalid password plz enter correct passwd';
        }
      } else {
        throw 'Invalid Password or LoginID, please provide correct details';
      }

      // check if query is executed successfully
      if (queryModel.status != 1) {
        throw 'Error/Issue with DB user details query: ' + queryModel.info;
      }

      if (queryModel.fetchedRows != 1) {
        throw 'invalid user_id plz enter the correct login_id: ' + queryModel.info;
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

  async uploadUserProfilePhoto(payload: { userID: string; picture: string; }) {

    let startMS = new Date().getTime();
    let userID = '';
    let query = '';
    let image = '';
    let queryModel: any = masterModel.getQueryModel();
    let resModel = masterModel.getResponseModel();

    try {
      userID = payload.userID;
      image = payload.picture;

      if (userID == 'undefined' || userID == null || userID.length <= 0) {
        throw 'Invalid userID:' + userID;
      }

      query = "UPDATE auth_user SET photo = '" + image + "' WHERE user_id = '" + userID + "';"

      queryModel = await mySqlMaster.executeQuery(query);

      logger.log('UPDATE IMAGE querymodel' + JSON.stringify(queryModel));

      // check if query is executed successfully
      if (queryModel.status != 1) {
        throw 'Error/Issue with DB user details query: ' + queryModel.info;
      }

      if (queryModel.affectedRows != 1) {
        throw 'invalid user_id plz enter the correct username: ' + queryModel.info;
      }

      resModel.info = 'SUCCESS: ' + queryModel.info + ' : ' + queryModel.tat + ' : ' + queryModel.message;
      resModel.data = queryModel;
      resModel.status = 1;

    } catch (error) {
      resModel.status = -9;
      resModel.info = 'catch: ' + error + ' : ' + resModel.info;
      logger.log('uploadUserProfilePhoto: ' + 'catch: ' + error + ' : ' + resModel.info);
    }
    return resModel;
  }

  async getUserProfilePhoto(payload: { userID: string }) {

    let startMS = new Date().getTime();
    let userID = '';
    let query = '';
    let queryModel: any = masterModel.getQueryModel();
    let resModel = masterModel.getResponseModel();

    try {
      userID = payload.userID;
      if (userID == 'undefined' || userID == null || userID.length <= 0) {
        throw 'Invalid userID:' + userID;
      }

      query = "Select photo , user_id  from auth_user  WHERE user_id = '" + userID + "';"

      queryModel = await mySqlMaster.executeQuery(query);

      // logger.log('GET IMAGE querymodel' + JSON.stringify(queryModel));

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

  async deleteUser(payload: { userID: string }) {

    let startMS = new Date().getTime();
    let userID = '';
    let queryLogin = '';
    let queryUser = '';
    let queryRole = '';
    let queryAccount = '';
    
    let queryModelLogin: any = masterModel.getQueryModel();
    let queryModelUser: any = masterModel.getQueryModel();
    let queryModelRole: any = masterModel.getQueryModel();
    let queryModelAccount: any = masterModel.getQueryModel();
    let resModel = masterModel.getResponseModel();

    try {
      userID = payload.userID;
      if (userID == 'undefined' || userID == null || userID.length <= 0) {
        throw 'Invalid userID:' + userID;
      }

      

      // deleting Account
      queryAccount = "delete from auth_user_account where user_id='" + userID + "'";
      logger.log('queryModelAccount: ' + queryAccount);
      queryModelAccount = await mySqlMaster.executeQuery(queryAccount);
      if (queryModelAccount.status != 1 || queryModelAccount.affectedRecords <= 0) {
        throw new Error("Error in deleting userID from auth_user_account: " + userID + " : "  + JSON.stringify(queryModelAccount));
      }

      // deleting Role
      queryRole = "delete from auth_user_role where user_id='" + userID + "'";
      logger.log('queryRole: ' + queryRole);
      queryModelRole = await mySqlMaster.executeQuery(queryRole);
      if (queryModelRole.status != 1 || queryModelRole.affectedRecords <= 0) {
        throw new Error("Error in deleting userID from auth_user_role: " + userID + " : "  + JSON.stringify(queryModelRole));
      }

      //deleting User
      queryUser = "delete from auth_user where user_id='" + userID + "'";
      logger.log('queryUser: ' + queryUser);
      queryModelUser = await mySqlMaster.executeQuery(queryUser);
      if (queryModelUser.status != 1 || queryModelUser.affectedRecords <= 0) {
        throw new Error("Error in deleting UserID from auth_user: " + userID + " : "  + JSON.stringify(queryModelUser));
      }

      // deleting Login
      queryLogin = "delete from auth_login where login_id = (select login_id from auth_user where user_id='" + userID + "')";
      logger.log('queryLogin: ' + queryLogin)
      queryModelLogin = await mySqlMaster.executeQuery(queryLogin);
      if (queryModelLogin.status != 1 || queryModelLogin.affectedRecords <= 0) {
        throw new Error("Error in deleting login ID from auth_login: " + userID + " : "  + JSON.stringify(queryModelLogin));
      }

      resModel.info = 'SUCCESS: ' + queryModelLogin.info + ' : ' + queryModelLogin.tat + ' : ' + queryModelLogin.message;
      resModel.data = queryModelLogin;
      resModel.status = 1;

    } catch (error) {
      resModel.status = -9;
      resModel.info = 'catch: ' + error + ' : ' + resModel.info;
    }
    return resModel;
  }

}