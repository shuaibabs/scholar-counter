import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { BaseService, ReportService } from 'src/app/core/services';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';


@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.css']
})
export class DataTableComponent implements OnInit {

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  @Input() rowData: string[] = [];
  @Input() columnHeaders: string[] = [];
  @Input() fileName: string;

  tableColumns: string[] = [];
  tableDataSource: any;


  constructor(
    public baseService: BaseService,
    public reportService: ReportService
  ) { }

  ngOnInit(): void {
    this.onLoad();
  }

  async onLoad() {

    try {
      await this.delay(200);
    
      this.tableColumns = this.rowData;
      this.tableDataSource = new MatTableDataSource(this.columnHeaders);

      this.tableDataSource.sort = this.sort;
      this.tableDataSource.paginator = this.paginator;

    } catch (error) {
      alert('click_preview: ' + JSON.stringify(error));
    }
  }


  delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
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
