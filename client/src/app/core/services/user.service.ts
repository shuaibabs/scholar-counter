import { Injectable } from '@angular/core';
import { BaseService, LocalService, HttpService, AuthService, ReportService, PlatformService } from 'src/app/core/services';
import { environment } from 'src/environments/environment';
import { Buffer } from 'buffer';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private baseService: BaseService,
    private httpService: HttpService,
  ) { }

  // THIS IS  GET FOR UPDATE IMAGE
  async getUserProfilePhoto(payload) {
    const path = '/user/photo';
    let serverUrl;
    let result;

    try {
      serverUrl = environment.apiServerUrl + path;
      result = await this.httpService.postRequest(serverUrl, payload, null);
      return result;
    } catch (error) {
      throw new Error('getUserProfilePhoto: Catch: ' + error);
    }
  }

  // THIS IS FOR UPLOAD NEW IMAGE
  async uploadUserProfilePhoto(payload) {
    const path = '/user/photo/upload';
    let serverUrl;
    let result;
    try {
      serverUrl = environment.apiServerUrl + path;
      result = await this.httpService.postRequest(serverUrl, payload, null);
      return result;
    } catch (error) {
      this.baseService.log('uploadUserProfilePhoto: Error in uploading user profile photo: ' + error);
      throw new Error('Error in uploading user profile photo: ' + error);
    }

  }



  // THIS IS FOR REMOVE IMAGE
  async removeUserProfilePhoto(payload) {
    const path = '/user/photo/remove';
    let serverUrl;
    try {

      serverUrl = environment.apiServerUrl + path;
      const result = await this.httpService.postRequest(serverUrl, payload, null);
      return result;
    } catch (error) {
      this.baseService.log('removeUserProfilePhoto: Error in removing user profile photo: ' + error);
      throw new Error('Error in removing user profile photo: ' + error);
    }
  }

  // For profile details
  async getUserProfile(payload) {
    const path = '/user/profile/details';
    let serverUrl;
    let result;
    try {

      serverUrl = environment.apiServerUrl + path;
      result = await this.httpService.postRequest(serverUrl, payload, null);
      return result;
    } catch (error) {
      this.baseService.log('getUserProfile: Error in getting user profile: ' + error);
      throw new Error('Error in getting user profile: ' + error);
    }
  }

  //  update user Profile details
  async updateUserProfile(payload) {
    const path = '/user/profile/update';
    let serverUrl;
    let result;
    try {

      serverUrl = environment.apiServerUrl + path;
      result = await this.httpService.postRequest(serverUrl, payload, null);
      return result;
    } catch (error) {
      this.baseService.log('updateUserProfile: Error in updating user profile: ' + error);
      throw new Error('Error in updating user profile: ' + error);
    }
  }

  // This is for change passwd
  async changePassword(payload) {
    const path = '/user/changepassword';
    let serverUrl;
    let result;
    try {

      serverUrl = environment.apiServerUrl + path;
      result = await this.httpService.postRequest(serverUrl, payload, null);
      return result;
    } catch (error) {
      this.baseService.log('changePassword: Error in changing user password: ' + error);
      throw new Error('Error in changing user password: ' + error);
    }
  }

  // This is for user
  async getUserSecurityDetails(payload) {
    const path = '/user/security/details';
    let serverUrl;
    let result;
    try {
      serverUrl = environment.apiServerUrl + path;
      result = await this.httpService.postRequest(serverUrl, payload, null);
      return result;
    } catch (error) {
      this.baseService.log('changePassword: Error in getting user security details: ' + error);
      throw new Error('Error in getting user security details: ' + error);
    }
  }

  //  this is for security question and asnwers
  async updateUserSecurity(payload) {
    const path = '/user/security/update';
    let serverUrl;
    let result;
    try {

      serverUrl = environment.apiServerUrl + path;
      result = await this.httpService.postRequest(serverUrl, payload, null);
      return result;
    } catch (error) {
      this.baseService.log('changePassword: Error in updating user security details: ' + error);
      throw new Error('Error in updating user security details: ' + error);
    }
  }


  // THIS IS FOR USER MANAGEMENT TAB
  async getUserList(payload) {
    const path = '/user/list';
    let serverUrl;
    let result;
    try {
      console.log('accountID payload::' + JSON.stringify(payload));
      serverUrl = environment.apiServerUrl + path;
      result = await this.httpService.postRequest(serverUrl, payload, null);
      return result;
    } catch (error) {
      throw new Error('getUserList: Error in getting user list: ' + error);
    }
  }

  // THIS IS FOR CREATE NEW USER IN USER MANAGEMENT TAB
  async createNewUser(payload) {
    const path = '/user/create';
    let serverUrl;
    let result;
    try {

      serverUrl = environment.apiServerUrl + path;
      result = await this.httpService.postRequest(serverUrl, payload, null);
      return result;
    } catch (error) {
      throw new Error('createNewUser: Error in creating New User: ' + error);
    }
  }

  // THIS IS FOR CREATE NEW USER IN USER MANAGEMENT TAB
  async deleteUser(payload) {
    const path = '/user/delete';
    let serverUrl;
    let result;
    try {

      serverUrl = environment.apiServerUrl + path;
      result = await this.httpService.postRequest(serverUrl, payload, null);
      return result;
    } catch (error) {
      throw new Error('createNewUser: Error in creating New User: ' + error);
    }
  }

  // THIS IS FOR UPDATE THE USER INFOMATION
  async detailForUpdate(payload) {
    const path = '/user/info';
    let serverUrl;
    let result;
    try {
      serverUrl = environment.apiServerUrl + path;
      result = await this.httpService.postRequest(serverUrl, payload, null);
      return result;
    } catch (error) {
      throw new Error('DETAILS FOR UPDATE ERROR IN USER MANAGEMENT');
    }
  }

  // THIS IS FOR UPDATE THE USER INFOMATION
  async getRoles(payload) {
    const path = '/user/roles';
    let serverUrl;
    let result;
    try {
      serverUrl = environment.apiServerUrl + path;
      result = await this.httpService.postRequest(serverUrl, payload, null);
      return result;
    } catch (error) {
      throw new Error('Unable to get Avaibale User RolesList for the account');
    }
  }

  // THIS IS FOR UPDATE THE USER INFOMATION in user management
  async updateUserDetails(payload) {
    const path = '/user/update';
    let serverUrl;
    let result;
    try {

      serverUrl = environment.apiServerUrl + path;
      result = await this.httpService.postRequest(serverUrl, payload, null);
      return result;
    } catch (error) {
      throw new Error('UPDATE USER ERROR IN USER MANAGEMENT');
    }
  }

}
