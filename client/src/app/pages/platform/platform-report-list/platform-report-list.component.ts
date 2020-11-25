import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { PlatformService, BaseService } from 'src/app/core/services';


@Component({
  selector: 'app-platform-report-list',
  templateUrl: './platform-report-list.component.html',
  styleUrls: ['./platform-report-list.component.css'],
  encapsulation: ViewEncapsulation.None,
})

export class PlatformReportListComponent implements OnInit {

  tableColumns: string[] = [];
  tableDataSource: any;
  totalNumberOfPlatforms = 0;
  totalNumberOfReports = 0;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  fileName = 'ReportExcelSheet.xlsx';

  constructor(
    public platformService: PlatformService,
    public baseService: BaseService
  ) { }

  ngOnInit(): void {
    this.getPlatformDetails();
    this.getPlatformReportDetails();
    this.pageLoad();
  }


  async getPlatformDetails() {
    try {
      let payload = {
        userID: this.baseService.userProfile.userID
      };
      const result = await this.platformService.getPlatformDetails(payload);
      this.totalNumberOfPlatforms = result.body.data.rows.length;

    } catch (error) {

    }
  }


  async getPlatformReportDetails() {
    let payload;
    let data = [];
    try {

      payload = {
        userID: this.baseService.userProfile.userID
      };

      const result = await this.platformService.getPlatformReportList(payload);

      for (const row of result.body.data.rows) {
        this.totalNumberOfReports = (this.totalNumberOfReports + 0) + (row.report_count + 0);
        data.push(row.report_id + ' : ' + row.report_name + ' : ' + row.report_count);
      }

    } catch (error) {
      alert('getPlatformReportDetails: ' + error);
    }
  }




  async pageLoad() {
    let payload;
    let data = [];
    try {

      payload = {
        userID: this.baseService.userProfile.userID
      };

      const result = await this.platformService.getPlatformReportList(payload);

      // LOOP START... for the Table Data
      this.tableColumns.length = 0;
      this.tableColumns.push('platform_status');
      this.tableColumns.push('platform_name');
      this.tableColumns.push('platform_code');

      for (const row of result.body.data.rows) {
        this.tableColumns.push(row.report_id);
      }

      const result1 = await this.platformService.getPlatformReportData(payload);
      data = result1.body.data.rows[0];

      this.tableDataSource = new MatTableDataSource(data);
      this.tableDataSource.sort = this.sort;
      this.tableDataSource.paginator = this.paginator;

    } catch (error) {
      alert('platformReportList: ' + error);
    }
  }

  applyFilter(event: Event) {
    try {
      const filterValue = (event.target as HTMLInputElement).value;
      this.tableDataSource.filter = filterValue.trim().toLowerCase();

      if (this.tableDataSource.paginator) {
        this.tableDataSource.paginator.firstPage();
      }
    } catch (error) {
    }
  }



  async download() {

    try {
      this.baseService.exportexcel(this.fileName);
    } catch (error) {
      console.error('downlod error');

    }
  }
}