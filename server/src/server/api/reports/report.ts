import * as gtUtil from "../../gt-utility";
import { Request, Response } from "express";
import express from "express";
import { MasterModel } from "../../models/MasterModel";
import { MySqlMaster } from "../../db/mysql/mysqlDao";
import { Constants } from "../../gt-utility/constant"
import dotenv from "dotenv";
import { constants } from "buffer";
import { AnyMxRecord } from "dns";
import { createIndexedAccessTypeNode } from "typescript";
dotenv.config();
const logger = new gtUtil.Logger();
const masterModel = new MasterModel();
const methods = new gtUtil.Methods();
const cryptoJS = new gtUtil.CryptoJS();
const jwt = new gtUtil.JWT();
const constant = new Constants();
const mySqlMaster: MySqlMaster = new MySqlMaster();
export class Reports {


  async get_ReportTypes(payload: any) {
    //generating query
    let startMS = new Date().getTime();
    let query = '';
    let queryModel = masterModel.getQueryModel();
    let resModel = masterModel.getResponseModel();
    let report;
    try {
      // reading query parameter from request
      report = payload.report;

      query = "SELECT report_id, report_name FROM `master_report`";

      // getting result from executing query
      let queryModel: any = await mySqlMaster.executeQuery(query);

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
      logger.log('test-api.js: (getQueryResult(req): ' + queryModel.info);

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


  async getReportName(payload: any) {
    //generating query
    let startMS = new Date().getTime();
    let query = '';
    let queryModel = masterModel.getQueryModel();
    let resModel = masterModel.getResponseModel();
    let report;
    try {
      // reading query parameter from request
      report = payload.report;

      let query = "SELECT report_name FROM `master_report`WHERE report_id='" + report + "'";
      logger.log('checking reporn type : ' + query)


      // getting result from executing query
      let queryModel: any = await mySqlMaster.executeQuery(query);

      //checking result and setting the model accordingly
      if (queryModel.status = Constants.SUCCESS) {
        // updating model values
        resModel.status = queryModel.status;
        resModel.info = 'OK: DB Query: ' + queryModel.info + ' : ' + queryModel.tat + ' : ' + queryModel.message;
        resModel.data = queryModel;
      } else {
        resModel.status = Constants.ERROR;
        resModel.info = 'ERROR: DB Query: ' + JSON.stringify(queryModel);
      }
      logger.log('test-api.js: (getQueryResult(req): ' + queryModel.info);

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


  /***************************************************************************************************************/

  // GET METRIC TYPES API

  async get_Metric_types(payload: any) {
    //generating query
    let startMS = new Date().getTime();
    let query = '';
    let queryModel = masterModel.getQueryModel();
    let resModel = masterModel.getResponseModel();
    let report;
    try {
      // reading query parameter from request
      report = payload.report;

      let query = "SELECT DISTINCT metric_type FROM `master_metric_type` WHERE report_id='" + report + "'";

      // getting result from executing query
      let queryModel: any = await mySqlMaster.executeQuery(query);

      //checking result and setting the model accordingly
      if (queryModel.status = Constants.SUCCESS) {
        // updating model values
        resModel.status = queryModel.status;
        resModel.info = 'OK: DB Query: ' + queryModel.info + ' : ' + queryModel.tat + ' : ' + queryModel.message;
        resModel.data = queryModel;
      } else {
        resModel.status = Constants.ERROR;
        resModel.info = 'ERROR: DB Query: ' + JSON.stringify(queryModel);
      }
      logger.log('test-api.js: (getQueryResult(req): ' + queryModel.info);

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



  async get_Data_types(payload: any) {
    //generating query
    let startMS = new Date().getTime();
    let query = '';
    let queryModel = masterModel.getQueryModel();
    let resModel = masterModel.getResponseModel();
    let report;
    try {
      // reading query parameter from request
      report = payload.report;

      let query = "SELECT DISTINCT data_type FROM `master_data_type` WHERE report_id='" + report + "'";

      // getting result from executing query
      let queryModel: any = await mySqlMaster.executeQuery(query);

      //checking result and setting the model accordingly
      if (queryModel.status = Constants.SUCCESS) {
        // updating model values
        resModel.status = queryModel.status;
        resModel.info = 'OK: DB Query: ' + queryModel.info + ' : ' + queryModel.tat + ' : ' + queryModel.message;
        resModel.data = queryModel;
      } else {
        resModel.status = Constants.ERROR;
        resModel.info = 'ERROR: DB Query: ' + JSON.stringify(queryModel);
      }
      logger.log('test-api.js: (getQueryResult(req): ' + queryModel.info);

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




  async get_Access_types(payload: any) {
    //generating query
    let startMS = new Date().getTime();
    let query = '';
    let queryModel = masterModel.getQueryModel();
    let resModel = masterModel.getResponseModel();
    let report;
    try {
      // reading query parameter from request
      report = payload.report;

      let query = "SELECT DISTINCT access_type FROM `master_access_type` WHERE report_id='" + report + "'";

      // getting result from executing query
      let queryModel: any = await mySqlMaster.executeQuery(query);

      //checking result and setting the model accordingly
      if (queryModel.status = Constants.SUCCESS) {
        // updating model values
        resModel.status = queryModel.status;
        resModel.info = 'OK: DB Query: ' + queryModel.info + ' : ' + queryModel.tat + ' : ' + queryModel.message;
        resModel.data = queryModel;
      } else {
        resModel.status = Constants.ERROR;
        resModel.info = 'ERROR: DB Query: ' + JSON.stringify(queryModel);
      }
      logger.log('test-api.js: (getQueryResult(req): ' + queryModel.info);

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




  async get_Access_method(payload: any) {
    //generating query
    let startMS = new Date().getTime();
    let query = '';
    let queryModel = masterModel.getQueryModel();
    let resModel = masterModel.getResponseModel();
    let report;
    try {
      // reading query parameter from request
      report = payload.report;

      let query = "SELECT DISTINCT access_method FROM `master_access_method` WHERE report_id='" + report + "'";

      // getting result from executing query
      let queryModel: any = await mySqlMaster.executeQuery(query);

      //checking result and setting the model accordingly
      if (queryModel.status = Constants.SUCCESS) {
        // updating model values
        resModel.status = queryModel.status;
        resModel.info = 'OK: DB Query: ' + queryModel.info + ' : ' + queryModel.tat + ' : ' + queryModel.message;
        resModel.data = queryModel;
      } else {
        resModel.status = Constants.ERROR;
        resModel.info = 'ERROR: DB Query: ' + JSON.stringify(queryModel);
      }
      logger.log('test-api.js: (getQueryResult(req): ' + queryModel.info);

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




  ObjToArray(obj: any) {
    var arr = obj instanceof Array;

    return (arr ? obj : Object.keys(obj)).map(function (i: any) {
      var val = arr ? i : obj[i];

      return val;
    });
  }


  convertIntoString(data: any) {
    let stringify = '';
    let result;
    let parse;
    let resultMain = '';
    try {
      stringify = JSON.stringify(data);

      result = stringify.replace(/\[/g, '(').replace(/]/g, ')');

      resultMain = result.substring(1, result.length - 1);

      return resultMain;

    } catch (error) {
      logger.log('convertIntoString: ' + error);
    }
  }



  async getTablePreview(payload: {
    userID: string,
    reportType: string,
    beginDate: any,
    endDate: any,
    metricType: any[],
    dataType: any[],
    accessType: any[],
    accessMethod: any[]
  }) {
    //generating query
    let startMS = new Date().getTime();
    let query = '';
    let queryModel = masterModel.getQueryModel();
    let resModel = masterModel.getResponseModel();
    let userID;
    let accessMethod;
    let reportType;
    let beginDate;
    let endDate;
    let metricType;
    let dataType;
    let accessType;
    let accountID;
    try {

      let getAccountIdquery = "SELECT account_id FROM  auth_user_account WHERE user_id = '" + userID + "';";
      let getAccountIdqueryModel: any = await mySqlMaster.executeQuery(getAccountIdquery);
      accountID = getAccountIdqueryModel.rows[0].account_id;

      // reading query parameter from request
      userID = payload.userID;
      reportType = payload.reportType;
      beginDate = payload.beginDate;
      logger.log(' beginDate  : ' + beginDate);
      endDate = payload.endDate;
      logger.log(' endDate    : ' + endDate);
      metricType = payload.metricType;
      dataType = payload.dataType;
      accessType = payload.accessType;
      accessMethod = payload.accessMethod;
      let splittedBeginDate = beginDate.split("-");
      let beginYear: number = splittedBeginDate[0];
      let beginMonth: number = splittedBeginDate[1];
      let DatabaseColumnBeginDate: number = beginYear + beginMonth
      logger.log('DatabaseColumnBeginDate :: ' + DatabaseColumnBeginDate);
      let splittedEndDate = endDate.split("-");
      let endYear: number = splittedEndDate[0];
      let endMonth: number = splittedEndDate[1];
      let DatabaseColumnEndDate: number = endYear + endMonth;
      logger.log(' DatabaseColumnEndDate :: ' + DatabaseColumnEndDate);

      let dateString: any = await this.getFormattedYearMonth_MMMYY(DatabaseColumnBeginDate, DatabaseColumnEndDate);
      logger.log('dateString       : ' + dateString);
      let dateSumColumn: any = await this.getFormattedYearMonthMMMYYwithPlusSign(DatabaseColumnBeginDate, DatabaseColumnEndDate);
      logger.log('dateSumColumn    : ' + dateSumColumn);

      let metricTypeconvertedArray = this.ObjToArray(metricType);
      let metricTypeconvertedString = this.convertIntoString(metricTypeconvertedArray);
      let dataTypeconvertedArray = this.ObjToArray(dataType);
      let dataTypeconvertedString = this.convertIntoString(dataTypeconvertedArray);
      let accessTypeconvertedArray = this.ObjToArray(accessType);
      let accessTypeconvertedString = this.convertIntoString(accessTypeconvertedArray);
      let accessMethodconvertedArray = this.ObjToArray(accessMethod);
      let accessMethodconvertedString = this.convertIntoString(accessMethodconvertedArray);

      let dynamicPerformanceTable = 'acc_' + accountID + '_' + reportType.toLowerCase() + '_performance';
      let dynamicReportTable = 'acc_' + accountID + '_' + reportType.toLowerCase();


      // let whereMetricType
      // if(metricType.length != 0 ){
      //   whereMetricType =  " `" + dynamicPerformanceTable + "`.metric_type in ( " + metricTypeconvertedString + ") and "
      //  }else{
      //   whereMetricType = '';
      // }


      if (reportType == 'DR' || reportType == 'DR_D1' || reportType == 'DR_D2') {

        query = "SELECT  "
          + " `auth_account_platform`.platform_name AS `Platform Name`, "
          + "  `auth_account_platform`.platform_code AS `Platform Code`,"
          + " `" + dynamicReportTable + "`.database as `Database`,	"
          + " `" + dynamicReportTable + "`.publisher as	`Publisher`,"
          + "`" + dynamicReportTable + "`.publisher_id_proprietary as	`Publisher_ID`,"
          + "`" + dynamicReportTable + "`.platform AS `Platform`, "
          + " `" + dynamicReportTable + "`.item_id_proprietary as	`Proprietary_ID`,"
          + "`" + dynamicPerformanceTable + "`.data_type as `Data_Type`,"
          + "`" + dynamicPerformanceTable + "`.access_method as `Access_Method`,"
          + "`" + dynamicPerformanceTable + "`.metric_type as `Metric_Type`,"
          + "SUM(" + dateSumColumn + ") AS Reporting_Period_Total," + dateString
          + "FROM  `" + dynamicReportTable + "`INNER JOIN `" + dynamicPerformanceTable + "` USING(db_id) INNER JOIN "
          + " `auth_account_platform` USING(platform_id) WHERE"
          + " `" + dynamicPerformanceTable + "`.metric_type in ( " + metricTypeconvertedString + ") and "
          + " `" + dynamicPerformanceTable + "`.data_type in ( " + dataTypeconvertedString + ") and "
          + "  `" + dynamicPerformanceTable + "`.access_method in ( " + accessMethodconvertedString + ") and "
          + " `" + dynamicReportTable + "`.account_id IN (SELECT account_id FROM  "
          + " auth_user_account WHERE user_id = '" + userID + "')"
          + "  GROUP BY "
          + " `auth_account_platform`.platform_name , "
          + "  `auth_account_platform`.platform_code,"
          + " `" + dynamicReportTable + "`.database ,"
          + " `" + dynamicReportTable + "`.publisher ,"
          + "`" + dynamicReportTable + "`.publisher_id_proprietary ,"
          + "`" + dynamicReportTable + "`.platform ,"
          + " `" + dynamicReportTable + "`.item_id_proprietary ,"
          + "`" + dynamicPerformanceTable + "`.data_type ,"
          + "`" + dynamicPerformanceTable + "`.access_method ,"
          + "`" + dynamicPerformanceTable + "`.metric_type "
          + " ORDER BY  `database` asc ; "

        logger.log('check   DR   query ::::   ' + query)

      }

      else if (reportType == 'IR' || reportType == 'IR_A1' || reportType == 'IR_M1') {
        query = "";

      }

      else if (reportType == 'PR' || reportType == 'P1') {
        query = "SELECT "
          + " `auth_account_platform`.platform_name AS `Platform Name`, "
          + "  `auth_account_platform`.platform_code AS `Platform Code`,"
          + " `" + dynamicReportTable + "`.platform as `Platform`,"
          + "`" + dynamicPerformanceTable + "`.data_type as `Data_Type`,"
          + "`" + dynamicPerformanceTable + "`.access_method as `Access_Method`,"
          + "`" + dynamicPerformanceTable + "`.metric_type as `Metric_Type`,"
          + "SUM(" + dateSumColumn + ") AS Reporting_Period_Total," + dateString
          + "FROM  `" + dynamicReportTable + "`INNER JOIN `" + dynamicPerformanceTable + "` USING(pr_id) INNER JOIN "
          + " `auth_account_platform` USING(platform_id) WHERE"
          + " `" + dynamicPerformanceTable + "`.metric_type in ( " + metricTypeconvertedString + ") and "
          + " `" + dynamicPerformanceTable + "`.data_type in ( " + dataTypeconvertedString + ") and "
          + "  `" + dynamicPerformanceTable + "`.access_method in ( " + accessMethodconvertedString + ") and "
          + " `" + dynamicReportTable + "`.account_id IN (SELECT account_id FROM  "
          + " auth_user_account WHERE user_id = '" + userID + "')"
          + "  GROUP BY "
          + " `auth_account_platform`.platform_name ,"
          + " `auth_account_platform`.platform_code, "
          + " `" + dynamicReportTable + "`.platform, "
          + " `" + dynamicPerformanceTable + "`.data_type ,"
          + " `" + dynamicPerformanceTable + "`.access_method,"
          + " `" + dynamicPerformanceTable + "`.metric_type"
          + " ORDER BY  `platform` asc ; "


        logger.log('check   PR   query ::::   ' + query)

      }
      else if (reportType == 'TR' || reportType == 'TR_B1' || reportType == 'TR_B2' || reportType == 'TR_B3' ||
        reportType == 'TR_J1' || reportType == 'TR_J2' || reportType == 'TR_J3' || reportType === 'TR_J4') {

        query = "   SELECT "
          + "  `auth_account_platform`.platform_name AS `Platform Name`,"
          + "  `auth_account_platform`.platform_code AS `Platform Code`,"
          + " `" + dynamicReportTable + "`.title AS `Title`,  "
          + " `" + dynamicReportTable + "`.publisher as	`Publisher`,"
          + "`" + dynamicReportTable + "`.publisher_id_proprietary as	`Publisher_ID`,"
          + "  `auth_account_platform`.platform AS `Platform`,"
          + "   `" + dynamicReportTable + "`.item_id_DOI AS `DOI`,"
          + "   `" + dynamicReportTable + "`.item_id_proprietary AS `Proprietary_ID`, "
          + "   `" + dynamicReportTable + "`.item_id_ISBN AS `ISBN`,"
          + "  `" + dynamicReportTable + "`.item_id_print_ISSN AS `Print_ISSN`,"
          + " `" + dynamicReportTable + "`.item_id_online_ISSN  AS `Online_ISSN`,"
          + "  `" + dynamicReportTable + "`.item_id_URI AS `URI`,"
          + "`" + dynamicPerformanceTable + "`.data_type as `Data_Type`,"
          + "`" + dynamicPerformanceTable + "`.access_type as `Access_type`,"
          + "`" + dynamicPerformanceTable + "`.access_method as `Access_Method`,"
          + "`" + dynamicPerformanceTable + "`.metric_type as `Metric_Type`,"
          + "SUM(" + dateSumColumn + ") AS Reporting_Period_Total," + dateString
          + " FROM  `" + dynamicReportTable + "`INNER JOIN `" + dynamicPerformanceTable + "` USING(title_id) INNER JOIN   "
          + "  `auth_account_platform` USING(platform_id)  WHERE  "
          + " `" + dynamicPerformanceTable + "`.metric_type in ( " + metricTypeconvertedString + ") and "
          + " `" + dynamicPerformanceTable + "`.data_type in ( " + dataTypeconvertedString + ") and "
          + " `" + dynamicPerformanceTable + "`.access_type in ( " + accessTypeconvertedString + ") and "
          + "  `" + dynamicPerformanceTable + "`.access_method in ( " + accessMethodconvertedString + ") and "
          + " `" + dynamicReportTable + "`.account_id IN (SELECT account_id FROM  "
          + " auth_user_account WHERE user_id = '" + userID + "')"
          + "  GROUP BY "
          + "  `auth_account_platform`.platform_name,"
          + "  `auth_account_platform`.platform_code,"
          + " `" + dynamicReportTable + "`.title,"
          + " `" + dynamicReportTable + "`.publisher,"
          + "`" + dynamicReportTable + "`.publisher_id_proprietary,"
          + "  `auth_account_platform`.platform ,"
          + "   `" + dynamicReportTable + "`.item_id_DOI,"
          + "   `" + dynamicReportTable + "`.item_id_proprietary, "
          + "   `" + dynamicReportTable + "`.item_id_ISBN ,"
          + "  `" + dynamicReportTable + "`.item_id_print_ISSN,"
          + " `" + dynamicReportTable + "`.item_id_online_ISSN ,"
          + "  `" + dynamicReportTable + "`.item_id_URI ,"
          + "`" + dynamicPerformanceTable + "`.data_type ,"
          + "`" + dynamicPerformanceTable + "`.access_type ,"
          + "`" + dynamicPerformanceTable + "`.access_method ,"
          + "`" + dynamicPerformanceTable + "`.metric_type"
          + " ORDER BY title asc ; "

      }

      logger.log('check   TR   query ::::   ' + query)


      // getting result from executing query
      let queryModel: any = await mySqlMaster.executeQuery(query);

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
      logger.log('test-api.js: (getQueryResult(req): ' + queryModel.info);

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



  async getFormattedYearMonth_MMMYY(beginDateYYYYMM: number, endDateYYYYMM: number) {

    let columnString = '';
    let month = 0;
    try {
      let dateString = [];
      for (month = beginDateYYYYMM; month <= endDateYYYYMM; month++) {

        let tempMonth = (month + '').substring(4, 6);
        let tempYear = (month + '').substring(0, 4);
        logger.log('ckkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk' + tempYear)


        if (tempMonth === '01') {
          columnString = 'SUM(M_' + month + ') ' + 'AS' + ' ' + '`' + 'Jan-' + tempYear + '`';
        }
        else if (tempMonth === '02') {
          columnString = 'SUM(M_' + month + ') ' + 'AS' + ' ' + '`' + 'Feb-' + tempYear + '`';
        }
        else if (tempMonth === '03') {
          columnString = 'SUM(M_' + month + ') ' + 'AS' + ' ' + '`' + 'Mar-' + tempYear + '`';
        }
        else if (tempMonth === '04') {
          columnString = 'SUM(M_' + month + ') ' + 'AS' + ' ' + '`' + 'Apr-' + tempYear + '`';
        }
        else if (tempMonth === '05') {
          columnString = 'SUM(M_' + month + ') ' + 'AS' + ' ' + '`' + 'May-' + tempYear + '`';
        }
        else if (tempMonth === '06') {
          columnString = 'SUM(M_' + month + ') ' + 'AS' + ' ' + '`' + 'Jun-' + tempYear + '`';
        }
        else if (tempMonth === '07') {
          columnString = 'SUM(M_' + month + ') ' + 'AS' + ' ' + '`' + 'July-' + tempYear + '`';
        }
        else if (tempMonth === '08') {
          columnString = 'SUM(M_' + month + ') ' + 'AS' + ' ' + '`' + 'Aug-' + tempYear + '`';
        }
        else if (tempMonth === '09') {
          columnString = 'SUM(M_' + month + ') ' + 'AS' + ' ' + '`' + 'Sept-' + tempYear + '`';
        }
        else if (tempMonth === '10') {
          columnString = 'SUM(M_' + month + ') ' + 'AS' + ' ' + '`' + 'Oct-' + tempYear + '`';
        }
        else if (tempMonth === '11') {
          columnString = 'SUM(M_' + month + ') ' + 'AS' + ' ' + '`' + 'Nov-' + tempYear + '`';
        }
        else if (tempMonth === '12') {
          columnString = 'SUM(M_' + month + ') ' + 'AS' + ' ' + '`' + 'Dec-' + tempYear + '`';
          month = month + 88;

        }
        dateString.push(columnString);

      }
      return dateString;
    } catch (error) {

    }
  }



  async getFormattedYearMonthMMMYYwithPlusSign(beginDateYYYYMM: number, endDateYYYYMM: number) {

    let columnString = '';
    let month = 0;
    try {

      //let dateString = []
      for (month = beginDateYYYYMM; month <= endDateYYYYMM; month++) {

        columnString = columnString + '+' + ' ' + 'M_' + month;
        //dateString.push(columnString)

        let tempMonth = (month + '').substring(4, 6);
        if (tempMonth === '12') {
          month = month + 88;
        }

      }
      return columnString;
    } catch (error) {

    }
  }















}