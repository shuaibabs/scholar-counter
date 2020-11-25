import { Component, OnInit, Input } from '@angular/core';
import { LocalService, UserService, BaseService } from 'src/app/core/services';
import { MatDialog } from '@angular/material/dialog';
import { MessageDialogComponent } from 'src/app/components';

@Component({
  selector: 'app-user-security',
  templateUrl: './user-security.component.html',
  styleUrls: ['./user-security.component.css']
})
export class UserSecurityComponent implements OnInit {

  @Input() currentUserID: string;
  @Input() currentLoginID: string;

  userSecurity = {
    loginID: '',
    userID: '',
    question1: '',
    answer1: '',
    question2: '',
    answer2: '',
    question3: '',
    answer3: '',
  };

  // start change passwd
  currentPassword;
  newPassword;
  confirmPassword;

  hide1 = true;
  hide2 = true;
  hide3 = true;
  errorMsg;

  msg = {
    first: '',
    second: ''
  };
  // End  of change passwd

  // start for login activity
  userActivity = {
    loginStatus: '',
    created: '',
    loginSuccess: '',
    loginFailed: '',
  };


  constructor(
    private baseService: BaseService,
    private localService: LocalService,
    private userService: UserService,
    private dialog: MatDialog,
  ) {
  }

  ngOnInit(): void {
    if (this.currentUserID == '' || this.currentUserID.length <= 0) {
      throw new Error('Invalid UserID for Component');
    } else {
      this.userSecurity.userID = this.currentUserID;
      this.userSecurity.loginID = this.currentLoginID;
      this.getUserSecurityDetails();
    }
  }

  validateConfirmPaasword() {
    this.confirmPassword = '';
  }

  validateCurrentPassword() {
    this.currentPassword = '';
  }

  async changePassword() {

    let payload;
    let result;
    try {
      payload = {
        loginID: this.userSecurity.loginID,
        passwd: this.currentPassword,
        newPasswd: this.newPassword
      };

      if (this.newPassword == this.confirmPassword) {

        result = await this.userService.changePassword(payload);
        if (result.body.status != 1) {
          this.msg.second = ('Password Invalid');
          this.validateCurrentPassword();
          this.baseService.showSnackBar('Invalid Current Password', 'Password NOT Chnaged', 0);
        } else {
          this.localService.setSavePassword('');
          this.baseService.showSnackBar('Password Updated Successfully', result.body.affectedRecords + ' Records Affected', 0);
          const dialogRef = this.dialog.open(MessageDialogComponent, { data: { title: 'Password Changed Successfully', message: 'You need to relogin into the system!' } });
          dialogRef.afterClosed().subscribe(async () => {
            this.localService.logout();
          });
        }
      } else {
        this.msg.first = ('New & Confirm Password are not same');
        this.validateConfirmPaasword();
      }
    } catch (error) {
      this.baseService.showSnackBar('Something Went Wrong', error, 0);
    }
  }
  // End funtions of passwd chagne


  // start funtions for login activity
  async getUserSecurityDetails() {
    const payload = {
      userID: this.userSecurity.userID
    };
    let result;
    try {
      result = await this.userService.getUserSecurityDetails(payload);

      this.userActivity.loginStatus = result.body.data.rows[0].status;
      this.userActivity.created = result.body.data.rows[0].created_on;
      this.userActivity.loginSuccess = result.body.data.rows[0].last_login_success;
      this.userActivity.loginFailed = result.body.data.rows[0].last_login_fail;

      this.userSecurity.question1 = result.body.data.rows[0].security_question_1;
      this.userSecurity.question2 = result.body.data.rows[0].security_question_2;
      this.userSecurity.question3 = result.body.data.rows[0].security_question_3;
      this.userSecurity.answer1 = result.body.data.rows[0].security_answer_1;
      this.userSecurity.answer2 = result.body.data.rows[0].security_answer_2;
      this.userSecurity.answer3 = result.body.data.rows[0].security_answer_3;

    } catch (error) {
      this.baseService.showSnackBar('getUserSecurityDetails', error, 0);
    }
  }
  // End funtion of login activity

  // start funtion for user questions
  async updateUserSecurity() {

    let payload;
    let result;
    try {
      payload = {
        FirstQuestion: this.userSecurity.question1,
        SecondQuestion: this.userSecurity.question2,
        ThirdQuestion: this.userSecurity.question3,
        FirstAnswer: this.userSecurity.answer1,
        SecondAnswer: this.userSecurity.answer2,
        ThirdAnswer: this.userSecurity.answer3,
        userID: this.userSecurity.userID,
      };
      result = await this.userService.updateUserSecurity(payload);
      if (result.body.data.affectedRows == 1) {
        this.baseService.showSnackBar('User Security Updated Successfully', result.body.data.affectedRows + ' Records Affected', 0);
      }
    } catch (error) {
      this.baseService.showSnackBar('Something Went Wrong', error, 0);
    }
  }
  // End funtion of user questions


}
