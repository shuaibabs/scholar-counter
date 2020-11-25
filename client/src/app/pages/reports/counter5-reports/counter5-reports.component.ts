import { Component, OnInit, ViewChild } from '@angular/core';
import { DatePickerFormatAdapter, DATE_PICKER_FORMATS } from '../../../core/shared/DatePickerFormatAdapter';
import { DateAdapter, MAT_DATE_FORMATS } from '@angular/material/core';
import { FormControl, Validators } from '@angular/forms';
import { BaseService, ReportService } from 'src/app/core/services';
import * as gtUtil from '../../../../app/core/gt-utility';



@Component({
  selector: 'app-counter5-reports',
  templateUrl: './counter5-reports.component.html',
  styleUrls: ['./counter5-reports.component.css'],
  providers: [
    { provide: DateAdapter, useClass: DatePickerFormatAdapter },
    { provide: MAT_DATE_FORMATS, useValue: DATE_PICKER_FORMATS }
  ]
})

export class Counter5ReportsComponent implements OnInit {
  methods = new gtUtil.Methods();

  reportControl = new FormControl('', Validators.required);

  fileName = 'Counter5ReportExcelSheet.xlsx';

  rowData: any[] = [];
  columnHeaders: any[] = [];
  tablePreview: boolean = false;
  buttonPreview = true;
  pagePreview = true;

  c5Reports: any = [];
  metricTypes: any[] = [];
  dataTypes = [];
  accessTypes = [];
  accessMethods = [];

  reportName: string;
  selectedReport: string = '';
  selectedMetricType: any[] = [];
  selectedDataType = [];
  selectedAccessType = [];
  selectedAccessMethod = [];

  beginDate: any = this.getStartDate();
  endDate: any = this.getMaxDate();

  tableColumns: string[] = [];
  tableDataSource: any;

  reportHeaders = {
    Report_Name: '',
    Report_ID: this.selectedReport,
    Release: '5',
    Institution_Name: this.baseService.userProfile.accountName,
    Institution_ID: this.baseService.userProfile.accountCode,
    Metric_Types: this.selectedMetricType,
    Report_Filters: '',
    Report_Attributes: 'Attributes_To_Show=Data_Type|Access_Type|Access_Method ',
    Exceptions: '',
    Reporting_Period: ['Begin_Date =' + this.beginDate + ';' + 'End_Date =' + this.endDate],
    Created: '2020-09-26T13:00:58Z',
    Created_By: 'Gindowa Technologies Private Limited'
  }

  constructor(
    public baseService: BaseService,
    public reportService: ReportService
  ) {
    this.get_reports();
  }

  ngOnInit(): void {
    this.click_reset();
  }

  async get_reports() {
    const resData = await this.reportService.get_reportType()
    for (let index = 0; index < resData.body.data.rows.length; index++) {
      const model = {
        report_id: resData.body.data.rows[index].report_id,
        report_name: resData.body.data.rows[index].report_name
      };
      this.c5Reports.push(model)

    }
  }

  // ----EVENT FUNCTION START---- //
  async onSelectReport(selectedReport) {
    const payload = { report: selectedReport };
    this.pagePreview = false;
    this.metricTypes.length = 0;
    this.selectedMetricType.length = 0;
    //GETTING REPORT NAME
    const reportNameResult = await this.reportService.get_reportName(payload);
    this.reportName = reportNameResult.body.data.rows[0].report_name
    // GETTING METRIC TYPES
    const responseData = await this.reportService.get_metricType(payload);
    for (let index = 0; index < responseData.body.data.rows.length; index++) {
      const model = responseData.body.data.rows[index].metric_type;
      this.metricTypes.push(model);
    }
    // GETTING DATA TYPES
    this.dataTypes.length = 0;
    this.selectedDataType.length = 0;
    const responseData2 = await this.reportService.get_dataType(payload);
    for (let index = 0; index < responseData2.body.data.rows.length; index++) {
      const model = responseData2.body.data.rows[index].data_type;
      this.dataTypes.push(model);
    }
    // GETTING ACCESS TYPES
    this.accessTypes.length = 0;
    this.selectedAccessType.length = 0;
    const responseData3 = await this.reportService.get_accessType(payload);
    for (let index = 0; index < responseData3.body.data.rows.length; index++) {
      const model = responseData3.body.data.rows[index].access_type;
      this.accessTypes.push(model);
    }
    // GETTING ACCESS METHODS
    this.accessMethods.length = 0;
    this.selectedAccessMethod.length = 0;
    const responseData4 = await this.reportService.get_accessMethod(payload);
    for (let index = 0; index < responseData4.body.data.rows.length; index++) {
      const model = responseData4.body.data.rows[index].access_method;
      this.accessMethods.push(model);
    }
  }
  // ----EVENT FUNCTION END---- //

