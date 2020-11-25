import { MasterModel } from "../../models/MasterModel";
import * as gtUtil from "../../gt-utility";
import * as mysql from "mysql";
import dotenv from "dotenv";
import * as util from "util";

const logger = new gtUtil.Logger();
const masterModel = new MasterModel();
dotenv.config();

let db_host_ip: string = process.env.MYSQL_DB_HOST_IP + '';
let db_port: number = Number(process.env.MYSQL_DB_PORT + '');
let db_name: string = process.env.MYSQL_DB_NAME + '';
let db_user: string = process.env.MYSQL_DB_USER + '';
let db_password: string = process.env.MYSQL_DB_PASSWORD + '';
let db_conn_count: number = Number(process.env.MYSQL_DB_CONN_COUNT + '');

// connect to the db
const dbConnectionInfo = {
  host: db_host_ip,
  port: db_port,
  database: db_name,
  user: db_user,
  password: db_password,
  dateStrings: true,
  // multipleStatements: true,
  connectionLimit: db_conn_count //mysql connection pool length, ie DB Connections in pool
};

//create mysql connection pool
logger.log('** DB Connection Pool: Starting: ' + JSON.stringify(dbConnectionInfo));
export const connPool = mysql.createPool(dbConnectionInfo);
logger.log('** DB Connection Pool: Success');

export class MySqlMaster {

autoCommit = true;

//query result
executeQuery (query: string) {
  let promise;
  let startMS = new Date().getTime();
  let queryModel = masterModel.getQueryModel();
  try {

    promise = new Promise((resolve, reject) => {
      connPool.query(query, async (err, results, fields) => {
  
        // in case of errror in executing the query rejecting the request
        if (err) {
          //throw new Error('Error in Query Execution: ' + err);
          queryModel.status = gtUtil.Constants.DB_QUERY_ERROR;
          queryModel.info = 'DB: executeQuery(): ERROR: ' + JSON.stringify(err);
          //reject(model);
  
        } else {
          //SUCCESS
          queryModel.status = gtUtil.Constants.SUCCESS;
          queryModel.info = 'SUCCESS';
          // check for select query results i.e JSON ARRAY of selected Rows
          if (util.isArray(results)) {
            queryModel.fetchedRows = results.length;
            queryModel.rows = results;
            queryModel.info = queryModel.info + ': 1, fetchedRows: '+ queryModel.fetchedRows;
          }else if (util.isObject(results)) {
            queryModel.affectedRows = results.affectedRows;
            queryModel.changedRows = results.changedRows;
            queryModel.fieldCount = results.fieldCount;
            queryModel.insertId = results.insertId;
            queryModel.message = results.message;
            queryModel.protocol41 = results.protocol41;
            queryModel.serverStatus = results.serverStatus;
            queryModel.warningCount = results.warningCount;
          }
                  
        }// end else
  
        // finally resolving the request
        queryModel.tat = (new Date().getTime() - startMS) / 1000;
        // logger.log('results: ' + JSON.stringify(results));
        resolve(queryModel);
      });// close conn pool

    });// close promise

    return promise;
  } catch (error) {
    throw new Error('executeQuery: ' + error);
  }finally{
    try{queryModel.endDT = new Date();}catch(error){}
    try{queryModel.tat = (new Date().getTime() - startMS) / 1000;}catch(error){}
  }
}

}
