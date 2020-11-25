// import { Logger } from './Logger';
import * as cryptoJS from 'crypto-js';


export class CryptoJS {
    // logger = new Logger();

    encrypt(text: string, key: string) {
        let keyutf;
        let iv;
        let enc;
        let encStr;
        try {
            if (key == null || key == 'undefined' || key == '') {
                throw new Error('Invalid CryptoJS Key : ' + key);
            }
            keyutf = cryptoJS.enc.Utf8.parse(key);
            iv = cryptoJS.enc.Base64.parse(key);
            enc = cryptoJS.AES.encrypt(text, keyutf, { iv: iv });
            encStr = enc.toString();
            return encStr;
        } catch (error) {
            // this.logger.log(error);
            throw new Error('encrypt:' + error);
        }
    }

    decrypt(text: string, key: string) {
        let keyutf;
        let iv;
        let encStr;
        let dec;
        let decStr;
        let encObj: any;
        try {
            if (key == null || key == 'undefined' || key == '') {
                throw new Error('Invalid CryptoJS Key : ' + key);
            }
            keyutf = cryptoJS.enc.Utf8.parse(key);
            iv = cryptoJS.enc.Base64.parse(key);
            encStr = cryptoJS.enc.Base64.parse(text);
            encObj = { ciphertext: encStr }
            dec = cryptoJS.AES.decrypt(encObj, keyutf, { iv: iv });
            decStr = cryptoJS.enc.Utf8.stringify(dec);
            return decStr;
        } catch (error) {
            // this.logger.log('decrypt:' + error);
            throw new Error('decrypt:' + error);
        }
    }

    MD5(text: string) {
        let key = '';
        try {
            key = cryptoJS.MD5(text) + '';
            return key + '';
        } catch (error) {
            // this.logger.log('hashMD5:' + error);
            throw new Error('md5:' + error);
        }
    }

}
