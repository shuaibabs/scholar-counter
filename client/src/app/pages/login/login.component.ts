import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import { Buffer } from 'buffer';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RequestDemoComponent } from '../request-demo/request-demo.component';
import { AuthService, LocalService } from 'src/app/core/services';
import { MessageDialogComponent } from 'src/app/components';
import { ForgotComponent } from '../forgot/forgot.component';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  rememberMe = true;
  savePassword = true;
  loginID = '';
  password = '';
  userName = 'Sign In';

  validateUserResult;
  validateAuthResult;

  hide = true;
  isLinear = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  userPhoto: any;
  errorMsg;

  constructor(
    public authService: AuthService,
    public localService: LocalService,
    public router: Router,
    private formBuilder: FormBuilder,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    // loading page
    this.onPageLoad();

    //
    this.firstFormGroup = this.formBuilder.group({
      firstCtrl: ['', Validators.required]
    });

    //
    this.secondFormGroup = this.formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
  }

  onPageLoad() {
    try {
      this.loginID = this.localService.getRememberMeUser();
      this.password = this.localService.getSavePassword();
      this.userName = 'Sign In';

      // alert(this.loginID  + ' : ' + this.password + ' : ' + this.userName);

      // check for auto login
      this.autoLogin();
    } catch (error) {
      console.log('onPageLoad: Error in page loading: ' + error);
    }
  }

  autoLogin(){
    let loginID = '';
    let pass = '';
    try {
      loginID = this.localService.getRememberMeUser();
      if (loginID == '' || loginID == null || loginID == 'undefined'){
        // no user is saved for remembering purpose
      } else{
        pass = this.localService.getSavePassword();
        if (pass == '' || pass == null || pass == 'undefined'){
          // no user is saved for remembering purpose
        }else{
          this.loginID = loginID;
          this.password = pass;

          // alert(this.loginID + ' : ' + this.password);
          this.validateAuth();
        }
      }

    } catch (error) {
      console.log('autoLogin: ' + error);
    }
  }

  cancel() {
    this.loginID = '';
  }
  
  async validateUser(stepper: MatStepper) {
    let email = '';
    let userID = '';
    try {
      // checking for valid loginID
      this.validateUserResult = await this.authService.validateUser({ loginID: this.loginID.toLowerCase() });

      if (this.validateUserResult.body.data.fetchedRows == 1) {

        // check for Remember Me, checkbox
        if (this.rememberMe) {
          this.savePassword = true;
          this.localService.setRememberMeUser(this.loginID);
        }else{
          this.localService.setRememberMeUser('');
          this.savePassword = false;
        }

        // getting user details
        this.loginID = this.validateUserResult.body.data.rows[0].login_id + '';
        this.userName = this.validateUserResult.body.data.rows[0].full_name + '';
        userID = this.validateUserResult.body.data.rows[0].user_id + '';
        email = this.validateUserResult.body.data.rows[0].email + '';

        // setting session variables
        sessionStorage.setItem('loginID', (this.loginID + '').toLowerCase());
        sessionStorage.setItem('userID', (userID + '').toLowerCase());
        sessionStorage.setItem('email', (email + '').toLowerCase());

        // getting user profile pic
        const buffer = this.validateUserResult.body.data.rows[0].photo;
        const json = JSON.stringify(buffer);
        const bufferOriginal = Buffer.from(JSON.parse(json));
        this.userPhoto = bufferOriginal;

        // going to next step
        stepper.next();
      } else {
        this.loginID = '';
        this.errorMsg = this.validateUserResult.body.info;
      }
    } catch (error) {
      this.loginID = '';
      this.errorMsg = 'validateUser: Error in validating loginID: ' + this.loginID + ' : ' + error;
      console.log(this.errorMsg);
    }
  }


  async validateAuth() {

    const payload = {
      loginID: this.loginID,
      password: this.password
    };
 
    try {
      // authenticating user
      if (await this.authService.validateAuth(payload) == true){
        if (this.savePassword) {
          this.localService.setSavePassword(this.password);
        }else{
          this.localService.setSavePassword('');
        }

        // on successfull login, enabling success flag
        this.authService.loginSuccess();
        // Navigating to home page
        this.router.navigate(['user']);
        this.router.navigate(['reports']);
      }else{
        this.authService.loginFail();
        this.errorMsg = 'Login Failed';
        this.password = '';
      }

    } catch (error) {
      this.authService.loginFail();
      this.errorMsg = error;
      this.password = '';
      this.dialog.open(MessageDialogComponent, {data: {title: 'Login Failed', message: error}} );
    }
  }

  requestDemo(): void {
    const dialogRef = this.dialog.open(RequestDemoComponent, {
      width: '400px',
      data: { data1: '', data2: '' }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The requestDemo dialog was closed');
    });
  }


  async openDialogError(): Promise<void> {
    let payload;

    try {

      const dialogRef = await this.dialog.open(ForgotComponent, { data: payload });

      dialogRef.afterClosed().subscribe(result => {
        console.log('The requestDemo dialog was closed');
      });
    } catch (error) {
      throw new error('openDialogError:  ' + error); 
    }



  }




}
