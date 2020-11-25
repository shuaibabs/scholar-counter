import { Component, OnInit } from '@angular/core';
import { BaseService } from 'src/app/core/services';
import { HelpdeskService } from 'src/app/core/services/helpdesk.service';

@Component({
  selector: 'app-helpdesk-faq',
  templateUrl: './helpdesk-faq.component.html',
  styleUrls: ['./helpdesk-faq.component.css']
})
export class HelpdeskFaqComponent implements OnInit {

  displayedField: string[] = ['faq_id', 'categroy', 'Sub_categroy', 'answer', 'question'];
  dataSources = [];  

  constructor(
    public baseService: BaseService,
    public helpDesk: HelpdeskService,
  ) { }

  ngOnInit(): void {
    this.getFaqData();
  }

  async getFaqData() {
    let payload = {}
    let result;
    try {
      result = await this.helpDesk.getFaqData(payload)

      console.log('data::' + JSON.stringify(result.body.data));

      this.dataSources= result.body.data;

      console.log('ELEMENT_DATA::' + JSON.stringify(this.dataSources));

    } catch (error) {

    }
  }

}