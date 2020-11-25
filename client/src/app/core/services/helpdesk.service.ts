import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpService } from './http.service';
import * as gtUtil from '../gt-utility';
import { BaseService } from './base.service';


@Injectable({
  providedIn: 'root'
})
export class HelpdeskService {

  methods = new gtUtil.Methods();

  constructor(
    public httpService: HttpService,
    public baseService: BaseService
  ) { }

  private getBaseUrl() {
    return environment.apiServerUrl;
  }

  async getUsers(payload) {
    let path = '';
    let serverUrl;
    let result;
    payload;

    try {
      path = '/helpdesk/getuser';
      serverUrl = this.getBaseUrl() + path;
      result = await this.httpService.postRequest(serverUrl, payload, null);

      return result;
    } catch (error) {
      // what shoud be done here
      throw new error('HelpdeskService: Get Users: ' + error);
    }
  }

  async submitDetails(payload) {

    let path = '';
    let serverUrl;
    payload;
    let result;

    try {
      path = '/helpdesk/submitdetails';
      serverUrl = this.getBaseUrl() + path;
      result = await this.httpService.postRequest(serverUrl, payload, null);

      return result;

    } catch (error) {
      throw new error('HelpdeskService: Submit Details: ' + error);
    }
  } 

  async getUserTickets() {

    let path = '';
    let serverUrl;
    let payload = {
      accountID: this.baseService.userProfile.accountID
    }
    let result;
    try {
      path = '/helpdesk/getuserticket';
      serverUrl = this.getBaseUrl() + path;
      result = await this.httpService.postRequest(serverUrl, payload, null);

      return result;

    } catch (error) {
      throw new error('HelpdeskService: get User Tickets: ' + error);
    }
  } 


  async getTicketData(payload) {

    let path = '';
    let serverUrl;
    let result;
    try {
      path = '/helpdesk/ticketing/getticketdata';
      serverUrl = this.getBaseUrl() + path;
      result = await this.httpService.postRequest(serverUrl, payload, null);

      return result;

    } catch (error) {
      throw new error('HelpdeskService: get Ticket Data: ' + error);
    }
  } 

  async replyTicket(payload) {

    let path = '';
    let serverUrl;
    let result;
    try {
      path = '/helpdesk/ticketing/replyticket';
      serverUrl = this.getBaseUrl() + path;
      result = await this.httpService.postRequest(serverUrl, payload, null);

      return result;

    } catch (error) {
      throw new error('HelpdeskService: Reply Ticket: ' + error);
    }
  } 


  async ticketClosed(payload) {

    let path = '';
    let serverUrl;
    let result;
    try {
      path = '/helpdesk/ticketing/ticketclosed';
      serverUrl = this.getBaseUrl() + path;
      result = await this.httpService.postRequest(serverUrl, payload, null);

      return result;

    } catch (error) {
      throw new error('HelpdeskService: ticketclosed: ' + error);
    }
  } 


  async getFaqData(payload) {

    let path = '';
    let serverUrl;
    let result;
    try {
      path = '/helpdesk/faq/getfaqdata';
      serverUrl = this.getBaseUrl() + path;
      result = await this.httpService.postRequest(serverUrl, payload, null);

      return result;

    } catch (error) {
      throw new error('HelpdeskService: ticketclosed: ' + error);
    }
  } 

}