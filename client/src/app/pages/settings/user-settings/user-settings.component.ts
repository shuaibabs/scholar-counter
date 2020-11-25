import { Component, OnInit } from '@angular/core';
import { BaseService } from 'src/app/core/services';
import { SettingService } from 'src/app/core/services/setting.service';

@Component({
  selector: 'app-user-settings',
  templateUrl: './user-settings.component.html',
  styleUrls: ['./user-settings.component.css']
})
export class UserSettingsComponent implements OnInit {

  menuItems = [];
  colors = ['red', 'blue', 'yellow', 'orange'];

  Menu: 'true';
  seasons: string[] = ['Hide Side Menu / Navigation on Start-Up', 'Show Header Menu Icons on Start-up'];

  seasonss = [ { value: 'Menu', radio : 'Hide Side Menu / Navigation on Start-Up'},
              { value: 'Icon', radio : 'Show Header Menu Icons on Start-up'}];

  notification: boolean = false;
  windowLogout: boolean = false;
  verify: boolean = true;
  selectMenu = 'Dashboard';
  selectedColor = '';
  tokenTIme = '0';

  constructor(
    public baseService: BaseService,
    public settingService: SettingService
  ) { }

  ngOnInit(): void {
    this.getMenu();
  }
  
  async getMenu() {

    try {

      for (const menuItem of this.baseService.userMenuDetails) {
        this.menuItems.push(menuItem.menu);
      }
      this.menuItems.push('login');
      this.menuItems.push('others');
      // alert('menu::' + JSON.stringify(this.menuItems))

    } catch (error) {
      this.baseService.showSnackBar('Something Went Wrong getMenu', error, 0);
    }
  }

  async userSetting() {

    let payload = {
      Menu: this.Menu,
      userID: sessionStorage.getItem('userID'),
      notification: this.notification,
      windowLogout: this.windowLogout,
      selectMenu: this.selectMenu,
      selectedColor: this.selectedColor,
      tokenTIme: this.tokenTIme
    }
    let result;

    try {
      console.log('data:: ' + JSON.stringify(payload))

      result = await this.settingService.userSetting(payload)

      console.log('usersetting::' + JSON.stringify(result));

      if (result.body.status == 1 && result.body.data.affectedRows == 1) {
        this.baseService.showSnackBar(' User Setting Update ', 'Successfully', 0);

      } else {
        this.baseService.showSnackBar('user Setting Update', result.body.status + ' : ' + result.body.info, 0);
      }

    } catch (error) {
      throw new error('user setting error: ' + error);
    }
  }


}