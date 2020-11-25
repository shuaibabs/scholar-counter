import { Component, OnInit } from '@angular/core';
import { Buffer } from 'buffer';
import { Router } from '@angular/router';
import { ImageUploaderComponent } from 'src/app/components/image-uploader/image-uploader.component';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserService, AuthService, BaseService, LocalService } from 'src/app/core/services';
import { Methods } from 'src/app/core/gt-utility';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  menuItems = [];
  methods: Methods = new Methods();

  constructor(
    public baseService: BaseService,
    public localService: LocalService,
    public authService: AuthService,
    public router: Router,
    public dialog: MatDialog,
    public userService: UserService) { }

  ngOnInit(): void {
    this.getMenuDetails();
  }

  async getMenuDetails() {

    try {

      for (const menuItem of this.baseService.userMenuDetails) {
        const model = {
          menu: menuItem.menu,
          routerLink: menuItem.router,
          icon: menuItem.icon
        };
        this.menuItems.push(model);
      }

    } catch (error) {
      this.baseService.showSnackBar('Something Went Wrong', error, 0);
    }
  }

  async logout() {
    this.localService.logout();
  }

}
