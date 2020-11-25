import { Component, OnInit } from '@angular/core';
import { BaseService } from 'src/app/core/services';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  showMyProfile = true;
  showUserMgmt = false;
  showSecurity = false;
  showUserRoles = false;

  constructor(public baseService: BaseService) { }

  ngOnInit(): void {
    this.get_data();
  }

  async get_data() {

    try {

      // loop to get Menu details
      for (const menuItem of this.baseService.userMenuDetails) {
        if (menuItem.menu_id === 'USER_MGMT') { // Menu Item
          for (const tabItem of menuItem.tab) {
            if (tabItem.tab_id === 'USER_MGMT-PROFILE') {
              this.showMyProfile = true;
            } else if (tabItem.tab_id === 'USER_MGMT-USERS_MGMT') {
              this.showUserMgmt = true;
            } else if (tabItem.tab_id === 'USER_MGMT-USER_ROLES') {
              this.showUserRoles = true;
            } else if (tabItem.tab_id === 'USER_MGMT-USER_SECURITY') {
              this.showSecurity = true;
            }
          }
        }
      }

    }catch (error) {

     }
  }


}

