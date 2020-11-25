import * as gtUtil from "../../gt-utility";
import { MySqlMaster } from "../../db/mysql/mysqlDao";
import { MasterModel } from "../../models/MasterModel";

const logger = new gtUtil.Logger();
const masterModel = new MasterModel();
const methods = new gtUtil.Methods();


export class Testing {
    async executeQuery(query: string) {

        let mySqlMaster: MySqlMaster;
        let resModel = masterModel.getResponseModel();
        let queryModel:any = masterModel.getQueryModel();
        try {
            mySqlMaster = new MySqlMaster();

            queryModel = await mySqlMaster.executeQuery(query);

        } catch (error) {
            logger.error("Tester.executeQuery(query): " + error + ": " + JSON.stringify(error));
        }
        return queryModel;
    }


}