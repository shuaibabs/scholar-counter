import { Component, OnInit } from '@angular/core';
import { BaseService } from 'src/app/core/services';

@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.css']
})
export class AnalyticsComponent implements OnInit {

  showCostAnalysis = false;

  constructor(public baseService: BaseService) { }

  ngOnInit(): void {
    this.get_data();
  }

  async get_data() {

    try {

      // loop to get Menu details
      for (const menuItem of this.baseService.userMenuDetails) {
        if (menuItem.menu_id === 'ANALYTICS') { // Menu Item
          for (const tabItem of menuItem.tab) {
            if (tabItem.tab_id === 'ANALYTICS-COST_ANALYTICS') {
              this.showCostAnalysis = true;
            }
          }
        }
      }

    } catch (error) {

    }
  }


}
