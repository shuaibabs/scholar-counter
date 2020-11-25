import { Component, OnInit } from '@angular/core';
import { BaseService } from 'src/app/core/services';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  showUserSettings = false;
  showAppSettings = false;
  showNotifications = false;
  showSchedular = false;

  constructor(public baseService: BaseService) { }

  ngOnInit(): void {
    this.get_data();
  }

  async get_data() {

    try {

      // loop to get Menu details
      for (const menuItem of this.baseService.userMenuDetails) {
        if (menuItem.menu_id === 'SETTINGS') { // Menu Item
          for (const tabItem of menuItem.tab) {
            if (tabItem.tab_id === 'SETTINGS-APP_SETTINGS') {
              this.showAppSettings = true;
            } else if (tabItem.tab_id === 'SETTINGS-USER_SETTINGS') {
              this.showUserSettings = true;
            } else if (tabItem.tab_id === 'SETTINGS-NOTIFICATION') {
              this.showNotifications = true;
            } else if (tabItem.tab_id === 'SETTINGS-SCHEDULAR') {
              this.showSchedular = true;
            }
          }
        }
      }

    } catch (error) {

    }
  }



}

