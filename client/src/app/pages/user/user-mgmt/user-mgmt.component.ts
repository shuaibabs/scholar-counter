import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { ImageUploaderComponent, ConfirmDialogComponent, MessageDialogComponent } from 'src/app/components';
import { MatDialog } from '@angular/material/dialog';
import { BaseService, UserService, AuthService } from 'src/app/core/services';
import { MasterModel } from 'src/app/core/model';
import { Methods } from 'src/app/core/gt-utility';

@Component({
  selector: 'app-user-mgmt',
  templateUrl: './user-mgmt.component.html',
  styleUrls: ['./user-mgmt.component.css']
})
export class UserMgmtComponent implements OnInit {

  methods = new Methods();
  masterModel = new MasterModel();
  readonly defaultPassword = '!amTh3B3$t';
  displayedColumns: string[] = ['loginID', 'name', 'status', 'role', 'mobileNo', 'email', 'edit'];
  dataSource = [];

  hidePasswd = false;
  showNewUserForm = false;
  availableRoles: any = ['REPORT USER - 22'];
  availableStatus: any = ['Active', 'Blocked', 'Deleted', 'Hold', 'New', 'Non Active', 'Other', 'Pending', 'Suspended'];
  mandatoryControl = new FormControl('', [Validators.required]);
  emailControl = new FormControl('', [Validators.required, Validators.email]);
  PasswdControl = new FormControl('', Validators.required);
  firstControl = new FormControl('', Validators.required);
  roleIDControl = new FormControl('', Validators.required);
  statusControl = new FormControl('', Validators.required);
  userProfile = this.masterModel.getUserProfileModel();
  edit = false;

  constructor(
    public baseService: BaseService,
    public authService: AuthService,
    public dialog: MatDialog,
    public userService: UserService) { }

  ngOnInit(): void {
    this.loadUserList();
    this.getUserRoles();
  }


  async loadUserList() {

    let payload = {
      accountID: this.baseService.userProfile.accountID
    };
    try {
      const result = await this.userService.getUserList(payload);
      if (result.body.status != 1) {
        throw new Error('Error in getting user list from server: status code=' + result.body.status + ' : ' + result.body.info);
      }
      const userList = result.body.data.rows;

      let ELEMENT_DATA = [];
      for (const user of userList) {
        const model = {
          loginID: user.login_id,
          userID: user.user_id,
          status: user.status,
          role: user.role,
          roleID: user.role_id,
          firstName: user.first_name,
          lastName: user.last_name,
          contactPrimary: user.contact_primary,
          email: user.email,
          edit: user.user_id,
        };
        ELEMENT_DATA.push(model);
      }
      this.dataSource = ELEMENT_DATA;

      // alert(JSON.stringify(this.dataSource));
    } catch (error) {
      this.baseService.showSnackBar('Error in getting user list', error, 0);
      throw new Error('Error in getting user list: ' + error);
    }
  }

  async getUserRoles() {
    let payload;
    let result;
    this.edit = false;
    try {
      payload = {
        userID: this.baseService.userProfile.userID,
        accountID: this.baseService.userProfile.accountID,
      };
      result = await this.userService.getRoles(payload);

      const rows = result.body.data.rows;
      const roles = [];
      for (const row of rows) {
        roles.push(row.role + ' (' + row.role_id + ')');
      }
      this.availableRoles = roles;

    } catch (error) {
      this.baseService.showSnackBar('Error in getting available roles for account', error, 0);
    }

  }

  async clickCreateNewUser() {
    try {
      this.userProfile = this.masterModel.getUserProfileModel();
      this.userProfile.passwd = this.defaultPassword;
      this.userProfile.status = 'New';
      this.userProfile.roleID = '22';
      this.userProfile.role = 'REPORT USER';
      this.userProfile.displayRole = this.userProfile.role + ' (' + this.userProfile.roleID + ')';
      this.showNewUserForm = true;
      this.edit = false;
    } catch (error) { }
  }