  // DATE METHODS i.e start date & end date etc  START
  // START DATE
  getStartDate() {
    try {
      let start_Date = new Date(new Date().getFullYear(), new Date().getMonth() - 1, 1);
      var date = new Date(start_Date),
        mnth = ("0" + (date.getMonth() + 1)).slice(-2),
        day = ("0" + date.getDate()).slice(-2);
      return [date.getFullYear(), mnth, day].join("-");

    } catch (error) {
    }
  }

  // MINIMUM DATE
  getMinDate() {
    try {
      return new Date(2019, 6, 1);
    } catch (error) {
    }
  }
  // MAXIMUM DATE AND END DATE
  getMaxDate() {
    try {
      let Max_End_Date = new Date(new Date().getFullYear(), new Date().getMonth(), 0);
      var date = new Date(Max_End_Date),
        mnth = ("0" + (date.getMonth() + 1)).slice(-2),
        day = ("0" + date.getDate()).slice(-2);
      return [date.getFullYear(), mnth, day].join("-");
    } catch (error) {

    }
  }
  // DATE METHODS i.e start date & end date etc  END



  async click_preview() {


    try {
      this.tablePreview = false;

      if (this.selectedMetricType.length === 0) { this.selectedMetricType = this.metricTypes; }
      if (this.selectedDataType.length === 0) { this.selectedDataType = this.dataTypes; }
      if (this.selectedAccessType.length === 0) { this.selectedAccessType = this.accessTypes; }
      if (this.selectedAccessMethod.length === 0) { this.selectedAccessMethod = this.accessMethods; }

      let payload = {
        userID: this.baseService.userProfile.userID,
        reportType: this.selectedReport,
        beginDate: this.beginDate,
        endDate: this.endDate,
        metricType: this.selectedMetricType,
        dataType: this.selectedDataType,
        accessType: this.selectedAccessType,
        accessMethod: this.selectedAccessMethod
      }

      if (Date.parse(this.endDate) <= Date.parse(this.beginDate)) {
        this.baseService.showSnackBar('End Date Should be Greater than Start Date !!', 'Please correct your Date', 4000)
      }
      else {
        const result = await this.reportService.getReportPreview(payload);


        //PUSHING DATA INTO HEADERS
        let dataOfRows = result.body.data.rows[0];
        this.rowData = Object.keys(dataOfRows);
        //PUSHING DATA INTO COLUMNS
        let dataOfColumns = result.body.data.rows;
        this.columnHeaders = dataOfColumns;


        //REPORT HEADERS WORK .....[Make tables or Show Normal Data ]
        let customSelectedDataType = this.customReplacer(this.selectedDataType);
        let customSelectedAccessType = this.customReplacer(this.selectedAccessType);
        let customSelectedAccessMethod = this.customReplacer(this.selectedAccessMethod);

        let reportHeaderspayload = {
          Report_Name: this.reportName,
          Report_ID: this.selectedReport,
          Release: '5',
          Institution_Name: this.baseService.userProfile.accountName,
          Institution_ID: this.baseService.userProfile.accountCode,
          Metric_Types: this.selectedMetricType,
          Report_Filters: 'Data_Type=' + customSelectedDataType +';'+ 'Access_Type=' + customSelectedAccessType +';'+ 'Access_Method=' + customSelectedAccessMethod,
          Report_Attributes: 'Attributes_To_Show=Data_Type|Access_Type|Access_Method ',
          Exceptions: '',
          Reporting_Period: ['Begin_Date =' + this.beginDate + ';'+ ' ' + 'End_Date =' + this.endDate],
          Created:'2020-09-26T13:00:58Z',
          Created_By: 'Gindowa Technologies Private Limited'
        }
   //alert(this.methods.getDateTimeStamp_JS())
        this.reportHeaders = reportHeaderspayload

        this.tablePreview = true;
        this.buttonPreview = false;
      }


    } catch (error) {
      alert('click_preview: ' + JSON.stringify(error));
    }
  }


