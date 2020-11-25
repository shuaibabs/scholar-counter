import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import {
  faFilePdf, faFileCsv, faFileExcel, faFileAlt, faEnvelope, faRedoAlt, faSearch,
  faDownload
} from '@fortawesome/free-solid-svg-icons';
import { environment } from 'src/environments/environment';
import { HttpService, LocalService } from 'src/app/core/services';
import { Methods } from 'src/app/core/gt-utility';
import { MasterModel } from 'src/app/core/model';
import { MatDialog } from '@angular/material/dialog';
import { MessageDialogComponent, ConfirmDialogComponent } from 'src/app/components';
import * as XLSX from 'xlsx';

@Injectable({
  providedIn: 'root'
})
export class BaseService {
  readonly defaultImage = 'data:image/png;base64,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';

  faIcon = {
    faFilePdf,
    faFileCsv,
    faFileExcel,
    faFileAlt,
    faEnvelope,
    faRedoAlt,
    faSearch,
    faDownload,
  };
  masterModel: MasterModel = new MasterModel();
  methods: Methods = new Methods();
  userProfile = this.masterModel.getUserProfileModel();
  userMenuDetails;

  logger = {
    userID: '',
    menu: '',
    tab: '',
    method: '',
    message: '',
  };

  constructor(
    private httpService: HttpService,
    private localService: LocalService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
  ) { }

  getDisplayName() {
    return this.userProfile.lastName + ', ' + this.userProfile.firstName;
  }

  getFullName() {
    return this.userProfile.firstName + ' ' + this.userProfile.middleName + ' ' + this.userProfile.lastName;
  }

  refresh() {
    window.location.reload();
  }

  showSnackBar(message: string, action: string, durationMS: number) {
    const url = environment.apiServerUrl + '/common/loguseractivity';
    try {
      if (durationMS <= 4000) { durationMS = 4000; }

      const tempMessage = message.toString().split('\'').join(' ');
      const tempAction = action.toString().split('\'').join(' ');
      try {
        const payload = { userID: this.userProfile.userID, message: tempMessage, action: tempAction };
        this.httpService.postRequest(url, payload, null);
      } catch (error) { }

      this.snackBar.open(
        message,
        action,
        { duration: durationMS }
      );
    } catch (error) {
      alert('showSnackBar: ' + error);
    }
  }

  async log(message: string) {
    const url = environment.apiServerUrl + '/common/loguseractivity';
    let functionName;
    let className;
    let fileName;
    let temp;
    try {
      temp = message.split('\'').join(' ');
      const payload = {
        userID: this.userProfile.userID,
        message: temp,
        action: 'LOG'
      };
      const result = await this.httpService.postRequest(url, payload, null);
      // alert('log: ' + result.body.info);
    } catch (error) {
      alert('log: ' + error);
    }
  }

  async refreshProfileAvatar(photo) {
    try {
      this.userProfile.photo = photo;
    } catch (error) {
      this.showSnackBar('Error in Refreshing Avatar', error, 0);
    }
  }

  // Request demo method
  async demo(payload) {
    const path = '/auth/demo';
    let serverUrl;
    let result;
    try {

      serverUrl = environment.apiServerUrl + path;
      result = await this.httpService.postRequest(serverUrl, payload, null);
      this.showSnackBar('Your Demo Request Submitted Successfully', 'Have a Good Day!', 0);
      return result;
    } catch (error) {
      this.showSnackBar('Something Went Wrong, Pls try later', error, 0);
    }
  }

  async getDefaultAvatar() {
    return this.defaultImage;
  }

  async showMessageDialog(title: string, message: string) {

    try {

      const dialogRef = this.dialog.open(
        MessageDialogComponent,
        { data: { title: title.toString(), message: message.toString() } }
      );
      dialogRef.afterClosed().subscribe(async () => { });

    } catch (error) {
      alert('showMessageDialog: ' + error);
    }

  }

  // for download excel file
  exportexcel(fileName: string): void 
  {
     /* table id is passed over here */   
     let element = document.getElementById('excel-table'); 
     const ws: XLSX.WorkSheet =XLSX.utils.table_to_sheet(element);

     /* generate workbook and add the worksheet */
     const wb: XLSX.WorkBook = XLSX.utils.book_new();
     XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

     /* save to file */
     XLSX.writeFile(wb, fileName);
    
  }
}
