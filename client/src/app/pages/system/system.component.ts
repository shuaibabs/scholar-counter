import { Component, OnInit } from '@angular/core';
import { BaseService } from 'src/app/core/services';

@Component({
  selector: 'app-system',
  templateUrl: './system.component.html',
  styleUrls: ['./system.component.css']
})
export class SystemComponent implements OnInit {

  showSysAdmin = false;

  constructor(
    private baseService: BaseService,
  ) {

  }

  ngOnInit(): void {
    this.get_data();
  }

  async get_data() {

    try {

      // loop to get Menu details
      for (const menuItem of this.baseService.userMenuDetails) {
        if (menuItem.menu_id === 'SYSTEM') { // Menu Item
          for (const tabItem of menuItem.tab) {
            if (tabItem.tab_id === 'SYSTEM-SYS_ADMIN') {
              this.showSysAdmin = true;
            }
          }
        }
      }

    } catch (error) {

    }
  }

}
