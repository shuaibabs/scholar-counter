import { Component, OnInit } from '@angular/core';
import { BaseService, PlatformService } from 'src/app/core/services';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent, ConfirmDialogModel, } from 'src/app/components';


@Component({
  selector: 'app-platform-management',
  templateUrl: './platform-management.component.html',
  styleUrls: ['./platform-management.component.css']
})
export class PlatformManagementComponent implements OnInit {
  // validations start
  emailFormControl = new FormControl('', [Validators.required, Validators.email,]);
  // validstion end

  showPlatform = false;
  showUpdateButton = false;
  showCreateButton = false;


  platforms: any = [];
  status: any = ['ACTIVE', 'Non-Active', 'Hold', 'Blocked', 'Expired', 'Other', 'Pending'];
  customerTypes: any = ['Consortia', 'Country', 'Dealer', 'Group', 'Individual', 'Institution', 'Library', 'Others', 'Region', 'Site', 'Syndicate', 'Unknown'];


  // Data Holders START
  accountId: any;
  selectedPlatform = '';
  selectedStatus = 'ACTIVE';
  selectedcustomerType = 'Unknown';
  platform = '';
  platformCode = '';
  platformName = '';
  email = '';
  country = '';
  state = '';
  city = '';
  zip = '';
  contactPerson = '';
  primaryContactNumber = '';
  secondaryContactNumber = '';
  sushiUrl = '';
  providerUrl = '';
  customerId = '';
  requestorId = '';
  apiKey = '';
  username = '';
  password = '';
  // Data Holders END



  constructor(
    public baseService: BaseService,
    public dialog: MatDialog,
    public platformService: PlatformService
  ) { }

  ngOnInit(): void {
    this.platformDetails();
  }

  async platformDetails() {
    try {

      this.platforms.length = 0;
      let payload = {
        userID: this.baseService.userProfile.userID
      };
      const result = await this.platformService.getPlatformDetails(payload);
      this.accountId = result.body.data.rows[0].account_id;

      // LOOP START... for the Table Data
      for (let index = 0; index < result.body.data.rows.length; index++) {

        const model = {
          platform_id: result.body.data.rows[index].platform_id,
          platform_name: result.body.data.rows[index].platform_name,
          platform_code: result.body.data.rows[index].platform_code,

        };

        this.platforms.push(model);
      }
      // LOOP END... for the Table Data
    } catch (error) {
    }
  }


  async createNewPlatformbutton() {
    try {
      this.selectedPlatform = '';
      this.selectedStatus = 'ACTIVE';
      this.selectedcustomerType = 'Unknown';
      this.platform = '';
      this.platformCode = '';
      this.platformName = '';
      this.email = '';
      this.country = '';
      this.state = '';
      this.city = '';
      this.zip = '';
      this.contactPerson = '';
      this.primaryContactNumber = '';
      this.secondaryContactNumber = '';
      this.sushiUrl = '';
      this.providerUrl = '';
      this.customerId = '';
      this.requestorId = '';
      this.apiKey = '';
      this.username = '';
      this.password = '';
      this.showPlatform = true;
      this.showCreateButton = true;
      this.showUpdateButton = false;

    } catch (error) {
    }
  }





  // CREATE NEW PLATFORM METHOD
  async createNewPlatform() {
    try {
      const payload = {
        account_id: this.accountId,
        platform: this.platform,
        platform_code: this.platformCode,
        platform_name: this.platformName,
        email: this.email,
        status: this.selectedStatus,
        country: this.country,
        state: this.state,
        city: this.city,
        zip: this.zip,
        contact_person: this.contactPerson,
        contact_primary: this.primaryContactNumber,
        contact_secondary: this.secondaryContactNumber,
        sushi_url: this.sushiUrl,
        provider_url: this.providerUrl,
        customer_id: this.customerId,
        requestor_id: this.requestorId,
        api_key: this.apiKey,
        customer_type: this.selectedcustomerType,
        username: this.username,
        password: this.password,
      }
      const result = await this.platformService.createNewfPlatform(payload);
      if (result.body.status === 1) {
        this.baseService.showSnackBar('PLATFORM', 'Successfully Created Platform', 5000);
      }
      else {
        this.baseService.showSnackBar('PLATFORM', 'Something Wrong Please Try Later!!', 5000);
      }
      this.showPlatform = false;
      this.selectedPlatform = '';
      this.platformDetails();
    } catch (error) {
    }
  }



