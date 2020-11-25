import express, { Request, Response, NextFunction, Router } from "express";
import { MasterModel } from "../models/MasterModel";
import * as gtUtil from "../gt-utility";
import dotenv from "dotenv";
dotenv.config();

export const router = express.Router();
const logger = new gtUtil.Logger();
const methods = new gtUtil.Methods();
const cryptoJS = new gtUtil.CryptoJS();
const jwt = new gtUtil.JWT();
const masterModel = new MasterModel();

logger.log("## Auth Middleware Configuration : Start");

//setting response for all
router.use(async (req: Request, res: Response, next: NextFunction) => {
    let authorizationKey: string = '';
    let token: string = '';
    let model = masterModel.getResponseModel();
    let path: string = req.path;
    let jwtKey: string = '';
    let tokenExceptionPaths = ['/auth/validate', '/auth/login', '/auth/demo', '/sendmail', '/auth/search', '/auth/changepasswd'];
    let skipJwtToken = false;
    let keyUTCDateMySql: string = '';
    let message: string = '';
    let userID: string = '';
    try {

        authorizationKey = req.headers['authorization'] + ''; // Express headers are auto converted to lowercase
        token = req.headers['token'] + ''; // Express headers are auto converted to lowercase

        //validating token
        if (authorizationKey == '') {
            throw 'AUTH ERROR: BLANK: Authentication Key';
        }
        if (authorizationKey == 'undefined') {
            throw 'AUTH ERROR: UNDEFINED: Authentication Key';
        }
        if (!authorizationKey) {
            throw 'AUTH ERROR: NO: Authentication Key';
        }
        // formatting the token string
        if (authorizationKey.startsWith('Bearer ')) {
            authorizationKey = authorizationKey.slice(7, authorizationKey.length); // Remove Bearer from string
        }
        // formatting the token string
        if (authorizationKey.startsWith('Basic ')) {
            authorizationKey = authorizationKey.slice(6, authorizationKey.length); // Remove Basic from string
        }
        // checking for final MD5 authorization key
        if (authorizationKey.trim().length != 32) {
            throw 'AUTH ERROR: INVALID LENGTH: Authentication Key';
        }

        keyUTCDateMySql = methods.getAuthKey();
        // validating the authorization key
        if (authorizationKey != keyUTCDateMySql) {
            message = message + 'Authentication=FAIL';
            throw 'AUTH ERROR: VALIDATION FAILED: INVALID or EXPIRED Authentication Key';
        } else {
            // Authentication success
            message = message + 'Authentication=SUCCESS';
        }

        tokenExceptionPaths.push('/' + keyUTCDateMySql);
        // checking if path exists in exception list
        for (let i = 0; i < tokenExceptionPaths.length; i++) {
            if (path.startsWith(tokenExceptionPaths[i])) {
                skipJwtToken = true;
            }
        }

        if (skipJwtToken) {  // Check for exception path flag
            //logger message
            message = message + ': Non JWT Path=JWT Not Required';
            //going to next step
            next();
        } else {  // JWT TOKEN Validation
            // reading JWT KEY from env file
            jwtKey = process.env.MASTER_KEY + '';
            jwtKey = jwtKey.trim();
            if (jwtKey == '') {
                message = message + ': JWT=FAIL';
                throw 'AUTH ERROR: BLANK: TOKEN KEY';
            }
            if (jwtKey == 'undefined') {
                message = message + ': JWT=FAIL';
                throw 'AUTH ERROR: UNDEFINED: TOKEN KEY';
            }
            if (!jwtKey) {
                throw 'AUTH ERROR: NO: TOKEN KEY';
            }
            //validating token
            if (token == '') {
                throw 'AUTH ERROR: BLANK: TOKEN';
            }
            if (token == 'undefined') {
                throw 'AUTH ERROR: UNDEFINED: TOKEN';
            }
            if (!token) {
                throw 'AUTH ERROR: NO: TOKEN';
            }

            // verifying the JST token
            let payload = jwt.getJwtPayload(token);

            // setting the response header
            userID = payload.userID;
            let resToken = jwt.getJwtToken({ userID: userID, dt: new Date() });
            res.setHeader("token", resToken);

            //logger message
            message = message + ': JWT=SUCCESS';
            //going to next step
            next();
        }

        message = message + ': AUTH=SUCCESS (authorizationKey: ' + authorizationKey + ': token: ' + token + ': keyUTCDateMySql: ' + keyUTCDateMySql + ')';
    } catch (error) {
        message = message + ': AUTH=FAIL (authorizationKey: ' + authorizationKey + ': token: ' + token + ': keyUTCDateMySql: ' + keyUTCDateMySql + ')';
        model.status = gtUtil.Constants.AUTH_ERROR;
        model.info = JSON.stringify(error);
        return res.status(gtUtil.Constants.HTTP_UNAUTHORIZED).json(model);
    } finally {
        try {
            logger.log(userID + ': path=' + req.path + ': ' +  message + ': baseUrl=' + req.baseUrl + ': body=' + JSON.stringify(req.body) + ': cookies=' + req.cookies + ': fresh='
                + req.fresh + ': hostname=' + req.hostname + ': ip=' + req.ip + ': ips=' + req.ips + ': originalUrl='
                + req.originalUrl + ': params=' + JSON.stringify(req.params) + ': protocol='
                + req.protocol + ': query=' + JSON.stringify(req.query) + ': route=' + req.route + ': secure='
                + req.secure + ': signedCookies=' + req.signedCookies + ': stale=' + req.stale + ': subdomains='
                + req.subdomains + ': xhr=' + req.xhr + ': resModel=' + JSON.stringify(model));
        } catch (error) {
            logger.log('catch: auth logging: ' + error + ': ' + JSON.stringify(error) + ': ' + JSON.stringify(model));
        }
    }
});