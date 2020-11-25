import { Component, OnInit } from '@angular/core';
import { BaseService } from 'src/app/core/services';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  showMyAccount = false;

  constructor(public baseService: BaseService) { }

  ngOnInit(): void {
    this.get_data();
  }

  async get_data() {

    try {

      // loop to get Menu details
      for (const menuItem of this.baseService.userMenuDetails) {
        if (menuItem.menu_id === 'ACCOUNT') { // Menu Item
          for (const tabItem of menuItem.tab) {
            if (tabItem.tab_id === 'ACCOUNT-MY_ACCOUNT') {
              this.showMyAccount = true;
            }
          }
        }
      }

    }catch (error) {

     }
  }




}
