// import { Logger } from './Logger';
// import * as jwt from 'jsonwebtoken';

// //reading JWT key from .env file


// export class JWT {
//     logger = new Logger();
//     jwtKey: string = process.env.MASTER_KEY + '';

//     getJwtToken(payLoad: any) {
//         let jwtExpiresInSec = 900; //default token is valid for 15 minutes
//         let token = '';

//         try {
//             try {
//                 let tmp = process.env.JWT_TIME_OUT_SECONDS + '';
//                 jwtExpiresInSec = parseInt(tmp.trim(), 10);
//             } catch (error) {
//                 this.logger.log('getJwtToken: Error in setting jwtExpiresInSec time, setting default to 15 minutes(900 sec) : ' + error);
//                 jwtExpiresInSec = 900;
//             }

//             //generating jwt toen for authentication
//             token = jwt.sign(
//                 payLoad,
//                 this.jwtKey,
//                 { expiresIn: jwtExpiresInSec }  // this needs to be numeric value only in seconds
//             );

//             return token;
//         } catch (error) {
//             throw 'getJwtToken: ' + error;
//         }
//     }

//     getJwtPayload(token: string) {
//         let payload: any = '';
//         try {

//             //validating token
//             if (token == '') {
//                 throw 'ERROR: BLANK: JWT';
//             }
//             if (token == 'undefined') {
//                 throw 'ERROR: UNDEFINED: JWT';
//             }
//             if (!token) {
//                 throw 'ERROR: NO JWT';
//             }
//             if (this.jwtKey == '') {
//                 throw 'ERROR: BLANK: JWT KEY';
//             }
//             if (this.jwtKey == 'undefined') {
//                 throw 'ERROR: UNDEFINED: JWT KEY';
//             }

//             // verifying the JST token
//             jwt.verify(token, this.jwtKey, (err: any, decoded: any) => {

//                 if (err) {//error in verifying the token
//                     throw JSON.stringify(err);
//                 } else { //token verified successfully
//                     payload = decoded;
//                 }
//             });

//             // token verification success
//             let payLoadString = JSON.stringify(payload);
//             if (payLoadString == '' || payLoadString == null || payLoadString == 'undefined') {
//                 throw 'Error in Decoded string : ' + payLoadString;
//             } else {
//                 return payload;
//             }


//         } catch (error) {
//             this.logger.error('getJwtPayload: ' + error);
//             throw error;
//         }
//     }

// }
