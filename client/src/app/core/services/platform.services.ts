
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpService } from './http.service';
import * as gtUtil from '../gt-utility';

@Injectable({
  providedIn: 'root'
})
export class PlatformService {

  methods = new gtUtil.Methods();

  constructor(
    public httpService: HttpService,
  ) { }

  private getBaseUrl() {
    return environment.apiServerUrl;
  }

  async getPlatformDetails(payload) {
    let path = '';
    let serverUrl;
     let result;

    try {  
      path = '/platform/total/details';
      serverUrl = this.getBaseUrl() + path;
     result = await this.httpService.postRequest(serverUrl, payload, null);
     return result;

    } catch (error) {
      throw new error('PlatformService: getPlatformDetails: ' + error);
    }
  }

 

  async getPlatformStatusDetails(payload) {
    let path = '';
    let serverUrl;
    let result;

    try {
      path = '/platform/status/details';
      serverUrl = this.getBaseUrl() + path;
    
      result = await this.httpService.postRequest(serverUrl, payload, null);
      return result;

    } catch (error) {
      //
    }
  }

  async createNewfPlatform(payload) {
    let path = '';
    let serverUrl;
    let result;

    try {
      path = '/platform/create';
      serverUrl = this.getBaseUrl() + path;
      result = await this.httpService.postRequest(serverUrl, payload, null);
      return result;

    } catch (error) {

    }
  }

  async getSingleAndSpecificPlatformDetails(payload) {
    let path = '';
    let serverUrl;

    let result;

    try {
      path = '/platform/singleAndSpecific/detail';
      serverUrl = this.getBaseUrl() + path;


      result = await this.httpService.postRequest(serverUrl, payload, null);
      return result;

    } catch (error) {

    }
  }

  async UpdatePlatform(payload) {
    let path = '';
    let serverUrl;

    let result;

    try {
      path = '/platform/update';
      serverUrl = this.getBaseUrl() + path;


      result = await this.httpService.postRequest(serverUrl, payload, null);
      return result;

    } catch (error) {

    }
  }

  async DeletePlatform(payload) {
    let path = '';
    let serverUrl;

    let result;

    try {
      path = '/platform/delete';
      serverUrl = this.getBaseUrl() + path;


      result = await this.httpService.postRequest(serverUrl, payload, null);
      return result;

    } catch (error) {

    }
  }



  async getPlatformReportList(payload) {
    const serverUrl = environment.apiServerUrl + '/platform/reportlist';
    let result;

    try {
      result = await this.httpService.postRequest(serverUrl, payload, null);
      return result;

    } catch (error) {

    }
  }


  async getPlatformReportData(payload) {
    const serverUrl = environment.apiServerUrl + '/platform/reportdata';
    let result;

    try {
      result = await this.httpService.postRequest(serverUrl, payload, null);
      return result;

    } catch (error) {

    }
  }


}
