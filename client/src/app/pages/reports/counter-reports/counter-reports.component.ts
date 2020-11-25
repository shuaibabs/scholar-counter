import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

interface C5Report {
  Report_ID: string;
  Report_Name: string;
}
interface AcessMethod_event {
  access_method: string;
}

@Component({
  selector: 'app-counter-reports',
  templateUrl: './counter-reports.component.html',
  styleUrls: ['./counter-reports.component.css']
})
export class CounterReportsComponent implements OnInit {

  c5Reports: C5Report[] = [
    { Report_ID: 'TR', Report_Name: 'Title Master Report' },
    { Report_ID: 'PR', Report_Name: 'Platform Master Report' },
    { Report_ID: 'DR', Report_Name: 'Database Master Report' },
    { Report_ID: 'IR', Report_Name: 'Item Master Report' },
  ];
  acessMethod_events: any[] = []

  constructor(private http: HttpClient) { }
  ngOnInit(): void {
    this.get_accessMethod();
  }

  get_accessMethod() {



  }
}
