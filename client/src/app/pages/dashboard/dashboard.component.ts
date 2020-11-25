import { Component, OnInit } from '@angular/core';
import { BaseService } from 'src/app/core/services';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  showUserDashboard = false;
  showExecutiveDashboard = false;
  showAdminDashboard = false;

  constructor(public baseService: BaseService) { }

  ngOnInit(): void {
    this.get_data();
  }

  async get_data() {

    try {

      // loop to get Menu details
      for (const menuItem of this.baseService.userMenuDetails) {
        if (menuItem.menu_id === 'DASHBOARD') { // Menu Item
          for (const tabItem of menuItem.tab) {
            if (tabItem.tab_id === 'DASHBOARD-ADMIN') {
              this.showAdminDashboard = true;
            } else if (tabItem.tab_id === 'DASHBOARD-EXECUTIVE') {
              this.showExecutiveDashboard = true;
            } else if (tabItem.tab_id === 'DASHBOARD-USER') {
              this.showUserDashboard = true;
            }
          }
        }
      }


    } catch (error) {

    }
  }





}
