import { Component, OnInit } from '@angular/core';
import { BaseService } from 'src/app/core/services';

@Component({
  selector: 'app-platform',
  templateUrl: './platform.component.html',
  styleUrls: ['./platform.component.css']
})
export class PlatformComponent implements OnInit {

  showPlatformReportsMgmt = false;
  showPlatformAccessMgmt = false;
  showPlatformDetails = false;
  showPlatformManagement = false;

  constructor(
    public baseService: BaseService
  ) { }

  ngOnInit(): void {
    this.get_data();
  }

  async get_data() {
    try {

      // loop to get Menu details
      for (const menuItem of this.baseService.userMenuDetails) {
        if (menuItem.menu_id === 'PLATFORM') { // Menu Item
          for (const tabItem of menuItem.tab) {
            if (tabItem.tab_id === 'PLATFORM-ACCESS_MGMT') {
              this.showPlatformAccessMgmt = true;
            } else if (tabItem.tab_id === 'PLATFORM-RPT_MGMT') {
              this.showPlatformReportsMgmt = true;
            } else if (tabItem.tab_id === 'PLATFORM-DETAILS') {
              this.showPlatformDetails = true;
            } else if (tabItem.tab_id === 'PLATFORM-MANAGEMENT') {
              this.showPlatformManagement = true;
            }
          }
        }
      }

    } catch (error) {

    }
  }


}