  // UPDATE PLATFORM METHOD
  async updatePlatform() {
    try {
      const payload = {
        account_id: this.accountId,
        platform_id: this.selectedPlatform,
        platform: this.platform,
        platform_code: this.platformCode,
        platform_name: this.platformName,
        email: this.email,
        status: this.selectedStatus,
        country: this.country,
        state: this.state,
        city: this.city,
        zip: this.zip,
        contact_person: this.contactPerson,
        contact_primary: this.primaryContactNumber,
        contact_secondary: this.secondaryContactNumber,
        sushi_url: this.sushiUrl,
        provider_url: this.providerUrl,
        customer_id: this.customerId,
        requestor_id: this.requestorId,
        api_key: this.apiKey,
        customer_type: this.selectedcustomerType,
        username: this.username,
        password: this.password,
      }
      const result = await this.platformService.UpdatePlatform(payload);

      if (result.body.status === 1) {
        this.baseService.showSnackBar('PLATFORM', 'Successfully Updated Platform', 5000);
      }
      else {
        this.baseService.showSnackBar('PLATFORM', 'Something Wrong Please Try Later!!', 5000);
      }
      this.showPlatform = false;
      this.selectedPlatform = '';
      this.platformDetails();
    } catch (error) {
    }
  }



  // DELETE PLATFORM METHOD
  async deletePlatform() {
    try {
      const payload = {
        account_id: this.accountId,
        platform_id: this.selectedPlatform
      }
      const result = await this.platformService.DeletePlatform(payload);

      if (result.body.status === 1) {
        this.baseService.showSnackBar('PLATFORM', 'Successfully Deleted Platform', 5000);
      }
      else {
        this.baseService.showSnackBar('PLATFORM', 'Something Wrong Please Try Later!!', 5000);
      }
      this.showPlatform = false;
      this.selectedPlatform = '';
      this.platformDetails();
    } catch (error) {
    }
  }



  // PLATFORM DATA GET METHOD  TO MODIFY AND DELETE
  async onSelectPlatform(selectedPlatform) {
    try {
      this.showPlatform = true;
      this.showUpdateButton = true;
      this.showCreateButton = false;
      const payload = {
        platform_id: selectedPlatform,
        account_id: this.accountId
      }
      const result = await this.platformService.getSingleAndSpecificPlatformDetails(payload);
      this.selectedStatus = result.body.data.rows[0].status;
      this.selectedcustomerType = result.body.data.rows[0].customer_type;
      this.platform = result.body.data.rows[0].platform;
      this.platformCode = result.body.data.rows[0].platform_code;
      this.platformName = result.body.data.rows[0].platform_name;
      this.email = result.body.data.rows[0].email;
      this.country = result.body.data.rows[0].country;
      this.state = result.body.data.rows[0].state;
      this.city = result.body.data.rows[0].city;
      this.zip = result.body.data.rows[0].zip;
      this.contactPerson = result.body.data.rows[0].contact_person;
      this.primaryContactNumber = result.body.data.rows[0].contact_primary;
      this.secondaryContactNumber = result.body.data.rows[0].contact_secondary;
      this.sushiUrl = result.body.data.rows[0].sushi_url;
      this.providerUrl = result.body.data.rows[0].provider_url;
      this.customerId = result.body.data.rows[0].customer_id;
      this.requestorId = result.body.data.rows[0].requestor_id;
      this.apiKey = result.body.data.rows[0].api_key;
      this.username = result.body.data.rows[0].username;
      this.password = result.body.data.rows[0].password;

    } catch (error) {
    }
  }


  confirmDeletePlatform(): void {
    try {
      const message = `Are you sure you want to Delete Platform?`;
      const dialogData = new ConfirmDialogModel('Confirm Action', message);
      const dialogRef = this.dialog.open(ConfirmDialogComponent, {
        maxWidth: '600px',
        data: dialogData
      });

      dialogRef.afterClosed().subscribe(dialogResult => {
        if (dialogResult == true) {
          this.deletePlatform();
        }
      });
    } catch (error) {
      this.baseService.showSnackBar('Error in Deleting Paltform', error, 0);
    }

  }




  confirmUpdatePlatform(): void {
    try {
      const message = `Are you sure you want to Update Platform?`;
      const dialogData = new ConfirmDialogModel('Confirm Action', message);
      const dialogRef = this.dialog.open(ConfirmDialogComponent, {
        maxWidth: '600px',
        data: dialogData
      });
      dialogRef.afterClosed().subscribe(dialogResult => {
        if (dialogResult == true) {
          this.updatePlatform();
        };
      });
    } catch (error) {
    }

  }




}


