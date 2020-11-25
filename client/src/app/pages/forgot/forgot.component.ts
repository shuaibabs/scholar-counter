import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { AuthService, BaseService } from 'src/app/core/services';

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.css']
})
export class ForgotComponent implements OnInit {

  hide1 = true;
  hide2 = true;
  
  data = {
    username: ''
  };

  model = {
    question_1: '',
    question_2: '',
    question_3: '',
    answer_1: '',
    answer_2: '',
    answer_3: ''
  }
varify = {
  answer_1: '',
  answer_2: '',
  answer_3: '',
  first_passwd: '',
  second_passwd: '',
  erro_message: '',
  notFound_QA: ''
}

  first = true;
  second = false;
  third = false;
  fourth = false;

  constructor(
    public dialogRef: MatDialogRef<ForgotComponent>,
    public authService: AuthService,
    public baseService: BaseService
  ) { }

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  async search() {

    let payload = {
      loginID: this.data.username
    }
    let result;
    try {
      if (payload.loginID != '') {
        result = await this.authService.search(payload)
      } else {
        this.baseService.showSnackBar('Fill the loginID', '', 0);
      }
      

      if (result.body.status == 1 && result.body.data.fetchedRows == 1) {
        // console.log('result::' + JSON.stringify(result.body.data.rows[0].security_question_1))
        this.model.question_1 = result.body.data.rows[0].security_question_1;
        this.model.question_2 = result.body.data.rows[0].security_question_2;
        this.model.question_3 = result.body.data.rows[0].security_question_3;
        this.model.answer_1 = result.body.data.rows[0].security_answer_1;
        this.model.answer_2 = result.body.data.rows[0].security_answer_2;
        this.model.answer_3 = result.body.data.rows[0].security_answer_3;
        console.log('result::' + JSON.stringify(this.model))

        if ( (this.model.answer_1 == '' && this.model.answer_2 == '') && (this.model.answer_2 == '' && this.model.answer_3 == '') && (this.model.answer_3 == '' && this.model.answer_1 == '')) {
          this.first = false;
          this.fourth = true;
          this.varify.notFound_QA = 'Your Security Information is Not avilable Please Contact to your Business Administrator'
        } else {
          this.baseService.showSnackBar('Information findOut successfully', 'Success', 0);
          this.first = false;
          this.second = true;
        }

      } else {
        this.baseService.showSnackBar('Something Went Wrong During Information findOut successfully', result.body.status + ' : ' + result.body.info , 0);
      }
    } catch (error) {      
      throw new Error('Error in getting user Information: ' + error);
    }
  }

  async submit() {

    try {

      if( (this.model.answer_1 == this.varify.answer_1 && this.model.answer_2 == this.varify.answer_2) || (this.model.answer_2 == this.varify.answer_2 && this.model.answer_3 == this.varify.answer_3) || (this.model.answer_3 == this.varify.answer_3 && this.model.answer_1 == this.varify.answer_1) ) {
        this.second = false;
        this.third = true;
      } else {
        this.varify.answer_1 = '';
        this.varify.answer_2 = '';
        this.varify.answer_3 = '';
        this.baseService.showSnackBar('Please type a correct answer', 'Try Again' , 0);
      }
      
    } catch (error) {
      this.baseService.showSnackBar('Something Went Wrong', error, 0);
    }
  }

  async changePassword() {

    let payload = {
      passwd: this.varify.first_passwd,
      verify_passwd: this.varify.second_passwd
    }
    let result;
    try {
      if (payload.passwd == payload.verify_passwd) {
        result = await this.authService.changePasswd(payload);
      } else {
        this.varify.erro_message = 'Passwd is not Matched';
        this.baseService.showSnackBar('passwd is not matched', '', 0);
      }


      if (result.body.data.affectedRows == 1) {
        this.baseService.showSnackBar('Passws changes', result.body.data.affectedRows + ' Records Affected', 0);
      } else {
        this.baseService.showSnackBar('Passwd is not changes', ' Try Again', 0);
      }
    } catch (error) {
      this.baseService.showSnackBar('Something Went Wrong during change passwd', error, 0);
    }

  }


}