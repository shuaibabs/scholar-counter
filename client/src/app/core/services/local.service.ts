import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LocalService {

  constructor(public router: Router) { }

  // JWT TOKEN SET GET REMOVE METHODS START...
  public setToken(token) {
    try {
      sessionStorage.setItem('token', token);
      return true;
    } catch (error) {
      throw new Error('getToken: ' + JSON.stringify(error));
    }
  }

  public getToken() {
    return sessionStorage.getItem('token');
  }

  public removeToken() {
    sessionStorage.removeItem('token');
    sessionStorage.clear();
  }

  // Setting username in session storage on click of remeber me checkbox
  public setUser(user) {
    try {
      sessionStorage.setItem('user', user);
      return true;
    } catch (error) {
      throw new Error('setUser: ' + JSON.stringify(error));
    }
  }

  // getting username in session storage on click of remeber me checkbox
  public getUser() {
    try {
      const user: string = sessionStorage.getItem('user');
      return user;
    } catch (error) {
      throw new Error('getUser: ' + JSON.stringify(error));
    }
  }

  setSessionItem(sessionItem, sessionValue){
    try {
      sessionItem = (sessionItem + '').trim().toLowerCase();
      sessionStorage.setItem(sessionItem, sessionValue);
    } catch (error) {
      console.log('setSessionItem: ' + error);
    }
  }

  getSessionItem(sessionItem){
    try {
      sessionItem = (sessionItem + '').trim().toLowerCase();
      return sessionStorage.getItem(sessionItem);
    } catch (error) {
      console.log('getSessionItem: ' + error);
      return '';
    }
  }

  setStorageItem(storageItem, storageValue){
    try {
      storageItem = (storageItem + '').trim().toLowerCase();
      localStorage.setItem(storageItem, storageValue);
    } catch (error) {
      console.log('setStorageItem: ' + error);
    }
  }

  getStorageItem(storageItem){
    try {
      storageItem = (storageItem + '').trim().toLowerCase();
      return localStorage.getItem(storageItem);
    } catch (error) {
      console.log('getStorageItem: ' + error);
      return '';
    }
  }


  setRememberMeUser(loginID) {
    try {
      loginID = (loginID + '').toLowerCase();
      localStorage.setItem('remember_me_user_id', loginID);
    } catch (error) {
      console.log('Error in setRememberMeUser for loginID: ' + loginID + ': ' + error);
      alert('Error in setRememberMeUser for loginID: ' + loginID + ': ' + error);
    }
  }

  getRememberMeUser() {
    let value = '';
    try {
      value = localStorage.getItem('remember_me_user_id');
      if (value == null || value == 'undefined') {
        value = '';
      }
      value = value.toLowerCase();
    } catch (error) {
      value = '';
      console.log('Error in getRememberMeUser for loginID: ' + error);
      alert('Error in getRememberMeUser for loginID: ' + error);
    }
    return value;
  }

  setSavePassword(password) {
    try {
      localStorage.setItem('remember_me_password', password);
    } catch (error) {
      console.log('Error in setSavePassword for loginID: ' + error);
      alert('Error in setSavePassword for loginID: ' + error);
    }
  }

  getSavePassword() {
    let value = '';
    try {
      value = localStorage.getItem('remember_me_password');
      if (value == null || value == 'undefined') {
        value = '';
      }
    } catch (error) {
      value = '';
      console.log('Error in getSavePassword for loginID: ' + error);
      alert('Error in getSavePassword for loginID: ' + error);
    }
    return value;
  }

  clearSession() {
    try {
      sessionStorage.clear();
    } catch (error) {}
  }

  clearStorage() {
    try {
      localStorage.clear();
    } catch (error) {}
  }

  async refresh() {
    window.location.reload();
  }

  async logout() {
    try {
      this.setSavePassword('');
      this.clearSession();
    } catch (error) {
      alert('logout: Error in Logout, please try again');
    } finally {
      this.clearSession();
      this.router.navigate(['']);
      this.refresh();
    }
  }

}
