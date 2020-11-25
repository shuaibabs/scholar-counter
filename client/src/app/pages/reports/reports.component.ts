import { Component, OnInit } from '@angular/core';
import { BaseService } from 'src/app/core/services';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {

  showCounter5Report = false;
  showCounter4Report = false;
  showDataAnalytics = false;
  showStandardReports = false;
  showCustomReportst = false;
  showPlatformReports = false;

  constructor(public baseService: BaseService) { }

  ngOnInit(): void {
    this.get_data();
  }

  async get_data() {

    try {

      // loop to get Menu details
      for (const menuItem of this.baseService.userMenuDetails) {
        if (menuItem.menu_id === 'REPORTS') { // Menu Item
          for (const tabItem of menuItem.tab) {
            if (tabItem.tab_id === 'REPORTS-C4') {
              this.showCounter4Report = true;
            } else if (tabItem.tab_id === 'REPORTS-C5') {
              this.showCounter5Report = true;
            } else if (tabItem.tab_id === 'REPORTS-CUSTOM') {
              this.showCustomReportst = true;
            } else if (tabItem.tab_id === 'REPORTS-DA') {
              this.showDataAnalytics = true;
            } else if (tabItem.tab_id === 'REPORTS-PLATFORM') {
              this.showPlatformReports = true;
            } else if (tabItem.tab_id === 'REPORTS-STD') {
              this.showStandardReports = true;
            }
          }
        }
      }

    } catch (error) {

    }
  }





}
