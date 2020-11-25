import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpService } from './http.service';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class SettingService {

  constructor(
    public httpService: HttpService,
    public baseService: BaseService
  ) { }

  private getBaseUrl() {
    return environment.apiServerUrl;
  }

  async userSetting(payload) {
    let path = '';
    let serverUrl;
    let result;
    payload;

    try {
      path = '/user/setting';
      serverUrl = this.getBaseUrl() + path;
      result = await this.httpService.postRequest(serverUrl, payload, null);

      return result;
    } catch (error) {
      // what shoud be done here
      throw new error('HelpdeskService: Get Users: ' + error);
    }
  }
}