  click_reset() {
    try {
      this.selectedReport = undefined;
      this.metricTypes.length = 0;
      this.dataTypes.length = 0;
      this.accessTypes.length = 0;
      this.accessMethods.length = 0;

      this.selectedMetricType.length = 0;
      this.selectedDataType.length = 0;
      this.selectedAccessType.length = 0;
      this.selectedAccessMethod.length = 0;

      this.tablePreview = false;
      this.buttonPreview = true;
    } catch (error) {
    }
  }


  beginDateMonthSelectEvent(event, datePicker) {
    const yyyy = event.getFullYear() + '';
    let mm = (event.getMonth() + 1);
    const dd = '01';
    try {
      if (mm <= 9) {
        mm = '0' + mm;
      }
      this.beginDate = yyyy + '-' + mm + '-' + dd;
    } catch (error) {
      alert('chosenMonthHandler: catch: ' + JSON.stringify(error));
    } finally {
      datePicker.close();
    }
  }

  endDateMonthSelectEvent(event, datePicker) {
    const yyyy: any = event.getFullYear() + '';
    let mm = (event.getMonth() + 1);
    let dd = '30';
    try {
      // check for 31 days month
      if (mm == 1 || mm == 3 || mm == 5 || mm == 7 || mm == 8 || mm == 10 || mm == 12) {
        dd = '31';
      }
      // check for feb and leap year
      if (mm == 2) {
        if (yyyy % 4 == 0) {
          dd = '29';
        } else {
          dd = '28';
        }
      }
      if (mm <= 9) {
        mm = '0' + mm;
      }
      this.endDate = yyyy + '-' + mm + '-' + dd;
    } catch (error) {
      alert('chosenMonthHandler: catch: ' + JSON.stringify(error));
    } finally {
      datePicker.close();
    }
  }


  async download() {

    try {
      this.baseService.exportexcel(this.fileName);
    } catch (error) {
      console.error('downlod error');

    }
  }


  ObjToArray(obj: any) {
    var arr = obj instanceof Array;

    return (arr ? obj : Object.keys(obj)).map(function (i: any) {
      var val = arr ? i : obj[i];

      return val;
    });
  }


  convertIntoString(data: any) {
    let stringify = '';
    let result;
    let parse;
    let resultMain = '';
    try {
      stringify = JSON.stringify(data);

      result = stringify.replace(/\[/g, '(').replace(/]/g, ')');

      resultMain = result.substring(1, result.length - 1);

      return resultMain;

    } catch (error) {
    }
  }

  customReplacer(data: any) {
    let ConvertedSelectedDataType = this.ObjToArray(data);
    let selectedDataTypeConvertedString = this.convertIntoString(ConvertedSelectedDataType);
    var re = /","/gi
    var str = selectedDataTypeConvertedString;
    var newstr = str.replace(re, "|");

    var ze = /"/gi
    var strr = newstr;
    var newstrrr = strr.replace(ze, "");

    return newstrrr;






  }



}
