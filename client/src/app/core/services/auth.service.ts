import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { BaseService, HttpService } from '../services';
import { MasterModel } from 'src/app/core/model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isAuthenticated = false;
  masterModel: MasterModel = new MasterModel();

  constructor(
    public router: Router,
    public baseService: BaseService,
    public httpService: HttpService,
  ) { }

  async validateUser(payLoad) {
    const path = '/auth/validate';
    let url;
    let data;
    try {
      this.baseService.userProfile = this.masterModel.getUserProfileModel();
      this.baseService.userMenuDetails = '';

      url = environment.apiServerUrl + path;
      data = await this.httpService.postRequest(url, payLoad, null);
      return data;
    } catch (error) {
      return 'your username invalid pls enter the corrent value: ' + error;
    }
  }

  async validateAuth(payLoad) {
    const path = '/auth/login';
    let url;
    let result;
    let errorMsg = '';
    try {
      this.baseService.userProfile = this.masterModel.getUserProfileModel();
      this.baseService.userMenuDetails = '';

      url = environment.apiServerUrl + path;
      result = await this.httpService.postRequest(url, payLoad, null);

      console.log('result::' + JSON.stringify(result));
      // console.log('result::' + JSON.parse(result.body.info));
      console.log('result::' + JSON.stringify(result.body.info));

      // if (result.body.info == '"catch: Error: No Valid User Found for User Details and user_account: 0 users found : "') {
      //   errorMsg = ('iNo details found for the user');
      // } else {
      //   if (result.body.status != 1){
      //     alert(JSON.stringify(result.body.data.status))
      //     if ((result.body.data.status + '').toUpperCase() != 'ACTIVE') {
      //       errorMsg = ('User Not ACTIVE, Contact your Administration');
      //     }else{
      //       errorMsg = ('Login Failed, only ' + (5 - result.body.data.failed_login_attempts) + ' attemps left');
      //     }
      //     console.log(errorMsg + ': Error in Authenticating User, ## ' + JSON.stringify(result.body));
      //     throw errorMsg;
      //   }   
      // }

      // alert('fatchrows::' + JSON.stringify(result.body.))

      // check for status
      if (result.body.status != 1){
        alert(JSON.stringify(result.body.data.status))
        if ((result.body.data.status + '').toUpperCase() != 'ACTIVE') {
          errorMsg = ('User Not ACTIVE, Contact your Administration');
        }else{
          errorMsg = ('Login Failed, only ' + (5 - result.body.data.failed_login_attempts) + ' attemps left');
        }
        console.log(errorMsg + ': Error in Authenticating User, ## ' + JSON.stringify(result.body));
        throw errorMsg;
      }

      // reading and storing User Details in Base service
      this.baseService.userProfile.loginID = result.body.data.userDetails.rows[0].login_id + '';
      this.baseService.userProfile.userID = result.body.data.userDetails.rows[0].user_id + '';
      this.baseService.userProfile.roleID = result.body.data.userDetails.rows[0].role_id + '';
      this.baseService.userProfile.role = result.body.data.userDetails.rows[0].role + '';
      this.baseService.userProfile.firstName = result.body.data.userDetails.rows[0].first_name + '';
      this.baseService.userProfile.middleName = result.body.data.userDetails.rows[0].middle_name + '';
      this.baseService.userProfile.lastName = result.body.data.userDetails.rows[0].last_name + '';
      this.baseService.userProfile.status = result.body.data.userDetails.rows[0].status + '';
      this.baseService.userProfile.contactPrimary = result.body.data.userDetails.rows[0].contact_primary + '';
      this.baseService.userProfile.contactSecondary = result.body.data.userDetails.rows[0].contact_secondary + '';
      this.baseService.userProfile.status = result.body.data.userDetails.rows[0].status;
      this.baseService.userProfile.securityQuestion1 = result.body.data.userDetails.rows[0].security_question_1;
      this.baseService.userProfile.securityQuestion2 = result.body.data.userDetails.rows[0].security_question_2;
      this.baseService.userProfile.securityQuestion3 = result.body.data.userDetails.rows[0].security_question_3;
      this.baseService.userProfile.securityAnswer1 = result.body.data.userDetails.rows[0].security_answer_1;
      this.baseService.userProfile.securityAnswer2 = result.body.data.userDetails.rows[0].security_answer_2;
      this.baseService.userProfile.securityAnswer3 = result.body.data.userDetails.rows[0].security_answer_3;
      this.baseService.userProfile.remarks = result.body.data.userDetails.rows[0].remarks + '';
      this.baseService.userProfile.photo = result.body.data.userDetails.rows[0].photo + '';
      this.baseService.userProfile.userID = result.body.data.userDetails.rows[0].user_id + '';
      this.baseService.userProfile.accountID = result.body.data.userDetails.rows[0].account_id + '';
      this.baseService.userProfile.accountCode = result.body.data.userDetails.rows[0].account_code + '';
      this.baseService.userProfile.accountName = result.body.data.userDetails.rows[0].account_name + '';
      this.baseService.userProfile.accountDesc = result.body.data.userDetails.rows[0].description + '';
      this.baseService.userProfile.logo = result.body.data.userDetails.rows[0].logo + '';

      // reading and storing User Menu in Base service
      this.baseService.userMenuDetails = result.body.data.authDetails.data;

      return true;
    } catch (error) {
      this.baseService.log('Authentication Service :' + JSON.stringify(error) + ' : ' + error);
      throw new Error(error);
    }
  }

  async loginSuccess() {
    this.isAuthenticated = true;
  }

  async loginFail() {
    this.isAuthenticated = false;
  }

  async refresh() {
    window.location.reload();
  }

  async sendRequest(payload) {
    payload
    let url;
    let result;
    try {
      const path = '/auth/demo';
      url = environment.apiServerUrl + path;
      result = await this.httpService.postRequest(url, payload, null);
      return result;
    } catch (error) {
      throw new error('authService: Submit Details: ' + error);
    }
  }
  async search(payload) {
    payload
    let url;
    let result;
    try {
      const path = '/auth/search';
      url = environment.apiServerUrl + path;
      result = await this.httpService.postRequest(url, payload, null);
      return result;
    } catch (error) {
      throw new error('authService: search : ' + error);
    }
  }


  async changePasswd(payload) {
    payload
    let url;
    let result;
    try {
      const path = '/auth/changepasswd';
      url = environment.apiServerUrl + path;
      result = await this.httpService.postRequest(url, payload, null);
      return result;
    } catch (error) {
      throw new error('authService: search : ' + error);
    }
  }

}
