import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import * as Highcharts from 'highcharts';
import { PlatformService, BaseService } from 'src/app/core/services';

declare var require: any;
const Boost = require('highcharts/modules/boost');
const noData = require('highcharts/modules/no-data-to-display');
const More = require('highcharts/highcharts-more');

Boost(Highcharts);
noData(Highcharts);
More(Highcharts);
noData(Highcharts);

const ELEMENT_DATA = [];

@Component({
  selector: 'app-platform-details',
  templateUrl: './platform-details.component.html',
  styleUrls: ['./platform-details.component.css']
})
export class PlatformDetailsComponent implements OnInit {

  displayedColumns: string[] = ['name', 'status', 'platform_code', 'country', 'state', 'city', 'createdOn'];
  dataSource: any;
  accountPhoto: any;
  accountName: string;
  accountCode: string;
  totalNumberOfPlatforms = 0;
  totalNumberOfReports = 0;
  description: string;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  fileName = 'DetailExcelSheet.xlsx';

  constructor(
    public baseService: BaseService,
    public platformService: PlatformService,
  ) { }

  ngOnInit(): void {
    this.plotGraphPlatform();
    this.plotGraphReport();
  }

  async getPlatformDetails() {

    try {
      // We have done ElementData length Zero so that if we hit platformDetails()
      // another time it doesn't show already pushed Data along new Data
      ELEMENT_DATA.length = 0;

      let payload = {
        userID: this.baseService.userProfile.userID
      };
      const result = await this.platformService.getPlatformDetails(payload);
      this.totalNumberOfPlatforms = result.body.data.rows.length;
      // LOOP START... for the Table Data
      for (let index = 0; index < result.body.data.rows.length; index++) {
        let colorClass = 'non-active';
        // Conditions for the Status Color START
        if (result.body.data.rows[index].status === 'ACTIVE') {
          colorClass = 'active';
        } else if (result.body.data.rows[index].status === 'Non-Active') {
          colorClass = 'non-active';
        } else if (result.body.data.rows[index].status === 'Blocked') {
          colorClass = 'blocked';
        } else if (result.body.data.rows[index].status === 'Expired') {
          colorClass = 'expired';
        } else if (result.body.data.rows[index].status === 'Hold') {
          colorClass = 'hold';
        }

        const model = {
          name: result.body.data.rows[index].platform_name,
          platform_code: result.body.data.rows[index].platform_code,
          country: result.body.data.rows[index].country,
          state: result.body.data.rows[index].state,
          city: result.body.data.rows[index].city,
          status: result.body.data.rows[index].status,
          createdOn: result.body.data.rows[index].created_on,
          statusColor: colorClass
        };

        ELEMENT_DATA.push(model);
        this.dataSource = new MatTableDataSource(ELEMENT_DATA);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;

      }

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
      // alert('data: ' + JSON.stringify(result.body.data));

    } catch (error) {
      alert('getPlatformReportDetails: ' + error);
    }
  }

  async plotGraphPlatform() {
    const chartColorArray = [];
    const dataSeries = [];

    try {
      const graph: any = {
        chart: {
          plotBackgroundColor: '',
          // plotBorderWidth: 1,
          plotShadow: false,
          type: 'column',
          // type: 'bar',
          // type: 'line',
        },
        credits: {
          enabled: false
        },
        title: {
          text: ''
        },
        xAxis: {
          type: 'category',
          allowDecimals: false
        },
        yAxis: {
          title: {
            text: 'Platforms'
          },
          allowDecimals: false
        },
        legend: {
          // this enables display of series name
          enabled: false
        },
        accessibility: {
          point: {
            valueSuffix: '%'
          }
        },
        colors: [] = chartColorArray,
        plotOptions: {
          series: {
            borderWidth: 1,
            dataLabels: {
              enabled: true,
              format: '{point.y}'
            }
          }
        },
        tooltip: {
          headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
          pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y}</b> <br/>'
        },
        series: [
          {
            name: 'Platforms',
            colorByPoint: true,
            data: []
          }
        ]
      };
      // getting all platform details
      this.getPlatformDetails();

      let payload = {
        userID: this.baseService.userProfile.userID
      };
      const result = await this.platformService.getPlatformStatusDetails(payload);

      chartColorArray.length = 0;
      for (let row of result.body.data.rows) {
        // Conditions for the PIE CHART Color START
        if (row.status === 'ACTIVE') {
          chartColorArray.push('green');
        } else if (row.status === 'Non-Active') {
          chartColorArray.push('red');
        } else if (row.status === 'Blocked') {
          chartColorArray.push('black');
        } else if (row.status === 'Expired') {
          chartColorArray.push('grey');
        } else if (row.status === 'Hold') {
          chartColorArray.push('blue');
        }
        const temp = { name: row.status, y: row.total_number };
        dataSeries.push(temp);
      }
      graph.colors = chartColorArray;
      graph.series[0].data = dataSeries;
      Highcharts.chart('graph-platform', graph);

    } catch (error) {

    }
  }



  async plotGraphReport() {
    const chartColorArray = [];
    const dataSeries = [];
    let payload;
    try {
      const graph: any = {
        chart: {
          plotBackgroundColor: '',
          // plotBorderWidth: 1,
          plotShadow: false,
          // type: 'column',
          // type: 'bar',
          type: 'line',
        },
        credits: {
          enabled: false
        },
        title: {
          text: ''
        },
        xAxis: {
          type: 'category',
          allowDecimals: false
        },
        yAxis: {
          title: {
            text: 'Reports'
          },
          allowDecimals: false
        },
        legend: {
          // this enables display of series name
          enabled: false
        },
        accessibility: {
          point: {
            valueSuffix: '%'
          }
        },
        // colors: [] = chartColorArray,
        plotOptions: {
          series: {
            borderWidth: 1,
            dataLabels: {
              enabled: true,
              format: '{point.y}'
            }
          }
        },
        tooltip: {
          headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
          pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y}</b> <br/>'
        },
        series: [
          {
            name: 'Reports',
            colorByPoint: true,
            data: []
          }
        ]
      };

      // getting paltform details from platform api service
      payload = { userID: this.baseService.userProfile.userID };
      const result = await this.platformService.getPlatformReportList(payload);

      chartColorArray.length = 0;
      for (const row of result.body.data.rows) {
        this.totalNumberOfReports = (this.totalNumberOfReports + 0) + (parseInt((row.report_count).toString()) + 0);
        const temp = { name: row.report_id + ' (' + row.report_name + ')', y: row.report_count };
        dataSeries.push(temp);
      }
      graph.series[0].data = dataSeries;
      Highcharts.chart('graph-report', graph);

    } catch (error) {

    }
  }

  applyFilter(event: Event) {
    try {
      const filterValue = (event.target as HTMLInputElement).value;
      this.dataSource.filter = filterValue.trim().toLowerCase();

      if (this.dataSource.paginator) {
        this.dataSource.paginator.firstPage();
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