  async clickEdit(userIDFromUI, loginIDFromUI) {
    let result;
    this.edit = true;
    this.showNewUserForm = true;
    try {
      //
      const payload = {
        userID: userIDFromUI,
        loginID: loginIDFromUI
      };

      this.baseService.showSnackBar('Edit User', JSON.stringify(payload), 0);

      // result = await this.userService.detailForUpdate(payload);
      result = await this.userService.getUserProfile(payload);

      if (result.body.status != 1) {
        throw new Error('Error is getting data from API: ' + result.body.status + ' : ' + result.body.info);
      }

      this.userProfile.userID = result.body.data.rows[0].user_id;
      this.userProfile.role = result.body.data.rows[0].role;
      this.userProfile.roleID = result.body.data.rows[0].role_id;
      this.userProfile.displayRole = this.userProfile.role + ' (' + this.userProfile.roleID + ')';
      this.userProfile.loginID = result.body.data.rows[0].login_id;
      this.userProfile.passwd = result.body.data.rows[0].passwd;
      this.userProfile.firstName = this.methods.getFormattedUCString(result.body.data.rows[0].first_name);
      this.userProfile.middleName = this.methods.getFormattedUCString(result.body.data.rows[0].middle_name);
      this.userProfile.lastName = this.methods.getFormattedUCString(result.body.data.rows[0].last_name);
      this.userProfile.displayName = this.userProfile.lastName + ', ' + this.userProfile.firstName;
      this.userProfile.contactPrimary = result.body.data.rows[0].contact_primary;
      this.userProfile.contactSecondary = result.body.data.rows[0].contact_secondary;
      this.userProfile.email = result.body.data.rows[0].email;
      this.userProfile.status = result.body.data.rows[0].status;
      this.userProfile.securityQuestion1 = result.body.data.rows[0].security_question_1;
      this.userProfile.securityQuestion2 = result.body.data.rows[0].security_question_2;
      this.userProfile.securityQuestion3 = result.body.data.rows[0].security_question_3;
      this.userProfile.securityAnswer1 = result.body.data.rows[0].security_answer_1;
      this.userProfile.securityAnswer2 = result.body.data.rows[0].security_answer_2;
      this.userProfile.securityAnswer3 = result.body.data.rows[0].security_answer_3;
      // this.userProfile.remarks = result.body.data.rows[0].remarks;
      // this.userProfile.photo = result.body.data.rows[0].photo;

    } catch (error) {
      this.baseService.showSnackBar('Error in editting user details', error, 0);
      throw new Error('Error in editting user details: ' + error);
    }
  }

  async clickCancel() {
    try {
      this.userProfile = this.masterModel.getUserProfileModel();
      this.showNewUserForm = false;
    } catch (error) { }
  }

  async clickCreate() {
    let payload;
    let result;
    this.edit = false;
    try {
      this.userProfile.loginID = this.userProfile.email;
      this.userProfile.role = this.userProfile.displayRole.split('(')[0].trim();
      this.userProfile.roleID = this.userProfile.displayRole.split('(')[1].trim().replace(')', '');
      this.userProfile.photo = await this.baseService.getDefaultAvatar();
      this.userProfile.accountID = this.baseService.userProfile.accountID;
      payload = this.userProfile;

      // alert(JSON.stringify(this.userProfile));

      result = await this.userService.createNewUser(payload);

      if (result.body.status == 1 && result.body.data.affectedRows == 1) {
        this.baseService.showSnackBar('New User Created Successfully', 'Success', 0);
        this.showNewUserForm = false;
        this.loadUserList();
      } else {
        this.baseService.showSnackBar('Something Went Wrong During New User Creation', result.body.status + ' : ' + result.body.info , 0);
      }

    } catch (error) {
      this.baseService.showSnackBar('Error in creating New User', error, 0);
    }

  }

  async clickUpdate() {
    const payload = this.userProfile;
    let result;
    try {
      this.userProfile.role = this.userProfile.displayRole.split('(')[0].trim();
      this.userProfile.roleID = this.userProfile.displayRole.split('(')[1].trim().replace(')', '');

      result = await this.userService.updateUserDetails(payload);

      if (result.body.data.affectedRows == 1) {
        this.baseService.showSnackBar('User Info Updated Successfully', result.body.data.affectedRows + ' Records Affected', 0);
        this.showNewUserForm = false;
        this.loadUserList();
      } else {
        this.baseService.showSnackBar('Something went Wrong during updation of user details', result.body.status + ' : ' + result.body.info, 0);
      }
    } catch (error) {
      this.baseService.showSnackBar('Error in updating user details', result.body.status + ' : ' + result.body.info, 0);
    }
  }



  async clickDelete() {
    const payload = {
      userID: this.userProfile.userID
    };
    let result: any = this.masterModel.getResponseModel();
    try {
      const dialogRef = this.dialog.open( ConfirmDialogComponent,
        { data: { title: 'Are you Sure to Delete User ' + this.userProfile.loginID, message: this.userProfile.loginID + ' : ' + this.userProfile.firstName } } );
      dialogRef.afterClosed().subscribe(async dialogResult => {
        if (dialogResult == true) {
          result =await this.userService.deleteUser(payload);
          if (result.body.status == 1) {
            this.baseService.showSnackBar('User Deleted Successfully', result.body.data.affectedRows + ' Records Affected', 0);
            this.showNewUserForm = false;
            this.loadUserList();
          } else {
            this.baseService.showSnackBar('Something went Wrong during deetion of User', result.body.status + ' : ' + result.body.info, 0);
          }
        }
      });
    } catch (error) {
      this.baseService.showSnackBar('Something went wrong while deleting user', error, 0);
    }
  }

}
