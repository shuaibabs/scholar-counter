import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as gtUtil from '../gt-utility';
import { LocalService } from 'src/app/core/services';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

methods = new gtUtil.Methods();
cryptoJS = new gtUtil.CryptoJS();

  constructor(
    private http: HttpClient,
    private localService: LocalService
  ) { }


  private getHTTPOption(): any {
    let jwtToken = '';
    const md5Authorization = this.methods.getAuthKey();
    jwtToken = this.localService.getToken();

    // check for null or unidentified token
    if (jwtToken == null || jwtToken === 'undefined' || jwtToken === 'no token found') {
      jwtToken = '';
    }

    const httpOptions = {
      headers: new HttpHeaders(
        {
          Authorization: md5Authorization,

          token: jwtToken,
          'Content-Type': 'application/json ; charset=UTF-8'
        }),
      observe: 'response'
    };

    return httpOptions;

  }

  async getRequest(url) {
    let asyncResult: any;
    try {
      asyncResult = await this.http.get(url).toPromise();
      console.log(asyncResult);
      return asyncResult;

    } catch (error) {
      alert('getRequest: ' + error);
    }
  }


  // POST REQUEST   ...|Start|
  async postRequest(url, payload, options) {
    let result: any;

    try {
      if (options == null || options === '' || options === 'undefined') {
        options = this.getHTTPOption();
      }

      result = await this.http.post(url, payload, options).toPromise();

      if (result.status >= 400 && result.status <= 499){
        throw new Error('Resource Not found error, Status Code=' + result.status);
      }

      const token = result.headers.get('token') + '';
      this.localService.setToken(token);

      if (result.body.status <= -40 && result.body.status >= 49){
        // auth error
        alert('Authntication Error');
        this.localService.logout();
      }

      return result;
       // 1. response code = 200, status = 1
      // 2. response code = 200, status = -41, -44, -45  // alert of Invalid Authentication
      // session expired, logout and go to login page
      // 3. resposne code = 400, 500 // page not found, inyternal server error = logout, redirect to login page.


    } catch (error) {
      alert('postRequest: ' + JSON.stringify(error));
    }
  }   //  |End|








}

