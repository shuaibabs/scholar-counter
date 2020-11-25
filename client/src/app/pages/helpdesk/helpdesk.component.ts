import { Component, OnInit } from '@angular/core';
import { BaseService } from 'src/app/core/services';


export interface event {
  tab_id_order: number;
  tab_id: string;

}

@Component({
  selector: 'app-helpdesk',
  templateUrl: './helpdesk.component.html',
  styleUrls: ['./helpdesk.component.css']
})
export class HelpdeskComponent implements OnInit {
  showHelpdeskContactUs = false;
  showHelpdeskFAQ = false;

  event: event[] = [];

  constructor(public baseService: BaseService) { }

  ngOnInit(): void {
    this.get_data();
  }

  async get_data() {

    try {

      // loop to get Menu details
      for (const menuItem of this.baseService.userMenuDetails) {
        if (menuItem.menu_id === 'HELPDESK') { // Menu Item
          for (const tabItem of menuItem.tab) {
            if (tabItem.tab_id === 'HELPDESK-CONTACT_US') {
              this.showHelpdeskContactUs = true;
            } else if (tabItem.tab_id === 'HELPDESK-FAQ') {
              this.showHelpdeskFAQ = true;
            }
          }
        }
      }

    } catch (error) {

    }
  }





}

