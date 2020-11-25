import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Methods } from 'src/app/core/gt-utility';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  methods = new Methods();

  constructor(
    public httpService: HttpService,
  ) { }


  // COUNTER 5 REPORTS METHODS START
  async get_reportType() {
    let path = '';
    let serverUrl;
    let result;
    try {
      path = '/reporttypes';
      const payload = {}
      serverUrl = environment.apiServerUrl + path;
      result = await this.httpService.postRequest(serverUrl, payload, null);
      return result;
    } catch (error) {
    }
  }

   async get_reportName(payload) {
    let path = '';
    let serverUrl;
    let result;
    try {
      path = '/report/reportname';
      serverUrl = environment.apiServerUrl + path;
      result = await this.httpService.postRequest(serverUrl, payload, null);
      return result;
    } catch (error) {
    }
  }
  //
  async get_metricType(payload) {
    let path = '';
    let serverUrl;
    let result;
    try {
      path = '/metrictypes';
      serverUrl = environment.apiServerUrl + path;
      result = await this.httpService.postRequest(serverUrl, payload, null);
      return result;
    } catch (error) {
    }
  }

  //

  async get_dataType(payload) {
    let path = '';
    let serverUrl;
    let result;
    try {
      path = '/datatypes';
      serverUrl = environment.apiServerUrl + path;
      result = await this.httpService.postRequest(serverUrl, payload, null);
      return result;
    } catch (error) {
    }
  }

  //
  async get_accessType(payload) {
    let path = '';
    let serverUrl;
    let result;
    try {
      path = '/accesstypes';

      serverUrl = environment.apiServerUrl + path;
      result = await this.httpService.postRequest(serverUrl, payload, null);
      return result;
    } catch (error) {
    }
  }

  //
  async get_accessMethod(payload) {
    let path = '';
    let serverUrl;
    let result;
    try {
      path = '/accessmethods';
      serverUrl = environment.apiServerUrl + path;
      result = await this.httpService.postRequest(serverUrl, payload, null);
      return result;
    } catch (error) {
    }
  }

  async getReportPreview(payload) {
    let path = '';
   let serverUrl;
    let result;
    try {
      path = '/report/preview';
      serverUrl = environment.apiServerUrl + path;
      result = await this.httpService.postRequest(serverUrl, payload, null);
      return result;
    } catch (error) {
    }
  }

}
