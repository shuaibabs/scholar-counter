import { Component, OnInit, Inject, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Validators, FormControl } from '@angular/forms';
import { ImageUploaderComponent } from 'src/app/components/image-uploader/image-uploader.component';
import { AuthService, BaseService, LocalService, HttpService, UserService, ReportService, PlatformService } from 'src/app/core/services';
import { Methods } from 'src/app/core/gt-utility';
import { MasterModel } from 'src/app/core/model';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  @Input() currentUserID: string;

  read = true;
  methods: Methods = new Methods();
  masterModel: MasterModel = new MasterModel();
  userProfile = this.masterModel.getUserProfileModel();

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  constructor(
    private baseService: BaseService,
    private dialog: MatDialog,
    private userService: UserService
  ) {

  }

  ngOnInit(): void {
    if (this.currentUserID == '' || this.currentUserID.length <= 0) {
      throw new Error('Invalid UserID for Component');
    } else {
      this.userProfile.userID = this.currentUserID;
      this.loadUserProfile();
    }
  }

  async loadUserProfile() {
    const payload = {
      userID: this.userProfile.userID
    };
    let result;
    try {

      result = await this.userService.getUserProfile(payload);

      this.userProfile.userID = result.body.data.rows[0].user_id;
      this.userProfile.role = result.body.data.rows[0].role;
      this.userProfile.roleID = result.body.data.rows[0].role_id;
      this.userProfile.loginID = result.body.data.rows[0].login_id;
      this.userProfile.firstName = this.methods.getFormattedUCString(result.body.data.rows[0].first_name);
      this.userProfile.middleName = this.methods.getFormattedUCString(result.body.data.rows[0].middle_name);
      this.userProfile.lastName = this.methods.getFormattedUCString(result.body.data.rows[0].last_name);
      this.userProfile.contactPrimary = result.body.data.rows[0].contact_primary;
      this.userProfile.contactSecondary = result.body.data.rows[0].contact_secondary;
      this.userProfile.email = result.body.data.rows[0].email;
      this.userProfile.photo = result.body.data.rows[0].photo;

    } catch (error) {
      this.baseService.showSnackBar('Something Went Wrong', error, 0);
    }
  }


  async updateUserDetails() {

    const payload = this.userProfile;
    let result;
    try {
      result = await this.userService.updateUserProfile(payload);
      if (result.body.data.affectedRows >= 1) {
        this.loadUserProfile();
        this.baseService.showSnackBar(this.methods.getFormattedUCString(this.userProfile.lastName + ', ' + this.userProfile.firstName)
          + ' Details Updated Successfully', result.body.data.affectedRows + ' Records Affected', 0);
      } else {
        throw new Error('Error in updating user Info: Status Code='
          + result.body.status + ': Rows Affected=' + result.body.data.affectedRows + " : " + result.body.info);
      }
    } catch (error) {
      this.baseService.showSnackBar('Something Went Wromg', error, 0);
      throw new Error('Something Went Wrong' + error);
    }
  }

  // this is for popup image uploder
  async uploadUserProfilePhoto(): Promise<void> {
    let payload;
    let photo = '';
    try {
      payload = { userID: this.userProfile.userID, photo: this.userProfile.photo };
      const dialogRef = await this.dialog.open(ImageUploaderComponent, { data: payload });

      dialogRef.afterClosed().subscribe(async (data) => {

        if (data.length > 1) {

          if ((data + '').trim().toUpperCase() == 'DEFAULT') {
            photo = await this.baseService.getDefaultAvatar();
          }
          else {
            photo = data;
          }

          const apiPayload = { userID: this.userProfile.userID, picture: photo };
          const result = await this.userService.uploadUserProfilePhoto(apiPayload);

          if (result.body.status == 1) {  // success
            this.baseService.showSnackBar('User Profile Photo Uploaded Successfully', 'Success', 0);
            this.userProfile.photo = photo;
            this.baseService.refreshProfileAvatar(photo);
          }
          else {  // fail
            this.baseService.showSnackBar('Something Went Wrong', 'Photo Upload FAIL: Status Code=' + result.body.status, 0);
          }

        }else {
          // alert('ELSE: ' +  data.length);
          this.baseService.showSnackBar('User Profile Photo Upload Canceled', 'ThankYou', 0);
        }
      });

    } catch (error) {
      this.baseService.showSnackBar('Something Went Wrong', error, 0);
    }
  }

}
