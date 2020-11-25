import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { AuthService, BaseService } from 'src/app/core/services';

@Component({
  selector: 'app-request-demo',
  templateUrl: './request-demo.component.html',
  styleUrls: ['./request-demo.component.css']
})
export class RequestDemoComponent implements OnInit {

  requestDemoModel = {
    fullName : '',
    contactNumber : '',
    email : '',
    query : ''
  };


  constructor(public dialogRef: MatDialogRef<RequestDemoComponent>,
    public authService: AuthService,
    public baseService: BaseService) {
    dialogRef.disableClose = true;

   }

  ngOnInit(): void {
  }

  cancel(){

    try {
      this.dialogRef.close(true);
    } catch (error) {

    }
  }


 async click_requestDemo(){

    
    let result;
    try {
      result = await this.authService.sendRequest(this.requestDemoModel)

      if (result.body.status == 1 && result.body.data.affectedRows == 1) {
        this.baseService.showSnackBar(' Demo Request send Successfully', 'Success', 0);

        this.cancel();

      } else {
        this.baseService.showSnackBar('Something Went Wrong During Demo Request send', result.body.status + ' : ' + result.body.info , 0);
      }
    } catch (error) {
      throw new error('requestDemo ' + error);
    }
  }


}